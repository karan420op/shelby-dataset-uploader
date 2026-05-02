import { uploadFile, uploadDirectory } from "./uploader";
import * as fs from "fs";

const args = process.argv.slice(2);
const command = args[0];
const target = args[1];

async function main() {
  if (!command) {
    console.log("Usage:");
    console.log("  node cli.ts upload <file-or-directory>");
    console.log("  node cli.ts status <blob-id>");
    console.log("  node cli.ts list");
    process.exit(0);
  }

  if (command === "upload") {
    if (!target) {
      console.error("Please provide a file or directory path.");
      process.exit(1);
    }

    const stat = fs.statSync(target);

    if (stat.isDirectory()) {
      console.log(Uploading directory: ${target});
      const manifest = await uploadDirectory(target);
      console.log(\nUpload complete.);
      console.log(Total files: ${manifest.totalFiles});
      console.log(Total size: ${(manifest.totalSize / 1024 / 1024).toFixed(2)} MB);
    } else {
      const result = await uploadFile(target);
      console.log(\nUpload complete.);
      console.log(Blob ID: ${result.blobId});
    }
  }

  if (command === "list") {
    if (!fs.existsSync("manifest.json")) {
      console.log("No manifest found. Upload some files first.");
      process.exit(0);
    }

    const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf-8"));
    console.log(\nUploaded files (${manifest.totalFiles}):);
    for (const file of manifest.files) {
      console.log(  ${file.fileName} -> ${file.blobId});
    }
  }
}

main().catch(console.error);

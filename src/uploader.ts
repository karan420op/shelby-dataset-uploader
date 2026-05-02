import { ShelbyClient } from "@shelby-xyz/sdk";
import * as fs from "fs";
import * as path from "path";

const client = new ShelbyClient({
  rpcUrl: process.env.SHELBY_RPC || "https://rpc.shelby.xyz",
  network: "testnet",
});

export interface UploadResult {
  fileName: string;
  blobId: string;
  size: number;
  uploadedAt: number;
}

export interface Manifest {
  createdAt: number;
  totalFiles: number;
  totalSize: number;
  files: UploadResult[];
}

export async function uploadFile(filePath: string): Promise<UploadResult> {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(File not found: ${absolutePath});
  }

  const fileBuffer = fs.readFileSync(absolutePath);
  const stats = fs.statSync(absolutePath);
  const fileName = path.basename(filePath);

  console.log(Uploading ${fileName} (${(stats.size / 1024 / 1024).toFixed(2)} MB)...);

  const blob = await client.store(fileBuffer, {
    contentType: "application/octet-stream",
    epochs: 10,
  });

  console.log(Done. Blob ID: ${blob.id});

  return {
    fileName,
    blobId: blob.id,
    size: stats.size,
    uploadedAt: Date.now(),
  };
}

export async function uploadDirectory(dirPath: string): Promise<Manifest> {
  const absolutePath = path.resolve(dirPath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(Directory not found: ${absolutePath});
  }

  const files = fs.readdirSync(absolutePath).filter((f) => {
    const stat = fs.statSync(path.join(absolutePath, f));
    return stat.isFile();
  });

  console.log(Found ${files.length} files in ${dirPath});

  const results: UploadResult[] = [];

  for (const file of files) {
    const result = await uploadFile(path.join(absolutePath, file));
    results.push(result);
  }

  const manifest: Manifest = {
    createdAt: Date.now(),
    totalFiles: results.length,
    totalSize: results.reduce((sum, r) => sum + r.size, 0),
    files: results,
  };

  fs.writeFileSync("manifest.json", JSON.stringify(manifest, null, 2));
  console.log(Manifest saved to manifest.json);

  return manifest;
}

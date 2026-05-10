# shelby-dataset-uploader

A CLI tool for AI developers to upload and manage training datasets on Shelby decentralized storage.

## Features

- Upload single files or entire directories to Shelby
- Auto-generates a manifest.json with all blob IDs
- Check upload status by blob ID
- List all previously uploaded datasets
- Supports any file format (images, text, parquet, CSV, etc.)
- Chunked uploads for large datasets

## Why Shelby for AI datasets?

AI training datasets are large, expensive to store, and critical to preserve. Centralized storage can go down, get expensive, or restrict access. Shelby gives you:

- Permanent decentralized storage
- No single point of failure
- Erasure coding for data integrity
- Pay-per-read model — only pay when data is accessed

## Usage

Upload a single file:
node dist/cli.js upload ./dataset.csv

Upload an entire folder:
node dist/cli.js upload ./my-dataset/

List uploaded files:
node dist/cli.js list

Check a blob:
node dist/cli.js status <blob-id>

## Project Structure

shelby-dataset-uploader/
├── src/
│   ├── uploader.ts    # core upload logic
│   └── cli.ts         # CLI interface
├── package.json
└── tsconfig.json

## Roadmap

- [x] Single file upload
- [x] Directory upload
- [x] Manifest generation
- [x] CLI interface
- [ ] Resume interrupted uploads
- [ ] Progress bar for large files
- [ ] Dataset versioning
- [ ] Mainnet support

## Setup

npm install
npm run dev

Set your environment variables in .env:

SHELBY_RPC=https://rpc.shelby.xyz
SHELBY_NETWORK=testnet

## Status

Work in progress — testnet only.

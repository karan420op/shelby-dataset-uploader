# shelby-dataset-uploader

A CLI tool for AI developers to upload and manage training datasets on Shelby decentralized storage.

## Overview

shelby-dataset-uploader makes it easy to upload large AI datasets to Shelby. Instead of relying on centralized storage like S3 or GCS, your datasets live on a decentralized network with guaranteed availability and no single point of failure.

## Use cases

- Upload image datasets for computer vision models
- Store text corpora for LLM training
- Archive model checkpoints permanently
- Share datasets with collaborators via blob IDs

## How it works

1. Point the CLI at a local folder or file
2. Files are chunked and uploaded to Shelby
3. A blob ID is returned for each file
4. Blob IDs are saved to a local manifest.json for reference

## Stack

- Shelby TypeScript SDK
- Node.js CLI
- Aptos wallet for authentication

## Status

Work in progress — testnet only.

## Setup

npm install
npm run dev

Set your environment variables in .env:

SHELBY_RPC=https://rpc.shelby.xyz
SHELBY_NETWORK=testnet

## Usage

node dist/index.js upload ./my-dataset/
node dist/index.js status <blob-id>
node dist/index.js list

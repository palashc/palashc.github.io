---
title: "BSON document support"
description: "Storing and querying document-shaped data in Phoenix, and why it matters for DynamoDB parity."
date: 2026-05-11
order: 2
tags: ["phoenix", "dynamodb", "bson", "phoenix-dynamodb-parity"]
draft: true
---

> Draft outline. Replace the prompts with prose, then set draft to false and a
> real date before publishing.

## TL;DR

## The document data type

- Why a first-class document type, not just a blob.

## How BSON is stored

- The on-disk representation in HBase.

## Querying and updating nested fields

- Reading and partially updating documents.

## Mapping to the DynamoDB item model

- How a DynamoDB item lines up with a Phoenix document.

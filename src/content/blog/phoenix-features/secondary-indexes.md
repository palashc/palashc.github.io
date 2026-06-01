---
title: "Secondary indexes in Phoenix"
description: "How Phoenix builds secondary indexes on top of HBase, and the difference between global, local, and covered indexes."
date: 2026-04-06
order: 1
tags: ["phoenix", "secondary-index", "phoenix-features"]
draft: true
---

> Draft outline. Replace the prompts with prose, then set draft to false and a
> real date before publishing.

## TL;DR

## Why you need them

- HBase only indexes the rowkey; every other lookup is a full scan.

## Global, local, and covered indexes

- Global: a separate index table, best for read-heavy workloads.
- Local: index data colocated with the table, best for write-heavy workloads.
- Covered: include extra columns in the index to skip the data-table lookup.

## How maintenance works

- Coprocessors keep the index in sync on every write (callback to the HBase post).

## Consistency and write amplification

- What an index costs you on the write path.

## Choosing one

- A short decision guide.

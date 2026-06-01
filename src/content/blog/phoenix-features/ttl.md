---
title: "TTL in Phoenix"
description: "How time-to-live works in Phoenix, from table-level expiry down to row-level TTL, and how it interacts with compaction."
date: 2026-04-20
order: 3
tags: ["phoenix", "ttl", "phoenix-features"]
draft: true
---

> Draft outline. Replace the prompts with prose, then set draft to false and a
> real date before publishing.

## TL;DR

## Table-level TTL

- Maps straight onto HBase cell TTL.

## Row-level and conditional TTL

- Finer-grained expiry.

## How expiry actually happens

- Tied to compaction (callback to the append-only, log-like model).

## TTL and indexes

- Keeping indexes consistent as data expires.

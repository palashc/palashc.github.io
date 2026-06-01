---
title: "Atomic updates in Phoenix"
description: "Single-row atomicity, atomic increments, and ON DUPLICATE KEY UPDATE, and where the guarantees stop."
date: 2026-04-13
order: 2
tags: ["phoenix", "atomicity", "phoenix-features"]
draft: true
---

> Draft outline. Replace the prompts with prose, then set draft to false and a
> real date before publishing.

## TL;DR

## Single-row atomicity in HBase

- The guarantee Phoenix inherits from HBase.

## Atomic UPSERT and ON DUPLICATE KEY UPDATE

- Read-modify-write on a row in one shot.

## Atomic increments and counters

## Conditional updates

- checkAndPut under the hood.

## What is not atomic

- Cross-row writes, and what to do when you need them.

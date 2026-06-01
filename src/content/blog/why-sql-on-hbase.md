---
title: "SQL: the feature NoSQL forgot"
description: "Why NoSQL stores gave up SQL, why that matters to users, and how Apache Phoenix brings SQL back to HBase."
date: 2026-03-04
tags: ["hbase", "phoenix", "intro"]
draft: false
---

NoSQL stores were built for scale. To get there, they dropped much of what
relational databases offered, and the first thing to go was usually SQL. You get
fast, horizontally scalable storage, but you talk to it through a narrow,
low-level API: put a key, get a key, scan a range.

That trade has a real cost, because SQL is not just syntax. It is types, indexes,
a query planner, and a huge ecosystem of tools and people who already know it. For
most teams, "can I just write a query?" is the difference between a database they
can build on and one only a few specialists can use.

[Apache HBase](https://hbase.apache.org/) is one of the most powerful NoSQL stores
around. It stores and serves enormous amounts of data across many machines, with
fast lookups by key, and holds up where a single-node database would fall over.
But it is firmly in the NoSQL camp: you work with bytes, design rowkeys by hand,
and your toolbox is essentially Get, Put, and Scan. No SQL, no joins, no types.

That is the gap [Apache Phoenix](https://phoenix.apache.org/) fills. It puts a SQL
and JDBC layer on top of HBase, so you keep the scale you need and get the
interface you want.

This blog is a series about how that works, and how far it can go. We start with
the fundamentals: what HBase gives you, how Phoenix maps SQL onto it, and how a
query actually runs.

Start here: [Phoenix Fundamentals](/blog/series/phoenix-fundamentals/).

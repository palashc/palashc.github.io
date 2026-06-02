---
title: "BSON Document Support"
description: "Storing schemaless documents in a Phoenix column, and reading, filtering, and updating their fields server-side."
date: 2026-05-11
order: 1
tags: ["phoenix", "bson", "documents", "phoenix-dynamodb-parity"]
draft: false
---

Not all data is neatly relational. A customer profile, a set of preferences, a
configuration blob, an event payload: each row can have a different shape, with
nested objects and arrays. Forcing that into fixed columns is awkward, and most of
those columns would sit empty.

The easy answer is to dump JSON into a text or binary column. But then the
database cannot see inside it. To change one field you have to read the whole
document to the client, parse it, edit it, and write it all back. That is
wasteful, and two such updates can clobber each other.

What you want is a document type the database understands: store the document
as-is, but let the server read, filter, and update individual fields in place.
That is what Phoenix's BSON column gives you.

## A document column

BSON is a native column type for schemaless documents, stored as Binary JSON: a
compact, length-prefixed format the server can parse cheaply. It also carries
types plain JSON cannot represent, like dates, binary, and sets, and it
distinguishes integers from doubles. A BSON column sits right alongside your
relational columns.

```sql
CREATE TABLE customer_profile (
  customer_id VARCHAR NOT NULL PRIMARY KEY,
  profile     BSON
);

UPSERT INTO customer_profile (customer_id, profile) VALUES (
  'C-1001',
  '{
     "name": "Jane",
     "age": 34,
     "joined": { "$date": "2026-04-01T00:00:00Z" },
     "preferences": { "theme": "dark", "marketing": false },
     "tags": { "$set": ["beta", "vip"] }
   }'
);
```

You write the document as a JSON string, which Phoenix parses and converts to BSON
on write, or you bind a pre-built BSON document through JDBC. The $date and $set
keys are how those richer types are spelled in JSON text. (A BSON column may even be
part of the primary key, as long as it is the last key column.)

The point of the type is that the server can act on individual fields, addressed
by a small path syntax like preferences.theme or addresses[0].city, without the
client ever deserializing the whole document. Three functions cover reading,
filtering, and updating those fields.

## Reading a field: BSON_VALUE

BSON_VALUE projects a single field out of a document as a given type, so you can
select it or filter on it:

```sql
SELECT customer_id,
       BSON_VALUE(profile, 'name', 'VARCHAR') AS name
FROM customer_profile
WHERE BSON_VALUE(profile, 'age', 'INTEGER') >= 18;
```

## Filtering rows: BSON_CONDITION_EXPRESSION

When you want to filter on several fields at once, BSON_CONDITION_EXPRESSION takes
a small expression language, with comparisons, AND / OR / NOT, BETWEEN and IN, and
helpers like field_exists and begins_with. It runs server-side, so rows are
filtered before they cross the network:

```sql
SELECT customer_id
FROM customer_profile
WHERE BSON_CONDITION_EXPRESSION(
  profile,
  'age >= 18 AND field_exists(preferences.theme)'
);
```

## Updating fields: BSON_UPDATE_EXPRESSION

BSON_UPDATE_EXPRESSION returns a new document with a set of field mutations
applied. Its language is a compact, document-focused grammar:

```text
update-expression ::=
    [ SET    path = value  [, ...] ]
    [ REMOVE path          [, ...] ]
    [ ADD    path value    [, ...] ]
    [ DELETE path value    [, ...] ]

value ::= literal
        | path
        | value + value
        | value - value
        | if_not_exists(path, value)
        | list_append(value, value)
```

SET writes a field, REMOVE deletes one, ADD increments a number, and DELETE
removes a value from a set; if_not_exists and list_append cover defaults and
appends. You run it inside an
[atomic upsert](https://phoenix.apache.org/docs/features/atomic-upsert), so the
whole family of changes applies under the row lock in one round trip, with no
read-modify-write race:

```sql
UPSERT INTO customer_profile (customer_id, profile)
VALUES ('C-1001', '{}')
ON DUPLICATE KEY UPDATE
  profile = BSON_UPDATE_EXPRESSION(
    profile,
    'SET preferences.theme = ''dark'',
         login_count = if_not_exists(login_count, 0) + 1'
  );
```

That makes it the right tool for per-document counters and conditional flips.

## Indexing a field

A filter on a BSON field would otherwise scan the table. As with any expression,
you can put a functional index on the projected field to turn it into a fast
lookup:

```sql
CREATE INDEX idx_profile_email
  ON customer_profile (BSON_VALUE(profile, 'email', 'VARCHAR'));
```

Each index targets one field and type, so you add one per hot field rather than
indexing the whole document.

## Further reading

- [Document Data: BSON](https://phoenix.apache.org/docs/features/bson)

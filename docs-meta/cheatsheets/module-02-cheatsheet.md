# CALM 1.2 Cheatsheet — Module 2

> Single-page reference for the CALM 1.2 vocabulary. Print and keep at your desk.

---

## $schema URL

```
https://calm.finos.org/release/1.2/meta/calm.json
```

Use this exact string. Common wrong values: `1.0-rc1`, `1.1`, missing `/release/1.2/`.

---

## Required fields

| Object | Required fields |
|---|---|
| **Architecture (top-level)** | `$schema`, `unique-id`, `name`, `description`, `nodes[]`, `relationships[]` |
| **Node** | `unique-id`, `node-type`, `name`, `description` |
| **Relationship** | `unique-id`, `relationship-type` |
| **Interface (freeform)** | `unique-id` |
| **Interface (formal)** | `unique-id`, `definition-url`, `config` |
| **Control entry** | `description`, `requirements[]` |
| **Requirement** | `requirement-url`, `config` (or `config-url`) |
| **Decorator** | `unique-id`, `type`, `target[]`, `data` (min 1 property) |

---

## Node types (9)

`container`, `component`, `microservice` are **NOT** CALM types — they are Docker/Kubernetes terms.

| Node type | Use for | Never use for |
|---|---|---|
| `actor` | Human user or external entity that initiates interactions | Service that makes outbound calls (use `service` + `connects`) |
| `ecosystem` | Runtime platform — VPC, cloud account, EKS cluster (uncontrolled/shared) | Logical domain grouping (use `system`) |
| `system` | Logical boundary grouping related nodes by domain or ownership | Runtime environments you do not own (use `ecosystem`) |
| `service` | Running process that exposes capabilities (REST API, gRPC, batch job, Lambda) | Data at rest or deployment environments |
| `database` | Any persistence technology — PostgreSQL, Redis, S3, DynamoDB, Snowflake | Kafka topics (use `data-asset`); Kafka broker running (use `service`) |
| `network` | L3/L4 routing/filtering infrastructure — firewall, load balancer, VPN, API gateway proxy | Deployment environments (use `ecosystem`); anything with business logic (use `service`) |
| `webclient` | Browser, mobile, or desktop UI application | The backend API it calls (use `service`) |
| `ldap` | Directory service / identity provider exposing LDAP protocol — Active Directory | OAuth/OIDC providers (use `service` with authentication interfaces) |
| `data-asset` | Named data artefact — files, datasets, Kafka topics as data, S3 bucket contents | Running database infrastructure (use `database`) |

---

## Relationship types (5)

`protocol` is a **TOP-LEVEL field** on `connects` — a sibling of `relationship-type`. NEVER nested inside the `connects` sub-object.

| Type | Required sub-fields | Example use |
|---|---|---|
| `connects` | `source.node`, `destination.node` | Node-to-node data flow with wire protocol |
| `interacts` | `actor` (must be actor-typed node), `nodes[]` | Actor initiating contact with one or more nodes |
| `deployed-in` | `container` (node unique-id), `nodes[]` | Runtime containment: these nodes run inside this container |
| `composed-of` | `container` (node unique-id), `nodes[]` | Structural composition: this system is made of these nodes |
| `options` | Array of branches, each with `description`, `nodes[]`, `relationships[]` | ADR-in-spec: two or more architectural decision branches |

**Note:** `options` is schema-valid in CALM 1.2 but causes a runtime crash in CALM CLI 1.44.1. Avoid in validated files until the CLI bug is fixed.

---

## Protocol enum (12)

All valid values for the `protocol` field on `connects` relationships. Using any other string causes a schema validation error.

`HTTP`, `HTTPS`, `FTP`, `SFTP`, `JDBC`, `WebSocket`, `SocketIO`, `LDAP`, `AMQP`, `TLS`, `mTLS`, `TCP`

Key values: `HTTPS` (encrypted web), `JDBC` (JVM to DB), `mTLS` (zero-trust mesh), `AMQP` (message queuing), `WebSocket` (real-time feeds), `LDAP` (directory queries), `TCP` (raw sockets). `REST` and `gRPC` are NOT valid — use `HTTPS` and `mTLS` respectively.

---

## Interface quick reference

Interfaces live on **nodes** (in `interfaces[]` array), not on relationships.  
Relationships reference them via `source.interfaces` and `destination.interfaces` (arrays of `unique-id` strings).

### Freeform form (interface-type)

Only required field: `unique-id`. Add any additional properties.

```json
{
  "unique-id": "orders-api-rest",
  "name": "Orders REST API",
  "protocol": "HTTPS",
  "port": 8443
}
```

### Formal form (interface-definition)

Required fields: `unique-id`, `definition-url`, `config`.

```json
{
  "unique-id": "orders-api-host-port",
  "definition-url": "https://calm.finos.org/release/1.2/prototype/interface/tcp-host-port.json",
  "config": {
    "host": "orders-api.internal",
    "port": 8443
  }
}
```

1.0-rc1's `url-interface` and `host-port-interface` are **gone in 1.2**.

---

## Control quick reference

Controls attach at: **top-level architecture**, **per-node**, **per-relationship**, **per-flow**.

```json
"controls": {
  "encryption-in-transit": {
    "description": "All data transmitted must be encrypted using TLS 1.3 or higher.",
    "requirements": [
      {
        "requirement-url": "https://example.com/security/encryption-in-transit.json",
        "config": {
          "protocol": "TLS",
          "minimumVersion": "1.3",
          "certificateValidation": "required"
        }
      }
    ]
  }
}
```

Control key naming: kebab-case only (`^[a-zA-Z0-9-]+$`). Examples: `encryption-in-transit`, `data-classification`, `mutual-tls`.

FINOS CCC (Common Controls Catalog) is a canonical source of `requirement-url` schemas for FSI use cases.

---

## Decorator quick reference

Decorators are **SEPARATE documents** that reference an architecture. Do not embed decorator data in `metadata` fields.

```json
{
  "unique-id": "conference-signup-threat-model",
  "type": "threat",
  "target": ["conference-signup.architecture.json"],
  "applies-to": ["attendees", "attendees-store"],
  "data": {
    "stride": {
      "spoofing": "Attendee identity not verified before write — mitigate with pre-registration token",
      "tampering": "DB write path not idempotent — mitigate with transaction IDs"
    }
  }
}
```

- `target[]` — **the file** (architecture document path or Hub URL)
- `applies-to[]` — **nodes/relationships within that file** (by `unique-id`); omit to annotate whole architecture
- `data` — free-form payload; at least 1 property required

Common decorator types by convention: `threat`, `governance`, `deployment-info`, `pattern`, `saif`

---

## CLI quick reference

```bash
# Validate architecture file
npx @finos/calm-cli validate -a conference-signup.architecture.json -f pretty

# Expected output when valid
No issues found
```

Visualise in CALM Studio web: <https://studio.calm.finos.org>

---

## Common mistakes

1. Wrong `$schema` URL — must be exactly `https://calm.finos.org/release/1.2/meta/calm.json`
2. `protocol` nested inside `connects` — must be top-level sibling of `relationship-type`
3. Invented node types — `container`, `component`, `microservice` are NOT CALM types
4. `interacts.actor` referencing a non-actor node — semantic constraint; tooling breaks silently
5. `url-interface` from 1.0-rc1 — gone in 1.2; use freeform or `definition-url` form
6. Embedding decorator data in `metadata` — defeats cross-team decoupling; use separate files
7. `ecosystem` for a cluster you control — use `system`; `ecosystem` is for uncontrolled environments

## Spec source

Canonical spec: <https://calm.finos.org/release/1.2/>

---

*Module 2 Cheatsheet — CALM Academy. Print on a single A4/Letter page. Cross-reference: Module 2 chapters at `content/module-02-calm-fundamentals/`.*

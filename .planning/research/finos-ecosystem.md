# FINOS Ecosystem — Integration Mapping for the Course

How CALM connects across the FINOS portfolio. This is the "ecosystem story" the course tells.

## Active FINOS projects relevant to the course

| Project | Description | Course module touch |
|---|---|---|
| **CALM** | Common Architecture Language Model — the spec we teach | All modules |
| **CALM Hub** | Versioned registry for CALM artifacts (architectures, patterns, controls, decorators) | M3.3, M3.7, M4.6 |
| **CALM Studio** | Visual canvas editor with bidirectional sync | M3.2, M5.4 |
| **CALM Guard** | AI-driven continuous compliance (6-agent squad) | M4.4 |
| **calmstudio-mcp** | MCP server for AI-driven architecture creation | M0, M5.4 |
| **CCC** (Common Controls Catalog) | Layer 2 control catalog (Gemara terminology) | M4.2 |
| **AIGF** (AI Governance Framework) | Governance overlay for AI systems | M5.5 |
| **ARB** (Architectural Reference Board) | Source of FINOS reference architectures | M5.3 (Multi-Agent ARB flagship use case) |
| **GRIS** (Generative Regulatory Intelligence System) | Maps regulations → CALM controls | M4.2, M5.5 |
| **FluxNova** | Event-driven architecture framework | M3.6 Lab |

## How they connect

```
ARB (reference architectures)
  → CALM patterns (encoded as machine-optimized schema)
  → published to CALM Hub (versioned, namespaced)
  → AIGF decorator auto-attaches on ai:* nodes
  → GRIS produces regulatory mappings → CALM controls → stored in Hub
  → FluxNova event topologies modeled as CALM interfaces
  → CALM Guard pulls from Hub, validates everything
  → audit evidence package exported, archived in Hub
```

## Cross-foundation integration

| Foundation | Project | Course relevance |
|---|---|---|
| OpenSSF / LF | **Gemara** | The conceptual GRC Engineering model — CALM is its Layer 4 schema |
| OpenSSF | **OSPS Baseline** | Open source security controls (Gemara Layer 2) |
| Google | **SAIF** | Secure AI Framework — mapped to CALM `ai:*` types and decorators |
| NIST | **AI RMF, CSF** | Risk frameworks → CALM controls |
| MITRE | **ATT&CK** | Threat vectors (Gemara Layer 1) referenced by CALM threat decorators |
| EU | **DORA** | Operational resilience — CALM as documentation artifact |
| US (Fed Reserve) | **SR 11-7** | Model risk management — CALM as model governance artifact |
| US (CFPB) | **ECOA / Reg B** | Fair lending — `adverse-action-agent` node satisfies via CALM |

## The "complete picture" diagram (placeholder for Excalidraw)

A future illustration `illustrations/source/finos-ecosystem-overview.excalidraw` will show:
- FINOS projects (CALM, Hub, Studio, Guard, ARB, GRIS, AIGF, CCC, FluxNova) as connected boxes
- OpenSSF Gemara as overlay showing the 7-layer model touching CALM at Layer 4
- Regulatory frameworks (NIST, MITRE, SR 11-7, MiFID II, DORA, ECOA, AIGF, SAIF) as inputs
- Audit/evidence outputs flowing back to regulators
- Data flow: ARB → CALM → Hub → Guard → Evidence

## Strategic positioning

**The pitch:** No other ecosystem has this end-to-end AI governance + architecture documentation + automated compliance story. FINOS + OpenSSF together deliver what no single vendor can.

**Partner pipeline:**
- Linux Foundation (parent of both FINOS and OpenSSF)
- Google (SAIF co-development)
- DTCC (CALM Guard origin, FSI member firm)
- Major banks (FINOS member firms = direct course consumers)
- Sonatype / Red Hat / CVS Health (Gemara founding maintainers)
- Big-4 consultancies (Thoughtworks, McKinsey, Deloitte) as enterprise rollout channel

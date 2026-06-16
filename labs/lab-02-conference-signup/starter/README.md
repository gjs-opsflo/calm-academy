# Lab 2 Starter — Conference Signup Architecture

This starter contains the minimum skeleton for the conference signup system. Two nodes (the actor and the webclient) and one relationship (interacts) are pre-defined.

Your job (see ../LAB.md):

1. Add the remaining 4 nodes: load-balancer (network), attendees (service), attendees-store (database), k8s-cluster (system).
2. Add 4 more relationships: 3 connects (HTTPS, mTLS, JDBC) and 1 deployed-in.
3. Add an interface to the attendees service.
4. Add a top-level encryption-in-transit control.
5. Run `npx @finos/calm-cli validate -a conference-signup.architecture.json -f pretty`.

Follow LAB.md step by step. If you get stuck, check the hints. If you really get stuck, see ../solution/conference-signup.architecture.json.

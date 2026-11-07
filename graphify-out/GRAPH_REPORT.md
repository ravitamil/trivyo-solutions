# Graph Report - trivyo-solutions  (2026-11-08)

## Corpus Check
- 5 files · ~6,626 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 7 file(s) not represented in the graph (top: .woff2 3, (none) 2, .xml 1)

## Summary
- 56 nodes · 55 edges · 8 communities
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `89ede34d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- package.json
- pages.yml
- on
- steps
- deploy
- Trivyo Solutions
- scripts
- site.js

## God Nodes (most connected - your core abstractions)
1. `steps` - 6 edges
2. `permissions` - 4 edges
3. `deploy` - 4 edges
4. `with` - 4 edges
5. `scripts` - 4 edges
6. `on` - 3 edges
7. `concurrency` - 3 edges
8. `environment` - 3 edges
9. `vite` - 3 edges
10. `gsap` - 3 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (8 total, 0 thin omitted)

### Community 0 - "package.json"
Cohesion: 0.18
Nodes (10): dependencies, gsap@3.15.1, devDependencies, vite@8.3.2, name, private, type, version (+2 more)

### Community 1 - "pages.yml"
Cohesion: 0.22
Nodes (8): concurrency, cancel-in-progress, group, name, permissions, contents, id-token, pages

### Community 2 - "on"
Cohesion: 0.50
Nodes (4): on, push, workflow_dispatch, branches

### Community 3 - "steps"
Cohesion: 0.22
Nodes (9): steps, id, name, run, uses, with, cache, node-version (+1 more)

### Community 4 - "deploy"
Cohesion: 0.33
Nodes (6): environment, runs-on, name, url, jobs, deploy

### Community 5 - "Trivyo Solutions"
Cohesion: 0.50
Nodes (3): Local review, Site, Trivyo Solutions

### Community 6 - "scripts"
Cohesion: 0.50
Nodes (4): scripts, build, dev, preview

### Community 7 - "site.js"
Cohesion: 0.29
Nodes (5): copyButton, form, motionButtons, motionPreferences, status

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `deploy` connect `deploy` to `steps`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **Why does `jobs` connect `deploy` to `pages.yml`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Why does `steps` connect `steps` to `deploy`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
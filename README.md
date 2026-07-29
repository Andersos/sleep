# Sleep

The raid history of the WoW Classic guild Sleep (Razorgore EU) and its
successors Dusk and the joint Dusk/Ascension team, October 2019 to April
2021. Static pages, no build step.

- `index.html` — the guild timeline: every canonical raid session by
  lineage, with story milestones.
- `players.html` — every raider with five or more logged nights: raid
  strip, night-by-night log with boss kills, recorded loot.
- `loot.html` — all 1,983 workbook loot awards with canonical item
  identities and boss sources.

## Data

`data/raids.json` and `data/loot.json` are generated from a private
research archive (Warcraft Logs exports, the guild loot workbook, and
AtlasLootClassic for canonical item data) and copied here. Do not edit
them by hand; they are regenerated upstream.

## Local preview

Any static server works:

```bash
npx serve .
```

AtlasLootClassic data is GPL v2. Player names are in-game character
names, already public through Warcraft Logs.

# Agent notes

- Static site, no build step, no framework, no package.json. Plain HTML
  plus `assets/site.css` and `assets/shared.js`. Keep it that way unless
  Anders asks otherwise.
- `data/*.json` is generated output copied from a private archive that
  lives outside this repository. Never edit the JSON by hand and never
  commit changes that alter its meaning; ask Anders to regenerate
  upstream instead.
- The color palette is CVD-validated in both light and dark mode. Do not
  change the lane colors (sleep/ninjas/dusk/joint/ascension/pug) without
  re-validating.
- Player names are in-game character names only. Real names,
  Discord handles, and hometowns must never appear in this repository.

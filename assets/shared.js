// Shared helpers for the Sleep story pages. Data comes from
// data/raids.json and data/loot.json, generated from the private archive.

const LANES = [
  { key: "sleep", label: "Sleep", color: "var(--sleep)" },
  { key: "ninjas", label: "Ninjas", color: "var(--ninjas)" },
  { key: "dusk", label: "Dusk", color: "var(--dusk)" },
  { key: "joint-dusk-ascension", label: "Dusk + Ascension", color: "var(--joint)" },
  { key: "ascension", label: "Ascension", color: "var(--ascension)" },
  { key: "personal-pug", label: "Pugs", color: "var(--pug)" }
];
const LANE = Object.fromEntries(LANES.map((l) => [l.key, l]));

const T = (s) => Date.parse(s + "T12:00:00Z");

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

async function loadRaids() {
  const response = await fetch("data/raids.json");
  const data = await response.json();
  const zoneName = Object.fromEntries(
    data.zones.map((z) => [z.zoneId, z.zoneName]),
  );
  for (const s of data.sessions) {
    s.zone = zoneName[s.zoneId] ?? String(s.zoneId);
  }
  return data;
}

async function loadLoot() {
  const response = await fetch("data/loot.json");
  return response.json();
}

function buildPlayerIndex(sessions, minimum = 5) {
  const players = new Map();
  sessions.forEach((s, index) => {
    for (const name of s.roster) {
      if (!players.has(name)) players.set(name, []);
      players.get(name).push(index);
    }
  });
  for (const [name, list] of players) {
    if (list.length < minimum) players.delete(name);
  }
  return players;
}

function playerLink(name) {
  return `players.html#${encodeURIComponent(name)}`;
}

const tipNode = document.createElement("div");
tipNode.id = "tip";
document.addEventListener("DOMContentLoaded", () =>
  document.body.appendChild(tipNode));

function showTip(html, evt) {
  tipNode.innerHTML = html;
  tipNode.style.display = "block";
  const pad = 14;
  let x = evt.clientX + pad, y = evt.clientY + pad;
  const r = tipNode.getBoundingClientRect();
  if (x + r.width > innerWidth - 8) x = evt.clientX - r.width - pad;
  if (y + r.height > innerHeight - 8) y = evt.clientY - r.height - pad;
  tipNode.style.left = x + "px";
  tipNode.style.top = y + "px";
}
function hideTip() { tipNode.style.display = "none"; }

function svgEl(name, attrs, parent) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, v);
  if (parent) parent.appendChild(node);
  return node;
}

function renderNav(active) {
  const nav = document.createElement("nav");
  nav.className = "site wrap";
  nav.innerHTML =
    `<a class="brand" href="index.html">WoW Classic</a>` +
    [
      ["index.html", "Timeline"],
      ["players.html", "Players"],
      ["raid.html", "Raids"],
      ["boss.html", "Bosses"],
      ["loot.html", "Loot"],
      ["item.html", "Items"],
      ["milestones.html", "Milestones"],
      ["stats.html", "Stats"],
      ["nittedal.html", "Nittedal"]
    ]
      .map(
        ([href, label]) =>
          `<a class="item" href="${href}"` +
          (href === active ? ' aria-current="page"' : "") +
          `>${label}</a>`,
      )
      .join("");
  document.body.prepend(nav);
}

// Story milestones and Classic phase dates, shared by index and milestones pages.
const MILESTONES = [
  ["2019-10-02","First raid with Artimis","Mixed-guild Molten Core — the earliest confirmed raid containing Artimis.",0],
  ["2019-10-13","The hunter diary begins","Onyxia and an 8/10 Molten Core clear; Artimis starts organizing the hunters.",0],
  ["2019-12-29","Ragnaros down, the Choker drops","The kill screenshot survives; the neck later fuels the guild's first loot dispute.",0],
  ["2020-02-01","David hands over the guild","Discord ownership transfers; Artimis is guild leader in practice.",1],
  ["2020-02-05","Deliz quits","Criticism of healers and the caster-first Choker policy; he leaves the game the same night.",1],
  ["2020-02-13","Blackwing Lair opens","Sleep enters on day one.",0],
  ["2020-02-23","Nefarian falls","BWL 8/8 within ten days.",1],
  ["2020-03-18","First Rejuvenating Gem","Shakey wins the roll the day Fnats steps back.",0],
  ["2020-03-29","Glory's first Binding","Both Garr and Baron Geddon die four times that night across split runs.",0],
  ["2020-08-02","The baby announcement","Nefarian dies twice; Anders tells the raid he is expecting a child and promotes Divinestorm on the spot.",1],
  ["2020-08-14","Sleep + Ninjas become Dusk","A new name from a poll, so neither guild absorbs the other.",1],
  ["2020-08-19","First Dusk AQ40","The preparation machine: resistance sets, rerolled professions, consumable pipelines.",0],
  ["2020-09-24","The Ninjas bloc departs","Nearly the whole ex-Ninjas core raids its last Dusk night; the merger has failed.",1],
  ["2020-09-30","GM crisis","Yeat transfers guild master mid-conflict; Divinestorm manages it remotely.",0],
  ["2020-11-07","Thunderfury","Glory's second Binding drops; the legendary is announced the same evening.",0],
  ["2020-11-18","Nayla leaves","113 logged sessions; felt unequal to the other tanks.",0],
  ["2020-12-06","Dusk enters Naxxramas","Three bosses on the first night.",0],
  ["2020-12-09","Joint raid with Ascension","Exactly 20 from each guild, picking the strongest players.",1],
  ["2020-12-13","Benched — a strike brews","Artimis organizes a protest over veterans losing seats; a 37-minute call resolves it the next day.",1],
  ["2020-12-20","Kel'Thuzad dies","Three wipes, then the last boss of vanilla. 43 names.",1],
  ["2021-04-11","Glory's own Kel'Thuzad","Left out of the first kill, the guild's most-attended raider gets his — in the archive's final report.",1]
];
const PHASES = [
  ["2019-08-27", "P1", "Molten Core & Onyxia available from launch"],
  ["2019-11-13", "P2", "Dire Maul, Kazzak & Azuregos"],
  ["2020-02-12", "P3", "Blackwing Lair opens"],
  ["2020-04-16", "P4", "Zul'Gurub opens"],
  ["2020-07-28", "P5", "Ahn'Qiraj war effort begins"],
  ["2020-12-03", "P6", "Naxxramas opens"],
  ["2021-05-18", "TBC", "Burning Crusade pre-patch — the Classic era ends"],
];

// Boss portrait icons (achievement art on the zamimg CDN). Partial coverage:
// Naxxramas and raid end bosses have dedicated art; earlier bosses mostly
// don't. Callers pair this with onerror-hide so gaps degrade gracefully.
const BOSS_ICONS = {
  "onyxia": "achievement_boss_onyxia",
  "ragnaros": "achievement_boss_ragnaros",
  "nefarian": "achievement_boss_nefarion",
  "hakkar": "achievement_boss_hakkar",
  "ossirian": "achievement_boss_kurinaxx",
  "cthun": "achievement_boss_cthun",
  "kelthuzad": "achievement_dungeon_naxxramas_kelthuzad",
  "anubrekhan": "achievement_boss_anubrekhan",
  "faerlina": "achievement_boss_grandwidowfaerlina",
  "maexxna": "achievement_boss_maexxna",
  "noth": "achievement_boss_noththeplaguebringer",
  "heigan": "achievement_boss_heigantheunclean",
  "loatheb": "achievement_boss_loatheb",
  "razuvious": "achievement_boss_instructorrazuvious",
  "gothik": "achievement_boss_gothiktheharvester",
  "four-horsemen": "achievement_boss_fourhorsemen",
  "patchwerk": "achievement_boss_patchwerk",
  "grobbulus": "achievement_boss_grobbulus",
  "gluth": "achievement_boss_gluth",
  "thaddius": "achievement_boss_thaddius",
  "sapphiron": "achievement_boss_sapphiron",
};
function bossIconImg(key, size = 28) {
  const icon = BOSS_ICONS[key] ?? BOSS_ICONS[key.replace(/-/g, "")];
  if (!icon) return "";
  return `<img class="bossicon" width="${size}" height="${size}" loading="lazy" alt="" ` +
    `onerror="this.style.display='none'" style="border-radius:6px;vertical-align:middle;margin-right:8px;border:1px solid var(--grid,#2a2c3a)" ` +
    `src="https://wow.zamimg.com/images/wow/icons/large/${icon}.jpg">`;
}

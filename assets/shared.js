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

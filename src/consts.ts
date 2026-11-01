export const SITE = {
  name: 'dtf',
  short: 'dtf',
  title: 'dtf — Damn These Feelings',
  domain: 'damnthesefeelings.com',
  description:
    'The official chronicle of the fallen kingdoms of Joe: a fantasy-lore archive of every relationship that ended, plus live, unsolicited reflection on how Joe behaves now.',
} as const;

/** Shown in the footer on every page. */
export const ANALYTICS_NOTICE = 'This site runs analytics. If you are an ex: hi. We both know.';

export const NAV_LINKS = [
  { label: '/chronicles', href: '/chronicles/', match: '/chronicles' },
  { label: '/realms', href: '/realms/', match: '/realms' },
  { label: '/rss', href: '/rss.xml', external: true },
] as const;

/**
 * The realms. One realm per ex (plus Joe's own head, because he is the common factor).
 *
 * Each ex is CODENAMED after one of Joe Goldberg's exes from the show You, with a French twist
 * (Love Quinn becomes "Amour"). The lore and stories filed under each realm are yours to write.
 *
 *   tag       codename. Goes in a post's frontmatter and becomes the URL: /realms/<tag>/
 *             (plain a-z only: accents get stripped from URLs)
 *   character the heroine the codename is drawn from
 *   show      the show she is from
 *   twist     one line on how the codename was derived (shown on the dossier)
 *   title     what the realm is called in the lore
 *   color     its accent everywhere: cards, tags, dossier, post pages
 *   image     portrait for the realm card and page (a path under /public, see docs/IMAGES.md)
 *   imageAlt  alt text for that portrait
 *   status    current diplomatic situation
 *   era       when it stood
 *   fall      how it ended, in lore terms
 *   verdict   Joe's own (unreliable) ruling
 *   description  the one-paragraph blurb
 */
export const REALMS = [
  {
    tag: 'Pierre',
    character: 'Candace Stone',
    show: 'You',
    twist: 'Stone, in French.',
    title: 'The Stonelands',
    color: '#c4bdd6',
    image: '/realms/pierre.svg',
    imageAlt: 'Portrait of Pierre, warden of the Stonelands',
    status: 'Ancient history. Carved in rock, mostly illegible.',
    era: 'The Stone Age',
    fall: 'It ended before the records began, which is the most convenient place for a fall to happen.',
    verdict: 'Too early to have learned anything. Learned some anyway.',
    description:
      'The earliest realm, from before the maps. Few records survive, and the ones that do were edited by Joe for tone.',
  },
  {
    tag: 'Amour',
    character: 'Love Quinn',
    show: 'You',
    twist: 'Love, in French.',
    title: 'The Kingdom of Duskhaven',
    color: '#ff7a59',
    image: '/realms/amour.svg',
    imageAlt: 'Portrait of Amour, ruler of Duskhaven',
    status: 'Fallen. Ruins visited at night.',
    era: 'The First Age',
    fall: 'Not conquered. Neglected. Nobody sacked the city; the walls just stopped getting maintained.',
    verdict: 'Mostly a skill issue. Joe\u2019s.',
    description:
      'First love, longest reign. Duskhaven was warm, shared, and built to last, right up until two people quietly stopped doing the upkeep.',
  },
  {
    tag: 'Belle',
    character: 'Marienne Bellamy',
    show: 'You',
    twist: 'Bellamy, from \u201cbel ami,\u201d fair friend. Belle is fair, in French.',
    title: 'The Long Distance Provinces',
    color: '#7be495',
    image: '/realms/belle.svg',
    imageAlt: 'Portrait of Belle, sovereign of the Long Distance Provinces',
    status: 'Dissolved. Time zones remain.',
    era: 'The Second Age',
    fall: 'Death by latency. Too many 3am calls, too few actual hugs, and a shipping route nobody could afford.',
    verdict: '99.9% uptime, 0% presence.',
    description:
      'A realm connected entirely by cable. Beautiful on the call, impossible on the calendar, and ruled by a ruler who kept saying \u201cI\u2019m fine\u201d in a variety of tones.',
  },
  {
    tag: 'Fantome',
    character: 'Guinevere Beck',
    show: 'You',
    twist: 'Guinevere is said to mean \u201cwhite phantom.\u201d Fant\u00f4me is ghost, in French.',
    title: 'The Free City of Almost',
    color: '#6cc4ff',
    image: '/realms/fantome.svg',
    imageAlt: 'Portrait of Fantome, mayor of the Free City of Almost',
    status: 'Never officially founded. Disputed borders.',
    era: 'The Interregnum',
    fall: 'It was never declared a city, so it could never technically fall. It just stopped replying.',
    verdict: 'A ticket nobody triaged.',
    description:
      'The longest-running situationship in the archive. Everyone agreed it was something. Nobody agreed on what, and the paperwork was never filed.',
  },
  {
    tag: 'Reine',
    character: 'Kate Galvin',
    show: 'You',
    twist: 'Every chessboard has one queen. Reine is queen, in French.',
    title: 'The Chess Republic',
    color: '#ffc857',
    image: '/realms/reine.svg',
    imageAlt: 'Portrait of Reine, chancellor of the Chess Republic',
    status: 'Cold peace. Occasional likes.',
    era: 'The Third Age',
    fall: 'A decade-long war over who texted last, fought with perfect strategy and zero winners.',
    verdict: 'Won every argument. Lost the republic.',
    description:
      'Sharp, funny, and competitive to a fault. Every disagreement was a match, and Joe is still annoyed about a few of them.',
  },
  {
    tag: 'Joe',
    character: 'Joe Goldberg',
    show: 'You',
    twist: 'The narrator, named after a man with famously poor boundaries. The resemblance is a joke at Joe\u2019s expense and mildly concerning.',
    title: 'The Capital (Joe\u2019s Head)',
    color: '#b79cff',
    image: '/realms/joe.svg',
    imageAlt: 'Portrait of Joe, sole inhabitant of the Capital',
    status: 'Under constant renovation. Not accepting visitors.',
    era: 'The Present Day',
    fall: 'Ongoing. Reports from inside the walls, filed by the one person who is somehow in every war.',
    verdict: 'The common factor. Working on it.',
    description:
      'Modern mockery and honest reflection: how Joe actually texts, copes, and builds home servers instead of discussing his feelings.',
  },
] as const;

/** The field notes on the subject, shown on the homepage. */
export const PATTERNS = [
  { label: 'Texting', value: 'Reads instantly, replies in three days, then sends fourteen messages in a row.' },
  { label: 'Coping', value: 'Builds infrastructure instead of processing. Has a private cloud and no emotional backups.' },
  { label: 'Conflict', value: 'Drafts a perfect essay, deletes it, sends \u201chaha yeah.\u201d' },
  { label: 'Love language', value: 'Uptime. Will fix your wifi at midnight. Will not say what is wrong.' },
  { label: 'Closure', value: 'Declared several times. Verified never.' },
  { label: 'Social media', value: 'Does not look at stories. (Looks at stories.)' },
  { label: 'Self-awareness', value: 'High. Applied only in retrospect, and only in blog form.' },
] as const;

/** The timeline of the realms, shown on the homepage. */
export const TIMELINE = [
  { label: 'The Stone Age', value: 'The Stonelands. Before the maps, before the lore, before Joe had learned anything at all.' },
  { label: 'The First Age', value: 'Duskhaven rises. Long summers. Shared everything. A very good couch.' },
  { label: 'The Second Age', value: 'The Long Distance Provinces connect by cable. Latency begins quietly.' },
  { label: 'The Interregnum', value: 'The Free City of Almost is never founded, and never falls.' },
  { label: 'The Third Age', value: 'The Chess Republic opens with a gambit. Closes with a stalemate.' },
  { label: 'The Present Day', value: 'Joe starts a website instead of calling someone. Progress, technically.' },
] as const;

/** Healing roadmap, shown as a grid on the homepage. */
export const ROADMAP = [
  {
    title: 'Therapy',
    points: [
      'Scheduled. Rescheduled. Scheduled again.',
      'Will be discussed at the next one, which is also scheduled.',
    ],
  },
  {
    title: 'Texting reform',
    points: [
      'A target reply time that is shorter than three days.',
      'Fewer messages than fourteen. Honestly, the bar is on the floor.',
    ],
  },
  {
    title: 'Content',
    points: [
      'Turning heartbreak into a recurring publication schedule.',
      'Feelings are renewable. So is the RSS feed.',
    ],
  },
  {
    title: 'Monetization',
    points: [
      'Ads on this page, as a proof of concept that feelings can return something.',
      'The income will be modest. The point is that the pain is now invoiceable.',
    ],
  },
] as const;

/** Fallback for tags that have no realm yet. */
/** Realm lookup by tag. */
export const realmByTag = (tag: string) => REALMS.find((r) => r.tag === tag);

const DEFAULT_REALM_COLOR = '#b79cff';

export const realmColor = (tag: string): string =>
  REALMS.find((r) => r.tag === tag)?.color ?? DEFAULT_REALM_COLOR;

export const RECENT_POST_LIMIT = 5;

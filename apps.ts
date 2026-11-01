/**
 * Items shown in the vault (the /gate/ page) after login.
 *
 * This file is bundled into the Worker and is never served as a public file, so these links are
 * only ever sent to a signed-in browser. Add one entry per item.
 *
 *   name         shown on the card
 *   url          where it goes (usually a subdomain, e.g. https://drafts.damnthesefeelings.com)
 *   description  optional, one short line
 *   group        optional heading to group cards under (e.g. 'Unsent', 'Evidence')
 *   tag          optional realm tag: 'Pierre' | 'Amour' | 'Belle' | 'Fantome' | 'Reine' | 'Joe', which sets the card's accent color
 */
export interface AppLink {
  name: string;
  url: string;
  description?: string;
  group?: string;
  tag?: string;
}

export const APPS: AppLink[] = [
  {
    name: 'The Grudge Book',
    url: '/grudges/',
    description: 'One-page case files. Every charge, every transcript, a ruling on each.',
    group: 'Sub-blogs',
    tag: 'Joe',
  },
  {
    name: 'Pudo Ser',
    url: '/pudo-ser/',
    description: 'What could have been. A quiet room for lives that never got to happen.',
    group: 'Sub-blogs',
    tag: 'Fantome',
  },
];

// Chapter teasers for the /chapters page.
//
// DRAFT (AI): these hooks are riffs on the chapter titles + the book's voice,
// NOT real plot summaries — Greg to refine with actual chapter detail. They're
// written to tease, not spoil, and to nudge toward buying the book.

export interface Chapter {
  title: string;
  teaser: string;
}

export interface ChapterPart {
  part: string; // e.g. "Part 1: Damn you Lisa"
  chapters: Chapter[];
}

export const CHAPTERS: ChapterPart[] = [
  {
    part: 'Part 1: Damn you Lisa',
    chapters: [
      { title: 'Cocktails and Dreams', teaser: 'How a few drinks and one big idea turn a normal family into would-be sailors.' },
      { title: 'The hand of God', teaser: 'When the universe nudges you toward the water — or just shoves.' },
      { title: 'Down to the Banana Republics', teaser: 'Plans meet paperwork, borders, and the tropics’ fine print.' },
      { title: 'Panama vs Twig', teaser: 'The boat takes on Panama. Panama does not go easy.' },
      { title: 'Christmas Blows', teaser: 'Holidays afloat are merrier in theory than in thirty knots of wind.' },
      { title: 'Georgia on my mind', teaser: 'A detour, a state, and a family still figuring out which way is up.' },
      { title: 'Love and a sailboat', teaser: 'Two things that need constant maintenance and occasional bailing.' },
    ],
  },
  {
    part: 'Part 2: Afloat',
    chapters: [
      { title: 'All Aboard!', teaser: 'Five humans, a dog, and a cat actually move onto the boat. What could go wrong?' },
      { title: "There's Vodka in the Boy's Bathroom", teaser: 'Boat-plumbing logic, explained the hard way.' },
      { title: 'Afloat', teaser: 'The moment “we live on a boat now” stops being a plan and becomes a problem.' },
      { title: 'Hazmat', teaser: 'Some messes need gloves. This is one of them.' },
      { title: 'Things that go bump in the night', teaser: 'Anchored out, every noise is a catastrophe until morning.' },
      { title: "Don't Ignore the Bright Red Light", teaser: 'Foreshadowing, in warning-label form.' },
      { title: 'Caulk the Wagon', teaser: 'Oregon Trail energy, saltwater edition.' },
      { title: 'Perfect Strangers', teaser: 'The oddballs and angels you meet when you live on the water.' },
    ],
  },
  {
    part: 'Part 3: The Bahamas',
    chapters: [
      { title: '42 Flushes', teaser: 'A loving tribute to the marine toilet, and the war it wages.' },
      { title: 'The Nut Jiggler', teaser: 'You’ll learn exactly what it is. You won’t be able to unlearn it.' },
      { title: 'Watch your six', teaser: 'Paradise has a wild side, and it’s usually right behind you.' },
      { title: 'You smell like a pirate', teaser: 'Hygiene is negotiable out here. So, apparently, is piracy.' },
      { title: 'I wet the bed', teaser: 'Not what you think. Possibly worse.' },
      { title: 'Twist and Spout', teaser: 'Waterspouts: gorgeous from a distance, terrifying from anywhere else.' },
      { title: 'Weather or not', teaser: 'The forecast is a suggestion. The ocean is not.' },
    ],
  },
  {
    part: 'Part 4: The East Coast',
    chapters: [
      { title: 'What if I have to go Poo?', teaser: 'The existential dread of every night watch, finally addressed.' },
      { title: "Dr Jekyll's Island", teaser: 'A place with two faces, and a family caught between them.' },
      { title: 'You say Savannah, I say Banana', teaser: 'Southern charm, mispronounced and very well fed.' },
      { title: 'Pepperoni is not a fruit', teaser: 'Provisioning wisdom, learned through nutritional crime.' },
      { title: 'House of Warship', teaser: 'Playing chicken with the U.S. Navy was not on the itinerary.' },
      { title: 'Feeling Crabby', teaser: 'How not to get crabs. Read carefully.' },
      { title: 'Tot', teaser: 'Small word. Big chapter.' },
      { title: "There's Always Room For Jello", teaser: 'Comfort food and chaos, in equal measure.' },
      { title: 'Oh Ophelia', teaser: 'When a storm has a name, it’s already too personal.' },
    ],
  },
  {
    part: 'Part 5: Due South',
    chapters: [
      { title: 'Boat Chill Factor', teaser: 'Cold, wind, and a family quietly questioning their life choices.' },
      { title: 'I lack depth', teaser: 'A confession — and a depth-sounder reading.' },
      { title: 'Wednesday', teaser: 'An ordinary day. On a boat, that’s never a given.' },
      { title: 'Anchor(s) Away', teaser: 'Everything that can drag, will.' },
      { title: 'Cinderella Lost Her Slipper', teaser: 'Something goes overboard. It does not come back.' },
      { title: 'Suck it Murphy', teaser: 'Whatever can go wrong has — repeatedly. The family fights back.' },
      { title: 'And Then We Hit a Rock', teaser: 'The title moment. Yes, there’s a rock. Yes, they hit it.' },
      { title: 'What the Fog?!', teaser: 'Zero visibility, full panic, classic Twig.' },
    ],
  },
  {
    part: 'Epilogue',
    chapters: [
      { title: "There's no place like home", teaser: 'After all of it, where “home” turns out to be.' },
      { title: 'Come Monday (Tribute to Jimmy Buffett)', teaser: 'A send-off, with a wink to the patron saint of boat life.' },
    ],
  },
  {
    part: 'Glossary of Ridiculous Nautical Jargon',
    chapters: [
      { title: 'Glossary', teaser: 'Every absurd term you just read, defined — keep it handy.' },
    ],
  },
];

// Chapter teasers for the /chapters page.
//
// Grounded in the actual book text (read end-to-end) — accurate hooks that
// tease, not spoil. Tune the wording anytime; the structure stays the same.

export interface Chapter {
  title: string;
  teaser: string;
}

export interface ChapterPart {
  part: string;
  chapters: Chapter[];
}

export const CHAPTERS: ChapterPart[] = [
  {
    part: 'Part 1: Damn you Lisa',
    chapters: [
      { title: 'Cocktails and Dreams', teaser: `One Jimmy Buffett song in his sister's beat-up Honda infected Greg with a thirty-year island obsession — and a third-date marriage pitch no sane woman should have accepted.` },
      { title: 'The hand of God', teaser: `The night before inspecting their dream boat in Fort Lauderdale, lightning literally rained down and struck it. The brokers called it lucky. They were wrong.` },
      { title: 'Down to the Banana Republics', teaser: `A whirlwind two-ocean weekend in Panama to buy the boat — complete with a mushroom-farm guesthouse, a marina blood feud, and one mysterious used bra.` },
      { title: 'Panama vs Twig', teaser: `Repairs become a multilingual grudge match against an entire country — windows, keel bolts, and the batteries — scored round by round.` },
      { title: 'Christmas Blows', teaser: `There's a season of brutal Caribbean "Christmas winds" no book warns you about — and it's exactly when 15-year-old rigging is delivering your boat home.` },
      { title: 'Georgia on my mind', teaser: `A three-day Denver-to-Brunswick haul, a rooftop luggage box exploding across Kansas, and an anchor so good a dive crew couldn't pull it out.` },
      { title: 'Love and a sailboat', teaser: `A misread road sign, endless rigging delays, and something dying in the rental floorboards — all while the family still doubts the boat is even real.` },
    ],
  },
  {
    part: 'Part 2: Afloat',
    chapters: [
      { title: 'All Aboard!', teaser: `The family finally meets Twig: a mud-caked disaster, a terrified cat, and a dog who needs a pirate plank just to pee.` },
      { title: "There's Vodka in the Boy's Bathroom", teaser: `Cramming a U-Haul of life into a five-pound sack becomes a never-ending "tile game" — which is how the booze ends up in the kids' shower.` },
      { title: 'Afloat', teaser: `Two hired captains, a depth gauge that lies, an unmarked anchor chain, and Meredith's first involuntary swim off a dock with a backpack of clean laundry.` },
      { title: 'Hazmat', teaser: `There's no reassuring "click" when you fuel a boat — there's a "whoosh," and miss it and you've got a diesel spill, dead ducklings, and a fuel-dock lady muttering "moron."` },
      { title: 'Things that go bump in the night', teaser: `Anchored too close to a buoy at midnight, Twig drags, wraps around it, and Greg botches his very first VHF distress call — four rites of passage in one night.` },
      { title: "Don't Ignore the Bright Red Light", teaser: `A dead battery, an oil spill, a bucket of dog poop knocked overboard, and one warning light Greg swore he could safely ignore. He could not.` },
      { title: 'Caulk the Wagon', teaser: `Cruising at the speed of a jogging 48-year-old turns the Thorny Path into a real-life Oregon Trail — complete with a waterspout and a game of cargo-ship Frogger.` },
      { title: 'Perfect Strangers', teaser: `Fifteen years married, and a broken dinghy davit reveals they're total strangers when it comes to fixing things — the software tinkerer versus the flight nurse.` },
    ],
  },
  {
    part: 'Part 3: The Bahamas',
    chapters: [
      { title: '42 Flushes', teaser: `Five people, eighty-four flushes, and a failed "joker valve" mean rationing toilet trips — and a repair Greg put off until the crew threatened mutiny.` },
      { title: 'The Nut Jiggler', teaser: `A machete duct-taped to a pole, a barefoot coconut raid, and a curious family of swimming pigs strolling out of the woods at dark.` },
      { title: 'Watch your six', teaser: `A windlass fixed with a hammer, a freezer dying, and a neighbor's radio call to gently mention that Twig is backing right over its own paddleboards.` },
      { title: 'You smell like a pirate', teaser: `A floating recipe for olfactory assault — mildew, diesel, dog doody in the heat — until the crew gives up showering and hoists the Jolly Roger.` },
      { title: 'I wet the bed', teaser: `The hatches sit right over the beds like sunroofs. Forget one before hosing down the solar panels, and yes — you'll wet the bed. Again.` },
      { title: 'Twist and Spout', teaser: `A nerve-wracking reverse docking earns Greg an undeserved "atta boy" — then a clear-sky "three hour tour" delivers the biggest waterspout veteran sailors had ever seen.` },
      { title: 'Weather or not', teaser: `Sailors don't have "the" weather app — they have a dozen, all wrong. A darkly funny tour of squalls, named storms, and the insurance bully you can never outrun.` },
    ],
  },
  {
    part: 'Part 4: The East Coast',
    chapters: [
      { title: 'What if I have to go Poo?', teaser: `First overnight passage, alone at the helm at 3 a.m., one increasingly urgent problem — and the fateful dinner choice of chili and coffee.` },
      { title: "Dr Jekyll's Island", teaser: `A lip-licking alligator, a dry stowaway raccoon who supposedly can't swim, a beer run on chainless bikes, and a friendly visit from the boat cops.` },
      { title: 'You say Savannah, I say Banana', teaser: `Their third haul-out spirals into stripped saildrive gears, a hidden fuse hunt, twenty feet of progress before disaster — and pirates who pick a lock.` },
      { title: 'Pepperoni is not a fruit', teaser: `When the nearest banana is a two-mile dinghy slog away, the kids start losing the plot — and the family accidentally eats ice cream for lunch.` },
      { title: 'House of Warship', teaser: `A confusing Chesapeake entrance, an aircraft carrier bearing down from behind, and an armed Navy boat that did not find Greg's "right of way" joke funny.` },
      { title: 'Feeling Crabby', teaser: `Chicken necks, a homemade trap, four strikeouts, and one rig sunk on the very first throw — then the kids finally taste blue crab and hate it.` },
      { title: 'Tot', teaser: `A guided tour of life in an 11-foot rubber raft as your family car: grind the top off a sedan, remove the brakes, add an inch of water, and steer behind your back.` },
      { title: "There's Always Room For Jello", teaser: `Three swims a day was the dream; jellyfish, gators, and motion sickness deliver a jello-bodied reality — and Meredith's mandatory family burpee plan.` },
      { title: 'Oh Ophelia', teaser: `An El Niño storm corners them in a tiny Deltaville marina, where Greg counts the storm surge foot by foot as the dock vanishes beneath the boat.` },
    ],
  },
  {
    part: 'Part 5: Due South',
    chapters: [
      { title: 'Boat Chill Factor', teaser: `Endless summer was the dream; instead it's 50 degrees in the Chesapeake, and Greg invents a wholly fictional (yet entirely real) "Boat Chill Factor" to cope.` },
      { title: 'I lack depth', teaser: `The depth sounder dies in shoal country — a saga of wrong parts, a missing sensor, a dreaded thru-hull swap, and a fix that turned out to be just "reboot it."` },
      { title: 'Wednesday', teaser: `No disasters this time. Just a long walk with the dog, a book in the cockpit, kids cooking dinner, and the quiet revelation of an ordinary, perfect Wednesday.` },
      { title: 'Anchor(s) Away', teaser: `In the pre-dawn dark, something horrifying clings to the anchor chain. Is it a body? A log? And why is that deck light so useless?` },
      { title: 'Cinderella Lost Her Slipper', teaser: `Five cases of Covid, a failed water pump, 50-knot winds — and an unmanned neighbor boat named Cinderella breaking loose to play Plinko with the anchorage.` },
      { title: 'Suck it Murphy', teaser: `A crossing where everything that can break does — windlass, chart plotter, drone, autopilot, steering, depth sounder, engine — and the galley's still closed when they arrive.` },
      { title: 'And Then We Hit a Rock', teaser: `A 19-hour marathon and a frantic harbor-hopping day end with a gut-wrenching CRUNCH on a rock the chart swore wasn't there — and a decision to head home.` },
      { title: 'What the Fog?!', teaser: `A six-leg relay race home against a spiteful Mother Nature: lost lures, two wedding rings gone, sudden blinding fog, and one last tearful goodbye to Twig.` },
    ],
  },
  {
    part: 'Epilogue',
    chapters: [
      { title: "There's no place like home", teaser: `Back in snowy Denver after 337 days, fielding the question everyone asks — "Would you do it again?" — from the strange far side of a lifelong dream.` },
      { title: 'Come Monday (Tribute to Jimmy Buffett)', teaser: `Written the day after Buffett died: the man who, song by song, talked Greg into quitting his job, buying a boat, and sailing off — and the gratitude that finally turned to tears.` },
    ],
  },
  {
    part: 'Glossary of Ridiculous Nautical Jargon',
    chapters: [
      { title: 'Glossary', teaser: `Every absurd term you just survived, defined — keep it handy.` },
    ],
  },
];

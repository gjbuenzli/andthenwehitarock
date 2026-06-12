// Cruising Hacks — ported from the old twigafloat blog. Each is a real boater
// tip; most recommend a gadget via an Amazon affiliate link (tag twigafloat-20).
// A few are product-less tips (affiliateUrl: null).

export interface Hack {
  slug: string;
  title: string;
  image: string; // /hacks/<file>
  affiliateUrl: string | null;
  blurb: string;
}

export const HACKS: Hack[] = [
  {
    slug: 'ammo-cans',
    title: 'Ammo Cans',
    image: '/hacks/ammo.jpeg',
    affiliateUrl: 'https://www.amazon.com/gp/product/B07B1QH4BQ?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=406f4d3bd6e96ca86e1448713582cbc7&camp=1789&creative=9325',
    blurb: `Tricked you — I'm not even going to touch guns on board. What I will talk about is ammo cans: small, waterproof, stackable, and handled. The perfect small-item storage for a boat, RV, or tiny house. We keep a half dozen on Twig — labeled and stacked in a cockpit locker — for drill bits, electrical parts, first aid, and more. Your creativity is the only limit.`,
  },
  {
    slug: 'brew-once-drink-often',
    title: 'Brew once, drink often',
    image: '/hacks/coffee.png',
    affiliateUrl: 'https://www.amazon.com/gp/product/B01N6T5QNO?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=eb4362249a2575efa1a510a6453dd3bf&camp=1789&creative=9325',
    blurb: `Every cruiser loves coffee — it gets you through night watches and early departures. But a glass carafe and a boat are a bad combo, and the hot plate scalds your brew while burning power all morning. Grab a thermal carafe coffee maker: it only draws power during the brew cycle and keeps coffee warm without scalding.`,
  },
  {
    slug: 'buzz-off',
    title: 'Buzz Off',
    image: '/hacks/thermacell.png',
    affiliateUrl: 'https://www.amazon.com/Thermacell-Cartridge-Repellent-Protection-Mosquito-Free/dp/B07JCQ8GQJ?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=f051701913be592fea13fb37557adf9b&camp=1789&creative=9325',
    blurb: `Bugs love me — mosquitos, no-see-ums, spiders, all of them. I'm delicious. We carry repellent, but on the boat we run a Thermacell: set it in the cockpit before sundown and get a bug-free evening outside. We use the fuel type over the rechargeable because it covers more than just mosquitos.`,
  },
  {
    slug: 'cloth-paper-towels',
    title: 'Cloth Paper Towels',
    image: '/hacks/paper-towel.png',
    affiliateUrl: 'https://www.amazon.com/Reusable-Washable-Absorbent-Friendly-Cardboard/dp/B0B47PSQZW?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=7a84d6b3cfe02c5db1cd4d6a681ae0a8&camp=1789&creative=9325',
    blurb: `Reduce, reuse, recycle. On a boat the 3 R's are a way of life — no room to store consumables or the trash they become. The biggest offender? Paper towels. We keep a few rolls for bacon grease and engine oil, but mostly we use cloth paper towels: small, washable, and rolled up just like mom's.`,
  },
  {
    slug: 'get-hooked',
    title: 'Get Hooked',
    image: '/hacks/hook.jpg',
    affiliateUrl: 'https://www.amazon.com/Adhesive-Waterproof-Rustproof-Stainless-Bathroom/dp/B09DV7SFGW?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=c6031539a2f86dd2483e38f61695c1c9&camp=1789&creative=9325',
    blurb: `The first thing everyone notices on Twig are the handy hooks everywhere. We tried it all — screwed-in hooks, Command strips, every hook on Amazon — then learned the trick: you need a robust sticky surface area to keep your hook hooked. We tried these and never went back (about four 20-packs so far).`,
  },
  {
    slug: 'get-lit',
    title: 'Get Lit',
    image: '/hacks/lights.jpg',
    affiliateUrl: 'https://www.amazon.com/Brightech-Ambience-Pro-Waterproof-Outdoor/dp/B075NS8YXG?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=917a2891e0a25d084b72a349a7188f68&camp=1789&creative=9325',
    blurb: `Nothing warms up a space like mood lighting — and your boat "yard" deserves it too. We run string lights in the cockpit and lanterns on all four corners. They look great, supplement our anchor light so other boats see us, and help us find our own boat dinghying back at night. And they're solar — switch on at dusk, last almost the whole night.`,
  },
  {
    slug: 'i-have-the-power',
    title: 'I Have the Power!',
    image: '/hacks/eneloop.jpg',
    affiliateUrl: 'https://www.amazon.com/Panasonic-BK-4MCCA4BA-eneloop-Pre-Charged-Rechargeable/dp/B00JHKSMJK?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=057986c417e006109a0185e6ef3bfad9&camp=1789&creative=9325',
    blurb: `"How much power do we have left?" gets asked on most sailboats several times a day. Beyond a good battery bank, have you seen how far rechargeable AA/AAAs have come? Our favorite is Eneloop by Panasonic — pop them in nearly every device, recharge when drained, skip the landfill. Need C or D cells? Adapters let a AA fill in.`,
  },
  {
    slug: 'inductive-reasoning',
    title: 'Inductive Reasoning',
    image: '/hacks/induction.jpg',
    affiliateUrl: 'https://www.amazon.com/Duxtop-8100MC-Portable-Induction-Countertop/dp/B0045QEPYM?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=39c7dc504a9b4c36c4ce61972c04e5eb&camp=1789&creative=9325',
    blurb: `Got a propane stove and figure you don't need electric? Wrong — you need an induction cooktop. When you run out of propane or your regulator breaks (it happened to us, weeks to fix), induction saves the day. It only heats special cookware (no 300-degree burns), runs off the solar or wind you already have, and gives you an extra burner.`,
  },
  {
    slug: 'keep-it-cool',
    title: 'Keep It Cool',
    image: '/hacks/dometic.jpg',
    affiliateUrl: 'https://www.amazon.com/DOMETIC-75Liter-Portable-Refrigerator-Freezer/dp/B0CHXMT21Z/ref=sr_1_14?crid=69S3021KW363&keywords=dometic+cfx&qid=1695303368&sprefix=dometic+cfx%2Caps%2C145&sr=8-14&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=2653b4929fcdcf49372fa15f4ec7e980&camp=1789&creative=9325',
    blurb: `Fridge space is the eternal sailboat problem — many cruisers live on former charter boats built for week-long trips, not for hoarding a Costco haul. Dometic (who makes everything else on your boat) has a fix: great electric coolers that run on AC or DC, with two zones that switch between fridge and freezer at will. We have both. You're welcome.`,
  },
  {
    slug: 'kill-the-paper-napkins',
    title: 'Kill the paper (napkins)',
    image: '/hacks/napkin.jpg',
    affiliateUrl: 'https://www.amazon.com/Ruvanti-Cotton-Napkins-Comfortable-Reusable/dp/B07FW8KP2N?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=0435e3341a35d13dff69579f6a00839d&camp=1789&creative=9325',
    blurb: `Cloth napkins are a no-brainer, especially if you've already switched to cloth paper towels (just use one as the other if you want). Same principles: less waste, less reliance on hard-to-source paper, less storage. Getcha some.`,
  },
  {
    slug: 'look-above',
    title: 'Look Above',
    image: '/hacks/look-above.jpg',
    affiliateUrl: 'https://www.amazon.com/ABN-Cargo-Fasteners-Hardware-Stretches/dp/B01IIPP3M8?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=59ea961b0c0924c0c2bffbd55d95bddd&camp=1789&creative=9325',
    blurb: `On a boat, RV, or tiny home you have to get creative about storage. One of our biggest "omg that's obvious now" wins was the ceiling. Yup. Spare lifejackets ride in a cargo net on our favorite hooks, paddles nestle into a fishing-pole holder, and even the potato chips live in a "chip hammock." Grab some tight-weave cargo nets and get creative.`,
  },
  {
    slug: 'nix-the-vita-mix',
    title: 'Nix the (Vita)Mix',
    image: '/hacks/nutribullet.jpg',
    affiliateUrl: 'https://www.amazon.com/Nutribullet-Superfood-Nutrition-Extractor-NBR-0601/dp/B07CTBHQZK?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=7b056a7705cd5fd974baf7fdea35d11c&camp=1789&creative=9325',
    blurb: `Everybody has a VitaMix — expensive and big, so it must be good, right? Ours came with the boat and never gets used: bulky and a pain to clean. But we make hummus and smoothies several times a week. How? The NutriBullet — small, the blender cup doubles as the serving cup, cleanup is a snap. Pro tip: order spare gears when you buy one.`,
  },
  {
    slug: 'pop-it-like-it-s-hot',
    title: `Pop it like it's Hot`,
    image: '/hacks/popcorn.jpg',
    affiliateUrl: 'https://www.amazon.com/gp/product/B0098IOL2S?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=a91bc542cca0ee392e2e5e9618fdd761&camp=1789&creative=9325',
    blurb: `We love chips — then we hit the Bahamas where a bag of Doritos runs $7, and we had no room to store 50 bags anyway. What we did have room for? Popcorn kernels and an air popper. Now we hit the salty craving with popcorn, and a seasoning multi-pack keeps it interesting. Pro tip: air-popped corn is bone dry, so spray a little coconut oil before seasoning so it sticks.`,
  },
  {
    slug: 'sail-in-movie',
    title: 'Sail in Movie',
    image: '/hacks/sail-in-movie.jpg',
    affiliateUrl: 'https://www.amazon.com/TMY-Projector-Supported-Projection-Compatible/dp/B082F13J55?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=9884249a93c56cab8c5990de22e34e5b&camp=1789&creative=9325',
    blurb: `It's amazing what a movie under the stars does for morale on a boat. Keep the bugs in check with a Thermacell and the whole crew rallies around the drive-in vibe. Expensive? Nope — an inexpensive projector gets it done (the linked one even includes a screen, though a white sheet works too). I've heard of families projecting onto their sail to watch underway at night.`,
  },
  {
    slug: 'shrivel-up-and-dry',
    title: 'Shrivel up and Dry',
    image: '/hacks/dried.png',
    affiliateUrl: 'https://www.amazon.com/gp/product/B0096I5DJU/ref=ewc_pr_img_2?smid=ATVPDKIKX0DER&psc=1&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=4b6b685b9ae79deda4330886598b9878&camp=1789&creative=9325',
    blurb: `Our biggest worry sailing off was getting enough milk for the kids — 3.5 gallons a week, and no fridge space for it. So we tried dried milk. Straight up, the kids rebelled. But mixed into pancakes and waffles? A total hit — they preferred it. We do dried eggs too now. Bonus: shelf-stable milk isn't half bad, as long as you serve it cold.`,
  },
  {
    slug: 'smaller-is-better',
    title: 'Smaller is better',
    image: '/hacks/dash-2.png',
    affiliateUrl: 'https://www.amazon.com/gp/product/B01NAM6F2J?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=9b6319036b432e9c4ca1b253af2ebaad&camp=1789&creative=9325',
    blurb: `One of the most useful galley gadgets on Twig is our mini waffle maker — makers, actually, because we have two. Under $20, they make a perfect 4-inch waffle (the size of those frozen ones). And before you scold me for a single-use appliance: meet the chaffle, plus mess-free eggs with easy cleanup.`,
  },
  {
    slug: 'soap-n-water',
    title: 'Soap n Water',
    image: '/hacks/dawn.png',
    affiliateUrl: 'https://www.amazon.com/Refillable-Containers-Adjustable-Gardening-Aromatherapy/dp/B08TX143D9?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=5bb4c170bbd851b543c90d431b4bd822&camp=1789&creative=9325',
    blurb: `Chances are you keep a sink full of sudsy water or burn through dish soap by the gallon. The secret: a spray bottle filled mostly with water plus a shot of dish soap. Spray it on dishes instead of a full squirt — mostly water so you don't run the sink, but enough soap to clean. Same trick makes foaming hand soap (50/50 cheap soap and water).`,
  },
  {
    slug: 'stream-it',
    title: 'Stream it',
    image: '/hacks/sodastream.jpg',
    affiliateUrl: 'https://www.amazon.com/dp/B0BS9W68NH?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=092ff573ee247356da2aae742db7fced&camp=1789&creative=9325',
    blurb: `If you don't have a SodaStream aboard, go get one. The storage saved over hauling cans of soda should sell you — not to mention the lack of your favorite soda on islands far away. I'm a Diet Pepsi guy and wasn't a believer until DP syrup showed up at Target. Now we use it for soda, soda water, tonic — you name it. A CO2 refill lasts about a year.`,
  },
  {
    slug: 'streetch-horton-streetch',
    title: 'Streetch Horton, Streetch',
    image: '/hacks/bungee.jpg',
    affiliateUrl: 'https://www.amazon.com/Kotap-Adjustable-Bungee-10-Piece-Assortment/dp/B00UW5BP70?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=12dbf0bf978cfb01a6db69bcacfeb2d9&camp=1789&creative=9325',
    blurb: `Fancy knots are the time-honored way to tie down anything — but sometimes you want quick and easy and don't feel like hunting down a 5-foot piece of rope. That's why we keep dozens of bungees around. We hold down SUPs, hold up curtains, and keep our scuba tanks from rattling. These are plastic-coated (no rust yet) and adjust to length.`,
  },
  {
    slug: 'turkish-delight',
    title: 'Turkish Delight',
    image: '/hacks/turkish.jpg',
    affiliateUrl: 'https://www.amazon.com/GLAMBURG-Peshtemal-Turkish-Oversized-Absorbent/dp/B07PPHYX2Q?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=88f028b79e4c79f9de46340c111622eb&camp=1789&creative=9325',
    blurb: `You will get wet — early, often, in the shower, and even while sleeping (rain). But regular towels are huge, bulky, and hard to store. Wrong tool. Meet the Turkish towel: lightweight, quick-drying, and it gets the job done. We have no problem storing enough for a family of five in a small cabinet.`,
  },
  {
    slug: 'what-sup',
    title: 'What SUP?',
    image: '/hacks/sup-pump.jpg',
    affiliateUrl: 'https://www.amazon.com/gp/product/B08PFV3MVW?&_encoding=UTF8&tag=twigafloat-20&linkCode=ur2&linkId=74bff8dfc699fa744cc136210dc0e747&camp=1789&creative=9325',
    blurb: `Every boat seems to have a stand-up paddleboard now — but this hack isn't about that. Here's the secret: your dinghy probably uses the same valve adapter as your SUP. That means one SUP pump in the dinghy serves as both your dinghy pump and your SUP pump — no separate foot pump needed.`,
  },
  // --- product-less tips (still classic Twig hacks) ---
  {
    slug: 'ginger-ale-in-the-bathroom',
    title: 'Ginger Ale in the bathroom',
    image: '/hacks/ginger.jpg',
    affiliateUrl: null,
    blurb: `"The ginger ale is in the boy's bathroom" — a sentence we say all the time. Our former charter cat has a head per couple, but a family of five can't run two showers without killing the water pump. So we converted the extra heads into storage: one's the laundry room, another's beverage storage and the boys' bathroom. A lifesaver on a boat short on space.`,
  },
  {
    slug: 'oh-captain-my-captain',
    title: 'Oh Captain My Captain',
    image: '/hacks/captain.jpg',
    affiliateUrl: null,
    blurb: `People used to have a mess of kids to get work done on the farm — a boat is no different. Our favorite chore is "Dinghy Captain": the DC keeps the dinghy inflated and gassed, helps lower it off the davit, and checks the SUPs. After all that work, the DC earns the privilege of driving the dinghy that day (check local regs).`,
  },
  {
    slug: 'spot-me-5',
    title: 'Spot me $5?',
    image: '/hacks/fivedollar.jpg',
    affiliateUrl: null,
    blurb: `A couple bucks beats nothing to thank a dock hand — but if you want to acknowledge that inflation is real, reach for a $5 (or a $10); they'll appreciate it. It's easy and low-risk to keep a small stack of fivers at the ready.`,
  },
  {
    slug: 'what-s-the-point',
    title: `What's the Point?`,
    image: '/hacks/pointer.jpg',
    affiliateUrl: null,
    blurb: `Our second favorite way to get the kids involved — especially the little ones — is "Anchor Pointer." When we pull up the anchor, they stand on the bow and point to where it is, helping the helm adjust while whoever's on the windlass focuses. Bonus job: put a kid on the freshwater hose to spray mud off the chain.`,
  },
];

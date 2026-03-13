/**
 * Comprehensive bike brands and models database for VeloSync.
 * Focused on bikes commonly used for bikepacking, touring, gravel, and adventure riding.
 * Users can also enter custom brands/models not in this list.
 */

export interface BikeModelEntry {
  model: string;
  type: string; // touring, gravel, mountain, fat, road, ebike
  weight_grams?: number; // approximate frame weight in grams (complete bike estimate)
}

export interface BikeBrandEntry {
  brand: string;
  country: string;
  models: BikeModelEntry[];
}

export const BIKE_BRANDS_AND_MODELS: BikeBrandEntry[] = [
  // ─── S U R L Y ───────────────────────────────────────────────
  {
    brand: "Surly",
    country: "USA",
    models: [
      { model: "Bridge Club", type: "touring", weight_grams: 13600 },
      { model: "Long Haul Trucker", type: "touring", weight_grams: 14500 },
      { model: "Disc Trucker", type: "touring", weight_grams: 14800 },
      { model: "Straggler", type: "gravel", weight_grams: 11800 },
      { model: "Midnight Special", type: "gravel", weight_grams: 11200 },
      { model: "Cross-Check", type: "touring", weight_grams: 12500 },
      { model: "Pack Rat", type: "touring", weight_grams: 12900 },
      { model: "Ogre", type: "mountain", weight_grams: 14200 },
      { model: "ECR", type: "mountain", weight_grams: 15000 },
      { model: "Karate Monkey", type: "mountain", weight_grams: 13200 },
      { model: "Krampus", type: "fat", weight_grams: 14800 },
      { model: "Wednesday", type: "fat", weight_grams: 15500 },
      { model: "Ice Cream Truck", type: "fat", weight_grams: 16200 },
      { model: "Pugsley", type: "fat", weight_grams: 16000 },
      { model: "Grappler", type: "gravel", weight_grams: 12800 },
      { model: "Ghost Grappler", type: "gravel", weight_grams: 12600 },
      { model: "Preamble", type: "gravel", weight_grams: 11500 },
    ],
  },

  // ─── S A L S A ───────────────────────────────────────────────
  {
    brand: "Salsa",
    country: "USA",
    models: [
      { model: "Cutthroat", type: "gravel", weight_grams: 10200 },
      { model: "Fargo", type: "gravel", weight_grams: 12000 },
      { model: "Journeyman", type: "gravel", weight_grams: 11800 },
      { model: "Warbird", type: "gravel", weight_grams: 9200 },
      { model: "Vaya", type: "touring", weight_grams: 12500 },
      { model: "Marrakesh", type: "touring", weight_grams: 14000 },
      { model: "Mukluk", type: "fat", weight_grams: 15800 },
      { model: "Beargrease", type: "fat", weight_grams: 13500 },
      { model: "Blackborow", type: "fat", weight_grams: 16500 },
      { model: "Timberjack", type: "mountain", weight_grams: 13800 },
      { model: "Spearfish", type: "mountain", weight_grams: 12500 },
      { model: "Horsethief", type: "mountain", weight_grams: 13500 },
      { model: "Stormchaser", type: "gravel", weight_grams: 8800 },
    ],
  },

  // ─── T R E K ─────────────────────────────────────────────────
  {
    brand: "Trek",
    country: "USA",
    models: [
      { model: "1120", type: "touring", weight_grams: 14100 },
      { model: "920", type: "touring", weight_grams: 13800 },
      { model: "520", type: "touring", weight_grams: 13500 },
      { model: "Checkpoint ALR", type: "gravel", weight_grams: 10200 },
      { model: "Checkpoint SL", type: "gravel", weight_grams: 9000 },
      { model: "Checkpoint SLR", type: "gravel", weight_grams: 8200 },
      { model: "Domane AL", type: "road", weight_grams: 9800 },
      { model: "Domane SL", type: "road", weight_grams: 8900 },
      { model: "Domane SLR", type: "road", weight_grams: 8000 },
      { model: "Madone SL", type: "road", weight_grams: 8200 },
      { model: "Emonda ALR", type: "road", weight_grams: 9200 },
      { model: "Emonda SLR", type: "road", weight_grams: 7200 },
      { model: "Roscoe", type: "mountain", weight_grams: 14500 },
      { model: "Marlin", type: "mountain", weight_grams: 14200 },
      { model: "X-Caliber", type: "mountain", weight_grams: 12800 },
      { model: "Top Fuel", type: "mountain", weight_grams: 12200 },
      { model: "Fuel EX", type: "mountain", weight_grams: 13800 },
      { model: "Remedy", type: "mountain", weight_grams: 15000 },
      { model: "Farley", type: "fat", weight_grams: 15200 },
      { model: "Rail", type: "ebike", weight_grams: 23000 },
      { model: "Powerfly", type: "ebike", weight_grams: 23500 },
      { model: "Allant+", type: "ebike", weight_grams: 25000 },
      { model: "Verve+", type: "ebike", weight_grams: 24000 },
    ],
  },

  // ─── S P E C I A L I Z E D ───────────────────────────────────
  {
    brand: "Specialized",
    country: "USA",
    models: [
      { model: "Sequoia", type: "touring", weight_grams: 12200 },
      { model: "AWOL", type: "touring", weight_grams: 13000 },
      { model: "Diverge STR", type: "gravel", weight_grams: 9800 },
      { model: "Diverge Comp", type: "gravel", weight_grams: 9500 },
      { model: "Diverge Expert", type: "gravel", weight_grams: 8800 },
      { model: "Crux", type: "gravel", weight_grams: 7800 },
      { model: "Roubaix", type: "road", weight_grams: 8500 },
      { model: "Tarmac SL", type: "road", weight_grams: 7500 },
      { model: "Allez", type: "road", weight_grams: 9200 },
      { model: "Aethos", type: "road", weight_grams: 6800 },
      { model: "Chisel", type: "mountain", weight_grams: 11500 },
      { model: "Epic", type: "mountain", weight_grams: 11000 },
      { model: "Stumpjumper", type: "mountain", weight_grams: 13500 },
      { model: "Enduro", type: "mountain", weight_grams: 15800 },
      { model: "Fuse", type: "mountain", weight_grams: 14200 },
      { model: "Fatboy", type: "fat", weight_grams: 15000 },
      { model: "Turbo Vado", type: "ebike", weight_grams: 22000 },
      { model: "Turbo Creo", type: "ebike", weight_grams: 12800 },
      { model: "Turbo Levo", type: "ebike", weight_grams: 23000 },
      { model: "Turbo Como", type: "ebike", weight_grams: 24500 },
    ],
  },

  // ─── G I A N T ───────────────────────────────────────────────
  {
    brand: "Giant",
    country: "Taiwan",
    models: [
      { model: "Revolt Advanced", type: "gravel", weight_grams: 9200 },
      { model: "Revolt", type: "gravel", weight_grams: 10500 },
      { model: "ToughRoad SLR", type: "touring", weight_grams: 11800 },
      { model: "Defy Advanced", type: "road", weight_grams: 8200 },
      { model: "TCR Advanced", type: "road", weight_grams: 7500 },
      { model: "Propel", type: "road", weight_grams: 7800 },
      { model: "Contend", type: "road", weight_grams: 9500 },
      { model: "Fathom", type: "mountain", weight_grams: 13500 },
      { model: "Trance", type: "mountain", weight_grams: 14200 },
      { model: "Stance", type: "mountain", weight_grams: 14800 },
      { model: "XTC Advanced", type: "mountain", weight_grams: 11000 },
      { model: "Reign", type: "mountain", weight_grams: 15500 },
      { model: "Yukon", type: "fat", weight_grams: 15800 },
      { model: "Explore E+", type: "ebike", weight_grams: 23500 },
      { model: "Trance X E+", type: "ebike", weight_grams: 24000 },
    ],
  },

  // ─── C A N N O N D A L E ─────────────────────────────────────
  {
    brand: "Cannondale",
    country: "USA",
    models: [
      { model: "Topstone Carbon", type: "gravel", weight_grams: 9000 },
      { model: "Topstone Alloy", type: "gravel", weight_grams: 10200 },
      { model: "Touring", type: "touring", weight_grams: 13200 },
      { model: "SuperSix EVO", type: "road", weight_grams: 7800 },
      { model: "CAAD", type: "road", weight_grams: 8800 },
      { model: "Synapse", type: "road", weight_grams: 9000 },
      { model: "Trail", type: "mountain", weight_grams: 14500 },
      { model: "Scalpel", type: "mountain", weight_grams: 11500 },
      { model: "Habit", type: "mountain", weight_grams: 13800 },
      { model: "Jekyll", type: "mountain", weight_grams: 15200 },
      { model: "Fat CAAD", type: "fat", weight_grams: 15500 },
      { model: "Topstone Neo", type: "ebike", weight_grams: 19000 },
      { model: "Moterra Neo", type: "ebike", weight_grams: 24000 },
    ],
  },

  // ─── S A N T A  C R U Z ──────────────────────────────────────
  {
    brand: "Santa Cruz",
    country: "USA",
    models: [
      { model: "Stigmata", type: "gravel", weight_grams: 9500 },
      { model: "Highball", type: "mountain", weight_grams: 11200 },
      { model: "Chameleon", type: "mountain", weight_grams: 12800 },
      { model: "Tallboy", type: "mountain", weight_grams: 13000 },
      { model: "5010", type: "mountain", weight_grams: 13500 },
      { model: "Hightower", type: "mountain", weight_grams: 14200 },
      { model: "Bronson", type: "mountain", weight_grams: 14800 },
      { model: "Megatower", type: "mountain", weight_grams: 15500 },
      { model: "Nomad", type: "mountain", weight_grams: 16200 },
      { model: "Bullit", type: "ebike", weight_grams: 23000 },
      { model: "Heckler", type: "ebike", weight_grams: 22500 },
    ],
  },

  // ─── K O N A ─────────────────────────────────────────────────
  {
    brand: "Kona",
    country: "Canada",
    models: [
      { model: "Sutra", type: "touring", weight_grams: 13500 },
      { model: "Sutra LTD", type: "touring", weight_grams: 12800 },
      { model: "Sutra ULTD", type: "gravel", weight_grams: 12500 },
      { model: "Rove", type: "gravel", weight_grams: 11500 },
      { model: "Rove LTD", type: "gravel", weight_grams: 10800 },
      { model: "Libre", type: "gravel", weight_grams: 9500 },
      { model: "Unit X", type: "mountain", weight_grams: 13200 },
      { model: "Honzo", type: "mountain", weight_grams: 13000 },
      { model: "Process 134", type: "mountain", weight_grams: 14500 },
      { model: "Process 153", type: "mountain", weight_grams: 15200 },
      { model: "Big Honzo", type: "fat", weight_grams: 14800 },
      { model: "Wo", type: "fat", weight_grams: 15800 },
      { model: "Remote", type: "ebike", weight_grams: 23500 },
    ],
  },

  // ─── R I V E L O / B R O M P T O N / T E R N (folding/urban) ─
  // Skipping — not relevant to bikepacking

  // ─── C E R V É L O ───────────────────────────────────────────
  {
    brand: "Cervélo",
    country: "Canada",
    models: [
      { model: "Áspero", type: "gravel", weight_grams: 8800 },
      { model: "Áspero-5", type: "gravel", weight_grams: 8200 },
      { model: "R5", type: "road", weight_grams: 7200 },
      { model: "S5", type: "road", weight_grams: 7800 },
      { model: "Caledonia", type: "road", weight_grams: 8500 },
      { model: "Caledonia-5", type: "road", weight_grams: 7800 },
    ],
  },

  // ─── C A N Y O N ─────────────────────────────────────────────
  {
    brand: "Canyon",
    country: "Germany",
    models: [
      { model: "Grail CF", type: "gravel", weight_grams: 8500 },
      { model: "Grail AL", type: "gravel", weight_grams: 9800 },
      { model: "Grizl CF", type: "gravel", weight_grams: 9200 },
      { model: "Grizl AL", type: "gravel", weight_grams: 10500 },
      { model: "Endurace CF", type: "road", weight_grams: 7800 },
      { model: "Ultimate CF", type: "road", weight_grams: 7200 },
      { model: "Aeroad CF", type: "road", weight_grams: 7500 },
      { model: "Exceed CF", type: "mountain", weight_grams: 10800 },
      { model: "Lux Trail", type: "mountain", weight_grams: 12200 },
      { model: "Neuron", type: "mountain", weight_grams: 13500 },
      { model: "Spectral", type: "mountain", weight_grams: 14500 },
      { model: "Strive", type: "mountain", weight_grams: 15200 },
      { model: "Torque", type: "mountain", weight_grams: 16000 },
      { model: "Dude", type: "fat", weight_grams: 14500 },
      { model: "Neuron:ONfly", type: "ebike", weight_grams: 18500 },
      { model: "Spectral:ON", type: "ebike", weight_grams: 23000 },
    ],
  },

  // ─── R I V E N D E L L ───────────────────────────────────────
  {
    brand: "Rivendell",
    country: "USA",
    models: [
      { model: "Atlantis", type: "touring", weight_grams: 14000 },
      { model: "Sam Hillborne", type: "touring", weight_grams: 13500 },
      { model: "Clem Smith Jr.", type: "touring", weight_grams: 14500 },
      { model: "Joe Appaloosa", type: "touring", weight_grams: 13800 },
      { model: "A. Homer Hilsen", type: "touring", weight_grams: 13200 },
    ],
  },

  // ─── T O U R I N G / A D V E N T U R E  S P E C I A L I S T S ─

  {
    brand: "Koga",
    country: "Netherlands",
    models: [
      { model: "WorldTraveller", type: "touring", weight_grams: 15000 },
      { model: "WorldTraveller-S", type: "touring", weight_grams: 14500 },
      { model: "Signature Randonneur", type: "touring", weight_grams: 13500 },
      { model: "F3 5.0", type: "gravel", weight_grams: 10800 },
    ],
  },

  {
    brand: "Thorn",
    country: "UK",
    models: [
      { model: "Sherpa", type: "touring", weight_grams: 14200 },
      { model: "Nomad MK3", type: "touring", weight_grams: 15000 },
      { model: "Raven", type: "touring", weight_grams: 13200 },
      { model: "Club Tour", type: "touring", weight_grams: 13800 },
    ],
  },

  {
    brand: "Tout Terrain",
    country: "Germany",
    models: [
      { model: "Silkroad", type: "touring", weight_grams: 14800 },
      { model: "Amber Road", type: "touring", weight_grams: 14200 },
      { model: "Via Veneto", type: "touring", weight_grams: 14500 },
      { model: "Outback Xplore", type: "touring", weight_grams: 14000 },
    ],
  },

  {
    brand: "Co-Motion",
    country: "USA",
    models: [
      { model: "Siskiyou", type: "touring", weight_grams: 13500 },
      { model: "Divide", type: "touring", weight_grams: 13000 },
      { model: "Pangea", type: "touring", weight_grams: 12800 },
      { model: "Cascadia", type: "gravel", weight_grams: 11000 },
    ],
  },

  // ─── B R O O K S / V O D O O / G E N E S I S  (UK brands) ──
  {
    brand: "Genesis",
    country: "UK",
    models: [
      { model: "Tour de Fer", type: "touring", weight_grams: 13200 },
      { model: "Vagabond", type: "gravel", weight_grams: 11800 },
      { model: "Fugio", type: "gravel", weight_grams: 10200 },
      { model: "Croix de Fer", type: "gravel", weight_grams: 11500 },
      { model: "Longitude", type: "touring", weight_grams: 14000 },
      { model: "CDA", type: "gravel", weight_grams: 10800 },
    ],
  },

  // ─── B I A N C H I ───────────────────────────────────────────
  {
    brand: "Bianchi",
    country: "Italy",
    models: [
      { model: "Impulso AllRoad", type: "gravel", weight_grams: 10500 },
      { model: "Arcadex", type: "gravel", weight_grams: 8500 },
      { model: "Oltre RC", type: "road", weight_grams: 7200 },
      { model: "Infinito XE", type: "road", weight_grams: 8500 },
      { model: "Sprint", type: "road", weight_grams: 8000 },
      { model: "Via Nirone 7", type: "road", weight_grams: 9500 },
      { model: "e-Impulso", type: "ebike", weight_grams: 16500 },
    ],
  },

  // ─── P I N A R E L L O ───────────────────────────────────────
  {
    brand: "Pinarello",
    country: "Italy",
    models: [
      { model: "Grevil", type: "gravel", weight_grams: 8800 },
      { model: "Dogma F", type: "road", weight_grams: 6800 },
      { model: "F Series", type: "road", weight_grams: 7500 },
      { model: "Paris", type: "road", weight_grams: 8200 },
      { model: "Nytro", type: "ebike", weight_grams: 13500 },
    ],
  },

  // ─── C O L N A G O ───────────────────────────────────────────
  {
    brand: "Colnago",
    country: "Italy",
    models: [
      { model: "G3X", type: "gravel", weight_grams: 9000 },
      { model: "C68", type: "road", weight_grams: 7000 },
      { model: "V4Rs", type: "road", weight_grams: 7200 },
    ],
  },

  // ─── R I D L E Y ─────────────────────────────────────────────
  {
    brand: "Ridley",
    country: "Belgium",
    models: [
      { model: "Kanzo Adventure", type: "gravel", weight_grams: 10200 },
      { model: "Kanzo Fast", type: "gravel", weight_grams: 8500 },
      { model: "Kanzo Speed", type: "gravel", weight_grams: 8000 },
      { model: "Fenix Disc", type: "road", weight_grams: 8500 },
      { model: "Helium SLX", type: "road", weight_grams: 7200 },
      { model: "Noah Fast", type: "road", weight_grams: 7500 },
    ],
  },

  // ─── S C O T T ───────────────────────────────────────────────
  {
    brand: "Scott",
    country: "Switzerland",
    models: [
      { model: "Addict Gravel", type: "gravel", weight_grams: 8500 },
      { model: "Speedster Gravel", type: "gravel", weight_grams: 10000 },
      { model: "Addict RC", type: "road", weight_grams: 7200 },
      { model: "Foil RC", type: "road", weight_grams: 7500 },
      { model: "Speedster", type: "road", weight_grams: 9000 },
      { model: "Scale", type: "mountain", weight_grams: 10500 },
      { model: "Spark", type: "mountain", weight_grams: 12200 },
      { model: "Genius", type: "mountain", weight_grams: 14000 },
      { model: "Ransom", type: "mountain", weight_grams: 15500 },
      { model: "Lumen", type: "ebike", weight_grams: 16000 },
      { model: "Patron", type: "ebike", weight_grams: 23500 },
    ],
  },

  // ─── M E R I D A ─────────────────────────────────────────────
  {
    brand: "Merida",
    country: "Taiwan",
    models: [
      { model: "Silex", type: "gravel", weight_grams: 9500 },
      { model: "Scultura Endurance", type: "road", weight_grams: 8200 },
      { model: "Reacto", type: "road", weight_grams: 7500 },
      { model: "Scultura", type: "road", weight_grams: 7800 },
      { model: "Big.Nine", type: "mountain", weight_grams: 12500 },
      { model: "Big.Trail", type: "mountain", weight_grams: 14000 },
      { model: "One-Forty", type: "mountain", weight_grams: 14500 },
      { model: "One-Sixty", type: "mountain", weight_grams: 15800 },
      { model: "eOne-Sixty", type: "ebike", weight_grams: 24000 },
    ],
  },

  // ─── C U B E ─────────────────────────────────────────────────
  {
    brand: "Cube",
    country: "Germany",
    models: [
      { model: "Nuroad", type: "gravel", weight_grams: 10500 },
      { model: "Nuroad Race", type: "gravel", weight_grams: 9200 },
      { model: "Travel", type: "touring", weight_grams: 14000 },
      { model: "Attain", type: "road", weight_grams: 9000 },
      { model: "Litening", type: "road", weight_grams: 7500 },
      { model: "Reaction", type: "mountain", weight_grams: 12500 },
      { model: "Stereo", type: "mountain", weight_grams: 14500 },
      { model: "Stereo Hybrid", type: "ebike", weight_grams: 24000 },
      { model: "Kathmandu Hybrid", type: "ebike", weight_grams: 26000 },
    ],
  },

  // ─── F O C U S ───────────────────────────────────────────────
  {
    brand: "Focus",
    country: "Germany",
    models: [
      { model: "Atlas", type: "gravel", weight_grams: 10000 },
      { model: "Atlas 6.8", type: "gravel", weight_grams: 9200 },
      { model: "Paralane", type: "road", weight_grams: 8500 },
      { model: "Izalco Max", type: "road", weight_grams: 7200 },
      { model: "Jam", type: "mountain", weight_grams: 14500 },
      { model: "Thron", type: "mountain", weight_grams: 14200 },
      { model: "Jarifa2", type: "ebike", weight_grams: 23500 },
    ],
  },

  // ─── B M C ───────────────────────────────────────────────────
  {
    brand: "BMC",
    country: "Switzerland",
    models: [
      { model: "URS", type: "gravel", weight_grams: 9000 },
      { model: "Kaius", type: "gravel", weight_grams: 8500 },
      { model: "Teammachine SLR", type: "road", weight_grams: 7200 },
      { model: "Roadmachine", type: "road", weight_grams: 8200 },
      { model: "Twostroke", type: "mountain", weight_grams: 10800 },
      { model: "Fourstroke", type: "mountain", weight_grams: 12200 },
      { model: "Speedfox", type: "mountain", weight_grams: 14000 },
    ],
  },

  // ─── N I N E R ───────────────────────────────────────────────
  {
    brand: "Niner",
    country: "USA",
    models: [
      { model: "RLT 9 RDO", type: "gravel", weight_grams: 9000 },
      { model: "RLT 9 Steel", type: "gravel", weight_grams: 11500 },
      { model: "MCR 9 RDO", type: "gravel", weight_grams: 10200 },
      { model: "SIR 9", type: "mountain", weight_grams: 12000 },
      { model: "AIR 9 RDO", type: "mountain", weight_grams: 10500 },
      { model: "JET 9 RDO", type: "mountain", weight_grams: 12500 },
      { model: "RIP 9 RDO", type: "mountain", weight_grams: 14000 },
    ],
  },

  // ─── L A P I E R R E ─────────────────────────────────────────
  {
    brand: "Lapierre",
    country: "France",
    models: [
      { model: "Crosshill", type: "gravel", weight_grams: 9500 },
      { model: "Pulsium", type: "road", weight_grams: 8500 },
      { model: "Xelius", type: "road", weight_grams: 7800 },
      { model: "Prorace", type: "mountain", weight_grams: 11000 },
      { model: "Zesty", type: "mountain", weight_grams: 14000 },
      { model: "Spicy", type: "mountain", weight_grams: 15500 },
      { model: "Overvolt", type: "ebike", weight_grams: 24000 },
    ],
  },

  // ─── O R B E A ───────────────────────────────────────────────
  {
    brand: "Orbea",
    country: "Spain",
    models: [
      { model: "Terra", type: "gravel", weight_grams: 9000 },
      { model: "Terra H", type: "gravel", weight_grams: 10200 },
      { model: "Orca", type: "road", weight_grams: 7500 },
      { model: "Avant", type: "road", weight_grams: 8800 },
      { model: "Oiz", type: "mountain", weight_grams: 10800 },
      { model: "Occam", type: "mountain", weight_grams: 13500 },
      { model: "Rallon", type: "mountain", weight_grams: 15500 },
      { model: "Wild", type: "ebike", weight_grams: 23500 },
      { model: "Gain", type: "ebike", weight_grams: 13000 },
      { model: "Rise", type: "ebike", weight_grams: 17500 },
    ],
  },

  // ─── Y E T I ─────────────────────────────────────────────────
  {
    brand: "Yeti",
    country: "USA",
    models: [
      { model: "ARC", type: "mountain", weight_grams: 11500 },
      { model: "SB115", type: "mountain", weight_grams: 12500 },
      { model: "SB130", type: "mountain", weight_grams: 13500 },
      { model: "SB140", type: "mountain", weight_grams: 14200 },
      { model: "SB150", type: "mountain", weight_grams: 14800 },
      { model: "SB160", type: "mountain", weight_grams: 15500 },
      { model: "160E", type: "ebike", weight_grams: 23000 },
    ],
  },

  // ─── I B I S ─────────────────────────────────────────────────
  {
    brand: "Ibis",
    country: "USA",
    models: [
      { model: "Hakka MX", type: "gravel", weight_grams: 9500 },
      { model: "DV9", type: "mountain", weight_grams: 11000 },
      { model: "Exie", type: "mountain", weight_grams: 11500 },
      { model: "Ripley", type: "mountain", weight_grams: 12800 },
      { model: "Ripmo", type: "mountain", weight_grams: 14000 },
      { model: "HD6", type: "mountain", weight_grams: 15500 },
      { model: "Oso", type: "ebike", weight_grams: 22500 },
    ],
  },

  // ─── P I V O T ───────────────────────────────────────────────
  {
    brand: "Pivot",
    country: "USA",
    models: [
      { model: "Vault", type: "gravel", weight_grams: 9200 },
      { model: "LES SL", type: "mountain", weight_grams: 10500 },
      { model: "Trail 429", type: "mountain", weight_grams: 12500 },
      { model: "Switchblade", type: "mountain", weight_grams: 13800 },
      { model: "Mach 6", type: "mountain", weight_grams: 14500 },
      { model: "Firebird", type: "mountain", weight_grams: 15500 },
      { model: "Shuttle", type: "ebike", weight_grams: 22000 },
    ],
  },

  // ─── R O C K Y  M O U N T A I N ──────────────────────────────
  {
    brand: "Rocky Mountain",
    country: "Canada",
    models: [
      { model: "Solo", type: "gravel", weight_grams: 10500 },
      { model: "Element", type: "mountain", weight_grams: 12200 },
      { model: "Instinct", type: "mountain", weight_grams: 14000 },
      { model: "Altitude", type: "mountain", weight_grams: 15200 },
      { model: "Slayer", type: "mountain", weight_grams: 16000 },
      { model: "Powerplay", type: "ebike", weight_grams: 23500 },
    ],
  },

  // ─── T R A N S I T I O N ─────────────────────────────────────
  {
    brand: "Transition",
    country: "USA",
    models: [
      { model: "Spur", type: "mountain", weight_grams: 12500 },
      { model: "Scout", type: "mountain", weight_grams: 14200 },
      { model: "Sentinel", type: "mountain", weight_grams: 15000 },
      { model: "Spire", type: "mountain", weight_grams: 15800 },
      { model: "Repeater", type: "ebike", weight_grams: 22500 },
    ],
  },

  // ─── M A R I N ───────────────────────────────────────────────
  {
    brand: "Marin",
    country: "USA",
    models: [
      { model: "Nicasio+", type: "gravel", weight_grams: 11000 },
      { model: "Gestalt", type: "gravel", weight_grams: 10000 },
      { model: "DSP", type: "gravel", weight_grams: 10500 },
      { model: "Four Corners", type: "touring", weight_grams: 13000 },
      { model: "Pine Mountain", type: "mountain", weight_grams: 14500 },
      { model: "San Quentin", type: "mountain", weight_grams: 13500 },
      { model: "Rift Zone", type: "mountain", weight_grams: 14200 },
      { model: "Alpine Trail", type: "mountain", weight_grams: 15800 },
      { model: "El Roy", type: "fat", weight_grams: 15200 },
    ],
  },

  // ─── J A M I S ───────────────────────────────────────────────
  {
    brand: "Jamis",
    country: "USA",
    models: [
      { model: "Aurora", type: "touring", weight_grams: 13200 },
      { model: "Aurora Elite", type: "touring", weight_grams: 12500 },
      { model: "Renegade", type: "gravel", weight_grams: 10000 },
      { model: "Renegade S4", type: "gravel", weight_grams: 9200 },
      { model: "Sequel", type: "road", weight_grams: 9000 },
      { model: "Dragonslayer", type: "mountain", weight_grams: 13500 },
      { model: "Hardtail", type: "mountain", weight_grams: 13000 },
    ],
  },

  // ─── S T A T E  B I C Y C L E  C O . ────────────────────────
  {
    brand: "State Bicycle Co.",
    country: "USA",
    models: [
      { model: "4130 All-Road", type: "gravel", weight_grams: 11500 },
      { model: "6061 All-Road", type: "gravel", weight_grams: 10200 },
    ],
  },

  // ─── B R E E Z E R ───────────────────────────────────────────
  {
    brand: "Breezer",
    country: "USA",
    models: [
      { model: "Radar Expert", type: "gravel", weight_grams: 11200 },
      { model: "Radar Cafe", type: "gravel", weight_grams: 12000 },
      { model: "Doppler", type: "touring", weight_grams: 13500 },
    ],
  },

  // ─── L Y N S K E Y ───────────────────────────────────────────
  {
    brand: "Lynskey",
    country: "USA",
    models: [
      { model: "GR Race", type: "gravel", weight_grams: 9800 },
      { model: "GR300", type: "gravel", weight_grams: 10200 },
      { model: "Vialé", type: "touring", weight_grams: 11500 },
      { model: "R-Series", type: "road", weight_grams: 8500 },
      { model: "Helix Pro", type: "road", weight_grams: 7800 },
    ],
  },

  // ─── W H Y T E ───────────────────────────────────────────────
  {
    brand: "Whyte",
    country: "UK",
    models: [
      { model: "Friston", type: "gravel", weight_grams: 10500 },
      { model: "Glencoe", type: "gravel", weight_grams: 10000 },
      { model: "T-130", type: "mountain", weight_grams: 13500 },
      { model: "T-160", type: "mountain", weight_grams: 15800 },
      { model: "S-150", type: "mountain", weight_grams: 14500 },
      { model: "E-Lyte", type: "ebike", weight_grams: 17000 },
      { model: "E-160", type: "ebike", weight_grams: 24000 },
    ],
  },

  // ─── R I T C H E Y ───────────────────────────────────────────
  {
    brand: "Ritchey",
    country: "USA",
    models: [
      { model: "Outback", type: "gravel", weight_grams: 10500 },
      { model: "Swiss Cross Disc", type: "gravel", weight_grams: 9500 },
      { model: "Ascent", type: "touring", weight_grams: 12500 },
    ],
  },

  // ─── O T H E R  N O T A B L E  B R A N D S ──────────────────

  {
    brand: "All-City",
    country: "USA",
    models: [
      { model: "Gorilla Monsoon", type: "gravel", weight_grams: 12500 },
      { model: "Space Horse", type: "touring", weight_grams: 12000 },
      { model: "Cosmic Stallion", type: "gravel", weight_grams: 10800 },
      { model: "Macho Man Disc", type: "gravel", weight_grams: 10500 },
      { model: "Electric Queen", type: "mountain", weight_grams: 14500 },
    ],
  },

  {
    brand: "Soma",
    country: "USA",
    models: [
      { model: "Wolverine", type: "touring", weight_grams: 12800 },
      { model: "Saga", type: "touring", weight_grams: 13000 },
      { model: "Grand Randonneur", type: "touring", weight_grams: 12500 },
      { model: "Buena Vista", type: "touring", weight_grams: 12200 },
      { model: "Double Cross Disc", type: "gravel", weight_grams: 11000 },
    ],
  },

  {
    brand: "Bombtrack",
    country: "Germany",
    models: [
      { model: "Beyond", type: "touring", weight_grams: 12800 },
      { model: "Beyond+", type: "touring", weight_grams: 13200 },
      { model: "Hook", type: "gravel", weight_grams: 10200 },
      { model: "Hook EXT", type: "gravel", weight_grams: 11000 },
      { model: "Audax", type: "gravel", weight_grams: 10800 },
    ],
  },

  {
    brand: "Crust",
    country: "USA",
    models: [
      { model: "Evasion", type: "touring", weight_grams: 13500 },
      { model: "Bombora", type: "touring", weight_grams: 14000 },
      { model: "Lightning Bolt", type: "gravel", weight_grams: 12000 },
      { model: "Dreamer", type: "touring", weight_grams: 13000 },
    ],
  },

  {
    brand: "Otso",
    country: "USA",
    models: [
      { model: "Warakin", type: "gravel", weight_grams: 9500 },
      { model: "Waheela C", type: "gravel", weight_grams: 10500 },
      { model: "Waheela S", type: "gravel", weight_grams: 11200 },
      { model: "Voytek", type: "fat", weight_grams: 14500 },
    ],
  },

  {
    brand: "Felt",
    country: "USA",
    models: [
      { model: "Breed", type: "gravel", weight_grams: 9500 },
      { model: "Broam", type: "gravel", weight_grams: 10200 },
      { model: "FR Advanced", type: "road", weight_grams: 7800 },
      { model: "AR Advanced", type: "road", weight_grams: 8200 },
      { model: "Doctrine", type: "mountain", weight_grams: 11500 },
      { model: "Surplus", type: "mountain", weight_grams: 14000 },
    ],
  },

  {
    brand: "Diamondback",
    country: "USA",
    models: [
      { model: "Haanjo", type: "gravel", weight_grams: 10500 },
      { model: "Haanjo Trail", type: "gravel", weight_grams: 11500 },
      { model: "Release", type: "mountain", weight_grams: 14200 },
      { model: "Mason", type: "mountain", weight_grams: 13500 },
      { model: "Sync'r", type: "mountain", weight_grams: 13200 },
      { model: "El Oso", type: "fat", weight_grams: 15800 },
    ],
  },

  {
    brand: "Fuji",
    country: "Japan",
    models: [
      { model: "Touring", type: "touring", weight_grams: 13000 },
      { model: "Jari", type: "gravel", weight_grams: 10500 },
      { model: "Jari Carbon", type: "gravel", weight_grams: 9200 },
      { model: "Transonic", type: "road", weight_grams: 7800 },
      { model: "SLM", type: "road", weight_grams: 8200 },
      { model: "Tahoe", type: "mountain", weight_grams: 14500 },
      { model: "Wendigo", type: "fat", weight_grams: 15200 },
    ],
  },

  {
    brand: "GT",
    country: "USA",
    models: [
      { model: "Grade", type: "gravel", weight_grams: 10200 },
      { model: "Grade Carbon", type: "gravel", weight_grams: 9000 },
      { model: "Zaskar", type: "mountain", weight_grams: 12000 },
      { model: "Sensor", type: "mountain", weight_grams: 14000 },
      { model: "Force", type: "mountain", weight_grams: 15200 },
    ],
  },

  {
    brand: "Norco",
    country: "Canada",
    models: [
      { model: "Search XR", type: "gravel", weight_grams: 10000 },
      { model: "Section", type: "gravel", weight_grams: 10500 },
      { model: "Optic", type: "mountain", weight_grams: 13200 },
      { model: "Fluid", type: "mountain", weight_grams: 14500 },
      { model: "Sight", type: "mountain", weight_grams: 15200 },
      { model: "Range", type: "mountain", weight_grams: 16000 },
      { model: "Sight VLT", type: "ebike", weight_grams: 23500 },
    ],
  },

  {
    brand: "Devinci",
    country: "Canada",
    models: [
      { model: "Hatchet", type: "gravel", weight_grams: 9500 },
      { model: "Troy", type: "mountain", weight_grams: 14200 },
      { model: "Spartan", type: "mountain", weight_grams: 15500 },
      { model: "Marshall", type: "mountain", weight_grams: 13200 },
      { model: "EP", type: "ebike", weight_grams: 23000 },
    ],
  },

  {
    brand: "Wilier",
    country: "Italy",
    models: [
      { model: "Jena", type: "gravel", weight_grams: 9000 },
      { model: "Adlar", type: "gravel", weight_grams: 8500 },
      { model: "Filante SLR", type: "road", weight_grams: 7200 },
      { model: "Zero SLR", type: "road", weight_grams: 6800 },
      { model: "Urta SLR", type: "mountain", weight_grams: 11000 },
    ],
  },

  {
    brand: "Look",
    country: "France",
    models: [
      { model: "765 Gravel RS", type: "gravel", weight_grams: 9200 },
      { model: "795 Blade RS", type: "road", weight_grams: 7500 },
      { model: "785 Huez", type: "road", weight_grams: 7200 },
    ],
  },

  {
    brand: "Liv",
    country: "Taiwan",
    models: [
      { model: "Devote", type: "gravel", weight_grams: 10200 },
      { model: "Avail", type: "road", weight_grams: 8800 },
      { model: "Langma", type: "road", weight_grams: 7500 },
      { model: "Pique", type: "mountain", weight_grams: 12500 },
      { model: "Intrigue", type: "mountain", weight_grams: 14000 },
      { model: "Intrigue X E+", type: "ebike", weight_grams: 23500 },
    ],
  },

  {
    brand: "Vitus",
    country: "UK",
    models: [
      { model: "Substance", type: "gravel", weight_grams: 10500 },
      { model: "Energie", type: "gravel", weight_grams: 9200 },
      { model: "Zenium", type: "road", weight_grams: 8500 },
      { model: "Razor", type: "road", weight_grams: 9200 },
      { model: "Sentier", type: "mountain", weight_grams: 13500 },
      { model: "Mythique", type: "mountain", weight_grams: 14500 },
      { model: "Sommet", type: "mountain", weight_grams: 15800 },
      { model: "E-Sommet", type: "ebike", weight_grams: 23500 },
    ],
  },

  {
    brand: "Orro",
    country: "UK",
    models: [
      { model: "Terra Gravel", type: "gravel", weight_grams: 9500 },
      { model: "Terra C", type: "gravel", weight_grams: 10000 },
      { model: "Venturi", type: "road", weight_grams: 7800 },
      { model: "Gold STC", type: "road", weight_grams: 7200 },
    ],
  },

  {
    brand: "Ribble",
    country: "UK",
    models: [
      { model: "CGR AL", type: "gravel", weight_grams: 10500 },
      { model: "CGR SL", type: "gravel", weight_grams: 9200 },
      { model: "CGR Ti", type: "gravel", weight_grams: 9800 },
      { model: "Endurance AL", type: "road", weight_grams: 9000 },
      { model: "Endurance SL", type: "road", weight_grams: 7800 },
      { model: "Ultra SL", type: "road", weight_grams: 7200 },
    ],
  },

  {
    brand: "Rose",
    country: "Germany",
    models: [
      { model: "Backroad", type: "gravel", weight_grams: 9500 },
      { model: "Backroad AL", type: "gravel", weight_grams: 10200 },
      { model: "Reveal", type: "road", weight_grams: 7800 },
      { model: "Xlite", type: "road", weight_grams: 7200 },
      { model: "Ground Control", type: "mountain", weight_grams: 13000 },
    ],
  },

  {
    brand: "Open Cycle",
    country: "Switzerland",
    models: [
      { model: "U.P.", type: "gravel", weight_grams: 9000 },
      { model: "WI.DE.", type: "gravel", weight_grams: 9200 },
      { model: "MIN.D.", type: "gravel", weight_grams: 8800 },
      { model: "ONE+", type: "mountain", weight_grams: 11500 },
    ],
  },

  {
    brand: "3T",
    country: "Italy",
    models: [
      { model: "Exploro", type: "gravel", weight_grams: 9500 },
      { model: "Exploro Max", type: "gravel", weight_grams: 10000 },
      { model: "Exploro RaceMax", type: "gravel", weight_grams: 8800 },
    ],
  },

  {
    brand: "Lauf",
    country: "Iceland",
    models: [
      { model: "True Grit", type: "gravel", weight_grams: 8500 },
      { model: "Seigla", type: "gravel", weight_grams: 9000 },
      { model: "Anywhere", type: "gravel", weight_grams: 9500 },
    ],
  },

  {
    brand: "Mason",
    country: "UK",
    models: [
      { model: "Bokeh", type: "gravel", weight_grams: 10500 },
      { model: "InSearchOf", type: "gravel", weight_grams: 10200 },
      { model: "Resolution", type: "gravel", weight_grams: 10800 },
      { model: "Definition", type: "road", weight_grams: 8500 },
    ],
  },

  {
    brand: "Cinelli",
    country: "Italy",
    models: [
      { model: "Zydeco", type: "gravel", weight_grams: 10500 },
      { model: "King Zydeco", type: "gravel", weight_grams: 9200 },
      { model: "Hobootleg", type: "touring", weight_grams: 12500 },
      { model: "Superstar", type: "road", weight_grams: 7800 },
    ],
  },

  {
    brand: "Brother Cycles",
    country: "UK",
    models: [
      { model: "Mehteh", type: "gravel", weight_grams: 11500 },
      { model: "Kepler", type: "touring", weight_grams: 13000 },
      { model: "Big Bro", type: "fat", weight_grams: 15000 },
    ],
  },

  {
    brand: "Vaast",
    country: "USA",
    models: [
      { model: "A/1", type: "gravel", weight_grams: 9500 },
      { model: "M/1", type: "mountain", weight_grams: 12500 },
    ],
  },

  {
    brand: "Evil",
    country: "USA",
    models: [
      { model: "Chamois Hagar", type: "gravel", weight_grams: 9800 },
      { model: "Following", type: "mountain", weight_grams: 13000 },
      { model: "Offering", type: "mountain", weight_grams: 13500 },
      { model: "Wreckoning", type: "mountain", weight_grams: 15000 },
    ],
  },

  {
    brand: "Rondo",
    country: "Poland",
    models: [
      { model: "Ruut CF", type: "gravel", weight_grams: 9000 },
      { model: "Ruut AL", type: "gravel", weight_grams: 10500 },
      { model: "Ruut ST", type: "gravel", weight_grams: 11200 },
      { model: "HVRT CF", type: "road", weight_grams: 8200 },
    ],
  },

  {
    brand: "Fara Cycling",
    country: "Norway",
    models: [
      { model: "F/Gravel", type: "gravel", weight_grams: 8500 },
      { model: "F/AR", type: "gravel", weight_grams: 9000 },
    ],
  },

  {
    brand: "Rodriguez",
    country: "USA",
    models: [
      { model: "Touring", type: "touring", weight_grams: 12500 },
      { model: "Custom S&S", type: "touring", weight_grams: 13000 },
    ],
  },

  {
    brand: "Stanforth",
    country: "UK",
    models: [
      { model: "Skyelander", type: "touring", weight_grams: 13800 },
      { model: "Conway", type: "touring", weight_grams: 13200 },
      { model: "Dorado", type: "touring", weight_grams: 14000 },
    ],
  },

  {
    brand: "Dawes",
    country: "UK",
    models: [
      { model: "Galaxy", type: "touring", weight_grams: 14200 },
      { model: "Super Galaxy", type: "touring", weight_grams: 14500 },
      { model: "Ultra Galaxy", type: "touring", weight_grams: 14800 },
    ],
  },

  {
    brand: "VSF Fahrradmanufaktur",
    country: "Germany",
    models: [
      { model: "TX-Randonneur", type: "touring", weight_grams: 14200 },
      { model: "TX-400", type: "touring", weight_grams: 14500 },
      { model: "TX-800", type: "touring", weight_grams: 15000 },
    ],
  },

  {
    brand: "Ridgeback",
    country: "UK",
    models: [
      { model: "Voyage", type: "touring", weight_grams: 14000 },
      { model: "Panorama", type: "touring", weight_grams: 14200 },
      { model: "Expedition", type: "touring", weight_grams: 14800 },
    ],
  },

  {
    brand: "Santos",
    country: "Netherlands",
    models: [
      { model: "Travelmaster 2.6", type: "touring", weight_grams: 15000 },
      { model: "Travelmaster 3", type: "touring", weight_grams: 14500 },
      { model: "Travel Lite", type: "touring", weight_grams: 13500 },
    ],
  },

  {
    brand: "Vivente",
    country: "Australia",
    models: [
      { model: "World Randonneur Anatolia", type: "touring", weight_grams: 14000 },
      { model: "World Randonneur Classic", type: "touring", weight_grams: 14500 },
    ],
  },

  // ─── A D D I T I O N A L   B R A N D S ────────────────────────

  {
    brand: "Alchemy",
    country: "USA",
    models: [
      { model: "Ronin", type: "gravel", weight_grams: 9200 },
      { model: "Arktos", type: "mountain", weight_grams: 13000 },
    ],
  },
  {
    brand: "Argon 18",
    country: "Canada",
    models: [
      { model: "Dark Matter", type: "gravel", weight_grams: 9500 },
      { model: "Gallium Pro", type: "road", weight_grams: 7200 },
      { model: "Nitrogen", type: "road", weight_grams: 8000 },
      { model: "Subito", type: "ebike", weight_grams: 13500 },
    ],
  },
  {
    brand: "Ari",
    country: "Italy",
    models: [
      { model: "Bikes GPR01", type: "gravel", weight_grams: 8800 },
    ],
  },
  {
    brand: "Basso",
    country: "Italy",
    models: [
      { model: "Palta", type: "gravel", weight_grams: 8900 },
      { model: "Palta II", type: "gravel", weight_grams: 8600 },
      { model: "Astra", type: "road", weight_grams: 7800 },
      { model: "Diamante", type: "road", weight_grams: 7300 },
    ],
  },
  {
    brand: "BH Bikes",
    country: "Spain",
    models: [
      { model: "Gravelx Evo", type: "gravel", weight_grams: 9200 },
      { model: "Ultralight Evo", type: "road", weight_grams: 7100 },
      { model: "Lynx Trail", type: "mountain", weight_grams: 13500 },
      { model: "iLynx Trail", type: "ebike", weight_grams: 22000 },
      { model: "Core GravelX", type: "ebike", weight_grams: 15500 },
    ],
  },
  {
    brand: "Boardman",
    country: "UK",
    models: [
      { model: "ADV 8.9", type: "gravel", weight_grams: 9800 },
      { model: "SLR 8.9", type: "road", weight_grams: 8200 },
      { model: "MTR 8.9", type: "mountain", weight_grams: 12800 },
      { model: "HYB 8.9e", type: "ebike", weight_grams: 18000 },
    ],
  },
  {
    brand: "Cairn",
    country: "UK",
    models: [
      { model: "E-Adventure 1.0", type: "ebike", weight_grams: 16200 },
      { model: "BRAVe", type: "ebike", weight_grams: 16500 },
    ],
  },
  {
    brand: "Canfield",
    country: "USA",
    models: [
      { model: "Lithium", type: "mountain", weight_grams: 14500 },
      { model: "Tilt", type: "mountain", weight_grams: 15200 },
    ],
  },
  {
    brand: "Carrera",
    country: "Italy",
    models: [
      { model: "Gravel GR-A", type: "gravel", weight_grams: 9800 },
      { model: "Veleno ER-01", type: "road", weight_grams: 7500 },
    ],
  },
  {
    brand: "Cervélo",
    country: "Canada",
    models: [
      { model: "Áspero", type: "gravel", weight_grams: 8800 },
      { model: "Áspero-5", type: "gravel", weight_grams: 8200 },
      { model: "R5", type: "road", weight_grams: 6800 },
      { model: "Caledonia", type: "road", weight_grams: 8200 },
      { model: "S5", type: "road", weight_grams: 7400 },
    ],
  },
  {
    brand: "Chapter2",
    country: "New Zealand",
    models: [
      { model: "AO", type: "gravel", weight_grams: 9000 },
      { model: "Toa", type: "road", weight_grams: 7600 },
    ],
  },
  {
    brand: "Commencal",
    country: "France",
    models: [
      { model: "Meta TR", type: "mountain", weight_grams: 14800 },
      { model: "Meta AM", type: "mountain", weight_grams: 16000 },
      { model: "Clash", type: "mountain", weight_grams: 16500 },
      { model: "Meta Power", type: "ebike", weight_grams: 23000 },
    ],
  },
  {
    brand: "Condor",
    country: "UK",
    models: [
      { model: "Fratello", type: "gravel", weight_grams: 9200 },
      { model: "Terra-X", type: "gravel", weight_grams: 9600 },
      { model: "Acciaio", type: "road", weight_grams: 9000 },
    ],
  },
  {
    brand: "Cotic",
    country: "UK",
    models: [
      { model: "Escapade", type: "gravel", weight_grams: 10200 },
      { model: "RocketMAX", type: "mountain", weight_grams: 14000 },
      { model: "FlareMAX", type: "mountain", weight_grams: 13200 },
    ],
  },
  {
    brand: "De Rosa",
    country: "Italy",
    models: [
      { model: "IVAN", type: "gravel", weight_grams: 9000 },
      { model: "Merak", type: "road", weight_grams: 7200 },
      { model: "SK Pininfarina", type: "road", weight_grams: 7400 },
    ],
  },
  {
    brand: "Decathlon (Riverside/Triban/Rockrider)",
    country: "France",
    models: [
      { model: "Triban RC 520 Gravel", type: "gravel", weight_grams: 10500 },
      { model: "Triban GRVL 900", type: "gravel", weight_grams: 9200 },
      { model: "Riverside Touring 920", type: "touring", weight_grams: 15500 },
      { model: "Riverside Touring 520", type: "touring", weight_grams: 16000 },
      { model: "Rockrider AM 100S", type: "mountain", weight_grams: 14500 },
      { model: "Triban RC 520", type: "road", weight_grams: 9800 },
    ],
  },
  {
    brand: "Deviate",
    country: "UK",
    models: [
      { model: "Guide", type: "mountain", weight_grams: 14200 },
      { model: "Highlander", type: "mountain", weight_grams: 15000 },
    ],
  },
  {
    brand: "DMR",
    country: "UK",
    models: [
      { model: "Sled", type: "mountain", weight_grams: 16500 },
      { model: "Trailstar", type: "mountain", weight_grams: 15200 },
    ],
  },
  {
    brand: "Enigma",
    country: "UK",
    models: [
      { model: "Escape", type: "gravel", weight_grams: 9800 },
      { model: "Evade", type: "gravel", weight_grams: 10000 },
      { model: "Etape", type: "road", weight_grams: 8500 },
    ],
  },
  {
    brand: "Fairlight",
    country: "UK",
    models: [
      { model: "Secan", type: "gravel", weight_grams: 9800 },
      { model: "Faran 2.0", type: "touring", weight_grams: 12000 },
      { model: "Holt", type: "road", weight_grams: 8800 },
    ],
  },
  {
    brand: "Factor",
    country: "UK",
    models: [
      { model: "LS", type: "gravel", weight_grams: 8500 },
      { model: "O2 VAM", type: "road", weight_grams: 6800 },
      { model: "Ostro VAM", type: "road", weight_grams: 7200 },
    ],
  },
  {
    brand: "Fezzari",
    country: "USA",
    models: [
      { model: "Shafer", type: "gravel", weight_grams: 9000 },
      { model: "La Sal Peak", type: "mountain", weight_grams: 13500 },
      { model: "Signal Peak", type: "road", weight_grams: 7800 },
    ],
  },
  {
    brand: "Forbidden",
    country: "Canada",
    models: [
      { model: "Druid", type: "mountain", weight_grams: 13800 },
      { model: "Dreadnought", type: "mountain", weight_grams: 15500 },
    ],
  },
  {
    brand: "Gazelle",
    country: "Netherlands",
    models: [
      { model: "Medeo T9", type: "ebike", weight_grams: 23000 },
      { model: "Ultimate T10", type: "ebike", weight_grams: 22000 },
      { model: "CityZen C8", type: "touring", weight_grams: 14500 },
    ],
  },
  {
    brand: "Gestalt",
    country: "USA",
    models: [
      { model: "G1", type: "gravel", weight_grams: 9500 },
    ],
  },
  {
    brand: "Ghost",
    country: "Germany",
    models: [
      { model: "Road Rage", type: "gravel", weight_grams: 9800 },
      { model: "Lector", type: "mountain", weight_grams: 10500 },
      { model: "Riot", type: "mountain", weight_grams: 14200 },
    ],
  },
  {
    brand: "Gorilla Monsoon",
    country: "USA",
    models: [
      { model: "Drop Bar", type: "gravel", weight_grams: 13000 },
    ],
  },
  {
    brand: "Guerrilla Gravity",
    country: "USA",
    models: [
      { model: "Trail Pistol", type: "mountain", weight_grams: 13200 },
      { model: "Smash", type: "mountain", weight_grams: 15000 },
      { model: "Gnarvana", type: "mountain", weight_grams: 15500 },
    ],
  },
  {
    brand: "Haibike",
    country: "Germany",
    models: [
      { model: "AllMtn", type: "ebike", weight_grams: 24000 },
      { model: "Adventr", type: "ebike", weight_grams: 25500 },
      { model: "AllTrack", type: "ebike", weight_grams: 23500 },
    ],
  },
  {
    brand: "Hope",
    country: "UK",
    models: [
      { model: "HB.160", type: "mountain", weight_grams: 14800 },
      { model: "HB.130", type: "mountain", weight_grams: 13500 },
    ],
  },
  {
    brand: "Intense",
    country: "USA",
    models: [
      { model: "Carbine", type: "mountain", weight_grams: 14500 },
      { model: "Tracer", type: "mountain", weight_grams: 14800 },
      { model: "Primer", type: "mountain", weight_grams: 12800 },
    ],
  },
  {
    brand: "Juliana",
    country: "USA",
    models: [
      { model: "Wilder", type: "mountain", weight_grams: 13200 },
      { model: "Roubion", type: "mountain", weight_grams: 14500 },
      { model: "Furtado", type: "mountain", weight_grams: 12800 },
    ],
  },
  {
    brand: "Kalkhoff",
    country: "Germany",
    models: [
      { model: "Endeavour 7", type: "ebike", weight_grams: 25500 },
      { model: "Entice 5.B", type: "ebike", weight_grams: 24000 },
    ],
  },
  {
    brand: "KHS",
    country: "USA",
    models: [
      { model: "Grit 440", type: "gravel", weight_grams: 10000 },
      { model: "TR101", type: "touring", weight_grams: 14000 },
    ],
  },
  {
    brand: "Kinesis",
    country: "UK",
    models: [
      { model: "G2", type: "gravel", weight_grams: 10200 },
      { model: "Tripster AT", type: "gravel", weight_grams: 10500 },
      { model: "Range", type: "ebike", weight_grams: 16000 },
    ],
  },
  {
    brand: "KTM",
    country: "Austria",
    models: [
      { model: "X-Strada", type: "gravel", weight_grams: 10000 },
      { model: "Scarp", type: "mountain", weight_grams: 11200 },
      { model: "Macina", type: "ebike", weight_grams: 23000 },
      { model: "Revelator", type: "road", weight_grams: 7500 },
    ],
  },
  {
    brand: "Litespeed",
    country: "USA",
    models: [
      { model: "Gravel", type: "gravel", weight_grams: 9200 },
      { model: "T5G", type: "gravel", weight_grams: 9000 },
      { model: "Ultimate", type: "road", weight_grams: 7800 },
    ],
  },
  {
    brand: "Masi",
    country: "USA",
    models: [
      { model: "CXGR Expert", type: "gravel", weight_grams: 10200 },
      { model: "Giramondo 27.5", type: "touring", weight_grams: 14000 },
      { model: "Randonneur Elite", type: "touring", weight_grams: 12500 },
    ],
  },
  {
    brand: "Merlin",
    country: "UK",
    models: [
      { model: "Malt-G2", type: "gravel", weight_grams: 9200 },
      { model: "PR7", type: "road", weight_grams: 8000 },
    ],
  },
  {
    brand: "Mondraker",
    country: "Spain",
    models: [
      { model: "Dusty", type: "gravel", weight_grams: 8800 },
      { model: "Foxy", type: "mountain", weight_grams: 14200 },
      { model: "Crafty", type: "ebike", weight_grams: 22500 },
    ],
  },
  {
    brand: "Moots",
    country: "USA",
    models: [
      { model: "Routt ESC", type: "gravel", weight_grams: 9500 },
      { model: "Routt 45", type: "gravel", weight_grams: 9800 },
      { model: "Vamoots RCS", type: "road", weight_grams: 8200 },
      { model: "Routt RSL", type: "road", weight_grams: 8500 },
      { model: "Mountaineer YBB", type: "mountain", weight_grams: 11800 },
    ],
  },
  {
    brand: "Motobecane",
    country: "France",
    models: [
      { model: "Mulekick CF", type: "gravel", weight_grams: 9500 },
      { model: "Turino Elite", type: "touring", weight_grams: 12800 },
    ],
  },
  {
    brand: "Müsing",
    country: "Germany",
    models: [
      { model: "Crozzroad", type: "gravel", weight_grams: 10200 },
      { model: "Ranger", type: "touring", weight_grams: 13500 },
    ],
  },
  {
    brand: "Nukeproof",
    country: "UK",
    models: [
      { model: "Mega", type: "mountain", weight_grams: 15500 },
      { model: "Reactor", type: "mountain", weight_grams: 13500 },
      { model: "Giga", type: "mountain", weight_grams: 16200 },
      { model: "Digger", type: "gravel", weight_grams: 9500 },
    ],
  },
  {
    brand: "Orange",
    country: "UK",
    models: [
      { model: "Stage 6", type: "mountain", weight_grams: 15500 },
      { model: "Five", type: "mountain", weight_grams: 14500 },
      { model: "Alpine 6", type: "mountain", weight_grams: 16000 },
    ],
  },
  {
    brand: "Parlee",
    country: "USA",
    models: [
      { model: "Chebacco", type: "gravel", weight_grams: 9000 },
      { model: "Altum", type: "road", weight_grams: 7500 },
      { model: "RZ7", type: "road", weight_grams: 7200 },
    ],
  },
  {
    brand: "Pole",
    country: "Finland",
    models: [
      { model: "Evolink", type: "mountain", weight_grams: 14500 },
      { model: "Machine", type: "mountain", weight_grams: 15800 },
    ],
  },
  {
    brand: "Polygon",
    country: "Indonesia",
    models: [
      { model: "Bend R5", type: "gravel", weight_grams: 9200 },
      { model: "Siskiu T8", type: "mountain", weight_grams: 14000 },
      { model: "Strattos S5", type: "road", weight_grams: 8500 },
      { model: "Collosus", type: "mountain", weight_grams: 16000 },
    ],
  },
  {
    brand: "Propain",
    country: "Germany",
    models: [
      { model: "Hugene", type: "mountain", weight_grams: 13500 },
      { model: "Tyee", type: "mountain", weight_grams: 14500 },
      { model: "Spindrift", type: "mountain", weight_grams: 15800 },
    ],
  },
  {
    brand: "Radon",
    country: "Germany",
    models: [
      { model: "Jealous", type: "mountain", weight_grams: 10800 },
      { model: "Slide Trail", type: "mountain", weight_grams: 14200 },
      { model: "Cragger", type: "gravel", weight_grams: 9500 },
    ],
  },
  {
    brand: "Raleigh",
    country: "UK",
    models: [
      { model: "Tamland 1", type: "gravel", weight_grams: 10800 },
      { model: "Redux", type: "gravel", weight_grams: 10200 },
      { model: "Sojourn", type: "touring", weight_grams: 14200 },
      { model: "Merit", type: "road", weight_grams: 9500 },
    ],
  },
  {
    brand: "Reeb",
    country: "USA",
    models: [
      { model: "Dikyelous", type: "mountain", weight_grams: 13500 },
      { model: "SSt", type: "mountain", weight_grams: 14200 },
    ],
  },
  {
    brand: "Roscoe (Trek)",
    country: "USA",
    models: [
      { model: "Roscoe 8", type: "mountain", weight_grams: 14200 },
      { model: "Roscoe 7", type: "mountain", weight_grams: 14800 },
    ],
  },
  {
    brand: "Shand",
    country: "UK",
    models: [
      { model: "Stoater", type: "gravel", weight_grams: 10500 },
      { model: "Skinnymalinky", type: "gravel", weight_grams: 9800 },
    ],
  },
  {
    brand: "Simplon",
    country: "Austria",
    models: [
      { model: "Inissio Gravel", type: "gravel", weight_grams: 8500 },
      { model: "Pride", type: "road", weight_grams: 7000 },
      { model: "Rapcon", type: "mountain", weight_grams: 13200 },
    ],
  },
  {
    brand: "Sonder",
    country: "UK",
    models: [
      { model: "Camino AL", type: "gravel", weight_grams: 10500 },
      { model: "Camino Ti", type: "gravel", weight_grams: 9800 },
      { model: "Transmitter", type: "mountain", weight_grams: 14200 },
      { model: "Santiago", type: "touring", weight_grams: 12800 },
    ],
  },
  {
    brand: "Spot",
    country: "USA",
    models: [
      { model: "Mayhem", type: "mountain", weight_grams: 14000 },
      { model: "Rocker", type: "mountain", weight_grams: 13200 },
    ],
  },
  {
    brand: "Stevens",
    country: "Germany",
    models: [
      { model: "Gavere", type: "gravel", weight_grams: 9500 },
      { model: "Supreme", type: "road", weight_grams: 7800 },
      { model: "Jura", type: "touring", weight_grams: 14000 },
    ],
  },
  {
    brand: "Stif",
    country: "UK",
    models: [
      { model: "Morf", type: "mountain", weight_grams: 14000 },
      { model: "Squatch", type: "mountain", weight_grams: 15200 },
    ],
  },
  {
    brand: "Tern",
    country: "Taiwan",
    models: [
      { model: "GSD", type: "ebike", weight_grams: 32000 },
      { model: "HSD", type: "ebike", weight_grams: 24500 },
      { model: "Vektron", type: "ebike", weight_grams: 22000 },
    ],
  },
  {
    brand: "Time",
    country: "France",
    models: [
      { model: "ADHX", type: "gravel", weight_grams: 8800 },
      { model: "Alpe d'Huez", type: "road", weight_grams: 7200 },
    ],
  },
  {
    brand: "Titanio/Waltly",
    country: "China",
    models: [
      { model: "GR001 Gravel", type: "gravel", weight_grams: 9500 },
      { model: "TT001 Touring", type: "touring", weight_grams: 11800 },
    ],
  },
  {
    brand: "Treck (Van Nicholas)",
    country: "Netherlands",
    models: [
      { model: "Amazon", type: "touring", weight_grams: 11500 },
      { model: "Deveron", type: "gravel", weight_grams: 10000 },
      { model: "Yukon", type: "touring", weight_grams: 12000 },
    ],
  },
  {
    brand: "Voodoo",
    country: "UK",
    models: [
      { model: "Nakisi HT", type: "mountain", weight_grams: 14500 },
      { model: "Zobop", type: "mountain", weight_grams: 15000 },
    ],
  },
  {
    brand: "Woom",
    country: "Austria",
    models: [
      { model: "UP 5", type: "mountain", weight_grams: 8200 },
      { model: "UP 6", type: "mountain", weight_grams: 8800 },
    ],
  },
  {
    brand: "YT Industries",
    country: "Germany",
    models: [
      { model: "Jeffsy", type: "mountain", weight_grams: 14200 },
      { model: "Capra", type: "mountain", weight_grams: 15800 },
      { model: "Izzo", type: "mountain", weight_grams: 12500 },
      { model: "Decoy", type: "ebike", weight_grams: 23000 },
    ],
  },
  {
    brand: "Priority",
    country: "USA",
    models: [
      { model: "Apollo Gravel", type: "gravel", weight_grams: 10200 },
      { model: "600", type: "touring", weight_grams: 12500 },
      { model: "Continuum Onyx", type: "touring", weight_grams: 13500 },
    ],
  },
  {
    brand: "Gazelle (Royal Dutch)",
    country: "Netherlands",
    models: [
      { model: "Van Stael", type: "touring", weight_grams: 18000 },
      { model: "Tour Populair", type: "touring", weight_grams: 20000 },
    ],
  },
  {
    brand: "Vanmoof",
    country: "Netherlands",
    models: [
      { model: "S5", type: "ebike", weight_grams: 23000 },
      { model: "A5", type: "ebike", weight_grams: 22000 },
    ],
  },
  {
    brand: "Cowboy",
    country: "Belgium",
    models: [
      { model: "Cruiser", type: "ebike", weight_grams: 19800 },
      { model: "Classic", type: "ebike", weight_grams: 18500 },
    ],
  },
  {
    brand: "Riese & Müller",
    country: "Germany",
    models: [
      { model: "Supercharger", type: "ebike", weight_grams: 31000 },
      { model: "Homage", type: "ebike", weight_grams: 28000 },
      { model: "Multicharger", type: "ebike", weight_grams: 30000 },
      { model: "Superdelite", type: "ebike", weight_grams: 29000 },
    ],
  },
  {
    brand: "Rad Power",
    country: "USA",
    models: [
      { model: "RadRover 6 Plus", type: "ebike", weight_grams: 32000 },
      { model: "RadMission", type: "ebike", weight_grams: 22000 },
      { model: "RadWagon 4", type: "ebike", weight_grams: 33500 },
    ],
  },
  {
    brand: "Aventon",
    country: "USA",
    models: [
      { model: "Aventure.2", type: "ebike", weight_grams: 32000 },
      { model: "Soltera.2", type: "ebike", weight_grams: 18500 },
      { model: "Level.2", type: "ebike", weight_grams: 24000 },
    ],
  },
  {
    brand: "Lectric",
    country: "USA",
    models: [
      { model: "XPeak", type: "ebike", weight_grams: 33000 },
      { model: "ONE", type: "ebike", weight_grams: 21000 },
      { model: "XP 3.0", type: "ebike", weight_grams: 29000 },
    ],
  },
  {
    brand: "Gazelle (e-bikes)",
    country: "Netherlands",
    models: [
      { model: "Eclipse C380+", type: "ebike", weight_grams: 27000 },
      { model: "Arroyo C7+", type: "ebike", weight_grams: 25000 },
    ],
  },
  {
    brand: "Wilier Triestina",
    country: "Italy",
    models: [
      { model: "Jena", type: "gravel", weight_grams: 8500 },
      { model: "Adlar", type: "gravel", weight_grams: 8800 },
      { model: "Filante SLR", type: "road", weight_grams: 7000 },
      { model: "Zero SLR", type: "road", weight_grams: 6600 },
    ],
  },
  {
    brand: "Lapierre",
    country: "France",
    models: [
      { model: "Crosshill", type: "gravel", weight_grams: 9500 },
      { model: "Pulsium", type: "road", weight_grams: 8200 },
      { model: "Spicy", type: "mountain", weight_grams: 14800 },
      { model: "Overvolt AM", type: "ebike", weight_grams: 23500 },
    ],
  },
  {
    brand: "Moustache",
    country: "France",
    models: [
      { model: "Samedi 27 Trail", type: "ebike", weight_grams: 22500 },
      { model: "Dimanche 28.7", type: "ebike", weight_grams: 15500 },
      { model: "Samedi 28.7", type: "ebike", weight_grams: 21000 },
    ],
  },
  {
    brand: "Bafang",
    country: "China",
    models: [
      { model: "M600 Build", type: "ebike", weight_grams: 22000 },
    ],
  },
  {
    brand: "Knolly",
    country: "Canada",
    models: [
      { model: "Warden", type: "mountain", weight_grams: 15200 },
      { model: "Fugitive", type: "mountain", weight_grams: 13800 },
    ],
  },
  {
    brand: "Devinci",
    country: "Canada",
    models: [
      { model: "Hatchet", type: "gravel", weight_grams: 9200 },
      { model: "Troy", type: "mountain", weight_grams: 14200 },
      { model: "Spartan", type: "mountain", weight_grams: 15000 },
    ],
  },
  {
    brand: "Marinoni",
    country: "Canada",
    models: [
      { model: "Gravel 66", type: "gravel", weight_grams: 9800 },
      { model: "Turismo", type: "touring", weight_grams: 11500 },
    ],
  },
  {
    brand: "Opus",
    country: "Canada",
    models: [
      { model: "Spark 4", type: "gravel", weight_grams: 10000 },
      { model: "Horizon 3", type: "touring", weight_grams: 13500 },
    ],
  },
  {
    brand: "Brodie",
    country: "Canada",
    models: [
      { model: "Elan", type: "gravel", weight_grams: 10500 },
      { model: "Romulus", type: "touring", weight_grams: 13000 },
    ],
  },
  {
    brand: "Norco",
    country: "Canada",
    models: [
      { model: "Search XR", type: "gravel", weight_grams: 9500 },
      { model: "Section", type: "gravel", weight_grams: 10000 },
      { model: "Sight", type: "mountain", weight_grams: 14500 },
      { model: "Range", type: "mountain", weight_grams: 15800 },
      { model: "Optic", type: "mountain", weight_grams: 13200 },
    ],
  },
  {
    brand: "Mongoose",
    country: "USA",
    models: [
      { model: "Guide Sport", type: "gravel", weight_grams: 12000 },
      { model: "Salvo", type: "mountain", weight_grams: 15000 },
      { model: "Dolomite", type: "fat", weight_grams: 19500 },
    ],
  },
  {
    brand: "Schwinn",
    country: "USA",
    models: [
      { model: "Vantage FXe", type: "ebike", weight_grams: 22000 },
      { model: "Signature", type: "road", weight_grams: 10500 },
    ],
  },
  {
    brand: "Cervelo",
    country: "Canada",
    models: [
      { model: "R-Series", type: "road", weight_grams: 7000 },
    ],
  },
  {
    brand: "Pashley",
    country: "UK",
    models: [
      { model: "Pathfinder", type: "touring", weight_grams: 16500 },
      { model: "Speed 5", type: "touring", weight_grams: 14000 },
    ],
  },
  {
    brand: "Victoire",
    country: "France",
    models: [
      { model: "Voyage", type: "touring", weight_grams: 11500 },
      { model: "N°1", type: "road", weight_grams: 8500 },
    ],
  },
  {
    brand: "Singular",
    country: "UK",
    models: [
      { model: "Peregrine", type: "gravel", weight_grams: 10800 },
      { model: "Puffin", type: "mountain", weight_grams: 13500 },
    ],
  },
  {
    brand: "Rodeo Labs",
    country: "USA",
    models: [
      { model: "Trail Donkey", type: "gravel", weight_grams: 9200 },
      { model: "Flaanimal", type: "gravel", weight_grams: 9800 },
      { model: "Big Iron", type: "gravel", weight_grams: 10500 },
    ],
  },
  {
    brand: "Allied",
    country: "USA",
    models: [
      { model: "ABLE", type: "gravel", weight_grams: 8500 },
      { model: "Alfa", type: "road", weight_grams: 7500 },
      { model: "Echo", type: "road", weight_grams: 7200 },
    ],
  },
  {
    brand: "Ventum",
    country: "USA",
    models: [
      { model: "GS1", type: "gravel", weight_grams: 8200 },
      { model: "NS1", type: "road", weight_grams: 7800 },
    ],
  },
  {
    brand: "Thesis",
    country: "USA",
    models: [
      { model: "OB1", type: "gravel", weight_grams: 8800 },
    ],
  },
  {
    brand: "Curve",
    country: "Australia",
    models: [
      { model: "Grovel V2", type: "gravel", weight_grams: 9200 },
      { model: "GXR", type: "gravel", weight_grams: 9500 },
      { model: "Belgie Disc", type: "road", weight_grams: 8200 },
    ],
  },
  {
    brand: "Bossi",
    country: "Australia",
    models: [
      { model: "Grit SX", type: "gravel", weight_grams: 10000 },
      { model: "Strada SS", type: "road", weight_grams: 8800 },
      { model: "Elder", type: "touring", weight_grams: 11800 },
    ],
  },
  {
    brand: "Merida (Extended)",
    country: "Taiwan",
    models: [
      { model: "Silex+", type: "gravel", weight_grams: 9200 },
      { model: "Mission CX", type: "gravel", weight_grams: 8800 },
      { model: "Scultura Team", type: "road", weight_grams: 6800 },
      { model: "One-Sixty", type: "mountain", weight_grams: 14500 },
      { model: "Big Trail", type: "mountain", weight_grams: 14800 },
    ],
  },
];

// ─── HELPER FUNCTIONS ──────────────────────────────────────────

/** Get a flat sorted list of all brand names */
export function getAllBrands(): string[] {
  return BIKE_BRANDS_AND_MODELS.map((b) => b.brand).sort();
}

/** Get all models for a given brand */
export function getModelsForBrand(brand: string): BikeModelEntry[] {
  const entry = BIKE_BRANDS_AND_MODELS.find(
    (b) => b.brand.toLowerCase() === brand.toLowerCase()
  );
  return entry?.models ?? [];
}

/** Get all models of a given type across all brands */
export function getModelsByType(type: string): { brand: string; model: string; weight_grams?: number }[] {
  const results: { brand: string; model: string; weight_grams?: number }[] = [];
  for (const entry of BIKE_BRANDS_AND_MODELS) {
    for (const m of entry.models) {
      if (m.type === type) {
        results.push({ brand: entry.brand, model: m.model, weight_grams: m.weight_grams });
      }
    }
  }
  return results.sort((a, b) => a.brand.localeCompare(b.brand));
}

/** Search brands and models by query string (fuzzy-ish) */
export function searchBikesData(query: string): { brand: string; model: string; type: string; weight_grams?: number }[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results: { brand: string; model: string; type: string; weight_grams?: number }[] = [];
  for (const entry of BIKE_BRANDS_AND_MODELS) {
    for (const m of entry.models) {
      const fullName = `${entry.brand} ${m.model}`.toLowerCase();
      if (fullName.includes(q) || entry.brand.toLowerCase().includes(q) || m.model.toLowerCase().includes(q)) {
        results.push({ brand: entry.brand, model: m.model, type: m.type, weight_grams: m.weight_grams });
      }
    }
  }
  return results;
}

/** Total count of brands and models in the database */
export function getBikeDataStats(): { brands: number; models: number } {
  let models = 0;
  for (const entry of BIKE_BRANDS_AND_MODELS) {
    models += entry.models.length;
  }
  return { brands: BIKE_BRANDS_AND_MODELS.length, models };
}

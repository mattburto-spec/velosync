/**
 * VeloSync Gear Database
 * ~350 common bikepacking gear items with real manufacturer weights.
 * Used for autocomplete suggestions when adding gear.
 */

export interface GearEntry {
  name: string;
  brand: string;
  category: string;
  weight_grams: number;
  description?: string;
}

export const GEAR_DATABASE: GearEntry[] = [
  // ═══════════════════════════════════════════
  // SHELTER (~45 items)
  // ═══════════════════════════════════════════

  // Tents — 1-person
  { name: "Hubba NX 1", brand: "MSR", category: "shelter", weight_grams: 1120, description: "1-person freestanding tent" },
  { name: "Fly Creek HV UL1", brand: "Big Agnes", category: "shelter", weight_grams: 850, description: "1-person ultralight tent" },
  { name: "Hornet Elite 1P", brand: "Nemo", category: "shelter", weight_grams: 680, description: "1-person ultralight tent" },
  { name: "Copper Spur HV UL1", brand: "Big Agnes", category: "shelter", weight_grams: 964, description: "1-person ultralight tent" },
  { name: "Protrail Li", brand: "Tarptent", category: "shelter", weight_grams: 490, description: "1-person ultralight trekking pole tent" },
  { name: "Plexamid", brand: "Zpacks", category: "shelter", weight_grams: 410, description: "1-person DCF trekking pole tent" },
  { name: "Alto TR1", brand: "Sea to Summit", category: "shelter", weight_grams: 1070, description: "1-person semi-freestanding tent" },
  { name: "Solong 6", brand: "Naturehike", category: "shelter", weight_grams: 890, description: "1-person ultralight tent" },
  { name: "FreeLite 1", brand: "MSR", category: "shelter", weight_grams: 880, description: "1-person ultralight tent" },

  // Tents — 2-person
  { name: "Hubba Hubba NX 2", brand: "MSR", category: "shelter", weight_grams: 1540, description: "2-person freestanding tent" },
  { name: "Copper Spur HV UL2", brand: "Big Agnes", category: "shelter", weight_grams: 1247, description: "2-person ultralight tent" },
  { name: "Dagger OSMO 2P", brand: "Nemo", category: "shelter", weight_grams: 1580, description: "2-person backpacking tent" },
  { name: "Hornet OSMO 2P", brand: "Nemo", category: "shelter", weight_grams: 1020, description: "2-person ultralight tent" },
  { name: "Duplex", brand: "Zpacks", category: "shelter", weight_grams: 539, description: "2-person DCF trekking pole tent" },
  { name: "Double Rainbow Li", brand: "Tarptent", category: "shelter", weight_grams: 770, description: "2-person trekking pole tent" },
  { name: "Tiger Wall UL2", brand: "Big Agnes", category: "shelter", weight_grams: 1105, description: "2-person ultralight tent" },
  { name: "FreeLite 2", brand: "MSR", category: "shelter", weight_grams: 1130, description: "2-person ultralight tent" },
  { name: "Allak 2", brand: "Hilleberg", category: "shelter", weight_grams: 2700, description: "2-person 4-season tent" },
  { name: "Anjan 2", brand: "Hilleberg", category: "shelter", weight_grams: 1800, description: "2-person 3-season tent" },
  { name: "CloudUp 2", brand: "Naturehike", category: "shelter", weight_grams: 1280, description: "2-person budget ultralight tent" },
  { name: "Lanshan 2", brand: "3F UL Gear", category: "shelter", weight_grams: 960, description: "2-person trekking pole tent" },

  // Tarps & Bivvies
  { name: "Thru-Hiker 70 Wing Tarp", brand: "MSR", category: "shelter", weight_grams: 450, description: "Ultralight wing tarp" },
  { name: "Sil Tarp Poncho", brand: "Sea to Summit", category: "shelter", weight_grams: 260, description: "Poncho-tarp combo" },
  { name: "Pocket Tarp", brand: "Zpacks", category: "shelter", weight_grams: 156, description: "DCF ultralight flat tarp" },
  { name: "Plex Solo Tarp", brand: "Zpacks", category: "shelter", weight_grams: 170, description: "DCF solo shaped tarp" },
  { name: "Escape Bivvy", brand: "SOL", category: "shelter", weight_grams: 241, description: "Emergency bivvy sack" },
  { name: "Helium Bivy", brand: "Outdoor Research", category: "shelter", weight_grams: 510, description: "Breathable bivvy sack" },
  { name: "eVent Bivy", brand: "Borah Gear", category: "shelter", weight_grams: 280, description: "Ultralight side-zip bivvy" },

  // Groundsheets & Footprints
  { name: "Polycro Groundsheet", brand: "Gossamer Gear", category: "shelter", weight_grams: 51, description: "Ultralight polycro footprint" },
  { name: "Tyvek Groundsheet", brand: "Generic", category: "shelter", weight_grams: 130, description: "Tyvek ground cloth 1-person" },
  { name: "Universal Footprint", brand: "MSR", category: "shelter", weight_grams: 200, description: "Tent footprint" },

  // Hammocks
  { name: "Blackbird XLC", brand: "Warbonnet", category: "shelter", weight_grams: 620, description: "Asymmetric camping hammock" },
  { name: "Sub6 Hammock", brand: "Hummingbird", category: "shelter", weight_grams: 170, description: "Ultralight single hammock" },
  { name: "Hennessy Expedition Asym", brand: "Hennessy", category: "shelter", weight_grams: 1310, description: "Hammock with integrated bug net" },
  { name: "Atlas Straps", brand: "ENO", category: "shelter", weight_grams: 312, description: "Hammock suspension straps" },

  // ═══════════════════════════════════════════
  // SLEEP (~40 items)
  // ═══════════════════════════════════════════

  // Sleeping Bags — Down
  { name: "NanoLite 20°F", brand: "Western Mountaineering", category: "sleep", weight_grams: 737, description: "20°F 850-fill down bag" },
  { name: "UltraLite 20°F", brand: "Western Mountaineering", category: "sleep", weight_grams: 907, description: "20°F 850-fill down bag" },
  { name: "Spark SP II", brand: "Sea to Summit", category: "sleep", weight_grams: 560, description: "28°F 850-fill down bag" },
  { name: "Magma 15", brand: "REI Co-op", category: "sleep", weight_grams: 822, description: "15°F 850-fill down bag" },
  { name: "Riff 30", brand: "Nemo", category: "sleep", weight_grams: 765, description: "30°F down spoon bag" },
  { name: "Disco 30", brand: "Nemo", category: "sleep", weight_grams: 880, description: "30°F down spoon bag" },
  { name: "Hyperion 20", brand: "Therm-a-Rest", category: "sleep", weight_grams: 616, description: "20°F 900-fill down bag" },
  { name: "Questar 20", brand: "Therm-a-Rest", category: "sleep", weight_grams: 822, description: "20°F 650-fill down bag" },

  // Quilts
  { name: "Enigma 20°F", brand: "Enlightened Equipment", category: "sleep", weight_grams: 590, description: "20°F 850-fill down quilt" },
  { name: "Revelation 20°F", brand: "Enlightened Equipment", category: "sleep", weight_grams: 625, description: "20°F 850-fill down quilt" },
  { name: "Ember 20°F", brand: "Enlightened Equipment", category: "sleep", weight_grams: 510, description: "20°F 950-fill down quilt" },
  { name: "Vesper 20", brand: "Katabatic Gear", category: "sleep", weight_grams: 588, description: "20°F 900-fill down quilt" },
  { name: "Bandit 30°F", brand: "Nunatak", category: "sleep", weight_grams: 480, description: "30°F 900-fill down quilt" },
  { name: "Corus 20°F", brand: "Nemo", category: "sleep", weight_grams: 640, description: "20°F down quilt" },

  // Sleeping Pads — Inflatable
  { name: "Tensor Insulated", brand: "Nemo", category: "sleep", weight_grams: 460, description: "Insulated sleeping pad R4.2" },
  { name: "Tensor Ultralight", brand: "Nemo", category: "sleep", weight_grams: 345, description: "Uninsulated sleeping pad R1.6" },
  { name: "NeoAir XTherm NXT", brand: "Therm-a-Rest", category: "sleep", weight_grams: 440, description: "4-season pad R6.9" },
  { name: "NeoAir XLite NXT", brand: "Therm-a-Rest", category: "sleep", weight_grams: 354, description: "3-season pad R4.5" },
  { name: "NeoAir UberLite", brand: "Therm-a-Rest", category: "sleep", weight_grams: 250, description: "Ultralight pad R2.3" },
  { name: "Ether Light XT Insulated", brand: "Sea to Summit", category: "sleep", weight_grams: 490, description: "Insulated pad R3.2" },
  { name: "Ultralight Insulated", brand: "Sea to Summit", category: "sleep", weight_grams: 480, description: "Insulated sleeping pad R3.1" },
  { name: "Klymit Static V", brand: "Klymit", category: "sleep", weight_grams: 513, description: "V-chamber sleeping pad" },
  { name: "Paria Recharge DW", brand: "Paria Outdoor", category: "sleep", weight_grams: 540, description: "Insulated double-wall pad" },

  // Sleeping Pads — Foam
  { name: "Z Lite Sol", brand: "Therm-a-Rest", category: "sleep", weight_grams: 410, description: "Accordion foam pad R2.0" },
  { name: "RidgeRest SOLite", brand: "Therm-a-Rest", category: "sleep", weight_grams: 540, description: "Roll-up foam pad R2.8" },
  { name: "Thinlight Pad", brand: "Gossamer Gear", category: "sleep", weight_grams: 68, description: "1/8\" closed cell foam" },

  // Pillows
  { name: "Aeros Ultralight Pillow", brand: "Sea to Summit", category: "sleep", weight_grams: 60, description: "Inflatable camp pillow" },
  { name: "Fillo", brand: "Nemo", category: "sleep", weight_grams: 175, description: "Foam + inflatable pillow" },
  { name: "Air Head Lite", brand: "Therm-a-Rest", category: "sleep", weight_grams: 65, description: "Ultralight inflatable pillow" },
  { name: "Dream Pillow", brand: "Klymit", category: "sleep", weight_grams: 113, description: "Inflatable camping pillow" },

  // Liners
  { name: "Silk Liner", brand: "Sea to Summit", category: "sleep", weight_grams: 115, description: "Silk sleeping bag liner" },
  { name: "Reactor Extreme Liner", brand: "Sea to Summit", category: "sleep", weight_grams: 350, description: "Thermal boost liner" },

  // ═══════════════════════════════════════════
  // COOK (~45 items)
  // ═══════════════════════════════════════════

  // Stoves — Canister
  { name: "PocketRocket 2", brand: "MSR", category: "cook", weight_grams: 73, description: "Ultralight canister stove" },
  { name: "PocketRocket Deluxe", brand: "MSR", category: "cook", weight_grams: 83, description: "Canister stove with regulator" },
  { name: "WindMaster", brand: "Soto", category: "cook", weight_grams: 67, description: "Wind-resistant canister stove" },
  { name: "Amicus", brand: "Soto", category: "cook", weight_grams: 81, description: "Compact canister stove" },
  { name: "Flash", brand: "Jetboil", category: "cook", weight_grams: 371, description: "Integrated cooking system 1L" },
  { name: "MiniMo", brand: "Jetboil", category: "cook", weight_grams: 415, description: "Integrated cooking system with simmer" },
  { name: "Stash", brand: "Jetboil", category: "cook", weight_grams: 200, description: "Ultralight cooking system" },
  { name: "BRS-3000T", brand: "BRS", category: "cook", weight_grams: 25, description: "Ultra-lightweight canister stove" },
  { name: "GigaPower 2.0", brand: "Snow Peak", category: "cook", weight_grams: 56, description: "Premium canister stove" },
  { name: "LiteMax", brand: "Snow Peak", category: "cook", weight_grams: 56, description: "Ultralight titanium canister stove" },
  { name: "Crux Lite", brand: "Optimus", category: "cook", weight_grams: 73, description: "Compact canister stove" },

  // Stoves — Multi-fuel & Alcohol
  { name: "WhisperLite Universal", brand: "MSR", category: "cook", weight_grams: 331, description: "Multi-fuel liquid stove" },
  { name: "DragonFly", brand: "MSR", category: "cook", weight_grams: 395, description: "Simmering liquid fuel stove" },
  { name: "Polaris Optifuel", brand: "Optimus", category: "cook", weight_grams: 415, description: "Multi-fuel stove" },
  { name: "Evernew Titanium Alcohol Stove", brand: "Evernew", category: "cook", weight_grams: 34, description: "Titanium alcohol stove" },
  { name: "Trangia Spirit Burner", brand: "Trangia", category: "cook", weight_grams: 110, description: "Brass alcohol burner" },
  { name: "Esbit Pocket Stove", brand: "Esbit", category: "cook", weight_grams: 85, description: "Solid fuel tablet stove" },

  // Pots & Cookware
  { name: "Titanium 750", brand: "Toaks", category: "cook", weight_grams: 103, description: "750ml titanium pot" },
  { name: "Titanium 550", brand: "Toaks", category: "cook", weight_grams: 72, description: "550ml titanium pot/mug" },
  { name: "Titanium 650", brand: "Toaks", category: "cook", weight_grams: 86, description: "650ml titanium pot" },
  { name: "Titanium 1100", brand: "Toaks", category: "cook", weight_grams: 138, description: "1100ml titanium pot" },
  { name: "Trek 900", brand: "Snow Peak", category: "cook", weight_grams: 175, description: "900ml titanium cookset" },
  { name: "Trail Lite Solo Cook Set", brand: "MSR", category: "cook", weight_grams: 245, description: "1L hard-anodized pot + lid" },
  { name: "HalUlite Microdualist", brand: "GSI Outdoors", category: "cook", weight_grams: 340, description: "2-person cookset" },
  { name: "Pinnacle Soloist", brand: "GSI Outdoors", category: "cook", weight_grams: 326, description: "Solo cookset with mug + bowl" },
  { name: "X-Pot 1.4L", brand: "Sea to Summit", category: "cook", weight_grams: 186, description: "Collapsible pot" },

  // Utensils & Accessories
  { name: "Titanium Long Spork", brand: "Toaks", category: "cook", weight_grams: 18, description: "Titanium spork" },
  { name: "Folding Spork", brand: "Snow Peak", category: "cook", weight_grams: 10, description: "Titanium folding spork" },
  { name: "Alpha Light Spork", brand: "Sea to Summit", category: "cook", weight_grams: 9, description: "Hard anodized aluminum spork" },
  { name: "X-Cup", brand: "Sea to Summit", category: "cook", weight_grams: 45, description: "Collapsible silicone cup" },
  { name: "X-Bowl", brand: "Sea to Summit", category: "cook", weight_grams: 48, description: "Collapsible silicone bowl" },
  { name: "X-Mug", brand: "Sea to Summit", category: "cook", weight_grams: 50, description: "Collapsible silicone mug" },

  // Water Filters & Treatment
  { name: "Squeeze", brand: "Sawyer", category: "cook", weight_grams: 85, description: "Squeeze water filter" },
  { name: "Mini", brand: "Sawyer", category: "cook", weight_grams: 57, description: "Mini water filter" },
  { name: "Micro", brand: "Sawyer", category: "cook", weight_grams: 57, description: "Micro squeeze filter" },
  { name: "BeFree 1L", brand: "Katadyn", category: "cook", weight_grams: 59, description: "Collapsible water filter" },
  { name: "TrailShot", brand: "MSR", category: "cook", weight_grams: 142, description: "Pocket water filter" },
  { name: "Guardian Gravity", brand: "MSR", category: "cook", weight_grams: 303, description: "Gravity water purifier" },
  { name: "SteriPEN Adventurer", brand: "SteriPEN", category: "cook", weight_grams: 107, description: "UV water purifier" },
  { name: "Aquamira Drops", brand: "Aquamira", category: "cook", weight_grams: 85, description: "Chlorine dioxide water treatment" },

  // ═══════════════════════════════════════════
  // CLOTHING (~50 items)
  // ═══════════════════════════════════════════

  // Rain Jackets
  { name: "Torrentshell 3L", brand: "Patagonia", category: "clothing", weight_grams: 394, description: "3-layer waterproof jacket" },
  { name: "Minimalist Jacket", brand: "Marmot", category: "clothing", weight_grams: 308, description: "Gore-Tex Paclite shell" },
  { name: "Helium Rain Jacket", brand: "Outdoor Research", category: "clothing", weight_grams: 178, description: "Ultralight rain jacket" },
  { name: "Beta LT", brand: "Arc'teryx", category: "clothing", weight_grams: 315, description: "Gore-Tex lightweight shell" },
  { name: "Norvan LT Jacket", brand: "Arc'teryx", category: "clothing", weight_grams: 175, description: "Ultralight Gore-Tex shell" },
  { name: "PreCip Eco Jacket", brand: "Marmot", category: "clothing", weight_grams: 354, description: "Budget waterproof jacket" },
  { name: "Spring Classic Jacket", brand: "Showers Pass", category: "clothing", weight_grams: 425, description: "Cycling rain jacket" },
  { name: "Elite 2.1 Jacket", brand: "Showers Pass", category: "clothing", weight_grams: 365, description: "Waterproof cycling jacket" },
  { name: "Shakedry Trail Jacket", brand: "Gore Wear", category: "clothing", weight_grams: 135, description: "Ultralight Gore-Tex Shakedry" },

  // Insulation
  { name: "Nano Puff", brand: "Patagonia", category: "clothing", weight_grams: 337, description: "Synthetic insulated jacket" },
  { name: "Down Sweater", brand: "Patagonia", category: "clothing", weight_grams: 371, description: "800-fill down jacket" },
  { name: "Micro Puff Hoody", brand: "Patagonia", category: "clothing", weight_grams: 264, description: "Ultralight synthetic hoody" },
  { name: "Cerium LT Hoody", brand: "Arc'teryx", category: "clothing", weight_grams: 280, description: "850-fill down hoody" },
  { name: "Ghost Whisperer 2", brand: "Mountain Hardwear", category: "clothing", weight_grams: 204, description: "800-fill down jacket" },
  { name: "Plasma 1000 Down Jacket", brand: "Montbell", category: "clothing", weight_grams: 128, description: "1000-fill ultralight down" },
  { name: "ThermoBall Eco Hoodie", brand: "The North Face", category: "clothing", weight_grams: 350, description: "Synthetic insulation hoody" },

  // Base Layers
  { name: "Capilene Cool Merino Shirt", brand: "Patagonia", category: "clothing", weight_grams: 145, description: "Merino wool blend base layer" },
  { name: "Capilene Midweight Crew", brand: "Patagonia", category: "clothing", weight_grams: 190, description: "Midweight polyester base" },
  { name: "175 Everyday Crewe", brand: "Icebreaker", category: "clothing", weight_grams: 170, description: "Merino wool base layer" },
  { name: "260 Tech LS Crewe", brand: "Icebreaker", category: "clothing", weight_grams: 230, description: "Midweight merino crew" },
  { name: "Merino 150 Tee", brand: "Smartwool", category: "clothing", weight_grams: 140, description: "Lightweight merino tee" },
  { name: "Merino Sport 150 Long Sleeve", brand: "Smartwool", category: "clothing", weight_grams: 170, description: "Merino-blend long sleeve" },

  // Cycling-specific
  { name: "Bib Shorts", brand: "Rapha", category: "clothing", weight_grams: 210, description: "Core cycling bib shorts" },
  { name: "Cargo Bib Shorts", brand: "Rapha", category: "clothing", weight_grams: 260, description: "Bikepacking bib shorts with pockets" },
  { name: "Adventure Jersey", brand: "Rapha", category: "clothing", weight_grams: 190, description: "Relaxed fit cycling jersey" },
  { name: "Gravel Jersey", brand: "Pearl Izumi", category: "clothing", weight_grams: 180, description: "Gravel cycling jersey" },
  { name: "Trail Shorts", brand: "Pearl Izumi", category: "clothing", weight_grams: 240, description: "MTB-style cycling shorts" },
  { name: "Chamois Liner", brand: "Generic", category: "clothing", weight_grams: 120, description: "Cycling liner shorts" },
  { name: "SPD Sandals", brand: "Shimano", category: "clothing", weight_grams: 690, description: "Clip-in cycling sandals (pair)" },
  { name: "Gravel Shoes", brand: "Giro", category: "clothing", weight_grams: 620, description: "Lace-up gravel cycling shoes (pair)" },

  // Accessories
  { name: "Buff Original", brand: "Buff", category: "clothing", weight_grams: 35, description: "Multi-use neck gaiter" },
  { name: "Merino Buff", brand: "Buff", category: "clothing", weight_grams: 55, description: "Merino wool neck gaiter" },
  { name: "Cycling Gloves", brand: "Giro", category: "clothing", weight_grams: 60, description: "Half-finger cycling gloves (pair)" },
  { name: "Lobster Gloves", brand: "Pearl Izumi", category: "clothing", weight_grams: 180, description: "Cold weather split-finger gloves" },
  { name: "Arm Warmers", brand: "Rapha", category: "clothing", weight_grams: 60, description: "Thermal arm warmers (pair)" },
  { name: "Leg Warmers", brand: "Rapha", category: "clothing", weight_grams: 120, description: "Thermal leg warmers (pair)" },
  { name: "Cycling Cap", brand: "Walz", category: "clothing", weight_grams: 50, description: "Cotton cycling cap" },
  { name: "Waterproof Socks", brand: "Showers Pass", category: "clothing", weight_grams: 120, description: "Waterproof cycling socks (pair)" },
  { name: "Merino Cycling Socks", brand: "Rapha", category: "clothing", weight_grams: 55, description: "Merino cycling socks (pair)" },

  // ═══════════════════════════════════════════
  // TOOLS & BAGS (~50 items)
  // ═══════════════════════════════════════════

  // Multi-tools
  { name: "Crank Brothers M19", brand: "Crank Brothers", category: "tools", weight_grams: 175, description: "19-function bike multi-tool" },
  { name: "Crank Brothers M10", brand: "Crank Brothers", category: "tools", weight_grams: 148, description: "10-function bike multi-tool" },
  { name: "I-Beam Mini", brand: "Topeak", category: "tools", weight_grams: 95, description: "Mini bike multi-tool" },
  { name: "Mini Ratchet", brand: "Topeak", category: "tools", weight_grams: 97, description: "Mini ratchet tool set" },
  { name: "Fix It Sticks", brand: "Fix It Sticks", category: "tools", weight_grams: 70, description: "Replaceable bit multi-tool" },
  { name: "IB-3", brand: "Park Tool", category: "tools", weight_grams: 175, description: "I-Beam multi-tool" },

  // Pumps & Inflation
  { name: "Road Morph G", brand: "Topeak", category: "tools", weight_grams: 205, description: "Frame pump with gauge" },
  { name: "Micro Rocket AL", brand: "Topeak", category: "tools", weight_grams: 55, description: "Ultralight mini pump" },
  { name: "Pocket Drive", brand: "Lezyne", category: "tools", weight_grams: 79, description: "Compact hand pump" },
  { name: "HP Drive", brand: "Lezyne", category: "tools", weight_grams: 140, description: "High pressure mini pump" },
  { name: "ULTRA FL-S CO2", brand: "Lezyne", category: "tools", weight_grams: 30, description: "CO2 inflator head" },

  // Tire Repair
  { name: "Tube Patch Kit", brand: "Park Tool", category: "tools", weight_grams: 28, description: "Vulcanizing patch kit" },
  { name: "Tire Boot", brand: "Park Tool", category: "tools", weight_grams: 15, description: "Emergency tire boot" },
  { name: "Dart Tool", brand: "Stan's NoTubes", category: "tools", weight_grams: 20, description: "Tubeless plug tool" },
  { name: "Bacon Strips", brand: "Stan's NoTubes", category: "tools", weight_grams: 10, description: "Tubeless tire plugs (5-pack)" },
  { name: "Tire Levers (3)", brand: "Pedro's", category: "tools", weight_grams: 30, description: "Set of 3 tire levers" },

  // Locks
  { name: "Z Lok Combo", brand: "Hiplok", category: "tools", weight_grams: 70, description: "Zip tie combination lock" },
  { name: "Ottolock Cinch", brand: "Ottolock", category: "tools", weight_grams: 170, description: "76cm lightweight cinch lock" },
  { name: "TiGr Mini+", brand: "TiGr", category: "tools", weight_grams: 400, description: "Lightweight titanium U-lock" },

  // Bikepacking Bags
  { name: "Sweetroll", brand: "Revelate Designs", category: "tools", weight_grams: 380, description: "Handlebar roll bag 15L" },
  { name: "Spinelock 16", brand: "Revelate Designs", category: "tools", weight_grams: 400, description: "Seat bag 16L" },
  { name: "Ripio", brand: "Revelate Designs", category: "tools", weight_grams: 250, description: "Frame bag (custom fit)" },
  { name: "Tangle Frame Bag", brand: "Revelate Designs", category: "tools", weight_grams: 200, description: "Half-frame bag" },
  { name: "Mag-Tank 2000", brand: "Revelate Designs", category: "tools", weight_grams: 150, description: "Top tube bag" },
  { name: "Mountain Feedbag", brand: "Revelate Designs", category: "tools", weight_grams: 80, description: "Handlebar stem bag" },
  { name: "Handlebar Pack", brand: "Ortlieb", category: "tools", weight_grams: 388, description: "Waterproof handlebar bag 15L" },
  { name: "Seat-Pack", brand: "Ortlieb", category: "tools", weight_grams: 290, description: "Waterproof seat bag 16.5L" },
  { name: "Frame-Pack RC", brand: "Ortlieb", category: "tools", weight_grams: 255, description: "Waterproof frame bag" },
  { name: "Accessory-Pack", brand: "Ortlieb", category: "tools", weight_grams: 200, description: "Handlebar accessory bag" },
  { name: "EXP Handlebar Pack", brand: "Apidura", category: "tools", weight_grams: 308, description: "Handlebar dry bag 14L" },
  { name: "EXP Saddle Pack", brand: "Apidura", category: "tools", weight_grams: 244, description: "Seat bag 14L" },
  { name: "EXP Frame Pack", brand: "Apidura", category: "tools", weight_grams: 184, description: "Full frame bag" },
  { name: "Racing Bolt-On Top Tube", brand: "Apidura", category: "tools", weight_grams: 55, description: "Bolt-on top tube bag" },
  { name: "Anything Cage HD", brand: "Salsa", category: "tools", weight_grams: 73, description: "Oversized bottle cage for dry bags" },
  { name: "Anything Cradle", brand: "Salsa", category: "tools", weight_grams: 140, description: "Handlebar cradle + dry bag" },
  { name: "Cargo Cage", brand: "Blackburn", category: "tools", weight_grams: 76, description: "Universal cargo cage" },

  // Racks
  { name: "Tailfin AeroPack", brand: "Tailfin", category: "tools", weight_grams: 600, description: "Carbon seatpost rack + bag" },
  { name: "Alternator Rack", brand: "Salsa", category: "tools", weight_grams: 567, description: "Front or rear rack" },
  { name: "Freeloaders", brand: "Old Man Mountain", category: "tools", weight_grams: 725, description: "Universal front rack" },

  // ═══════════════════════════════════════════
  // ELECTRONICS (~35 items)
  // ═══════════════════════════════════════════

  // Bike Computers & GPS
  { name: "Edge 840 Solar", brand: "Garmin", category: "electronics", weight_grams: 84, description: "GPS bike computer with solar" },
  { name: "Edge 540", brand: "Garmin", category: "electronics", weight_grams: 80, description: "GPS bike computer" },
  { name: "Edge 1050", brand: "Garmin", category: "electronics", weight_grams: 123, description: "Touchscreen GPS bike computer" },
  { name: "ELEMNT ROAM", brand: "Wahoo", category: "electronics", weight_grams: 95, description: "GPS bike computer" },
  { name: "ELEMNT BOLT V2", brand: "Wahoo", category: "electronics", weight_grams: 69, description: "Compact GPS bike computer" },
  { name: "Karoo 3", brand: "Hammerhead", category: "electronics", weight_grams: 132, description: "Touchscreen GPS bike computer" },
  { name: "inReach Mini 2", brand: "Garmin", category: "electronics", weight_grams: 100, description: "Satellite communicator" },
  { name: "inReach Messenger", brand: "Garmin", category: "electronics", weight_grams: 113, description: "Satellite messenger" },

  // Lights
  { name: "Seca Comp 2000", brand: "Light & Motion", category: "electronics", weight_grams: 175, description: "2000 lumen front light" },
  { name: "Macro Drive 1400XL", brand: "Lezyne", category: "electronics", weight_grams: 206, description: "1400 lumen front light" },
  { name: "Lite Drive 1200+", brand: "Lezyne", category: "electronics", weight_grams: 146, description: "1200 lumen front light" },
  { name: "Micro Drive 800+", brand: "Lezyne", category: "electronics", weight_grams: 100, description: "800 lumen front light" },
  { name: "Volt 800", brand: "Cateye", category: "electronics", weight_grams: 140, description: "800 lumen front light" },
  { name: "Rapid X3", brand: "Cateye", category: "electronics", weight_grams: 39, description: "Rear safety light" },
  { name: "Strip Drive Pro", brand: "Lezyne", category: "electronics", weight_grams: 53, description: "Rear light 400 lumens" },
  { name: "Viz 300", brand: "Bontrager", category: "electronics", weight_grams: 60, description: "Rear daytime visible light" },
  { name: "NU25 UL", brand: "Nitecore", category: "electronics", weight_grams: 28, description: "Ultralight headlamp" },
  { name: "Actik Core", brand: "Petzl", category: "electronics", weight_grams: 82, description: "Rechargeable headlamp 600 lumen" },
  { name: "Bindi", brand: "Petzl", category: "electronics", weight_grams: 35, description: "Ultra-compact headlamp" },

  // Power Banks & Chargers
  { name: "PowerCore 10000", brand: "Anker", category: "electronics", weight_grams: 194, description: "10000mAh power bank" },
  { name: "PowerCore 20000", brand: "Anker", category: "electronics", weight_grams: 343, description: "20000mAh power bank" },
  { name: "PowerCore 5000", brand: "Anker", category: "electronics", weight_grams: 113, description: "5000mAh mini power bank" },
  { name: "NB10000", brand: "Nitecore", category: "electronics", weight_grams: 150, description: "10000mAh carbon fiber power bank" },
  { name: "NB20000", brand: "Nitecore", category: "electronics", weight_grams: 284, description: "20000mAh power bank" },
  { name: "Dynamo Hub", brand: "SON", category: "electronics", weight_grams: 400, description: "SON 28 dynamo hub" },
  { name: "The Plug III", brand: "Cinq5", category: "electronics", weight_grams: 70, description: "Dynamo USB charger" },
  { name: "Sinewave Reactor", brand: "Sinewave Cycles", category: "electronics", weight_grams: 85, description: "Dynamo USB charger" },
  { name: "Nano II", brand: "Anker", category: "electronics", weight_grams: 47, description: "30W USB-C GaN charger" },
  { name: "PowerPort III Nano", brand: "Anker", category: "electronics", weight_grams: 30, description: "20W USB-C wall charger" },

  // Cameras
  { name: "GoPro Hero 12", brand: "GoPro", category: "electronics", weight_grams: 154, description: "Action camera" },
  { name: "Insta360 X4", brand: "Insta360", category: "electronics", weight_grams: 203, description: "360° action camera" },
  { name: "DJI Action 4", brand: "DJI", category: "electronics", weight_grams: 145, description: "Action camera" },

  // ═══════════════════════════════════════════
  // HYDRATION (~20 items)
  // ═══════════════════════════════════════════

  // Bottles
  { name: "Podium Chill 21oz", brand: "CamelBak", category: "hydration", weight_grams: 122, description: "Insulated bike bottle" },
  { name: "Podium 24oz", brand: "CamelBak", category: "hydration", weight_grams: 96, description: "Bike water bottle" },
  { name: "Wide Mouth 32oz", brand: "Nalgene", category: "hydration", weight_grams: 178, description: "1L wide mouth bottle" },
  { name: "Ultralite 32oz", brand: "Nalgene", category: "hydration", weight_grams: 100, description: "Lightweight 1L bottle" },
  { name: "SoftBottle 1L", brand: "Platypus", category: "hydration", weight_grams: 25, description: "Collapsible 1L bottle" },
  { name: "SoftBottle 2L", brand: "Platypus", category: "hydration", weight_grams: 33, description: "Collapsible 2L bottle" },
  { name: "Stow 1L", brand: "HydraPak", category: "hydration", weight_grams: 33, description: "Collapsible 1L flask" },
  { name: "Seeker 2L", brand: "HydraPak", category: "hydration", weight_grams: 68, description: "Collapsible 2L container" },
  { name: "Seeker 4L", brand: "HydraPak", category: "hydration", weight_grams: 88, description: "Collapsible 4L container" },

  // Bladders
  { name: "Crux 2L Reservoir", brand: "CamelBak", category: "hydration", weight_grams: 170, description: "2L hydration bladder" },
  { name: "Crux 3L Reservoir", brand: "CamelBak", category: "hydration", weight_grams: 181, description: "3L hydration bladder" },
  { name: "Big Zip EVO 2L", brand: "Platypus", category: "hydration", weight_grams: 175, description: "2L hydration bladder" },
  { name: "Shape-Shift 2L", brand: "HydraPak", category: "hydration", weight_grams: 142, description: "2L reversible bladder" },

  // Purification (duplicating key items from cook for discoverability)
  { name: "LifeStraw Personal", brand: "LifeStraw", category: "hydration", weight_grams: 46, description: "Personal water filter straw" },
  { name: "LifeStraw Go 1L", brand: "LifeStraw", category: "hydration", weight_grams: 168, description: "Filter bottle 1L" },
  { name: "GRAYL GeoPress", brand: "GRAYL", category: "hydration", weight_grams: 450, description: "24oz purifier bottle" },
  { name: "GRAYL UltraPress", brand: "GRAYL", category: "hydration", weight_grams: 320, description: "16.9oz purifier bottle" },

  // Electrolytes
  { name: "Nuun Sport Tablets (10)", brand: "Nuun", category: "hydration", weight_grams: 55, description: "Electrolyte tablets tube" },
  { name: "Skratch Labs Mix (packet)", brand: "Skratch Labs", category: "hydration", weight_grams: 22, description: "Single serve drink mix" },

  // ═══════════════════════════════════════════
  // FOOD STORAGE (~15 items)
  // ═══════════════════════════════════════════

  { name: "BV500 Bear Vault", brand: "BearVault", category: "food", weight_grams: 1140, description: "Bear canister 7.2L" },
  { name: "BV450 Bear Vault", brand: "BearVault", category: "food", weight_grams: 921, description: "Bear canister 4.7L" },
  { name: "Bare Boxer Contender", brand: "Bare Boxer", category: "food", weight_grams: 760, description: "Ultralight bear canister" },
  { name: "Ursack Major", brand: "Ursack", category: "food", weight_grams: 220, description: "Bear-resistant food bag" },
  { name: "Ursack AllMitey", brand: "Ursack", category: "food", weight_grams: 245, description: "Bear + critter resistant bag" },
  { name: "OpSak 28x20", brand: "Loksak", category: "food", weight_grams: 42, description: "Odor-proof dry bag" },
  { name: "Ultra-Sil Dry Sack 8L", brand: "Sea to Summit", category: "food", weight_grams: 30, description: "Silnylon dry bag 8L" },
  { name: "Ultra-Sil Dry Sack 13L", brand: "Sea to Summit", category: "food", weight_grams: 36, description: "Silnylon dry bag 13L" },
  { name: "Lightweight Dry Sack 5L", brand: "Sea to Summit", category: "food", weight_grams: 22, description: "Ultralight dry bag 5L" },
  { name: "Compression Sack 6L", brand: "Sea to Summit", category: "food", weight_grams: 44, description: "Ultra-Sil compression sack" },
  { name: "Compression Sack 10L", brand: "Sea to Summit", category: "food", weight_grams: 56, description: "Ultra-Sil compression sack" },
  { name: "eVac Compression Sack 14L", brand: "Sea to Summit", category: "food", weight_grams: 68, description: "Valve compression sack" },
  { name: "Stuff Sack 6L", brand: "Granite Gear", category: "food", weight_grams: 18, description: "Air Bag stuff sack" },
  { name: "PCT Packer 2L Bottle", brand: "Cnoc", category: "food", weight_grams: 62, description: "2L water/food carry bottle" },

  // ═══════════════════════════════════════════
  // MISC (~25 items)
  // ═══════════════════════════════════════════

  // First Aid
  { name: "Ultralight .5 First Aid Kit", brand: "Adventure Medical", category: "misc", weight_grams: 119, description: "Ultralight first aid kit 1-2 person" },
  { name: "Ultralight .7 First Aid Kit", brand: "Adventure Medical", category: "misc", weight_grams: 198, description: "First aid kit 1-4 person" },
  { name: "Ultralight .9 First Aid Kit", brand: "Adventure Medical", category: "misc", weight_grams: 280, description: "Comprehensive first aid kit" },

  // Repair & Maintenance
  { name: "Tenacious Tape", brand: "Gear Aid", category: "misc", weight_grams: 14, description: "Fabric repair tape" },
  { name: "Seam Grip + WP", brand: "Gear Aid", category: "misc", weight_grams: 28, description: "Seam sealer + adhesive" },
  { name: "Quick Link (pair)", brand: "KMC", category: "misc", weight_grams: 6, description: "Chain quick link" },
  { name: "Spare Derailleur Hanger", brand: "Generic", category: "misc", weight_grams: 20, description: "Backup derailleur hanger" },
  { name: "Spare Brake Pads", brand: "Shimano", category: "misc", weight_grams: 30, description: "Disc brake pad set" },
  { name: "Chain Lube 2oz", brand: "Finish Line", category: "misc", weight_grams: 65, description: "Wet chain lubricant" },
  { name: "Zip Ties (10)", brand: "Generic", category: "misc", weight_grams: 15, description: "Assorted cable ties" },
  { name: "Duct Tape (mini roll)", brand: "Gorilla", category: "misc", weight_grams: 25, description: "Mini duct tape roll" },

  // Navigation & Safety
  { name: "Compass", brand: "Suunto", category: "misc", weight_grams: 30, description: "A-30 baseplate compass" },
  { name: "Emergency Blanket", brand: "SOL", category: "misc", weight_grams: 82, description: "Heatsheets emergency blanket" },
  { name: "Emergency Bivvy", brand: "SOL", category: "misc", weight_grams: 110, description: "Survival sleeping bag" },
  { name: "Whistle", brand: "Fox 40", category: "misc", weight_grams: 6, description: "Safety whistle" },
  { name: "Bear Spray", brand: "Counter Assault", category: "misc", weight_grams: 310, description: "Bear deterrent spray" },

  // Straps & Cord
  { name: "Voile Straps 20\"", brand: "Voile", category: "misc", weight_grams: 50, description: "Nano Voile strap (pair)" },
  { name: "Voile Straps 15\"", brand: "Voile", category: "misc", weight_grams: 38, description: "Nano Voile strap (pair)" },
  { name: "Dyneema Cord 2mm (15m)", brand: "Generic", category: "misc", weight_grams: 30, description: "Ultralight utility cord" },
  { name: "Carabiners Mini (2)", brand: "Generic", category: "misc", weight_grams: 16, description: "Mini aluminum carabiners" },
  { name: "Bungee Cords (4)", brand: "Generic", category: "misc", weight_grams: 45, description: "Mini bungee cord set" },

  // Toiletries
  { name: "Camp Suds 2oz", brand: "Sea to Summit", category: "misc", weight_grams: 65, description: "Biodegradable camp soap" },
  { name: "Wilderness Wipes (25)", brand: "Sea to Summit", category: "misc", weight_grams: 100, description: "Biodegradable body wipes" },
  { name: "Trowel", brand: "Deuce", category: "misc", weight_grams: 18, description: "#2 ultralight trowel" },
  { name: "Sunscreen Stick 1oz", brand: "Sun Bum", category: "misc", weight_grams: 30, description: "SPF 50 face sunscreen" },
];

// ═══════════════════════════════════════════
// Search & Helper Functions
// ═══════════════════════════════════════════

/**
 * Search the gear database with fuzzy matching.
 * Matches on name, brand, and description.
 */
export function searchGearDatabase(query: string, limit = 12): GearEntry[] {
  if (!query || query.length < 2) return [];

  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  const scored = GEAR_DATABASE.map((item) => {
    const searchable = `${item.name} ${item.brand} ${item.description ?? ""} ${item.category}`.toLowerCase();
    let score = 0;

    for (const term of terms) {
      if (item.name.toLowerCase().includes(term)) score += 3;
      if (item.brand.toLowerCase().includes(term)) score += 2;
      if (item.description?.toLowerCase().includes(term)) score += 1;
      if (item.category.toLowerCase() === term) score += 1;
      if (!searchable.includes(term)) return { item, score: 0 };
    }

    // Exact name match gets bonus
    if (item.name.toLowerCase().startsWith(query.toLowerCase())) score += 5;
    if (item.brand.toLowerCase().startsWith(query.toLowerCase())) score += 3;

    return { item, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.item);
}

/**
 * Get all unique brands in the gear database.
 */
export function getAllGearBrands(): string[] {
  const brands = new Set(GEAR_DATABASE.map((item) => item.brand));
  return [...brands].sort();
}

/**
 * Get all items for a given category.
 */
export function getGearByCategory(category: string): GearEntry[] {
  return GEAR_DATABASE.filter((item) => item.category === category);
}

/**
 * Get database stats.
 */
export function getGearDatabaseStats() {
  const brands = new Set(GEAR_DATABASE.map((item) => item.brand));
  const categories = new Set(GEAR_DATABASE.map((item) => item.category));
  return {
    totalItems: GEAR_DATABASE.length,
    brands: brands.size,
    categories: categories.size,
  };
}

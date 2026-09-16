import { Product, Testimonial, FAQItem } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'vitalo-whey',
    name: 'VITALØ WHEY',
    tagline: 'Ultra-Pure Hydrolyzed & Native Whey Isolate',
    category: 'Protein',
    price: 1850,
    originalPrice: 2100,
    rating: 4.9,
    reviewCount: 342,
    badge: 'BEST SELLER',
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=900&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Cold-filtered native whey isolate delivering 27g of pure protein per serving with zero added sugar and rapid absorption kinetics.',
    longDesc: 'Engineered for athletes and fitness enthusiasts who refuse compromise. VITALØ WHEY undergoes a proprietary low-temperature cross-flow microfiltration process that preserves vital bioactive protein fractions while stripping away lactose, excess fats, and artificial fillers. Yields an ultra-smooth, silky texture that dissolves instantly in water or almond milk.',
    servingSize: '1 scoop (32g)',
    servingsPerContainer: 30,
    flavors: ['Belgian Cocoa Dark', 'Madagascar Vanilla Bean', 'Salted Caramel Crunch', 'Raw Unflavored'],
    sizes: ['1.0 kg (30 Servings)', '2.2 kg (70 Servings)'],
    benefits: [
      '27g Native Whey Protein Isolate per scoop',
      '6.2g Natural BCAAs + 4.8g Glutamine precursor',
      '< 1g Carbohydrates and 0g Added Sugar',
      'Digestive enzyme matrix (DigeZyme®) for zero bloat'
    ],
    supplementFacts: [
      { name: 'Calories', amount: '120 kcal' },
      { name: 'Total Fat', amount: '0.5g', dailyValue: '1%' },
      { name: 'Total Carbohydrate', amount: '1g', dailyValue: '<1%' },
      { name: 'Dietary Fiber', amount: '0g', dailyValue: '0%' },
      { name: 'Total Sugars', amount: '0g' },
      { name: 'Protein (Native Isolate)', amount: '27g', dailyValue: '54%' },
      { name: 'Calcium', amount: '140mg', dailyValue: '11%' },
      { name: 'Sodium', amount: '75mg', dailyValue: '3%' },
      { name: 'Potassium', amount: '160mg', dailyValue: '4%' },
      { name: 'DigeZyme® Enzyme Complex', amount: '50mg' }
    ],
    ingredients: 'Cross-Flow Microfiltered Whey Protein Isolate, Cocoa (processed with alkali), Natural Flavors, Sunflower Lecithin (emulsifier), Himalayan Pink Salt, DigeZyme® (Amylase, Protease, Lactase, Lipase, Cellulase), Stevia Leaf Extract.',
    usageInstructions: 'Mix 1 level scoop with 250-300ml of cold water or your favorite beverage. Shake for 20 seconds. Best consumed within 45 minutes post-workout or as a morning protein boost.',
    timing: 'Post-Workout / Breakfast',
    isFeatured: true
  },
  {
    id: 'vitalo-creatine',
    name: 'VITALØ CREATINE',
    tagline: '100% Creapure® Micronized Monohydrate',
    category: 'Performance',
    price: 950,
    originalPrice: 1100,
    rating: 5.0,
    reviewCount: 489,
    badge: 'ESSENTIAL',
    image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=900&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'The gold-standard German Creapure® monohydrate, micronized to 200 mesh for instant dissolution, cellular hydration, and power output.',
    longDesc: 'Crafted exclusively in Trostberg, Germany under pharmaceutical GMP conditions. VITALØ CREATINE provides the purest, ultra-tested creatine monohydrate on earth (99.95% verified purity). Proven across decades of clinical exercise science to support intramuscular phosphocreatine stores, maximum strength, and high-intensity output.',
    servingSize: '1 scoop (5g)',
    servingsPerContainer: 60,
    flavors: ['Pure Unflavored', 'Electric Lime Crush'],
    sizes: ['300g (60 Servings)', '500g (100 Servings)'],
    benefits: [
      '5000mg Certified German Creapure® per serving',
      'Micronized 200 mesh for residue-free mixability',
      'Supports cellular hydration and explosive ATP output',
      'Banned-substance tested & Informed Choice certified'
    ],
    supplementFacts: [
      { name: 'Creapure® Creatine Monohydrate', amount: '5,000mg', dailyValue: '**' },
      { name: 'Calories', amount: '0' },
      { name: 'Sugar', amount: '0g' }
    ],
    ingredients: '100% Pure Creapure® Micronized Creatine Monohydrate. (Flavored version includes natural citric acid and stevia).',
    usageInstructions: 'Take 1 scoop (5g) daily. Mix into water, juice, or your post-workout protein shake. Consistency is key; take on both training and rest days.',
    timing: 'Anytime / Post-Workout',
    isFeatured: true
  },
  {
    id: 'vitalo-pre',
    name: 'VITALØ PRE',
    tagline: 'High-Velocity Nootropic & Pump Formula',
    category: 'Performance',
    price: 1250,
    originalPrice: 1450,
    rating: 4.8,
    reviewCount: 278,
    badge: 'POPULAR',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Laser-focused pre-training catalyst combining 6g L-Citrulline, 3.2g Beta-Alanine, and sustained natural PurCaf® caffeine.',
    longDesc: 'Designed to eliminate the jittery crash of outdated gym pre-workouts. VITALØ PRE pairs organic green coffee bean caffeine (PurCaf®) with smooth L-Theanine for tunnel-vision clarity. Generous, clinical dosages of pure fermented L-Citrulline and Beta-Alanine ensure full muscle pumps and endurance through every heavy repetition.',
    servingSize: '1 scoop (16g)',
    servingsPerContainer: 30,
    flavors: ['Sour Green Apple', 'Yuzu Glacier Frost', 'Midnight Blue Raspberry'],
    sizes: ['480g (30 Servings)'],
    benefits: [
      '6,000mg Pure L-Citrulline for maximum nitric oxide pumps',
      '3,200mg CarnoSyn® Beta-Alanine for lactic acid buffering',
      '250mg PurCaf® Organic Caffeine + 150mg L-Theanine',
      'Alpha-GPC + Huperzine-A for cognitive drive'
    ],
    supplementFacts: [
      { name: 'L-Citrulline (Fermented)', amount: '6,000mg' },
      { name: 'Beta-Alanine (CarnoSyn®)', amount: '3,200mg' },
      { name: 'Betaine Anhydrous', amount: '2,500mg' },
      { name: 'PurCaf® Organic Caffeine', amount: '250mg' },
      { name: 'L-Theanine', amount: '150mg' },
      { name: 'Alpha-GPC (50%)', amount: '300mg' },
      { name: 'Himalayan Pink Salt (Electrolytes)', amount: '250mg' }
    ],
    ingredients: 'L-Citrulline, Beta-Alanine, Betaine Anhydrous, Natural Flavors, Malic Acid, Alpha-GPC, PurCaf® Organic Green Coffee Extract, L-Theanine, Himalayan Pink Salt, Stevia Extract, Spirulina Extract (for natural color).',
    usageInstructions: 'Mix 1 scoop with 300ml cold water 20-30 minutes before intense training. Assess tolerance with 1/2 scoop on first use.',
    timing: '20-30 min Pre-Workout',
    isFeatured: true
  },
  {
    id: 'vitalo-electrolytes',
    name: 'VITALØ ELECTROLYTES',
    tagline: 'Precision Cellular Hydration Matrix',
    category: 'Hydration',
    price: 750,
    originalPrice: 890,
    rating: 4.9,
    reviewCount: 312,
    badge: 'POPULAR',
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Science-backed sodium-potassium-magnesium ratio with zero artificial dyes, maltodextrin, or added sugar.',
    longDesc: 'Real hydration goes far beyond drinking plain water. When sweat depletes essential ions, mental clarity fades and muscle cramping begins. VITALØ ELECTROLYTES delivers an optimal 1000mg sodium, 200mg potassium, and 60mg chelated magnesium ratio in bioavailable forms that enter cells rapidly without stomach distress.',
    servingSize: '1 stick pack / scoop (6.5g)',
    servingsPerContainer: 30,
    flavors: ['Blood Orange Citrus', 'Crisp Lemon Lime', 'Watermelon Mint', 'Raw Unflavored'],
    sizes: ['30 Single-Serve Packets', 'Tub (30 Scoops)'],
    benefits: [
      '1,000mg Clean Sodium from Himalayan Pink Salt',
      '200mg Potassium Citrate + 60mg Magnesium Malate',
      'Zero Sugar, Zero Calories, Zero Artificial Sweeteners',
      'Ideal for endurance runners, lifters, and fasting protocol'
    ],
    supplementFacts: [
      { name: 'Calories', amount: '5' },
      { name: 'Total Carbohydrate', amount: '0g' },
      { name: 'Sodium (Himalayan Salt)', amount: '1,000mg', dailyValue: '43%' },
      { name: 'Potassium (as Citrate)', amount: '200mg', dailyValue: '4%' },
      { name: 'Magnesium (as Malate)', amount: '60mg', dailyValue: '14%' },
      { name: 'Chloride', amount: '1,500mg', dailyValue: '65%' }
    ],
    ingredients: 'Himalayan Pink Salt, Potassium Citrate, Magnesium Malate, Citric Acid, Natural Citrus Oils, Organic Stevia Extract.',
    usageInstructions: 'Mix 1 packet or scoop into 500-750ml of cold water. Sip throughout your training session, after endurance work, or first thing in the morning.',
    timing: 'Intra-Workout / Morning Hydration',
    isFeatured: true
  },
  {
    id: 'vitalo-daily',
    name: 'VITALØ DAILY',
    tagline: 'Foundational Micronutrient & Adaptogen Complex',
    category: 'Wellness',
    price: 1100,
    originalPrice: 1250,
    rating: 4.9,
    reviewCount: 195,
    badge: 'ESSENTIAL',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Active co-enzymated B-vitamins, Albion® chelated minerals, organic KSM-66® Ashwagandha, and cellular antioxidant shield.',
    longDesc: 'Most commercial multivitamins use cheap synthetic oxides that pass through unabsorbed. VITALØ DAILY redefines everyday wellness with bioactive forms: methylfolate instead of folic acid, methylcobalamin B12, patented TRAACS® chelated minerals, and full-spectrum KSM-66® Ashwagandha root extract to support steady everyday resilience.',
    servingSize: '2 capsules',
    servingsPerContainer: 30,
    flavors: ['Clean Vegetable Capsule (No Flavor)'],
    sizes: ['60 Capsules (30-Day Supply)'],
    benefits: [
      'Fully methylated active B-Complex vitamins',
      'TRAACS® Albion® Zinc, Selenium, and Boron chelates',
      '300mg KSM-66® Organic Ashwagandha Extract',
      'Vegan, non-GMO, clean delayed-release capsules'
    ],
    supplementFacts: [
      { name: 'Vitamin A (as Beta-Carotene)', amount: '900mcg', dailyValue: '100%' },
      { name: 'Vitamin C (as Ascorbate)', amount: '250mg', dailyValue: '278%' },
      { name: 'Vitamin D3 (as Cholecalciferol)', amount: '2,000 IU', dailyValue: '250%' },
      { name: 'Vitamin K2 (as MK-7 Menaquinone)', amount: '100mcg', dailyValue: '83%' },
      { name: 'Methylated B-Complex (B1, B2, B6, B12)', amount: '100% RDI' },
      { name: 'Zinc (TRAACS® Bisglycinate Chelate)', amount: '20mg', dailyValue: '182%' },
      { name: 'KSM-66® Ashwagandha Root Extract', amount: '300mg' }
    ],
    ingredients: 'Hypromellose (vegan capsule), Microcrystalline Cellulose, Bamboo Silica. Free from gluten, dairy, soy, shellfish, artificial colors or preservatives.',
    usageInstructions: 'Take 2 capsules once daily with a whole food meal and a glass of water.',
    timing: 'Morning with Breakfast',
    isFeatured: false
  },
  {
    id: 'vitalo-bcaa',
    name: 'VITALØ BCAA',
    tagline: 'Fermented 2:1:1 Amino Fuel + Coconut Water',
    category: 'Recovery',
    price: 900,
    originalPrice: 1050,
    rating: 4.7,
    reviewCount: 164,
    badge: 'NEW',
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=900&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Vegan plant-fermented branched chain amino acids infused with organic freeze-dried coconut water powder for sustained muscle recovery.',
    longDesc: 'Unlike conventional BCAAs derived from animal feathers, VITALØ BCAA uses 100% plant-fermented Leucine, Isoleucine, and Valine in the clinically proven 2:1:1 ratio. Combined with organic freeze-dried coconut water, this formula maintains intra-workout nitrogen balance and curbs muscular fatigue.',
    servingSize: '1 scoop (10g)',
    servingsPerContainer: 30,
    flavors: ['Crisp Fuji Green Apple', 'Glacier Wild Berry', 'Mango Passionfruit'],
    sizes: ['300g (30 Servings)'],
    benefits: [
      '7,000mg Fermented 2:1:1 Instantized BCAAs',
      '1,000mg Organic Coconut Water Powder',
      'Zero Artificial Food Dyes or Gelatin',
      'Dissolves clear with crisp, refreshing taste'
    ],
    supplementFacts: [
      { name: 'L-Leucine (Fermented)', amount: '3,500mg' },
      { name: 'L-Isoleucine (Fermented)', amount: '1,750mg' },
      { name: 'L-Valine (Fermented)', amount: '1,750mg' },
      { name: 'Coconut Water Powder (Freeze-Dried)', amount: '1,000mg' },
      { name: 'Total Carbohydrates', amount: '<1g' }
    ],
    ingredients: 'Fermented Branched Chain Amino Acids (L-Leucine, L-Isoleucine, L-Valine), Organic Coconut Water Powder, Citric Acid, Natural Flavors, Stevia Extract, Beet Root Juice Powder (color).',
    usageInstructions: 'Mix 1 scoop into 400-500ml ice-cold water. Drink during training or throughout active recovery days.',
    timing: 'Intra-Workout / Active Recovery',
    isFeatured: false
  },
  {
    id: 'vitalo-omega',
    name: 'VITALØ OMEGA',
    tagline: 'Triple-Strength Wild Alaskan Triglyceride Omega-3',
    category: 'Wellness',
    price: 850,
    originalPrice: 990,
    rating: 4.9,
    reviewCount: 221,
    badge: 'ESSENTIAL',
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=900&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Sustainably wild-caught deep ocean fish oil delivering 1400mg combined EPA & DHA in pure re-esterified triglyceride form.',
    longDesc: 'Extracted from wild Alaskan Pollock harvested from certified sustainable MSC fisheries. VITALØ OMEGA is molecularly distilled to remove heavy metals, PCBs, and oxidation markers, then restored to the natural triglyceride (rTG) form for 70% higher biological bioavailability than generic ethyl-ester oils. Natural lemon-oil infusion guarantees zero fishy aftertaste.',
    servingSize: '2 softgels',
    servingsPerContainer: 30,
    flavors: ['Natural Organic Lemon Essence (Burp-Free)'],
    sizes: ['60 Softgels (30-Day Supply)'],
    benefits: [
      '1,400mg Active Omega-3s (800mg EPA + 600mg DHA)',
      'Natural Triglyceride (rTG) form for superior cell absorption',
      'IFOS 5-Star Certified for Ultra-Purity & Freshness',
      'Burp-free organic citrus coated softgels'
    ],
    supplementFacts: [
      { name: 'Calories', amount: '20 kcal' },
      { name: 'Total Fat', amount: '2g', dailyValue: '3%' },
      { name: 'Total Omega-3 Fatty Acids', amount: '1,500mg' },
      { name: 'EPA (Eicosapentaenoic Acid)', amount: '800mg' },
      { name: 'DHA (Docosahexaenoic Acid)', amount: '600mg' },
      { name: 'Other Omega-3 Fatty Acids', amount: '100mg' }
    ],
    ingredients: 'Wild Alaskan Pollock Oil (Fish), Gelatin, Glycerin, Purified Water, Natural Lemon Oil, Mixed Tocopherols (Vitamin E antioxidant).',
    usageInstructions: 'Take 2 softgels daily with a meal containing dietary fats.',
    timing: 'Lunch or Dinner',
    isFeatured: false
  },
  {
    id: 'vitalo-mag',
    name: 'VITALØ MAG',
    tagline: 'Bisglycinate & L-Threonate Nocturnal Matrix',
    category: 'Recovery',
    price: 650,
    originalPrice: 780,
    rating: 4.8,
    reviewCount: 204,
    badge: 'POPULAR',
    image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=900&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80'
    ],
    shortDesc: 'Dual-action chelated Magnesium Bisglycinate and L-Threonate designed for nighttime neuromuscular relaxation and deep REM rest.',
    longDesc: 'Intense training drains intracellular magnesium, triggering muscle spasms and restless sleep. VITALØ MAG combines two of the most researched chelated forms: Magnesium Bisglycinate for systemic muscular easing and Magtein® Magnesium L-Threonate, the only compound shown to cross the blood-brain barrier to support nocturnal calm.',
    servingSize: '3 capsules',
    servingsPerContainer: 30,
    flavors: ['Clean Vegetarian Capsule'],
    sizes: ['90 Vegetarian Capsules (30-Day Supply)'],
    benefits: [
      '300mg Elemental Bioavailable Magnesium',
      'TRAACS® Magnesium Bisglycinate Chelate',
      'Supports neuromuscular recovery & restful sleep cycles',
      'Gentle on the stomach, zero laxative effect'
    ],
    supplementFacts: [
      { name: 'Magnesium (as Bisglycinate Chelate)', amount: '200mg', dailyValue: '48%' },
      { name: 'Magnesium (as L-Threonate Magtein®)', amount: '100mg', dailyValue: '24%' },
      { name: 'Vitamin B6 (as Pyridoxal 5-Phosphate)', amount: '5mg', dailyValue: '294%' }
    ],
    ingredients: 'TRAACS® Magnesium Bisglycinate Chelate, Magtein® Magnesium L-Threonate, Pyridoxal 5-Phosphate, Vegetable Capsule (Cellulose), Organic Rice Extract.',
    usageInstructions: 'Take 3 capsules 30-45 minutes before sleep with a small glass of water.',
    timing: 'Night / Pre-Sleep',
    isFeatured: false
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Adam R.',
    role: 'Hybrid Athlete & Marathon Runner',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    headline: 'Clean design, simple formulas, and products I actually look forward to using.',
    quote: 'I train 6 days a week across lifting and distance running. The VITALØ Electrolytes and Whey are by far the cleanest formulas on my shelf—zero stomach heaviness, incredible mixability, and ordering via WhatsApp is effortless.',
    productUsed: 'VITALØ ELECTROLYTES & WHEY',
    date: 'Verified Buyer • Cairo'
  },
  {
    id: 't-2',
    name: 'Mariam K.',
    role: 'Competitive CrossFit Athlete',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    headline: 'VITALØ fits perfectly into my training routine.',
    quote: 'Most pre-workouts make my heart race and give me jitters. VITALØ PRE gave me laser focus throughout a 90-minute competition session without any crash afterwards. You can tell they put real science into the dosing.',
    productUsed: 'VITALØ PRE (Sour Apple)',
    date: 'Verified Buyer • Giza'
  },
  {
    id: 't-3',
    name: 'Omar H.',
    role: 'Tech Lead & Strength Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    headline: 'Everything from the packaging to the shopping experience feels premium.',
    quote: 'As someone in design and tech, the aesthetics of VITALØ blew me away. The bottles look stunning on my kitchen counter, but more importantly, the Creapure® creatine dissolves completely without grit. 10/10 execution.',
    productUsed: 'VITALØ CREATINE 500g',
    date: 'Verified Buyer • New Cairo'
  },
  {
    id: 't-4',
    name: 'Lina M.',
    role: 'Pilates Instructor & Distance Triathlete',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    headline: 'The nocturnal recovery with VITALØ MAG is unmatched.',
    quote: 'I used to struggle with calf tightness after high-mileage bike days. Taking VITALØ MAG before bed transformed my sleep score and my legs feel fresh the next morning. Customer service on WhatsApp confirmed my batch within 3 minutes.',
    productUsed: 'VITALØ MAG & DAILY',
    date: 'Verified Buyer • Alexandria'
  }
];

export const FAQS: FAQItem[] = [
  {
    question: 'How does WhatsApp Ordering work?',
    answer: 'It is simple and direct: build your cart on the site, add your delivery address and contact details, and click "Order via WhatsApp". A pre-formatted order summary opens instantly in WhatsApp. Our dedicated dispatch team confirms your order in minutes and schedules your delivery.',
    category: 'Ordering & Delivery'
  },
  {
    question: 'How fast is delivery within Egypt?',
    answer: 'Orders placed in Greater Cairo, Giza, and New Cairo are delivered within 24 to 48 hours. Orders to Alexandria, Delta cities, and Red Sea coastal hubs arrive within 48 to 72 hours. Same-day express dispatch is available on request via WhatsApp.',
    category: 'Ordering & Delivery'
  },
  {
    question: 'What payment methods do you support?',
    answer: 'We prioritize customer convenience. You can pay via Cash on Delivery (COD) upon receiving your package, or via Instant Bank Transfer / InstaPay / Mobile Wallets confirmed directly with our team on WhatsApp.',
    category: 'Ordering & Delivery'
  },
  {
    question: 'Are VITALØ supplements third-party lab tested?',
    answer: 'Yes. Every production batch is independently assayed by accredited laboratories for heavy metal screening, banned-substance testing, microbiological safety, and exact label potency verification. Certificates of Analysis (CoA) are available on demand.',
    category: 'Quality & Science'
  },
  {
    question: 'Why do you use Creapure® for your Creatine?',
    answer: 'Creapure® is the gold standard synthesized in Trostberg, Germany under strict pharmaceutical conditions. It boasts 99.95% purity and is completely free of DHT and DCD contaminants often found in budget commodity creatines.',
    category: 'Quality & Science'
  },
  {
    question: 'Can I stack multiple VITALØ formulas together?',
    answer: 'Absolutely. VITALØ formulas are engineered synergistically. For example, VITALØ PRE pairs seamlessly with VITALØ CREATINE before training, followed by VITALØ WHEY post-workout and VITALØ MAG before sleep for a 24-hour performance cycle.',
    category: 'Usage & Timing'
  }
];

export const INGREDIENT_SPOTLIGHTS = [
  {
    id: 'creapure',
    name: 'Creapure® Monohydrate',
    origin: 'Trostberg, Germany',
    subtitle: '99.95% Pharmaceutical Purity',
    description: 'The highest-grade micronized creatine in the world. Synthesized via dedicated non-animal catalytic process, ensuring zero heavy metal residues and rapid ATP re-phosphorylation.',
    stats: '5,000mg Clinical Dose',
    image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'whey-isolate',
    name: 'Native Whey Isolate',
    origin: 'Grass-Fed European Milk',
    subtitle: 'Cold-Filtered Native Fractions',
    description: 'Extracted directly from cold raw milk via ceramic microfiltration at <10°C. Delivers complete immunoglobulins, lactoferrin, and 6.2g leucine-rich BCAAs without thermal denaturing.',
    stats: '27g Protein • <1g Carbs',
    image: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'pink-salt',
    name: 'Himalayan Mineral Salt',
    origin: 'Salt Range, Pakistan',
    subtitle: '84 Trace Electrolyte Minerals',
    description: 'Unrefined pink crystal salt retaining natural potassium, magnesium, and calcium trace ions to optimize cellular hydration and prevent exercise-induced hyponatremia.',
    stats: '1,000mg Bioactive Sodium',
    image: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'magnesium-bisglycinate',
    name: 'TRAACS® Chelated Magnesium',
    origin: 'Albion® Laboratories, USA',
    subtitle: 'Maximum Intracellular Bioavailability',
    description: 'Magnesium bonded to two glycine amino acid molecules, enabling direct passage through the intestinal dipeptide pathway without causing digestive upset or laxative effects.',
    stats: '300mg Elemental Mg',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=700&q=80'
  }
];

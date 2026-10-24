import type { ImageSourcePropType } from 'react-native';

export type ColorVariant = {
  id: string;
  name: string;
  /** Swatch colour shown in pickers. */
  color: string;
  image: ImageSourcePropType;
};

export type Category = 'Popular' | 'Men' | 'Women' | 'Trail' | 'Formal' | 'New';

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  rating: number;
  reviews: number;
  description: string;
  categories: Category[];
  variants: ColorVariant[];
  sizes: number[];
};

const img = {
  chelsea: require('../../assets/shoes/shoe-01.webp'),
  longwing: require('../../assets/shoes/shoe-02.webp'),
  monk: require('../../assets/shoes/shoe-03.webp'),
  suedeDerby: require('../../assets/shoes/shoe-04.webp'),
  courtNavy: require('../../assets/shoes/shoe-05.webp'),
  workBoot: require('../../assets/shoes/shoe-06.webp'),
  capToe: require('../../assets/shoes/shoe-07.webp'),
  wingtip: require('../../assets/shoes/shoe-08.webp'),
  lowGreySky: require('../../assets/shoes/shoe-09.webp'),
  runnerBlue: require('../../assets/shoes/shoe-10.webp'),
  hiTopGreen: require('../../assets/shoes/shoe-11.webp'),
  trailMocha: require('../../assets/shoes/shoe-12.webp'),
  courtGreen: require('../../assets/shoes/shoe-13.webp'),
  suedeSkate: require('../../assets/shoes/shoe-14.webp'),
  courtGrey: require('../../assets/shoes/shoe-15.webp'),
  lowWhite: require('../../assets/shoes/shoe-16.webp'),
  chunkyGrey: require('../../assets/shoes/shoe-17.webp'),
  blazeRed: require('../../assets/shoes/shoe-18.webp'),
  milano: require('../../assets/shoes/shoe-19.webp'),
  lowBlackGrey: require('../../assets/shoes/shoe-20.webp'),
  chunkyNavy: require('../../assets/shoes/shoe-21.webp'),
};

const v = (id: string, name: string, color: string, image: ImageSourcePropType): ColorVariant => ({ id, name, color, image });
const SNEAKER_SIZES = [7, 7.5, 8, 8.5, 9, 9.5, 10];
const DRESS_SIZES = SNEAKER_SIZES;

export const products: Product[] = [
  {
    id: 'velocity-boost',
    name: 'Velocity Boost 2.0',
    subtitle: "Men's Performance Shoes",
    price: 159.99,
    rating: 4.8,
    reviews: 128,
    description:
      'Built for speed and endurance. A sculpted foam midsole and supportive cage deliver superior cushioning, breathability and lockdown for every stride.',
    categories: ['Popular', 'Men', 'New'],
    variants: [v('green', 'Emerald / White', '#1E8A4C', img.hiTopGreen)],
    sizes: SNEAKER_SIZES,
  },
  {
    id: 'court-480',
    name: 'Court 480 Low',
    subtitle: 'Unisex Lifestyle Sneakers',
    price: 129.99,
    rating: 4.7,
    reviews: 214,
    description:
      'A heritage basketball silhouette with premium suede overlays, perforated toe box and a cushioned cupsole for all-day comfort.',
    categories: ['Popular', 'Men', 'Women'],
    variants: [
      v('navy', 'Navy / Cream', '#1F2D5A', img.courtNavy),
      v('green', 'Forest / Cream', '#1F5A43', img.courtGreen),
      v('grey', 'Castle Grey', '#6E6E70', img.courtGrey),
    ],
    sizes: SNEAKER_SIZES,
  },
  {
    id: 'court-one',
    name: 'Court One Low',
    subtitle: 'Unisex Classic Sneakers',
    price: 119.99,
    rating: 4.9,
    reviews: 342,
    description: 'The everyday icon. Crisp leather upper, a timeless low-cut profile and a durable rubber cupsole that goes with everything.',
    categories: ['Popular', 'Men', 'Women'],
    variants: [
      v('white', 'Triple White', '#F2F2F2', img.lowWhite),
      v('black', 'Black / Wolf Grey', '#222222', img.lowBlackGrey),
      v('grey', 'Grey / Sky', '#8A8D90', img.lowGreySky),
    ],
    sizes: SNEAKER_SIZES,
  },
  {
    id: 'aero-stride',
    name: 'Aero Stride',
    subtitle: "Men's Running Shoes",
    price: 139.99,
    rating: 4.6,
    reviews: 96,
    description: 'Featherlight engineered mesh, a visible air unit in the heel and a bouncy midsole make Aero Stride perfect for daily miles.',
    categories: ['Men', 'New'],
    variants: [v('blue', 'White / Royal', '#2B3F7A', img.runnerBlue)],
    sizes: SNEAKER_SIZES,
  },
  {
    id: 'cloud-chunky',
    name: 'Cloud Chunky',
    subtitle: "Women's Platform Sneakers",
    price: 99.99,
    rating: 4.5,
    reviews: 77,
    description: 'Statement-making sculpted platform sole with a soft, padded collar. Lightweight enough to wear from morning to night.',
    categories: ['Women', 'Popular'],
    variants: [v('navy', 'White / Navy', '#24345C', img.chunkyNavy), v('grey', 'White / Graphite', '#5C5F63', img.chunkyGrey)],
    sizes: SNEAKER_SIZES,
  },
  {
    id: 'blaze-sport',
    name: 'Blaze Sport',
    subtitle: "Women's Training Shoes",
    price: 89.99,
    rating: 4.4,
    reviews: 58,
    description: 'Breathable knit, a supportive heel wrap and a responsive rocker sole designed for gym sessions, HIIT and court play.',
    categories: ['Women', 'New'],
    variants: [v('red', 'White / Fire Red', '#E0262B', img.blazeRed)],
    sizes: SNEAKER_SIZES,
  },
  {
    id: 'milano-runner',
    name: 'Milano Runner',
    subtitle: "Women's Luxury Sneakers",
    price: 219.99,
    rating: 4.7,
    reviews: 41,
    description: 'Italian-inspired runner with smooth nylon panels, suede overlays and a studded lug outsole for a bold, elevated look.',
    categories: ['Women', 'New'],
    variants: [v('white', 'White / Black / Rust', '#C2562A', img.milano)],
    sizes: SNEAKER_SIZES,
  },
  {
    id: 'trail-vapor',
    name: 'Trail Vapor',
    subtitle: 'Unisex Trail Runners',
    price: 149.99,
    rating: 4.8,
    reviews: 65,
    description: 'Layered mesh and suede with a grippy multi-surface outsole — ready for city streets and dirt paths alike.',
    categories: ['Trail', 'Men', 'Women', 'Popular'],
    variants: [v('mocha', 'Mocha / Sand', '#5A3E2B', img.trailMocha)],
    sizes: SNEAKER_SIZES,
  },
  {
    id: 'street-suede',
    name: 'Street Suede',
    subtitle: 'Unisex Skate Sneakers',
    price: 134.99,
    rating: 4.6,
    reviews: 33,
    description: 'Brushed suede upper, chunky rope laces and a cupsole with a contrast gum tread for a street-ready silhouette.',
    categories: ['Men', 'Women', 'New'],
    variants: [v('charcoal', 'Charcoal / Sand', '#2F3A3F', img.suedeSkate)],
    sizes: SNEAKER_SIZES,
  },
  {
    id: 'summit-boot',
    name: 'Summit Work Boot',
    subtitle: "Men's 6-Inch Boots",
    price: 189.99,
    rating: 4.9,
    reviews: 402,
    description: 'Waterproof nubuck leather, padded collar and a rugged lug sole. Built to handle the trail, the worksite and the weekend.',
    categories: ['Trail', 'Men', 'Popular'],
    variants: [v('wheat', 'Wheat Nubuck', '#C9852F', img.workBoot)],
    sizes: DRESS_SIZES,
  },
  {
    id: 'heritage-chelsea',
    name: 'Heritage Chelsea',
    subtitle: "Men's Chelsea Boots",
    price: 169.99,
    rating: 4.7,
    reviews: 88,
    description: 'Polished calf leather, elastic side gussets and a pull tab for easy on/off. Sharp with suits, sharper with denim.',
    categories: ['Formal', 'Men'],
    variants: [v('brown', 'Chestnut Brown', '#6B3420', img.chelsea)],
    sizes: DRESS_SIZES,
  },
  {
    id: 'longwing-brogue',
    name: 'Longwing Brogue',
    subtitle: "Men's Derby Shoes",
    price: 249.99,
    rating: 4.9,
    reviews: 52,
    description: 'Goodyear-welted longwing derby with full brogue detailing, hand-finished in rich tan calf leather.',
    categories: ['Formal', 'Men'],
    variants: [v('tan', 'Tan Calf', '#9A5A2E', img.longwing)],
    sizes: DRESS_SIZES,
  },
  {
    id: 'cap-toe-oxford',
    name: 'Cap Toe Oxford',
    subtitle: "Men's Dress Shoes",
    price: 199.99,
    rating: 4.8,
    reviews: 119,
    description: 'The essential dress shoe — burnished leather, a clean cap toe and closed lacing for a refined, formal finish.',
    categories: ['Formal', 'Men', 'Popular'],
    variants: [v('cognac', 'Cognac', '#A0522D', img.capToe)],
    sizes: DRESS_SIZES,
  },
  {
    id: 'wingtip-oxford',
    name: 'Wingtip Oxford',
    subtitle: "Men's Dress Shoes",
    price: 229.99,
    rating: 4.7,
    reviews: 47,
    description: 'Hand-patinated leather that fades from tan to deep burgundy, with delicate medallion and wingtip perforations.',
    categories: ['Formal', 'Men', 'New'],
    variants: [v('burnished', 'Burnished Tan', '#8B3A1E', img.wingtip)],
    sizes: DRESS_SIZES,
  },
  {
    id: 'buckle-monk',
    name: 'Buckle Monk',
    subtitle: 'Unisex Platform Loafers',
    price: 209.99,
    rating: 4.6,
    reviews: 29,
    description: 'A single-strap monk with a gold-tone buckle on a lightweight, layered platform sole. Modern tailoring, made comfortable.',
    categories: ['Formal', 'Women', 'Men'],
    variants: [v('caramel', 'Caramel', '#B9732F', img.monk)],
    sizes: DRESS_SIZES,
  },
  {
    id: 'suede-derby',
    name: 'Suede Derby',
    subtitle: "Men's Casual Shoes",
    price: 109.99,
    rating: 4.5,
    reviews: 64,
    description: 'Soft black suede, a contrast stitched welt and a stacked heel — smart enough for the office, relaxed enough for the weekend.',
    categories: ['Formal', 'Men'],
    variants: [v('black', 'Black Suede', '#151515', img.suedeDerby)],
    sizes: DRESS_SIZES,
  },
];

/** Category tabs on the home screen (matches the design). */
export const homeCategories: Category[] = ['Popular', 'Men', 'Women', 'Trail', 'New'];
/** Filters on the shop screen. */
export const categories: Category[] = ['Popular', 'Men', 'Women', 'Trail', 'Formal', 'New'];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatPrice = (n: number) => `$${n.toFixed(2)}`;

import { StoreLocation, Review } from '../types';

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: 'flagship-downtown',
    name: 'BUN N BLAZE — DOWNTOWN FLAGSHIP',
    area: 'Downtown Metro Arts Hub',
    address: '404 Neon Boulevard, District 7',
    hours: '11:00 AM – 3:00 AM Daily',
    phone: '+1 (800) 555-BLAZE',
    status: 'OPEN LATE • DINE-IN & PICKUP',
    tag: 'FLAGSHIP GRILL',
    latLng: '40.7128° N, 74.0060° W'
  },
  {
    id: 'street-district',
    name: 'BLAZE EXPRESS & DRIVE-THRU',
    area: 'Westside Terminal Arcade',
    address: '89 Westside Expressway, Suite B',
    hours: '10:30 AM – 2:00 AM Daily',
    phone: '+1 (800) 555-2529',
    status: '24/7 DRIVE-THRU',
    tag: 'DRIVE-THRU & DELIVERY',
    latLng: '40.7306° N, 73.9352° W'
  },
  {
    id: 'arts-underground',
    name: 'UNDERGROUND SMASH LAB',
    area: 'Industrial Arts Yard',
    address: '12 Warehouse Row, Dock 4',
    hours: '12:00 PM – 1:00 AM (Closed Mon)',
    phone: '+1 (800) 555-3473',
    status: 'SECRET RECIPE LAB',
    tag: 'LIMITED DROPS',
    latLng: '40.7589° N, 73.9851° W'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'MARCUS V.',
    handle: '@marcus_eats_nyc',
    rating: 5,
    quote: 'Possibly the messiest, most violently flavorful smash burger on the planet. The crispy lace edges on the Double Inferno are genuine sorcery.',
    favoriteItem: 'Double Inferno Burger',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'ELENA ROSTOVA',
    handle: '@elena.fooddiaries',
    rating: 5,
    quote: 'That Blaze Sauce has a chokehold on my entire friend group. And the loaded crinkle fries? Arrived steaming hot and ridiculously crunchy.',
    favoriteItem: 'Loaded Blaze Fries',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'KAI CHEN',
    handle: '@streetbites_kai',
    rating: 5,
    quote: 'Finally, a burger brand that actually delivers what their photos look like. Street food soul with five-star kitchen execution.',
    favoriteItem: 'Fire Chicken Crunch',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'SARAH JENNINGS',
    handle: '@theburgerreport',
    rating: 5,
    quote: 'The toasted marshmallow shake after the ghost chili wings is an elite high-low culinary combo. Bun n Blaze never misses.',
    favoriteItem: 'Toasted S’mores Shake',
    verified: true
  }
];

export const SOCIAL_FEED_PHOTOS = [
  {
    image: '/assets/double_inferno.jpg',
    tag: '#BUNNBLAZE',
    caption: 'Lace edges crisped to mathematical perfection. 🔥',
    likes: '4.8k'
  },
  {
    image: '/assets/fire_chicken.jpg',
    tag: '#HEATCHECK',
    caption: 'Buttermilk fried crunch that echoes across the block.',
    likes: '3.2k'
  },
  {
    image: '/assets/loaded_fries.jpg',
    tag: '#LAVACHEESE',
    caption: 'Molten cheddar + smoky bacon bits. No fork needed.',
    likes: '5.6k'
  },
  {
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    tag: '#BLAZEDROPS',
    caption: 'Street box ready for midnight runs. 🏎️💨',
    likes: '6.1k'
  },
  {
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    tag: '#SMOKESTACK',
    caption: 'Charred brioche, aged gouda drip, zero apologies.',
    likes: '4.1k'
  },
  {
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    tag: '#FIREANDICE',
    caption: 'Torched marshmallow topper to extinguish the inferno.',
    likes: '7.9k'
  }
];

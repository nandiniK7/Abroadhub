// Mock data for development. Replaced by the real AbroadHub API adapter later.
// This file must NEVER be imported directly by UI components.

const AVATAR = (seed) => `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}`;
const IMG = (id, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const currentUser = {
  id: 'u_me',
  name: 'Alex Rivera',
  handle: '@alex.abroad',
  avatar: AVATAR('alex'),
  city: 'Lisbon, Portugal',
  bio: 'Digital nomad · Building AbroadHub · Coffee, code, coastlines.',
  followers: 1284,
  following: 342,
  postsCount: 47,
};

export const stories = [
  { id: 's_me', user: currentUser, isMe: true, seen: false },
  { id: 's1', user: { id: 'u1', name: 'Priya', avatar: AVATAR('priya') }, seen: false },
  { id: 's2', user: { id: 'u2', name: 'Kenji', avatar: AVATAR('kenji') }, seen: false },
  { id: 's3', user: { id: 'u3', name: 'Amina', avatar: AVATAR('amina') }, seen: true },
  { id: 's4', user: { id: 'u4', name: 'Luca', avatar: AVATAR('luca') }, seen: false },
  { id: 's5', user: { id: 'u5', name: 'Sara', avatar: AVATAR('sara') }, seen: true },
  { id: 's6', user: { id: 'u6', name: 'Diego', avatar: AVATAR('diego') }, seen: false },
];

export const posts = [
  {
    id: 'p1',
    author: { id: 'u1', name: 'Priya Sharma', avatar: AVATAR('priya'), city: 'Berlin' },
    createdAt: '2h',
    text: "Just landed in Berlin! Any AbroadHub folks up for coffee in Mitte this weekend? ☕",
    images: [IMG('1587330979470-3016b6702d89')],
    likes: 128,
    comments: 24,
    liked: false,
  },
  {
    id: 'p2',
    author: { id: 'u2', name: 'Kenji Watanabe', avatar: AVATAR('kenji'), city: 'Barcelona' },
    createdAt: '5h',
    text: 'Found the sweetest co-working spot with a rooftop view. DM me if you want the address 👀',
    images: [IMG('1523987355523-c7b5b0dd90a7')],
    likes: 342,
    comments: 41,
    liked: true,
  },
  {
    id: 'p3',
    author: { id: 'u3', name: 'Amina Al-Farsi', avatar: AVATAR('amina'), city: 'Dubai' },
    createdAt: '1d',
    text: 'Looking for a Portuguese language exchange partner in Lisbon. I can help with Arabic!',
    images: [],
    likes: 76,
    comments: 12,
    liked: false,
  },
  {
    id: 'p4',
    author: { id: 'u4', name: 'Luca Bianchi', avatar: AVATAR('luca'), city: 'Lisbon' },
    createdAt: '1d',
    text: 'Sunset run along the Tagus. This city keeps giving 🌅',
    images: [IMG('1560179707-f14e90ef3623')],
    likes: 512,
    comments: 63,
    liked: false,
  },
];

export const explore = [
  { id: 'e1', img: IMG('1502602898657-3e91760cbb34', 600, 800), title: 'Paris nights', h: 320 },
  { id: 'e2', img: IMG('1520250497591-112f2f40a3f4', 600, 500), title: 'Tokyo alleys', h: 220 },
  { id: 'e3', img: IMG('1523731407965-2430cd12f5e4', 600, 700), title: 'Barcelona rooftops', h: 280 },
  { id: 'e4', img: IMG('1533929736458-ca588d08c8be', 600, 400), title: 'Lisbon views', h: 180 },
  { id: 'e5', img: IMG('1502602898657-3e91760cbb34', 600, 600), title: 'Dubai skyline', h: 260 },
  { id: 'e6', img: IMG('1477959858617-67f85cf4f1df', 600, 800), title: 'Berlin summer', h: 320 },
  { id: 'e7', img: IMG('1519677100203-a0e668c92439', 600, 500), title: 'Bali beaches', h: 220 },
  { id: 'e8', img: IMG('1533105079780-92b9be482077', 600, 700), title: 'Amsterdam canals', h: 280 },
  { id: 'e9', img: IMG('1526129318478-62ed807ebdf9', 600, 400), title: 'NYC weekends', h: 180 },
  { id: 'e10', img: IMG('1502602898657-3e91760cbb34', 600, 700), title: 'Cape Town', h: 300 },
];

export const jobs = [
  {
    id: 'j1',
    title: 'Senior Product Designer',
    company: 'Northwind Studio',
    logo: AVATAR('northwind'),
    city: 'Berlin, Germany',
    type: 'Full-time',
    remote: 'Hybrid',
    salary: '€75k – €95k',
    postedAt: '2d ago',
    tags: ['Design', 'Figma', 'Product'],
    saved: false,
  },
  {
    id: 'j2',
    title: 'React Native Engineer',
    company: 'Nomadly',
    logo: AVATAR('nomadly'),
    city: 'Lisbon, Portugal',
    type: 'Contract',
    remote: 'Remote',
    salary: '$60 – $80 / hr',
    postedAt: '4d ago',
    tags: ['React Native', 'Mobile', 'TypeScript'],
    saved: true,
  },
  {
    id: 'j3',
    title: 'Community Manager',
    company: 'AbroadHub',
    logo: AVATAR('abroadhub'),
    city: 'Remote — EU',
    type: 'Full-time',
    remote: 'Remote',
    salary: '€45k – €55k',
    postedAt: '1w ago',
    tags: ['Community', 'Social', 'Events'],
    saved: false,
  },
  {
    id: 'j4',
    title: 'Growth Marketing Lead',
    company: 'Kite & Co.',
    logo: AVATAR('kiteco'),
    city: 'Barcelona, Spain',
    type: 'Full-time',
    remote: 'On-site',
    salary: '€65k – €80k',
    postedAt: '1w ago',
    tags: ['Growth', 'SEO', 'Paid'],
    saved: false,
  },
];

export const jobFilters = ['All', 'Remote', 'Full-time', 'Contract', 'Design', 'Engineering', 'Marketing'];

export const nearbyCategories = [
  { id: 'c1', name: 'Restaurants', icon: 'UtensilsCrossed' },
  { id: 'c2', name: 'Cafés', icon: 'Coffee' },
  { id: 'c3', name: 'Gyms', icon: 'Dumbbell' },
  { id: 'c4', name: 'Salons', icon: 'Scissors' },
  { id: 'c5', name: 'Clinics', icon: 'Stethoscope' },
  { id: 'c6', name: 'Groceries', icon: 'ShoppingBasket' },
  { id: 'c7', name: 'Housing', icon: 'Home' },
  { id: 'c8', name: 'Events', icon: 'CalendarDays' },
];

export const popularServices = [
  {
    id: 'sv1',
    name: 'Sunset Yoga Studio',
    category: 'Wellness',
    rating: 4.9,
    reviews: 214,
    distance: '0.8 km',
    img: IMG('1544367567-0f2fcb009e0b', 600, 400),
  },
  {
    id: 'sv2',
    name: 'Café das Flores',
    category: 'Café',
    rating: 4.7,
    reviews: 312,
    distance: '1.2 km',
    img: IMG('1554118811-1e0d58224f24', 600, 400),
  },
  {
    id: 'sv3',
    name: 'Nomad Coworking',
    category: 'Coworking',
    rating: 4.8,
    reviews: 128,
    distance: '2.4 km',
    img: IMG('1497366216548-37526070297c', 600, 400),
  },
  {
    id: 'sv4',
    name: 'Barbearia Lisboa',
    category: 'Salon',
    rating: 4.6,
    reviews: 89,
    distance: '3.1 km',
    img: IMG('1585747860715-2ba37e788b70', 600, 400),
  },
];

export const profilePhotos = [
  IMG('1502602898657-3e91760cbb34', 400, 400),
  IMG('1523987355523-c7b5b0dd90a7', 400, 400),
  IMG('1533929736458-ca588d08c8be', 400, 400),
  IMG('1560179707-f14e90ef3623', 400, 400),
  IMG('1520250497591-112f2f40a3f4', 400, 400),
  IMG('1526129318478-62ed807ebdf9', 400, 400),
];

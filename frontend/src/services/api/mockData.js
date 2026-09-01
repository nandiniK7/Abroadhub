// Mock data. Never imported by UI components; UI only sees this through the adapter.

const AVATAR = (seed) => `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}`;
const IMG = (id, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const currentUser = {
  id: 'u_me',
  name: 'Aarav Lens',
  handle: '@aaravcaptures',
  avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&h=400&q=80',
  category: 'Photographer',
  rating: 4.5,
  ratingsCount: '120+',
  city: 'London, UK',
  bio: 'Capturing stories through portraits,\ntravel, and street photography.\nAvailable for freelance shoots.',
  website: 'aaravlens.co',
  phone: '+44 000 000',
  followers: '1M',
  following: '1000',
  postsCount: 47,
  verified: true,
};

export const stories = [
  { id: 's_me', user: currentUser, isMe: true, seen: false },
  { id: 's1', user: { id: 'u1', name: 'Elena R.', avatar: IMG('1544005313-94ddf0286df2', 200, 200) }, seen: false },
  { id: 's2', user: { id: 'u2', name: 'Mateo S.', avatar: IMG('1500648767791-00dcc994a43e', 200, 200) }, seen: false },
  { id: 's3', user: { id: 'u3', name: 'Hana P.', avatar: IMG('1489424731084-a5d8b219a5bb', 200, 200) }, live: true, seen: false },
  { id: 's4', user: { id: 'u4', name: 'Omar N.', avatar: IMG('1507003211169-0a1dd7228f2d', 200, 200) }, seen: false },
  { id: 's5', user: { id: 'u5', name: 'Tessa M.', avatar: IMG('1524504388940-b1c1722653e1', 200, 200) }, seen: false },
];

export const posts = [
  {
    id: 'p1',
    author: {
      id: 'u1', name: 'Elena Rossi', handle: '@elenarossi',
      avatar: IMG('1544005313-94ddf0286df2', 200, 200),
      verified: true,
    },
    tags: ['students', 'nearby'],
    text: 'Sunset walks, new friends, and endless conversations.\nGrateful for this amazing community!',
    images: [IMG('1529156069898-49953e39b3ac', 900, 500)],
    createdAt: '1 Hour',
    likes: 28, comments: 3, shares: 6, liked: false,
  },
  {
    id: 'p2',
    author: {
      id: 'u2', name: 'Mateo Silva', handle: '@mateosilva',
      avatar: IMG('1500648767791-00dcc994a43e', 200, 200),
      verified: true,
    },
    tags: ['jobs', 'community'],
    text: "Exploring new cities and opportunities.\nLet's grow together and help each other out!",
    images: [IMG('1521737604893-d14cc237f11d', 900, 500)],
    createdAt: '3 Hours',
    likes: 41, comments: 7, shares: 9, liked: false,
  },
  {
    id: 'p3',
    author: {
      id: 'u3', name: 'Hana Park', handle: '@hanapark',
      avatar: IMG('1489424731084-a5d8b219a5bb', 200, 200),
      verified: true,
    },
    tags: ['events', 'nearby'],
    text: "Weekend market adventures & good coffee.\nWho's joining the next meetup?",
    images: [IMG('1533777857889-4be7c70b33f7', 900, 500)],
    createdAt: '5 Hours',
    likes: 36, comments: 5, shares: 8, liked: false,
  },
  {
    id: 'p4',
    author: {
      id: 'u4', name: 'Omar Naji', handle: '@omarnaji',
      avatar: IMG('1507003211169-0a1dd7228f2d', 200, 200),
      verified: true,
    },
    tags: ['students', 'community'],
    text: 'Just landed in a new city!\nExcited to meet people and build connections.',
    images: [],
    createdAt: '7 Hours',
    likes: 22, comments: 4, shares: 3, liked: false,
  },
];

// Explore masonry
export const explore = [
  { id: 'e1', img: IMG('1502602898657-3e91760cbb34', 600, 800), title: 'Paris', h: 320 },
  { id: 'e2', img: IMG('1520250497591-112f2f40a3f4', 600, 500), title: 'Tokyo', h: 220 },
  { id: 'e3', img: IMG('1523731407965-2430cd12f5e4', 600, 700), title: 'Barcelona', h: 280 },
  { id: 'e4', img: IMG('1533929736458-ca588d08c8be', 600, 400), title: 'Lisbon', h: 180 },
  { id: 'e5', img: IMG('1502602898657-3e91760cbb34', 600, 600), title: 'Dubai', h: 260 },
  { id: 'e6', img: IMG('1477959858617-67f85cf4f1df', 600, 800), title: 'Berlin', h: 320 },
  { id: 'e7', img: IMG('1519677100203-a0e668c92439', 600, 500), title: 'Bali', h: 220 },
  { id: 'e8', img: IMG('1533105079780-92b9be482077', 600, 700), title: 'Amsterdam', h: 280 },
  { id: 'e9', img: IMG('1526129318478-62ed807ebdf9', 600, 400), title: 'NYC', h: 180 },
];

// Jobs
export const jobs = [
  {
    id: 'j1',
    title: 'Software Engineer',
    company: 'TechCore Solutions',
    cover: IMG('1517694712202-14dd9538aa97', 400, 500),
    type: 'Full Time',
    salary: '$ 85K – $110K/yr',
    location: 'Texas, Dallas',
    description: 'Build and maintain scalable web applications. 2+ years of experience in Python, React, and SQL.',
    saved: false,
  },
  {
    id: 'j2',
    title: 'South Indian Chef',
    company: 'Spice Route Kitchen',
    cover: IMG('1577219491135-ce391730fb2c', 400, 500),
    type: 'Full Time',
    salary: '$ 18 – $24/Hr',
    location: 'Texas, Dallas',
    description: 'Prepare authentic South Indian dishes. 2+ years of experience in restaurant kitchen.',
    saved: false,
  },
  {
    id: 'j3',
    title: 'Cashier',
    company: 'SuperMart USA',
    cover: IMG('1601599963565-b7f49deb0ec5', 400, 500),
    type: 'Part Time',
    salary: '$ 14 – $17/Hr',
    location: 'Texas, Dallas',
    description: 'Handle cash transactions and provide excellent customer service.',
    saved: false,
  },
  {
    id: 'j4',
    title: 'UI/UX Designer',
    company: 'Creative Pixel Studio',
    cover: IMG('1573496359142-b8d87734a5a2', 400, 500),
    type: 'Full Time',
    salary: '$ 65K – $85K/yr',
    location: 'Texas, Dallas',
    description: 'Design intuitive user experiences and beautiful interfaces. Proficient in Figma and Adobe XD.',
    saved: false,
  },
  {
    id: 'j5',
    title: 'Customer Support Associate',
    company: 'Global Connect',
    cover: IMG('1560250097-0b93528c311a', 400, 500),
    type: 'Contract',
    salary: '$ 16 – $20/Hr',
    location: 'Texas, Dallas',
    description: 'Assist customers via chat, email, and phone. Great communication skills required.',
    saved: false,
  },
];

// Nearby — categories are photo tiles matching the mobile screenshot
export const nearbyCategories = [
  { id: 'c1', name: 'Photographer',       img: IMG('1502920917128-1aa500764cbd', 300, 300) },
  { id: 'c2', name: 'Makeup Artist',      img: IMG('1522337360788-8b13dee7a37e', 300, 300) },
  { id: 'c3', name: 'DJ (Disc Jockey)',   img: IMG('1516280440614-37939bbacd81', 300, 300) },
  { id: 'c4', name: 'Catering Services',  img: IMG('1555244162-803834f70033', 300, 300) },
  { id: 'c5', name: 'Event Organiser',    img: IMG('1519741497674-611481863552', 300, 300) },
  { id: 'c6', name: 'Yoga Instructor',    img: IMG('1544367567-0f2fcb009e0b', 300, 300) },
  { id: 'c7', name: 'Legal Services',     img: IMG('1505664194779-8beaceb93744', 300, 300) },
  { id: 'c8', name: 'Tax Filing',         img: IMG('1554224155-6726b3ff858f', 300, 300) },
  { id: 'c9', name: 'Fashion',            img: IMG('1490481651871-ab68de25d43d', 300, 300) },
  { id: 'c10', name: 'Immigration Services', img: IMG('1569098644584-210bcd375b59', 300, 300) },
  { id: 'c11', name: 'Video Editing',     img: IMG('1574717024653-61fd2cf4d44d', 300, 300) },
];

export const popularServices = [
  { id: 'sv1', name: '', img: IMG('1514933651103-005eec06c04b', 600, 400), likes: '150+' },
  { id: 'sv2', name: 'Rossopom',  img: IMG('1543007630-9710e4a00a20', 600, 400), likes: '98'  },
  { id: 'sv3', name: '',          img: IMG('1497366216548-37526070297c', 600, 400), likes: '212' },
  { id: 'sv4', name: '',          img: IMG('1554118811-1e0d58224f24', 600, 400), likes: '76'  },
];

export const profilePhotos = [
  IMG('1502602898657-3e91760cbb34', 400, 400),
  IMG('1523987355523-c7b5b0dd90a7', 400, 400),
  IMG('1533929736458-ca588d08c8be', 400, 400),
  IMG('1560179707-f14e90ef3623', 400, 400),
  IMG('1520250497591-112f2f40a3f4', 400, 400),
  IMG('1526129318478-62ed807ebdf9', 400, 400),
];

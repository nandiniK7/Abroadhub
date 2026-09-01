// Mock data matching the reference PDF (Jobs In Atlanta, India Festival, etc).

const AVATAR = (seed) => `https://api.dicebear.com/9.x/thumbs/svg?seed=${seed}`;
const GRAD = (seed) => `https://api.dicebear.com/9.x/shapes/svg?seed=${seed}`;
const IMG = (id, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const currentUser = {
  id: 'u_me',
  name: 'Jobs In Atlanta',
  username: 'jobsinatlanta',
  handle: '@jobsinatlanta',
  avatar: IMG('1503917988258-f87a78e3c995', 300, 300),
  email: 'nandinikasiraju@gmail.com',
  phone: '7013317647',
  country: 'India',
  gender: 'Female',
  bio: '',
  website: '',
  occupation: '',
  languages: ['English', 'Telugu', 'Hindi'],
  followers: 0,
  following: 0,
  postsCount: 3,
  privateAccount: true,
};

// Only one story in the reference — the user's own "Abroad Hub" with a + Add Story bubble.
export const stories = [
  { id: 's_me', user: { id: 'brand', name: 'Abroad Hub', avatar: IMG('1503917988258-f87a78e3c995', 300, 300) }, isMe: true, seen: false },
];

export const posts = [
  {
    id: 'p1',
    author: {
      id: 'u_me', name: 'Jobs In Atlanta', handle: '@jobsinatlanta',
      avatar: IMG('1503917988258-f87a78e3c995', 300, 300), verified: false, mine: true,
    },
    text: "Join the Atlanta India Festival 2026 for a vibrant celebration of India's rich culture, heritage & diversity.",
    images: [IMG('1517457373958-b7bdd4587205', 900, 700)],
    createdAt: '13 days ago',
    likes: 0, comments: 0, shares: 0, liked: false,
  },
  {
    id: 'p2',
    author: {
      id: 'u_me', name: 'Jobs In Atlanta', handle: '@jobsinatlanta',
      avatar: IMG('1503917988258-f87a78e3c995', 300, 300), verified: false, mine: true,
    },
    text: 'Wellstar Health System is hiring a Data Analyst — Hybrid, 2-4 years experience, Bachelor\'s degree.',
    images: [IMG('1573496359142-b8d87734a5a2', 900, 700)],
    createdAt: '13 days ago',
    likes: 0, comments: 0, shares: 0, liked: false,
  },
  {
    id: 'p3',
    author: {
      id: 'u_me', name: 'Jobs In Atlanta', handle: '@jobsinatlanta',
      avatar: IMG('1503917988258-f87a78e3c995', 300, 300), verified: false, mine: true,
    },
    text: 'Okta is hiring a Software Engineer. Remote / Hybrid roles available in Atlanta.',
    images: [IMG('1517694712202-14dd9538aa97', 900, 700)],
    createdAt: '18 days ago',
    likes: 0, comments: 0, shares: 0, liked: false,
  },
];

export const explore = [
  { id: 'e1', img: IMG('1502602898657-3e91760cbb34', 600, 700), title: 'Atlanta downtown', h: 260 },
  { id: 'e2', img: IMG('1520250497591-112f2f40a3f4', 600, 400), title: 'City guide', h: 170 },
  { id: 'e3', img: IMG('1523731407965-2430cd12f5e4', 600, 700), title: 'Neighborhoods', h: 260 },
  { id: 'e4', img: IMG('1533929736458-ca588d08c8be', 600, 400), title: 'Foodie finds', h: 170 },
  { id: 'e5', img: IMG('1554224155-8d04cb21cd6c', 600, 600), title: 'Documents', h: 230 },
  { id: 'e6', img: IMG('1477959858617-67f85cf4f1df', 600, 700), title: 'Get around', h: 260 },
  { id: 'e7', img: IMG('1519677100203-a0e668c92439', 600, 400), title: 'Airbnb tips', h: 170 },
  { id: 'e8', img: IMG('1533105079780-92b9be482077', 600, 700), title: 'Culture', h: 260 },
];

export const jobs = [
  {
    id: 'j1', title: 'flutter developer', company: 'my job',
    cover: IMG('1517694712202-14dd9538aa97', 400, 500),
    type: 'Hybrid', salary: '$120000', location: 'C9C2+6H8, C…',
    description: 'flutter dev', postedAt: 'Posted 18 days ago', saved: false,
    phone: '+15551230001',
  },
  {
    id: 'j2', title: 'Sample Job 1', company: 'google',
    cover: IMG('1611262588024-d12430b98920', 400, 500),
    type: 'On-site', salary: '$3000', location: 'Banglore',
    description: 'test description 2', postedAt: 'Posted 20 days ago', saved: false,
    phone: '+15551230002',
  },
  {
    id: 'j3', title: 'Data Analyst', company: 'Wellstar Health System',
    cover: IMG('1551288049-bebda4e38f71', 400, 500),
    type: 'Hybrid', salary: '$85K – $110K', location: 'Atlanta, Georgia, USA',
    description: 'Analyze healthcare data, identify insights, drive impact. 2-4 years experience.',
    postedAt: 'Posted 13 days ago', saved: true, phone: '+14045550100',
  },
];

// Nearby categories — matches reference exactly
export const nearbyCategories = [
  { id: 'beauty', name: 'Beauty & Spa', icon: 'Sparkles', color: '#EBD9FC' },
  { id: 'events', name: 'Events', icon: 'CalendarDays', color: '#FDE4C3' },
  { id: 'farms', name: 'Farms', icon: 'Trees', color: '#D9F5E1' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt', color: '#FBD9E4' },
  { id: 'grocery', name: 'Grocery Stores', icon: 'ShoppingCart', color: '#FEE2D6' },
  { id: 'health', name: 'Health Center', icon: 'Stethoscope', color: '#FCD9D9' },
  { id: 'insurance', name: 'Insurance', icon: 'ShieldCheck', color: '#DBEBFD' },
  { id: 'legal', name: 'Legal Consultant', icon: 'Scale', color: '#D9F3EF' },
  { id: 'nightclubs', name: 'Night Clubs', icon: 'Disc3', color: '#EDDDFC' },
  { id: 'housing', name: 'Housing', icon: 'Home', color: '#FDF0C2' },
  { id: 'restaurants', name: 'Restaurants', icon: 'UtensilsCrossed', color: '#FFE0C4' },
  { id: 'more', name: 'More', icon: 'LayoutGrid', color: '#EDEEF1' },
];

export const businessCategories = [
  'Beauty & Spa','Events','Farms','Fashion','Grocery Stores','Health Center',
  'Insurance','Legal Consultant','Night Clubs','Real Estate','Restaurants','Tax Filing',
];

export const serviceProviders = [
  'Airbnb Host','Astrologer','Banquet Hall','Bartender','Boxing coach','Cake maker/Pastry chef',
  'Car mechanic','Career Counselor','Catering service','Chef','Chiropractor','Cleaning Services',
  'DJ(Disc Jockey)','Dance Instructor','Dietitian','Digital marketer','Driving Instructor',
  'Educational Tutor','Electrician','Event Decorator','Event Organizers','Fashion Designer',
  'Financial Advisor','Florist','Gardener/Lawn Service','Graphic Designer','Gym Trainer',
  'Hair Stylist','House Builder','Imam','Interior designer','Language tutor','Life Coach',
  'Makeup Artist','Martial Arts instructor','Massage Therapist','Mehandi Artist','Music Band',
  'Music Teacher','Nail Artist','Nutritionist','Painter','Party Rentals','Pet Groomer',
  'Pet Trainer','Photographer','Physical Therapist','Plumber','Priest','Psychologist',
  'Real Estate Consultant','Sketch Artist','Speech Therapist','Tailoring/Alteration',
  'Tattoo Artist','Travel Guide','Video Editor','Videographer','Yoga Instructor',
];

// Notifications (matches PDF: "Montgomery Buzz liked your post.")
export const notifications = [
  { id: 'n1', kind: 'like', title: 'New Like', description: 'Montgomery Buzz liked your post.', time: '12 days ago', read: false },
  { id: 'n2', kind: 'follow', title: 'New Follower', description: 'Emma started following you.', time: '15 days ago', read: false },
  { id: 'n3', kind: 'comment', title: 'New Comment', description: 'Rakesh commented on your post.', time: '20 days ago', read: true },
];

// Inbox conversations
export const conversations = [
  { id: 'c1', name: 'Atlanta Jobs', avatar: GRAD('atlantajobs'), last: '✓ hii', time: '11 days ago', unread: 0 },
  { id: 'c2', name: 'Rakesh reddy Koukuntla', avatar: GRAD('rakesh'), last: 'Tap to chat', time: '11 days ago', unread: 0 },
  { id: 'c3', name: 'suchandra', avatar: GRAD('suchandra'), last: 'Tap to chat', time: '15 days ago', unread: 0 },
];

export const chatMessages = {
  c1: [
    { id: 'm1', from: 'them', text: 'Hi! Are you hiring right now?', time: '11 days ago' },
    { id: 'm2', from: 'me', text: 'hii', time: '11 days ago' },
  ],
  c2: [], c3: [],
};

// Providers for the search "Provider" tab
export const providers = [
  { id: 'pr1', name: 'Emma', username: '', avatar: GRAD('emma'), following: false },
  { id: 'pr2', name: 'prof test', username: 'prof_test', avatar: GRAD('proftest'), following: false },
  { id: 'pr3', name: 'Lily', username: 'lily', avatar: GRAD('lily'), following: false },
  { id: 'pr4', name: 'شام الزبيدي', username: 'sham_cyprus', avatar: GRAD('sham'), following: false },
  { id: 'pr5', name: "Airbnb's", username: 'airbnbs', avatar: GRAD('airbnbs'), following: false },
];

export const profilePhotos = [
  IMG('1502602898657-3e91760cbb34', 400, 400),
  IMG('1523987355523-c7b5b0dd90a7', 400, 400),
  IMG('1533929736458-ca588d08c8be', 400, 400),
];

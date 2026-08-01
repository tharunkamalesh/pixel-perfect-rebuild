/**
 * Content and asset references reconstructed from the original design.
 * Keeping copy + asset URLs here makes every section component reusable.
 */

export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Integrations", href: "#integrations" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
] as const;

export const ASSETS = {
  logoStrip:
    "https://framerusercontent.com/images/7JW5hiKTuIExiSp00XQILMZFt8.png?width=1920&height=676",
  mobileApp:
    "https://framerusercontent.com/images/sYgrMK32t75yrfeDiPBHgGkE0.png?width=810&height=550",
  collaboration:
    "https://framerusercontent.com/images/l72QbdRag1vavpCZqOv1HfBLrr4.png?lossless=1&width=500&height=300",
  converging:
    "https://framerusercontent.com/images/zqhgN3PVfzbqecQwtwaBJ5c3YX0.png?width=1200&height=540",
  highlight:
    "https://framerusercontent.com/images/8xSnMFnXZM58crUFdItnM8L8bNc.png?width=781&height=337",
  memberStrip:
    "https://framerusercontent.com/images/Z30ZmG2J1O3PafkZ82QjX9j8.png?width=128&height=32",
  profile:
    "https://framerusercontent.com/images/iv7PjsKGEZsM7FpoXAAz9n2lZ8E.png?width=128&height=128",
  mobileShots: [
    "https://framerusercontent.com/images/f4fVfyFHZeTn8bgtnYk6kcOzpnY.png?width=320&height=668",
    "https://framerusercontent.com/images/BYpQ1y5XTVDPD33hAxVPMdfZTI.png?width=320&height=532",
    "https://framerusercontent.com/images/UrlicJXzuSbpG6BN3u0pJU4YI.png?width=320&height=702",
    "https://framerusercontent.com/images/E0DaDQ2Af338oLmYbM1hGKUag8s.png?width=320&height=362",
  ],
  showcaseVideos: [
    "https://framerusercontent.com/assets/1yCR0brYZNWaohzAXsOWzvXk.mp4",
    "https://framerusercontent.com/assets/3OEC3P7qbV6kwsAbuNKh3khA.mp4",
    "https://framerusercontent.com/assets/IlFFQYGilLhLiJud88o1f15AAJs.mp4",
    "https://framerusercontent.com/assets/rH9F4aJVu7G5Iv6ESPI32sEy0dM.mp4",
  ],
  avatars: [
    "https://framerusercontent.com/images/N5Gc89wmCNp1BVxJR8Q7TnmYWA.png?width=128&height=128",
    "https://framerusercontent.com/images/c8tWz0mTJOubjsoEA5iKsGPiS8k.png?width=128&height=128",
    "https://framerusercontent.com/images/5JN4Ul7RSkDAIOdqqDOSpexpiAU.png?width=200&height=200",
    "https://framerusercontent.com/images/4Lkelxlu73jLnkad6oDxv5ZRI.png?width=200&height=200",
    "https://framerusercontent.com/images/Zn78cweLmTcLcOuWTrjfpbaHTI.png?width=128&height=128",
    "https://framerusercontent.com/images/voobs1vZaxzS3UXHxcxlGIT6j4.png?width=200&height=200",
    "https://framerusercontent.com/images/pUHGrCUTBZ6ieJ2gvoVZpXvh0.png?width=200&height=200",
    "https://framerusercontent.com/images/Y1c6sZVk1PbgRVSJTtci732g8.png?width=128&height=128",
    "https://framerusercontent.com/images/8jzU03uYomAhdoLFDzGYiN8OyE.png?width=128&height=128",
    "https://framerusercontent.com/images/f1MpYHQ9g90LauU0CFgPen9gKsA.png?width=128&height=128",
    "https://framerusercontent.com/images/x4Fi1jr1w6ocZF6ShXbNlwU5w.png?width=200&height=200",
    "https://framerusercontent.com/images/G0G0ATSCzgXELuD6bOc4W4s2DHM.png?width=200&height=200",
  ],
} as const;

export const SHOWCASE_ITEMS = [
  {
    title: "Stay organized with ease",
    body: "View all your projects, tasks, and deadlines in one simple dashboard. No more scattered to-dos.",
    video: ASSETS.showcaseVideos[0],
  },
  {
    title: "Get more done every day",
    body: "Break down big goals into smaller steps and keep momentum with clear priorities.",
    video: ASSETS.showcaseVideos[1],
  },
  {
    title: "Work together seamlessly",
    body: "Assign tasks, share updates, and keep everyone aligned—whether your team is remote or in-office.",
    video: ASSETS.showcaseVideos[2],
  },
  {
    title: "Seamless across desktop and mobile",
    body: "From office to on-the-go, your projects are always accessible when you need them.",
    video: ASSETS.showcaseVideos[3],
  },
] as const;

export const INTEGRATION_GROUPS = [
  {
    category: "Engineering",
    body: "Sync your code, issues, and deployments directly into your workflow.",
    tools: ["GitHub", "GitLab", "Bitbucket", "Jira", "Sentry", "CircleCI"],
  },
  {
    category: "Customer Experience",
    body: "Connect support and CRM tools to turn conversations into action.",
    tools: ["Zendesk", "Intercom", "Hubspot"],
  },
  {
    category: "Media & Design",
    body: "Bring designs, assets, and feedback into your projects seamlessly.",
    tools: ["Figma", "Canva", "Miro", "Sketch", "Loom"],
  },
  {
    category: "Analytics",
    body: "Connect your data tools to track performance and uncover insights.",
    tools: ["Google Analytics", "Hotjar", "Mixpanel"],
  },
] as const;

export type Testimonial = {
  quote: string;
  name: string;
  company: string;
  avatar: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Accretion has completely changed how we organize our work. Our team finally has one place to keep tasks, updates, and files without getting lost in endless threads.",
    name: "Marcus C.",
    company: "Corebyte",
    avatar: ASSETS.avatars[0],
  },
  {
    quote:
      "I love how easy it is to jump between projects. No more wasting time figuring out what's next.",
    name: "Elena N.",
    company: "Studio Polaris",
    avatar: ASSETS.avatars[1],
  },
  {
    quote:
      "Our clients noticed the difference right away. Clear progress, better communication, and fewer delays—everything just feels smoother now.",
    name: "Hannah S.",
    company: "Everpath",
    avatar: ASSETS.avatars[2],
  },
  {
    quote:
      "What I love about Accretion is that it doesn't force you into one rigid way of working.",
    name: "Taylor S.",
    company: "HorizonWorks",
    avatar: ASSETS.avatars[3],
  },
  {
    quote:
      "The mobile app is a game-changer. I can check in on projects, add updates, or review tasks while I'm commuting. It keeps me connected without slowing me down.",
    name: "David O.",
    company: "NimbusWorks",
    avatar: ASSETS.avatars[4],
  },
  {
    quote:
      "It's like the noise has been stripped away. The interface is clean, the automations are smart, and I can finally focus on what matters.",
    name: "Jonah P.",
    company: "Horizon Labs",
    avatar: ASSETS.avatars[5],
  },
  {
    quote:
      "Accretion keeps our projects moving without the constant check-ins. I finally feel like my team is ahead instead of catching up.",
    name: "Sofia R.",
    company: "Brightwave",
    avatar: ASSETS.avatars[6],
  },
  {
    quote:
      "Accretion saves me hours every single week. That's time I can put back into actual creative work instead of chasing down updates.",
    name: "Amira K.",
    company: "Northstar",
    avatar: ASSETS.avatars[7],
  },
  {
    quote:
      "We tried three other platforms before this one. None of them clicked with the team. This did, almost instantly.",
    name: "Lucas M.",
    company: "SummitFlow",
    avatar: ASSETS.avatars[8],
  },
  {
    quote:
      "Rolling it out took an afternoon. By the next morning everyone was already living inside it.",
    name: "Mateo A.",
    company: "Stratus Technologies",
    avatar: ASSETS.avatars[9],
  },
];

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: "Free",
    priceNote: null,
    features: [
      "Up to 3 projects",
      "50 tasks per month",
      "Mobile & desktop access",
      "Basic checklists",
    ],
    featured: false,
  },
  {
    name: "Basic",
    price: "$14",
    priceNote: "per month",
    billing: "Billed yearly",
    features: [
      "Unlimited projects",
      "Unlimited tasks",
      "Task due dates & reminders",
      "Share with up to 3 collaborators",
    ],
    featured: false,
  },
  {
    name: "Premium",
    price: "$26",
    priceNote: "per month",
    billing: "Billed yearly",
    badge: "Recommended",
    intro: "Everything in Basic, plus:",
    features: [
      "Unlimited personal tasks",
      "Basic projects & checklists",
      "Mobile & desktop access",
      "Share with up to 2 collaborators",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceNote: null,
    intro: "Everything in Premium, plus:",
    features: [
      "Custom workflows & automations",
      "Advanced reporting & insights",
      "Role-based permissions",
      "Integrations (Slack, Google, Notion, etc.)",
    ],
    featured: false,
  },
] as const;

export const FAQS = [
  {
    question: "Is there a free version?",
    answer:
      "Yes. The Starter plan is free forever and includes up to 3 projects, 50 tasks per month, and access on mobile and desktop — no credit card required.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Absolutely. You can upgrade, downgrade, or cancel at any time from your billing settings. Changes take effect immediately and we prorate the difference.",
  },
  {
    question: "Do you offer a mobile app?",
    answer:
      "Yes — native apps for iOS and Android keep every project, task, and comment in sync with the web app in real time.",
  },
  {
    question: "Do you offer discounts for yearly billing?",
    answer:
      "Yearly billing saves you roughly two months compared to paying monthly. The discount is applied automatically at checkout.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "All major credit and debit cards, Apple Pay, and Google Pay. Enterprise customers can also pay by invoice or bank transfer.",
  },
] as const;

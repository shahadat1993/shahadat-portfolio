# Portfolio Frontend (React + Vite + Tailwind v4 + Framer Motion + Lenis)

> **আপডেট:** এই ভার্সনে Laravel ব্যাকএন্ড নেই — সব ডেটা `src/data/json/` এর আলাদা আলাদা JSON ফাইল থেকে আসে, আর Contact ফর্ম EmailJS দিয়ে সরাসরি ইমেইলে যায়। পুরো গাইড দেখো **README-DATA.md** এ।

## চালানোর নিয়ম

```bash
cd frontend
npm install
npm run dev
```

তারপর ব্রাউজারে `http://localhost:5173` খুলবে।

## এই ভার্সনে নতুন যা যোগ হলো (তোমার স্ক্রিনশট দেখে)
- **Hero**: typing/erasing role animation, animated orbit + glass-card visual (mascot-এর বদলে নিজস্ব ডিজাইন — কপিরাইট এড়াতে)
- **About preview**: profile ছবির চারপাশে ঘোরা tech-icon orbit + stat cards (Experience/Specialty/Focus)
- **Skills & Technologies**: icon grid + animated count-up stats (Technologies/Projects/Years)
- **Timeline**: কেন্দ্রীয় লাইনে scroll করার সাথে সাথে glowing dot নিচে নামে (scroll-linked progress), প্রতিটা item আলাদা icon (briefcase/book/award) সহ
- **Featured Projects**: বড় showcase carousel — prev/next arrow, dot navigation, key features checklist, tech pills, Live demo + Source বাটন
- **Open to work banner**, **Testimonials grid** — নতুন সেকশন
- **Single Project page**: image gallery carousel, key features, tech stack, client/year info, "Discuss a similar project" বাটন সহ, related projects
- **Single Blog page**: reading-progress bar (উপরে), author card, share বাটন, **content-এর মধ্যে ছবি left/right/center বসানো যায়** (admin থেকে align ফিল্ড দিয়ে নিয়ন্ত্রণ হবে), related posts
- Smooth scrolling — পুরো সাইটে Lenis দিয়ে বাটার-স্মুথ scroll

## ডেটা স্ট্রাকচার নোট (backend বানানোর সময় কাজে লাগবে)
`src/data/mockData.js` এ blog `content` একটা block-array — প্রতিটা block `{ type: 'paragraph'|'heading'|'image', text, src, align, caption }`। Admin panel-এর rich text editor থেকে এই structure (বা সমতুল্য HTML) generate করলে সরাসরি `BlogContent.jsx` কম্পোনেন্টে বসে যাবে। Project-এ `features[]` আর `gallery[]` অ্যারে যোগ হয়েছে — admin থেকে এগুলো repeatable fields হিসেবে input নিতে হবে।

## এখনো বাকি
- তোমার reference site এর exact color grading না পেলে (screenshot এর কাছাকাছি violet/cyan/dark ব্যবহার করেছি — ঠিক আছে কিনা জানিও)
- ~~Laravel `/api/v1/...` থেকে real data fetch~~ → এখন JSON ফাইল থেকে আসে (README-DATA.md দেখো)
- ~~Contact form backend-এ POST করা~~ → এখন EmailJS দিয়ে সরাসরি ইমেইলে যায় (README-DATA.md দেখো)


## ফোল্ডার গঠন
```
src/
  components/   → Navbar, Footer, Cursor, SearchBar, Timeline, ProjectCard, BlogCard, SectionHeading, CategoryFilter
  context/      → ThemeContext (dark mode + accent color)
  data/         → mockData.js (পরে API call দিয়ে replace হবে)
  layouts/      → MainLayout (Navbar+Footer+Cursor wrap করে)
  pages/        → Home, About, Projects, ProjectSingle, Blogs, BlogSingle, Contact
```

## Design system (token summary)
- রং: dark background `#0a0a0f`, surface `#13131a`, ৬টা accent preset (Violet/Coral/Emerald/Amber/Rose/Cyan) — navbar-এর droplet icon দিয়ে বদলানো যায়
- Font: Display = Space Grotesk, Body = Inter, Labels/tags/dates = JetBrains Mono
- Signature element: dot-trail cursor + live color-grading picker যেটা পুরো সাইট re-theme করে

# Data, Images, Contact Form & Vercel — Full Guide

## ১. JSON দিয়ে সব ডেটা কন্ট্রোল

Backend নাই, তাই সব content আলাদা আলাদা JSON ফাইলে রাখা হয়েছে — প্রতিটা section এর নিজস্ব ফাইল:

```
src/data/json/
  profile.json        → নাম, bio, email, location, resume, social links
  skills.json         → skill list + stats (Technologies/Projects/Years)
  timeline.json       → experience/education timeline
  projects.json       → categories + সব project (thumbnail, gallery, features, links)
  blogs.json          → categories + সব blog post (content block দিয়ে গঠিত)
  testimonials.json   → client/colleague quotes
```

কোনো কোড না ছুঁয়ে শুধু এই JSON ফাইলগুলো এডিট করলেই সাইট আপডেট হয়ে যাবে (Vercel এ deploy দিলে সেটাও সাথে সাথে দেখাবে)। `src/data/mockData.js` ফাইলটা শুধু এই JSON গুলোকে import করে React কম্পোনেন্টে পাঠায় — এটা না ছুঁলেও চলবে।

নতুন project/blog/testimonial যোগ করতে চাইলে ওই JSON এর array-তে (যেমন `projects.json` এর `items`) নতুন একটা object বসিয়ে দিলেই হবে — গঠন আগেরটার মতো রাখলেই যথেষ্ট। `slug` unique রাখবে (URL এ ব্যবহার হয়, যেমন `/projects/shopbd-ecommerce`)।

## ২. ছবি বসানো (image path)

JSON এ ছবির path local রাখা হয়েছে (Unsplash link না), যেমন:
```
"thumbnail": "/images/projects/shopbd-ecommerce/thumbnail.jpg"
```

এই path গুলো `public/images/...` ফোল্ডারের সাথে মিলে যায়। এখন placeholder ছবি বসানো আছে (ধূসর বক্সে ফাইলের নাম লেখা) — শুধু **একই নামে** নিজের আসল ছবি দিয়ে replace করে দিলেই হবে:

```
public/images/profile/photo.jpg
public/images/projects/<slug>/thumbnail.jpg, 2.jpg, 3.jpg ...
public/images/blogs/<slug>/thumbnail.jpg, 1.jpg, 2.jpg ...
public/resume/resume.pdf   → নিজের CV/Resume PDF দিয়ে replace করো
```

নতুন ছবি/gallery item যোগ করতে চাইলে ফাইল ওই ফোল্ডারে রেখে JSON এ path যোগ করে দাও — একদম সহজ, কোনো import লাগবে না কারণ `public/` ফোল্ডারের সব ফাইল Vite/Vercel এ root path থেকে সরাসরি সার্ভ হয় (`public/images/x.jpg` → `/images/x.jpg`)।

## ৩. Contact ফর্ম — বিনামূল্যে ব্যাকএন্ড ছাড়াই ইমেইলে মেসেজ পাঠানো (EmailJS)

যেহেতু Vercel এ শুধু frontend host হচ্ছে, backend সার্ভার নেই — তাই **EmailJS** ব্যবহার করা হয়েছে। এটা ব্রাউজার থেকে সরাসরি ইমেইল পাঠায়, ফ্রি প্ল্যানে মাসে ২০০টা মেসেজ পাঠানো যায়, কোনো সার্ভার/API key কোডে লুকাতে হয় না।

### সেটআপ (৫ মিনিট):
1. https://www.emailjs.com এ ফ্রি অ্যাকাউন্ট বানাও (Sign Up)।
2. **Email Services** → Add New Service → Gmail (বা যেটা ব্যবহার করো) সিলেক্ট করে নিজের ইমেইল connect করো। এখান থেকে একটা **Service ID** পাবে।
3. **Email Templates** → Create New Template। Template এর body তে এই ভ্যারিয়েবলগুলো ব্যবহার করো:
   ```
   From: {{from_name}} ({{from_email}})
   Service: {{service}}

   Message:
   {{message}}
   ```
   Template এর "To email" ফিল্ডে নিজের ইমেইল (`s0735949@gmail.com`) বসিয়ে দাও, যাতে মেসেজ সেখানে যায়। এখান থেকে **Template ID** পাবে।
4. **Account → General** থেকে **Public Key** কপি করো।
5. প্রজেক্টের root এ `.env.example` ফাইলটা কপি করে `.env` নামে রাখো, এবং তিনটা ভ্যালু বসাও:
   ```
   VITE_EMAILJS_SERVICE_ID=xxxxx
   VITE_EMAILJS_TEMPLATE_ID=xxxxx
   VITE_EMAILJS_PUBLIC_KEY=xxxxx
   ```
6. লোকালি টেস্ট করতে: `npm run dev` চালিয়ে Contact পেইজ থেকে একটা টেস্ট মেসেজ পাঠাও — নিজের ইমেইলে চলে আসবে।

### Vercel এ deploy করার সময়
`.env` ফাইল কখনো GitHub এ push হবে না (`.gitignore` এ আছে) — তাই Vercel এর নিজস্ব environment variable সিস্টেম ব্যবহার করতে হবে:
1. Vercel প্রজেক্ট → **Settings → Environment Variables**
2. একই তিনটা key (`VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`) এবং তাদের ভ্যালু বসাও।
3. Redeploy করো — এখন লাইভ সাইটেও Contact ফর্ম কাজ করবে, পুরো ফ্রি।

## ৪. যা যা নতুন feature যোগ করা হলো
- Contact ফর্ম এখন সত্যিই ইমেইলে মেসেজ পাঠায় (EmailJS), sending/success/error state সহ animation
- Email এর পাশে **copy button** — এক ক্লিকে ইমেইল কপি হয়ে যায়, checkmark animation দেখায়
- Hero তে **"Available for work"** pulsing badge + নিচে **Download Resume** বাটন (`profile.resumeUrl` থেকে, `profile.json` এ `"availableForWork": false` করে দিলে badge আর "Open to work" ব্যানার দুটোই লুকিয়ে যাবে)
- Blog পোস্টের Share বাটন এখন কাজ করে — Twitter, LinkedIn এ শেয়ার করে, আর Link বাটনে ক্লিক করলে লিংক কপি হয়ে checkmark দেখায়

## ৫. চালানোর নিয়ম (আগের মতোই)
```bash
npm install
npm run dev
```
`http://localhost:5173` এ খুলবে। Deploy করার আগে `npm run build` চালিয়ে locally চেক করে নিতে পারো।

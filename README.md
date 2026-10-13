# My Naranga — मेरा नारंगा (Official Village Portal)

The official community and civic information website for **Naranga Village (Naranga Uttari Gram Panchayat)**, Parihar Block, Sitamarhi District, Bihar, India (PIN 843324).

Designed with the **Stitch Gram Civic Portal** design system:
- Primary Forest Green palette (`#003629`, `#1B4D3E`)
- Clean high-contrast typography (`Noto Sans` for Hindi/English titles & `Inter` for body records)
- Complete dual-language bilingual support (Hindi & English)
- High accessibility and responsive layouts for mobile, tablet, and desktop

---

## 🌟 Key Features

1. **Exact Stitch Design Fidelity**: Preserved the dual navigation bars, hero typography, 5-image places carousel, 6-card statistics dashboard, agriculture hero banner, emergency medical alerts, and multi-column civic footer.
2. **Authentic Documentary Data**:
   - Historical **Census 2011 Verified Data** (Population: 25,366; Households: 5,591; Male: 13,397; Female: 11,969; Census Code: 219122; LGD: 101081).
   - Historical **Agricultural Records** (Net Sown Area: 1,397 Ha; Irrigated: 51.4 Ha; Unirrigated: 1,345.6 Ha; Paddy & Wheat cycles).
   - Clear disclosure of provisional directory listings (e.g., Mukhiya Bharat Bhushan, awaiting District Election Office Gazette sync).
   - **Zero AI-hallucinated figures, fake reviews, or fabricated emergency contacts.**
3. **Five-Card Heritage Places Carousel**: Smooth scrolling with next/prev desktop buttons, touch gestures, verified photo credits, and neutral placeholders for spots awaiting verified community submissions.
4. **Complete Route Coverage**:
   - `/` — Homepage (All 15 sections)
   - `/about` — About Naranga & Administrative Geography
   - `/panchayat` — Panchayat Structure, Wards, & Governance
   - `/education` — Schools Directory & Student Schemes
   - `/health` — Healthcare Facilities & 24x7 Ambulance (108/102)
   - `/agriculture` — Land Records, Crop Advisory & DBT Krishi Portal
   - `/services` — Naranga Bazaar Commercial Directory
   - `/places` — Heritage Landmarks & Photo Submission
   - `/schemes` — Official Bihar & National Portals (EPDS, RTPS, PM-KISAN, PMAY-G, e-Labharthi, PM-JAY)
   - `/news` — Village Notice Board (Live bulletins)
   - `/people` — Local Achievers & Community Nominations
   - `/contact` — Grievance Redressal & Citizen Submission Forms
   - `/privacy` — Privacy Policy & Data Disclosures
   - `/admin/login` & `/admin` — Protected Administration & Moderation Panel
5. **Protected Admin Dashboard & Moderation Queue**:
   - Review, approve, or reject citizen submissions (photos, business listings, data corrections).
   - Publish official Gram Sabha notices.
   - Secure HTTP-only cookie authentication.

---

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Stitch design tokens
- **Icons**: Lucide React
- **Validation**: Zod
- **Database**: PostgreSQL with Prisma ORM
- **Localization**: Bilingual Context (Hindi / English)

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18.17+ or 20+
- npm, pnpm, or yarn
- PostgreSQL (optional for local testing; default runtime stores state safely)

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update your credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/naranga_db?schema=public"
ADMIN_USER="naranga_admin"
ADMIN_PASSWORD="YourSecurePassword2026"
```

### 4. Database Setup & Seeding
```bash
npx prisma generate
npx prisma db push
node prisma/seed.js
```

### 5. Running Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portal.

### 6. Admin Panel Access
- URL: `http://localhost:3000/admin/login`
- Use the configured administrative credentials (or set via `ADMIN_USER` and `ADMIN_PASSWORD` in your environment variables).

---

## 📋 Facts and Photographs Awaiting Community Verification

To maintain complete documentary transparency, the following items are flagged with "Verification Pending" badges:
1. **Panchayat Mukhiya**: Bharat Bhushan is listed in third-party directories; awaiting official Sitamarhi District Election Office Gazette roster sync.
2. **Gram Kachahari Sarpanch**: Independent judicial post name awaiting official gazette sync.
3. **Panchayat Secretary (Sachiv)**: Official notification roster pending.
4. **Photos of Local Landmarks**: Durga Mandir (Naranga Bazaar), Mahadev Math, Naranga Jama Masjid, and M.S. Chandpura Urdu Middle School show respectful placeholders with community contribution buttons.
5. **Weather API**: OpenWeather / IMD API key pending; currently displays seasonal climate patterns for Sitamarhi agricultural region.

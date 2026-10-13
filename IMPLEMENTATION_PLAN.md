# My Naranga Project Inspection & Implementation Plan

## 1. Project Inspection Findings

### Environment & Source
- Workspace: `c:\Users\ADMIN\Desktop\Naranga`
- The project directory was initially clean/empty.
- **Design Source of Truth Provided**:
  - The user provided the complete Stitch-exported design specification HTML & Design Tokens (`Gram Civic Portal` design system).
  - Colors: Primary Forest Green (`#003629`), Surface (`#F8F9FF`), Primary Container (`#1B4D3E`), Accent Saffron/Tertiary (`#4F2100` / `#E06D14`), Warm Cream (`#F7F4EB`), Outline (`#707974`).
  - Typography: `Noto Sans` for Hindi/English headlines, `Inter` for body/labels/tables.
  - Supplied authentic visual assets:
    - Hero & village landscape documentary photograph: `media_1791883155577_3fae1325.jpg` (village road, lush green fields, homes)
    - Agricultural paddy cultivation documentary photograph: `media_1791883155405_33e0ae13.jpg` (farmers transplanting paddy in rural North Bihar/Sitamarhi region)
  - Navigation Architecture: Dual-tier header (Top Utility Bar with Logo, Village Name, Search, Hindi/Eng Switcher, Admin Login + Sub-Navigation Bar with 11 routes).
  - All 15 visual sections from Stitch design specified and matched.

---

## 2. Complete Architecture & Tech Stack

- **Framework**: Next.js 14+ App Router with TypeScript
- **Styling**: Tailwind CSS configured with exact Stitch Design Tokens (`primary: #003629`, `primary-container: #1b4d3e`, `surface: #f8f9ff`, `surface-container-low: #eff4ff`, etc.) and Google Fonts (`Noto Sans`, `Inter`, `Material Symbols Outlined`).
- **Icons**: Lucide React + Material Symbols Outlined support to mirror Stitch design exactly.
- **Bilingual Strategy**:
  - Dual language support (Hindi by default, English toggle).
  - Language Context & state preservation across pages via Cookie/LocalStorage and unified translation dictionaries (`messages/hi.ts`, `messages/en.ts`).
- **Data Architecture & Integrity**:
  - Prisma schema with PostgreSQL models: `Village`, `Statistic`, `PanchayatRepresentative`, `Place`, `AgricultureRecord`, `School`, `HealthFacility`, `LocalBusiness`, `PersonProfile`, `Notice`, `Submission`, `User`.
  - Realistic SQLite/PostgreSQL fallback database client architecture so the site runs out of the box with seeded historical Census 2011 and district data, with `.env` configurable for production PostgreSQL.
- **Security & Data Verification**:
  - Strictly distinguishes verified Census 2011 records, directory listings, and "Verification Pending" notices.
  - Zero fabricated names, numbers, or artificial rankings.
  - Server actions with input validation (Zod) for community submissions and admin authentication.

---

## 3. Implementation Checklist

- [x] Phase 1: Inspect Stitch Design HTML, color tokens, and uploaded photos.
- [ ] Phase 2: Set up Next.js App Router codebase structure with Tailwind configuration, Lucide icons, fonts, and assets.
- [ ] Phase 3: Create bilingual dictionaries (`messages/hi.ts`, `messages/en.ts`) and `LanguageContext`.
- [ ] Phase 4: Build Reusable Components matching Stitch layout:
  - `SiteHeader` (Dual navbar, logo, search modal/bar, lang switcher, admin button)
  - `PlacesCarousel` (5 cards, touch & keyboard accessible, smooth scrolling)
  - `VillageStatistics` (Census 2011 cards with transparency banner)
  - `AgriculturePreview` (Real land record stats, crop cycle, scheme links)
  - `PanchayatPreview` (Mukhiya directory notice, Sarpanch notice, 14 wards)
  - `EducationPreview` (M.S. Chandpura Urdu Middle School, primary & secondary)
  - `HealthcarePreview` (Emergency 108/102, PHC, sub-centre, referral hospital)
  - `WeatherSection` (Honest status: live API unconfigured, regional climate guide)
  - `ServicesGrid` (6 local bazaar service categories)
  - `PeopleSection` (Community nomination callout)
  - `CultureSection` (Chhath, Durga Puja, Holi, Eid)
  - `NoticesSection` (Live status banner + archive link)
  - `VillageMap` (Parihar, Sitamarhi coordinates + Google Maps link)
  - `GovernmentSchemes` (EPDS, RTPS, PM-KISAN, PMAY-G, e-Labharthi, Ayushman)
  - `CommunityContribution` (Modal forms for 4 submission types)
  - `SiteFooter`
- [ ] Phase 5: Implement all required public routes:
  - `/` (Home)
  - `/about` (About Naranga history, geography, profile)
  - `/panchayat` (Detailed Panchayat structure, Mukhiya note, wards)
  - `/education` (Schools directory and educational schemes)
  - `/health` (Healthcare facilities, emergency contacts, ambulance)
  - `/agriculture` (Detailed farming guide, crop calendar, PM-KISAN)
  - `/services` (Bazaar directory & submit business form)
  - `/places` (5 heritage spots, submit photo form)
  - `/schemes` (Direct links to official Bihar/Govt portals)
  - `/news` (Notices board & public announcements)
  - `/people` (Achievers & nomination form)
  - `/contact` (Contact details & grievance/information submission)
  - `/privacy` (Privacy policy)
- [ ] Phase 6: Implement Admin Panel (`/admin/login`, `/admin`):
  - Password protection / session auth
  - Moderation queue for community submissions
  - Management views for notices, places, and records
- [ ] Phase 7: Setup Database & Seed Scripts (Prisma schema, seed data with source citations).
- [ ] Phase 8: Verification, testing, `.env.example`, and comprehensive README.

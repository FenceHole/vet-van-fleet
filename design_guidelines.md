# Vet Van Fleet Design Guidelines

## Design Approach: Rebellious Impact Platform

**Selected References:** Patagonia (activist brand), Stripe (data clarity), Linear (modern edge)

**Core Philosophy:** This is NOT a charity website. It's a platform that disrupts the system. Design should feel bold, unconventional, and unapologetically modern - breaking free from traditional nonprofit aesthetics.

**Key Principles:**
- Rebellious confidence over guilt-based appeals
- Data transparency as trust-building
- System disruption visualized through bold contrasts
- Mobile-first storytelling for viral potential

## Typography System

**Font Stack:**
- Primary: Inter (Google Fonts) - Clean, modern, excellent readability
- Accent: Space Grotesk (Google Fonts) - Bold, geometric edge for headlines

**Hierarchy:**
- Hero Headline: Space Grotesk, 56px desktop / 36px mobile, 700 weight, -0.02em tracking
- Section Headlines: Space Grotesk, 40px desktop / 28px mobile, 700 weight
- Subheads: Inter, 24px desktop / 20px mobile, 600 weight
- Body: Inter, 18px desktop / 16px mobile, 400 weight, 1.6 line-height
- Captions/Stats: Inter, 14px, 500 weight, uppercase, 0.05em tracking

## Layout System

**Spacing Primitives:** Tailwind units of 4, 8, 12, 16, 24 (p-4, gap-8, py-12, px-16, mb-24)

**Container Strategy:**
- Full-width hero: w-full with max-w-7xl inner container
- Content sections: max-w-6xl
- Stat blocks: max-w-4xl for focus

**Grid Patterns:**
- Features/Pillars: 3-column desktop (lg:grid-cols-3), 1-column mobile
- Stats: 2-column layout (md:grid-cols-2) for visual comparison
- Tools/Components: Asymmetric 2-column (60/40 split)

## One-Page Structure

**1. Hero Section (80vh)**
Large hero image: Veterinarian with cat in mobile van, warm natural lighting, authentic documentary style. Overlay with subtle dark gradient (40% opacity) for text readability.

Headline: "Free Vet Care for All Cats. Everywhere."
Subhead: "We don't want your money. We want theirs."
CTA: Two buttons on blurred backgrounds - Primary "How It Works" (scroll anchor), Secondary "Start a Van" (contact)

**2. Crisis Sections (The Problem)**
Split 2-column layout alternating left/right:
- Left: Workforce Burnout with 66% stat in massive type
- Right: Care Deserts with 90% decline visualization
Include contextual images: stressed vet students, rural landscapes without services

**3. Strategic Pillars (The Solution)**
4-card grid showcasing:
- Mobile Teaching Hospital (icon: van + graduation cap)
- Corporate Triple Dip (icon: dollar/trophy hybrid)
- Public Health Infrastructure (icon: shield/cross)
- Media Monetization (icon: camera/play button)

Each card: Icon top, title, 2-sentence description, expandable "Learn More" for mechanism details

**4. Financial Architecture**
Data visualization section with animated number counters:
- Tax credits breakdown
- Funding vehicles comparison table
- Visual flowchart showing money movement through system

**5. How It Works Timeline**
Horizontal scroll (desktop) / vertical (mobile) timeline:
Step 1 → Step 2 → Step 3 → Step 4 with connecting arrows
Include small illustrative icons for each step

**6. Impact Stats Banner**
Full-width section with 4-stat layout:
- Vans Deployed
- Students Trained  
- Cats Treated
- Corporate Partners
Large numbers with small context labels

**7. Tech Tools Showcase**
3-column cards for Strategy Bot, Bureaucracy Translator, Viral Hook Generator
Subtle tech aesthetic: monospace font accents, terminal-inspired borders

**8. CTA Section**
Bold centered statement: "Start Your Own Fleet"
Split action: "Get the Spark Kit" (primary) + "Join Existing Van" (secondary)
Email: founders@vetvanfleet.org prominent
Background image: Fleet of vans lined up, powerful perspective shot

## Component Library

**Buttons:**
- Primary: Bold, rounded corners (rounded-lg), 16px padding vertical, 32px horizontal
- On-image buttons: backdrop-blur-md with 20% white background
- No custom hover states needed (Button component handles)

**Cards:**
- Soft shadows (shadow-lg)
- Rounded corners (rounded-xl)
- Padding: p-8 desktop, p-6 mobile
- Hover: Subtle lift (translate-y-1 transform)

**Stats Display:**
- Massive numbers: 64px+, Space Grotesk
- Context labels: Small caps, 12px, opacity 70%
- Vertical stack with tight spacing (gap-2)

**Icons:**
Use Heroicons via CDN - outline style for consistency, 32px base size for features

## Images Strategy

**Hero Image:** Yes - Authentic documentary-style veterinarian with cat in modern mobile clinic. Warm, hopeful, professional.

**Supporting Images:**
- Crisis sections: Real photos of vet students, rural communities
- Van fleet: Multiple angles of mobile units in action
- Impact moments: Cats being treated, students learning, communities served
- Avoid stock photos - documentary/journalism aesthetic throughout

**Image Treatment:** 
- Subtle overlays for text readability (30-40% gradient)
- Consistent aspect ratios: 16:9 for landscapes, 4:3 for portraits
- Rounded corners (rounded-lg) for contained images

## Critical Notes

- Maintain rebellious energy - avoid soft/gentle charity aesthetic
- Data transparency builds trust - showcase numbers prominently
- Mobile optimization critical for viral sharing
- Every section tells part of the "system hack" story
- Footer: Rich with newsletter signup, social links, local chapter finder, contact methods, trust indicators (501c3 status)
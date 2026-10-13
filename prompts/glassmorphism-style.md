# Summary

A sophisticated design system centered on glassmorphism, depth-focused layouts, and a monochrome palette with vibrant emerald highlights. It transitions from a dark, immersive hero section to a clean, structured light-mode feature set.

# Style

The style relies on the Inter font family for a clean, modern look. It features two primary modes: a high-contrast dark mode using deep blacks (#000000) and translucent glass layers, and a light mode using soft zinc grays (#F4F4F5). Animations are smooth, utilizing cubic-bezier curves for entry and hover states. Key visual elements include 20px-blur glass containers and a subtle grain overlay.

## Spec

### Visual Foundations
- **Color Palette:** Primary Dark (#000000), Light Background (#F4F4F5), Zinc Accent (#18181B), Emerald Highlight (#34D399), Subtle Border (rgba(255, 255, 255, 0.1)).
- **Typography:** Font: 'Inter', sans-serif. 
  - Headings: font-weight 500-700, tracking -0.05em, leading 1.05.
  - Body: font-weight 300-400, color: Zinc-500 (#71717A).
  - Labels: font-weight 700, size 10px, tracking 0.2em, uppercase.
- **Glassmorphism:** 
  - `background: rgba(255, 255, 255, 0.05)`
  - `backdrop-filter: blur(12px)`
  - `border: 1px solid rgba(255, 255, 255, 0.1)`
- **Grain Overlay:** Use a noise SVG as a fixed overlay at 15% opacity to add texture to dark sections.
- **Corner Radius:** Standardize large containers at `2.5rem (40px)` and internal cards at `1rem (16px)` to `1.5rem (24px)`.
- **Animations:** 
  - Entry: `fade-in-up` (TranslateY: 20px to 0, Opacity: 0 to 1) using `cubic-bezier(0.16, 1, 0.3, 1)` over 0.8s.
  - Hover: Scaling effects (105%) and background color transitions (300ms duration).

# Layout & Structure

The layout is built within a max-width 1600px container. It uses a tiered structure: an immersive full-height hero section with absolute-positioned glass elements, followed by a grid-based feature section, a dark 'productivity' block, and a bento-grid pricing layout.

## Navigation

Floating glass navbar. Features a blur of 20px, rounded-full shape, and 1.5px padding. Links use `text-white/80` with a hover state of `bg-white/10` and rounded-full background.

## Hero Section

Height 92vh, rounded corners (2.5rem). Background consists of a high-resolution abstract image at 60% opacity with a gradient overlay from `zinc-950/40` to `zinc-950/90`. Includes a massive background text ('CREATE') at 22vw with 3% opacity and a blur filter. Content is split between a left-aligned typography block and a right-aligned vertical stack of glass stats cards.

## Feature Grid

Two-column layout. Left column: Sticky header with 4xl-5xl typography and a 2x3 grid of icon+label pairs. Right column: Large display card with a 105% hover-scale image and an internal floating glass 'System Analysis' component showing progress bars and status indicators.

## Dark Productivity Block

Full-width section with #18181B background. Features a grayscale grid lineart overlay. Layout: 2-column. Left: List of numbered steps (01, 02) in rounded-2xl boxes. Right: 3D-transformed mock-up window (rotated 3 degrees) with internal glass-morphic code snippets and a 'bounce' animated status tag at the bottom-right.

## Pricing Bento Grid

3-column grid of cards. Each card: White background, 2rem radius, thin zinc-100 border. Top half: 64px height image with a gradient-to-black bottom overlay. Bottom half: Padding 1.5rem, secondary text for features, and a full-width action button.

# Special Components

## Interactive Action Button

A pill-shaped button with a nested circular icon container.

Base: `bg-white`, `rounded-full`, `pl-6 pr-2 py-2`. Text: `font-medium`, `text-zinc-900`. Inner Icon: `w-10 h-10`, `bg-zinc-900`, `rounded-full`, containing a white icon. Interaction: Entire button scales to 105% on hover, inner icon background shifts to `bg-zinc-700`.

## Glass Stat Card

A high-transparency card used for metrics within dark sections.

Dimensions: Width 72px (approx), Padding 1.25rem. Style: `background: rgba(255, 255, 255, 0.05)`, `backdrop-filter: blur(12px)`, `border: 1px solid rgba(255, 255, 255, 0.1)`. Elements: Large metric (text-3xl) and secondary description (text-white/60, size sm).

# Special Notes

MUST: Maintain the 2.5rem corner radius for all major section wrappers to ensure visual rhythm. MUST: Use 'grainy-gradients' noise textures on dark backgrounds to prevent banding and add 'analog' depth. MUST: Ensure all glass elements have a 1px white border with 10% opacity for edge definition. DO NOT: Use flat colors for dark backgrounds; always apply a subtle bottom-heavy gradient.
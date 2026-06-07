---
name: Izzy Essencial Design System
colors:
  surface: '#f9f9ff'
  surface-dim: '#c7dbff'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee9ff'
  surface-container-highest: '#d5e3ff'
  on-surface: '#001c3b'
  on-surface-variant: '#3f484e'
  inverse-surface: '#133155'
  inverse-on-surface: '#ebf1ff'
  outline: '#6f787f'
  outline-variant: '#bfc8cf'
  surface-tint: '#00658b'
  primary: '#006388'
  on-primary: '#ffffff'
  primary-container: '#187da8'
  on-primary-container: '#fcfcff'
  inverse-primary: '#7ed0ff'
  secondary: '#106d39'
  on-secondary: '#ffffff'
  secondary-container: '#9df3b1'
  on-secondary-container: '#18713d'
  tertiary: '#745b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cda72b'
  on-tertiary-container: '#4f3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c5e7ff'
  primary-fixed-dim: '#7ed0ff'
  on-primary-fixed: '#001e2d'
  on-primary-fixed-variant: '#004c6a'
  secondary-fixed: '#a0f5b4'
  secondary-fixed-dim: '#84d99a'
  on-secondary-fixed: '#00210c'
  on-secondary-fixed-variant: '#005228'
  tertiary-fixed: '#ffe08b'
  tertiary-fixed-dim: '#ebc246'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#584400'
  background: '#f9f9ff'
  on-background: '#001c3b'
  surface-variant: '#d5e3ff'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
The brand personality is centered on "Effortless Reliability." As a convenience provider in Mozambique, the design system must feel deeply accessible, trustworthy, and vibrant. The visual direction follows a **Modern Corporate** style infused with friendly, approachable geometry. It balances the professional stability of a financial institution with the warmth of a local neighborhood shop.

The target audience is multi-generational and multi-lingual. To support this, the interface prioritizes high-contrast legibility and clear iconography to bridge potential language gaps between English and Portuguese speakers. The emotional response should be one of relief and confidenceâknowing that essentials are "easy" (Izzy) to find and purchase.

## Colors
This design system utilizes a "Trust & Freshness" palette derived from the brand identity. 
- **Primary Blue (#2D89B5):** Used for primary actions, active states, and brand-heavy components.
- **Deep Navy (#1E3A5F):** Reserved for high-level headings and primary text to ensure maximum readability and a sense of establishment.
- **Secondary Greens:** Used to denote "Essencial" items, freshness (produce/cleaning), and success states.
- **Gold Accent (#F2C94C):** Used sparingly for "value" callouts, ratings, and promotional highlights to draw the eye without over-stimulating the user.

The default mode is **Light**, utilizing a clean white base with subtle grey-blue backgrounds to define different content sections.

## Typography
The typography system uses **Plus Jakarta Sans** for its modern, friendly, and highly legible characteristics. Its rounded terminals echo the approachable nature of the brand. For technical data and UI labels, **Inter** is used to provide a crisp, utilitarian contrast.

**Bilingual Considerations:** 
Line heights are intentionally generous (1.5x minimum for body text) to accommodate Portuguese diacritics (like Ã, Ã, and Ã) which can otherwise clash with descending characters on the line above. Headlines use a tighter tracking but maintain a heavy weight to establish a clear hierarchy.

## Layout & Spacing
The system operates on an **8px baseline grid**. This ensures mathematical harmony across all components.

**Grid Model:**
- **Desktop:** 12-column fluid grid with 24px gutters and 64px side margins. 
- **Tablet:** 8-column fluid grid with 24px gutters and 32px side margins.
- **Mobile:** 4-column fluid grid with 16px gutters and 16px side margins.

Content should follow a "vertical rhythm," where spacing between different sections (e.g., Category Headings and Product Grids) is always a multiple of the 8px base unit.

## Elevation & Depth
Hierarchy is established through **Tonal Layers** and **Ambient Shadows**. 

1.  **Level 0 (Surface):** The main background color (#FFFFFF).
2.  **Level 1 (Subtle Lift):** Cards and containers use a very soft, diffused shadow (15% opacity of Navy #1E3A5F) with a 12px blur. This creates a "reachable" feel for product items.
3.  **Level 2 (Active/Interactive):** Elements being hovered or interacted with increase their shadow spread and slightly shift upwards (Y-axis -2px).
4.  **Overlays:** Modals and menus use a backdrop blur (12px) with a 40% opacity overlay to keep the user focused on the immediate task.

## Shapes
This design system uses a **Rounded (Level 2)** shape language. 
- **Buttons & Inputs:** 0.5rem (8px) radius.
- **Product Cards & Banners:** 1rem (16px) radius for a friendlier, consumer-centric look.
- **Icon Containers:** Circular (pill) shapes are used to distinguish category icons from product images.

This level of roundedness avoids the "stiffness" of sharp corners while maintaining enough structure to appear professional and organized.

## Components

### Buttons
- **Primary:** Filled Blue (#2D89B5) with White text. Bold weight.
- **Secondary:** Outlined Green (#5DB075) with 2px border.
- **Ghost:** For less important actions, using Navy text with no background.

### Input Fields
Inputs must have a clear label (Inter, Bold) and a 1px border (#CBD5E1). On focus, the border transitions to Primary Blue with a subtle 2px outer glow.

### Product Cards
Cards feature a Level 1 elevation. The top 60% is dedicated to the product image, while the bottom 40% contains the title, price in Meticais (MT), and a secondary-style "Add" button.

### Language Switcher
A prominent toggle or dropdown in the header, using localized flags or text ("EN" / "PT"), ensuring that the user can switch contexts at any point in the journey.

### Chips & Tags
Use soft-filled backgrounds. Category chips for "Cleaning" should use a light green tint, while "Promotions" should use a light gold tint to match the brand accents.
---
name: PickNLoad Logistics System
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daea'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eefe'
  surface-container-high: '#e2e8f8'
  surface-container-highest: '#dce2f3'
  on-surface: '#151c27'
  on-surface-variant: '#534434'
  inverse-surface: '#2a313d'
  inverse-on-surface: '#ebf1ff'
  outline: '#867461'
  outline-variant: '#d8c3ad'
  surface-tint: '#855300'
  primary: '#855300'
  on-primary: '#ffffff'
  primary-container: '#f59e0b'
  on-primary-container: '#613b00'
  inverse-primary: '#ffb95f'
  secondary: '#575e70'
  on-secondary: '#ffffff'
  secondary-container: '#d9dff5'
  on-secondary-container: '#5c6274'
  tertiary: '#006e2d'
  on-tertiary: '#ffffff'
  tertiary-container: '#4ac86a'
  on-tertiary-container: '#004f1f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffddb8'
  primary-fixed-dim: '#ffb95f'
  on-primary-fixed: '#2a1700'
  on-primary-fixed-variant: '#653e00'
  secondary-fixed: '#dce2f7'
  secondary-fixed-dim: '#c0c6db'
  on-secondary-fixed: '#141b2b'
  on-secondary-fixed-variant: '#404758'
  tertiary-fixed: '#7ffc97'
  tertiary-fixed-dim: '#62df7d'
  on-tertiary-fixed: '#002109'
  on-tertiary-fixed-variant: '#005320'
  background: '#f9f9ff'
  on-background: '#151c27'
  surface-variant: '#dce2f3'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
  headline-lg:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-lg-bold:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-md-medium:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.25rem
  space-xl: 1.5rem
---

## Brand & Style

The design system establishes a focused, high-utility operational environment for intra-city freight and commercial hauling across India. The aesthetic eliminates all ornamental overhead—no abstract geometry, no decorative illustrations, no emojis, and zero glassmorphism or gradient treatments. 

Every view delivers immediate clarity, high scannability in high-glare outdoor environments, and extreme operational speed for drivers, business owners, and logistics coordinators. The visual approach is practical modern minimalism: clean outlines, pure neutral foundations, high-contrast typography, and purposeful amber accents that guide high-priority dispatch actions.

## Colors

The application operates strictly on a high-legibility light theme:

- **Canvas & Card Base:** Strictly pure white (`#FFFFFF`). Never introduce lavender, off-white, slate tints, or colored atmospheric background washes.
- **Primary Accent (`#F59E0B`):** Warm amber used for active booking triggers, confirmation buttons, selected trip tabs, and actionable highlights. Text placed inside primary amber buttons must use high-contrast dark slate (`#111827`).
- **Primary Text (`#111827`):** Near-black slate for maximum contrast on headlines, pricing numerals, and essential vehicle specs.
- **Secondary Text & Muted Elements (`#6B7280`):** Neutral gray for supporting metadata, field placeholders, timestamps, and route breadcrumbs.
- **Borders & Dividers (`#E5E7EB`):** Crisp, single-pixel architectural bounding lines separating cards, list items, and form elements.
- **Semantics:** Verified badges, live delivery tracking statuses, and positive confirmations use Green (`#16A34A`). Rejections, cancellations, urgent warnings, and form errors use Red (`#DC2626`).

## Typography

The typography uses Inter across all levels to maintain crisp screen legibility at varying viewing angles and device sizes. 

- Headings are kept at a solid 22px bold hierarchy for primary view titles and trip stages, descending to 18px semi-bold for vehicle sub-headers.
- Body content defaults to 14px and 16px to guarantee direct readability for drivers and customers handling loading manifests on the move.
- All monetary quotes must use the Rupee symbol (`₹`) directly prefixed to the numerical value (e.g., `₹850`) without a space.
- Terminology rule: Logistics movements must strictly be identified as **"trip"** or **"request"**. Do not use "ride", "cab", or passenger terms.

## Layout & Spacing

The layout model is anchored by fixed horizontal safety gutters of 20px (`1.25rem`) on mobile viewports, ensuring content never clips edge bezels during single-hand operation. 

- **Vertical Rhythm:** Default structural gap between distinct operational components, form cards, and status modules is strictly 16px (`1rem`).
- **Touch Ergonomics:** All touch targets maintain an absolute minimum height and width of 48px to prevent missed inputs. Primary operational action bars sit pinned at the bottom within thumb reach, cleared by standard safe-area insets.
- **Multi-Column Adaptability:** On wider tablet and desktop dispatch dashboards, modules reflow into a clean 12-column grid system with 16px gutters, keeping trip detail drawers and live route maps side-by-side without inflating card paddings beyond 24px.

## Elevation & Depth

Visual hierarchy uses physical low-contrast containment rather than deep shadows:

- **Base Cards & Modules:** Surfaces rely on `#FFFFFF` fills wrapped in a clean, sharp `1px solid #E5E7EB` border.
- **Ambient Floor Shadow:** A single, whisper-light drop shadow adds subtle separation against pure white backgrounds: `0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)`.
- **Active & Dragged Modals:** Elevated bottom sheets or interactive driver assignment dialogs use an understated lift: `0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)`, retaining the `1px solid #E5E7EB` edge definition.
- **No Heavy Blur or Tinting:** Frosted glass, chromatic drop shadows, and high-intensity dark elevation tiers are completely prohibited.

## Shapes

The geometric architecture is calculated and purposeful:

- **Cards & Summary Modules:** Exactly 16px border-radius (`rounded-2xl` equivalent). This gives individual freight quotes, vehicle categories (Tata Ace, 8ft Pickup, 3-Wheeler), and trip summaries a defined boundary.
- **Interactive Controls & Inputs:** Buttons, text input boxes, dropdown selectors, and search fields use a 12px border-radius.
- **Status Tags & Mini Chips:** Badges and quick vehicle filter chips use an 8px border-radius or fully rounded pill geometry (`9999px`) to immediately visually differentiate tags from tappable button controls.

## Components

### Buttons
- **Primary Action (Dispatch / Confirm Request):** Minimum height of 52px. Solid background `#F59E0B`, text `#111827` (Inter 16px semi-bold). 12px corner radius. No gradients or inner glow. Full-width on mobile.
- **Secondary Action (Cancel Request / Call Driver):** Minimum height of 52px. Pure white `#FFFFFF` surface with `1px solid #E5E7EB` border. Text `#111827`.
- **Destructive Action:** White background with `1px solid #DC2626` border and `#DC2626` text, or filled `#DC2626` with `#FFFFFF` text for irreversible actions.

### Cards & Vehicle Selectors
- Background: `#FFFFFF`.
- Border: `1px solid #E5E7EB`.
- Corner Radius: `16px`.
- Padding: 16px to 20px internal spacing.
- Selected State: Vehicle tier cards (e.g., Tata Ace / 1 Ton) switch border to `2px solid #F59E0B` with an amber tint badge indicator, while keeping the interior background pure white.

### Form Inputs & Address Fields
- Height: Minimum 50px.
- Corner Radius: `12px`.
- Surface: `#FFFFFF` with `1px solid #E5E7EB`. Focus state triggers `1.5px solid #F59E0B` with zero outer ring bloom.
- Typography: 15px `#111827`, placeholder text in `#6B7280`.

### Chips & Status Indicators
- **Trip Status Chips:** Verified driver or active trip badges use light green backgrounds (`#DCFCE7`) with bold `#16A34A` text and icons.
- **Vehicle Specs (Payload / Dimensions):** Neutral chips with `#F3F4F6` background, `#374151` text, 6px padding, 8px radius.

### Iconography
- Icons must strictly use Material Symbols Outlined or minimalist outline SVGs with a unified 2px stroke width.
- Color aligns directly with parent context (`#111827` for navigational icons, `#6B7280` for secondary pickup/drop points, `#16A34A` for verified checkmarks).
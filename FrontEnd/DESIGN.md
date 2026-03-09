# Design System: Healance — Emergency Medical Response Platform
**Project ID:** 7086746035178076332

---

## 1. Visual Theme & Atmosphere

Healance exudes a **clinical yet urgent** character — a dual-mode system that balances calm authority with emergency readiness. The light-mode screens feel **crisp, airy, and institutionally clean**: white surfaces dominate with subtle grey tones creating a sterile, trustworthy environment reminiscent of a modern hospital. The dark-mode variant and hero sections adopt a **deep oceanic teal-black** atmosphere that conveys the gravity of emergency medicine — powerful without being oppressive.

The overall density is **medium-tight**: content is packed purposefully with consistent breathing room, not sparse. There is a clear sense of **information hierarchy**: critical data (vitals, ETAs, alerts) is given visual dominance through aggressive type size and the signature cyan accent color, while secondary information recedes into soft slate grays.

The UI philosophy is **function-first with a premium finish**: no decorative flourishes, but shadows, rounded corners, and micro-animations are used with intention to communicate state and urgency.

---

## 2. Color Palette & Roles

| Descriptive Name | Hex Code | Functional Role |
|---|---|---|
| **Healance Cyan** — the electric, life-affirming teal | `#00cbe6` | Primary action color: buttons, active navigation states, links, progress bars, ETA timers, and all interactive call-to-action elements. The brand's voice. |
| **Emergency Red** — a high-saturation signal crimson | `#ef4444` | Danger and urgency only: active emergency headers, pulse animations, critical alert banners, "Cancel Alert" hover states, high-urgency icons. |
| **Deep Clinical Night** — near-black teal-slate | `#0f2123` | Dark surface backgrounds (dark mode body, hero sections, telehealth cards). Grounds the UI in a serious, high-stakes atmosphere. |
| **Frost White** — pure medical white | `#ffffff` | Primary card and panel surface. The base layer for all light-mode content containers. |
| **Sterile Light Grey** — barely-blue off-white | `#f5f8f8` | Page background in light mode. Creates a subtle visual separation from white cards without using a harsh grey. |
| **Slate Mist** — soft blue-grey | Tailwind `slate-100` / `#f1f5f9` | Secondary panel backgrounds, table headers, sidebar hover states, inactive button fills. |
| **Slate Mid-tone** — calm informational grey | Tailwind `slate-500` / `#64748b` | Secondary text: labels, metadata, timestamps, supporting descriptions. |
| **Slate Deep** — authoritative near-black | Tailwind `slate-900` / `#0f172a` | Primary text: headings, values, patient names, critical data points. |
| **Caution Amber** — restrained warning yellow | Tailwind `amber-500` / `#f59e0b` | Degraded or borderline vitals (SpO2 at 91%), "In Surgery" status, mid-level warning states. |
| **Vitality Green** — confident success | Tailwind `green-500` / `#22c55e` | Positive states: "Available" doctor status, monitoring active badge, successful vitals, progress confirmed. |

---

## 3. Typography Rules

**Font Family:** **Inter** exclusively — a humanist sans-serif chosen for its exceptional legibility at both display and data sizes, which is critical in high-stress medical contexts.

**Weight Hierarchy:**
- **Font Black (900) / Font Bold (800):** Used for emergency headings (`text-4xl`–`text-6xl`), critical metric values (vitals like "142 BPM", ETA countdowns "4 Minutes"), and hero titles. Maximum visual urgency.
- **Font Bold (700):** Section headings, card titles, doctor names, button labels, navigation item labels.
- **Font Semibold (600):** Sub-headings, status labels, emphasis within body text.
- **Font Medium (500):** Supporting body text, descriptions, notification messages.
- **Font Regular (400):** Fine print, timestamps, metadata, table cell data.

**Letter Spacing:**
- Headings use tight tracking (`tracking-tight` / `-0.015em` to `-0.033em`): creates the compact authority of medical signage.
- Uppercase labels and status badges use `tracking-wider` / `tracking-widest`: mimics clinical form labels.
- Body text is set at default tracking for maximum readability comfort.

**Size Scale:** Follows Tailwind's fluid scale. Key landmarks: `4xl`–`5xl` for page heroes, `xl`–`2xl` for section headers, `sm`–`base` for body, `xs`–`[10px]` for badges and metadata.

---

## 4. Component Stylings

### Buttons
- **Primary Action:** Pills shape with **8px border radius** (`rounded-xl`). Filled with **Healance Cyan** (`#00cbe6`). Text is dark (`text-slate-900` or `text-white` depending on context) in bold weight. Includes a soft colored shadow (`shadow-lg shadow-primary/20`) that subtly glows in the brand color. Hover state brightens or uses opacity reduction.
- **Emergency Primary:** Same shape. Filled with **Emergency Red** (`#ef4444`). Uses `hover:bg-red-600` for darkening on interaction. Active scale-down via `active:scale-95`.
- **Secondary / Ghost:** Same rounded shape. Background is `slate-100` or transparent. Border `border-slate-200` for the outlined variant. Text uses `slate-600`/`slate-700`. Hover triggers a soft slate fill.
- **Destructive (Cancel):** Transparent base with slate border, text in `slate-400`. Hover shifts to red-tinted: `hover:bg-red-50 hover:text-red-500 hover:border-red-200`.
- **Navigation CTAs:** All buttons in the nav are `rounded-lg` (smaller radius), shorter padding.

### Cards & Containers
- **Standard Card:** White background (`bg-white`). Generously rounded corners: `rounded-xl` (12px). Border: a hairline `border border-slate-100` or `border-slate-200`. Shadow: whisper-soft `shadow-sm` — a barely-there diffused lift.
- **Alert/Status Cards:** Red-tinted panels use `bg-red-50 border-red-100 rounded-xl`. No shadow — the color itself communicates urgency.
- **Left-accent Cards:** AI assistants and informational panels use a left border stroke (`border-l-4` or `border-l-8`) in Cyan or Emergency Red. Background remains light.
- **Dark Surface Cards:** Telehealth and doctor feature panels use `bg-slate-900` with white text. Contain subtle `opacity-10` watermark icons for visual depth.
- **Info Boxes:** Use `bg-primary/5 border border-primary/20 rounded-xl` — a very faint cyan wash that signals supplemental help content.

### Navigation & Sidebar
- Active nav items use `bg-primary/10 text-primary` with a **right-side 4px cyan border** (`border-r-4 border-primary`) — a strong directional accent that definitively shows current location.
- Inactive items are `text-slate-600`, hover triggers `bg-slate-50`.
- The sidebar itself is white on light-mode, with a right border separator.

### Inputs & Forms
- Text areas and inputs: `bg-background-light` (`#f5f8f8`) fill with `border border-slate-200` stroke. On focus: `ring-2 ring-primary` (cyan focus ring, removes border). No box shadow. Subtly rounded at `rounded-lg`.
- Progress bars: `rounded-full` track in `bg-slate-100`, filled with Cyan. Height varies: `h-2` for subtle progress, `h-3` for more prominent tracking.

### Badges & Pills
- Status badges: `rounded-full` pill shapes, color-coded by status (amber for "En Route", blue for "Assigned", green for "Treated", red for "Critical").
- Priority badges: `rounded` (4px) — subtly less soft than status badges. More rectangular and label-like.
- Badge pills in profiles: `rounded-full` with matching background and border (e.g., `bg-primary/10 border-primary/20` for the Hero Badge).

### Icons
- **Font:** Material Symbols Outlined (`font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24`). Outlined style across the entire application.
- **Size:** `text-lg`–`text-3xl` depending on context. Navigation: 24px default. Display icons in hero: 48px+.
- **Color:** Inherits from parent text color. Active/accent icons use `text-primary`. Warning icons use `text-red-500`. Success icons use `text-green-500`.

### Map Components
- Map areas use a real photograph as the background (`background-image` with Google image URL). Applied with `bg-cover bg-center` and a slight `opacity-80` or `grayscale` to desaturate without losing context.
- Location pins are `rounded-full` circles: patient pin uses brand cyan fill with `animate-ping` pulse ring. Doctor pin uses a real photo avatar with a green border and a medical_services badge overlay.
- ETA badges float above pins: dark `bg-slate-900` background with white text and a green pulse indicator.

---

## 5. Layout Principles

**Grid System:** Responsive two-column or three-column grids using Tailwind's `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`. Desktop-first for dashboard screens, center-column constrained for content-heavy pages (`max-w-[800px]` or `max-w-[960px]`).

**Sidebar Pattern:** Left sidebar of 256px (`w-64`) for all dashboard views (Patient, Doctor, Admin). Sidebar is hidden on mobile, replaced by bottom navigation or drawers. The main content area takes `flex-1`.

**Whitespace Strategy:** Generous, consistent. Section gaps: `gap-6` to `gap-8`. Internal card padding: `p-6` standardized. Section headers get `mb-4`–`mb-6`. This creates a measured, clinical breathing room that aids readability without feeling overly sparse.

**Sticky Headers:** All main navigation headers use `sticky top-0 z-50 bg-white/80 backdrop-blur-md` — a frosted glass effect that maintains context while scrolling without obscuring content.

**Full-Bleed Map Pages:** The Live Emergency Map and Doctor Navigation use `h-screen overflow-hidden flex` layouts to create a true full-screen experience where the map fills all available space and UI panels float over or alongside it.

**Responsive Breakpoints:** Mobile-first responsive with key breakpoints at `md:` (768px) for sidebar activation and layout switching, and `lg:` (1024px) for full three-column layouts. Mobile views use vertical stacking with the same design tokens.

---

## 6. Motion & State

- **Pulse Animations:** Two types — `animate-ping` for patient location dots (expanding ring for "Here I am"), and `animate-pulse` for live status indicators (breathing dot for "system active").
- **Hover Transitions:** `transition-colors` on all interactive elements. Duration: Tailwind default (150ms). No complex easing — crisp and immediate.
- **Scale Feedback:** `active:scale-95` on primary buttons for tactile press confirmation.
- **Progress Bars:** Static width set via inline style (`width: 75%`) — would animate in production with CSS/JS transitions.

---

## Reference Screens

| Screen | ID | Viewport |
|---|---|---|
| Landing Page | `00e0875881ee4bdda2bd5f5d783e0649` | Desktop (1280px) |
| Patient Dashboard | `65677caff9a5439d91b6f006a9c06c76` | Desktop (1280px) |
| Emergency Mode | `8ea57ac62ad5439ba1ab8dd8cd9a1a47` | Desktop (1280px) |
| Live Emergency Map | `b69280c28d1f43a8a6a97cd2a1b8e9cc` | Desktop (1280px) |
| Doctor Alert | `ca70d66d38c544f4992e8168ca5099b1` | Desktop (1280px) |
| Doctor Navigation | `8206b84d5ce7455a977790fd1d9dd308` | Desktop (1280px) |
| Doctor Profile | `bafeeeb8dff14127a8c10e12a79e5e08` | Desktop (1280px) |
| Incident Report | `5afd775f0575497185f746f9edd38ca3` | Desktop (1280px) |
| Admin Dashboard | `54feef3540794a739a38903ce58a429a` | Desktop (1280px) |

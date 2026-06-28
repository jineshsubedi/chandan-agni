If your goal is to **recreate the Agni Group website design**, you don't need all the business information—you need the **information architecture, page sections, visual hierarchy, components, and design system**.

## Site Structure

The main navigation appears to be: ([agnigroup.com.np][1])

```
Home
About
 ├── Who We Are
 ├── Our Story
 ├── Network
 └── Foundation

Companies

Media
 ├── News & Events
 ├── Reviews
 └── Gallery

Career

Location
 ├── Corporate Office
 └── Branches & Dealers

Online Payment
```

---

# Homepage Layout Breakdown

## 1. Header

**Style**

* Transparent header over hero section
* Logo on left
* Multi-level dropdown navigation
* Desktop mega-menu style
* Mobile hamburger menu

**Components**

* Company logo
* Navigation menu
* CTA links

---

## 2. Hero Section

### Content

Headline:

> We believe in Products, Services and Possibilities

Subsection:

> Agni began business in 1991 as the authorized distributors of Mahindra utility vehicles.

Supporting text about company history. ([agnigroup.com.np][1])

### Design Pattern

* Full-width hero
* Large background image/video
* White typography
* Overlay gradient
* CTA button: "Explore"

Suggested layout:

```
------------------------------------------------
| NAVBAR                                       |
------------------------------------------------
|                                               |
|  We believe in Products, Services             |
|  and Possibilities                            |
|                                               |
|  Company introduction                         |
|                                               |
|  [Explore]                                    |
|                                               |
------------------------------------------------
```

---

## 3. About Section

Headline:

> Commanding. Confident. Bright. Impressive. Warm. ([agnigroup.com.np][1])

Content block introducing Agni's brand personality.

### Layout

Two-column layout:

```
-----------------------------------------
| Text                    | Image       |
|                          |             |
| About Agni Group         |             |
| Description              |             |
| [Explore]                |             |
-----------------------------------------
```

---

## 4. Group Companies Section

Headline:

> Agni is a group of many companies, each a market leader in its own sector. ([agnigroup.com.np][1])

### Visual Pattern

Grid of company logos/cards.

Possible companies include: ([agnigroup.com.np][2])

* Agni Incorporated
* Agni Moto
* Agni Energy
* Agni Logistics
* Balaju Auto Works
* Agni Hire Purchase
* Agni Aastha
* Agni Technical Institute

### Layout

```
[logo] [logo] [logo] [logo]

[logo] [logo] [logo] [logo]
```

Hover effects likely used.

---

## 5. Network Section

Headline:

> Comprising of 80 plus dealers and branches across the country. ([agnigroup.com.np][1])

### Layout

* Large Nepal map
* Dealer statistics
* Regional coverage information
* CTA button

```
----------------------------
| Nepal Map                |
|                           |
| 80+ Branches             |
| Nationwide Coverage      |
| [Explore]                |
----------------------------
```

---

## 6. Brand Stories / CSR Showcase

Section title:

> Mahindra spirit to the top of the world ([agnigroup.com.np][1])

Features:

### Story Card 1

Kabita Nepali

* Everest + Lhotse summit achievement

### Story Card 2

Nisha Adhikari

* Everest summit achievement

### Design

Carousel slider:

```
---------------------------------
| Image Gallery                 |
|                               |
| Story Title                   |
| Description                   |
|                               |
| [Previous] [Next]             |
---------------------------------
```

---

## 7. Global Partners

Title:

> Global Partners and Associates ([agnigroup.com.np][1])

### Layout

Logo cloud

```
[logo][logo][logo][logo]

[logo][logo][logo][logo]
```

Common pattern:

* grayscale logos
* hover color effect

---

## 8. Affiliations

Title:

> Our Affiliations ([agnigroup.com.np][1])

Another logo grid.

---

## 9. Footer

Footer navigation includes: ([agnigroup.com.np][1])

```
ABOUT
COMPANIES
NETWORK
NEWS & EVENTS
CORPORATE OFFICE
```

Additional elements:

* Copyright
* Social links
* Contact information

---

# Design System

Based on the visual identity:

### Color Palette

Primary:

```css
--red: #c8102e;
```

Secondary:

```css
--dark: #111111;
--gray: #555555;
--light-gray: #f5f5f5;
--white: #ffffff;
```

---

### Typography

Likely uses:

```css
Heading:
font-weight: 700-800;

Body:
font-weight: 400-500;
```

Suggested replacements:

* Montserrat
* Poppins
* Inter

---

### Button Style

```css
padding: 14px 28px;
border-radius: 4px;
background: #c8102e;
color: white;
font-weight: 600;
```

---

### Spacing

```css
section-padding: 100px 0;
container-width: 1200px;
grid-gap: 32px;
```

---

# Recommended Modern Tech Stack

To recreate it today:

### Frontend

* Next.js 15
* React
* TypeScript
* Tailwind CSS
* Framer Motion

### UI Components

* Shadcn/UI
* Radix UI

### Animations

* GSAP (hero effects)
* Framer Motion (scroll reveals)

### CMS

* Sanity
* Strapi
* Payload CMS

---

# Page Components Inventory

You would need approximately:

```txt
Navbar
Mobile Menu
Hero Banner
Section Heading
CTA Button
Company Card
Logo Grid
Story Carousel
Image Gallery
Branch Map
Timeline Component
Leadership Card
Value Card
Career Card
Contact Form
Footer
```

This is enough to reproduce the site as a modern React/Next.js implementation while preserving nearly all of the original content hierarchy and user experience. ([agnigroup.com.np][1])

[1]: https://www.agnigroup.com.np/ "Authorized distributors of Mahindra | Agni Group | Nepal"
[2]: https://www.agnigroup.com.np/about/our-story?utm_source=chatgpt.com "Our Story"

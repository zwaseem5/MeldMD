
# New Life Marketing Site

A modern, aesthetic marketing website for New Life built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Modern Design**: Clean, clinical, and trustworthy design with deep navy/slate and teal accents
- **Smooth Animations**: Tasteful micro-animations with Framer Motion (150-250ms duration)
- **Responsive**: Mobile-first design that works on all devices
- **Accessibility**: WCAG compliant with focus states, color contrast, and reduced motion support
- **SEO Optimized**: Meta tags, Open Graph, structured data, and semantic HTML
- **Contact Forms**: Working contact and demo booking forms with validation
- **Performance**: Optimized for fast loading and smooth interactions
- **Analytics Ready**: Optional Plausible/Umami integration

## 🛠 Tech Stack

- **React 19** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Hook Form** for form handling
- **Vite** for build tooling

## 📁 Project Structure

```
src/
├── components/
│   ├── base/           # Reusable UI components
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   └── feature/        # Feature-specific components
│       ├── SiteHeader.tsx
│       ├── Hero.tsx
│       ├── Footer.tsx
│       └── BackToTop.tsx
├── pages/              # Page components
│   ├── home/
│   ├── meld-health/
│   ├── meld-creative/
│   ├── providers/
│   ├── about/
│   ├── contact/
│   ├── legal/
│   └── NotFound.tsx
├── router/             # Routing configuration
└── styles/             # Global styles

public/
├── robots.txt          # SEO crawler instructions
├── sitemap.xml         # Site structure for search engines
└── og-image.jpg        # Social media preview image
```

## 🎨 Design System

### Colors
- **Primary**: Teal (#14B8A6)
- **Secondary**: Deep Navy/Slate (#0F172A, #1E293B)
- **Accent**: Various teal shades
- **Text**: Slate grays (#334155, #64748B)

### Typography
- **Headings**: Inter (Bold/Semibold)
- **Body**: Inter (Regular/Medium)
- **Logo**: Pacifico (Serif)

### Animations
- Hover effects: 150ms ease
- Page transitions: 200ms ease-out
- Micro-interactions: 150-250ms
- Respects `prefers-reduced-motion`

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd meldmd-marketing
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Contact form (optional - graceful fallback if missing)
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=hello@newlife.com

# Analytics (optional - only loads when set)
VITE_ANALYTICS_DOMAIN=your_analytics_domain
```

**Important**: Never commit actual API keys to the repository. Use `.env.local` for local development and set environment variables in your deployment platform.

## 📄 Pages

### Home (`/`)
- Hero section with compelling tagline and parallax effect
- "What we do" cards linking to service pages
- Wellness categories with anchor links and inquiry buttons
- Sister brands showcase
- FAQ accordion
- Trust highlights and social proof

### MeldWell (`/meld-health`)
- MeldWell™ telehealth platform overview
- Feature highlights and benefits
- More Active platform integration
- Demo booking CTA

### Providers (`/providers`)
- Medication categories overview
- Provider support services
- Quality assurance information
- Bulk inquiry options

### About (`/about`)
- Company mission and story
- Team member profiles
- Core values
- Complete network brands
- MeldWell platform details

### Contact (`/contact`)
- Contact information with clickable links
- Dual forms (General Contact / Demo Booking)
- Server-side validation with inline errors
- FAQ section
- URL parameter support for prefilled subjects

### Legal
- Privacy Policy (`/legal/privacy`)
- Terms of Service (`/legal/terms`)

### 404 Page
- Friendly error message
- Quick navigation links
- Call-to-action buttons

## 🎯 Key Features

### Navigation
- Sticky header with smooth scroll detection
- Mobile-responsive hamburger menu
- Smooth anchor scrolling
- Back-to-top button (appears after 50% scroll)

### Forms
- Contact form with comprehensive validation
- Demo booking form (shorter version)
- Server-side validation with inline error display
- Character limits and real-time feedback
- Graceful fallback if API is unavailable
- URL parameter support for prefilled content

### Animations
- Scroll-triggered animations with reduced motion support
- Hover effects on all interactive elements
- Hero parallax effect (disabled for reduced motion)
- Page transition animations
- Loading states

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Visible focus indicators on all interactive elements
- Alt text for all images
- Color contrast compliance
- Reduced motion support
- Semantic HTML structure

### SEO Features
- Meta tags for all pages
- Open Graph and Twitter cards
- Structured data (JSON-LD)
- Canonical URLs
- Sitemap and robots.txt
- Semantic HTML structure
- Performance optimized

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel (Recommended)

1. **Connect Repository**:
   - Connect your GitHub repository to Vercel
   - Vercel will auto-detect the Vite configuration

2. **Set Environment Variables** in Vercel dashboard:
   ```
   RESEND_API_KEY=your_actual_api_key
   CONTACT_TO_EMAIL=hello@newlife.com
   VITE_ANALYTICS_DOMAIN=newlife.com
   ```

3. **Deploy**:
   - Automatic deployment on push to main branch
   - Preview deployments for pull requests

### Other Hosting Providers

For other providers, upload the `dist/` folder after running `npm run build`.

## 🔧 Configuration

### Analytics Setup

To enable analytics tracking:

1. Set `VITE_ANALYTICS_DOMAIN` in your environment variables
2. The script will automatically load Plausible analytics
3. To use a different analytics provider, modify the script in `index.html`

**Turn On**: Set `VITE_ANALYTICS_DOMAIN=yourdomain.com`
**Turn Off**: Remove or leave empty the `VITE_ANALYTICS_DOMAIN` variable

### Tailwind CSS
Custom configuration in `tailwind.config.ts`:
- Extended color palette
- Custom fonts
- Animation utilities

### Vite
Configuration in `vite.config.ts`:
- React plugin
- Build optimizations
- Path aliases

## 📱 Mobile Optimization

- Mobile-first responsive design
- Touch-friendly interactive elements (44px minimum)
- Optimized images and assets
- Fast loading on mobile networks
- Sticky mobile navigation

## 🔍 SEO Features

- **Meta Tags**: Comprehensive meta tags for all pages
- **Open Graph**: Social media preview cards
- **Structured Data**: JSON-LD for rich snippets
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Crawler instructions
- **Canonical URLs**: Prevent duplicate content
- **Performance**: Optimized for Core Web Vitals

## 🎨 Customization Guide

### Content Updates

**Homepage Content**:
- Edit `src/pages/home/page.tsx`
- Update offers, categories, and FAQ data
- Modify hero content and CTAs

**About Page**:
- Edit `src/pages/about/page.tsx`
- Update team members, values, and network brands
- Modify mission statement and company story

**Contact Information**:
- Edit `src/pages/contact/page.tsx` and `src/components/feature/Footer.tsx`
- Update phone numbers, email addresses, and business hours

### Design Changes

**Colors**:
- Update `tailwind.config.ts` for theme colors
- Modify CSS custom properties in `src/index.css`

**Fonts**:
- Update font imports in `index.html`
- Modify font families in Tailwind config

**Images**:
- Replace Stable Diffusion URLs with actual brand assets
- Update Open Graph images in `public/`

### Adding New Wellness Categories

1. Edit the `categories` array in `src/pages/home/page.tsx`
2. Add new category object with title, items, and anchor
3. Ensure anchor links work with navigation

### Adding New Sister Brands

1. Update `sisterBrands` array in `src/pages/home/page.tsx`
2. Update `networkBrands` array in `src/pages/about/page.tsx`
3. Add appropriate links and descriptions

## 📞 Support & Contact

For questions or support:
- **Email**: hello@newlife.com
- **Phone**: 1-800-NEWLIFE
- **Hours**: Monday - Friday, 9:00 AM - 6:00 PM EST

## 🚀 Going Live Checklist

### Pre-Launch
- [ ] Set up production environment variables
- [ ] Test contact forms in production
- [ ] Verify analytics tracking
- [ ] Test all navigation and links
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Test on multiple devices and browsers
- [ ] Verify SEO meta tags and structured data

### Domain & Hosting
- [ ] Connect custom domain to hosting provider
- [ ] Set up SSL certificate
- [ ] Configure DNS records
- [ ] Set up redirects (www to non-www or vice versa)

### Analytics & Monitoring
- [ ] Set up analytics tracking
- [ ] Configure error monitoring
- [ ] Set up uptime monitoring
- [ ] Test contact form submissions

### Final Checks
- [ ] All images loading correctly
- [ ] Contact forms working
- [ ] No console errors
- [ ] Mobile responsiveness
- [ ] Page load speeds
- [ ] Accessibility compliance

## 📄 License

This project is proprietary to New Life. All rights reserved.

---

Built with ❤️ for New Life using modern web technologies and best practices.

# LinkVoices Brand & UI Kit

## Brand Overview
**LinkVoices** is a modern cryptocurrency invoice platform that enables users to create, manage, and track crypto payments with ease. Our design philosophy emphasizes clarity, professionalism, and user-friendly interfaces for financial transactions.

---

## 🎨 Modern Dashboard (2024 Update)

### Overview
The LinkVoices dashboard has been modernized with contemporary UI/UX principles:
- **Vibrant gradient sidebar** with brand colors for strong visual identity
- **Elevated card designs** with shadows and hover effects for depth
- **Smooth micro-interactions** to enhance user engagement
- **Bold typography hierarchy** for better content scanning
- **Gradient backgrounds** for visual interest without clutter

### Key Improvements
1. **Sidebar Navigation**
   - Gradient background (cerulean blue)
   - User profile display
   - Icon animations on hover
   - Featured "Create Invoice" button with distinctive styling

2. **Dashboard Cards**
   - Larger rounded corners (`rounded-2xl`)
   - Gradient icon containers
   - Corner accent decorations
   - Status badges
   - Hover lift effects (`scale-105`)

3. **Color Strategy**
   - Each stat card uses meaningful colors (blue for total, green for paid, amber for pending, purple for wallets)
   - Gradient buttons for primary actions
   - Consistent cerulean blue brand presence

4. **Typography**
   - Larger page headings (3xl-4xl)
   - Bold weights for titles
   - Clear hierarchy with color and size
   - Improved readability

5. **Spacing & Layout**
   - More generous padding (p-6 to p-10)
   - Wider gaps between elements (gap-6 to gap-10)
   - Maximum width containers for better readability
   - Responsive grid layouts

---

## Design Principles

### 1. **Clarity First**
- Clean, uncluttered interfaces
- Clear visual hierarchy
- Obvious call-to-actions
- Readable typography

### 2. **Professional & Trustworthy**
- Subtle shadows and borders
- Consistent spacing
- Professional color palette
- Financial industry standards

### 3. **User-Centric**
- Intuitive navigation
- Helpful feedback
- Accessible design
- Mobile-responsive

---

## Color Palette

### Brand Colors (Cerulean Blue Theme)
- **Primary Blue**: `cerulean-blue-700` - Main brand color for headers and key elements
- **Primary Blue Dark**: `cerulean-blue-900` - Headings and important text
- **Primary Blue Medium**: `cerulean-blue-800` - Subheadings and body text
- **Primary Blue Light**: `cerulean-blue-600` - Interactive elements, buttons
- **Background Light**: `spring-wood-50` / `spring-wood-100` - Page backgrounds
- **Text Light**: `spring-wood-100` - Light text on dark backgrounds

### Button Colors
- **Primary Button**: `cerulean-blue-600` background, hover: `cerulean-blue-700`
- **Success Button**: `#059669` (green-600), hover: `#047857` (green-700)
- **Secondary Button**: Outlined with `cerulean-blue-700` border

### General Purpose Colors
- **Gray Background**: `#f9fafb` (gray-50)
- **Card Background**: `#ffffff` (white)
- **Border Color**: `#e5e7eb` (gray-200)
- **Text Primary**: `#111827` (gray-900)
- **Text Secondary**: `#6b7280` (gray-500)
- **Text Muted**: `#9ca3af` (gray-400)

### Status Colors
- **Warning**: `#d97706` (amber-600)
- **Error**: `#dc2626` (red-600)
- **Info**: `#0284c7` (sky-600)

### Currency Colors
- **Bitcoin**: `#f7931a` (Bitcoin orange)
- **Ethereum**: `#627eea` (Ethereum blue)
- **USDT**: `#26a17b` (Tether green)
- **DAI**: `#f4b731` (DAI yellow)

---

## Typography

### Font Family
- **Primary**: System fonts (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)
- **Fallback**: `sans-serif`

### Font Sizes & Hierarchy
- **Hero Heading (H1)**: `text-4xl md:text-7xl` - Main landing page title
  - Color: `text-cerulean-blue-900`
  - Weight: `font-bold`
  - Line height: `leading-tight`
  
- **Section Heading (H2)**: `text-3xl md:text-5xl` - Major section titles
  - Color: `text-spring-wood-50` (on dark) or `text-cerulean-blue-900` (on light)
  - Weight: `font-bold`
  - Line height: `leading-tight`

- **Subsection (H3)**: `text-xl md:text-2xl` - Subsection headers
  - Color: `text-cerulean-blue-800`
  - Weight: `font-semibold`

- **Card Title**: `text-lg` (18px) - Card titles
  - Weight: `font-semibold`

- **Body Text**: `text-base md:text-lg` - Main content
  - Color: `text-cerulean-blue-800` or `text-spring-wood-100` (on dark)
  - Weight: `font-medium`
  - Line height: `leading-relaxed`

- **Small Text**: `text-sm` (14px) - Helper text
  - Weight: `font-normal`

### Font Weights
- **Bold**: `font-bold` (700) - Hero headings, important titles
- **Semibold**: `font-semibold` (600) - Buttons, section titles
- **Medium**: `font-medium` (500) - Body text, labels
- **Regular**: `font-normal` (400) - Secondary text

---

## Spacing System

### Margins & Padding
- **Extra Small**: `1` (4px) - Fine adjustments
- **Small**: `2` (8px) - Tight spacing
- **Medium**: `3` (12px) - Standard spacing
- **Large**: `4` (16px) - Section spacing
- **Extra Large**: `6` (24px) - Card padding

### Gaps
- **Grid Gap**: `gap-4` (16px) - Form grids
- **Section Gap**: `gap-6` (24px) - Major sections
- **Vertical Spacing**: `space-y-3` (12px) - Form elements
- **Component Spacing**: `space-y-6` (24px) - Between cards

---

## Border Radius

### Modern Radius System (2024+)
- **Extra Large**: `rounded-2xl` (16px) - Modern dashboard cards, main containers
- **Large**: `rounded-xl` (12px) - Buttons, stat card icons, navigation items
- **Medium**: `rounded-lg` (8px) - Inputs, legacy components
- **Small**: `rounded` (4px) - Small elements, badges

### Usage Guidelines
- **Dashboard Cards**: `rounded-2xl` (modern, spacious feel)
- **Action Cards**: `rounded-2xl` with hover effects
- **Stat Icons**: `rounded-2xl` for large icons, `rounded-xl` for medium
- **Buttons**: `rounded-xl` (modern), `rounded-lg` (legacy)
- **Inputs**: `rounded-lg`
- **Badges/Pills**: `rounded-full`

---

## Modern Dashboard Design (2024+)

### Design Philosophy
The modern dashboard embraces contemporary UI/UX trends with:
- **Vibrant Gradients**: Subtle background gradients for depth
- **Elevated Cards**: Layered shadows for hierarchy
- **Smooth Animations**: Micro-interactions for engagement
- **Bold Typography**: Clear hierarchy with larger, bolder headings
- **Brand Colors**: Strong use of cerulean blue throughout

### Sidebar Design
```css
/* Modern Gradient Sidebar */
.lv-sidebar {
  @apply w-72 bg-gradient-to-b from-cerulean-blue-900 
         via-cerulean-blue-800 to-cerulean-blue-900 
         text-white shadow-xl;
}

/* Sidebar Navigation Item */
.lv-sidebar-nav-item {
  @apply flex items-center px-4 py-3 text-sm font-medium rounded-xl 
         transition-all duration-200 text-cerulean-blue-100 
         hover:bg-white hover:bg-opacity-10 hover:text-white;
}

/* Active Sidebar Item */
.lv-sidebar-nav-item-active {
  @apply bg-white bg-opacity-20 text-white shadow-lg;
}

/* Featured Action in Sidebar */
.lv-sidebar-featured-action {
  @apply flex items-center px-4 py-3 text-sm font-semibold rounded-xl 
         transition-all duration-200 bg-gradient-to-r 
         from-spring-wood-400 to-spring-wood-300 text-cerulean-blue-900 
         hover:from-spring-wood-300 hover:to-spring-wood-200 
         shadow-lg hover:shadow-xl hover:scale-105;
}
```

### Dashboard Background
```css
/* Modern gradient background for depth */
.lv-dashboard-bg {
  @apply min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100;
}
```

### Stat Cards with Visual Hierarchy
Each stat card uses:
- Gradient icon containers
- Corner accent (subtle gradient overlay)
- Status badges (rounded-full pills)
- Hover scaling effect (scale-105)
- Shadow progression (shadow-md → shadow-2xl)

### Action Cards
- **Primary Actions**: Full gradient background with white text
- **Secondary Actions**: White background with gradient icon and accent
- **Hover States**: Scale transformation + shadow enhancement
- **Icon Animations**: Subtle rotation or translation on hover

---

## Component Specifications

### Cards

#### Modern Dashboard Cards
```css
/* Stats Card - Modern with gradient accent */
.lv-stats-card {
  @apply bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl 
         transition-all duration-300 border border-gray-100 
         relative overflow-hidden;
}

/* Stats Card Gradient Accent (top-right corner) */
.lv-stats-card-accent {
  @apply absolute top-0 right-0 w-24 h-24 
         bg-gradient-to-br from-cerulean-blue-100 to-transparent 
         rounded-bl-full opacity-50;
}

/* Stats Card Icon Container */
.lv-stats-icon {
  @apply w-14 h-14 bg-gradient-to-br from-cerulean-blue-500 to-cerulean-blue-600 
         rounded-2xl flex items-center justify-center shadow-lg 
         group-hover:scale-110 transition-transform duration-300;
}

/* Action Card - For Quick Actions */
.lv-action-card {
  @apply group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl 
         transition-all duration-300 border border-gray-200 
         hover:border-cerulean-blue-300 overflow-hidden hover:scale-105;
}

/* Primary Action Card (Featured) */
.lv-action-card-primary {
  @apply group relative bg-gradient-to-br from-cerulean-blue-600 
         via-cerulean-blue-700 to-cerulean-blue-800 text-white 
         rounded-2xl p-6 shadow-lg hover:shadow-2xl 
         transition-all duration-300 overflow-hidden hover:scale-105;
}

/* Legacy Card (for backward compatibility) */
.lv-card {
  @apply bg-white border border-gray-200 rounded-lg p-6;
}
```

### Input Fields
```css
.lv-input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg text-sm 
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}
```

### Labels
```css
.lv-label {
  @apply block text-sm font-medium text-gray-700 mb-2;
}
```

### Buttons

**IMPORTANT**: 
- Always use `type="button"` for interactive buttons to prevent form submission conflicts
- LinkVoices uses DaisyUI components for consistent styling
- Use DaisyUI button classes: `btn btn-primary`, `btn btn-secondary`, etc.
- Add `font-semibold` for button text consistency
- Include transition effects: `transition-all duration-200`
- Add shadow effects: `shadow-md hover:shadow-lg` for primary buttons

```css
/* DaisyUI Button Classes (Recommended) */
.btn-primary {
  /* DaisyUI handles all styling automatically */
  /* Extend with: bg-cerulean-blue-600 hover:bg-cerulean-blue-700 text-white font-semibold */
}

/* Custom Button Extensions (if needed) */
.lv-btn-primary-full {
  @apply btn btn-primary w-full font-semibold;
}

.lv-btn-demo {
  @apply bg-cerulean-blue-600 hover:bg-cerulean-blue-700 border-cerulean-blue-700 
         text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200;
}

/* Legacy Tailwind Classes (Use DaisyUI instead) */
.lv-btn-primary-legacy {
  @apply px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg 
         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
         focus:ring-offset-2 transition-colors duration-200
         disabled:opacity-50 disabled:cursor-not-allowed;
}

/* Success Button */
.lv-btn-success {
  @apply px-4 py-3 bg-green-600 text-white text-sm font-bold rounded-lg 
         hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 
         focus:ring-offset-2 transition-colors duration-200
         disabled:opacity-50 disabled:cursor-not-allowed;
}

/* Secondary Button */
.lv-btn-secondary {
  @apply px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg 
         hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 
         focus:ring-offset-2 transition-colors duration-200
         disabled:opacity-50 disabled:cursor-not-allowed;
}

/* Outline Button */
.lv-btn-outline {
  @apply px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg 
         hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 
         focus:ring-offset-2 transition-colors duration-200
         disabled:opacity-50 disabled:cursor-not-allowed;
}

/* Text Link Button (for toggles like login/register) */
.lv-btn-text {
  @apply text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:underline
         transition-colors duration-200;
}
```

#### Button Usage Examples

```html
<!-- Primary Button (Login/Register Forms) - DaisyUI -->
<button 
  type="button"
  class="btn btn-primary w-full"
  :disabled="loading"
>
  Sign In
</button>

<!-- Secondary Button - DaisyUI -->
<button 
  type="button"
  class="btn btn-secondary"
>
  Cancel
</button>

<!-- Outline Button - DaisyUI -->
<button 
  type="button"
  class="btn btn-outline"
>
  Learn More
</button>

<!-- Text Link Button (Form toggles) -->
<button 
  type="button"
  class="text-blue-600 hover:text-blue-700 font-medium focus:outline-none focus:underline transition-colors duration-200"
  @click="toggleForm"
>
  Create account
</button>

<!-- Loading State Example with DaisyUI -->
<button type="button" class="btn btn-primary w-full" :disabled="loading">
  <span v-if="loading" class="loading loading-spinner loading-sm"></span>
  <span v-if="loading">Loading...</span>
  <span v-else>{{ isLogin ? 'Sign In' : 'Create Account' }}</span>
</button>
```

#### Input Field Examples

```html
<!-- DaisyUI Input Fields -->
<input 
  type="email" 
  placeholder="Email address" 
  class="input input-bordered w-full"
  required
/>

<input 
  type="password" 
  placeholder="Password" 
  class="input input-bordered w-full"
  required
/>

<!-- Input with Error State -->
<input 
  type="email" 
  placeholder="Email address" 
  class="input input-bordered input-error w-full"
  required
/>
```

### Select Dropdowns
```css
.lv-select {
  @apply w-full px-3 py-2 border border-gray-300 rounded-lg text-sm 
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
}
```

---

## Layout Patterns

### Modern Dashboard Layout (2024+)
```html
<!-- Dashboard Container with gradient background -->
<div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
  <div class="flex">
    <!-- Sidebar Component -->
    <DashboardSideBar />
    
    <!-- Main Content Area -->
    <main class="flex-1 p-6 md:p-10">
      <div class="max-w-7xl mx-auto">
        <!-- Page Header with Action Button -->
        <div class="mb-10">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl md:text-4xl font-bold text-cerulean-blue-900 mb-2">Page Title</h1>
              <p class="text-cerulean-blue-700 text-base md:text-lg">Description text</p>
            </div>
            <!-- Primary CTA -->
            <button class="hidden md:inline-flex items-center px-6 py-3 
                           bg-gradient-to-r from-cerulean-blue-600 to-cerulean-blue-700 
                           text-white font-semibold rounded-xl 
                           hover:from-cerulean-blue-700 hover:to-cerulean-blue-800 
                           shadow-lg hover:shadow-xl transform hover:scale-105 
                           transition-all duration-200">
              Action
            </button>
          </div>
        </div>
        
        <!-- Stats Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <!-- Modern stat cards -->
        </div>
        
        <!-- Content Cards -->
        <div class="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <!-- Main content -->
        </div>
      </div>
    </main>
  </div>
</div>
```

### Legacy Page Structure (for reference)
```html
<div class="min-h-screen bg-gray-50">
  <main class="p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Page Header -->
      <div class="flex items-center mb-6">
        <!-- Back link + Title -->
      </div>
      
      <!-- Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Main Content -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Cards -->
        </div>
        
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Sticky sidebar -->
        </div>
      </div>
    </div>
  </main>
</div>
```

### Form Layout
```html
<div class="bg-white border border-gray-200 rounded-lg p-6">
  <h3 class="text-lg font-semibold text-gray-900 mb-4">Section Title</h3>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="space-y-3">
      <!-- Form fields -->
    </div>
  </div>
</div>
```

---

## Icon System

### Icon Library
- **Primary**: Material Symbols Outlined
- **Fallback**: Unicode symbols for simple icons

### Currency Icons
- **Bitcoin**: `/images/btc-logo-blue.svg`
- **Ethereum**: `/images/eth-logo-blue.svg`
- **USDT**: `/images/tether-usdt-logo.svg`
- **DAI**: `/images/dai-logo-blue.svg`

### Icon Sizes
- **Small**: `w-4 h-4` (16px) - Inline with text
- **Medium**: `w-6 h-6` (24px) - Standard size
- **Large**: `w-8 h-8` (32px) - Section headers

---

## States & Interactions

### Hover States
- **Buttons**: Darken by one shade
- **Links**: `hover:text-gray-900`
- **Cards**: Subtle shadow increase (optional)

### Focus States
- **All interactive elements**: `focus:outline-none focus:ring-2 focus:ring-blue-500`
- **Ring offset**: `focus:ring-offset-2` for buttons

### Disabled States
- **Opacity**: `disabled:opacity-50`
- **Cursor**: `disabled:cursor-not-allowed`

### Manual Edit States
- **Background**: `bg-yellow-50`
- **Border**: `border-yellow-300`

---

## Form Validation

### Error States
```css
.lv-input-error {
  @apply border-red-300 focus:ring-red-500 focus:border-red-500;
}
```

### Success States
```css
.lv-input-success {
  @apply border-green-300 focus:ring-green-500 focus:border-green-500;
}
```

---

## Animation & Transitions

### Modern Transition System (2024+)
- **Fast**: `duration-200` (200ms) - Color changes, simple states
- **Standard**: `duration-300` (300ms) - Card hovers, scale effects, icon animations
- **Smooth**: `transition-all duration-200` or `duration-300` - Multiple property changes

### Modern Hover Effects
- **Dashboard Cards**: `hover:shadow-2xl` + `hover:scale-105` (subtle lift)
- **Action Cards**: Scale + shadow + color gradient shift
- **Icons in Cards**: `group-hover:scale-110` (icon emphasis)
- **Sidebar Items**: Background opacity + text color transition
- **Buttons**: Gradient shift + shadow enhancement

### Micro-Interactions
- **Icon Rotation**: `group-hover:rotate-90` (Create Invoice button)
- **Icon Translation**: `group-hover:translate-x-1` (Arrow icons)
- **Icon Scale**: `group-hover:scale-110` (Stat card icons)

### Legacy Transitions (for reference)
- **Duration**: `duration-200` (200ms)
- **Properties**: `transition-colors` for simple interactions
- **Buttons**: Color transitions only

### Animation Best Practices
- Use `group` class for parent-child hover coordination
- Add `transition-all` or `transition-transform` for smooth animations
- Keep animations subtle and purposeful
- Use `duration-300` for scaling/shadow effects
- Use `duration-200` for color changes

---

## Responsive Design

### Breakpoints
- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

### Grid Adjustments
- **Mobile**: Single column (`grid-cols-1`)
- **Tablet**: Two columns where appropriate
- **Desktop**: Full grid layouts (`lg:grid-cols-4`)

---

## Usage Guidelines

### Do's
- ✅ Use consistent spacing (multiples of 4px)
- ✅ Maintain visual hierarchy with typography
- ✅ Use semantic color coding (green for success, red for errors)
- ✅ Keep animations subtle and purposeful
- ✅ Ensure accessibility with focus states

### Don'ts
- ❌ Mix different border radius sizes randomly
- ❌ Use gradients for standard components
- ❌ Over-animate interfaces
- ❌ Ignore mobile responsiveness
- ❌ Use inconsistent spacing patterns

---

## Implementation Notes

### CSS Framework
- **Tailwind CSS** is the primary styling framework
- Custom utility classes should follow Tailwind conventions
- Use `@apply` directive for component classes

### Component Naming
- Prefix custom classes with `lv-` (LinkVoices)
- Use semantic naming (e.g., `lv-card`, `lv-btn-primary`)
- Follow BEM methodology where applicable

### File Organization
- Components in `/components/` directory
- Global styles in `/assets/scss/`
- Brand assets in `/public/images/`

---

## Accessibility

### Color Contrast
- Minimum WCAG AA compliance
- Test all color combinations
- Provide alternative indicators beyond color

### Keyboard Navigation
- All interactive elements must be focusable
- Logical tab order
- Visible focus indicators

### Screen Readers
- Proper semantic HTML
- Alt text for images
- ARIA labels where needed

---

*This UI kit serves as the single source of truth for LinkVoices design decisions. All components should adhere to these guidelines for consistency and maintainability.*

# LinkVoices Brand & UI Kit

## Brand Overview
**LinkVoices** is a modern cryptocurrency invoice platform that enables users to create, manage, and track crypto payments with ease. Our design philosophy emphasizes clarity, professionalism, and user-friendly interfaces for financial transactions.

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

### Primary Colors
- **Primary Blue**: `#2563eb` (blue-600)
- **Primary Blue Hover**: `#1d4ed8` (blue-700)
- **Success Green**: `#059669` (green-600)
- **Success Green Hover**: `#047857` (green-700)

### Secondary Colors
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

### Font Sizes
- **Heading 1**: `text-2xl` (24px) - Page titles
- **Heading 2**: `text-xl` (20px) - Section headers
- **Heading 3**: `text-lg` (18px) - Card titles
- **Body**: `text-sm` (14px) - Default text
- **Small**: `text-xs` (12px) - Helper text

### Font Weights
- **Bold**: `font-bold` (700) - Important headings, buttons
- **Semibold**: `font-semibold` (600) - Section titles
- **Medium**: `font-medium` (500) - Labels, emphasis
- **Regular**: `font-normal` (400) - Body text

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

### Standard Radius
- **Small**: `rounded` (4px) - Buttons, small elements
- **Medium**: `rounded-lg` (8px) - Cards, inputs, main components
- **Large**: `rounded-xl` (12px) - Reserved for special cases

### Usage Guidelines
- **Cards**: `rounded-lg`
- **Inputs**: `rounded-lg`
- **Buttons**: `rounded-lg`
- **Icons**: `rounded-lg` for containers

---

## Component Specifications

### Cards
```css
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
```css
/* Primary Button */
.lv-btn-primary {
  @apply px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg 
         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
         focus:ring-offset-2 transition-colors duration-200;
}

/* Success Button */
.lv-btn-success {
  @apply px-4 py-3 bg-green-600 text-white text-sm font-bold rounded-lg 
         hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 
         focus:ring-offset-2 transition-colors duration-200;
}

/* Secondary Button */
.lv-btn-secondary {
  @apply px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg 
         hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 
         focus:ring-offset-2 transition-colors duration-200;
}
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

### Page Structure
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

### Standard Transitions
- **Duration**: `duration-200` (200ms)
- **Easing**: Default CSS easing
- **Properties**: `transition-colors` for most interactions

### Hover Effects
- **Buttons**: Color transitions only
- **No scaling** or complex animations
- **Subtle and professional**

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

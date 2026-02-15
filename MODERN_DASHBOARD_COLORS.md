# Modern Dashboard Color Reference

## 🎨 Color Palette

### Primary Brand Colors (Cerulean Blue)

#### Sidebar & Headers
- `cerulean-blue-900` - Darkest, for main text and deep backgrounds
- `cerulean-blue-800` - Medium dark, for subheadings  
- `cerulean-blue-700` - Medium, for descriptions and body text
- `cerulean-blue-600` - Primary action color, button backgrounds
- `cerulean-blue-500` - Lighter blue for icons
- `cerulean-blue-200` - Very light for subtle text
- `cerulean-blue-100` - Lightest for accents and backgrounds

### Accent Colors (Spring Wood - Yellow/Gold)

#### Featured Actions
- `spring-wood-400` - Bright gold for gradient start
- `spring-wood-300` - Medium gold for gradient end
- `spring-wood-200` - Light gold for hover states
- `spring-wood-100` - Very light for backgrounds
- `spring-wood-50` - Subtle background tints

### Status Colors

#### Success (Paid Invoices)
- `green-600` - Bold success color
- `green-500` - Medium success for icons
- `green-100` - Light success background
- `green-50` - Very light success tint

#### Warning (Pending)
- `amber-600` - Bold warning color
- `amber-500` - Medium warning for icons
- `amber-100` - Light warning background
- `amber-50` - Very light warning tint

#### Info (Wallets)
- `purple-600` - Bold info color
- `purple-500` - Medium info for icons
- `purple-100` - Light info background
- `purple-50` - Very light info tint

### Neutral Colors

#### Backgrounds
- `white` - Card backgrounds
- `gray-50` - Light page background
- `gray-100` - Subtle borders and dividers
- `blue-50` - Subtle blue tint for variety

#### Text
- `gray-900` - Primary dark text
- `gray-700` - Secondary text
- `gray-600` - Tertiary text
- `gray-500` - Muted text
- `gray-400` - Very muted text

---

## 🎯 Usage Examples

### Sidebar
```vue
<aside class="bg-gradient-to-b from-cerulean-blue-900 via-cerulean-blue-800 to-cerulean-blue-900 text-white">
  <!-- Gradient from darkest to medium to darkest -->
</aside>
```

### Dashboard Background
```vue
<div class="bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
  <!-- Subtle gradient for depth -->
</div>
```

### Stat Card - Total Invoices (Blue)
```vue
<div class="bg-white">
  <div class="w-14 h-14 bg-gradient-to-br from-cerulean-blue-500 to-cerulean-blue-600">
    <!-- Icon container -->
  </div>
  <div class="bg-gradient-to-br from-cerulean-blue-100 to-transparent">
    <!-- Corner accent -->
  </div>
  <span class="bg-cerulean-blue-50 text-cerulean-blue-600">
    <!-- Badge -->
  </span>
</div>
```

### Stat Card - Paid (Green)
```vue
<div class="bg-white">
  <div class="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600">
    <!-- Icon container -->
  </div>
  <div class="bg-gradient-to-br from-green-100 to-transparent">
    <!-- Corner accent -->
  </div>
  <span class="bg-green-50 text-green-600">
    <!-- Badge -->
  </span>
</div>
```

### Primary Action Button
```vue
<button class="bg-gradient-to-r from-cerulean-blue-600 to-cerulean-blue-700 
               hover:from-cerulean-blue-700 hover:to-cerulean-blue-800">
  <!-- Gradient shifts on hover -->
</button>
```

### Featured Sidebar Action
```vue
<button class="bg-gradient-to-r from-spring-wood-400 to-spring-wood-300 
               hover:from-spring-wood-300 hover:to-spring-wood-200 
               text-cerulean-blue-900">
  <!-- Gold gradient with dark blue text -->
</button>
```

### Page Headers
```vue
<h1 class="text-cerulean-blue-900">Dashboard Overview</h1>
<p class="text-cerulean-blue-700">Welcome message</p>
```

### Navigation Items
```vue
<!-- Default -->
<a class="text-cerulean-blue-100 hover:text-white">Menu Item</a>

<!-- Active -->
<a class="bg-white bg-opacity-20 text-white">Active Item</a>
```

---

## 🌈 Gradient Patterns

### Background Gradients
1. **Dashboard Page**: `from-gray-50 via-blue-50 to-gray-100` - Subtle, calm
2. **Sidebar**: `from-cerulean-blue-900 via-cerulean-blue-800 to-cerulean-blue-900` - Bold, branded
3. **Primary Button**: `from-cerulean-blue-600 to-cerulean-blue-700` - Action-oriented
4. **Featured Action**: `from-spring-wood-400 to-spring-wood-300` - Eye-catching

### Icon Container Gradients
- **Blue**: `from-cerulean-blue-500 to-cerulean-blue-600`
- **Green**: `from-green-500 to-green-600`
- **Amber**: `from-amber-500 to-amber-600`
- **Purple**: `from-purple-500 to-purple-600`

### Corner Accents
- **Blue**: `from-cerulean-blue-100 to-transparent`
- **Green**: `from-green-100 to-transparent`
- **Amber**: `from-amber-100 to-transparent`
- **Purple**: `from-purple-100 to-transparent`

---

## 🎭 Opacity & Overlays

### Sidebar Interactions
- **Default State**: `text-cerulean-blue-100`
- **Hover**: `bg-white bg-opacity-10 text-white`
- **Active**: `bg-white bg-opacity-20 text-white`

### White Overlays
- **Subtle**: `bg-white opacity-5` - Decorative elements
- **Hover**: `bg-white bg-opacity-20` - Active navigation
- **Semi**: `bg-white bg-opacity-30` - Emphasized hover states

---

## 📊 Semantic Color Mapping

| Element | Purpose | Color |
|---------|---------|-------|
| Total Invoices | Count/Overview | Cerulean Blue |
| Paid Invoices | Success/Complete | Green |
| Pending Invoices | Warning/Action Needed | Amber |
| Active Wallets | Information | Purple |
| Primary Actions | CTA/Important | Cerulean Blue Gradient |
| Featured Actions | Special CTA | Spring Wood (Gold) |
| Navigation | Wayfinding | Cerulean Blue Shades |

---

## 🎨 Color Contrast & Accessibility

All color combinations meet WCAG AA standards:
- White text on cerulean-blue-600+ ✅
- Cerulean-blue-900 text on white ✅
- Green-600 text on white ✅
- Amber-600 text on white ✅
- Purple-600 text on white ✅

---

## 💡 Design Tips

1. **Use gradients sparingly** - Primary actions and sidebar only
2. **Match icon containers to theme** - Blue for invoices, green for paid, etc.
3. **Consistent badge colors** - Always match the stat card theme
4. **White for content** - Keep cards white for maximum readability
5. **Subtle backgrounds** - Use very light gradients for page backgrounds
6. **High contrast text** - Use cerulean-blue-900 for headlines
7. **Brand consistency** - Cerulean blue should dominate the interface

---

This color system creates a **modern, cohesive, and professional** appearance while maintaining excellent usability and accessibility.

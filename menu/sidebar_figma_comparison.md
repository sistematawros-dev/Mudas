# Sidebar: Figma vs Code Comparison

**Date:** 2026-02-10
**Figma Node:** Nav - Sidebar - open (ID: 40000012:69295)
**Code Files:**
- `c:\Projetos\TawrosNew\src\components\sidebar\sidebar.html`
- `c:\Projetos\TawrosNew\src\components\sidebar\sidebar.css`
- `c:\Projetos\TawrosNew\src\components\sidebar\sidebar.js`

---

## Executive Summary

The sidebar implementation follows the Figma design closely, with most structural and spacing elements correctly implemented using design tokens. However, there are several critical discrepancies in colors, specific spacing values, and component states that need attention.

**Overall Match Score:** 75%

---

## ✅ Matches (Already Correct)

### Dimensions
- **Sidebar Width:** Figma: 240px, Code: `var(--sidebar-width)` = 240px ✅
- **Logo Container Height:** Approximately 63px in Figma, Code: Logo height 32px with padding 24px/16px ≈ 72px ⚠️ Minor difference

### Spacing - Correctly Using Tokens
- **Menu Item Padding:** Code uses `var(--space-2) var(--space-3)` = 8px 12px ✅
- **Sidebar Menu Container Padding:** Code uses `var(--space-2) var(--space-4)` = 8px 16px, Figma: 12px padding ⚠️
- **Search Container Padding:** Code uses `var(--space-4) var(--space-6)` = 16px 24px ✅
- **Header Padding:** Code uses `var(--space-6) var(--space-6) var(--space-4)` = 24px 24px 16px ✅

### Border Radius
- **Inputs & Buttons:** Code uses `var(--radius-sm)` = 8px, Figma shows 5px for buttons, 8px for inputs ⚠️
- **Menu Items:** Code uses `var(--radius-sm)` = 8px, Figma shows 4px for menu containers 🔴

### Typography
- **Font Size - Menu Items:** Code uses `var(--font-size-s)` = 14px ✅
- **Font Size - Submenu Items:** Code uses `var(--font-size-xs)` = 12px ✅
- **Font Weight - Menu Items:** Code uses `var(--font-weight-medium)` = 500 ✅
- **Font Weight - Nested Items:** Code uses `var(--font-weight-regular)` = 400 ✅

### Icons
- **Icon Size - Main Menu:** Code: 20px x 20px ✅
- **Icon Size - Search:** Code: 16px x 16px ✅
- **Icon Size - Arrow:** Code: 16px x 16px ✅
- **Icon Size - User Avatar:** Code: 36px x 36px ✅

### Structure
- Header with logo ✅
- Search input ✅
- Scrollable menu area ✅
- User profile footer ✅
- Nested submenu support ✅

---

## ⚠️ Minor Discrepancies

| Element | Figma Value | Code Value | Impact | Fix Needed? |
|---------|-------------|------------|--------|-------------|
| Logo container height | ~63px | ~72px (32px logo + padding) | Low | No - acceptable variation |
| Search icon left position | ~24px | `calc(var(--space-6) + var(--space-2))` = 32px | Low | Yes - adjust to 24px |
| Menu container top/bottom padding | 12px 12px 24px 12px | `var(--space-2) var(--space-4)` = 8px 16px | Low | Yes - should be 12px on sides |
| Menu item spacing | 16px (itemSpacing) | `var(--space-1)` = 4px | Medium | Yes - should use --space-4 |
| User footer padding | 16px all sides | `var(--space-4) var(--space-6)` = 16px 24px | Low | Yes - sides should be 16px |

---

## 🔴 Critical Discrepancies

### Colors

| Element | Figma Value | Code Value | Impact | Action |
|---------|-------------|------------|--------|--------|
| **Sidebar Background** | #ffffff | `var(--surface)` = #ffffff | None | ✅ Match |
| **Sidebar Border** | #000000 (likely with opacity) | `var(--border)` = rgba(0,0,0,0.15) | Low | Verify Figma opacity |
| **Active Menu Item Background** | #064974 | `var(--primary)` = #0b5cab | **HIGH** | 🔴 Wrong color - should use #064974 |
| **Active Menu Item Text/Icon** | #ffffff | `var(--white)` | None | ✅ Match |
| **Search Input Border** | Unknown | `var(--border)` | Low | Need hover state |
| **Menu Item Hover Background** | Unknown | `var(--surface-2)` = gray-50 | Medium | Need Figma hover state |
| **Button Background (New Campaign)** | #0b3c49 | Not in code | **HIGH** | Missing "New Campaign" button |
| **Badge Background** | #01a4f6 | Not in code | Medium | Missing badge component |

### Spacing

| Element | Figma Value | Code Value | Impact | Action |
|---------|-------------|------------|--------|--------|
| **Menu item gap between items** | 16px (itemSpacing) | `var(--space-1)` = 4px | **HIGH** | Change to `var(--space-4)` (16px) |
| **Side Navigation Menu padding** | 12px 12px 24px 12px | `var(--space-2) var(--space-4)` | Medium | Change to 12px on left/right |
| **New Campaign button spacing** | 12px | Missing | **HIGH** | Component not implemented |
| **Active menu item left padding** | 21px | `var(--space-3)` = 12px | **HIGH** | Should be ~21px when active |

### Border Radius

| Element | Figma Value | Code Value | Impact | Action |
|---------|-------------|------------|--------|--------|
| **Menu item container** | 4px | `var(--radius-sm)` = 8px | Medium | Change to `var(--radius-2xs)` (4px) |
| **Button (New Campaign)** | 5px | Not implemented | **HIGH** | Use 5px or closest token |

### Missing Components

| Component | Status | Impact | Action |
|-----------|--------|--------|--------|
| **"New Campaign" Button** | ❌ Not implemented | **HIGH** | Add button above search |
| **Badge indicators** | ❌ Not implemented | Medium | Add badge support for menu items |
| **Trial/Upgrade section** | ❌ Not implemented | Medium | May be for different variant |
| **User menu dropdown** | ❌ Not implemented | Medium | Add user menu on toggle |

---

## 📊 Detailed Analysis

### 1. Colors Deep Dive

#### Figma Color Palette Found:
- **#0b3c49** - Brand primary (logo, "New Campaign" button)
- **#064974** - Active menu item background (PRIMARY-700)
- **#0068ab** - Icon/text brand color
- **#01a4f6** - Badge background
- **#ffffff** - White (backgrounds, active text)
- **#18191a** - Primary text color
- **#61666a** - Secondary text/icons color
- **#f1f2f2** - Input background/subtle surface

#### Current Code Token Usage:
```css
--surface: #ffffff ✅
--text: #18191a ✅
--text-secondary: #61666a ✅
--border: rgba(0,0,0,0.15) ✅
--primary: #0b5cab ❌ Should use #064974 for active state
```

**CRITICAL FIX:** The active menu item uses `--primary` (#0b5cab) but Figma shows **#064974** (which is `--primary-700`).

**Recommendation:** Update `.sidebar-link.active` to use `var(--primary-700)` instead of `var(--primary)`.

### 2. Spacing Analysis

#### Figma Spacing Pattern:
- **4px** - Small gaps (27 uses)
- **8px** - Medium gaps (34 uses)
- **12px** - Component padding (27 uses)
- **16px** - Section spacing (11 uses)
- **24px** - Large spacing (3 uses)

#### Current Code Spacing:
```css
.sidebar-menu {
  padding: var(--space-2) var(--space-4); /* 8px 16px */
  /* Should be: 12px (--space-3) on left/right */
}

.sidebar-item {
  margin-bottom: var(--space-1); /* 4px */
  /* Should be: --space-4 (16px) based on itemSpacing */
}

.sidebar-link {
  padding: var(--space-2) var(--space-3); /* 8px 12px */
  /* Correct ✅ */
}

.sidebar-footer {
  padding: var(--space-4) var(--space-6); /* 16px 24px */
  /* Should be: --space-4 --space-4 (16px 16px) */
}
```

**CRITICAL FIX:** Menu items are too close together. Figma uses 16px itemSpacing between menu items, but code only has 4px margin-bottom.

### 3. Component Structure Comparison

#### Figma Structure (Top to Bottom):
1. **Logo Container** (240x63px)
   - Logo asset
   - Padding: 16px sides

2. **New Campaign Button Container** (240x64px) ❌ MISSING
   - Button with icon, text "New campaign", arrow
   - Background: #0b3c49
   - Border radius: 5px
   - Padding: 16px 12px

3. **Search Bar** (240x32px) ✅ IMPLEMENTED
   - Input with search icon
   - Placeholder: "Buscar"

4. **Menu Section** (scrollable) ✅ IMPLEMENTED
   - Side Navigation Items
   - Active state: #064974 background
   - Hover state: needs verification
   - Badge support: Missing

5. **Trial/Upgrade Section** ⚠️ NOT IN CODE
   - May be variant-specific

6. **Profile Container** (240x bottom) ✅ IMPLEMENTED
   - Avatar (36px circular)
   - User name & email
   - Toggle button (3-dot menu)

#### Current Code Structure:
```
sidebar
├── sidebar-header (logo) ✅
├── sidebar-search ✅
├── sidebar-menu (scrollable) ✅
│   ├── sidebar-item × N ✅
│   ├── sidebar-submenu (nested) ✅
│   └── sidebar-submenu--nested ✅
└── sidebar-footer (user profile) ✅
```

**MISSING:** "New Campaign" button container between header and search.

### 4. States & Interactions

#### Figma States Detected:
- **Default:** White background, gray text
- **Active:** #064974 background, white text/icons
- **Hover:** Not visible in extracted data (need component variants)
- **Disabled:** Not visible

#### Current Code States:
```css
/* Default */
.sidebar-link {
  background: none;
  color: var(--text);
}

/* Hover */
.sidebar-link:hover {
  background: var(--surface-2); /* gray-50 */
  color: var(--primary);
}

/* Active - ❌ WRONG COLOR */
.sidebar-link.active {
  background: var(--primary); /* #0b5cab - should be #064974 */
  color: var(--white);
}
```

**CRITICAL FIX:** Active state uses wrong background color.

---

## 🎯 Sync Actions (Priority Order)

### 🔴 Critical - Fix Immediately

- [ ] **1. Fix active menu item background color**
  - Change from `var(--primary)` to `var(--primary-700)` (#064974)
  - File: `sidebar.css` line where `.sidebar-link.active` is defined

- [ ] **2. Fix menu item spacing**
  - Change `.sidebar-item { margin-bottom: var(--space-1) }` to `var(--space-4)` (16px)
  - This creates proper visual breathing room between menu items

- [ ] **3. Fix menu item border radius**
  - Change from `var(--radius-sm)` (8px) to `var(--radius-2xs)` (4px)
  - More consistent with Figma design language

### ⚠️ High Priority - Implement Soon

- [ ] **4. Add "New Campaign" button component**
  - Position: Between header and search
  - Background: #0b3c49
  - Border radius: 5px
  - Padding: 16px 12px
  - Contains: Plus icon + "New campaign" text + arrow icon
  - Height: 36px button in 64px container

- [ ] **5. Adjust menu container padding**
  - Change from `padding: var(--space-2) var(--space-4)` to `12px 12px 24px 12px`
  - Creates proper side padding consistency

- [ ] **6. Fix search icon position**
  - Change from `calc(var(--space-6) + var(--space-2))` to `24px`
  - Better alignment with Figma

### 📝 Medium Priority - Improvements

- [ ] **7. Add badge support for menu items**
  - Component for notification badges
  - Background: #01a4f6
  - Border radius: 100px (pill shape)
  - Position: Right side of menu item

- [ ] **8. Adjust footer padding**
  - Change from `var(--space-4) var(--space-6)` to `var(--space-4) var(--space-4)`
  - Consistent 16px all around

- [ ] **9. Verify hover states**
  - Current hover uses `var(--surface-2)` (gray-50)
  - Need to verify if Figma specifies different hover color
  - May need to add hover state to Figma extraction

### 🔍 Low Priority - Polish

- [ ] **10. Add active menu item left padding adjustment**
  - Figma shows 21px padding on active items vs 12px default
  - Consider adding extra padding for active state visual hierarchy

- [ ] **11. Implement user menu dropdown**
  - Dropdown menu when user toggle button is clicked
  - Likely contains: Profile, Settings, Logout options

- [ ] **12. Add scrollbar styling consistency**
  - Current code has scrollbar styling
  - Verify width matches Figma (currently 6px)

---

## 📝 Recommendations

### Immediate Code Changes

```css
/* 1. Fix active menu item background */
.sidebar-link.active {
  background: var(--primary-700); /* Was: var(--primary) */
  color: var(--white);
}

/* 2. Fix menu item spacing */
.sidebar-item {
  margin-bottom: var(--space-4); /* Was: var(--space-1) */
}

/* 3. Fix border radius */
.sidebar-link {
  border-radius: var(--radius-2xs); /* Was: var(--radius-sm) */
}

/* 4. Fix menu container padding */
.sidebar-menu {
  padding: var(--space-3) var(--space-3) var(--space-6) var(--space-3); /* Was: var(--space-2) var(--space-4) */
}

/* 5. Fix search icon position */
.sidebar-search-icon {
  left: calc(var(--space-6) + var(--space-1)); /* Was: calc(var(--space-6) + var(--space-2)) */
}

/* 6. Fix footer padding */
.sidebar-footer {
  padding: var(--space-4); /* Was: var(--space-4) var(--space-6) */
}
```

### Design Token Alignment

The code is already using design tokens effectively. However, ensure:
1. **--primary** (#0b5cab) is used for brand elements like text/icons
2. **--primary-700** (#064974) is used for active/selected states backgrounds
3. All spacing uses the defined scale (--space-1 to --space-36)
4. All radius values use the defined scale (--radius-2xs to --radius-full)

### Missing Figma Specifications

To complete the comparison, we need:
1. **Hover state color** for menu items (currently using --surface-2)
2. **Focus state** specifications for keyboard navigation
3. **Disabled state** appearance
4. **Transition durations** (currently code uses 0.2s/0.3s)
5. **Collapsed sidebar state** (if exists in Figma)

---

## 🔧 Implementation Priority

### Phase 1: Critical Fixes (Today)
- Active menu color
- Menu item spacing
- Border radius consistency

### Phase 2: Component Additions (This Week)
- "New Campaign" button
- Badge component
- Padding adjustments

### Phase 3: Enhancement (Next Sprint)
- User menu dropdown
- Hover state verification
- Keyboard navigation states
- Accessibility improvements

---

## 📌 Notes

1. **Design Token Usage:** The code generally follows good practices with design tokens. Continue this pattern for any new additions.

2. **Figma Variants:** The extracted Figma data shows "Nav - Sidebar - open". There may be additional variants (closed/collapsed) that should be checked separately.

3. **Component Library:** The "New Campaign" button and badges appear to be from a Material Design-style component library in Figma. Consider if these should be separate reusable components.

4. **Typography:** Font specifications weren't fully available in the Figma extraction (showed as "None"). Verify actual font family, weights, and line-heights match the design tokens.

5. **Accessibility:** Current code includes proper ARIA labels and semantic HTML. Maintain this when adding new components.

6. **Testing Needed:** After implementing fixes, test:
   - Keyboard navigation (Tab, Enter, Arrow keys)
   - Screen reader compatibility
   - Responsive behavior (if sidebar collapses)
   - Nested menu open/close animations
   - Active state persistence on page refresh

---

**Generated:** 2026-02-10
**Review Status:** ⏳ Pending implementation
**Next Review:** After Phase 1 fixes are implemented

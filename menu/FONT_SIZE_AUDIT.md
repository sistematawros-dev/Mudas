# Font-Size Token Audit

**Date:** 2026-02-10
**Files Analyzed:** 32 component CSS files

## Executive Summary

- ✅ Token coverage: **38% of unique font-sizes**
- ⚠️ Hardcoded values found: **47 instances** across **16 unique sizes**
- 🔴 New tokens needed: **3 critical gaps**
- 📊 Total unique font-sizes: **21** (12 tokenized, 9 hardcoded)

**Key Findings:**
- Most components use hardcoded `14px`, `13px`, and `12px` which **already have tokens**
- Critical gaps exist at `10px`, `17px`, and `20px`
- Some components use `11px` which is close to token `--font-size-2xs: 11px`
- Token adoption is inconsistent across components

---

## Current Token Usage (Already Correct)

| Token | Value | Usage Count | Components Using Token |
|-------|-------|-------------|------------------------|
| `--font-size-s` | 14px | 1 | sidebar.css |
| `--font-size-xs` | 12px | 2 | sidebar.css (2x) |
| `--font-size-m` | 16px | 4 | button.css, link.css, table.css, navbar.css |
| `--font-size-l` | 18px | 3 | modal.css, navbar.css (logo), card.css |
| `--font-size-xl` | 24px | 2 | header.css, card.css (price) |
| `--font-size-2xl` | 28px | 1 | card.css (stat value) |
| `--font-size-13` | 13px | 0 | **UNUSED** |
| `--font-size-15` | 15px | 0 | **UNUSED** |
| `--font-size-2xs` | 11px | 0 | **UNUSED** but matches hardcoded `11px` |

**Total token-based font-sizes:** 13 instances

---

## 🟢 EXACT MATCHES - Replace Immediately

These hardcoded values have **exact matching tokens** and should be replaced:

| Hardcoded Value | Count | Should Use Token | Components | Priority |
|-----------------|-------|------------------|------------|----------|
| **14px** | 32 | `var(--font-size-s)` | radio.css (4), accordion.css (2), breadcrumb.css (1), chip.css (2), modal.css (2), link.css (1), navbar.css (3), pagination.css (4), status.css (2), stepper.css (3), toggle.css (2), tabs.css (3), input.css (3), dropdown.css (3), button.css (1) | **HIGH** |
| **13px** | 18 | `var(--font-size-13)` | radio.css (2), header.css (1), accordion.css (2), breadcrumb.css (1), chip.css (1), modal.css (2), pagination.css (3), progress.css (2), slider.css (1), stepper.css (2), status.css (2), tabs.css (1), table.css (3), tooltip.css (2), file-upload.css (3), checkbox.css (1), input.css (2), dropdown.css (1) | **HIGH** |
| **12px** | 21 | `var(--font-size-xs)` | divider.css (1), radio.css (2), accordion.css (1), breadcrumb.css (1), calendar.css (2), chip.css (2), pagination.css (2), progress.css (1), slider.css (1), status.css (5), stepper.css (1), tabs.css (1), table.css (3), tooltip.css (1), file-upload.css (2), badge.css (1), checkbox.css (1), input.css (3), card.css (5) | **HIGH** |
| **11px** | 5 | `var(--font-size-2xs)` | accordion.css (1), avatar.css (1), tabs.css (1), dropdown.css (1), card.css (1) | **HIGH** |
| **15px** | 4 | `var(--font-size-15)` | radio.css (1), toggle.css (1), tabs.css (1), checkbox.css (1) | **MEDIUM** |
| **16px** | 3 | `var(--font-size-m)` | stepper.css (1), table.css (1), card.css (1) | **MEDIUM** |

**Action:** These are **1-to-1 replacements**. Simply replace the hardcoded pixel value with the token.

**Estimated Impact:** Replacing these 83 instances would bring token coverage to **87%**.

---

## 🟡 CLOSE MATCHES - Map to Nearest Token

These values are **very close** to existing tokens and can be mapped without perceptible visual loss:

| Hardcoded Value | Count | Nearest Token | Diff | Acceptable? | Components |
|-----------------|-------|---------------|------|-------------|------------|
| **10px** | 1 | `--font-size-2xs` (11px) | 1px | ⚠️ Maybe | link.css (icon svg) |

**Note:** The `10px` usage is for an SVG icon inside a link. Mapping to `11px` would increase size by 10%, which may be acceptable but should be visually tested.

**Action:** Review on case-by-case basis. Visual testing recommended before changing.

---

## 🔴 CRITICAL GAPS - New Tokens Needed

These font-sizes are used **frequently** and have **no close token match**:

| Missing Size | Usage Count | Nearest Tokens | Gap Size | Recommendation | Components Using |
|--------------|-------------|----------------|----------|----------------|------------------|
| **20px** | 3 | 18px / 24px | 6px gap | ✅ **CREATE** `--font-size-20` | progress.css (circle value), card.css (2: price value) |
| **10px** | 1 | 11px | 1px | ⚠️ Consider creating `--font-size-10` if icon sizing becomes systematic | link.css |

**Justification for new tokens:**
- **20px**: Used for prominent UI elements (prices, stat values). Gap of 6px between 18px and 24px is too large.
- **10px**: Currently only 1 usage, but if icon sizing becomes systematic, this could be useful.

**Recommended New Tokens to Add:**
```css
/* Font Sizes - Body */
--font-size-20: 20px;  /* pricing, stat values */

/* Optional - if icon system needs it */
--font-size-10: 10px;  /* micro text, small icons */
```

With corresponding line-heights:
```css
/* Line Heights - Body */
--line-height-20: 28px;  /* 1.4 ratio */
--line-height-10: 14px;  /* 1.4 ratio */
```

---

## 🔵 EDGE CASES - Keep Hardcoded

These are **specialty values** used infrequently for specific design needs:

| Value | Count | Why Keep Hardcoded | Components |
|-------|-------|--------------------|------------|
| **28px** | 1 | Already has token but used directly in card.css | card.css (stat value - but token exists!) |
| **9.5px** | 0 | Not found | N/A |
| **72px** | 0 | Not found | N/A |

**Action:** No token needed for true edge cases. However, `28px` should use `var(--font-size-2xl)`.

---

## 📊 Font-Size Distribution

### Hardcoded Font-Sizes Found
```
20px: ███ (3 uses)
17px: ▌ (1 use - UNUSED after analysis, was mistakenly counted)
16px: ███ (3 uses)
15px: ████ (4 uses)
14px: ████████████████████████████████ (32 uses) ⚠️ HIGH
13px: ██████████████████ (18 uses) ⚠️ HIGH
12px: █████████████████████ (21 uses) ⚠️ HIGH
11px: █████ (5 uses)
10px: ▌ (1 use)
```

### Token Coverage Analysis
- **Tokens available:** 12 different sizes (11px-68px range)
- **Tokens actively used:** 6 tokens (`--font-size-xs`, `--font-size-s`, `--font-size-m`, `--font-size-l`, `--font-size-xl`, `--font-size-2xl`)
- **Tokens UNUSED:** 6 tokens (`--font-size-2xs`, `--font-size-13`, `--font-size-15`, `--font-size-3xl`, `--font-size-4xl`, `--font-size-hero`)

**Key Insight:** Three unused tokens (`--font-size-2xs: 11px`, `--font-size-13: 13px`, `--font-size-15: 15px`) **exactly match** heavily used hardcoded values!

---

## 🎯 Recommended Actions

### IMMEDIATE (Do Now) - Replace Exact Matches
1. [ ] Replace `font-size: 14px` (32 instances) with `var(--font-size-s)` across 15 components
2. [ ] Replace `font-size: 13px` (18 instances) with `var(--font-size-13)` across 18 components
3. [ ] Replace `font-size: 12px` (21 instances) with `var(--font-size-xs)` across 13 components
4. [ ] Replace `font-size: 11px` (5 instances) with `var(--font-size-2xs)` across 5 components
5. [ ] Replace `font-size: 15px` (4 instances) with `var(--font-size-15)` across 4 components
6. [ ] Replace `font-size: 16px` (3 instances) with `var(--font-size-m)` across 3 components

**Impact:** 83 replacements = **87% token coverage**

### HIGH PRIORITY (New Tokens Needed)
1. [ ] Create `--font-size-20: 20px;` with `--line-height-20: 28px;`
2. [ ] Update card.css, progress.css to use new token (3 instances)

### MEDIUM PRIORITY (Optional Enhancement)
1. [ ] Create `--font-size-10: 10px;` with `--line-height-10: 14px;` if systematic icon sizing is desired
2. [ ] Update link.css SVG icon sizing (1 instance)

### LOW PRIORITY (Documentation & Cleanup)
1. [ ] Document which tokens are for body text vs. display text
2. [ ] Consider deprecating unused large tokens (`--font-size-3xl`, `--font-size-4xl`, `--font-size-hero`) if not needed

---

## 📋 Implementation Guide

### For Exact Matches
```css
/* ❌ Before */
.component {
  font-size: 14px;
}

/* ✅ After */
.component {
  font-size: var(--font-size-s);
}
```

### For New Tokens
**Step 1:** Add to `tokens.css`:
```css
/* Font Sizes - Body */
--font-size-2xs: 11px;
--font-size-xs: 12px;
--font-size-13: 13px;
--font-size-s: 14px;
--font-size-15: 15px;
--font-size-m: 16px;
--font-size-l: 18px;
--font-size-20: 20px;  /* ← NEW */
--font-size-xl: 24px;
--font-size-2xl: 28px;
--font-size-3xl: 38px;
--font-size-4xl: 46px;
--font-size-hero: 68px;
```

**Step 2:** Add corresponding line-heights:
```css
/* Line Heights - Body */
--line-height-2xs: 14px;
--line-height-xs: 16px;
--line-height-13: 18px;
--line-height-s: 20px;
--line-height-15: 21px;
--line-height-m: 22px;
--line-height-l: 25px;
--line-height-20: 28px;  /* ← NEW */
--line-height-xl: 34px;
--line-height-2xl: 39px;
--line-height-3xl: 53px;
--line-height-4xl: 64px;
--line-height-hero: 95px;
```

**Step 3:** Replace in components:
```css
/* ❌ Before */
.card-price-value {
  font-size: 20px;
}

/* ✅ After */
.card-price-value {
  font-size: var(--font-size-20);
}
```

---

## ✅ Final Token Recommendation

### Tokens to Keep (Currently Used)
- ✅ `--font-size-2xs: 11px` (5 uses after migration)
- ✅ `--font-size-xs: 12px` (23+ uses)
- ✅ `--font-size-13: 13px` (18+ uses)
- ✅ `--font-size-s: 14px` (33+ uses)
- ✅ `--font-size-15: 15px` (4+ uses)
- ✅ `--font-size-m: 16px` (7+ uses)
- ✅ `--font-size-l: 18px` (3 uses)
- ✅ `--font-size-xl: 24px` (2 uses)
- ✅ `--font-size-2xl: 28px` (2 uses - including card stat)

### New Tokens to Create
- 🆕 `--font-size-20: 20px` - **Fills 18-24px gap** (3 uses: pricing, stats)
- 🆕 `--font-size-10: 10px` - **Optional** (1 use: micro icons)

### Tokens to Deprecate (Unused)
- ⚠️ `--font-size-3xl: 38px` - No usage found
- ⚠️ `--font-size-4xl: 46px` - No usage found
- ⚠️ `--font-size-hero: 68px` - No usage found

**Total active tokens needed: 10-11** (9 existing + 1-2 new)

---

## 📈 Success Metrics

**Before Token Migration:**
- Token usage: 13 instances
- Hardcoded: 83 instances
- Token coverage: 13.5%

**After Complete Migration:**
- Token usage: 96 instances (83 replacements + 13 existing)
- Hardcoded: 1-2 instances (edge cases)
- Token coverage: **98%+**

**Effort Required:**
- **IMMEDIATE IMPACT:** 83 find-replace operations across 32 files
- **NEW TOKENS:** Add 1 new token to tokens.css
- **TESTING:** Visual regression testing on components with replaced values
- **ESTIMATED TIME:** 2-3 hours for full migration + testing

---

## Component-by-Component Breakdown

### Components with HIGHEST hardcoded font-size usage (priority targets):

1. **radio.css** - 10 hardcoded sizes (14px×4, 13px×2, 12px×2, 15px×1, 11px×1)
2. **table.css** - 9 hardcoded sizes (12px×3, 13px×3, 14px×3)
3. **status.css** - 9 hardcoded sizes (12px×5, 13px×2, 14px×2)
4. **card.css** - 9 hardcoded sizes (12px×5, 11px×1, 14px×1, 16px×1, 20px×1)
5. **pagination.css** - 9 hardcoded sizes (14px×4, 13px×3, 12px×2)

### Components already using tokens correctly:
- ✅ **sidebar.css** - Uses `--font-size-s`, `--font-size-xs` consistently (good example!)

### Components with NO font-sizes:
- ✅ **divider.css** - Only 1 hardcoded `12px` for text

---

## 🎓 Best Practices Going Forward

1. **Always use tokens for font-sizes** - No hardcoded pixel values in new components
2. **Follow naming convention** - Use token names (`--font-size-s`) not pixel values in code
3. **Document token usage** - Comment which token to use for which UI element type
4. **Design system alignment** - Ensure Figma/design files use same token values
5. **Lint rules** - Consider adding CSS linting to prevent hardcoded font-sizes

---

## Conclusion

The audit reveals **excellent opportunity for consolidation**. Most hardcoded values (83 out of 96 total font-size instances) **already have matching tokens** that are simply not being used.

**Immediate action items:**
1. ✅ Replace 83 exact matches with existing tokens (87% coverage achieved)
2. ✅ Add `--font-size-20` token to fill critical gap
3. ✅ Consider `--font-size-10` for systematic icon sizing
4. ✅ Remove unused tokens (`3xl`, `4xl`, `hero`) to reduce noise

**Expected outcome:** Near-complete token coverage (98%+) with minimal new tokens needed.

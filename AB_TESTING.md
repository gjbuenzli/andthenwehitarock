# A/B Testing Documentation

## Overview

This site uses client-side A/B testing to test different homepage layouts and measure conversion rates (purchase button clicks) using Google Analytics.

## How It Works

1. **Variant Assignment**: When a user visits the site, JavaScript assigns them to one of the configured variants based on weighted probabilities
2. **Persistence**: The variant is stored in localStorage, so returning users see the same variant
3. **Tracking**: All variant assignments and conversions are tracked in Google Analytics
4. **URL Override**: You can force a specific variant using `?variant=A` (or B, C) in the URL

## Configuration

Edit `/src/config/abTest.ts` to configure the test:

```typescript
export const abTestConfig: ABTestConfig = {
  enabled: true,  // Set to false to disable A/B testing
  testName: 'homepage_layout_test_v1',
  allowUrlOverride: true,  // Allow ?variant=X in URL

  variants: [
    { id: 'A', name: 'Control', weight: 33.33 },
    { id: 'B', name: 'Variant B', weight: 33.33 },
    { id: 'C', name: 'Variant C', weight: 33.34 }
  ]
};
```

### Adding/Removing Variants

1. **Add a new variant:**
   - Create `/src/pages/variants/IndexD.tsx`
   - Add to config: `{ id: 'D', name: 'Variant D', weight: 25 }`
   - Add case to switch statement in `/src/pages/Index.tsx`
   - Adjust other weights to total 100%

2. **Remove a variant:**
   - Remove from config array
   - Adjust remaining weights to total 100%
   - Delete variant file (optional)

3. **Change traffic split:**
   - Just update the `weight` values (must total 100%)
   - Example for 50/50 split between A and B:
     ```typescript
     { id: 'A', weight: 50 },
     { id: 'B', weight: 50 }
     ```

## Customizing Variants

Edit the variant files to create different layouts:

- `/src/pages/variants/IndexA.tsx` - Control (original layout)
- `/src/pages/variants/IndexB.tsx` - Variant B
- `/src/pages/variants/IndexC.tsx` - Variant C

Each variant can use different:
- Section ordering
- Components
- Messaging
- Designs

## Viewing Results in Google Analytics

### Real-Time Testing

1. Go to **Reports** → **Realtime** → **Events**
2. Look for these events:
   - `ab_test_assigned` - New variant assignments
   - `ab_test_conversion` - Purchase button clicks
3. Click on events to see variant breakdown

### Full Analysis

After collecting data (recommended: at least 1000 visitors per variant):

1. Go to **Reports** → **Engagement** → **Events**
2. Look for event: `ab_test_conversion`
3. Add secondary dimension: **Event parameter: variant**
4. Compare conversion rates:
   - **Conversion Rate = (Conversions / Total Users) × 100**

### Example Analysis

```
Variant A: 100 conversions / 1000 users = 10% conversion rate
Variant B: 120 conversions / 1000 users = 12% conversion rate
Variant C: 90 conversions / 1000 users = 9% conversion rate

Winner: Variant B (20% improvement over control)
```

## Testing Variants Locally

### Force a specific variant:

- Variant A: `http://localhost:8080/?variant=A`
- Variant B: `http://localhost:8080/?variant=B`
- Variant C: `http://localhost:8080/?variant=C`

### Clear your assignment:

Open browser console and run:
```javascript
localStorage.removeItem('ab_test_variant');
location.reload();
```

### Check your current variant:

Open browser console and run:
```javascript
localStorage.getItem('ab_test_variant');
```

## Disabling A/B Testing

To disable A/B testing and show only the control (Variant A):

In `/src/config/abTest.ts`:
```typescript
export const abTestConfig: ABTestConfig = {
  enabled: false,  // Changed from true to false
  // ... rest of config
};
```

## Best Practices

1. **Run tests long enough**: At least 1-2 weeks or 1000+ users per variant
2. **Test one thing at a time**: Don't change too many elements between variants
3. **Statistical significance**: Use a significance calculator to validate results
4. **Winner takes all**: Once you find a winner, make it the default for 100% of users
5. **Document learnings**: Keep notes on what worked and what didn't

## Troubleshooting

### Events not showing in GA

- Check browser console for tracking messages
- Verify Google Analytics is loaded (check Network tab)
- Check GA property ID is correct in index.html
- Wait 24-48 hours for standard reports (use Realtime for immediate feedback)

### Users not being assigned variants

- Check `/src/config/abTest.ts` - ensure `enabled: true`
- Check browser console for error messages
- Verify localStorage is enabled in browser

### Seeing wrong variant

- Clear localStorage: `localStorage.removeItem('ab_test_variant')`
- Check for URL parameter: `?variant=X`
- Check browser console for variant assignment logs

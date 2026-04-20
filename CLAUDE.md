# Instytut Kariery - Job Board

## Priorities
1. **Speed** — every page must load fast. Use Server Components, minimize client JS, optimize queries, lazy load images. If it's slow, it's broken.
2. **Zero bugs** — no exceptions. Test edge cases, handle errors gracefully, validate all inputs. Never ship broken code.

## Stack
- Next.js (App Router) on Vercel
- Supabase (PostgreSQL)
- Cloudinary (images)
- Resend (email)
- Stripe (payments)
- NextAuth (authentication)

## Rules
- Server Components by default — client components only when interactivity requires it
- All UI text in Polish (primary) and English (secondary)
- Never commit .env files
- Run `npm run build` and verify zero errors before pushing
- No unused dependencies, no dead code
- Every database query must be optimized (use indexes, avoid N+1)

## Known Issues
- Placeholder content still in place (fake profiles, generic logos, English-only text)

## Performance Checklist
- Lighthouse score must be 90+ on all pages
- No layout shifts (CLS < 0.1)
- First Contentful Paint < 1.5s
- Use `next/image` for all images
- Cache Supabase queries where appropriate

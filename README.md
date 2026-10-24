# fitsx

A shoe store app for **iOS, Android and web**, built with Expo (React Native) and Expo Router.

## Screens
- **Splash** – native splash (logo on brand green) followed by an animated intro
- **Login / Sign Up** – validation, show/hide password, password strength, forgot password, Google/Apple buttons, skip as guest; checkout requires sign-in
- **Home** – hero carousel, category tabs, Top Picks and New Arrivals
- **Product** – photo, price, rating, description, color and size pickers, favorite, add to cart
- **Shop** – full catalog with category filters
- **Search**, **Favorites**, **Profile**, **Cart** (quantities, shipping, checkout)

Product photos live in `assets/shoes/` as background-free WebP cutouts. The catalog is in `src/data/products.ts`.

## Develop
```bash
npm install
npx expo start          # press i (iOS), a (Android) or w (web); or scan the QR with Expo Go
```

## Build mobile apps
```bash
npx eas-cli@latest build --platform android --profile preview   # installable APK
npx eas-cli@latest build --platform ios                          # needs an Apple developer account
```

## Web / Vercel
```bash
npm run build:web       # outputs dist/
```
`vercel.json` builds with `expo export --platform web`, serves `dist/` and rewrites all routes to `index.html`.

## Auth
Auth runs through `src/store/AuthContext.tsx`. It's a demo service (accounts kept in memory for the session); replace `signIn`, `signUp` and `signInWithProvider` with calls to your backend (Supabase, Firebase or your own API) — the screens don't need to change.

## Checks
```bash
npx tsc --noEmit
npx expo lint
```

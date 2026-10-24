# Fitsx

A shoe store app for **iOS, Android and web**, built with Expo (React Native) and Expo Router.

## Screens
- **Splash** – native splash (logo on brand green) followed by an animated intro
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

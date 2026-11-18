# Dear Deepuuu ♡ — Magical Friendship Dedication Website

> *"Because some people make life bloom a little brighter."*

A full-stack MERN friendship dedication website designed and developed exclusively for a special female best friend named **Deepuuu**. Built with a whimsical floral garden aesthetic, emotional storytelling, subtle 10% playful flirting, interactive photo memories, handwritten letters, an interactive constellation experience, and a grand final gift box surprise.

---

## 🌸 Visual Identity & Design System

- **Palette**:
  - Blush Pink: `#F6D9E4`
  - Soft Lavender: `#E9DDF5`
  - Warm Cream: `#FFF5E9`
  - Peach: `#EBC6B5`
  - Sage Green: `#A8B89A`
  - Deep Plum: `#49364E`
  - Rose Accent: `#C7839D`
  - Soft White: `#FFFAF8`
- **Typography**:
  - Headings: *Playfair Display*
  - Body: *DM Sans* & *Poppins*
  - Handwritten Dedications & Notes: *Caveat*
- **Aesthetic Elements**: Floating flower petals, fluttering butterflies, 3D flip appreciation cards, Polaroid frames with washi tape, wax-sealed envelopes, interactive constellation night sky, and animated pastel gift box with confetti.

---

## ✨ Features & Website Structure

### 1. The Welcome Experience (Hero Section)
- Full-screen floral garden ambiance with soft gradients, floating petals, and butterfly animations.
- Eyebrow badge: *"A LITTLE WORLD MADE JUST FOR YOU"*
- Main heading: *"Dear Deepuuu ♡"*
- Subtitle: *"A garden full of memories, smiles and little secrets."*
- Pill CTA with smooth scroll down to the experience.
- Interactive ambient Web Audio API background garden chimes (non-autoplay, toggled by user with volume controls).

### 2. A Little About You
- 10 interactive 3D flip appreciation cards highlighting her smile, vibe, drama, golden heart, madness, presence, deep conversations, uniqueness, energy, and individuality.
- Single-click flip reveals personal handwritten notes. Includes "Reveal All" and "Reset Cards" controls.

### 3. Our Memory Lane
- Vertical alternating timeline (clean vertical on mobile) tracing 6 friendship milestones:
  1. The Beginning
  2. The Conversations
  3. The Unforgettable Moments
  4. The Little Things
  5. The Present
  6. To Be Continued...
- Scroll-triggered reveals with Framer Motion, milestone dates, category tags, icons, and photograph frames.

### 4. The Polaroid Wall
- Masonry-style gallery with authentic Polaroid frames, washi tape stickers, handwritten captions, and subtle tilt angles (-3° to +3°).
- Interactive hover effects: straightens tilt and zooms slightly.
- Fullscreen Lightbox Modal with Next/Previous navigation, arrow keys, Escape key support, and category filtering (All, Golden Moments, Candid, Vibes, Laughs, Adventures, Silly Faces).

### 5. Reasons You're Special
- 15 interactive cards mixing:
  - **Emotional**: Authenticity, comfort, listening, deserving happiness.
  - **Funny**: Academy Award drama, scientific madness, 404 logic not found, limited edition.
  - **Playfully Flirty (10%)**: Unfairly distracting smile, unexpectedly adorable pouting, applying to be her favourite person, effortless glow.
- Shuffle button ("Reveal Another Reason") and animated floral/heart flourish on reveal.

### 6. Open When... Letters
- 6 pastel digital envelopes with wax seals and airmail stamps:
  1. *Open when you're sad* 🌧️
  2. *Open when you're happy* ☀️
  3. *Open when you're bored* 🍿
  4. *Open when you miss our madness* ⚡
  5. *Open when you need motivation* 🚀
  6. *Open when you need a smile* 🌸
- Clicking an envelope breaks the wax seal, slides the letter out, and displays a personal letter formatted in Caveat handwritten font.

### 7. Our Little Universe
- Deep plum & lavender night sky constellation canvas with crescent moon and glowing nebulae.
- 12 clickable interactive stars in custom constellations representing inside jokes, 2 AM talks, pure chaos energy, secret keeping, and wishes.
- Interactive constellation lines connect visited stars. Touchscreen friendly.

### 8. The Final Surprise (Gift Box Climax)
- 3D pastel gift box with pink ribbon, gentle idle breathing animation, and floating sparkles.
- Clicking **"Open your surprise"** plays a ribbon untie sequence, opens the box lid, triggers a burst of pastel floral confetti (using `canvas-confetti`), and reveals the emotional dedication letter:
  > *"Dear Deepuuu, I don't know whether I say this enough, but I'm genuinely glad that you're part of my life..."*
- Options to re-wrap the gift box or print the dedication letter card.

### 9. Private Admin Panel (`/admin`)
- Secure password-protected administrative interface.
- Manage site settings & final letter dedication text.
- Add, edit, and delete memories with photograph URLs.
- Manage Polaroid photos & captions.
- Edit digital "Open When" letters and star whispers.
- "Preview Site" button to quickly review edits live.

---

## 🛠️ Tech Stack

- **Frontend**:
  - React 19 + Vite 6
  - Tailwind CSS v4 (`@tailwindcss/vite`)
  - Framer Motion (for fluid micro-interactions and scroll animations)
  - Lucide React (feather-style icons)
  - Canvas Confetti (floral confetti bursts)
  - React Router DOM v7
- **Backend**:
  - Node.js & Express.js (ES modules)
  - MongoDB Atlas & Mongoose (with in-memory fallback seed store)
  - JWT Authentication & Bcrypt password hashing
  - Multer (photo upload handling)
- **Deployment**:
  - Frontend: Vercel / Netlify
  - Backend: Render / Railway
  - Database: MongoDB Atlas

---

## 🚀 Quick Start & Installation

### 1. Clone & Install Dependencies

```bash
# Install root, client, and server dependencies
npm install
npm install --prefix client
npm install --prefix server
```

### 2. Configure Environment Variables

Create `server/.env` based on `server/.env.example`:

```env
PORT=5000
NODE_ENV=development

# Optional: MongoDB Atlas Connection URI (if omitted, server runs smoothly with in-memory store)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/deardeepu?retryWrites=true&w=majority

# JWT & Admin Credentials
JWT_SECRET=deepuuu_magical_secret_jwt_key_2026
ADMIN_USERNAME=admin
ADMIN_PASSWORD=deepu123
```

### 3. Run Development Servers

```bash
# Runs both client (http://localhost:5173) and server (http://localhost:5000) concurrently
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Admin Access

- Access the admin portal at: [http://localhost:5173/admin](http://localhost:5173/admin) (or via the subtle lock icon in the footer).
- Default credentials:
  - **Username**: `admin`
  - **Password**: `deepu123`

### 5. Production Build & Start

```bash
# Build the client into client/dist
npm run build

# Start the Node.js production server (serves API + client)
npm start
```

---

## 🌐 Deployment Guide

### Frontend on Vercel
1. Set the root directory to `client` or configure build command: `npm run build --prefix client` and output directory: `client/dist`.
2. Add environment variable: `VITE_API_URL` pointing to your deployed backend URL.

### Backend on Render
1. Create a new **Web Service** pointing to the repository.
2. Build command: `npm install --prefix server`
3. Start command: `node server/server.js`
4. Add environment variables:
   - `MONGODB_URI`: your MongoDB Atlas connection string
   - `JWT_SECRET`: your secret key
   - `ADMIN_USERNAME`: your admin username
   - `ADMIN_PASSWORD`: your secure password

---

Made with lots of smiles, a little madness, and unlimited friendship for **Deepuuu** ♡

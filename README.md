# KickOff ⚽ - Football Match-Management Mobile App

A cross-platform native mobile app built with **React Native**, **Expo**, and **TypeScript** for iOS and Android. Designed for grassroots footballers and pitch organizers to host matches, manage rosters, formulate tactical lineups, generate balanced squads, split payments, and track live match scores.

---

## 📱 Features

1. **Match Discovery & Feed**:
   - Filter games by format (`5v5`, `7v7`, `8v8`, `11v11`) or search by venue and city.
   - Real-time spot availability progress indicator.

2. **Match Details & RSVP**:
   - One-tap RSVP / Leave match.
   - Automatic waitlist placement when a match reaches capacity.
   - Match countdown, venue amenities (showers, parking, bibs, water), and surface guidelines.

3. **Tactical Pitch & Lineup Builder**:
   - Visual football pitch with authentic field markings (center circle, penalty boxes, arcs, goalposts).
   - Formations support for 5v5 (Diamond 1-2-1, 2-1-1, 2-2), 7v7 (2-3-1, 3-2-1, 2-2-2), and 11v11 (4-3-3, 4-4-2).
   - Tap-to-assign player slots, swap positions, and assign set-piece roles (Ⓒ Captain, 🧤 Goalkeeper, ⚽ Penalty Taker, 🎯 Free-Kick Taker).

4. **Smart & Balanced Team Generator**:
   - **Balanced Mode**: Equalizes squads based on player overall ratings (OVR) and goalkeeping/outfield roles.
   - **Pure Random Mode**: Shuffles players randomly for casual play.
   - Instant re-roll with live fairness match % and attribute comparison.

5. **Pitch Fee Splitting & Payment Tracking**:
   - Total venue fee breakdown with per-player share calculation.
   - Attendee checklist with status pills (`PAID`, `PENDING`, `EXEMPT`).
   - Organizer toggle to mark payments and push reminders.
   - Host payment details display (UPI, IBAN, PayPal).

6. **Live Scorekeeper & Referee Center**:
   - Stopwatch match clock with start/pause/reset.
   - Scoreboard counter with goal logger (records scorer and assist provider).
   - Yellow and red card logger.
   - Final whistle confirmation that archives the match to Match History.

7. **Match History & Results**:
   - Past scorelines, MVP badges, and chronological goal timelines.

8. **Notifications & Player Profile**:
   - Match invites, kickoff reminders, and fee nudges.
   - Player career statistics: Matches, Win Rate, Goals, Assists, Clean Sheets, MVPs, and Fair Play rating.
   - Attack, Defense, and Stamina attribute ratings.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Expo Go app on your iOS or Android mobile device (or an Android Emulator / iOS Simulator)

### Run the App
```bash
# 1. Navigate to the project directory
cd kickoff-match-app

# 2. Start the Expo development server
npx expo start
```

Scan the QR code with:
- **Expo Go** on Android
- **Camera app** on iOS (with Expo Go installed)
- Press `a` in the terminal to open on an Android Emulator
- Press `i` in the terminal to open on an iOS Simulator

---

## 🔌 Connecting to Node.js/Express + MongoDB Later

The app is architected with a decoupled **Service Layer** (`src/services/`) and strong TypeScript interfaces (`src/types/`):

- **Data Models**: The interfaces in `src/types/match.ts`, `player.ts`, and `payment.ts` map 1:1 to Mongoose schemas.
- **Service Layer**: In `src/services/matchService.ts`, `teamService.ts`, and `paymentService.ts`, swap the mock delay methods with standard REST calls (e.g. `axios.get('/api/matches')`, `axios.post('/api/matches')`).
- No modifications to the UI screens or state context are needed when integrating the backend!

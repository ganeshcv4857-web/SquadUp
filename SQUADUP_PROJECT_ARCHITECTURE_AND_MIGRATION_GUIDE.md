# SQUADUP — FULL PROJECT ARCHITECTURE, FILE INVENTORY & CLOUD/CORTEX MIGRATION GUIDE
========================================================================================
Generated for Codebase Handover, Claude, Codex, and Cloud/Cortex Migration.
Project: SquadUp (kickoff-match-app)
Platform: React Native / Expo SDK 57 / TypeScript / Web & Native Mobile

----------------------------------------------------------------------------------------
TABLE OF CONTENTS
----------------------------------------------------------------------------------------
1. Executive Summary & Tech Stack
2. Complete Directory Structure & File Map
3. Navigation & Screen Flow Architecture
4. State Management & Provider Hierarchy
5. Services & Business Logic Layer
6. Reusable Components & Sharing Modules
7. Completed Features & Implemented Enhancements (Audit Log)
8. Database Schemas & Data Models for Cloud Migration
9. Cloud & Cortex Migration Blueprint & Event Architecture

========================================================================================
1. EXECUTIVE SUMMARY & TECH STACK
========================================================================================

SquadUp is a mobile-first football match management, team generation, live scorekeeping,
multiplayer room drafting, and tournament retrospective application.

Core Technologies:
- React Native: 0.86.3
- React: 19.2.3
- Expo SDK: 57.0.20
- Web Runtime: react-native-web 0.21.2
- Language: TypeScript 6.0.3 (Strict mode, 0 type errors)
- Navigation:
  * @react-navigation/native 7.3.18
  * @react-navigation/native-stack 7.18.10
  * @react-navigation/bottom-tabs 7.18.18
- UI & Graphics:
  * react-native-svg 15.15.4 (tactical pitch, spin wheel, badges)
  * expo-linear-gradient 57.0.1 (stadium dark gradients)
  * @expo-google-fonts/zen-dots 0.4.2 (custom sports branding font)
  * @expo/vector-icons 15.0.2 (Ionicons, MaterialCommunityIcons, FontAwesome5)
- Media & Photos:
  * expo-image-picker 57.0.20 (native gallery photo upload)
  * DOM FileReader API (web photo upload fallback)
- Storage & Local State:
  * @react-native-async-storage/async-storage 2.2.0
  * Reactive singleton pattern (TournamentStore)
  * React Context API (Auth, Room, Multiplayer, Match, User, Theme)
  * Web BroadcastChannel API for multi-tab real-time event simulation

========================================================================================
2. COMPLETE DIRECTORY STRUCTURE & FILE MAP
========================================================================================

Root Directory: C:\Users\HP\.gemini\antigravity\scratch\kickoff-match-app\

--- ROOT FILES ---
- package.json          : Project manifest, scripts (start, web, android, ios), dependencies.
- tsconfig.json         : TypeScript compiler settings.
- app.json              : Expo configuration (slug, bundleIdentifier, splash, icons).
- index.ts              : Application entry point registering App with Expo runtime.
- App.tsx               : Top-level root component wrapping all state providers & navigator.
- START_APP.bat         : Windows batch script to start Expo web server (localhost:8081).
- AGENTS.md / CLAUDE.md : Agent workflow and Expo SDK guidelines.

--- NAVIGATION (src/navigation/) ---
- RootNavigator.tsx     : Native stack navigator defining all application route names & params.
- TabNavigator.tsx      : Bottom tab bar navigator (Home, Friends, Games, SplitUp, Alerts).

--- STATE STORES & CONTEXTS (src/store/) ---
- AuthContext.tsx       : Phone OTP auth, persisted session (@squadup_auth_user), profile setup.
- UserContext.tsx       : User profile, ratings, unread notifications, friend relations.
- RoomContext.tsx       : Room lobby state, active room code, member list, claim arbitration.
- MultiplayerContext.tsx: Connection state (CONNECTED/RECONNECTING/OFFLINE), session recovery.
- MatchContext.tsx      : Match feed, filter tabs, active scorekeeper, and pitch fee payments.
- TournamentStore.ts    : Singleton tournament engine, bracket progression, frozen player snapshots.
- ThemeContext.tsx      : Stadium dark/light theme engine, ZenDots font loader.

--- SERVICES (src/services/) ---
- roomService.ts            : Room lifecycle, 6-char room codes, role management, BroadcastChannel.
- multiplayerSyncService.ts : Exponential backoff reconnection, authoritative timers, host transfer.
- matchService.ts           : Match CRUD, team formations, attendee joining/leaving.
- teamService.ts            : Rating-based team balancing algorithms, 2-4 team generator.
- paymentService.ts         : Match pitch fee calculations, payment status toggling.
- splitService.ts           : Group expense calculations, settlement tracking, UPI references.
- squadService.ts           : Permanent football squads/clubs, win/loss records.
- statsService.ts           : Player ratings, fair play score, match history aggregation.
- userService.ts            : Profile updates, achievements, friend list management.
- monetizationService.ts    : Native banner ad configurations, turf partner affiliations.
- mockData.ts               : Default venues, turf partners, initial sample data.

--- TYPES & DATA SCHEMAS (src/types/) ---
- player.ts       : Player, PlayerStats, SpecificPosition, PreferredFoot.
- match.ts        : Match, Venue, MatchAttendee, MatchEvent, MatchScore, TeamRoles.
- matchPlay.ts    : DraftPlayer, DraftLeader, TeamDraftData, KnockoutMatch, GoalEvent, TournamentStats.
- room.ts         : RoomData, RoomMember, RoomRole, ExtraPlayerClaim, ClaimContestChoice.
- multiplayer.ts : ConnectionState, RoomAction, HostTransferRecord, MatchReadinessState.
- payment.ts      : MatchPaymentSummary, PlayerPaymentRecord, PaymentStatus, PaymentMethod.
- team.ts         : Team lineup definitions, pitch slot coordinates, jersey assignments.
- squad.ts        : Squad/Club profile definitions, roster member roles.
- stats.ts        : Aggregate tournament & player stats.
- notification.ts : System notifications, claim requests, match invite payloads.
- monetization.ts : Ad unit configurations, partner turf contracts.

--- CONSTANTS & UTILITIES (src/constants/ & src/utils/) ---
- avatars.ts     : 12 built-in sports emoji presets, formatPlayerJersey(), getPlayerInitial().
- colors.ts      : Stadium dark palette, Emerald green accents, warning/danger tokens.
- formations.ts  : Football tactical formation coordinates (5v5 1-2-1, 7v7 2-3-1, 11v11 4-3-3).
- layout.ts      : Screen dimension constants, responsive breakpoint helpers.
- theme.ts       : Typography scales, line-height tokens, font weights.
- imagePicker.ts : Cross-platform photo picker (DOM FileReader on Web, expo-image-picker on Native).

--- COMPONENTS (src/components/) ---
Common:
- PlayerAvatar.tsx         : Universal avatar rendering photo URI, sports preset, initials, jersey badge.
- ConnectionIndicator.tsx  : Real-time network status pill (🟢 Connected, 🟡 Reconnecting, 🔴 Offline).
- ResumeMatchBanner.tsx    : Dismissible banner prompting users to resume ongoing drafts/matches.
- BackHeader.tsx           : Navigation header with confirmation on back during live drafts.
- Header.tsx               : Standard top screen header.
- Button.tsx               : Reusable button with variants (primary, outline, ghost).
- AnimatedButton.tsx       : Pressable button with scale spring animation.
- Badge.tsx                : Status pill badge.
- Chip.tsx                 : Filter chip component.
- Card.tsx                 : Rounded stadium surface container.
- AnimatedCard.tsx         : Card with entry reveal animation.
- AnimatedSuccessIcon.tsx  : Success checkmark animation.
- AnimatedLoadingState.tsx : Skeleton loader for network delays.
- AnimatedLogo.tsx         : Pulsing brand logo.
- NativeBannerAd.tsx       : In-app partner sponsorship banner.

Sharing & Social:
- MatchWrappedModal.tsx    : Strict 9:16 (1080x1920) Instagram Story export card. Both teams side-by-side.
- PlayerCardModal.tsx      : FIFA Ultimate Team style shareable player card with ratings and stats.

Tactical Pitch:
- TacticalPitch.tsx        : Interactive SVG pitch with draggable player nodes and formation lines.
- FormationSelector.tsx    : Quick formation switcher (1-2-1, 2-2, 2-3-1, 3-2-1, 4-3-3).

Match & Multiplayer:
- MatchCard.tsx            : Match feed list item card.
- MatchReadinessModal.tsx  : Pre-match player readiness confirmation checklist.
- SpotProgressBar.tsx      : Roster capacity visual progress bar.
- BalancedTeamsModal.tsx   : Automated player re-balancer based on overall skill ratings.
- PlayerExchangeModal.tsx  : Mid-draft trade proposal modal between team captains.
- TeamGeneratorModal.tsx   : Random and skill-balanced team generator modal.

Payment:
- PaymentSummaryCard.tsx   : Total pitch fee, individual share, amount collected.
- PlayerPaymentRow.tsx     : Individual player payment status toggle (Paid / Pending).

--- SCREENS (src/screens/) ---
Auth:
- SplashScreen.tsx         : Initial launch screen with persisted session auto-restore.
- PhoneAuthScreen.tsx      : Phone number input with country code.
- OTPScreen.tsx            : 6-digit OTP verification (mock OTP: 123456).
- ProfileSetupScreen.tsx   : First-time onboarding: photo upload, avatar preset, jersey number, position.

Lobby & Rooms:
- LandingScreen.tsx        : Primary dashboard: Create Room, Join Room, Quick Match, Active Rooms.
- CreateRoomScreen.tsx     : Room creator form (title, turf venue, format, team count, goal target).
- JoinRoomScreen.tsx       : Alphanumeric 6-char room code entry + QR scanner mock.
- RoomLobbyScreen.tsx      : Real-time room waiting room, member list, role promotions, extra player claims.

Teams & Draft:
- CreateTeamsScreen.tsx    : Team captain nomination, team name & color assignment.
- SpinWheelScreen.tsx      : Precision automated team draw wheel: needle physics, notch studs, 2/3+ teams.
- PlayerDraftScreen.tsx    : Turn-based captain draft: pick order, claim arbitration, friend invite modal.
- InteractiveTurfScreen.tsx: Drag-and-drop tactical pitch: formations, player trades, readiness checks.
- TeamLineupScreen.tsx     : Visual formation overview for standard matches.

Match Center & Tournaments:
- MatchesFeedScreen.tsx        : Match discovery feed with filter tabs (Upcoming, Live, Finished).
- MatchDetailScreen.tsx        : Venue information, amenities, attendees, RSVP action.
- CreateMatchScreen.tsx        : Schedule a new match with turf selection and pitch fee.
- LiveScorekeeperScreen.tsx    : Referee scorekeeper: clock, goal entry (scorer + assist), cards, timeline.
- LiveTournamentMatchScreen.tsx: Tournament match runner: friendly series, knockouts, penalty shootouts.
- TournamentBracketScreen.tsx  : Visual knockout bracket with round progression.
- TournamentWrappedScreen.tsx  : Strict 9:16 (1080x1920) tournament story: podium, awards, rosters, watermark.
- MatchHistoryScreen.tsx       : Historical match explorer with full rosters, timeline, and 9:16 Wrapped launcher.

Profile & Financials:
- ProfileScreen.tsx        : Profile editor: photo, avatar, jersey #, player card, full Match History modal.
- AchievementsScreen.tsx   : Unlockable football milestone badges.
- FriendsScreen.tsx        : Friends list, player ratings, invite to room shortcuts.
- NotificationsScreen.tsx  : Real-time notification feed (invites, claims, payments).
- SquadsScreen.tsx         : Permanent squads/clubs list.
- SquadDetailScreen.tsx    : Squad stats, roster, recent match record.
- SplitUpScreen.tsx        : Group expense split dashboard.
- CreateSplitScreen.tsx    : Create custom turf expense split with UPI payment link.
- SplitDetailScreen.tsx    : Settlement checklist showing who paid and who owes.
- TurfPartnersScreen.tsx   : Partnered sports venues, amenity badges, direct booking.

========================================================================================
3. NAVIGATION & SCREEN FLOW ARCHITECTURE
========================================================================================

```
[ App Launch ]
      │
      ▼
[ SplashScreen ] ──── (Has Persisted Session?) ────► [ MainTabs (Home) ]
      │
      ▼ (No Session)
[ PhoneAuthScreen ] ──► [ OTPScreen ] ──► [ ProfileSetupScreen ] ──► [ MainTabs ]
                                                                             │
      ┌──────────────────────┬──────────────────────┬────────────────────────┤
      ▼                      ▼                      ▼                        ▼
 [ Home Tab ]          [ Friends Tab ]        [ Games Tab ]           [ SplitUp Tab ]
(LandingScreen)       (FriendsScreen)      (MatchesFeedScreen)        (SplitUpScreen)
      │
      ├─► [ CreateRoomScreen ] ──► [ RoomLobbyScreen ]
      │                                   │
      ├─► [ JoinRoomScreen ]   ───────────┤
      │                                   ▼
      │                          [ CreateTeamsScreen ]
      │                                   │
      │                                   ▼
      │                          [ SpinWheelScreen ] (Automated Draw)
      │                                   │
      │                                   ▼
      │                          [ PlayerDraftScreen ] (Captains Pick Order)
      │                                   │
      │                                   ▼
      │                          [ InteractiveTurfScreen ] (Tactical Pitch & Lineups)
      │                                   │
      │                     ┌─────────────┴─────────────┐
      │                     ▼                           ▼
      │        [ LiveTournamentMatchScreen ]   [ TournamentBracketScreen ]
      │                     │                           │
      │                     ├─► [ Penalty Shootout ]     │
      │                     │                           │
      │                     ▼                           ▼
      │           [ MatchWrappedModal ]      [ TournamentWrappedScreen ]
      │           (9:16 Instagram Story)     (9:16 Tournament Poster)
      │
      ├─► [ MatchHistoryScreen ] ──► Full Detail / 9:16 Wrapped Launcher
      └─► [ ProfileScreen ]      ──► Photo Upload / Jersey # / Match History
```

========================================================================================
4. STATE MANAGEMENT & PROVIDER HIERARCHY
========================================================================================

The App.tsx provider stack wraps the application in the following order:

1. SafeAreaProvider (react-native-safe-area-context)
2. ThemeProvider (src/store/ThemeContext.tsx)
   - Manages light/dark mode and loads the ZenDots Google font.
3. AuthProvider (src/store/AuthContext.tsx)
   - Manages current user session (@squadup_auth_user in AsyncStorage).
   - Holds user ID, phone, name, avatarUrl, avatarPreset, jerseyNumber.
4. UserProvider (src/store/UserContext.tsx)
   - Manages friends, user statistics, unread notification counter.
5. RoomProvider (src/store/RoomContext.tsx)
   - Wraps roomService.ts. Tracks current active room, member list, and real-time claims.
6. MultiplayerProvider (src/store/MultiplayerContext.tsx)
   - Wraps multiplayerSyncService.ts. Listens to online/offline network changes.
   - Triggers "Back online ✓" toast, host transfer alerts, and session resumption prompt.
7. MatchProvider (src/store/MatchContext.tsx)
   - Manages scheduled/live matches, active scorekeeper, and payment collections.
8. TournamentStore (src/store/TournamentStore.ts)
   - Singleton reactive store with subscribe() pattern.
   - Manages knockout fixtures, 2-team infinite friendly series, match stats, and award calculations.

========================================================================================
5. SERVICES & BUSINESS LOGIC LAYER
========================================================================================

1. roomService.ts
   - Generates 6-character alphanumeric room codes (e.g. "SQUAD7").
   - Manages membership: Host, Co-organizer, Team Leader, Player.
   - Extra-Player Arbitration: Broadcasts claims when an uneven player is picked.
   - Cross-tab synchronization using Web BroadcastChannel and storage events.

2. multiplayerSyncService.ts
   - Exponential backoff reconnection engine (1s, 2s, 4s, 8s, up to 15s).
   - Connection states: CONNECTED 🟢, RECONNECTING 🟡, OFFLINE 🔴.
   - Authoritative room state recovery ("Server State Wins").
   - Host transfer fallback: Co-organizer ➔ Team Leader ➔ Longest connected player.
   - Resumable session persistence: remembers active room, screen, and match title.

3. TournamentStore.ts
   - Deep snapshots of rosters: clones player name, team, avatar, and jersey number at tournament start.
   - Generates knockout tournament fixtures (Quarterfinals, Semifinals, Final, 3rd Place).
   - Supports 2-team infinite series where teams can play repeated matches on their own terms.
   - Awards calculation engine:
     * Tournament MVP: highest combination of goals, assists, and MOTM awards.
     * Golden Boot: player with the most goals scored.
     * Golden Glove: goalkeeper/defense with the most clean sheets.

4. imagePicker.ts
   - Cross-platform helper: uses DOM FileReader on Web, expo-image-picker on iOS/Android.
   - Returns { uri, base64, canceled } for avatar profile updates.

========================================================================================
6. REUSABLE COMPONENTS & SHARING MODULES
========================================================================================

1. PlayerAvatar.tsx
   - Universal component used throughout every screen.
   - Precedence: Custom photo URI ➔ Sports preset badge ➔ Name initials fallback.
   - Optional corner badge displaying the player's jersey number.
   - Colored ring border matching the player's assigned team color.

2. MatchWrappedModal.tsx
   - Strict 9:16 (1080x1920) aspect ratio: CARD_HEIGHT = CARD_WIDTH * (16 / 9).
   - Fixed stadium dark gradient: ['#030C08', '#041420', '#060C18'] (theme-invariant).
   - Side-by-side two-column squad roster layout (Team A vs Team B).
   - Displays player jersey number badge, player name, captain indicator, and live match stats (goals, assists, MOTM).
   - Minimal watermark at the base of the poster: "SquadUp".
   - Direct export/sharing to Instagram Stories and WhatsApp.

3. TournamentWrappedScreen.tsx
   - Strict 9:16 format with champion crown hero podium.
   - Individual awards cards: Tournament MVP, Golden Boot, Golden Glove.
   - Tournament statistics grid: Total Matches, Total Goals, Goals/Game, Play Time.
   - Side-by-side participating squad rosters with player numbers and goal counts.
   - Minimal "SquadUp" watermark.

4. SpinWheelScreen.tsx
   - Aerodynamic precision needle indicator with spring physics and oscillation tick animation.
   - Metallic gold/charcoal rim with precision notch studs (no tacky carnival bulbs).
   - Compact center hub (HUB_RADIUS = 28) preventing team name text clipping.
   - 2-team split mode (Red vs. Blue) and multi-team radial pie mode (3–6 teams).

5. MatchHistoryScreen.tsx
   - Comprehensive historical match viewer.
   - 3-tab layout: [Overview], [Teams & Lineups], [Timeline].
   - Lists all players with avatars, jersey numbers, captain badges, goals, and assists.
   - Direct "Wrapped (9:16)" button to launch MatchWrappedModal for any past match.

========================================================================================
7. COMPLETED FEATURES & AUDIT LOG
========================================================================================

[Phase 1] Multiplayer & Network Reliability
- Reconnection engine with exponential backoff and persistent status pill.
- Authoritative state recovery: "Server State Wins".
- Automatic host ownership transfer with grace period.
- Race-condition and player selection conflict prevention.
- Resumable room session banner when reopening the app.

[Phase 2] Player Customization & Identity
- Gallery photo upload via cross-platform image picker.
- 12 built-in sports avatar presets with dedicated emoji badges.
- Optional jersey numbers (#1–99) stored separately from user IDs.
- Duplicate jersey number differentiation using team color indicators.
- Historical player snapshots preserving jersey numbers and avatars at match time.

[Phase 3] Spin Wheel & Team Draw Polish
- Eliminated text clipping under the center star hub.
- Replaced carnival roulette bulbs with a sleek sports rim and notch studs.
- Added aerodynamic precision needle with oscillation tick animation.
- Smooth cubic/bezier deceleration physics.

[Phase 4] Match & Tournament Wrapped Overhaul
- Strict 1080x1920 (9:16) format with zero layout overflow.
- Side-by-side two-column squad layout fitting all participating players.
- Fixed dark stadium gradient unaffected by light/dark mode.
- Minimal "SquadUp" watermark at the base of the canvas.
- Removed AI slop and unnecessary text commentary.

[Phase 5] Match History Expansion
- Upgraded MatchHistoryScreen and ProfileScreen's Match History modal.
- Detailed squad view showing players, jersey numbers, and goal tallies for both teams.
- Chronological goal and card timeline with minute markers.
- Integrated 9:16 Match Wrapped launcher for historical matches.

========================================================================================
8. DATABASE SCHEMAS FOR CLOUD / CORTEX MIGRATION
========================================================================================

When transitioning from AsyncStorage/local stores to a cloud database (PostgreSQL,
Supabase, Firestore, or Cortex backend), create the following schemas:

TABLE: users
----------------------------------------------------------------------------------------
- id                : UUID / VARCHAR(64) PRIMARY KEY
- phone             : VARCHAR(20) UNIQUE NOT NULL
- name              : VARCHAR(100) NOT NULL
- email             : VARCHAR(150)
- avatar_url        : TEXT (S3 / Cloud Storage URL)
- avatar_preset     : VARCHAR(50) (e.g. 'striker_fire', 'goalkeeper_wall')
- jersey_number     : INTEGER CHECK (jersey_number BETWEEN 1 AND 99)
- rating            : NUMERIC(3, 1) DEFAULT 4.5
- overall_rating    : INTEGER DEFAULT 75
- primary_position  : VARCHAR(10) CHECK (primary_position IN ('GK', 'DEF', 'MID', 'FWD'))
- specific_position : VARCHAR(10) (e.g. 'ST', 'CB', 'CM')
- preferred_foot    : VARCHAR(10) DEFAULT 'Right'
- matches_played    : INTEGER DEFAULT 0
- goals             : INTEGER DEFAULT 0
- assists           : INTEGER DEFAULT 0
- clean_sheets      : INTEGER DEFAULT 0
- mvp_count         : INTEGER DEFAULT 0
- created_at        : TIMESTAMP WITH TIME ZONE DEFAULT NOW()
- updated_at        : TIMESTAMP WITH TIME ZONE DEFAULT NOW()

TABLE: rooms
----------------------------------------------------------------------------------------
- id                : UUID PRIMARY KEY
- room_code         : VARCHAR(6) UNIQUE NOT NULL (e.g. 'SQUAD7')
- host_id           : UUID REFERENCES users(id) ON DELETE CASCADE
- co_organizer_id   : UUID REFERENCES users(id)
- title             : VARCHAR(150) NOT NULL
- venue_name        : VARCHAR(150) NOT NULL
- format            : VARCHAR(20) DEFAULT '7v7'
- num_teams         : INTEGER DEFAULT 2
- players_per_team  : INTEGER DEFAULT 7
- goal_target       : INTEGER DEFAULT 0
- status            : VARCHAR(30) DEFAULT 'LOBBY' (LOBBY, DRAFT, PITCH, LIVE, COMPLETED)
- revision          : INTEGER DEFAULT 1 (Optimistic lock counter for conflict prevention)
- created_at        : TIMESTAMP WITH TIME ZONE DEFAULT NOW()
- updated_at        : TIMESTAMP WITH TIME ZONE DEFAULT NOW()

TABLE: room_members
----------------------------------------------------------------------------------------
- id                : UUID PRIMARY KEY
- room_id           : UUID REFERENCES rooms(id) ON DELETE CASCADE
- user_id           : UUID REFERENCES users(id) ON DELETE CASCADE
- role              : VARCHAR(30) DEFAULT 'PLAYER' (HOST, CO_ORGANIZER, TEAM_LEADER, PLAYER)
- team_id           : VARCHAR(50)
- is_ready          : BOOLEAN DEFAULT FALSE
- is_connected      : BOOLEAN DEFAULT TRUE
- joined_at         : TIMESTAMP WITH TIME ZONE DEFAULT NOW()
- UNIQUE(room_id, user_id)

TABLE: room_teams
----------------------------------------------------------------------------------------
- id                : UUID PRIMARY KEY
- room_id           : UUID REFERENCES rooms(id) ON DELETE CASCADE
- team_name         : VARCHAR(100) NOT NULL
- color             : VARCHAR(20) NOT NULL
- leader_id         : UUID REFERENCES users(id)
- draft_pick_order  : INTEGER

TABLE: matches
----------------------------------------------------------------------------------------
- id                : UUID PRIMARY KEY
- room_id           : UUID REFERENCES rooms(id)
- title             : VARCHAR(150) NOT NULL
- venue_name        : VARCHAR(150) NOT NULL
- venue_city        : VARCHAR(100)
- format            : VARCHAR(20) DEFAULT '7v7'
- surface           : VARCHAR(50) DEFAULT 'Artificial Turf'
- date              : DATE NOT NULL
- start_time        : TIME
- end_time          : TIME
- team_a_name       : VARCHAR(100) NOT NULL
- team_b_name       : VARCHAR(100) NOT NULL
- team_a_score      : INTEGER DEFAULT 0
- team_b_score      : INTEGER DEFAULT 0
- team_a_color      : VARCHAR(20) DEFAULT '#10B981'
- team_b_color      : VARCHAR(20) DEFAULT '#EF4444'
- duration_minutes  : INTEGER DEFAULT 50
- mvp_user_id       : UUID REFERENCES users(id)
- status            : VARCHAR(30) DEFAULT 'UPCOMING' (UPCOMING, LIVE, COMPLETED)
- total_pitch_fee   : NUMERIC(10, 2) DEFAULT 0.00
- fee_per_player    : NUMERIC(10, 2) DEFAULT 0.00
- created_at        : TIMESTAMP WITH TIME ZONE DEFAULT NOW()

TABLE: match_players_snapshot
----------------------------------------------------------------------------------------
- id                : UUID PRIMARY KEY
- match_id          : UUID REFERENCES matches(id) ON DELETE CASCADE
- user_id           : UUID REFERENCES users(id)
- team_key          : VARCHAR(10) NOT NULL ('teamA' | 'teamB')
- player_name       : VARCHAR(100) NOT NULL (Frozen at match time)
- jersey_number     : INTEGER (Frozen at match time)
- avatar_url        : TEXT (Frozen at match time)
- avatar_preset     : VARCHAR(50) (Frozen at match time)
- is_captain        : BOOLEAN DEFAULT FALSE
- goals             : INTEGER DEFAULT 0
- assists           : INTEGER DEFAULT 0
- yellow_cards      : INTEGER DEFAULT 0
- red_cards         : INTEGER DEFAULT 0

TABLE: match_events
----------------------------------------------------------------------------------------
- id                : UUID PRIMARY KEY
- match_id          : UUID REFERENCES matches(id) ON DELETE CASCADE
- minute            : INTEGER NOT NULL
- type              : VARCHAR(30) NOT NULL ('GOAL', 'YELLOW_CARD', 'RED_CARD')
- team_key          : VARCHAR(10) NOT NULL ('teamA' | 'teamB')
- scorer_user_id    : UUID REFERENCES users(id)
- scorer_name       : VARCHAR(100) NOT NULL
- assist_user_id    : UUID REFERENCES users(id)
- assist_name       : VARCHAR(100)
- created_at        : TIMESTAMP WITH TIME ZONE DEFAULT NOW()

TABLE: splits
----------------------------------------------------------------------------------------
- id                : UUID PRIMARY KEY
- match_id          : UUID REFERENCES matches(id)
- title             : VARCHAR(150) NOT NULL
- venue_name        : VARCHAR(150)
- total_amount      : NUMERIC(10, 2) NOT NULL
- organizer_id      : UUID REFERENCES users(id)
- organizer_upi_id  : VARCHAR(100)
- created_at        : TIMESTAMP WITH TIME ZONE DEFAULT NOW()

TABLE: split_shares
----------------------------------------------------------------------------------------
- id                : UUID PRIMARY KEY
- split_id          : UUID REFERENCES splits(id) ON DELETE CASCADE
- user_id           : UUID REFERENCES users(id)
- user_name         : VARCHAR(100) NOT NULL
- amount            : NUMERIC(10, 2) NOT NULL
- status            : VARCHAR(20) DEFAULT 'PENDING' ('PENDING' | 'PAID')
- paid_at           : TIMESTAMP WITH TIME ZONE

========================================================================================
9. CLOUD & CORTEX MIGRATION BLUEPRINT & EVENT ARCHITECTURE
========================================================================================

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER (SquadUp App)                      │
│          React Native (iOS, Android) & React Native Web                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / WebSocket (WSS)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      CORTEX / CLOUD API GATEWAY                        │
│   • Auth Verification (JWT / Bearer Token)                             │
│   • Rate Limiting & Optimistic Lock Verification (Room Revision Check) │
│   • WebSocket / Socket.IO Connection Pool                              │
└──────────────┬────────────────────┬────────────────────┬───────────────┘
               │                    │                    │
               ▼                    ▼                    ▼
     ┌───────────────────┐ ┌────────────────┐ ┌────────────────────────┐
     │  REST / GRAPHQL   │ │ REAL-TIME PUBSUB│ │  OBJECT STORAGE (S3/   │
     │  ENDPOINT ROUTES  │ │ (REDIS / WSS)  │ │  CLOUD STORAGE BLOB)   │
     └─────────┬─────────┘ └────────┬───────┘ └──────────┬─────────────┘
               │                    │                    │
               ▼                    ▼                    ▼
     ┌───────────────────┐ ┌────────────────┐ ┌────────────────────────┐
     │ PRIMARY DATABASE  │ │ Socket Events: │ │ Assets:                │
     │ (PostgreSQL/SQL)  │ │ • room:joined  │ │ • Profile Photos       │
     │ • Users & Stats   │ │ • draft:pick   │ │ • Pre-signed Uploads   │
     │ • Rooms & Drafts  │ │ • claim:alert  │ │ • 9:16 Wrapped Posters │
     │ • Matches & Evts  │ │ • match:score  │ │   Export Storage       │
     │ • Splits & Dues   │ │ • host:transfer│ │                        │
     └───────────────────┘ └────────────────┘ └────────────────────────┘
```

MIGRATION ACTION PLAN:

Step 1: Replace Mock Authentication
- File: src/store/AuthContext.tsx
- Current: sendOTP() mocks phone number; verifyOTP() checks for hardcoded "123456".
- Migration: Replace with POST /api/auth/send-otp and POST /api/auth/verify-otp.
- Save returned JWT session token in SecureStore / AsyncStorage.

Step 2: Replace BroadcastChannel with WebSockets
- Files: src/services/roomService.ts, src/services/multiplayerSyncService.ts
- Current: Uses window.BroadcastChannel and AsyncStorage storage events.
- Migration: Connect to wss://api.squadup.com/socket with client credentials.
- Wire subscription handlers (subscribeConnection, subscribeReadiness, subscribeBackOnline)
  to server socket events.

Step 3: Direct Cloud Upload for Avatars
- File: src/utils/imagePicker.ts
- Current: Returns local base64/URI.
- Migration: Request pre-signed S3/Cloud Storage upload URL via POST /api/uploads/avatar-presigned-url,
  upload binary directly, and store the resulting CDN URL in users.avatar_url.

Step 4: Atomic Transactions for Draft & Claims
- Files: src/screens/teams/PlayerDraftScreen.tsx, src/services/roomService.ts
- Current: Local array checks.
- Migration: When a team captain claims a player, send POST /api/rooms/:id/draft-pick
  including the current room revision ID. The backend performs an atomic database transaction
  (SELECT ... FOR UPDATE) to ensure the player is still available before confirming the pick.

========================================================================================
END OF DOSSIER — READY FOR CLOUD, CORTEX, CLAUDE & CODEX INGESTION
========================================================================================

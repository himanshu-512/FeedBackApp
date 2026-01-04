# 📍 Product Roadmap  
## Anonymous Feedback Chat Platform

---

## 🎯 Vision

Build a **trust-first, anonymous feedback platform** where users freely discuss products in real-time chat rooms, and those conversations are transformed into **aggregated, company-ready insights**—without exposing identities or raw messages.

---

## 🧠 Core Principles

- Privacy by default (anonymous users)
- Conversation-first, not profiles
- Insights over raw data
- Scalability through microservices
- Trust before monetization

---

## 🔹 Phase 0: Planning & Foundation

**Goal:** Create clarity and a runnable base.

### Deliverables
- Final MVP scope defined
- Tech stack finalized
- Monorepo created
- Git workflow established
- Team roles assigned
- Architecture diagram documented

### Key Decisions
- Phase-1 focuses only on anonymous chat + insights
- No background data collection
- No social profiles
- No payments (wallet is read-only)

**Status:** ✅ Planned

---

## 🔹 Phase 1: Core Backend Services

**Goal:** Backend services working independently.

### Services
- API Gateway
- Authentication Service (anonymous)
- Channel Service

### Features
- Anonymous user creation (UUID + random username)
- JWT-based authentication
- Create, list, and join channels
- Basic rate limiting

**Exit Criteria**
- All APIs functional via Postman
- No frontend dependency

**Status:** ⏳ In Progress

---

## 🔹 Phase 2: Frontend Foundation (Mobile App)

**Goal:** User can open the app and join a channel.

### Screens
- Splash Screen
- Anonymous Setup
- Home (Channel List)
- Chat Screen (UI only)

### Features
- Anonymous login flow
- Channel listing and joining
- Navigation structure

**Exit Criteria**
- User installs app → becomes anonymous → sees channels → joins one

**Status:** ⏳ Planned

---

## 🔹 Phase 3: Real-Time Chat System

**Goal:** Enable stable, real-time anonymous chat.

### Backend
- Chat Service (WebSocket / Socket.IO)
- Message Store (MongoDB)
- Basic moderation (rate limit, profanity filter)

### Frontend
- Live chat UI
- Message input and rendering

### Constraints
- No DMs
- No user profiles
- No advanced moderation yet

**Exit Criteria**
- 10–20 concurrent users can chat without issues

**Status:** ⏳ Planned

---

## 🔹 Phase 4: Analysis & Insights Engine

**Goal:** Convert conversations into structured insights.

### Analysis Service
- Asynchronous message processing
- Text cleaning
- Sentiment detection
- Topic grouping
- Frequency counting

### Insights Service
- Aggregation rules
- Privacy thresholds
- Insight summaries (issues, positives, sentiment)

**Exit Criteria**
- At least one channel generates a clean insight report

**Status:** ⏳ Planned

---

## 🔹 Phase 5: Wallet & Trust Features

**Goal:** Improve retention and transparency.

### Wallet (Read-Only)
- Earnings per contribution
- Simple ledger view
- Withdraw disabled (“Coming Soon”)

### Official Channel
- Platform announcements
- Polls for future features
- User involvement in decisions

**Exit Criteria**
- Users understand value and feel rewarded

**Status:** ⏳ Planned

---

## 🔹 Phase 6: Stability & Scale Preparation

**Goal:** Make the system production-ready.

### Infrastructure
- Kafka integration (Chat → Analysis)
- Dockerization of services
- Logging and health checks
- Error handling and retries

### Architecture Focus
- Chat isolated from analysis
- Async processing
- Failure isolation

**Exit Criteria**
- System handles load spikes without crashing

**Status:** ⏳ Planned

---

## 🔹 Phase 7: Closed Beta Launch

**Goal:** Validate with real users.

### Launch Plan
- 100–200 users (college/community)
- 3–5 active channels
- Manual moderation
- Daily monitoring

### Metrics
- Daily Active Users (DAU)
- Messages per user
- Repeat usage
- Insight quality

**Exit Criteria**
- Consistent engagement and meaningful conversations

**Status:** ⏳ Planned

---

## 🔹 Phase 8: Iteration & Proof

**Goal:** Prepare for investors and companies.

### Tasks
- Improve UX based on feedback
- Improve analysis accuracy
- Generate 2–3 strong insight reports
- Document learnings and metrics

**Exit Criteria**
- Clear proof of user behavior and business value

**Status:** ⏳ Planned

---

## 🔹 Phase 9: Investor & Company Outreach

**Goal:** Validation and early funding discussions.

### Focus
- Angel investors
- College alumni
- Early-stage micro VCs
- Pilot companies

### What We Show
- Working product
- Active users
- Clean insights
- Clear next roadmap

**Status:** 🔒 Future

---

## 🚫 Explicitly Out of Scope (Phase-1)

- Background data tracking
- User profiles or social features
- Paid ads
- Full payments/withdrawals
- Heavy AI moderation

---

## 📊 Success Metrics

### User Metrics
- Engagement > downloads
- Repeat users
- Message quality

### Business Metrics
- Insight clarity
- Repeated issues across users
- Willingness of companies to pay

---

## 🏁 Final Note

This roadmap prioritizes **trust, clarity, and execution** over speed or hype.  
If Phases 1–4 are executed well, the platform will be technically solid, user-trusted, and investor-ready.

---

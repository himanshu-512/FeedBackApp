# 🏗️ System Architecture
## Anonymous Feedback Chat Platform

---

## 📌 Overview

This document describes the **high-level and low-level architecture** of the Anonymous Feedback Chat Platform.

The system is designed with the following core goals:

- Anonymous, trust-first user experience
- Real-time chat with high concurrency
- Asynchronous analysis and insights generation
- Strong fault isolation using microservices
- Horizontal scalability under heavy load

The architecture follows a **microservices-first approach**, separating real-time workloads from CPU-heavy analytics workloads.

---

## 🧩 Architecture Diagram

![System Architecture Diagram](../diagram-export-01-01-2026-18_45_53.png)

---

## 🧠 Architectural Principles

- **Privacy by design**: No personal identifiers are stored or shared
- **Isolation of concerns**: Chat, analysis, and reporting are independent
- **Async processing**: Analysis never blocks chat
- **Horizontal scalability**: Each service can scale independently
- **Failure containment**: One service failure does not crash the system

---

## 🖥️ Client Layer

### React Native Mobile App
- Used by anonymous users
- Handles:
  - Anonymous onboarding
  - Channel discovery
  - Real-time chat (WebSocket)
  - Wallet view (read-only)
- No personal data stored on device
- Communicates with backend via:
  - REST APIs (metadata)
  - WebSocket (chat)

---

## 🌐 API Gateway

### Responsibilities
- Single entry point for all clients
- Request routing to internal services
- JWT authentication validation
- Rate limiting and abuse prevention
- REST and WebSocket forwarding

### Why it exists
- Protects internal services
- Centralizes security logic
- Enables traffic control and monitoring

---

## 🔐 Authentication Service

### Purpose
- Provides **anonymous authentication**
- Generates:
  - UUID-based user IDs
  - Random usernames
  - JWT access tokens

### Key Rules
- No email, phone, or password
- No identity recovery
- Stateless authentication

---

## 📢 Channel Service

### Purpose
- Manages chat rooms (channels)

### Responsibilities
- Create channels
- List channels
- Join / leave channels
- Maintain channel metadata

### Data Stored
- Channel ID
- Name and type (PRODUCT / OFFICIAL)
- Active user counts

---

## 💬 Chat Service (Real-Time Core)

### Purpose
- Handles real-time bidirectional chat
- Highest traffic component in the system

### Technology
- WebSocket / Socket.IO
- Horizontally scalable

### Responsibilities
- Accept chat messages
- Apply moderation filters
- Persist messages
- Broadcast messages to channel members

### Constraints
- No private messages
- No user profiles
- No message editing

---

## 🛡️ Safety & Moderation Layer

### Applied during chat ingestion

- Profanity filtering
- Message rate limiting
- Spam detection
- User-generated report flags

This layer ensures:
- Platform trust
- Legal safety
- Clean data for analysis

---

## 🗄️ Message Store (MongoDB)

### Purpose
- Append-only storage of chat messages

### Data Stored
- Channel ID
- Message text
- Timestamp

### What is NOT stored
- User identity
- IP address
- Device metadata

---

## 📊 Analysis & Insights Pipeline

### Analysis Service (Async)

#### Purpose
- Convert raw messages into structured signals

#### Processing
- Text cleaning
- Keyword extraction
- Topic classification
- Sentiment analysis

#### Key Rule
> Analysis is always asynchronous and never blocks chat.

---

### Insights Service

#### Purpose
- Aggregate analysis outputs into business insights

#### Responsibilities
- Apply privacy thresholds
- Group recurring issues
- Generate summaries

#### Output Examples
- Top complaints
- Top positives
- Overall sentiment trends

---

## 📈 Company Dashboard API

### Purpose
- Provide **read-only access** to aggregated insights

### Companies Can See
- Charts
- Percentages
- Trends
- Summaries

### Companies Can NOT See
- Raw chat messages
- Individual users
- Message history

---

## 🧠 Caching & Performance (Redis)

### Used for
- Token caching
- Rate limiting
- Frequently accessed metadata
- Dashboard performance optimization

---

## 🗃️ Persistent Storage

### PostgreSQL
- Users (anonymous)
- Channels
- Wallet ledger
- Aggregated insights metadata

### MongoDB
- Chat messages
- Analysis outputs

---

## ⚙️ Infrastructure Layer

### Load Balancer
- Distributes traffic across services
- Enables horizontal scaling

### Dockerized Services
- Each service runs independently
- Enables:
  - Fast deployment
  - Easy scaling
  - Failure isolation

---

## 🔄 Data Flow Summary


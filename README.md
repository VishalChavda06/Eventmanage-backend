# Eventra — Backend (Node.js + Express.js)

Backend REST API for the Event Management System built with **Node.js**, **Express.js**, and **MongoDB**.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime environment |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication tokens |
| bcryptjs | Password hashing |
| Multer | File upload handling |
| Cloudinary | Image cloud storage (planned) |
| dotenv | Environment variables |
| cors | Cross-origin requests |

---

## 📁 Folder Structure

```
server/
├── models/
│   ├── User.js                           # ✅ User schema
│   ├── Event.js                          # ✅ Event schema
│   ├── Category.js                       # ✅ Category schema
│   ├── Booking.js                        # ✅ Booking schema
│   ├── Ticket.js                         # ✅ Ticket schema
│   ├── Payment.js                        # ✅ Payment schema
│   ├── Notification.js                   # ✅ Notification schema
│   └── Review.js                         # ✅ Review schema
│
├── controllers/
│   ├── authController.js                 # ✅ register, login, getMe
│   ├── categoryController.js             # ✅ Category CRUD
│   ├── eventController.js                # ✅ Event CRUD
│   ├── bookingController.js              # ✅ Booking logic
│   ├── adminController.js                # ✅ Admin operations
│   ├── ticketController.js               # ❌ Not started
│   ├── paymentController.js              # ❌ Not started
│   ├── notificationController.js         # ❌ Not started
│   └── reviewController.js               # ❌ Not started
│
├── routes/
│   ├── authRoutes.js                     # ✅ /api/auth
│   ├── categoryRoutes.js                 # ✅ /api/categories
│   ├── eventRoutes.js                    # ✅ /api/events
│   ├── bookingRoutes.js                  # ✅ /api/bookings
│   ├── adminRoutes.js                    # ✅ /api/admin
│   ├── ticketRoutes.js                   # ❌ /api/tickets
│   ├── paymentRoutes.js                  # ❌ /api/payments
│   ├── notificationRoutes.js             # ❌ /api/notifications
│   └── reviewRoutes.js                   # ❌ /api/reviews
│
├── middleware/
│   ├── authMiddleware.js                 # ✅ JWT token verification
│   ├── roleMiddleware.js                 # ✅ isAdmin, isOrganizer
│   ├── errorMiddleware.js                # ✅ Global error handler
│   └── uploadMiddleware.js               # ❌ Multer file upload
│
├── config/
│   ├── db.js                             # ✅ MongoDB connection
│   └── cloudinary.js                     # ❌ Cloudinary setup
│
├── utils/
│   ├── generateToken.js                  # ✅ JWT token generator
│   ├── generateTicketCode.js             # ✅ Unique ticket code
│   ├── sendNotification.js               # ✅ Create notification in DB
│   └── formatResponse.js                 # ✅ Consistent JSON responses
│
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js                             # ✅ Entry point
```

---

## 🔐 Environment Variables — `.env`

```
PORT=9090
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

---

## 🚀 Getting Started

```bash
cd server
npm install
npm run dev
```

Backend runs on: **http://localhost:9090**

---

## 📡 API Endpoints

### ✅ Auth — Completed
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /api/auth/register | Public | Register new user |
| POST | /api/auth/login | Public | Login user |
| GET | /api/auth/me | Private | Get current user |

### ✅ Categories — Completed
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /api/categories | Public | Get all active categories |
| POST | /api/categories | Admin | Create category |
| PUT | /api/categories/:id | Admin | Update category |
| DELETE | /api/categories/:id | Admin | Soft delete category |

### ✅ Events — Completed
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /api/events | Public | Get all events (with filters) |
| GET | /api/events/:id | Public | Get event by ID |
| POST | /api/events | Organizer | Create event |
| PUT | /api/events/:id | Organizer | Update own event |
| DELETE | /api/events/:id | Organizer | Delete own event |

### ✅ Bookings — Completed
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /api/bookings | Private | Book an event + auto create ticket |
| GET | /api/bookings/my | Private | Get my bookings |
| PUT | /api/bookings/:id/cancel | Private | Cancel booking + restore seats |

### ✅ Admin — Completed
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /api/admin/users | Admin | Get all users |
| PUT | /api/admin/users/:id/toggle | Admin | Toggle user active status |
| GET | /api/admin/analytics | Admin | Get analytics (users, events, revenue) |
| GET | /api/admin/bookings | Admin | Get all bookings |

### ❌ Tickets — Not Started
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /api/tickets/my | Private | Get my tickets |
| GET | /api/tickets/:code | Private | Get ticket by code |

### ❌ Payments — Not Started
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /api/payments | Private | Create payment |
| GET | /api/payments/my | Private | Get my payments |

### ❌ Notifications — Not Started
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /api/notifications/my | Private | Get my notifications |
| PUT | /api/notifications/:id/read | Private | Mark one as read |
| PUT | /api/notifications/read-all | Private | Mark all as read |

### ❌ Reviews — Not Started
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /api/reviews | Private | Add review |
| GET | /api/reviews/:eventId | Public | Get event reviews |
| DELETE | /api/reviews/:id | Admin | Delete review |

---

## 🗄️ Database Models

### ✅ All 8 Models Completed

| Model | Collection | Key Fields | Status |
|---|---|---|---|
| User | users | name, email, password, role, isActive | ✅ Done |
| Event | events | title, date, location, price, seats, organizer, category | ✅ Done |
| Category | categories | name, description, image, isActive | ✅ Done |
| Booking | bookings | user, event, seatsBooked, totalAmount, status | ✅ Done |
| Ticket | tickets | booking, user, event, ticketCode, status, qrCode | ✅ Done |
| Payment | payments | user, booking, amount, method, transactionId, status | ✅ Done |
| Notification | notifications | user, message, type, isRead, link | ✅ Done |
| Review | reviews | user, event, rating, comment, isApproved | ✅ Done |

---

## 🔗 Model Relationships

```
User ──────────────────────────────────┐
 │                                     │
 ├──► Event (organizer ref)            │
 │       │                             │
 │       └──► Category (ref)           │
 │                                     │
 ├──► Booking                          │
 │       │                             │
 │       ├──► Event (ref)              │
 │       ├──► Ticket (auto created)    │
 │       └──► Payment                  │
 │                                     │
 ├──► Review ──► Event (ref)           │
 │                                     │
 └──► Notification ◄────────────────── ┘
```

---

## 👥 User Roles

| Role | Permissions |
|---|---|
| **user** | Register, login, book events, view tickets, write reviews |
| **organizer** | All user permissions + create/edit/delete own events |
| **admin** | Full access — manage users, events, bookings, payments, reviews |

---

## 🔒 Middleware Flow

```
Request
   │
   ▼
authMiddleware       ← ✅ Verify JWT token (private routes)
   │
   ▼
roleMiddleware       ← ✅ Check role: isAdmin / isOrganizer
   │
   ▼
Controller           ← Business logic runs here
   │
   ▼
Model                ← MongoDB operation
   │
   ▼
formatResponse       ← ✅ Send clean JSON back
   │
   ▼
errorMiddleware      ← ✅ Catch any unhandled errors
```

---

## ✅ Completed Features

### Setup & Config
- [x] MongoDB connection — config/db.js
- [x] Express server setup — server.js
- [x] CORS + JSON middleware
- [x] Global error handler + 404 middleware

### Models (All 8)
- [x] User, Event, Category, Booking, Ticket, Payment, Notification, Review

### Utilities
- [x] generateToken.js — JWT token (7d expiry)
- [x] generateTicketCode.js — EVT-YYYY-XXXX format
- [x] sendNotification.js — creates notification silently in DB
- [x] formatResponse.js — successResponse + errorResponse

### Middleware
- [x] authMiddleware — Bearer JWT verification
- [x] roleMiddleware — isAdmin, isOrganizer
- [x] errorMiddleware — global handler + notFound

### Auth Module
- [x] register — hash password, save user, return token
- [x] login — verify password, return token + user
- [x] getMe — return current user from token

### Category Module
- [x] createCategory — admin only, duplicate name check
- [x] getAllCategories — public, active only, sorted newest
- [x] updateCategory — admin only, partial update
- [x] deleteCategory — admin only, soft delete (isActive: false)

### Event Module
- [x] createEvent — organizer/admin, sets organizer to req.user._id
- [x] getAllEvents — public, supports category/date/isFree/search filters
- [x] getEventById — public, populates organizer + category
- [x] updateEvent — only owner organizer or admin
- [x] deleteEvent — only owner organizer or admin

### Booking Module
- [x] createBooking — check seats, create booking (confirmed),
      reduce availableSeats, auto-generate ticket, send notification
- [x] getUserBookings — user's own bookings, populated event + organizer
- [x] cancelBooking — cancel booking, restore seats, cancel ticket,
      send notification

### Admin Module
- [x] getAllBookings — all bookings, populated user + event + organizer
- [x] getAllUsers — all users, password excluded
- [x] toggleUserStatus — flip isActive true/false
- [x] getAnalytics — totalUsers, totalEvents, totalBookings,
      confirmedBookings, cancelledBookings, totalRevenue

---

## 📋 What's Next (Backend)

- [ ] ticketController + ticketRoutes
- [ ] paymentController + paymentRoutes
- [ ] notificationController + notificationRoutes
- [ ] reviewController + reviewRoutes
- [ ] uploadMiddleware (Multer)
- [ ] cloudinary.js config + image upload on events
- [ ] Admin events management routes
- [ ] Admin payments routes
- [ ] Admin reviews routes (approve/delete)

---

## 📦 Installed Packages

```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken multer cloudinary
```

---

## 📊 Backend Progress

```
MongoDB Models          ████████████████████  100%
Auth Module             ████████████████████  100%
JWT + bcrypt            ████████████████████  100%
All Utilities           ████████████████████  100%
Auth Middleware         ████████████████████  100%
Role Middleware         ████████████████████  100%
Error Middleware        ████████████████████  100%
Category Module         ████████████████████  100%
Event Module            ████████████████████  100%
Booking Module          ████████████████████  100%
Admin Module            ████████████████████  100%
Ticket Module           ░░░░░░░░░░░░░░░░░░░░    0%
Payment Module          ░░░░░░░░░░░░░░░░░░░░    0%
Notification Module     ░░░░░░░░░░░░░░░░░░░░    0%
Review Module           ░░░░░░░░░░░░░░░░░░░░    0%
Image Upload            ░░░░░░░░░░░░░░░░░░░░    0%
Deployment              ░░░░░░░░░░░░░░░░░░░░    0%

Overall Backend         ████████████░░░░░░░░   65%
```

---

*Last updated: May 2026*
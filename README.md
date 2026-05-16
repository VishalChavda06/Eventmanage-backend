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
| Cloudinary | Image cloud storage |
| dotenv | Environment variables |
| cors | Cross-origin requests |

---

## 📁 Folder Structure

```
server/
├── models/
│   ├── User.js                           # User schema
│   ├── Event.js                          # Event schema
│   ├── Category.js                       # Category schema
│   ├── Booking.js                        # Booking schema
│   ├── Ticket.js                         # Ticket schema
│   ├── Payment.js                        # Payment schema
│   ├── Notification.js                   # Notification schema
│   └── Review.js                         # Review schema
│
├── controllers/
│   ├── authController.js                 # register, login, getMe
│   ├── eventController.js                # Event CRUD
│   ├── categoryController.js             # Category CRUD
│   ├── bookingController.js              # Booking logic
│   ├── ticketController.js               # Ticket management
│   ├── paymentController.js              # Payment processing
│   ├── notificationController.js         # Notification management
│   ├── reviewController.js               # Review management
│   └── adminController.js                # Admin-only operations
│
├── routes/
│   ├── authRoutes.js                     # /api/auth
│   ├── eventRoutes.js                    # /api/events
│   ├── categoryRoutes.js                 # /api/categories
│   ├── bookingRoutes.js                  # /api/bookings
│   ├── ticketRoutes.js                   # /api/tickets
│   ├── paymentRoutes.js                  # /api/payments
│   ├── notificationRoutes.js             # /api/notifications
│   ├── reviewRoutes.js                   # /api/reviews
│   └── adminRoutes.js                    # /api/admin
│
├── middleware/
│   ├── authMiddleware.js                 # JWT token verification
│   ├── roleMiddleware.js                 # isAdmin, isOrganizer
│   ├── errorMiddleware.js                # Global error handler
│   └── uploadMiddleware.js              # Multer file upload
│
├── config/
│   ├── db.js                             # MongoDB connection
│   └── cloudinary.js                     # Cloudinary setup
│
├── utils/
│   ├── generateToken.js                  # JWT token generator
│   ├── generateTicketCode.js             # Unique ticket code
│   ├── sendNotification.js               # Create notification in DB
│   └── formatResponse.js                 # Consistent JSON responses
│
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js                             # Entry point
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

### ❌ Categories — Not Started
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /api/categories | Public | Get all categories |
| POST | /api/categories | Admin | Create category |
| DELETE | /api/categories/:id | Admin | Delete category |

### ❌ Events — Not Started
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /api/events | Public | Get all events |
| GET | /api/events/:id | Public | Get event by ID |
| POST | /api/events | Organizer | Create event |
| PUT | /api/events/:id | Organizer | Update event |
| DELETE | /api/events/:id | Organizer | Delete event |

### ❌ Bookings — Not Started
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | /api/bookings | Private | Book an event |
| GET | /api/bookings/my | Private | Get my bookings |
| PUT | /api/bookings/:id/cancel | Private | Cancel booking |

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

### ❌ Admin — Not Started
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | /api/admin/users | Admin | Get all users |
| PUT | /api/admin/users/:id/toggle | Admin | Toggle user active status |
| GET | /api/admin/analytics | Admin | Get analytics data |
| GET | /api/admin/bookings | Admin | Get all bookings |

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
authMiddleware       ← Verify JWT token (private routes)
   │
   ▼
roleMiddleware       ← Check role: isAdmin / isOrganizer
   │
   ▼
Controller           ← Business logic runs here
   │
   ▼
Model                ← MongoDB operation
   │
   ▼
formatResponse       ← Send clean JSON back
   │
   ▼
errorMiddleware      ← Catch any unhandled errors
```

---

## ✅ Completed Features

- [x] MongoDB connection setup
- [x] All 8 Mongoose models
- [x] JWT token generation utility
- [x] bcryptjs password hashing
- [x] Format response utility (successResponse / errorResponse)
- [x] Auth middleware — JWT verification
- [x] Error middleware — global handler + 404
- [x] Auth controller — register, login, getMe
- [x] Auth routes — /api/auth/register, /api/auth/login, /api/auth/me
- [x] Server.js — Express setup + all middleware connected

---

## 📋 What's Next (Backend)

- [ ] Category controller + routes
- [ ] Event controller + routes (with image upload)
- [ ] Booking controller + routes (auto-generate ticket)
- [ ] Ticket controller + routes
- [ ] Payment controller + routes
- [ ] Notification controller + routes
- [ ] Review controller + routes
- [ ] Admin controller + routes
- [ ] Role middleware (isAdmin, isOrganizer)
- [ ] Upload middleware (Multer + Cloudinary)
- [ ] Cloudinary config

---

## 📦 Installed Packages

```bash
npm install express mongoose dotenv cors bcryptjs jsonwebtoken multer cloudinary
```

---

## 📊 Backend Progress

```
MongoDB Models          ████████████████████  100%
Auth Register/Login     ████████████████████  100%
JWT + bcrypt            ████████████████████  100%
Utilities               ████████████████████  100%
Auth Middleware         ████████████████████  100%
Error Middleware        ████████████████████  100%
Category Module         ░░░░░░░░░░░░░░░░░░░░    0%
Event Module            ░░░░░░░░░░░░░░░░░░░░    0%
Booking Module          ░░░░░░░░░░░░░░░░░░░░    0%
Ticket Module           ░░░░░░░░░░░░░░░░░░░░    0%
Payment Module          ░░░░░░░░░░░░░░░░░░░░    0%
Notification Module     ░░░░░░░░░░░░░░░░░░░░    0%
Review Module           ░░░░░░░░░░░░░░░░░░░░    0%
Admin Module            ░░░░░░░░░░░░░░░░░░░░    0%
Image Upload            ░░░░░░░░░░░░░░░░░░░░    0%
Deployment              ░░░░░░░░░░░░░░░░░░░░    0%

Overall Backend         ████░░░░░░░░░░░░░░░░   25%
```

---

*Last updated: May 2026*
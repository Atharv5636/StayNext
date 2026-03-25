# Wanderlust

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Local%20Database-47A248?logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/View%20Engine-EJS-B4CA65)
![Status](https://img.shields.io/badge/Status-Learning%20Project-blue)

A full-stack Airbnb-style listing application built with Node.js, Express, MongoDB, Mongoose, and EJS. Wanderlust lets users browse rental listings, create and manage properties, and leave reviews through a simple server-rendered interface.

## Resume-Ready Description

Built a full-stack Airbnb-style web application using Node.js, Express, MongoDB, Mongoose, and EJS with complete CRUD functionality for property listings and reviews. Implemented server-side rendering, RESTful routing, form validation with Joi, session-based flash messaging, and relational data handling between listings and reviews.

### Short Version

Developed a full-stack Airbnb-style listing platform with Node.js, Express, MongoDB, and EJS, featuring CRUD operations, review management, validation, and server-rendered UI.

## Overview

This project was built as a hands-on practice application to strengthen full-stack development fundamentals, especially:

- RESTful routing with Express
- Server-side rendering with EJS
- MongoDB data modeling with Mongoose
- Form handling and validation with Joi
- Sessions and flash messaging
- CRUD operations across related resources

## Features

- Browse all property listings
- View detailed information for each listing
- Create new listings with title, description, image, price, location, and country
- Edit existing listings
- Delete listings
- Add reviews with rating and comments
- Delete reviews from a listing
- Local authentication with signup, login, and logout
- Google authentication with Passport
- Ownership-based authorization for listings and reviews
- Validate incoming listing and review input with Joi
- Show success and error flash messages
- Seed the database with sample listing data
- Automatically remove associated reviews when a listing is deleted

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- EJS
- EJS-Mate
- Joi
- Passport
- express-session
- connect-flash
- bcrypt
- method-override

## Project Structure

```text
.
|-- app.js
|-- config/
|   |-- db.js
|   |-- passport.js
|   `-- session.js
|-- controllers/
|   |-- auth.js
|   |-- listings.js
|   `-- reviews.js
|-- init/
|   |-- backfillOwnership.js
|   |-- data.js
|   `-- index.js
|-- middleware/
|   `-- index.js
|-- models/
|   |-- listing.js
|   |-- review.js
|   `-- user.js
|-- public/
|   `-- CSS/
|       `-- style.css
|-- routes/
|   |-- auth.js
|   |-- listings.js
|   `-- reviews.js
|-- utils/
|   |-- ExpressError.js
|   `-- wrapAsync.js
|-- views/
|   |-- auth/
|   |-- includes/
|   |-- layout/
|   `-- listings/
|-- .env.example
|-- package.json
`-- schema.js
```

## Environment Variables

Create a `.env` file using `.env.example` as a template.

Required values:

- `MONGO_URI`
- `SESSION_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_CALLBACK_URL`
- `BACKFILL_USER_EMAIL` for the ownership migration script

## Getting Started

### Prerequisites

- Node.js 18 or later
- MongoDB installed and running locally

### Installation

```bash
npm install
```

### Run Locally

Start MongoDB locally, create your `.env`, then run:

```bash
npm run dev
```

The app will be available at:

```text
http://localhost:8080
```

### Seed the Database

To populate the app with sample listing data:

```bash
npm run seed
```

### Backfill Ownership for Legacy Data

If you created listings or reviews before auth/ownership was added, assign them to an existing user by setting `BACKFILL_USER_EMAIL` in `.env` and running:

```bash
npm run backfill:ownership
```

## Available Scripts

- `npm run dev` - Run the app with Nodemon
- `npm start` - Run the app with Nodemon
- `npm run seed` - Seed sample listings
- `npm run backfill:ownership` - Assign missing listing/review ownership to an existing user

## Core Functionality

### Authentication

- Local signup/login/logout with Passport Local and bcrypt
- Google login with Passport Google OAuth 2.0
- Session-based login persistence

### Listings

- `GET /listings` - Show all listings
- `GET /listings/new` - Render the new listing form
- `POST /listings` - Create a listing
- `GET /listings/:id` - Show a single listing
- `GET /listings/:id/edit` - Render the edit listing form
- `PUT /listings/:id` - Update a listing
- `DELETE /listings/:id` - Delete a listing

### Reviews

- `POST /listings/:id/reviews` - Add a review to a listing
- `DELETE /listings/:id/reviews/:reviewId` - Delete a review

## Current Limitations

This repository currently focuses on listings, reviews, and authentication. The following are not implemented yet:

- Cloud image uploads with storage providers
- Map or geocoding integration
- Search and advanced filtering
- Booking and payment flow
- Automated tests

## Notes

- Google OAuth requires valid Google Cloud credentials in `.env`
- Existing legacy data may need the ownership backfill script once
- This project is best presented as a learning project or portfolio CRUD application

## License

This project is intended for educational and portfolio use.

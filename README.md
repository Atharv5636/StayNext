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
- Validate incoming listing and review data with Joi
- Show success flash messages for user actions
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
- express-session
- connect-flash
- method-override

## Project Structure

```text
.
|-- app.js
|-- init/
|   |-- data.js
|   `-- index.js
|-- model/
|   |-- listing.js
|   `-- review.js
|-- public/
|   `-- CSS/
|       `-- style.css
|-- routes/
|-- utils/
|   |-- ExpressError.js
|   `-- wrapAsync.js
|-- views/
|   |-- includes/
|   |-- layout/
|   `-- listings/
|-- package.json
`-- schema.js
```

## Getting Started

### Prerequisites

- Node.js 18 or later
- MongoDB installed and running locally

### Installation

```bash
npm install
```

### Run Locally

Start MongoDB locally, then run:

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
node init/index.js
```

## Available Scripts

- `npm run dev` - Run the app with Nodemon
- `npm start` - Run the app with Nodemon

## Core Functionality

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

This repository currently focuses on listings and reviews only. The following are not implemented yet:

- User authentication
- Authorization and ownership checks
- Image uploads with cloud storage
- Map or geocoding integration
- Search and filtering
- Booking and payment flow
- Production-ready environment configuration
- Automated tests

## Screenshots

Add screenshots here after pushing to GitHub for a stronger portfolio presentation.

Suggested sections:

- Home or all listings page
- Listing details page
- Add listing form
- Reviews section

## Future Improvements

- Move secrets and configuration into environment variables
- Refactor routes into separate router files
- Add authentication and authorization
- Improve validation feedback in the UI
- Add responsive UI improvements
- Add tests for routes and validation

## Notes

- The app currently connects to a local MongoDB database at `mongodb://127.0.0.1:27017/wonderlust`
- Session settings are currently defined directly in the code for local development
- This project is best presented as a learning project or portfolio CRUD application

## License

This project is intended for educational and portfolio use.

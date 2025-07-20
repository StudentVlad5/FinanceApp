# Calendar Task Manager

## Project Description

The **Calendar Task Manager** is a web-based application built using the MERN stack (MongoDB, Express, React, Node.js) that allows users to:

- Create, edit, and organize tasks in a calendar interface.
- Drag and drop tasks between days and reorder tasks within a day.
- Filter tasks by text.
- Display worldwide holidays for each calendar day with holiday names fixed at the top of each cell.

This application is built without using any calendar libraries, ensuring a custom implementation tailored to meet the specific requirements.

---

## Features

### Core Functionalities:

1. **Task Management**
   - Inline creation and editing of tasks within calendar cells.
   - Reassign tasks between days using drag-and-drop functionality.

2. **Task Filtering**
   - Search for tasks by text to highlight relevant items in the calendar.

3. **Holiday Integration**
   - Display worldwide holidays for each day, fetched via an API.
   - Holiday names are fixed at the top of the calendar cell and are non-interactive.

---

## Technologies Used

### Frontend:
- **React**: For building the user interface.
- **React Hooks**: For managing component state and side effects.
- **CSS-in-JS**: For styling components in a modular and reusable way.

### Backend:
- **Node.js**: Server-side JavaScript runtime.
- **Express**: Framework for handling API requests and routing.
- **MongoDB**: Database to store user tasks and related information.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.

### Additional Libraries:
- **PropTypes**: For type-checking React component props.
- **Sass**: For enhanced CSS styling.
- **dotenv**: For environment variable management.
- **express-validator & Joi**: For input validation.
- **cors & morgan**: For middleware functionality.

---

## Setup Instructions

### Prerequisites:
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm (v7 or higher)

### Steps:

1. Clone the Repository:
   ```bash
   git clone <repository_url>
   ```

2. Install Dependencies:
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```
   - For the backend:
     ```bash
     cd ../backend
     npm install
     ```

3. Set Up Environment Variables:
   - Create a `.env` file in the `backend` folder with the following variables:
     ```env
     PORT=3030
     MONGO_URI=<your_mongodb_connection_string>
     ```

4. Start the Application:
   - Run the backend server:
     ```bash
     cd backend
     node index.js
     ```
   - Run the frontend:
     ```bash
     cd ../frontend
     react-scripts start
     ```

5. Access the application at `http://localhost:3000`.

---

## Folder Structure

### Frontend:
```
frontend/
|-- public/
|-- src/
    |-- components/        # Reusable React components
    |-- pages/             # Page-level components
    |-- hooks/             # Custom React hooks
    |-- styles/            # CSS-in-JS and Sass styles
    |-- App.js             # Main React app
    |-- main.js            # Entry point
```

### Backend:
```
backend/
|-- models/                # Mongoose models
|-- routes/                # API routes
|-- controllers/           # Request handlers
|-- middlewares/           # Middleware functions
|-- index.js               # Entry point for the backend
```

---

## API Endpoints

### Appointments Management

- **GET /api/get**: Retrieve all appointments.
- **POST /api/create**: Create a new appointment.
- **POST /api/edit/:id**: Update a appointment by ID.
- **DELETE /api/delete/:id**: Delete a appointment by ID.

### Holiday Data

- **GET /date.nager.at/api/v3/PublicHolidays/**: Fetch holidays for a specific date or date range.

---

## Future Improvements

- Add user authentication for personalized calendars.
- Enable recurring appointments.
- Support for multiple views (monthly, weekly, daily).
- Offline mode using service workers (Redux manager).

---

## License
This project is licensed under the MIT License.

---

## Contact
For questions or support, reach out to:
- **GitHub**: [StudentVlad5](https://github.com/StudentVlad5/AddaxCRM)

Enjoy organizing your tasks seamlessly with the Calendar Task Manager!
# SocialPulse

**SocialPulse** is a MERN stack-based web application designed to analyze and track social media performance. It provides an intuitive interface for users to monitor key engagement metrics, gain insights into their content's performance, and make data-driven decisions for social media strategies.

The purpose of this assignment is to build a basic analytics module for social media performance analysis. The module is designed to process engagement data from mock social media accounts, analyze performance, and provide real-time insights through a user-friendly Streamlit application. The project integrates advanced tools like LangFlow and DataStax Astra DB for workflow automation and data management.

## Features


- **Customizable Insights:** Generate insights based on specific posts or campaigns.
- **Real-Time Updates:** Automatically fetch and display the latest data.
- **Interactive Charts:** Visualize trends with dynamic graphs and charts.

---

## Technology Stack

### **Frontend:**
- React.js
- tailwind-css

### **Backend:**
- Node.js
- Express.js

### **Other Tools:**
- **dotenv:** For secure environment variable management.
- **Axios:** For seamless frontend-backend communication.
- **LangFlow:** For workflow automation and GPT integration.
- **DataStax Astra DB:** For robust database operations and data management.

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/RohanMalakar/SocialPulse.git
cd SocialPulse
```

### 2. Create a .env File

Create a `.env` file in the root directory and add the following variables:
```env
PORT=<replace with the your port number>
CORS_ORIGIN=*

LANGFLOW_TOKEN="<replace with the your LANGFLOW_TOKEN>
LANGFLOW_ID=<replace with the your LANGFLOW_ID>
ASTRADB_URL=<replace with the your ASTRADB_URL>
ASTRADB_TOKEN=<replace with the your ASTRADB_TOKEN>
```
Replace the placeholders if necessary.

### 3. Install Dependencies

#### **For Backend:**
Navigate to the `backend` folder and install dependencies:
```bash
cd backend
npm install
```

#### **For Frontend:**
Navigate to the `frontend` folder and install dependencies:
```bash
cd ../frontend
npm install
```

### 4. Run the Application

#### **Start the Backend:**
In the `backend` folder:
```bash
npm run dev
```

#### **Start the Frontend:**
In the `frontend` folder:
```bash
npm run dev
```


The application will be available at `http://localhost:3000` (frontend).

---

## Folder Structure

### Backend:
- `routes/`: API routes for data handling.
- `middleware/`: Middleware for handling cross-origin requests.
- `utils/`: Helper functions for database interactions.

### Frontend:
- `src/components/`: React components for UI.
- `src/pages/`: Pages for routing (e.g., Login, Dashboard).
- `src/utils/`: Utility functions and helpers.



---

## Demonstration
https://youtu.be/

## Notes
- Ensure your `.env` file is configured with the appropriate tokens and URLs.
- Use strong secrets for secure authentication and data access.

---

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For queries or collaboration, contact [Rohan Malakar](mailto:rohanmalakar5091@gmail.com).

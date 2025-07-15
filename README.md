# QuickLink

![Preview](public/images/image.png)

QuickLink is a smart link organizer designed specifically for **eSevai Maiyam** and **Net Centers** in Tamil Nadu, India. Its main goal is to help centers store, categorize, and quickly retrieve important government, banking, education, and other essential links in a user-friendly dashboard.

## Features
- Store and categorize important links by type (Government, Banking, Education, etc.)
- Admin and user management (with admin access control)
- Secure login and registration
- Add, edit, and delete links (admin only)
- Search and filter links by category or title
- Responsive, modern UI

## Who is it for?
QuickLink is built for:
- **eSevai Maiyam** operators
- **Net Center** staff
- Anyone in Tamil Nadu who needs to manage and access a large number of important links efficiently

## Getting Started

### Prerequisites
- Node.js (v14 or above)
- MongoDB (local or cloud)

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd QuickLink
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start MongoDB (if running locally):
   ```bash
   mongod
   ```
4. Start the server:
   ```bash
   node app.js
   ```
5. Visit [http://localhost:8000](http://localhost:8000) in your browser.

## Project Structure
- `app.js` - Main server file
- `models/` - Mongoose models (User, Link)
- `routers/` - Express route handlers
- `views/` - EJS templates for UI
- `public/` - Static assets (CSS, JS, images)
- `utils/` - Utility functions and middleware

## Main Moto
> **To help eSevai Maiyam and Net Centers in Tamil Nadu store, organize, and retrieve important links quickly and efficiently.**

---

**Author:** Magesh Balram  
📧 **Email:** [mageshbalram@gmail.com](mailto:mageshbalram@gmail.com) 
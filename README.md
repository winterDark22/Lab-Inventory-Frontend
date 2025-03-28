# 🧪 Lab Inventory Management System

A comprehensive **Lab Inventory Management System** designed to efficiently track, manage, and organize laboratory equipments. This system helps lab personnel maintain accurate records, reduce waste, and ensure compliance with safety regulations.

## 👨‍💻 Contributors  

🔹 **[Mayesha Rashid] (https://github.com/mrashid5919/Lab-Inventory-Backend)** – Backend Development  

## 🚀 Features

✅ **Multi-Step Requisition System**  
The Multi-Step Requisition System ensures a structured and controlled process for requesting lab items. This system follows a step-by-step approach to track, approve, and fulfill requisition requests efficiently.  

**🔹 Workflow Overview:**  

1️⃣ **Item Selection:**  
   - Users browse the inventory and select the required items.  
   - Each item has quantity constraints based on stock availability.  

2️⃣ **Request Submission:**  
   - Users submit a requisition request with item details, quantity, and priority.  
   - Optionally, users can provide justification for their request.  

3️⃣ **Approval Process:**  
   - Requests are routed to authorized personnel (e.g., Lab Manager or Supervisor).  
   - Approvers can approve, reject, or request modifications to the requisition.  

4️⃣ **Stock Validation:**  
   - Once approved, the system verifies stock availability.  
   - If items are insufficient, the request may be partially fulfilled or put on hold until restocked.  

5️⃣ **Issue and Acknowledgment:**  
   - Approved requisitions are processed for issuance.  
   - Users acknowledge receipt of the items, and the system updates inventory records accordingly.  

✅ **Multi-Level Approval System**  
- Items requiring authorization go through a structured approval process.   
- Customizable approval chains based on item type and organization hierarchy.  
- Automated notifications at each approval stage to ensure smooth processing.  

✅ **Student Clearance Process**  
- Students must return all borrowed items before graduation.   
- Lab administrators can approve or reject clearance based on item returns.  
- Integrated with student records for seamless processing.  

✅ **Automated Due Date Reminders**  
- Sends automated to users for overdue items.  
- Configurable reminder intervals (e.g., daily, weekly, or custom).  
- Helps prevent loss and ensures timely returns.  

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js  
- **Database**: PostgreSQL 
- **Authentication**: JWT / OAuth  

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/lab-inventory.git

# Navigate to the project folder
cd lab-inventory

# Install dependencies
npm install  # or yarn install

# Start the development server
npm start  # or yarn start


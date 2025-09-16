# 🚌 Where is My Bus — User Stories

This document describes the user stories for different roles (User, Driver, Admin) in the system. Each story follows the format:

> **As a [role], I want [goal] so that [benefit].**

---

## 👩‍🎓 User Stories (Commuter/Student)

1. As a **user**, I want to **search for a bus by route or bus number**, so that I can quickly find the bus I need.  
2. As a **user**, I want to **view the live location of a bus**, so that I know exactly where it is.  
3. As a **user**, I want to **see the estimated arrival time (ETA) at my stop**, so that I can plan when to leave.  
4. As a **user**, I want to **save my frequently used routes/stops**, so that I can access them quickly.  
5. As a **user**, I want to **receive a notification when the bus is near my stop**, so that I don’t miss it. *(Future feature)*  

---

## 👨‍✈️ User Stories (Driver)

1. As a **driver**, I want to **log in securely**, so that I can update bus information safely.  
2. As a **driver**, I want to **start a trip and share my real-time location**, so that passengers can track the bus.  
3. As a **driver**, I want to **update the status of the bus (running, delayed, breakdown)**, so that users are informed.  
4. As a **driver**, I want to **end a trip when completed**, so that the system resets for the next schedule.  

---

## 🛡️ User Stories (Admin/Institution)

1.[x] As an **admin**, I want to **add, edit, or remove buses**, so that the system stays updated.  
2.[x] As an **admin**, I want to **assign drivers to specific buses**, so that tracking is properly linked.  
3.[x] As an **admin**, I want to **create and manage routes with stops**, so that buses follow correct schedules.  
4.[x] As an **admin**, I want to **monitor all active buses on a dashboard**, so that I can ensure smooth operation.  
5.[x] As an **admin**, I want to **view trip history and logs**, so that I can analyze performance and reliability.  

---

## 🌍 Future Enhancements (Optional User Stories)

1.[x] As a **user**, I want to **book a seat on a bus in advance**, so that I have guaranteed space.  
2.[x] As a **parent**, I want to **track my child’s school bus**, so that I know they are safe.  
3.[x] As an **admin**, I want to **generate reports on usage, delays, and performance**, so that I can improve the service.  
4.[x] As a **driver**, I want to **receive optimized navigation for my route**, so that I can avoid delays.  

---

## ✅ Acceptance Criteria

-[] Each user role must be able to perform their key actions through APIs or frontend.  
-[] Location updates must be **real-time (≤5s delay)**.  
-[]Users should never see sensitive data (like driver credentials).  
-[]System should scale to handle **multiple routes and buses** simultaneously.  

---

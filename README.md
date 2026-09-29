# UdyogSetu — Industrial Approval & Compliance Platform

> **Bridging Industry and Government, Seamlessly.**

**Smart Industrial Approvals • Compliance • Inspections • Department Coordination • Government Support**

UdyogSetu is a full-stack digital prototype designed to streamline industrial approvals, compliance processes, inspections, and access to government support services.

The platform demonstrates how a single coordinated workflow can connect industrial applicants with multiple government departments, reduce repetitive compliance work, improve document and application readiness, provide explainable risk prioritization, coordinate inspections, monitor SLAs, and surface relevant government schemes.

> **Prototype scope:** All people, organizations, applications, rules, documents, references, events, schemes, notifications, inspections, and metrics in this project are **synthetic illustrative demo data**. UdyogSetu is not an official Government of Maharashtra service and does not provide legal advice.

---

## 1. Problem Statement

Industrial businesses often need to interact with multiple departments and complete several approval and compliance processes before commencing or expanding operations.

Typical challenges include:

* Identifying which approvals are applicable to a particular business.
* Understanding department-specific requirements.
* Preparing and validating multiple documents.
* Repeatedly submitting similar information.
* Coordinating inspections conducted by different departments.
* Tracking application status and departmental SLAs.
* Identifying missing or inconsistent information before submission.
* Understanding why an application requires additional review.
* Discovering government schemes and support programs relevant to an enterprise.
* Finding reliable regulatory information without relying on unverified interpretations.

These fragmented processes can increase administrative effort for businesses and operational workload for departments.

---

## 2. Proposed Solution

**UdyogSetu** provides a unified applicant and department workflow.

### Applicant workflow

```text
Business Profile
       ↓
AI-Assisted Approval Checklist
       ↓
Document Pre-Validation
       ↓
Application Submission
       ↓
Risk Assessment
       ↓
Department Routing
       ↓
Parallel Department Review
       ↓
Coordinated Inspection
       ↓
SLA & Status Tracking
       ↓
Approval / Further Action
       ↓
Government Scheme Matching
       ↓
Regulatory Assistance
```

### Department workflow

```text
Incoming Applications
       ↓
Department Queue
       ↓
Document & Rule Review
       ↓
Explainable Risk Prioritization
       ↓
Department Actions
       ↓
Inspection Planning
       ↓
Combined Inspection
       ↓
SLA Monitoring
       ↓
Operational Analytics
       ↓
Audit Trail
```

---

## 3. Key Objectives

UdyogSetu is designed to demonstrate the following capabilities:

1. **Simplify industrial approval discovery**

   * Generate an approval checklist based on business characteristics and structured rules.

2. **Improve application readiness**

   * Identify missing or inconsistent document information before department review.

3. **Enable explainable risk prioritization**

   * Present deterministic risk factors and supporting rule evidence.

4. **Improve inter-department coordination**

   * Route applications to relevant departments and coordinate inspections.

5. **Monitor approval timelines**

   * Provide an SLA control tower for department-level operational visibility.

6. **Improve transparency**

   * Show checklist reasons, rule IDs, document evidence, risk explanations, and audit events.

7. **Improve access to government support**

   * Match enterprises with relevant illustrative schemes using structured eligibility information.

8. **Provide grounded regulatory assistance**

   * Answer prototype regulatory questions using the structured rules available in the demo dataset.

---

# 4. Major Features

## 4.1 Applicant Portal

### Business Profile

Captures the enterprise context required for downstream approval and compliance workflows.

### Approval Checklist

Generates a structured list of applicable approvals with:

* Approval name
* Department
* Rule ID
* Reason for applicability
* Source/reference
* Status

### Document Management

Supports the demonstration of:

* Document upload
* Document classification
* Simulated OCR/extraction
* Extracted field display
* Cross-document validation
* Validation exceptions
* Evidence-based review

### Application Tracking

Provides a consolidated view of:

* Application status
* Department progress
* Pending actions
* Approval tasks
* SLA information
* Inspection status

### Inspection Tracking

Allows applicants to view scheduled inspection information and coordinated inspection activity.

### Government Scheme Matching

Provides illustrative scheme recommendations based on enterprise characteristics and structured eligibility information.

### Regulatory Assistant

Provides deterministic, dataset-grounded responses and identifies the structured rules used by the prototype.

---

# 5. Department Portal

The department workspace provides operational tools for government-side processing.

## Department Queue

Departments can view applications routed to their respective department.

## Review Actions

Officers can perform simulated review actions such as:

* Accept
* Request clarification
* Approve
* Reject

## Explainable Risk Queue

Applications can be prioritized using deterministic risk factors.

The prototype exposes the factors and rule evidence behind the assessment instead of presenting an unexplained score.

## Inspection Planner

Departments can view planned inspections and coordinate multiple departmental inspections.

## Combined Inspection

The prototype demonstrates how a potential common inspection can be converted into a coordinated inspection involving multiple departments.

## SLA Control Tower

Provides operational visibility into:

* Pending applications
* SLA status
* Overdue items
* Department workload
* Processing timelines

## Analytics

The department workspace includes operational charts and summary metrics for the demonstration dataset.

## Audit Log

Application-level audit events are recorded to demonstrate traceability of workflow actions.

---

# 6. Demonstrated End-to-End Workflow

The prototype demonstrates the following complete journey:

```text
Enterprise Onboarding
        ↓
Business Profile
        ↓
Approval Requirement Discovery
        ↓
Checklist Generation
        ↓
Document Submission
        ↓
Document Validation
        ↓
Application Submission
        ↓
Risk Assessment
        ↓
Department Routing
        ↓
Department Review
        ↓
Inspection Coordination
        ↓
SLA Monitoring
        ↓
Application Status
        ↓
Scheme Recommendations
        ↓
Regulatory Assistance
```

This workflow is intended to demonstrate how multiple fragmented activities can be represented through a single digital platform.

---

# 7. Demo Scenario

The project includes a seeded demonstration application for:

**Sunrise Foods Pvt Ltd**

**Application ID:** `MH-2026-00128`

The demo scenario represents a Food Processing enterprise in Maharashtra.

The seeded dataset includes:

* 5 applicants
* 10 applications
* 4 departments
* 12 structured illustrative approval rules
* Documents
* Document validation results
* Risk assessments
* Inspection records
* SLA records
* Government schemes
* Notifications
* Audit events

The prototype covers illustrative rules for:

* Food Processing
* Textile Manufacturing
* Engineering Manufacturing

---

# 8. Five-Minute Judge Demonstration

For the quickest demonstration of the complete workflow:

### Step 1 — Load the demo

Open the landing page and select:

**Load Demo Application**

This loads:

**Sunrise Foods Pvt Ltd — MH-2026-00128**

### Step 2 — Business Profile

Open:

**Business Profile**

Select:

**Generate My Approval Checklist**

Review the approvals generated from the structured rule dataset.

### Step 3 — Documents

Open:

**Documents**

Upload the Project Report demo document.

Open the validation evidence.

The prototype demonstrates extracted fields and a cross-check exception involving:

* Project Cost: **₹10 Cr**
* Eligible/declared component: **₹8.2 Cr**

This demonstrates how document validation can identify inconsistencies before departmental review.

### Step 4 — Approval Checklist

Open:

**Approval Checklist**

Review:

* Approval requirements
* Rule IDs
* Reasons
* Sources

Then select:

**Submit to department review**

### Step 5 — Application Details

Open:

**Application Details**

Review the deterministic risk assessment and supporting rule evidence.

### Step 6 — Department Workspace

Switch to the department workspace.

Open:

**Inspection Calendar**

Create the combined inspection for Sunrise Foods.

The reset-safe demo seed includes an initial:

**Potential Common Inspection**

for Sunrise Foods so that the combined-inspection workflow is immediately demonstrable.

### Step 7 — SLA & Support

Review:

* SLA Control Tower
* Scheme matching
* Regulatory AI Assistant
* Audit information

This demonstrates the complete applicant-to-department workflow.

---

# 9. System Architecture

```text
┌─────────────────────────────────────────────┐
│              UdyogSetu Frontend             │
│                                             │
│ React + Vite + Tailwind CSS + React Router │
│                                             │
│ Applicant Portal │ Department Portal        │
└──────────────────────┬──────────────────────┘
                       │ REST API
                       ↓
┌─────────────────────────────────────────────┐
│              Express Backend                │
│                                             │
│ Authentication / Demo Data                  │
│ Applications / Checklists                   │
│ Documents / Validation                      │
│ Risk Assessment                             │
│ Department Routing                          │
│ Inspections / SLA / Analytics               │
│ Schemes / Regulatory Assistant              │
│ Notifications / Audit Logs                  │
└──────────────────────┬──────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────┐
│          Prototype Data Layer               │
│                                             │
│ In-memory synthetic demonstration data      │
│                                             │
│ PostgreSQL-compatible schema available      │
│ separately in server/schema.sql             │
└─────────────────────────────────────────────┘
```

---

# 10. Technology Stack

### Frontend

* React
* Vite
* React Router
* Tailwind CSS
* Chart.js
* react-chartjs-2
* Lucide React

### Backend

* Node.js
* Express.js
* CORS
* UUID

### Data & Prototype Layer

* In-memory synthetic demo data
* PostgreSQL-compatible schema
* Structured rule dataset
* Deterministic validation and risk logic

### Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Source Code:** GitHub

---

# 11. Project Structure

```text
UdyogSetu/
│
├── server/
│   ├── index.js
│   └── schema.sql
│
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── public/
│
├── package.json
├── vercel.json
├── .gitignore
└── README.md
```

---

# 12. Running the Project Locally

Clone the repository and install dependencies:

```bash
git clone https://github.com/RameshNaik100/UdyogSetu.git
cd UdyogSetu
npm install
```

Start the frontend and backend together:

```bash
npm run dev
```

Local services:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:3001
```

To create a production frontend build:

```bash
npm run build
```

---

# 13. API

The Express backend exposes REST endpoints for the primary prototype workflows.

### Health

```text
GET /api/health
```

### Demo Data

```text
GET /api/demo
```

### Authentication

```text
POST /api/auth/login
```

### Applicants

```text
GET /api/applicants
```

### Applications

```text
GET /api/applications
POST /api/applications
```

### Approval Checklist

```text
POST /api/checklist/generate
GET /api/applications/:id/checklist
```

### Documents

```text
POST /api/documents/upload
POST /api/documents/:id/validate
```

### Risk Assessment

```text
POST /api/risk/assess
```

### Departments

```text
GET /api/departments
GET /api/departments/:id/applications
```

### Department Tasks

```text
POST /api/tasks/:id/action
```

### Inspections

```text
GET /api/inspections
POST /api/inspections/combine
```

### SLA & Analytics

```text
GET /api/sla
GET /api/analytics
```

### Schemes

```text
GET /api/schemes
POST /api/schemes/match
```

### Regulatory Assistant

```text
POST /api/regulatory/chat
```

### Notifications

```text
GET /api/notifications
POST /api/notifications/:id/read
```

### Audit

```text
GET /api/audit/:applicationId
```

---

# 14. Live Prototype

### Frontend

**UdyogSetu Live Demo**

https://udyogsetu-peach.vercel.app/

### Backend Health Check

The deployed backend exposes:

```text
/api/health
```

The frontend is configured to communicate with the deployed Express API.

### Source Code

GitHub repository:

https://github.com/RameshNaik100/UdyogSetu

---

# 15. Deployment Architecture

```text
                    GitHub
                      │
              ┌───────┴───────┐
              ↓               ↓
           Vercel           Render
              │               │
              ↓               ↓
        React Frontend    Express API
              │               │
              └───────┬───────┘
                      ↓
              UdyogSetu Platform
```

The project is configured so that changes pushed to the GitHub `main` branch can trigger deployments of the corresponding frontend and backend services.

The frontend uses the `VITE_API_URL` environment variable to connect to the deployed backend.

---

# 16. Prototype Data & Persistence

The current SIH prototype intentionally uses **in-memory persistence**.

This keeps the demonstration:

* Easy to reset
* Deterministic
* Self-contained
* Safe for synthetic demonstration data

A PostgreSQL-compatible database schema is provided in:

```text
server/schema.sql
```

The schema can be used as the foundation for a production persistence layer.

> **Important:** Because the running prototype uses in-memory data, a backend restart can reset changes made during a demonstration session.

---

# 17. AI / Intelligent Components

UdyogSetu demonstrates AI-assisted concepts through transparent prototype logic.

### Approval Checklist Generation

Structured business attributes are evaluated against illustrative approval rules to generate applicable requirements.

### Document Intelligence

The document workflow demonstrates simulated extraction and validation of structured fields.

### Risk Assessment

Risk prioritization is deterministic and explainable. The prototype presents the factors and rule evidence used in the assessment.

### Regulatory Assistant

The Regulatory Assistant is grounded in the structured rule dataset available in the prototype.

It does not claim to provide unrestricted legal or regulatory knowledge.

---

# 18. Transparency & Safety

This project is a **hackathon prototype**.

The following integrations are **not implemented**:

* NSWS
* MAITRI
* GST
* Aadhaar
* DigiLocker
* Government SSO
* Department production APIs
* Real identity verification
* Live government approval systems

Authentication is demonstration-only.

Roles represented in the prototype include:

* Applicant
* Department Officer
* Department Head
* Admin

No real citizen, business, government, Aadhaar, financial, or identity data is required for the demonstration.

All displayed organizations, applications, documents, rules, schemes, metrics, events, and regulatory references are synthetic or illustrative.

The regulatory assistant is deterministic and dataset-grounded. When a verified matching rule is not present in the prototype dataset, the system is designed to indicate that no verified rule is available within the current dataset rather than inventing a regulatory requirement.

---

# 19. Future Scope

The prototype can be extended into a production-grade platform through:

### Government Integration

Integration with authorized government systems and APIs, subject to official access, security requirements, and applicable policies.

### Production Database

Migration from in-memory persistence to PostgreSQL or another approved production database.

### Secure Identity

Integration with authorized identity, authentication, and role-management systems.

### Advanced Document Intelligence

Production OCR, document classification, entity extraction, validation, and human-review workflows.

### Regulatory Knowledge System

A version-controlled regulatory knowledge base with:

* Official sources
* Effective dates
* Version history
* Jurisdiction
* Department ownership
* Citation tracking

### Advanced Risk Models

Validated risk models with appropriate governance, monitoring, explainability, and human oversight.

### Notifications

Integration with approved SMS, email, and government notification infrastructure.

### Scalability

Containerization, monitoring, logging, caching, database scaling, and production-grade security controls.

---

# 20. Expected Impact

UdyogSetu demonstrates a unified approach to industrial approval and compliance workflows by bringing together:

**Requirement Discovery**

→ **Document Readiness**

→ **Department Coordination**

→ **Risk Transparency**

→ **Inspection Coordination**

→ **SLA Monitoring**

→ **Government Support Discovery**

→ **Regulatory Assistance**

The intended outcome is a more transparent, structured, and coordinated digital workflow for industrial applicants and government departments.

---

# 21. Submission Summary

| Category                | UdyogSetu                                      |
| ----------------------- | ---------------------------------------------- |
| Problem Area            | Industrial Approvals & Compliance              |
| Target Users            | Industrial Applicants & Government Departments |
| Frontend                | React + Vite                                   |
| Backend                 | Node.js + Express                              |
| Data Layer              | Synthetic In-Memory Prototype                  |
| Database Schema         | PostgreSQL-compatible                          |
| Applicant Portal        | Yes                                            |
| Department Portal       | Yes                                            |
| Approval Checklist      | Yes                                            |
| Document Validation     | Yes                                            |
| Risk Assessment         | Yes                                            |
| Department Routing      | Yes                                            |
| Inspection Coordination | Yes                                            |
| SLA Monitoring          | Yes                                            |
| Scheme Matching         | Yes                                            |
| Regulatory Assistant    | Yes                                            |
| Audit Trail             | Yes                                            |
| Live Demo               | Vercel                                         |
| API Deployment          | Render                                         |
| Source Code             | GitHub                                         |

---

## 22. Important Disclaimer

**UdyogSetu is a Smart India Hackathon prototype created for demonstration and evaluation purposes.**

It does not represent an official Government of Maharashtra portal or service.

All data and workflows shown in the demonstration are synthetic and illustrative. Production deployment would require appropriate government authorization, verified regulatory sources, security controls, privacy safeguards, official integrations, database infrastructure, and human oversight.

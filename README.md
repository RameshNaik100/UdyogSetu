# UdyogSetu — Industrial Approval & Compliance Platform

**Bridging Industry and Government, Seamlessly.**

*Industrial Approvals • Compliance • Inspections • Government Support*

A complete full-stack React + Express demonstration of an industrial approval and compliance workflow for Maharashtra. **All people, applications, rules, documents, references, events, schemes and metrics are synthetic illustrative demo data.** It is not an official government service or source of legal advice.

## Run locally

```bash
npm install
npm run dev
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:3001`

## Prototype highlights

- Applicant portal: profile, rule-generated approval checklist, simulated document/OCR validation, application tracking, inspections, scheme matching, notifications, application details, and grounded regulatory assistant.
- Department portal: department-scoped queue, review actions, explainable risk queue, inspection planner, combined inspection creation, SLA control tower, operational charts, scheme analytics, and audit log.
- 12 structured illustrative approval rules for Food Processing, Textile Manufacturing, and Engineering Manufacturing in Maharashtra.
- 5 applicants, 10 applications, 4 departments, seeded documents, inspections, risks, SLA records, schemes, notifications and audits.
- PostgreSQL-compatible schema is available in `server/schema.sql`; the running prototype deliberately uses local in-memory persistence.

## API

The Express server implements the requested REST endpoints, including applicant and application CRUD, checklist generation, document upload/validation, risk assessment, departments, inspections, SLA/analytics, scheme matching, and regulatory chat.

Useful entry routes:

- `/` — landing / demo entry; use **Load Demo Application** to open Sunrise Foods Pvt Ltd (MH-2026-00128)
- `/app/dashboard` — applicant experience
- `/dept/overview` — department experience

## Five-minute judge route

1. Select **Load Demo Application** on the landing page.
2. Visit **Business Profile** and choose **Generate My Approval Checklist**.
3. Open **Documents**, upload the Project Report demo, then open its validation evidence to see extracted fields and the ₹10 Cr / ₹8.2 Cr cross-check exception.
4. Use **Approval Checklist** to review rule IDs, reasons and sources; choose **Submit to department review**.
5. Open **Application Details** for the deterministic risk explanation and its rule evidence.
6. Switch to the department workspace, open **Inspection Calendar**, and create the combined inspection for Sunrise Foods.
7. Review the **SLA Control Tower**, scheme match evidence, and grounded Regulatory AI Assistant.

The reset-safe demo seed includes an initial **Potential Common Inspection** for Sunrise Foods so the combined-inspection action is immediately available.

## Safety / scope notes

- Demo authentication only; roles are Applicant, Department Officer, Department Head and Admin.
- No NSWS, MAITRI, GST, Aadhaar, DigiLocker, SSO, department API or identity-verification integrations exist in this project.
- The regulatory assistant is deterministic and dataset-grounded: it presents the matching structured rules used, or says there is no verified rule in the current prototype dataset.
- Document extraction and risk assessment are simulated, transparent prototype flows only.

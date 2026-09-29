import express from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// -----------------------------------------------------------------------------
// UdyogSetu prototype data store. PostgreSQL-compatible schema is in schema.sql.
// This intentionally uses local in-memory persistence for a safe hackathon demo.
// All organisations, applications, documents and regulatory references are synthetic.
// -----------------------------------------------------------------------------
const departments = [
  { id: 'dept-pollution', name: 'Maharashtra Pollution Control Board', shortName: 'MPCB / Environment', color: '#0f766e' },
  { id: 'dept-fire', name: 'Fire & Emergency Services', shortName: 'Fire', color: '#dc5d3a' },
  { id: 'dept-labour', name: 'Factory & Labour Directorate', shortName: 'Labour', color: '#4f46e5' },
  { id: 'dept-local', name: 'Local Planning Authority', shortName: 'Local Authority', color: '#b7791f' }
];

const applicants = [
  { id:'applicant-1', businessName:'Sunrise Foods Pvt Ltd', sector:'Food Processing', state:'Maharashtra', district:'Pune', city:'Pune', projectSize:'Medium', investment:10, employees:120, stage:'New Setup', hazardousMaterial:false, complianceHistory:'No material compliance issues reported', industrialArea:'Ranjangaon MIDC', landBuildingInfo:'Leased 2.5 acre industrial plot; food processing unit planned', contact:'demo@sunrise.example' },
  { id:'applicant-2', businessName:'Deccan Loomworks', sector:'Textile Manufacturing', state:'Maharashtra', district:'Solapur', city:'Solapur', projectSize:'Large', investment:18, employees:260, stage:'Expansion', hazardousMaterial:true, complianceHistory:'One prior documentation observation closed in 2024', industrialArea:'Akkalkot Road Industrial Area', landBuildingInfo:'Existing factory building; dyeing line expansion', contact:'demo@deccan.example' },
  { id:'applicant-3', businessName:'Vertex Precision Engineering', sector:'Engineering Manufacturing', state:'Maharashtra', district:'Nashik', city:'Nashik', projectSize:'Medium', investment:7.5, employees:85, stage:'New Setup', hazardousMaterial:false, complianceHistory:'New entity — no prior history', industrialArea:'Satpur MIDC', landBuildingInfo:'Owned 1.2 acre plot; machine shop under fit-out', contact:'demo@vertex.example' },
  { id:'applicant-4', businessName:'Konkan Agro Packs', sector:'Food Processing', state:'Maharashtra', district:'Ratnagiri', city:'Ratnagiri', projectSize:'Small', investment:2.2, employees:36, stage:'New Setup', hazardousMaterial:false, complianceHistory:'New entity — no prior history', industrialArea:'Mirjole MIDC', landBuildingInfo:'Small production shed in industrial estate', contact:'demo@konkan.example' },
  { id:'applicant-5', businessName:'Maratha Components Ltd', sector:'Engineering Manufacturing', state:'Maharashtra', district:'Aurangabad', city:'Chhatrapati Sambhajinagar', projectSize:'Large', investment:34, employees:410, stage:'Renewal', hazardousMaterial:true, complianceHistory:'Two observations under remediation plan', industrialArea:'Waluj MIDC', landBuildingInfo:'Operational 8 acre automotive components campus', contact:'demo@maratha.example' }
];

const rules = [
  { rule_id:'MH-FOOD-POLL-01', sector:'Food Processing', state:'Maharashtra', district:null, project_size:'All', stage:'New Setup', approval_name:'Consent to Establish', approval_type:'NOC', authority:'Maharashtra Pollution Control Board', departmentId:'dept-pollution', jurisdiction_level:'State', reason_applicable:'Food processing operations may generate effluent, emissions or solid waste before commissioning.', required_documents:['Project Report','Site Plan','Process Flow Diagram','Waste Management Plan'], inspection_required:true, indicative_sla_days:30, mandatory_manual_review:true, risk_category:'Medium', source_reference:'Illustrative MPCB consent workflow reference', last_updated:'2026-08-15' },
  { rule_id:'MH-FOOD-FIRE-02', sector:'Food Processing', state:'Maharashtra', district:null, project_size:'Medium|Large', stage:'New Setup|Expansion', approval_name:'Fire Safety NOC', approval_type:'NOC', authority:'Fire & Emergency Services', departmentId:'dept-fire', jurisdiction_level:'Local', reason_applicable:'Medium and large premises need fire safety plan scrutiny before occupation or operation.', required_documents:['Fire Plan','Site Plan','Building Layout','Equipment Schedule'], inspection_required:true, indicative_sla_days:21, mandatory_manual_review:false, risk_category:'Medium', source_reference:'Illustrative local fire safety workflow reference', last_updated:'2026-08-15' },
  { rule_id:'MH-FOOD-LAB-03', sector:'Food Processing', state:'Maharashtra', district:null, project_size:'All', stage:'New Setup|Expansion|Renewal', approval_name:'Factory Registration & Licence', approval_type:'Licence', authority:'Factory & Labour Directorate', departmentId:'dept-labour', jurisdiction_level:'State', reason_applicable:'The planned workforce and manufacturing activity require factory establishment review.', required_documents:['Factory Information','Identity/Business Registration','Site Plan','Employee Safety Plan'], inspection_required:false, indicative_sla_days:20, mandatory_manual_review:false, risk_category:'Low', source_reference:'Illustrative factories registration workflow reference', last_updated:'2026-08-15' },
  { rule_id:'MH-FOOD-LOCAL-04', sector:'Food Processing', state:'Maharashtra', district:null, project_size:'All', stage:'New Setup|Expansion', approval_name:'Trade & Establishment Permission', approval_type:'Registration', authority:'Local Planning Authority', departmentId:'dept-local', jurisdiction_level:'Local', reason_applicable:'A commercial manufacturing establishment requires local operating permission in this prototype workflow.', required_documents:['Identity/Business Registration','Site Plan','Occupancy Evidence'], inspection_required:false, indicative_sla_days:14, mandatory_manual_review:false, risk_category:'Low', source_reference:'Illustrative municipal trade workflow reference', last_updated:'2026-08-15' },
  { rule_id:'MH-TEXT-POLL-05', sector:'Textile Manufacturing', state:'Maharashtra', district:null, project_size:'All', stage:'New Setup|Expansion|Renewal', approval_name:'Pollution Consent / Renewal', approval_type:'NOC', authority:'Maharashtra Pollution Control Board', departmentId:'dept-pollution', jurisdiction_level:'State', reason_applicable:'Textile processing and dyeing may involve wastewater and chemical handling.', required_documents:['Project Report','Process Flow Diagram','Effluent Treatment Plan','Hazardous Material Declaration'], inspection_required:true, indicative_sla_days:30, mandatory_manual_review:true, risk_category:'High', source_reference:'Illustrative textile environmental consent workflow', last_updated:'2026-08-15' },
  { rule_id:'MH-TEXT-FIRE-06', sector:'Textile Manufacturing', state:'Maharashtra', district:null, project_size:'Medium|Large', stage:'New Setup|Expansion|Renewal', approval_name:'Fire Safety NOC', approval_type:'NOC', authority:'Fire & Emergency Services', departmentId:'dept-fire', jurisdiction_level:'Local', reason_applicable:'Textile storage and machinery footprint increase fire safety planning needs.', required_documents:['Fire Plan','Building Layout','Emergency Evacuation Plan'], inspection_required:true, indicative_sla_days:21, mandatory_manual_review:false, risk_category:'High', source_reference:'Illustrative fire safety workflow reference', last_updated:'2026-08-15' },
  { rule_id:'MH-TEXT-LAB-07', sector:'Textile Manufacturing', state:'Maharashtra', district:null, project_size:'All', stage:'New Setup|Expansion|Renewal', approval_name:'Factory Licence Amendment', approval_type:'Licence', authority:'Factory & Labour Directorate', departmentId:'dept-labour', jurisdiction_level:'State', reason_applicable:'Manufacturing process and workforce changes require factory licence review.', required_documents:['Factory Information','Employee Safety Plan','Identity/Business Registration'], inspection_required:true, indicative_sla_days:25, mandatory_manual_review:false, risk_category:'Medium', source_reference:'Illustrative labour licensing workflow reference', last_updated:'2026-08-15' },
  { rule_id:'MH-TEXT-LOCAL-08', sector:'Textile Manufacturing', state:'Maharashtra', district:'Solapur', project_size:'All', stage:'Expansion', approval_name:'Building / Layout Amendment', approval_type:'Inspection', authority:'Local Planning Authority', departmentId:'dept-local', jurisdiction_level:'District', reason_applicable:'The prototype identifies an expansion layout review for Solapur facilities.', required_documents:['Site Plan','Building Layout','Land/Building Information'], inspection_required:true, indicative_sla_days:18, mandatory_manual_review:true, risk_category:'Medium', source_reference:'Illustrative Solapur planning workflow', last_updated:'2026-08-15' },
  { rule_id:'MH-ENG-POLL-09', sector:'Engineering Manufacturing', state:'Maharashtra', district:null, project_size:'Medium|Large', stage:'New Setup|Expansion', approval_name:'Consent to Establish', approval_type:'NOC', authority:'Maharashtra Pollution Control Board', departmentId:'dept-pollution', jurisdiction_level:'State', reason_applicable:'Machining, surface treatment or industrial waste streams require environmental pre-establishment review.', required_documents:['Project Report','Process Flow Diagram','Waste Management Plan','Site Plan'], inspection_required:true, indicative_sla_days:30, mandatory_manual_review:true, risk_category:'Medium', source_reference:'Illustrative engineering environmental consent workflow', last_updated:'2026-08-15' },
  { rule_id:'MH-ENG-FIRE-10', sector:'Engineering Manufacturing', state:'Maharashtra', district:null, project_size:'Large', stage:'New Setup|Expansion', approval_name:'Fire Safety NOC', approval_type:'NOC', authority:'Fire & Emergency Services', departmentId:'dept-fire', jurisdiction_level:'Local', reason_applicable:'Large engineering premises require fire protection and access plan review.', required_documents:['Fire Plan','Building Layout','Equipment Schedule'], inspection_required:true, indicative_sla_days:21, mandatory_manual_review:false, risk_category:'Medium', source_reference:'Illustrative fire safety workflow reference', last_updated:'2026-08-15' },
  { rule_id:'MH-ENG-LAB-11', sector:'Engineering Manufacturing', state:'Maharashtra', district:null, project_size:'All', stage:'New Setup|Expansion|Renewal', approval_name:'Factory Registration & Licence', approval_type:'Licence', authority:'Factory & Labour Directorate', departmentId:'dept-labour', jurisdiction_level:'State', reason_applicable:'Engineering manufacturing sites are reviewed for factory operations and worker safeguards.', required_documents:['Factory Information','Employee Safety Plan','Identity/Business Registration'], inspection_required:false, indicative_sla_days:20, mandatory_manual_review:false, risk_category:'Low', source_reference:'Illustrative factories registration workflow reference', last_updated:'2026-08-15' },
  { rule_id:'MH-ENG-LOCAL-12', sector:'Engineering Manufacturing', state:'Maharashtra', district:null, project_size:'All', stage:'New Setup|Expansion', approval_name:'Industrial Trade Permission', approval_type:'Registration', authority:'Local Planning Authority', departmentId:'dept-local', jurisdiction_level:'Local', reason_applicable:'The local authority registers industrial trade activity in this prototype workflow.', required_documents:['Identity/Business Registration','Occupancy Evidence','Site Plan'], inspection_required:false, indicative_sla_days:14, mandatory_manual_review:false, risk_category:'Low', source_reference:'Illustrative municipal trade workflow reference', last_updated:'2026-08-15' }
];

const applications = [
 {id:'application-1', applicationNumber:'MH-2026-00128', applicantId:'applicant-1', overallProgress:62, status:'Under Review', submittedAt:'2026-09-01'},
 {id:'application-2', applicationNumber:'MH-2026-00129', applicantId:'applicant-2', overallProgress:48, status:'Under Review', submittedAt:'2026-08-25'},
 {id:'application-3', applicationNumber:'MH-2026-00130', applicantId:'applicant-3', overallProgress:31, status:'Documents Missing', submittedAt:'2026-09-10'},
 {id:'application-4', applicationNumber:'MH-2026-00131', applicantId:'applicant-4', overallProgress:78, status:'Inspection Required', submittedAt:'2026-08-18'},
 {id:'application-5', applicationNumber:'MH-2026-00132', applicantId:'applicant-5', overallProgress:88, status:'Under Review', submittedAt:'2026-08-12'},
 {id:'application-6', applicationNumber:'MH-2026-00133', applicantId:'applicant-1', overallProgress:100, status:'Approved', submittedAt:'2026-07-05'},
 {id:'application-7', applicationNumber:'MH-2026-00134', applicantId:'applicant-2', overallProgress:24, status:'Not Started', submittedAt:'2026-09-20'},
 {id:'application-8', applicationNumber:'MH-2026-00135', applicantId:'applicant-3', overallProgress:69, status:'SLA At Risk', submittedAt:'2026-08-28'},
 {id:'application-9', applicationNumber:'MH-2026-00136', applicantId:'applicant-4', overallProgress:100, status:'Approved', submittedAt:'2026-06-10'},
 {id:'application-10', applicationNumber:'MH-2026-00137', applicantId:'applicant-5', overallProgress:55, status:'Overdue', submittedAt:'2026-08-01'}
];

let approvalTasks = [
 {id:'task-1',applicationId:'application-1',ruleId:'MH-FOOD-FIRE-02',departmentId:'dept-fire',status:'Inspection Required',progress:60,assignedOfficer:'Officer Priya S.',submissionDate:'2026-09-04',elapsedDays:24,slaDays:21,comments:'Site visit requested after preliminary plan review.',actionHistory:[['2026-09-04','Submitted','Applicant'],['2026-09-11','Plan reviewed','Officer Priya S.'],['2026-09-18','Inspection requested','Officer Priya S.']]},
 {id:'task-2',applicationId:'application-1',ruleId:'MH-FOOD-POLL-01',departmentId:'dept-pollution',status:'SLA At Risk',progress:72,assignedOfficer:'Officer Arjun M.',submissionDate:'2026-09-01',elapsedDays:27,slaDays:30,comments:'Effluent handling clarification under review.',actionHistory:[['2026-09-01','Submitted','Applicant'],['2026-09-07','Assigned','Officer Arjun M.'],['2026-09-22','Clarification received','Applicant']]},
 {id:'task-3',applicationId:'application-1',ruleId:'MH-FOOD-LAB-03',departmentId:'dept-labour',status:'Approved',progress:100,assignedOfficer:'Officer Kavita R.',submissionDate:'2026-09-02',elapsedDays:18,slaDays:20,comments:'Approved with standard safeguards.',actionHistory:[['2026-09-02','Submitted','Applicant'],['2026-09-20','Approved','Officer Kavita R.']]},
 {id:'task-4',applicationId:'application-1',ruleId:'MH-FOOD-LOCAL-04',departmentId:'dept-local',status:'Documents Missing',progress:20,assignedOfficer:'Officer Nikhil P.',submissionDate:'2026-09-05',elapsedDays:23,slaDays:14,comments:'Occupancy evidence is pending.',actionHistory:[['2026-09-05','Submitted','Applicant'],['2026-09-09','Document request issued','Officer Nikhil P.']]},
 {id:'task-5',applicationId:'application-2',ruleId:'MH-TEXT-POLL-05',departmentId:'dept-pollution',status:'Inspection Required',progress:55,assignedOfficer:'Officer Arjun M.',submissionDate:'2026-08-25',elapsedDays:34,slaDays:30,comments:'Joint inspection proposed due to dyeing line.',actionHistory:[]},
 {id:'task-6',applicationId:'application-2',ruleId:'MH-TEXT-FIRE-06',departmentId:'dept-fire',status:'Inspection Required',progress:55,assignedOfficer:'Officer Priya S.',submissionDate:'2026-08-27',elapsedDays:32,slaDays:21,comments:'Potential common inspection flagged.',actionHistory:[]},
 {id:'task-7',applicationId:'application-2',ruleId:'MH-TEXT-LAB-07',departmentId:'dept-labour',status:'Under Review',progress:50,assignedOfficer:'Officer Kavita R.',submissionDate:'2026-08-29',elapsedDays:30,slaDays:25,comments:'Worker safety plan under scrutiny.',actionHistory:[]},
 {id:'task-8',applicationId:'application-2',ruleId:'MH-TEXT-LOCAL-08',departmentId:'dept-local',status:'Under Review',progress:45,assignedOfficer:'Officer Nikhil P.',submissionDate:'2026-08-30',elapsedDays:29,slaDays:18,comments:'Layout amendment in review.',actionHistory:[]},
 {id:'task-9',applicationId:'application-3',ruleId:'MH-ENG-POLL-09',departmentId:'dept-pollution',status:'Documents Missing',progress:25,assignedOfficer:'Officer Arjun M.',submissionDate:'2026-09-10',elapsedDays:18,slaDays:30,comments:'Waste management plan needed.',actionHistory:[]},
 {id:'task-10',applicationId:'application-3',ruleId:'MH-ENG-LAB-11',departmentId:'dept-labour',status:'Ready to Submit',progress:40,assignedOfficer:'Unassigned',submissionDate:'2026-09-11',elapsedDays:17,slaDays:20,comments:'Awaiting applicant final submission.',actionHistory:[]},
 {id:'task-11',applicationId:'application-4',ruleId:'MH-FOOD-POLL-01',departmentId:'dept-pollution',status:'Inspection Required',progress:80,assignedOfficer:'Officer Arjun M.',submissionDate:'2026-08-18',elapsedDays:41,slaDays:30,comments:'Scheduled for site verification.',actionHistory:[]},
 {id:'task-12',applicationId:'application-5',ruleId:'MH-ENG-POLL-09',departmentId:'dept-pollution',status:'Under Review',progress:82,assignedOfficer:'Officer Arjun M.',submissionDate:'2026-08-12',elapsedDays:47,slaDays:30,comments:'Renewal pattern is illustrative.',actionHistory:[]},
 {id:'task-13',applicationId:'application-5',ruleId:'MH-ENG-LAB-11',departmentId:'dept-labour',status:'Approved',progress:100,assignedOfficer:'Officer Kavita R.',submissionDate:'2026-08-12',elapsedDays:19,slaDays:20,comments:'Approved.',actionHistory:[]},
 {id:'task-14',applicationId:'application-8',ruleId:'MH-ENG-POLL-09',departmentId:'dept-pollution',status:'SLA At Risk',progress:70,assignedOfficer:'Officer Arjun M.',submissionDate:'2026-08-28',elapsedDays:29,slaDays:30,comments:'Review nearing indicative SLA.',actionHistory:[]},
 {id:'task-15',applicationId:'application-10',ruleId:'MH-ENG-POLL-09',departmentId:'dept-pollution',status:'Overdue',progress:58,assignedOfficer:'Officer Arjun M.',submissionDate:'2026-08-01',elapsedDays:58,slaDays:30,comments:'Escalated to department head.',actionHistory:[]}
];

let documents = [
 {id:'doc-1',applicationId:'application-1',name:'Sunrise Project Report.pdf',documentType:'Project Report',status:'Validated',uploadedAt:'2026-09-01',extractedFields:{businessName:'Sunrise Foods Pvt Ltd',investment:'₹8.2 Crore',project:'Food processing unit'},validation:{type:'Correct document type',fields:'Required fields detected',consistency:'Potential mismatch detected. Application project investment: ₹10 Crore; uploaded document: ₹8.2 Crore. Please review before submission.',level:'amber'}},
 {id:'doc-2',applicationId:'application-1',name:'Fire Safety Plan.pdf',documentType:'Fire Plan',status:'Validated',uploadedAt:'2026-09-02',extractedFields:{buildingArea:'4,800 sq m',exits:'4',hydrants:'6'},validation:{type:'Correct document type',fields:'Required fields detected',consistency:'Information consistent',level:'green'}},
 {id:'doc-3',applicationId:'application-1',name:'Factory Details.pdf',documentType:'Factory Information',status:'Validated',uploadedAt:'2026-09-02',extractedFields:{employees:'120',shift:'2'},validation:{type:'Correct document type',fields:'Required fields detected',consistency:'Information consistent',level:'green'}},
 {id:'doc-4',applicationId:'application-1',name:'Site Layout.pdf',documentType:'Site Plan',status:'Validated',uploadedAt:'2026-09-03',extractedFields:{plot:'Ranjangaon MIDC',area:'2.5 acre'},validation:{type:'Correct document type',fields:'Required fields detected',consistency:'Information consistent',level:'green'}},
 {id:'doc-5',applicationId:'application-2',name:'ETP Design.pdf',documentType:'Effluent Treatment Plan',status:'Validated',uploadedAt:'2026-08-26',extractedFields:{capacity:'45 KLD'},validation:{type:'Correct document type',fields:'Required fields detected',consistency:'Information consistent',level:'green'}},
 {id:'doc-6',applicationId:'application-2',name:'Dyeing Line Layout.pdf',documentType:'Site Plan',status:'Validated',uploadedAt:'2026-08-26',extractedFields:{line:'Dyeing expansion'},validation:{type:'Correct document type',fields:'Required fields detected',consistency:'Information consistent',level:'green'}},
 {id:'doc-7',applicationId:'application-3',name:'Vertex Project Note.pdf',documentType:'Project Report',status:'Needs Review',uploadedAt:'2026-09-10',extractedFields:{businessName:'Vertex Precision Engineering'},validation:{type:'Correct document type',fields:'Missing field: waste stream estimate',consistency:'Information consistent',level:'amber'}},
 {id:'doc-8',applicationId:'application-4',name:'Agro Site Map.pdf',documentType:'Site Plan',status:'Validated',uploadedAt:'2026-08-18',extractedFields:{plot:'Mirjole MIDC'},validation:{type:'Correct document type',fields:'Required fields detected',consistency:'Information consistent',level:'green'}},
 {id:'doc-9',applicationId:'application-5',name:'Hazard Declaration.pdf',documentType:'Hazardous Material Declaration',status:'Validated',uploadedAt:'2026-08-12',extractedFields:{materials:'Coolants & treatment chemicals'},validation:{type:'Correct document type',fields:'Required fields detected',consistency:'Information consistent',level:'green'}},
 {id:'doc-10',applicationId:'application-1',name:'Business Registration.pdf',documentType:'Identity/Business Registration',status:'Validated',uploadedAt:'2026-09-01',extractedFields:{entity:'Sunrise Foods Pvt Ltd'},validation:{type:'Correct document type',fields:'Required fields detected',consistency:'Information consistent',level:'green'}},
 {id:'doc-11',applicationId:'application-2',name:'Fire Drawing.pdf',documentType:'Fire Plan',status:'Validated',uploadedAt:'2026-08-27',extractedFields:{hydrants:'8'},validation:{type:'Correct document type',fields:'Required fields detected',consistency:'Information consistent',level:'green'}},
 {id:'doc-12',applicationId:'application-3',name:'Factory Intake.pdf',documentType:'Factory Information',status:'Validated',uploadedAt:'2026-09-11',extractedFields:{employees:'85'},validation:{type:'Correct document type',fields:'Required fields detected',consistency:'Information consistent',level:'green'}}
];

let inspections = [
 {id:'inspection-1',applicationId:'application-1',date:'2026-10-14',time:'11:00 AM',location:'Ranjangaon MIDC, Pune',departmentIds:['dept-fire'],status:'Scheduled',type:'Department inspection',notes:'Fire safety systems verification'},
 {id:'inspection-1b',applicationId:'application-1',date:'2026-10-15',time:'02:30 PM',location:'Ranjangaon MIDC, Pune',departmentIds:['dept-fire','dept-pollution'],status:'Proposed',type:'Potential Common Inspection',notes:'Prototype detected shared site inspection requirements for Fire and Pollution approval tasks.'},
 {id:'inspection-2',applicationId:'application-2',date:'2026-10-08',time:'10:30 AM',location:'Akkalkot Road Industrial Area, Solapur',departmentIds:['dept-pollution','dept-fire'],status:'Proposed',type:'Potential Common Inspection',notes:'Dyeing line and fire plan review'},
 {id:'inspection-3',applicationId:'application-4',date:'2026-10-03',time:'02:00 PM',location:'Mirjole MIDC, Ratnagiri',departmentIds:['dept-pollution'],status:'Scheduled',type:'Department inspection',notes:'Food unit site verification'},
 {id:'inspection-4',applicationId:'application-5',date:'2026-09-30',time:'11:30 AM',location:'Waluj MIDC, Chhatrapati Sambhajinagar',departmentIds:['dept-pollution'],status:'Completed',type:'Department inspection',notes:'Follow-up evidence recorded'},
 {id:'inspection-5',applicationId:'application-3',date:'2026-10-18',time:'12:00 PM',location:'Satpur MIDC, Nashik',departmentIds:['dept-pollution'],status:'Tentative',type:'Department inspection',notes:'Awaiting waste management document'}
];

const schemes = [
 {id:'scheme-1',name:'Maharashtra Food Processing Support Window',sector:'Food Processing',location:'Maharashtra',projectSizeMin:'Small',projectSizeMax:'Large',investmentMin:1,investmentMax:50,eligibilityConditions:['Food processing project','New investment in Maharashtra'],description:'Illustrative support window for qualifying new food processing investments.',officialReferencePlaceholder:'Demo official reference placeholder'},
 {id:'scheme-2',name:'MIDC Industrial Infrastructure Facilitation',sector:'All',location:'Maharashtra',projectSizeMin:'Small',projectSizeMax:'Large',investmentMin:2,investmentMax:100,eligibilityConditions:['Industrial area location','New setup or expansion'],description:'Illustrative infrastructure facilitation recommendation for projects in notified industrial areas.',officialReferencePlaceholder:'Demo official reference placeholder'},
 {id:'scheme-3',name:'Textile Modernisation Support',sector:'Textile Manufacturing',location:'Maharashtra',projectSizeMin:'Medium',projectSizeMax:'Large',investmentMin:5,investmentMax:75,eligibilityConditions:['Textile manufacturing','Expansion or modernization'],description:'Illustrative textile modernization support recommendation.',officialReferencePlaceholder:'Demo official reference placeholder'},
 {id:'scheme-4',name:'Engineering MSME Technology Upgrade',sector:'Engineering Manufacturing',location:'Maharashtra',projectSizeMin:'Small',projectSizeMax:'Medium',investmentMin:1,investmentMax:15,eligibilityConditions:['Engineering manufacturing','Technology or capacity investment'],description:'Illustrative technology upgrade recommendation for eligible MSME-scale units.',officialReferencePlaceholder:'Demo official reference placeholder'},
 {id:'scheme-5',name:'Employment-Linked Industrial Incentive',sector:'All',location:'Maharashtra',projectSizeMin:'Medium',projectSizeMax:'Large',investmentMin:5,investmentMax:100,eligibilityConditions:['New investment','100 or more proposed employees'],description:'Illustrative employment-linked industrial incentive recommendation.',officialReferencePlaceholder:'Demo official reference placeholder'}
];

let riskAssessments = [
 {id:'risk-1',applicationId:'application-1',score:42,classification:'Medium',factors:[{label:'Medium-scale project',points:12},{label:'Food processing sector',points:10},{label:'Ranjangaon MIDC operational complexity',points:10},{label:'Manual review safeguard',points:10}],safeguards:['Pollution approval requires mandatory manual review'],routingDecision:'Fast-track candidate: Yes for eligible tasks. Pollution approval remains with manual review.',assessedAt:'2026-09-01'},
 {id:'risk-2',applicationId:'application-2',score:80,classification:'High',factors:[{label:'Hazardous material',points:30},{label:'High-risk textile processing',points:20},{label:'Large project',points:15},{label:'Prior compliance observation',points:15}],safeguards:['Pollution approval requires mandatory manual review','Local layout amendment requires manual review'],routingDecision:'Manual scrutiny and coordinated inspection required.',assessedAt:'2026-08-25'},
 {id:'risk-3',applicationId:'application-3',score:22,classification:'Low',factors:[{label:'Medium project',points:12},{label:'New entity',points:10}],safeguards:['Pollution approval requires mandatory manual review'],routingDecision:'Fast-track candidate: Yes for eligible tasks. Pollution approval remains with manual review.',assessedAt:'2026-09-10'},
 {id:'risk-4',applicationId:'application-5',score:80,classification:'High',factors:[{label:'Hazardous material',points:30},{label:'Large project',points:15},{label:'Prior compliance issue history',points:15},{label:'Special location factor',points:10},{label:'Engineering environmental process',points:10}],safeguards:['Pollution approval requires mandatory manual review'],routingDecision:'Escalated manual scrutiny.',assessedAt:'2026-08-12'}
];

const notifications = [
 {id:'notification-1',applicantId:'applicant-1',type:'sla',message:'Pollution approval is approaching SLA breach.',read:false,createdAt:'2026-09-28'},
 {id:'notification-2',applicantId:'applicant-1',type:'inspection',message:'Fire inspection scheduled for 14 Oct.',read:false,createdAt:'2026-09-27'},
 {id:'notification-3',applicantId:'applicant-1',type:'document',message:'Document validation flagged an investment amount mismatch.',read:false,createdAt:'2026-09-26'},
 {id:'notification-4',applicantId:'applicant-1',type:'scheme',message:'New potentially relevant scheme detected.',read:true,createdAt:'2026-09-24'},
 {id:'notification-5',applicantId:'applicant-2',type:'inspection',message:'Potential common inspection has been proposed.',read:false,createdAt:'2026-09-28'}
];
const auditLogs = [
 {id:'audit-1',applicationId:'application-1',actor:'Sunrise Foods Pvt Ltd',action:'Application submitted',details:'Four approval tasks created in parallel.',createdAt:'2026-09-01 09:20'},
 {id:'audit-2',applicationId:'application-1',actor:'UdyogSetu prototype',action:'Document validation complete',details:'Investment mismatch flagged for project report.',createdAt:'2026-09-01 10:05'},
 {id:'audit-3',applicationId:'application-1',actor:'Officer Arjun M.',action:'Pollution review updated',details:'Clarification received and under review.',createdAt:'2026-09-22 15:30'},
 {id:'audit-4',applicationId:'application-1',actor:'Officer Priya S.',action:'Inspection requested',details:'Fire system verification is scheduled.',createdAt:'2026-09-18 12:10'}
];

function matchList(value, condition) { return condition === 'All' || condition.split('|').includes(value); }
function applicableRules(profile) {
  return rules.filter(r => r.sector === profile.sector && r.state === profile.state &&
    (!r.district || r.district === profile.district) &&
    matchList(profile.projectSize, r.project_size) && matchList(profile.stage, r.stage));
}
function applicantForApp(appId) { const item = applications.find(a=>a.id===appId); return applicants.find(a=>a.id===item?.applicantId); }
function ruleEvidence(profile, matchedRules=[]) {
 return matchedRules.map(rule => ({
   rule_id: rule.rule_id,
   approval_name: rule.approval_name,
   matched_conditions: [
     `Sector: ${profile.sector}`,
     `State: ${profile.state}`,
     rule.district ? `District: ${profile.district}` : 'District: no rule-specific constraint',
     `Project size: ${profile.projectSize}`,
     `Stage: ${profile.stage}`
   ],
   reason_applicable: rule.reason_applicable,
   source_reference: rule.source_reference,
   last_updated: rule.last_updated,
   confidence: 'High — exact structured prototype rule match'
 }));
}
function documentEvidence(doc, applicant) {
 if (!doc.validation) return [];
 const evidence=[`Declared prototype document category: ${doc.documentType}`, `Business profile used for cross-check: ${applicant?.businessName||'Unavailable'}`];
 if (doc.extractedFields && Object.keys(doc.extractedFields).length) evidence.push(`Extracted fields: ${Object.keys(doc.extractedFields).join(', ')}`);
 if (doc.validation.level==='amber') evidence.push('Cross-check requires applicant review before submission.');
 else evidence.push('Required fields and cross-check completed in prototype mode.');
 return evidence;
}
function applicationView(application) {
 const applicant = applicants.find(x=>x.id===application.applicantId);
 const matched = applicant ? applicableRules(applicant) : [];
 const savedRisk=riskAssessments.find(r=>r.applicationId===application.id);
 return {...application, applicant, tasks: approvalTasks.filter(t=>t.applicationId===application.id).map(task=>({...task, rule:rules.find(r=>r.rule_id===task.ruleId), department:departments.find(d=>d.id===task.departmentId)})), documents:documents.filter(d=>d.applicationId===application.id).map(doc=>({...doc, extractionConfidence: doc.validation?.level==='amber'?'Medium — field extraction complete; cross-check exception found':'High — prototype field extraction and required-field check complete', validation:doc.validation?{...doc.validation,missingFields:doc.validation.missingFields||((doc.validation.fields||'').startsWith('Missing field')?[doc.validation.fields.replace('Missing field: ','')]:[]),applicationDataMatch:doc.validation.applicationDataMatch||(doc.validation.level==='amber'?'A prototype cross-check or field review is required':'Information consistent in prototype cross-check'),recommendedAction:doc.validation.recommendedAction||(doc.validation.level==='amber'?'Review the flagged item before submission.':'No further prototype action flagged.'),evidence:doc.validation.evidence||documentEvidence(doc,applicant)}:null})), risk:savedRisk?{...savedRisk,evidence:ruleEvidence(applicant,matched),confidence:'High — deterministic profile attributes and structured rule coverage'}:null, inspections:inspections.filter(i=>i.applicationId===application.id), auditLogs:auditLogs.filter(a=>a.applicationId===application.id)};
}
function calculateRisk(profile, targetRules=[]) {
 const factors=[]; let score=0;
 if (profile.hazardousMaterial) { score+=30; factors.push({label:'Hazardous material',points:30}); }
 if (profile.sector === 'Textile Manufacturing') { score+=20; factors.push({label:'High-risk textile processing sector',points:20}); }
 else if (profile.sector === 'Food Processing' || profile.sector === 'Engineering Manufacturing') { score+=10; factors.push({label:`${profile.sector} operational factor`,points:10}); }
 if (profile.projectSize === 'Large') { score+=15; factors.push({label:'Large project',points:15}); }
 else if (profile.projectSize === 'Medium') { score+=12; factors.push({label:'Medium-scale project',points:12}); }
 if ((profile.complianceHistory||'').toLowerCase().includes('observation') || (profile.complianceHistory||'').toLowerCase().includes('issue')) { score+=15; factors.push({label:'Compliance issue history',points:15}); }
 if ((profile.industrialArea||'').includes('MIDC')) { score+=10; factors.push({label:'Special location factor',points:10}); }
 const mandatory = targetRules.filter(r=>r.mandatory_manual_review).map(r=>`${r.approval_name} requires mandatory manual review`);
 return { score, classification:score<=30?'Low':score<=60?'Medium':'High', factors, safeguards: mandatory.length?mandatory:['No mandatory review rule triggered'], evidence:ruleEvidence(profile,targetRules), confidence:'High — deterministic profile attributes and structured rule coverage', routingDecision: mandatory.length ? `Fast-track candidate: ${score<=60?'Yes':'No'} for eligible tasks. ${mandatory.join('; ')}.` : score<=60?'Fast-track candidate: Yes':'Manual scrutiny recommended' };
}
function matchSchemes(profile) {
 return schemes.filter(s => (s.sector==='All'||s.sector===profile.sector) && s.location===profile.state && profile.investment>=s.investmentMin && profile.investment<=s.investmentMax).map(s=>({ ...s, reasons:[s.sector==='All'?'Sector supported':'Sector matches','Location matches', 'Project size matches', profile.stage==='New Setup'?'New investment matches':'Investment profile matches'], evidence:[`Scheme sector scope: ${s.sector}`,`Scheme location scope: ${s.location}`,`Investment band: ₹${s.investmentMin}–₹${s.investmentMax} Crore`,`Applicant investment: ₹${profile.investment} Crore`,`Project stage: ${profile.stage}`], confidence:'High — all displayed profile filters match this illustrative scheme record' }));
}
function audit(applicationId, actor, action, details) { auditLogs.unshift({id:uuid(),applicationId,actor,action,details,createdAt:new Date().toISOString().slice(0,16).replace('T',' ')}); }

app.get('/api/health', (_,res)=>res.json({status:'ok', mode:'prototype-demo-data'}));
app.get('/api/demo', (_,res)=>res.json({primaryApplicantId:'applicant-1',primaryApplicationId:'application-1',applicants,departments,rules,applications:applications.map(applicationView),schemes,notifications,auditLogs}));

app.post('/api/auth/login', (req,res)=> { const role=req.body.role || 'Applicant'; res.json({token:'demo-token-'+role.toLowerCase().replaceAll(' ', '-'), role, user:role==='Applicant'?{name:'Sunrise Foods Pvt Ltd',applicantId:'applicant-1'}:{name: role==='Department Head'?'Dr. Meera Kulkarni':'Officer Arjun M.', departmentId:'dept-pollution'}}); });

app.post('/api/applicants',(req,res)=> { const record={id:uuid(), ...req.body, state:req.body.state||'Maharashtra'}; applicants.push(record); res.status(201).json(record); });
app.get('/api/applicants/:id',(req,res)=> { const record=applicants.find(x=>x.id===req.params.id); record?res.json(record):res.status(404).json({error:'Applicant not found'}); });
app.put('/api/applicants/:id',(req,res)=> { const n=applicants.findIndex(x=>x.id===req.params.id); if(n<0)return res.status(404).json({error:'Applicant not found'}); applicants[n]={...applicants[n],...req.body}; res.json(applicants[n]); });

app.post('/api/applications',(req,res)=> { const id=uuid(); const no=`MH-2026-${String(128+applications.length).padStart(5,'0')}`; const record={id, applicationNumber:no, applicantId:req.body.applicantId, overallProgress:12,status:'Not Started',submittedAt:new Date().toISOString().slice(0,10)}; applications.push(record); audit(id,'Applicant','Application created','Prototype application created.'); res.status(201).json(applicationView(record)); });
app.get('/api/applications',(req,res)=>res.json(applications.map(applicationView)));
app.get('/api/applications/:id',(req,res)=> { const record=applications.find(x=>x.id===req.params.id); record?res.json(applicationView(record)):res.status(404).json({error:'Application not found'}); });
app.post('/api/applications/:id/submit',(req,res)=> {
 const record=applications.find(x=>x.id===req.params.id);
 if(!record)return res.status(404).json({error:'Application not found'});
 const firstSubmission=!record.submittedAt;
 record.submittedAt=record.submittedAt||new Date().toISOString().slice(0,10);
 record.status='Under Review';
 record.overallProgress=Math.max(record.overallProgress||0,30);
 const transitioned=approvalTasks.filter(task=>task.applicationId===record.id && task.status==='Not Started');
 transitioned.forEach(task=>{task.status='Under Review';task.progress=Math.max(task.progress||0,20);task.actionHistory.push([new Date().toISOString().slice(0,10),'Submitted to department queue','UdyogSetu prototype']);});
 audit(record.id,'Applicant',firstSubmission?'Application submitted to department review':'Application submission confirmed',`${transitioned.length} not-started approval task(s) moved to the department queue. Prototype workflow only.`);
 res.json({application:applicationView(record),message:firstSubmission?'Application submitted to the prototype department workflow.':'Application was already submitted; the department workflow and audit trail have been refreshed.',disclaimer:'Prototype workflow only. No government department has received this submission.'});
});

app.post('/api/checklist/generate',(req,res)=> { const profile=req.body.profile || applicants.find(a=>a.id===req.body.applicantId); if(!profile) return res.status(400).json({error:'A prototype business profile is required'}); const found=applicableRules(profile); let application = applications.find(a=>a.id===req.body.applicationId);
 if (application && !approvalTasks.some(t=>t.applicationId===application.id)) {
   approvalTasks.push(...found.map((r,i)=>({id:uuid(),applicationId:application.id,ruleId:r.rule_id,departmentId:r.departmentId,status:'Not Started',progress:0,assignedOfficer:'Unassigned',submissionDate:null,elapsedDays:0,slaDays:r.indicative_sla_days,comments:'Generated by prototype rule engine.',actionHistory:[['Today','Checklist generated','UdyogSetu prototype']]})));
   application.overallProgress=18; application.status='Checklist Ready'; audit(application.id,'UdyogSetu prototype','Checklist generated',`${found.length} structured demo rules applied.`);
 }
 res.json({profile, disclaimer:'Illustrative regulatory dataset — prototype only. Verify final requirements with the relevant authority. This is not legal advice.', confidence:'High — only exact structured prototype rule matches are returned.', rules:found, evidence:ruleEvidence(profile,found), checklist:found.map(r=>({rule:r,status:'Not Started',progress:0,evidence:ruleEvidence(profile,[r])[0]}))});
});
app.get('/api/applications/:id/checklist',(req,res)=>{ const view=applicationView(applications.find(a=>a.id===req.params.id)); if(!view)return res.status(404).json({error:'Application not found'}); const profile=view.applicant; const tasks=view.tasks.length?view.tasks:applicableRules(profile).map(r=>({rule:r,status:'Not Started',progress:0,slaDays:r.indicative_sla_days})); res.json({application:view, disclaimer:'Illustrative regulatory dataset — prototype only. Verify final requirements with the relevant authority. This is not legal advice.', confidence:'High — only exact structured prototype rule matches are returned.', evidence:ruleEvidence(profile,applicableRules(profile)), checklist:tasks.map(task=>({...task,evidence:ruleEvidence(profile,[task.rule])[0]}))}); });

app.post('/api/documents/upload',(req,res)=> { const applicationId=req.body.applicationId||'application-1'; const documentType=req.body.documentType||'Project Report'; const doc={id:uuid(),applicationId,name:req.body.name||`Uploaded ${documentType}.pdf`,documentType,status:'Uploaded',uploadedAt:new Date().toISOString().slice(0,10),extractedFields:{},validation:null}; documents.unshift(doc); audit(applicationId,'Applicant','Document uploaded',`${doc.name} uploaded for prototype validation.`); res.status(201).json(doc); });
app.post('/api/documents/:id/validate',(req,res)=>{ const doc=documents.find(d=>d.id===req.params.id); if(!doc)return res.status(404).json({error:'Document not found'}); const applicant=applicantForApp(doc.applicationId); const application=applications.find(a=>a.id===doc.applicationId); const isProject=doc.documentType==='Project Report'; const amount=req.body.uploadedInvestment ?? (isProject?8.2:applicant.investment); const mismatch=isProject && Number(amount)!==Number(applicant.investment); doc.status=mismatch?'Needs Review':'Validated'; doc.extractedFields=isProject?{businessName:applicant.businessName,address:`${applicant.industrialArea}, ${applicant.city}`,applicationNumber:application?.applicationNumber||'Prototype reference unavailable',investment:`₹${amount} Crore`,project:`${applicant.sector} unit`}:{businessName:applicant.businessName,address:`${applicant.industrialArea}, ${applicant.city}`,applicationNumber:application?.applicationNumber||'Prototype reference unavailable',detectedType:doc.documentType,reference:'Synthetic extraction'}; doc.validation={type:'Correct document type',fields:'Required fields detected',missingFields:[],applicationDataMatch:mismatch?'Investment amount requires applicant review':'Business name, address and application reference are consistent in prototype data',recommendedAction:mismatch?'Review the investment amount and upload a corrected Project Report before relying on this prototype result.':'No further prototype action flagged; retain the document for department review.',consistency:mismatch?`Potential mismatch detected. Application project investment: ₹${applicant.investment} Crore; uploaded document: ₹${amount} Crore. Please review before submission.`:'Information consistent',level:mismatch?'amber':'green',confidence:mismatch?'Medium — extraction completed, but a cross-check exception requires review.':'High — declared type, required fields and prototype cross-check align.',evidence:[],steps:['Document uploaded','Document type detected','Fields extracted','Required fields checked','Application data cross-checked','Validation completed']}; doc.validation.evidence=documentEvidence(doc,applicant); audit(doc.applicationId,'UdyogSetu prototype','Document validation complete',doc.validation.consistency); res.json({...doc,extractionConfidence:doc.validation.confidence}); });

app.post('/api/risk/assess',(req,res)=> { const applicationId=req.body.applicationId; const profile=req.body.profile || applicantForApp(applicationId); if(!profile)return res.status(400).json({error:'Business profile required'}); const targets=applicableRules(profile); const computed=calculateRisk(profile,targets); const existing=riskAssessments.find(r=>r.applicationId===applicationId); const output={id:existing?.id||uuid(),applicationId, ...computed, assessedAt:new Date().toISOString().slice(0,10)}; if(existing)Object.assign(existing,output); else riskAssessments.push(output); if(applicationId)audit(applicationId,'UdyogSetu prototype','Risk assessment generated',`Explainable score ${computed.score}, ${computed.classification}.`); res.json({...output,disclaimer:'Prototype decision-support mechanism only. It does not replace statutory authority.'}); });

app.get('/api/departments',(_,res)=>res.json(departments));
app.get('/api/departments/:id/applications',(req,res)=> { const departmentId=req.params.id; const tasks=approvalTasks.filter(t=>t.departmentId===departmentId).map(t=>({...t,rule:rules.find(r=>r.rule_id===t.ruleId),application:applications.find(a=>a.id===t.applicationId),applicant:applicantForApp(t.applicationId)})); res.json(tasks); });
app.post('/api/tasks/:id/action',(req,res)=>{ const task=approvalTasks.find(t=>t.id===req.params.id); if(!task)return res.status(404).json({error:'Task not found'}); task.status=req.body.status||task.status; task.progress=req.body.progress??task.progress; task.comments=req.body.comments||task.comments; task.actionHistory.push([new Date().toISOString().slice(0,10),task.status,req.body.actor||'Department Officer']); audit(task.applicationId,req.body.actor||'Department Officer',`Task marked ${task.status}`,task.comments); res.json(task); });

app.get('/api/inspections',(_,res)=>res.json(inspections.map(i=>({...i, application:applications.find(a=>a.id===i.applicationId), applicant:applicantForApp(i.applicationId), departments:i.departmentIds.map(id=>departments.find(d=>d.id===id))}))));
app.post('/api/inspections',(req,res)=>{ const item={id:uuid(), ...req.body, status:req.body.status||'Scheduled',type:req.body.type||'Department inspection'}; inspections.push(item); audit(item.applicationId,'Department Officer','Inspection scheduled',`${item.type} on ${item.date}.`); res.status(201).json(item); });
app.post('/api/inspections/combine',(req,res)=>{ const current=inspections.find(i=>i.id===req.body.inspectionId) || inspections.find(i=>i.applicationId===req.body.applicationId && i.type==='Potential Common Inspection'); if(!current)return res.status(404).json({error:'Potential inspection not found'}); current.departmentIds=[...new Set([...(current.departmentIds||[]), ...(req.body.departmentIds||[])])]; current.type='Combined Inspection'; current.status='Scheduled'; current.notes='Combined inspection created from potential common inspection.'; audit(current.applicationId,'Department Head','Combined inspection created',`${current.departmentIds.length} departments joined the event.`); res.json(current); });

app.get('/api/sla',(_,res)=>res.json(approvalTasks.map(t=>({ ...t, rule:rules.find(r=>r.rule_id===t.ruleId), department:departments.find(d=>d.id===t.departmentId), application:applications.find(a=>a.id===t.applicationId), applicant:applicantForApp(t.applicationId), remainingDays:t.slaDays-t.elapsedDays, slaStatus:t.elapsedDays>t.slaDays?'Breached':t.elapsedDays/t.slaDays>=.8?'At Risk':'On Track'}))));
app.get('/api/analytics',(_,res)=>res.json({
 status:[['Under Review',4],['Approved',3],['Inspection Required',1],['At Risk',1],['Overdue',1]],
 department:departments.map(d=>[d.shortName,approvalTasks.filter(t=>t.departmentId===d.id).length]),
 sla:[['On Track',7],['At Risk',3],['Breached',3]],
 processing:[['Pollution',27],['Fire',19],['Labour',16],['Local',14]],
 bottlenecks:[['Pollution',8],['Local Authority',6],['Fire',4],['Labour',3]],
 metrics:{total:applications.length,underReview:applications.filter(a=>a.status==='Under Review').length,approved:applications.filter(a=>a.status==='Approved').length,atRisk:approvalTasks.filter(t=>t.status==='SLA At Risk').length,overdue:approvalTasks.filter(t=>t.status==='Overdue').length,inspectionsWeek:3,avgProcessing:22}
}));
app.get('/api/schemes',(_,res)=>res.json(schemes));
app.post('/api/schemes/match',(req,res)=>{ const profile=req.body.profile || applicantForApp(req.body.applicationId); if(!profile)return res.status(400).json({error:'Profile required'}); res.json({profile,matches:matchSchemes(profile),disclaimer:'Preliminary recommendation only. Final eligibility is determined by the relevant authority.'}); });

app.post('/api/regulatory/chat',(req,res)=> { const question=(req.body.question||'').toLowerCase(); const profile=req.body.profile || applicantForApp(req.body.applicationId) || applicants[0]; const sourceRules=applicableRules(profile); const wantsApproval=/approval|need|require|checklist/.test(question); const wantsDocs=/document|upload|paper/.test(question); const wantsSla=/sla|time|days|long/.test(question); let answer='No verified rule was found in the current prototype knowledge base for that condition.';
 if(sourceRules.length && (wantsApproval || wantsDocs || wantsSla || question.includes(profile.sector.toLowerCase().split(' ')[0]))) {
   answer=`For the ${profile.projectSize.toLowerCase()} ${profile.sector} profile in ${profile.state}, the prototype rule engine retrieved ${sourceRules.length} applicable approval categories. `+
   sourceRules.map(r=>`${r.approval_name} (${r.authority}) applies because ${r.reason_applicable} Indicative SLA: ${r.indicative_sla_days} days.`).join(' ');
   if(wantsDocs)answer+=' Required documents are listed against each approval card below.';
 }
 const grounded=sourceRules.length && answer!=='No verified rule was found in the current prototype knowledge base for that condition.';
 const evidenceRules=grounded?sourceRules:[];
 res.json({answer,grounded,confidence:grounded?{label:'High evidence coverage',score:92,explanation:'The answer is based only on exact profile-to-rule matches in the prototype dataset.'}:{label:'No verified evidence available',score:0,explanation:'The current prototype dataset has no verified structured rule for this question.'},profile:{businessName:profile.businessName,sector:profile.sector,state:profile.state,projectSize:profile.projectSize,stage:profile.stage},rulesUsed:evidenceRules.map(r=>({rule_id:r.rule_id,approval_name:r.approval_name,reason_applicable:r.reason_applicable,source_reference:r.source_reference,last_updated:r.last_updated,required_documents:r.required_documents,indicative_sla_days:r.indicative_sla_days,confidence:'High — exact structured prototype rule match'})),evidence:ruleEvidence(profile,evidenceRules),disclaimer:'Illustrative regulatory dataset — prototype only. Verify final requirements with the relevant authority. This is not an official government determination.'});
});
app.get('/api/notifications',(req,res)=>res.json(notifications.filter(n=>!req.query.applicantId || n.applicantId===req.query.applicantId)));
app.post('/api/notifications/:id/read',(req,res)=>{const n=notifications.find(x=>x.id===req.params.id);if(!n)return res.status(404).json({error:'Not found'});n.read=true;res.json(n)});
app.get('/api/audit/:applicationId',(req,res)=>res.json(auditLogs.filter(a=>a.applicationId===req.params.applicationId)));

const PORT = process.env.PORT || 3001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`UdyogSetu prototype API running on port ${PORT}`);
});



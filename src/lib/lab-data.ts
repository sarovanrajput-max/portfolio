export interface Topic {
  id: string; name: string; what: string; why: string; example: string; inSN: string;
  code?: string; mistakes: string[]; interview: string[]; related: string[];
}
export interface Level { id: number; title: string; summary: string; topics: Topic[]; }

// To add content: push more topics into a level's `topics` array. The UI picks them up automatically.
export const LEVELS: Level[] = [
  { id: 1, title: "ServiceNow Fundamentals", summary: "What the platform is, instances, PDIs and application scope.", topics: [
    { id: "what-is", name: "What is ServiceNow?",
      what: "ServiceNow is a cloud-based platform companies use to run workflows such as IT support, HR requests and approvals in one place. It is Software as a Service (SaaS): ServiceNow hosts and updates it, and users open it in a browser.",
      why: "Without a platform, requests arrive by email and chat, nothing is tracked and nobody knows who owns a task. ServiceNow gives every request a record, an owner, a status and a history.",
      example: "An employee's laptop stops working. They raise a ticket, it is routed to the hardware support group, a technician fixes it, and the employee gets updates until it is closed.",
      inSN: "That ticket is a record in the Incident (incident) table. Developers extend the platform with tables, forms, scripts and flows without building any infrastructure themselves.",
      mistakes: ["Thinking ServiceNow is only an IT ticketing tool; it also covers HR, customer service and custom apps.", "Confusing the platform (ServiceNow) with a practice it supports (ITSM)."],
      interview: ["What is ServiceNow and what problems does it solve?", "What does SaaS mean?"], related: ["ITSM", "Instances", "Applications"] },
    { id: "instances-pdi", name: "Instances and the PDI",
      what: "An instance is one copy of ServiceNow dedicated to a company, with its own URL and its own data. A Personal Developer Instance (PDI) is a free instance from the ServiceNow Developer Program for learning and building.",
      why: "Companies keep separate instances (typically development, test and production) so changes can be built and tested without risking live data.",
      example: "A developer builds a new approval flow in Dev, testers verify it in Test, and only then does it reach Production.",
      inSN: "Changes move between instances using Update Sets. A PDI is for learning only, never for company data, and inactive PDIs can be reclaimed, so keep yours active.",
      mistakes: ["Building directly in Production.", "Storing real company data in a PDI."],
      interview: ["What is a PDI?", "Why do companies have separate Dev, Test and Prod instances?"], related: ["Update Sets", "Studio"] },
    { id: "global-scoped", name: "Global vs Scoped Applications",
      what: "Global scope is the shared default area where platform code can see most things. A scoped application has its own namespace (for example x_1330921_icu_p1) so its tables and scripts are isolated from other applications.",
      why: "Scoping prevents name clashes, controls what other applications may access, and lets an application be packaged and moved cleanly.",
      example: "A banking app keeps its Account and Card tables in its own scope so other customizations cannot accidentally change them.",
      inSN: "Scoped apps are created in Studio. Scoped scripts can use only scoped-supported APIs, and touching another scope's tables needs cross-scope access to be allowed.",
      mistakes: ["Building everything in Global.", "Assuming every API works in a scoped script."],
      interview: ["Difference between global and scoped applications?", "Why use a scoped application?"], related: ["Application scope", "Studio"] },
  ] },
  { id: 2, title: "ITSM and ITIL", summary: "The service-management ideas ServiceNow is built around.", topics: [
    { id: "itsm-vs-itil", name: "ITSM vs ITIL",
      what: "ITSM (IT Service Management) is the practice of designing, delivering and supporting IT services. ITIL is a framework of best practices that guides how to do ITSM. ServiceNow is a tool that supports ITSM processes.",
      why: "ITIL gives organizations a shared vocabulary and process (incident, problem, change) so IT work is consistent instead of ad hoc.",
      example: "ITIL suggests incidents be logged, prioritised and resolved against agreed targets. ServiceNow implements this with the Incident application and SLAs.",
      inSN: "ServiceNow's ITSM applications (Incident, Problem, Change, Request) follow ITIL-aligned processes, but companies can adapt them.",
      mistakes: ["Saying ITIL is software.", "Saying ITSM and ITIL mean the same thing."],
      interview: ["Difference between ITSM and ITIL?", "How does ServiceNow relate to ITIL?"], related: ["Incident", "Problem", "Change"] },
  ] },
  { id: 3, title: "Platform Architecture", summary: "Tables, records, fields and inheritance.", topics: [] },
  { id: 4, title: "Tables, Forms and Data", summary: "Forms, lists, dot-walking and reference qualifiers.", topics: [] },
  { id: 5, title: "ITSM Applications", summary: "Incident, Problem, Change, Catalog, CMDB and SLAs.", topics: [] },
  { id: 6, title: "Administration", summary: "Users, roles, ACLs, update sets and import sets.", topics: [] },
  { id: 7, title: "Client-Side Development", summary: "Client Scripts, UI Policies, g_form and GlideAjax.", topics: [
    { id: "client-scripts", name: "Client Scripts and g_form",
      what: "A Client Script is JavaScript that runs in the user's browser when a form loads, a field changes, a form is submitted, or a list cell is edited. g_form is the client-side object used to read and change form fields.",
      why: "It lets the form react instantly (show messages, make fields mandatory, hide fields) without a round trip to the server.",
      example: "When an agent sets an incident's priority to 1 - Critical, the form immediately requires an assignment group.",
      inSN: "Types are onLoad, onChange, onSubmit and onCellEdit. For simple show/hide/mandatory rules a UI Policy is usually preferred over a script.",
      code: `function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (isLoading || newValue === '') {
    return; // skip the run that happens while the form loads
  }
  if (newValue == '1') { // 1 - Critical
    g_form.setMandatory('assignment_group', true);
    g_form.addInfoMessage('Critical incident: assign a group now.');
  } else {
    g_form.setMandatory('assignment_group', false);
  }
}`,
      mistakes: ["Using GlideRecord in a client script (use GlideAjax instead).", "Forgetting the isLoading check, so the script also runs when the form loads.", "Treating client-side checks as security; they can be bypassed."],
      interview: ["Client Script vs UI Policy?", "What are the four client script types?"], related: ["UI Policy", "GlideAjax", "g_user"] },
  ] },
  { id: 8, title: "Server-Side Development", summary: "Business Rules, Script Includes and GlideRecord.", topics: [
    { id: "business-rules", name: "Business Rules",
      what: "A Business Rule is server-side JavaScript that runs when a record is displayed, inserted, updated, deleted or queried. Its 'When' setting decides the timing: display (as the form loads), before (before the database save), after (right after the save) and async (queued to run in the background after the save).",
      why: "Server-side logic runs no matter how a record is changed (form, import, API), so rules that must always hold belong here, not in a client script.",
      example: "A bank must never save an incident without a short description, whether it comes from the form, an email or an integration.",
      inSN: "current is the record being saved; previous holds its values before the change (it is not available in async rules). In a before rule, do not call current.update(); the platform saves the record for you.",
      code: `(function executeRule(current, previous /*null when async*/) {
  if (current.short_description.nil()) {
    gs.addErrorMessage('Short description is required.');
    current.setAbortAction(true); // stop the save
  }
})(current, previous);`,
      mistakes: ["Calling current.update() inside the rule, which can cause loops or double saves.", "Using g_form or other client-side objects in a Business Rule.", "Doing slow work in a before rule instead of async."],
      interview: ["Difference between before and after Business Rules?", "When would you use an async rule?", "What are current and previous?"], related: ["Script Include", "GlideRecord", "Flow Designer"] },
    { id: "glide-record", name: "GlideRecord",
      what: "GlideRecord is the server-side class for querying and changing table records with JavaScript instead of SQL.",
      why: "Almost every server script needs to find, create or update records, and GlideRecord is the standard way.",
      example: "Find the ten newest priority 1 incidents so a report script can list who they are assigned to.",
      inSN: "Used in Business Rules, Script Includes, scheduled jobs and background scripts. Do not use it in client scripts; use GlideAjax to call a Script Include instead.",
      code: `var gr = new GlideRecord('incident');
gr.addQuery('active', true);
gr.addQuery('priority', 1);
gr.orderByDesc('sys_created_on');
gr.setLimit(10);
gr.query();                       // run the query
while (gr.next()) {               // move to each record
  gs.info(gr.getValue('number') + ' -> ' + gr.getDisplayValue('assigned_to'));
}`,
      mistakes: ["Forgetting query() before next().", "Running a query inside a loop, which is slow.", "Not limiting a query on a very large table."],
      interview: ["Difference between getValue() and getDisplayValue()?", "How do you insert a record with GlideRecord?"], related: ["GlideAggregate", "Script Include", "Business Rule"] },
  ] },
  { id: 9, title: "Integrations", summary: "REST, SOAP, JSON, authentication and MID Server.", topics: [] },
  { id: 10, title: "Advanced Development", summary: "Flow Designer, catalog development and scoped apps.", topics: [] },
  { id: 11, title: "Projects and Interview Prep", summary: "Real-world projects and interview questions.", topics: [] },
];

Author: Lucky Mallari

---

**Constraints**:
- 2 hours
- Scope of work

**Thoughts**:  
Every project should have a set deadline and clear, concrete requirements. For this task, I time-boxed myself to two hours, simulating real-world development conditions and agreements with stakeholders.

---

### **Fixes**
- Resolved all compile and runtime errors.

### **New Features**

New features were selected based on what could be delivered within the time constraints. The focus was on creating a working MVP, with additional features to be considered in future iterations.

- **Axios**:  
  - Integrated Axios with a default client app name for tracing purposes, useful for back-end/front-end tracing and potential client cost analysis.

- **API**:  
  - Added the `api/advocates` route.

- **Validation**:  
  - Implemented Zod for request validation.

- **UI Components**:  
  - Used ShadCN for various UI components and framework, including:
    - **Data Table**: Features sortable columns, column visibility toggling, and pagination.
    - **Toasts**: Integrated toast notifications.
    - **Loader**: Added loading indicators.
  - **Thoughts**: Opted for a stable framework rather than reinventing the wheel, ensuring reliability and efficiency.

- **Pagination & Filtering**:  
  - Implemented server-side pagination and filtering with PostgreSQL indexes.
    - **Thoughts**: Manually coded pagination, filtering, and sorting to showcase my skills, though I could have used the TanStack framework for a more streamlined solution.

### **Backlog**

These are future improvements aimed at enhancing the project's security, reusability, and performance. While a timeline or roadmap could be developed, it falls outside the scope of this project.

- **Authentication**:  
  - Implement JWT/OAuth or Firebase authentication.

- **AI Integration**:  
  - Develop features for advocate summaries and RAG search across all fields.
  - Consider using @xenova/transformers for AI models, like bart-large-cnn, either server-side or client-side via onnxruntime in Node.js. A Python backend or dedicated microservice could also be used.
  - Implementing RAG Search would require infrastructure capable of performing vector searches.

- **Tooling Enhancements**:  
  - Implement path aliases.
  - Use decorators throughout the codebase, such as next-api-decorators.

- **Validation**:  
  - Move validation logic to middleware, ensuring requests are validated based on body types rather than within controllers.

- **Theming**:  
  - Implement night mode/dark mode options.

- **Accessibility/Usability**:  
  - Focus on high contrast modes, tablet/device readers, internationalization, and tooltips.

- **Performance Optimization**:  
  - Implement throttling/debouncing of API calls using React Query.
  - Introduce caching solutions like Redis or AWS ElasticCache.
  - Perform front-end and back-end memory and resource profiling.

- **Monitoring**:  
  - Track customer behavior data, including clicks and page views, using AppDynamics or Google Analytics 4 combined with Google Tag Manager.

- **Code Cleanup/Tech Debt**:  
  - Remove redundant code and optimize the existing codebase.

- **CI/CD Pipeline**:  
  - Automate build deployment processes.

- **Testing**:  
  - Set up end-to-end testing via a CI/CD pipeline using Selenium.
  - Enhance back-end testing, code coverage, and address code smells with tools like CodeQL.

- **Logging & Telemetry**:  
  - Implement logging and telemetry solutions using AWS, Bugsnag, or OpenTelemetry.

---


Initial Communication with Stakeholder:
```Hey Lucky,
 
1. At the top of the instructions, it says "Do not fork the repo," but at the bottom it says, "Send an email with a link to the forked repo with the PRs of your changes" on the Deliverables Section

You are right, "forked repo" was a poor choice of words. I will update it to "cloned repo"

2. Instruction says “Require as little of your time as possible. By limiting this to 2 hours,” but then it also states "improve existing code, and add features to a new code base.”
Duration usually isn’t set by clients per-se, but an agreement set by stakeholders and the engineers (and leads) implementing it.


2 hours is given as a recommendation for how much time you should spend on this. The goal is to take up as little of your time as possible while still getting a sense of your skills. As noted, anything extra you would want to add should be noted in DISCUSSION.md. However, you are free to spend as much time as you'd like on it in order to demonstrate your skills. I ask that if you do spend extra time on it that you indicate how much.

3. "Feel free to be creative if you see any other improvements you think are worth spending time on!"
In a typical project, it is best to set forth tangible and measurable objectives. Anything vague and not concrete opens up to scope creep, missed deadlines, etc.


The assessment has clear objectives noted under the Tasks section. The extra bit is intended to allow you to show off your skills and implement something that you think would improve the code. Following a set of clear objectives is important, however we're looking for someone who can come into any codebase and make improvements that may not be explicitly defined by stakeholders.  


Your proposal sounds good. The goal is for you to address the assessment however you see fit in order to fix the glaring bugs and make the improvements you think are worthwhile.
```
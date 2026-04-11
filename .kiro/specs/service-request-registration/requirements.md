# Requirements Document

## Introduction

The Service Request Registration System replaces the existing Node.js-backed repair registration flow with a Supabase-powered solution. It provides a dedicated registration page where clients can submit device service requests, receive a unique reference number, view a digital receipt, and later track their request status. The system is built on the existing React + Vite + Tailwind CSS stack and integrates with Supabase for database persistence and file storage.

## Glossary

- **System**: The Service Request Registration System as a whole
- **Registration_Form**: The form on the /register-request page used to submit a service request
- **Supabase_Client**: The configured @supabase/supabase-js client used for all database and storage operations
- **Reference_Number**: A unique identifier in the format SIS-YYYY-XXXXX assigned to each service request
- **Receipt_Page**: The /receipt/:reference_number page displayed after successful submission
- **Tracking_Page**: The /track page (Phase 2 scaffold) where clients can look up request status
- **Storage_Bucket**: The Supabase Storage bucket named "device-images" used for uploaded photos
- **service_requests**: The Supabase database table storing all service request records
- **Status**: The current state of a service request — one of: Pending, Ongoing, Ready, Delivered

---

## Requirements

### Requirement 1: Supabase Client Configuration

**User Story:** As a developer, I want a centralised Supabase client configuration, so that all parts of the application can connect to Supabase using environment variables without hardcoding credentials.

#### Acceptance Criteria

1. THE Supabase_Client SHALL be initialised using the environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
2. THE Supabase_Client SHALL be exported from `src/lib/supabase.js` as a singleton.
3. IF either environment variable is missing at runtime, THEN THE Supabase_Client SHALL throw a descriptive configuration error.
4. THE System SHALL NOT reference the old Node.js backend (`/api/repair-registration`) anywhere in the frontend codebase after migration.

---

### Requirement 2: Supabase Database Table

**User Story:** As a system administrator, I want a well-structured database table for service requests, so that all submission data is stored reliably and consistently.

#### Acceptance Criteria

1. THE service_requests table SHALL contain the columns: `id` (uuid, primary key, auto-generated), `reference_number` (text, unique), `full_name` (text, not null), `email` (text, not null), `phone` (text, not null), `device_type` (text), `device_brand` (text), `device_model` (text), `issue_description` (text, not null), `image_url` (text), `status` (text, default: 'Pending'), `created_at` (timestamp, default: now()).
2. THE service_requests table SHALL enforce a unique constraint on `reference_number`.
3. THE service_requests table SHALL enforce not-null constraints on `full_name`, `email`, `phone`, and `issue_description`.

---

### Requirement 3: Supabase Storage for Device Images

**User Story:** As a client, I want to upload a photo of my device, so that the technician can see the issue before the appointment.

#### Acceptance Criteria

1. THE Storage_Bucket named "device-images" SHALL accept image uploads in jpg, jpeg, png, and webp formats.
2. THE Storage_Bucket SHALL reject any file exceeding 5MB in size.
3. WHEN an image is successfully uploaded, THE Supabase_Client SHALL return a public URL that is saved to the `image_url` column of the corresponding service request record.
4. IF an uploaded file exceeds 5MB, THEN THE Registration_Form SHALL display a descriptive error message and prevent form submission.
5. IF an uploaded file is not one of the accepted formats, THEN THE Registration_Form SHALL display a descriptive error message and prevent form submission.

---

### Requirement 4: Reference Number Generation

**User Story:** As a client, I want a unique reference number for my service request, so that I can track and identify my submission.

#### Acceptance Criteria

1. THE System SHALL generate Reference_Numbers in the format `SIS-YYYY-XXXXX` where YYYY is the current four-digit year and XXXXX is a zero-padded 5-digit random number (e.g. SIS-2025-04821).
2. BEFORE saving a new service request, THE System SHALL verify that the generated Reference_Number does not already exist in the service_requests table.
3. IF a Reference_Number collision is detected, THEN THE System SHALL regenerate a new Reference_Number and retry the uniqueness check.
4. THE System SHALL save the confirmed unique Reference_Number to the `reference_number` column alongside all other request data in a single insert operation.

---

### Requirement 5: Service Request Registration Form

**User Story:** As a client, I want a dedicated registration page with a clear form, so that I can submit my device service request with all relevant details.

#### Acceptance Criteria

1. THE Registration_Form SHALL be accessible at the route `/register-request`.
2. THE Registration_Form SHALL include the following fields: Full Name (text, required), Email Address (email, required), Phone / WhatsApp Number (text, required), Device Type (dropdown: Phone | Laptop | Tablet | Smart Home Device | Other), Device Brand (text, optional), Device Model (text, optional), Issue Description (textarea, required), Upload Device Photo (file input, optional).
3. WHEN a required field is left empty on submit, THE Registration_Form SHALL display a validation error message beneath the relevant field.
4. WHEN a user selects an image file, THE Registration_Form SHALL display a preview of the selected image before submission.
5. WHEN the submit button is clicked and the form is valid, THE Registration_Form SHALL display a loading spinner on the submit button while the request is being processed.
6. WHEN a service request is successfully submitted, THE System SHALL redirect the user to `/receipt/:reference_number`.
7. IF the Supabase insert operation fails, THEN THE Registration_Form SHALL display a friendly error message without redirecting the user.
8. THE Registration_Form page SHALL include a back button or logo that navigates the user to the homepage (`/`).

---

### Requirement 6: Form Styling and Visual Design

**User Story:** As a client, I want the registration page to match the site's premium dark theme, so that the experience feels consistent and professional.

#### Acceptance Criteria

1. THE Registration_Form page SHALL use a dark navy (`#0A0F1E`) background consistent with the site theme.
2. THE Registration_Form SHALL be presented inside a dark card container centred on the page.
3. THE Registration_Form input fields SHALL use light/white backgrounds with rounded corners.
4. WHEN an input field receives focus, THE Registration_Form SHALL apply a glowing teal/blue focus ring to that field.
5. WHEN a validation error is present on a field, THE Registration_Form SHALL display a red underline and error message beneath that field.

---

### Requirement 7: Digital Receipt Page

**User Story:** As a client, I want to see a confirmation receipt after submitting my request, so that I have a record of my submission details and reference number.

#### Acceptance Criteria

1. THE Receipt_Page SHALL be accessible at the route `/receipt/:reference_number`.
2. WHEN the Receipt_Page loads, THE System SHALL query the service_requests table by the `reference_number` URL parameter and display the matching record.
3. THE Receipt_Page SHALL display: the ServiceIS logo and tagline, the title "Service Request Confirmation", the Reference_Number in large bold text, the date and time of submission, client details (Full Name, Email, Phone), device details (Type, Brand, Model), Issue Description, the uploaded device photo thumbnail (if an image_url exists), and a Status badge showing the current status.
4. THE Receipt_Page SHALL display a footer note advising the client to keep their reference number safe, and the ServiceIS contact details: `ictweare.support@ictweare.com` and `09133706582`.
5. THE Receipt_Page SHALL provide a "Download Receipt" button that triggers `window.print()` to produce a printable PDF.
6. THE Receipt_Page SHALL provide a "Return to Home" button that navigates to the homepage (`/`).
7. WHEN the page is printed, THE Receipt_Page SHALL apply print styles that use a clean white background and hide the action buttons.
8. IF the `reference_number` URL parameter does not match any record in the service_requests table, THEN THE Receipt_Page SHALL display a friendly not-found message.

---

### Requirement 8: Request Tracking Page (Phase 2 Scaffold)

**User Story:** As a client, I want to track the status of my service request by entering my reference number, so that I know the current progress of my repair.

#### Acceptance Criteria

1. THE Tracking_Page SHALL be accessible at the route `/track`.
2. THE Tracking_Page SHALL provide a text input labelled "Enter your Reference Number" and a "Track My Request" button.
3. WHEN the "Track My Request" button is clicked with a valid reference number, THE Tracking_Page SHALL query the service_requests table by `reference_number` and display the matching Status.
4. THE Tracking_Page SHALL display the Status using a visual progress stepper with the steps: Pending → Ongoing → Ready → Delivered, with the current step highlighted.
5. IF the entered reference number does not match any record, THEN THE Tracking_Page SHALL display a friendly error message.
6. THE Tracking_Page SHALL include a code comment `// PHASE 2: Enable when tracking is live` at the top of the component.
7. THE Tracking_Page SHALL NOT be linked in the navbar.

---

### Requirement 9: Navigation Updates

**User Story:** As a client, I want the "Book Initial Digital Review" button to take me directly to the registration form, so that I can start a service request without extra steps.

#### Acceptance Criteria

1. THE HeroSection "Book Initial Digital Review" button SHALL link to `/register-request`.
2. THE ContactSection "Enquire Now" button SHALL remain as a general enquiry form using FormSubmit and SHALL NOT be changed to point to the registration flow.
3. THE Navbar "Contact" link SHALL continue to point to `#contact` on the homepage.

---

### Requirement 10: Application Routing

**User Story:** As a developer, I want all new pages registered in the router, so that users can navigate to them via URL.

#### Acceptance Criteria

1. THE System SHALL register the route `/register-request` mapped to the `RegisterRequest` page component in `src/App.jsx`.
2. THE System SHALL register the route `/receipt/:reference_number` mapped to the `Receipt` page component in `src/App.jsx`.
3. THE System SHALL register the route `/track` mapped to the `TrackRequest` page component in `src/App.jsx`.
4. THE System SHALL retain the existing `/` route mapped to `HomePage` in `src/App.jsx`.
5. THE System SHALL retain the existing `/register-repair` route in `src/App.jsx` so that the old flow remains accessible on disk without being actively promoted.

---

### Requirement 11: Error Handling

**User Story:** As a client, I want clear and consistent error messages when something goes wrong, so that I understand what happened and what to do next.

#### Acceptance Criteria

1. IF the Supabase insert for a new service request fails, THEN THE Registration_Form SHALL display a user-friendly error message styled consistently with the site theme.
2. IF the image upload to Storage_Bucket fails, THEN THE Registration_Form SHALL display a user-friendly error message and allow the user to retry.
3. IF the file selected for upload exceeds 5MB, THEN THE Registration_Form SHALL display an error message immediately upon file selection without waiting for form submission.
4. THE System SHALL display all error messages using consistent styling: red text beneath the relevant field or in a prominent error banner, matching the dark navy site theme.

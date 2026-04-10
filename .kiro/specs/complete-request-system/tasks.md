# Implementation Plan: Complete Request System (Service + Buy)

## Overview

Implement two new request flows (service repair and buy enquiry) on the ServiceIS website, backed by Supabase, with a shared receipt page and homepage entry point. All code is JavaScript/JSX using React, Vite, Tailwind CSS, react-hook-form, and yup.

## Tasks

- [x] 1. Install dependency and set up Supabase client
  - [x] 1.1 Install @supabase/supabase-js
    - Run `npm install @supabase/supabase-js` in the project root
    - Verify it appears in `package.json` dependencies
    - _Requirements: Supabase integration_
  - [x] 1.2 Create `src/lib/supabase.js` singleton client
    - Import `createClient` from `@supabase/supabase-js`
    - Export a single instance using `import.meta.env.VITE_SUPABASE_URL` and `import.meta.env.VITE_SUPABASE_ANON_KEY`
    - _Requirements: Supabase integration_
  - [x] 1.3 Create `.env.example` with placeholder env vars
    - Add `VITE_SUPABASE_URL=` and `VITE_SUPABASE_ANON_KEY=` as placeholders
    - _Requirements: Supabase integration_

- [x] 2. Implement reference number generator
  - [x] 2.1 Create `src/utils/generateReference.js`
    - Accept a `type` param (`'SRV'` or `'BUY'`)
    - Return a string matching `SIS-{TYPE}-{YYYY}-{XXXXX}` where `YYYY` is the current year and `XXXXX` is a zero-padded random 5-digit integer (00001–99999)
    - _Requirements: Reference format specification (service and buy)_
  - [ ]* 2.2 Write property test for reference format invariant
    - **Property 1: Reference format invariant**
    - Use `fast-check` with `fc.constantFrom('SRV', 'BUY')` to assert every generated reference matches `^SIS-(SRV|BUY)-\d{4}-\d{5}$`
    - **Validates: Reference format specification**
  - [ ]* 2.3 Write property test for reference uniqueness
    - **Property 2: Reference uniqueness**
    - Generate 1000 references of each type and assert `new Set(refs).size === 1000`
    - **Validates: Reference uniqueness**

- [x] 3. Create GetStarted homepage section
  - [x] 3.1 Create `src/components/GetStarted.jsx`
    - Render a section with `id="get-started"` using the dark-navy background (`#0A0F1E`)
    - Two cards: teal-accented "Register a Service Request" linking to `/register-service`, gold-accented "Buy a Product" linking to `/buy-request`
    - Each card has an icon, heading, short description, and a styled CTA button
    - _Requirements: Homepage entry point, two request type CTAs_
  - [x] 3.2 Update `src/pages/HomePage.jsx`
    - Import and render `<GetStarted />` immediately after `<HeroSection />`
    - _Requirements: Homepage entry point_
  - [x] 3.3 Update `src/components/HeroSection.jsx`
    - Change the primary CTA `href` to `#get-started`
    - _Requirements: Homepage CTA navigation_
  - [x] 3.4 Update `src/components/ContactSection.jsx`
    - Change the "Enquire Now" button to scroll to `#get-started` (use `href="#get-started"` or a smooth-scroll handler)
    - _Requirements: Homepage CTA navigation_

- [x] 4. Implement RegisterRequest page (service request form)
  - [x] 4.1 Create `src/pages/RegisterRequest.jsx` — step structure and layout
    - Scaffold a 3-step form using a stepper UI (reuse or adapt existing `Stepper.jsx`)
    - Step 1: Device/service info (device type, manufacturer, fault description, optional image upload)
    - Step 2: Contact details (full name, email, phone, address)
    - Step 3: Review & submit summary
    - Apply dark-navy design with teal accents
    - _Requirements: Service request form fields_
  - [x] 4.2 Add react-hook-form + yup validation to RegisterRequest
    - Create a yup schema validating all required fields; reject whitespace-only strings for required fields
    - Wire schema to react-hook-form `useForm` with `yupResolver`
    - Show inline field-level errors
    - _Requirements: Form validation (service request)_
  - [ ]* 4.3 Write property test for service schema rejecting whitespace-only inputs
    - **Property 3: Form schemas reject whitespace-only required fields**
    - Use `fast-check` with `fc.stringOf(fc.constantFrom(' ', '\t', '\n'))` to assert the service yup schema returns invalid for whitespace-only required fields
    - **Validates: Form validation (service request)**
  - [x] 4.4 Implement image upload to Supabase Storage (`device-images` bucket)
    - On file input change, upload the file to the `device-images` bucket and store the returned public URL in form state
    - Handle upload errors with an inline error message
    - _Requirements: Image upload (service request)_
  - [x] 4.5 Implement submit handler for RegisterRequest
    - On valid submit: call `generateReference('SRV')`, insert a row into `service_requests` via `supabase.from('service_requests').insert(...)`, then `navigate('/receipt', { state: { type: 'service', reference, data } })`
    - On Supabase error: show inline error banner and allow retry; on duplicate reference, regenerate once and retry
    - _Requirements: Data persistence (service request), receipt navigation_
  - [ ]* 4.6 Write property test for Supabase insert round-trip (service)
    - **Property 4: Supabase insert round-trip**
    - Mock Supabase client; for any valid form data assert the insert payload contains the same reference and field values that were generated/entered
    - **Validates: Data persistence (service request)**

- [x] 5. Implement BuyRequest page (buy enquiry form)
  - [x] 5.1 Create `src/pages/BuyRequest.jsx` — form layout
    - Single-page form with fields: category (dropdown), brand (dynamic dropdown filtered by category), product interest (text), budget range (select), full name, email, phone, notes (optional textarea)
    - Apply dark-navy design with gold accents
    - _Requirements: Buy request form fields_
  - [x] 5.2 Add react-hook-form + yup validation to BuyRequest
    - Create a yup schema validating all required fields; reject whitespace-only strings for required fields
    - Wire schema to react-hook-form; show inline field-level errors
    - _Requirements: Form validation (buy request)_
  - [ ]* 5.3 Write property test for buy schema rejecting whitespace-only inputs
    - **Property 3: Form schemas reject whitespace-only required fields (buy)**
    - Use `fast-check` with `fc.stringOf(fc.constantFrom(' ', '\t', '\n'))` to assert the buy yup schema returns invalid for whitespace-only required fields
    - **Validates: Form validation (buy request)**
  - [x] 5.4 Implement dynamic brand dropdown by category
    - Define a `BRANDS_BY_CATEGORY` map; when the category field changes, reset the brand field and repopulate the brand dropdown options
    - _Requirements: Buy request form fields_
  - [x] 5.5 Implement submit handler for BuyRequest
    - On valid submit: call `generateReference('BUY')`, insert a row into `buy_requests` via `supabase.from('buy_requests').insert(...)`, then `navigate('/receipt', { state: { type: 'buy', reference, data } })`
    - On Supabase error: show inline error banner and allow retry
    - _Requirements: Data persistence (buy request), receipt navigation_
  - [ ]* 5.6 Write property test for Supabase insert round-trip (buy)
    - **Property 4: Supabase insert round-trip (buy)**
    - Mock Supabase client; for any valid buy form data assert the insert payload contains the same reference and field values
    - **Validates: Data persistence (buy request)**

- [x] 6. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Implement Receipt page
  - [x] 7.1 Create `src/pages/Receipt.jsx`
    - Read `useLocation().state`; if state is null or missing, redirect to `/` immediately
    - Display: request type label (teal for service, gold for buy), reference number, full name, and a summary of submitted fields
    - _Requirements: Receipt display_
  - [x] 7.2 Add WhatsApp deep link to Receipt
    - Build a `wa.me` URL that includes the reference number (URL-encoded) in the message query param
    - Render a "Send via WhatsApp" button that opens the URL in a new tab
    - _Requirements: WhatsApp notification_
  - [ ]* 7.3 Write property test for WhatsApp URL containing reference
    - **Property 6: WhatsApp URL contains reference**
    - Use `fast-check` with `fc.string({ minLength: 1 })` to assert the built `wa.me` URL always contains `encodeURIComponent(ref)` in the message param
    - **Validates: WhatsApp notification**
  - [x] 7.4 Add print/PDF action to Receipt
    - Render a "Download / Print" button that calls `window.print()`
    - Add a `@media print` CSS block (in `index.css` or a scoped style) that hides nav, buttons, and non-receipt content
    - _Requirements: PDF download_
  - [ ]* 7.5 Write property test for Receipt reflecting route state
    - **Property 5: Receipt reflects route state**
    - Use `fast-check` with a valid route state arbitrary to assert the rendered Receipt always displays the reference and full name from state
    - **Validates: Receipt display**

- [x] 8. Scaffold TrackRequest page (Phase 2 stub)
  - [x] 8.1 Create `src/pages/TrackRequest.jsx`
    - Render a minimal placeholder component with a comment: `// Phase 2 — track request by reference number`
    - _Requirements: Phase 2 scaffold_

- [x] 9. Wire routes in App.jsx
  - [x] 9.1 Update `src/App.jsx` to add new routes
    - Import `RegisterRequest`, `BuyRequest`, `Receipt`, `TrackRequest`
    - Add routes: `/register-service`, `/buy-request`, `/receipt`, `/track-request`
    - Keep existing `/register-repair` route untouched
    - _Requirements: Routing_

- [x] 10. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests use `fast-check` (install with `npm install --save-dev fast-check` if not present)
- The existing `/register-repair` route and `RepairRegistration.jsx` are left in place — do not remove them

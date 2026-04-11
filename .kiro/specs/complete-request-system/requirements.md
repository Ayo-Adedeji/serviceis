# Requirements Document

## Introduction

The Complete Request System adds two customer-facing request flows to the ServiceIS website: a **Service Request** (device repair/support) and a **Buy Request** (device sourcing). Both flows are backed by Supabase (database + storage), replacing the existing Node.js backend. The system includes a shared receipt page, WhatsApp notifications, a homepage entry-point section, and a scaffolded tracking page. Navigation CTAs are updated to route users into the new flows.

---

## Glossary

- **System**: The ServiceIS React/Vite frontend application
- **Supabase_Client**: The `@supabase/supabase-js` client initialised in `src/lib/supabase.js`
- **Service_Request_Form**: The form at `/register-request` for device repair/support submissions
- **Buy_Request_Form**: The form at `/buy-request` for device sourcing submissions
- **Receipt_Page**: The page at `/receipt/:reference_number` that displays submission confirmation
- **Reference_Number**: A unique identifier in the format `SIS-SRV-YYYY-XXXXX` (service) or `SIS-BUY-YYYY-XXXXX` (buy), where XXXXX is 5 random digits
- **GetStarted_Section**: The homepage section with id `get-started` that presents the two request entry cards
- **Track_Page**: The scaffolded page at `/track` for future request status lookup
- **WhatsApp_Notification**: A `wa.me` deep-link opened in a new tab after successful submission
- **device-images**: The Supabase Storage bucket used to store uploaded device photos

---

## Requirements

### Requirement 1: Supabase Backend Setup

**User Story:** As a developer, I want a centralised Supabase client and database schema, so that all request data is persisted reliably without a Node.js backend.

#### Acceptance Criteria

1. THE System SHALL install `@supabase/supabase-js` as a project dependency.
2. THE Supabase_Client SHALL be initialised using the environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` and exported from `src/lib/supabase.js`.
3. THE System SHALL remove all runtime calls to the existing Node.js backend from the frontend codebase.
4. THE System SHALL define a `service_requests` table in Supabase with columns: `id` (uuid, primary key, auto-generated), `reference_number` (text, unique), `full_name` (text, not null), `email` (text, not null), `phone` (text, not null), `device_type` (text), `device_brand` (text), `device_model` (text), `issue_description` (text, not null), `image_url` (text), `status` (text, default `'Pending'`), `created_at` (timestamp, default `now()`).
5. THE System SHALL define a `buy_requests` table in Supabase with columns: `id` (uuid, primary key, auto-generated), `reference_number` (text, unique), `full_name` (text, not null), `email` (text, not null), `phone` (text, not null), `device_category` (text), `device_brand` (text), `device_model` (text), `color_preference` (text), `storage_ram_specs` (text), `condition_preference` (text), `budget_range` (text), `additional_notes` (text), `status` (text, default `'Pending'`), `created_at` (timestamp, default `now()`).
6. THE System SHALL configure a Supabase Storage bucket named `device-images` that accepts files up to 5 MB in `jpg`, `jpeg`, `png`, and `webp` formats.

---

### Requirement 2: Reference Number Generation

**User Story:** As a developer, I want a deterministic reference number generator, so that every submission receives a unique, human-readable identifier.

#### Acceptance Criteria

1. THE System SHALL expose a `generateReference(type)` function from `src/lib/generateReference.js` that accepts `'SRV'` or `'BUY'` as the type argument.
2. WHEN `generateReference('SRV')` is called, THE System SHALL return a string matching the pattern `SIS-SRV-YYYY-XXXXX`, where `YYYY` is the current four-digit year and `XXXXX` is a zero-padded 5-digit random integer.
3. WHEN `generateReference('BUY')` is called, THE System SHALL return a string matching the pattern `SIS-BUY-YYYY-XXXXX`, where `YYYY` is the current four-digit year and `XXXXX` is a zero-padded 5-digit random integer.
4. THE System SHALL generate the random component using `Math.random()` padded to exactly 5 digits (00000–99999).

---

### Requirement 3: Homepage GetStarted Section

**User Story:** As a visitor, I want a clear entry-point section on the homepage, so that I can quickly choose between registering a repair or requesting a device purchase.

#### Acceptance Criteria

1. THE System SHALL render a `GetStarted_Section` component immediately below the hero section in
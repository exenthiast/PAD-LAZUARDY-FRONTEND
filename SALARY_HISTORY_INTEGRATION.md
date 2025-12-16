# Salary History Integration - Testing Guide

## Backend Changes

### 1. Database Migration

✅ Created `tutor_salaries` table with fields:

- `id` (primary key)
- `tutor_user_id` (foreign key to users)
- `admin_user_id` (foreign key to users, nullable)
- `amount` (integer)
- `invoice_file_url` (string)
- `paid_at` (date)
- `notes` (text, nullable)
- `created_at`, `updated_at`

### 2. Model

✅ Created `TutorSalary` model with:

- Fillable fields
- Date casting for `paid_at`
- Relationships: `tutor()`, `admin()`

### 3. Controller Methods (AdminDashboardController)

#### Get Salary History

```php
GET /api/admin/tutor/{userId}/salary-history
```

Response:

```json
{
  "data": [
    {
      "id": 1,
      "date": "14 Desember 2025",
      "link": "https://...",
      "amount": 1500000,
      "notes": "Pembayaran gaji bulan Desember 2025",
      "paid_at": "2025-12-14"
    }
  ]
}
```

#### Submit Salary Invoice

```php
POST /api/admin/salary-invoice
```

Request (multipart/form-data):

- `tutor_id`: integer (required)
- `amount`: integer (required, min: 0)
- `paid_at`: date (required, format: YYYY-MM-DD)
- `file`: file (required, mimes: pdf,jpg,jpeg,png, max: 5MB)
- `notes`: string (optional)

Response:

```json
{
  "message": "Invoice berhasil disimpan",
  "data": {
    "id": 1,
    "amount": 1500000,
    "paid_at": "2025-12-14"
  }
}
```

### 4. Routes

✅ Added in `routes/api.php` (Admin middleware):

```php
Route::get('/admin/tutor/{userId}/salary-history', [AdminDashboardController::class, 'getTutorSalaryHistory']);
Route::post('/admin/salary-invoice', [AdminDashboardController::class, 'submitSalaryInvoice']);
```

## Frontend Changes

### 1. Service Methods (adminDashboardService.js)

#### Get Salary History

```javascript
import { getTutorSalaryHistory } from "@/services/adminDashboardService";

const history = await getTutorSalaryHistory(tutorId);
// Returns: Array of { id, date, link, amount, notes }
```

#### Submit Invoice

```javascript
import { submitSalaryInvoice } from "@/services/adminDashboardService";

await submitSalaryInvoice({
  tutor_id: 123,
  amount: 1500000,
  paid_at: "2025-12-14",
  file: fileObject,
  notes: "Optional notes",
});
```

### 2. Component Updates (DetailKelolaTutor.vue)

**Changes:**

- ✅ Removed dummy data from `loadSalaryHistory()`
- ✅ Now calls `getTutorSalaryHistory()` API
- ✅ Updated `submitInvoice()` to use `submitSalaryInvoice()` API
- ✅ Added amount validation (removes non-numeric characters)
- ✅ Auto-generates payment date and notes
- ✅ Reloads history after successful submission

## Testing Guide

### Prerequisites

1. Login as admin user
2. Have at least one tutor in the system
3. Backend server running on `http://localhost:8000`

### Test Steps

#### 1. View Salary History

1. Go to "Kelola Tutor" page (`/admin/kelola-tutor`)
2. Click on a tutor card
3. On detail page, click "Riwayat Penerimaan Gaji" button
4. Modal should show:
   - List of previous salary payments
   - Dates in Indonesian format (e.g., "14 Desember 2025")
   - Links to invoice files
   - Empty state if no history exists

#### 2. Submit New Invoice

1. On tutor detail page, click "Masukkan Invoice Gaji" button
2. Enter salary amount (e.g., "Rp. 1.500.000" or "1500000")
3. Upload invoice file (PDF or image, max 5MB)
4. Click "Simpan Invoice"
5. Should show success message
6. Verify:
   - Invoice appears in salary history
   - File is stored in `storage/app/public/invoices/`
   - Database record created in `tutor_salaries` table

### Sample Test Data

Run seeder to create test data:

```bash
cd c:\laragon\www\PAD_Lazuardy_BE
php artisan db:seed --class=TutorSalarySeeder
```

This creates 3 salary records for the first tutor:

- December 2025: Rp 1.500.000
- November 2025: Rp 1.200.000
- October 2025: Rp 1.000.000

## Error Handling

### Backend Validation Errors

- Missing required fields → 422 with error messages
- Invalid file type → 422 "The file must be a file of type: pdf, jpg, jpeg, png"
- File too large → 422 "The file may not be greater than 5120 kilobytes"
- Invalid tutor_id → 422 "The selected tutor id is invalid"

### Frontend Handling

- Empty amount/file → Alert "Harap lengkapi semua field"
- Invalid amount → Alert "Nominal gaji harus valid"
- API error → Alert with backend error message or "Gagal menyimpan invoice"

## File Storage

Uploaded invoices are stored at:

```
storage/app/public/invoices/invoice_{tutor_id}_{timestamp}.{extension}
```

Make sure storage is linked:

```bash
php artisan storage:link
```

Accessible via URL:

```
http://localhost:8000/storage/invoices/invoice_123_1702543210.pdf
```

## Database Schema

```sql
CREATE TABLE `tutor_salaries` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tutor_user_id` bigint unsigned NOT NULL,
  `admin_user_id` bigint unsigned DEFAULT NULL,
  `amount` int NOT NULL,
  `invoice_file_url` varchar(255) NOT NULL,
  `paid_at` date NOT NULL,
  `notes` text,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `tutor_salaries_tutor_user_id_foreign` (`tutor_user_id`),
  KEY `tutor_salaries_admin_user_id_foreign` (`admin_user_id`),
  CONSTRAINT `tutor_salaries_admin_user_id_foreign`
    FOREIGN KEY (`admin_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `tutor_salaries_tutor_user_id_foreign`
    FOREIGN KEY (`tutor_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
);
```

## Future Enhancements

Potential improvements:

1. Add date range filter for salary history
2. Export salary history to Excel/PDF
3. Add salary calculation based on completed meetings
4. Email notification to tutor when salary is processed
5. Add approval workflow for salary payments
6. Bulk salary processing for multiple tutors
7. Salary report analytics dashboard

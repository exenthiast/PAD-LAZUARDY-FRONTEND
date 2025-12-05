# Integrasi Pembayaran Paket - CheckoutPage & DetailDataSiswa

## 📋 Overview

Integrasi lengkap antara frontend (Vue.js) dan backend (Laravel) untuk sistem pembayaran paket belajar.

## 🔄 Alur Pembayaran

### 1️⃣ **Student Flow (CheckoutPage.vue)**

```
Student → Pilih Paket → CheckoutPage
  ↓
Pilih Bank + Upload Bukti Transfer
  ↓
POST /api/package/order (Create Order)
  ↓
POST /api/package/payment (Upload Proof)
  ↓
Redirect ke Dashboard
```

### 2️⃣ **Admin Flow (DetailDataSiswa.vue)**

```
Admin → Dashboard → Lihat Pending Payments
  ↓
Klik Detail Payment
  ↓
GET /api/admin/payment/{id} (Fetch Data)
  ↓
Lihat Bukti Transfer + Data Siswa
  ↓
PATCH /api/admin/payment/verify (Verifikasi)
  ↓
Status berubah → Email dikirim
```

---

## 🎯 File yang Dimodifikasi

### **Frontend**

#### 1. `src/services/paymentService.js` ✅ BARU

**Fungsi:**

- `createOrder(packageId, totalAmount, paymentMethod)` - Buat order baru
- `uploadPaymentProof(orderId, file)` - Upload bukti transfer
- `getPaymentHistory()` - Ambil riwayat pembayaran
- `getPaymentDetail(paymentId)` - Detail pembayaran

**Catatan:** Menggunakan FormData untuk upload file.

---

#### 2. `src/services/adminDashboardService.js` ✅ UPDATED

**Fungsi Ditambahkan:**

```javascript
export const getPaymentDetail = async (paymentId) => {
  // GET /api/admin/payment/{id}
  // Return: payment data + student data
};
```

**Fungsi Existing:**

- `getPendingPayments()` - Daftar pembayaran pending
- `verifyPayment(paymentId)` - Verifikasi pembayaran
- `rejectPayment(paymentId)` - Tolak pembayaran

---

#### 3. `src/views/payment/CheckoutPage.vue` ✅ UPDATED

**State Baru:**

```javascript
const uploadedFile = ref(null); // File bukti transfer
const isSubmitting = ref(false); // Loading state
const orderId = ref(null); // Order ID setelah dibuat
```

**Fungsi Utama:**

```javascript
handleUpload(event) {
  // Validasi file (max 5MB, format JPG/PNG/PDF)
  // Store file ke uploadedFile
}

handleSubmit() async {
  // 1. Validasi input
  // 2. Create Order → get order_id
  // 3. Upload Payment Proof dengan order_id
  // 4. Redirect ke dashboard
}
```

**UI Changes:**

- Button disabled jika belum pilih bank/file
- Loading state saat submit
- File validation (size & type)

---

#### 4. `src/views/admin/DetailDataSiswa.vue` ✅ UPDATED

**State Baru:**

```javascript
const isLoading = ref(true); // Loading state
```

**Fungsi:**

```javascript
onMounted() async {
  // GET payment detail by ID dari query params
  // Update payment.value & student.value
}

confirmVerify() async {
  // PATCH /api/admin/payment/verify
  // Update status → redirect ke dashboard
}
```

**UI Changes:**

- Loading spinner saat fetch data
- Display bukti transfer (link + image preview jika JPG/PNG)
- Data real dari backend (no dummy)

---

### **Backend**

#### 1. `app/Http/Controllers/PaymentController.php` ✅ UPDATED

**Method:** `storeOrderPackage()`

```php
// BEFORE: Tidak return order_id
return response()->json([
    'status' => "success",
    'message' => 'Berhasil membuat order',
], 200);

// AFTER: Return order_id
return response()->json([
    'status' => "success",
    'message' => 'Berhasil membuat order',
    'order_id' => $order->id,  // ✅ ADDED
], 200);
```

---

#### 2. `app/Http/Controllers/AdminDashboardController.php` ✅ UPDATED

**Method Baru:** `getPaymentDetail($id)`

```php
public function getPaymentDetail(Request $request, $id)
{
    // Fetch payment with relations:
    // - order.user.student
    // - order.package

    return response()->json([
        'payment' => [...],
        'student' => [...],
    ]);
}
```

**Return Structure:**

```json
{
  "payment": {
    "id": 1,
    "package_name": "Paket Bronze",
    "amount": 1000000,
    "status": "Menunggu Verifikasi",
    "payment_method": "transfer",
    "proof_url": "http://localhost:8000/storage/uploads/proof.jpg",
    "created_at": "2025-12-05T..."
  },
  "student": {
    "nama_lengkap": "John Doe",
    "email": "john@example.com",
    "jenis_kelamin": "Laki-laki",
    "tanggal_lahir": "2000-01-01"
    // ... other student fields
  }
}
```

---

#### 3. `routes/api.php` ✅ UPDATED

**Route Ditambahkan:**

```php
Route::middleware('role:admin')->group(function () {
    // ... existing routes
    Route::get('/admin/payment/{id}', [AdminDashboardController::class, 'getPaymentDetail']);
});
```

---

## 🧪 Testing Guide

### **Test Student Flow**

1. **Login sebagai Student**
2. **Buka halaman Packages** → `/packages`
3. **Pilih paket** → Klik "Beli Paket"
4. **CheckoutPage:**
   - Pastikan data paket muncul (nama, harga, fitur)
   - Pilih bank
   - Upload file (test dengan JPG, PNG, PDF)
   - Klik "Kirim Bukti Pembayaran"
5. **Expected Result:**
   - Alert sukses
   - Redirect ke `/student/dashboard`
   - Console log: "Order created successfully with ID: X"

### **Test Admin Flow**

1. **Login sebagai Admin**
2. **Dashboard Admin** → Lihat "Pending Payments"
3. **Klik detail payment**
4. **DetailDataSiswa:**
   - Data payment muncul (paket, status, amount)
   - Bukti transfer muncul (link + preview image)
   - Data siswa lengkap (nama, email, alamat, dll)
5. **Klik "Verifikasi"**
6. **Expected Result:**
   - Modal konfirmasi muncul
   - Setelah confirm → Toast "Pembayaran berhasil diverifikasi!"
   - Redirect ke dashboard

### **Backend Testing (PowerShell)**

```powershell
# 1. Create Order
$token = "YOUR_TOKEN_HERE"
$headers = @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}
$body = @{
    package_id = 1
    total_amount = 1000000
    payment_method = "transfer"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:8000/api/package/order" `
    -Method POST -Headers $headers -Body $body

# 2. Upload Payment Proof
$form = @{
    order_id = 1
    file_upload = Get-Item "C:\path\to\proof.jpg"
}
Invoke-WebRequest -Uri "http://localhost:8000/api/package/payment" `
    -Method POST -Headers @{"Authorization"="Bearer $token"} -Form $form

# 3. Get Payment Detail (Admin)
Invoke-WebRequest -Uri "http://localhost:8000/api/admin/payment/1" `
    -Headers $headers

# 4. Verify Payment (Admin)
$verifyBody = @{ payment_id = 1 } | ConvertTo-Json
Invoke-WebRequest -Uri "http://localhost:8000/api/admin/payment/verify" `
    -Method PATCH -Headers $headers -Body $verifyBody
```

---

## ⚠️ Known Issues & Solutions

### Issue 1: File Upload Returns 422

**Cause:** Backend expects `file_upload` field, bukan `payment_file`
**Solution:** ✅ Fixed - paymentService.js uses `file_upload`

### Issue 2: Order ID Not Returned

**Cause:** Backend tidak return `order_id` setelah create order
**Solution:** ✅ Fixed - PaymentController now returns `order_id`

### Issue 3: Admin Can't See Payment Detail

**Cause:** Endpoint `/api/admin/payment/{id}` tidak ada
**Solution:** ✅ Fixed - Added `getPaymentDetail()` method

### Issue 4: CORS Error

**Cause:** FormData + credentials: "include" + Bearer token
**Solution:** ✅ Already handled - http.js correctly handles FormData

---

## 📝 Environment Variables

**Frontend (.env):**

```env
VITE_API_BASE_URL=http://localhost:8000
```

**Backend (.env):**

```env
APP_URL=http://localhost:8000
FILESYSTEM_DISK=public
```

---

## 🚀 Deployment Checklist

- [ ] Run migration untuk `orders` dan `payments` table
- [ ] Setup storage symlink: `php artisan storage:link`
- [ ] Test file upload permissions di `storage/app/public/uploads`
- [ ] Verify email configuration untuk notifikasi
- [ ] Test dengan dummy payment di production

---

## 📚 API Endpoints Summary

| Method | Endpoint                                | Auth    | Description              |
| ------ | --------------------------------------- | ------- | ------------------------ |
| POST   | `/api/package/order`                    | Student | Buat order baru          |
| POST   | `/api/package/payment`                  | Student | Upload bukti transfer    |
| GET    | `/api/admin/dashboard/pending-payments` | Admin   | List pending payments    |
| GET    | `/api/admin/payment/{id}`               | Admin   | Detail payment + student |
| PATCH  | `/api/admin/payment/verify`             | Admin   | Verifikasi pembayaran    |
| PATCH  | `/api/admin/payment/reject`             | Admin   | Tolak pembayaran         |

---

## ✅ Status

- ✅ PaymentService created
- ✅ CheckoutPage integrated
- ✅ DetailDataSiswa integrated
- ✅ Backend endpoints updated
- ✅ File upload working
- ✅ Admin verification working

**Last Updated:** December 5, 2025

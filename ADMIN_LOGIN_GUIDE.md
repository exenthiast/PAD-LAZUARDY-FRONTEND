# Panduan Login Admin

## Kredensial Admin

Gunakan kredensial berikut untuk login sebagai admin:

```
Email: admin@example.com
Password: (tanyakan ke tim backend atau cek seeder)
```

## Cara Login

1. Buka aplikasi di browser (http://localhost:5173)
2. Klik tombol "Masuk" atau navigasi ke halaman login
3. Masukkan email dan password admin
4. Setelah berhasil login, Anda akan diarahkan ke dashboard admin di `/admin/dashboard`

## Troubleshooting

### Dashboard Menampilkan Data 0

Jika dashboard admin menampilkan semua statistik sebagai 0 padahal ada data di database:

1. **Cek Browser Console** (F12 → Console tab)

   - Lihat apakah ada error API
   - Lihat log "API Success" untuk melihat response dari backend
   - Cek apakah role user adalah "admin"

2. **Verifikasi Token dan Role**

   - Buka Console dan ketik:
     ```javascript
     console.log(localStorage.getItem("auth_token"));
     console.log(localStorage.getItem("auth_user"));
     ```
   - Pastikan token ada dan user memiliki role "admin"

3. **Cek Backend Server**

   - Pastikan Laravel development server berjalan di `http://127.0.0.1:8000`
   - Jalankan: `php artisan serve`

4. **Test API Langsung**

   - Gunakan browser atau Postman untuk test endpoint:
     ```
     GET http://127.0.0.1:8000/api/admin/dashboard/statistics
     Header: Authorization: Bearer YOUR_TOKEN_HERE
     ```

5. **Cek Database**
   - Pastikan ada data user dengan role 'student' dan 'tutor':
     ```bash
     cd c:\laragon\www\PAD_Lazuardy_BE
     php artisan tinker
     ```
     ```php
     User::where('role', 'student')->count()
     User::where('role', 'tutor')->count()
     ```

### Error 403 (Forbidden)

Jika mendapat error 403, kemungkinan:

- User bukan admin
- Token expired atau invalid
- Middleware role tidak mengizinkan akses

**Solusi**: Logout dan login kembali sebagai admin

### Error 401 (Unauthorized)

Jika mendapat error 401:

- Token tidak ada atau invalid
- Belum login

**Solusi**: Login kembali

## Membuat User Admin Baru (Jika Diperlukan)

Jika tidak ada user admin, buat melalui tinker:

```bash
cd c:\laragon\www\PAD_Lazuardy_BE
php artisan tinker
```

```php
use App\Models\User;
use App\Enums\RoleEnum;
use Illuminate\Support\Facades\Hash;

$admin = User::create([
    'name' => 'Administrator',
    'email' => 'admin@example.com',
    'password' => Hash::make('password123'),
    'role' => RoleEnum::ADMIN,
    'telephone_number' => '08123456789',
]);

echo "Admin created with email: {$admin->email}\n";
echo "Password: password123\n";
```

## Struktur Response API

### GET /api/admin/dashboard/statistics

```json
{
  "totalStudents": 2,
  "totalTutors": 1,
  "monthlyTransactions": 0,
  "averageRating": 0
}
```

### GET /api/admin/dashboard/pending-tutors

```json
{
  "data": [
    {
      "id": 6,
      "name": "gondrong dikit",
      "subject": "Matematika",
      "status": "Menunggu",
      "created_at": "2024-12-04T10:00:00.000000Z"
    }
  ],
  "total": 1
}
```

### GET /api/admin/dashboard/pending-payments

```json
{
  "data": [
    {
      "id": 1,
      "studentName": "Alfiz Desta",
      "package": "Paket Premium",
      "amount": 500000,
      "status": "Menunggu",
      "created_at": "2024-12-04T10:00:00.000000Z"
    }
  ],
  "total": 1
}
```

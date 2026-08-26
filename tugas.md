# Laporan Tugas Week 12 - Keamanan Web
**Nama:** Miranti
**Topik:** Eksplorasi Kerentanan & Implementasi Form Aman

---

## Bagian 1: Eksplorasi (Bukti Kerentanan)

### 1. SQL Injection
![alt text](<bukti-sqli.png>)
* **Penjelasan:** Payload `' OR '1'='1` berhasil menembus pencarian karena input pengguna langsung disambungkan (concatenate) secara manual ke dalam *raw string query* SQL tanpa menggunakan *parameterized query*. Hal ini memanipulasi logika `WHERE` menjadi selalu `TRUE` sehingga seluruh data produk terekspos.

### 2. XSS Reflected
![alt text](<bukti-xss-reflected.png>)
* **Penjelasan:** Payload `<script>alert(...)</script>` tereksekusi oleh browser karena data input dari URL/parameter langsung dirender kembali ke halaman web tanpa melalui proses *escape* atau *encoding* entitas HTML terlebih dahulu.

### 3. XSS Stored
![alt text](<bukti-xss-stored.png>)
* **Penjelasan:** Script berbahaya yang disisipkan ke dalam nama produk (dari *seeder*) berhasil tersimpan di database dan otomatis tereksekusi pada browser korban setiap kali halaman tersebut diakses, karena saat render menggunakan sintaks raw EJS `<%- %>`.

### 4. Escape HTML
![alt text](<bukti-escape.png>)
* **Penjelasan:** Input berupa tag `<img src=x onerror=alert(1)>` berhasil mengubah struktur DOM karena aplikasi gagal mengubah karakter khusus HTML (`<` dan `>`) menjadi entitas yang aman. Halaman merender tag tersebut apa adanya, memicu *error* gambar dan mengeksekusi *alert*.

---

## Bagian 2: Implementasi Mandiri (Form Komentar Aman)

### 1. Validasi Server-Side
![alt text](<bukti-validasi.png>)
* **Keterangan:** Gambar di atas menunjukkan validasi di sisi server (Node.js/Controller) yang secara aktif menolak data saat pengguna mencoba mengirimkan *form* kosong, dengan menampilkan pesan error yang jelas, bukan sekadar mengandalkan atribut `required` di sisi klien (HTML).

### 2. Sanitasi Input
Berikut adalah kode yang digunakan untuk membersihkan *input* pengguna sebelum diproses lebih lanjut:
```javascript
// Sanitasi: Menghapus spasi berlebih (trim) di awal dan akhir input untuk mencegah data kosong yang terselubung
const nama = req.body.nama ? req.body.nama.trim() : '';
const komentar = req.body.komentar ? req.body.komentar.trim() : '';
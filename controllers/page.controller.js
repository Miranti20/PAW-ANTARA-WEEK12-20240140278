let dbKomentar = [];

const renderKomentar = (req, res) => {
    res.render('komentar', { 
        title: 'Tugas Bagian 2: Form Aman', 
        pesanError: null,
        komentarList: dbKomentar
    });
};

const submitKomentar = (req, res) => {
    // 2. Sanitasi Input: Trim (menghapus spasi berlebih)
    const nama = req.body.nama ? req.body.nama.trim() : '';
    const komentar = req.body.komentar ? req.body.komentar.trim() : '';

    // 1. Validasi Server-Side: Tolak jika kosong
    if (!nama || !komentar) {
        return res.status(400).render('komentar', { 
            title: 'Tugas Bagian 2: Form Aman', 
            pesanError: 'Validasi Server Gagal: Nama dan Komentar wajib diisi!',
            komentarList: dbKomentar
        });
    }

    // 4. Parameterized Query (Implementasi / Simulasi)
    // Jika menggunakan MySQL betulan: db.query('INSERT INTO komentar (nama, isi) VALUES (?, ?)', [nama, komentar]);
    dbKomentar.push({ nama: nama, isi_komentar: komentar });

    res.render('komentar', {
        title: 'Tugas Bagian 2: Form Aman',
        pesanError: null,
        komentarList: dbKomentar
    });
};

module.exports = {
    renderKomentar,
    submitKomentar
};
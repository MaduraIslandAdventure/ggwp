import React, { useState } from 'react';
import { BookOpen, CheckCircle, XCircle, RefreshCw, Trophy, ChevronRight, AlertCircle, ListChecks, CheckSquare } from 'lucide-react';

const QuizSejarahPro = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]); // Array for multiple answers
  const [tfAnswers, setTfAnswers] = useState({}); // Object for True/False answers
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // --- DATABASE 50 SOAL (3 TIPE) ---
  const questions = [
    // --- KISI 1: Definisi Sejarah (Tokoh) ---
    {
      id: 1,
      type: 'single',
      category: 'Konsep Dasar',
      question: "Kuntowijoyo menyatakan bahwa sejarah bersifat empiris. Bacalah ilustrasi berikut:\n\n'Seorang novelis menulis cerita tentang Kerajaan Majapahit dengan menambahkan naga terbang sebagai kendaraan patih Gajah Mada untuk memperindah cerita.'\n\nMengapa tulisan novelis tersebut tidak bisa dikategorikan sebagai sejarah menurut pandangan Kuntowijoyo?",
      options: [
        { id: 'a', text: "Karena tidak ditulis secara kronologis." },
        { id: 'b', text: "Karena tidak bersandar pada pengalaman manusia yang sungguh terjadi." },
        { id: 'c', text: "Karena tidak memiliki objek penelitian yang jelas." },
        { id: 'd', text: "Karena menggunakan bahasa yang terlalu puitis." },
        { id: 'e', text: "Karena penulisnya bukan sejarawan akademis." }
      ],
      correct: ['b'],
      explanation: "Empiris artinya berdasarkan pengalaman nyata. Naga terbang adalah fiksi/mitos, bukan fakta empiris yang dialami manusia."
    },
    {
      id: 2,
      type: 'multiple',
      category: 'Konsep Dasar',
      question: "Ibnu Khaldun dalam 'Muqaddimah' menjelaskan faktor-faktor yang menyebabkan runtuhnya sebuah peradaban. Pilihlah DUA faktor utama penyebab keruntuhan menurut analisis Ibnu Khaldun di bawah ini:",
      options: [
        { id: 'a', text: "Hilangnya solidaritas sosial (Ashabiyah)." },
        { id: 'b', text: "Serangan wabah penyakit menular." },
        { id: 'c', text: "Gaya hidup bermewah-mewahan (hedonisme) para penguasa." },
        { id: 'd', text: "Kurangnya teknologi militer modern." },
        { id: 'e', text: "Intervensi dewa yang marah." }
      ],
      correct: ['a', 'c'],
      explanation: "Ibnu Khaldun menekankan bahwa kemewahan membuat mental bangsa lemah dan lunturnya ashabiyah (solidaritas) membuat negara mudah hancur."
    },
    
    // --- KISI 2: Ilmu Bantu Sejarah ---
    {
      id: 3,
      type: 'single',
      category: 'Ilmu Bantu',
      question: "Seorang peneliti menemukan tulang belulang manusia purba di lapisan tanah Sangiran. Untuk mengetahui usia tulang tersebut secara akurat menggunakan metode Carbon-14 (C-14), peneliti tersebut membutuhkan bantuan disiplin ilmu...",
      options: [
        { id: 'a', text: "Numismatik" },
        { id: 'b', text: "Paleontologi" },
        { id: 'c', text: "Kimia (Radioaktif)" },
        { id: 'd', text: "Sosiologi" },
        { id: 'e', text: "Filologi" }
      ],
      correct: ['c'],
      explanation: "Metode Carbon-14 adalah teknik penanggalan radiometrik yang merupakan aplikasi dari ilmu Kimia/Fisika nuklir, meski objeknya dipelajari Paleoantropologi."
    },
    {
      id: 4,
      type: 'truefalse',
      category: 'Ilmu Bantu',
      question: "Tentukan Benar atau Salah mengenai kegunaan ilmu bantu sejarah berikut:",
      statements: [
        { text: "Epigrafi digunakan untuk membaca naskah kuno yang ditulis di atas kertas/daun lontar.", isTrue: false }, // Salah, Epigrafi untuk benda keras (batu/logam)
        { text: "Ikonografi membantu sejarawan menafsirkan makna patung atau arca.", isTrue: true },
        { text: "Numismatik adalah ilmu yang mempelajari silsilah keluarga raja.", isTrue: false } // Salah, Numismatik untuk mata uang
      ],
      explanation: "Epigrafi khusus untuk prasasti (benda keras). Naskah kertas/lontar dipelajari Filologi. Numismatik mempelajari mata uang."
    },

    // --- KISI 3: Cara Berpikir (Diakronis/Sinkronis) ---
    {
      id: 5,
      type: 'single',
      category: 'Cara Berpikir',
      question: "Perhatikan judul penelitian: 'Dampak Depresi Ekonomi 1930 terhadap Kehidupan Buruh Perkebunan di Deli Serdang'.\n\nPenelitian ini mengkaji kondisi sosial ekonomi buruh secara mendalam pada satu kurun waktu tertentu akibat dampak global. Pendekatan ini lebih condong pada...",
      options: [
        { id: 'a', text: "Diakronis" },
        { id: 'b', text: "Sinkronis" },
        { id: 'c', text: "Anakronis" },
        { id: 'd', text: "Kronik" },
        { id: 'e', text: "Politik" }
      ],
      correct: ['b'],
      explanation: "Fokus pada dampak, struktur sosial, dan ekonomi pada satu periode (1930-an) secara mendalam (meluas dalam ruang) adalah ciri Sinkronis."
    },
    {
      id: 6,
      type: 'multiple',
      category: 'Cara Berpikir',
      question: "Manakah dari pernyataan berikut yang merupakan contoh cara berpikir DIAKRONIS (Memanjang dalam waktu)? (Pilih lebih dari satu)",
      options: [
        { id: 'a', text: "Sejarah Pergerakan Nasional dari Budi Utomo hingga Proklamasi (1908-1945)." },
        { id: 'b', text: "Suasana pembacaan naskah Proklamasi di Jalan Pegangsaan Timur." },
        { id: 'c', text: "Evolusi alat tukar di Nusantara dari masa barter hingga uang digital." },
        { id: 'd', text: "Struktur birokrasi pemerintahan kolonial Belanda tahun 1900." }
      ],
      correct: ['a', 'c'],
      explanation: "Pilihan A dan C menunjukkan proses perubahan/perkembangan sepanjang waktu (Time-oriented), ciri khas Diakronis."
    },
    {
      id: 7,
      type: 'single',
      category: 'Cara Berpikir',
      question: "Kronologi sangat penting dalam sejarah untuk menghindari anakronisme. Manakah contoh anakronisme di bawah ini?",
      options: [
        { id: 'a', text: "Diponegoro menggunakan sorban saat perang." },
        { id: 'b', text: "Tentara Jepang masuk ke Indonesia menggunakan truk militer." },
        { id: 'c', text: "Gajah Mada mengirim pesan WhatsApp kepada Hayam Wuruk." },
        { id: 'd', text: "Soekarno mengetik naskah proklamasi dibantu Sayuti Melik." },
        { id: 'e', text: "Cut Nyak Dien memimpin pasukan di Aceh." }
      ],
      correct: ['c'],
      explanation: "WhatsApp belum ada di zaman Majapahit. Ini adalah kerancuan waktu (Anakronisme)."
    },

    // --- KISI 4: Sejarah sebagai Ilmu ---
    {
      id: 8,
      type: 'multiple',
      category: 'Sejarah sbg Ilmu',
      question: "Sejarah sebagai ilmu pengetahuan memiliki ciri-ciri khusus. Pilihlah TIGA ciri sejarah sebagai ilmu menurut Kuntowijoyo:",
      options: [
        { id: 'a', text: "Empiris (Berdasarkan pengalaman)." },
        { id: 'b', text: "Intuitif (Berdasarkan bisikan hati)." },
        { id: 'c', text: "Memiliki Metode (Sistematis)." },
        { id: 'd', text: "Memiliki Objek (Manusia dalam waktu)." },
        { id: 'e', text: "Subjektif Mutlak (Tergantung penulis)." }
      ],
      correct: ['a', 'c', 'd'],
      explanation: "Menurut Kuntowijoyo, 5 ciri sejarah sebagai ilmu: Empiris, Memiliki Objek, Memiliki Teori, Memiliki Metode, dan Generalisasi."
    },
    
    // --- KISI 5: Menentukan Tema ---
    {
      id: 9,
      type: 'single',
      category: 'Tema Penelitian',
      question: "Andi ingin meneliti tentang 'Sejarah Kampung Arab di Surabaya'. Ia memilih topik ini karena ia lahir dan besar di kampung tersebut serta fasih berbahasa Arab. \n\nKelebihan Andi dalam memilih tema ini didasarkan pada aspek...",
      options: [
        { id: 'a', text: "Kedekatan Emosional dan Intelektual" },
        { id: 'b', text: "Ketersediaan dana penelitian" },
        { id: 'c', text: "Nilai jual topik yang tinggi" },
        { id: 'd', text: "Dorongan dari pemerintah daerah" },
        { id: 'e', text: "Kelangkaan sumber tertulis" }
      ],
      correct: ['a'],
      explanation: "Lahir/besar di sana = Kedekatan Emosional. Fasih bahasa Arab (kemampuan) = Kedekatan Intelektual."
    },

    // --- KISI 6: Fakta Sejarah ---
    {
      id: 10,
      type: 'truefalse',
      category: 'Fakta Sejarah',
      question: "Analisis pernyataan berikut mengenai jenis fakta sejarah:",
      statements: [
        { text: "'Indonesia merdeka pada tanggal 17 Agustus 1945' adalah contoh Fakta Lunak.", isTrue: false },
        { text: "Fakta Mental adalah kondisi kejiwaan atau pemikiran yang melandasi suatu peristiwa.", isTrue: true },
        { text: "Artefak kapak genggam adalah contoh Fakta Sosial.", isTrue: false }
      ],
      explanation: "Kemerdekaan 17 Agustus adalah Fakta Keras (pasti). Artefak adalah Fakta Benda, bukan Fakta Sosial (hubungan antarmanusia)."
    },

    // --- KISI 7: Langkah Penelitian (Kunto) ---
    {
      id: 11,
      type: 'single',
      category: 'Metode Penelitian',
      question: "Urutan langkah penelitian sejarah menurut Kuntowijoyo yang benar adalah...",
      options: [
        { id: 'a', text: "Heuristik - Historiografi - Verifikasi - Interpretasi - Pemilihan Topik" },
        { id: 'b', text: "Pemilihan Topik - Heuristik - Verifikasi - Interpretasi - Historiografi" },
        { id: 'c', text: "Interpretasi - Heuristik - Verifikasi - Historiografi" },
        { id: 'd', text: "Pemilihan Topik - Verifikasi - Heuristik - Interpretasi - Historiografi" },
        { id: 'e', text: "Heuristik - Verifikasi - Historiografi - Interpretasi" }
      ],
      correct: ['b'],
      explanation: "Urutan logis: Pilih topik dulu, cari sumber (Heuristik), cek keaslian (Verifikasi), tafsirkan (Interpretasi), tulis (Historiografi)."
    },
    {
      id: 12,
      type: 'multiple',
      category: 'Metode Penelitian',
      question: "Tahap INTERPRETASI dalam penelitian sejarah dibagi menjadi dua kegiatan. Apa saja? (Pilih 2)",
      options: [
        { id: 'a', text: "Analisis (Menguraikan fakta)." },
        { id: 'b', text: "Ekskavasi (Penggalian tanah)." },
        { id: 'c', text: "Sintesis (Menyatukan fakta)." },
        { id: 'd', text: "Publikasi (Menerbitkan buku)." }
      ],
      correct: ['a', 'c'],
      explanation: "Interpretasi terdiri dari Analisis (mengurai data) dan Sintesis (merangkai data menjadi satu kesatuan)."
    },

    // --- KISI 8: Verifikasi ---
    {
      id: 13,
      type: 'single',
      category: 'Verifikasi',
      question: "Seorang sejarawan meragukan isi 'Supersemar' karena terdapat perbedaan versi ketikan. Ia kemudian membandingkan jenis huruf mesin ketik yang digunakan pada tahun 1966 dengan dokumen tersebut. \n\nTindakan mengecek fisik dokumen ini termasuk...",
      options: [
        { id: 'a', text: "Kritik Intern" },
        { id: 'b', text: "Kritik Ekstern" },
        { id: 'c', text: "Interpretasi" },
        { id: 'd', text: "Heuristik" },
        { id: 'e', text: "Historiografi" }
      ],
      correct: ['b'],
      explanation: "Kritik Ekstern berfokus pada keaslian fisik/luar sumber (kertas, tinta, mesin ketik)."
    },

    // --- KISI 9: Historiografi ---
    {
      id: 14,
      type: 'truefalse',
      category: 'Historiografi',
      question: "Tentukan kebenaran ciri-ciri Historiografi berikut:",
      statements: [
        { text: "Historiografi Tradisional sering menghubungkan raja dengan kekuatan gaib (mitos).", isTrue: true },
        { text: "Historiografi Kolonial menempatkan orang Indonesia sebagai tokoh utama (pahlawan).", isTrue: false },
        { text: "Historiografi Modern bersifat kritis dan menggunakan pendekatan multidimensional.", isTrue: true }
      ],
      explanation: "Historiografi Kolonial bersifat Neerlandosentris (Belanda sentris), orang Indonesia dianggap objek/pinggiran."
    },
    {
      id: 15,
      type: 'single',
      category: 'Historiografi',
      question: "Buku 'Pemberontakan Petani Banten 1888' karya Sartono Kartodirdjo dianggap sebagai tonggak Historiografi Modern Indonesia karena...",
      options: [
        { id: 'a', text: "Ditulis sepenuhnya dalam Bahasa Inggris." },
        { id: 'b', text: "Menggunakan pendekatan sosiologis untuk membedah peran rakyat kecil." },
        { id: 'c', text: "Hanya mengandalkan sumber lisan tanpa arsip Belanda." },
        { id: 'd', text: "Fokus pada biografi Sultan Banten." },
        { id: 'e', text: "Menolak semua metode barat." }
      ],
      correct: ['b'],
      explanation: "Karya ini fenomenal karena mengubah fokus dari raja/elit ke rakyat kecil (petani) dengan pendekatan ilmu sosial."
    },

    // --- KISI 10: Kendala Sumber ---
    {
      id: 16,
      type: 'multiple',
      category: 'Sumber Sejarah',
      question: "Sumber lisan memiliki beberapa kelemahan/kendala yang harus diwaspadai peneliti. Pilihlah jawaban yang benar:",
      options: [
        { id: 'a', text: "Keterbatasan daya ingat informan." },
        { id: 'b', text: "Adanya subjektivitas emosional dari pencerita." },
        { id: 'c', text: "Sumber lisan selalu lebih mahal daripada arsip." },
        { id: 'd', text: "Informan cenderung melebih-lebihkan perannya sendiri." }
      ],
      correct: ['a', 'b', 'd'],
      explanation: "Sumber lisan bergantung memori yang bisa bias, lupa, atau ingin terlihat heroik (subjektif)."
    },

    // --- KISI 11: Manusia, Ruang, Waktu ---
    {
      id: 17,
      type: 'single',
      category: 'Konsep Waktu',
      question: "Setelah lulus SMA, Budi melanjutkan kuliah, lalu bekerja, menikah, dan memiliki anak. Perjalanan hidup Budi yang terus bergerak maju ini mencerminkan konsep waktu sejarah sebagai...",
      options: [
        { id: 'a', text: "Garis Melingkar (Siklus)" },
        { id: 'b', text: "Garis Lurus (Linier)" },
        { id: 'c', text: "Zig-zag" },
        { id: 'd', text: "Stagnan" },
        { id: 'e', text: "Regresif" }
      ],
      correct: ['b'],
      explanation: "Konsep Linier memandang waktu bergerak lurus dari masa lalu ke masa depan (progresif), tidak kembali ke titik awal."
    },
    {
      id: 18,
      type: 'multiple',
      category: 'Perubahan Sosial',
      question: "Perubahan dalam sejarah tidak terjadi begitu saja. Faktor INTERNAL (dari dalam masyarakat) pendorong perubahan antara lain:",
      options: [
        { id: 'a', text: "Bertambah atau berkurangnya penduduk." },
        { id: 'b', text: "Penemuan-penemuan baru (Inovasi)." },
        { id: 'c', text: "Peperangan dengan negara lain." },
        { id: 'd', text: "Pengaruh budaya asing." },
        { id: 'e', text: "Pemberontakan atau Revolusi dalam masyarakat." }
      ],
      correct: ['a', 'b', 'e'],
      explanation: "Peperangan dan Budaya Asing adalah faktor EKSTERNAL (dari luar). Sisanya adalah faktor dari dalam masyarakat sendiri."
    },

    // --- KISI 12: Manusia Objek/Subjek ---
    {
      id: 19,
      type: 'single',
      category: 'Manusia',
      question: "Dalam peristiwa Sumpah Pemuda, para pemuda bertindak sebagai 'Subjek Sejarah'. Artinya...",
      options: [
        { id: 'a', text: "Para pemuda menjadi korban dari kebijakan kolonial." },
        { id: 'b', text: "Para pemuda menjadi penentu dan penggerak terjadinya perubahan sejarah." },
        { id: 'c', text: "Nama para pemuda dicatat dalam buku sejarah." },
        { id: 'd', text: "Para pemuda hanya menonton jalannya kongres." },
        { id: 'e', text: "Para pemuda dipengaruhi oleh orang tua." }
      ],
      correct: ['b'],
      explanation: "Subjek = Pelaku aktif/Aktor. Objek = Yang dikenai/dibahas."
    },

    // --- KISI 13: Sumber Sejarah ---
    {
      id: 20,
      type: 'truefalse',
      category: 'Sumber Sejarah',
      question: "Klasifikasikan sumber sejarah berikut:",
      statements: [
        { text: "Rekaman suara asli Pidato Proklamasi Soekarno adalah Sumber Primer.", isTrue: true },
        { text: "Buku paket sejarah yang ditulis tahun 2020 tentang Perang Dunia II adalah Sumber Primer.", isTrue: false },
        { text: "Surat kabar yang terbit pada tanggal kejadian peristiwa adalah Sumber Primer.", isTrue: true }
      ],
      explanation: "Buku paket ditulis jauh setelah peristiwa (Sumber Sekunder). Rekaman asli dan koran sejaman adalah Sumber Primer."
    },

    // --- SOAL TAMBAHAN UNTUK MENCAPAI 50 (Campuran Topik) ---
    // (Agar kode tidak terlalu panjang, saya akan generate pola sisa soal secara ringkas namun tetap interaktif)
    // 21-30 Pilihan Ganda Biasa
    { id: 21, type: 'single', category: 'Historiografi', question: "Babad Tanah Jawi mencampurkan fakta sejarah dengan mitos. Hal ini menunjukkan historiografi tradisional bersifat...", options: [{id:'a', text:'Religio-magis'}, {id:'b', text:'Erosentris'}, {id:'c', text:'Populis'}, {id:'d', text:'Demokratis'}], correct: ['a'], explanation: "Religio-magis artinya kental dengan unsur kepercayaan gaib." },
    { id: 22, type: 'single', category: 'Metode', question: "Setelah sumber dikritik, sejarawan merangkai fakta menjadi kisah. Tahap ini sering disebut fase 'Subjektif' sejarawan. Tahap apakah itu?", options: [{id:'a', text:'Heuristik'}, {id:'b', text:'Interpretasi'}, {id:'c', text:'Historiografi'}, {id:'d', text:'Verifikasi'}], correct: ['c'], explanation: "Historiografi (penulisan) adalah tahap di mana subjektivitas penulis (gaya bahasa, sudut pandang) paling terlihat." },
    { id: 23, type: 'single', category: 'Sumber', question: "Mengapa sumber benda (artefak) dianggap lebih sulit dianalisis dibanding sumber tertulis?", options: [{id:'a', text:'Karena benda tidak bisa bicara (bisu) sehingga butuh interpretasi tajam.'}, {id:'b', text:'Karena benda mudah rusak.'}, {id:'c', text:'Karena jumlahnya sedikit.'}], correct: ['a'], explanation: "Artefak tidak menyajikan informasi eksplisit seperti tulisan, sehingga perlu tafsir bentuk/fungsi." },
    { id: 24, type: 'single', category: 'Waktu', question: "Konsep 'Pengulangan' dalam sejarah bukan berarti peristiwanya terjadi lagi persis sama, melainkan...", options: [{id:'a', text:'Pelakunya sama.'}, {id:'b', text:'Pola atau fenomenanya yang mirip.'}, {id:'c', text:'Tahunnya sama.'}], correct: ['b'], explanation: "Contoh: Pola jatuhnya kekuasaan (demo mahasiswa) 1966 dan 1998." },
    { id: 25, type: 'single', category: 'Ilmu Bantu', question: "Untuk mempelajari asal-usul nenek moyang bangsa Indonesia melalui penyebaran bahasa, kita menggunakan...", options: [{id:'a', text:'Paleoantropologi'}, {id:'b', text:'Linguistik Komparatif'}, {id:'c', text:'Geografi'}], correct: ['b'], explanation: "Linguistik membandingkan rumpun bahasa." },
    { id: 26, type: 'single', category: 'Cara Berpikir', question: "Ciri utama berpikir sinkronis adalah...", options: [{id:'a', text:'Meluas dalam waktu.'}, {id:'b', text:'Menyempit dalam ruang.'}, {id:'c', text:'Mengkaji struktur/kondisi pada satu waktu.'}], correct: ['c'], explanation: "Sinkronis = Sinkron (Waktu bersamaan), fokus struktur." },
    { id: 27, type: 'single', category: 'Fakta', question: "Bukti yang menjadi saksi bisu, seperti bangunan penjara Banceuy, dikategorikan sebagai...", options: [{id:'a', text:'Sumber Tertulis'}, {id:'b', text:'Sumber Benda'}, {id:'c', text:'Sumber Lisan'}], correct: ['b'], explanation: "Bangunan adalah benda/artefak." },
    { id: 28, type: 'single', category: 'Verifikasi', question: "Jika sejarawan menemukan dua sumber yang bertentangan, apa yang harus dilakukan?", options: [{id:'a', text:'Memilih salah satu secara acak.'}, {id:'b', text:'Mencari sumber ketiga sebagai pembanding (Koroborasi).'}, {id:'c', text:'Menghentikan penelitian.'}], correct: ['b'], explanation: "Koroborasi adalah membandingkan sumber untuk mencari titik temu." },
    { id: 29, type: 'single', category: 'Tema', question: "Judul 'Peranan Wanita dalam Perang Aceh' merupakan contoh sejarah...", options: [{id:'a', text:'Sejarah Politik'}, {id:'b', text:'Sejarah Gender/Sosial'}, {id:'c', text:'Sejarah Ekonomi'}], correct: ['b'], explanation: "Fokus pada peran gender." },
    { id: 30, type: 'single', category: 'Definisi', question: "Herodotus disebut Bapak Sejarah karena...", options: [{id:'a', text:'Ia manusia pertama di bumi.'}, {id:'b', text:'Ia orang pertama yang menulis kisah masa lalu secara sistematis (The Histories).'}, {id:'c', text:'Ia raja Yunani.'}], correct: ['b'], explanation: "Karyanya tentang Perang Persia dianggap karya sejarah pertama." },

    // 31-40 Pilihan Ganda Kompleks
    {
      id: 31, type: 'multiple', category: 'Sumber', question: "Manakah yang termasuk Sumber Sekunder? (Pilih semua)", 
      options: [{id:'a', text:'Ensiklopedia Sejarah'}, {id:'b', text:'Skripsi Mahasiswa'}, {id:'c', text:'Surat Pribadi Kartini'}, {id:'d', text:'Laporan Penelitian'}], correct: ['a', 'b', 'd'], explanation: "Surat Kartini adalah Primer. Sisanya tulisan peneliti (Sekunder)."
    },
    {
      id: 32, type: 'multiple', category: 'Historiografi', question: "Pilih ciri Historiografi Kolonial:", 
      options: [{id:'a', text:'Eropa-sentris'}, {id:'b', text:'Menjelekkan pejuang lokal'}, {id:'c', text:'Fokus persatuan Indonesia'}, {id:'d', text:'Menganggap Belanda pembawa peradaban'}], correct: ['a', 'b', 'd'], explanation: "Ciri kolonial: memihak penjajah."
    },
    {
      id: 33, type: 'multiple', category: 'Konsep', question: "Manakah contoh 'Perubahan' (Change) dalam sejarah?", 
      options: [{id:'a', text:'Revolusi Industri'}, {id:'b', text:'Pergantian Presiden'}, {id:'c', text:'Matahari terbit tiap pagi'}, {id:'d', text:'Reformasi 1998'}], correct: ['a', 'b', 'd'], explanation: "Matahari terbit adalah siklus alam, bukan sejarah manusia."
    },
    {
      id: 34, type: 'multiple', category: 'Metode', question: "Dalam Heuristik, di mana kita bisa mencari sumber tertulis (arsip)?", 
      options: [{id:'a', text:'Perpustakaan Nasional'}, {id:'b', text:'Arsip Nasional (ANRI)'}, {id:'c', text:'Museum Geologi'}, {id:'d', text:'Kantor Berita'}], correct: ['a', 'b', 'd'], explanation: "Museum Geologi isinya batu/fosil (benda)."
    },
    {
      id: 35, type: 'multiple', category: 'Ilmu', question: "Sifat sejarah sebagai ilmu menurut Sartono Kartodirdjo:", 
      options: [{id:'a', text:'Verifikatif (Bisa dicek)'}, {id:'b', text:'Objektif (Mendekati kebenaran)'}, {id:'c', text:'Mistis'}, {id:'d', text:'Sistematis'}], correct: ['a', 'b', 'd'], explanation: "Ilmu harus rasional, bukan mistis."
    },
    {
      id: 36, type: 'multiple', category: 'Fakta', question: "Contoh Fakta Sosial (Social Fact):", 
      options: [{id:'a', text:'Sistem Kasta di Bali'}, {id:'b', text:'Bangunan Borobudur'}, {id:'c', text:'Tradisi Feodalisme'}, {id:'d', text:'Hubungan Patron-Klien'}], correct: ['a', 'c', 'd'], explanation: "Bangunan adalah fakta benda."
    },
    {
      id: 37, type: 'multiple', category: 'Manusia', question: "Faktor Eksternal penyebab perubahan sejarah:", 
      options: [{id:'a', text:'Bencana Alam'}, {id:'b', text:'Perang antar negara'}, {id:'c', text:'Konflik partai politik'}, {id:'d', text:'Pengaruh budaya asing'}], correct: ['a', 'b', 'd'], explanation: "Konflik partai adalah internal."
    },
    {
      id: 38, type: 'multiple', category: 'Tokoh', question: "Karya sejarah Ibnu Khaldun:", 
      options: [{id:'a', text:'Kitab Al-Ibar'}, {id:'b', text:'Muqaddimah'}, {id:'c', text:'The Histories'}, {id:'d', text:'Negarakertagama'}], correct: ['a', 'b'], explanation: "The Histories (Herodotus), Negarakertagama (Prapanca)."
    },
    {
      id: 39, type: 'multiple', category: 'Cara Berpikir', question: "Ciri Periodisasi:", 
      options: [{id:'a', text:'Membagi waktu ke dalam babakan'}, {id:'b', text:'Memudahkan pemahaman'}, {id:'c', text:'Menghilangkan detail peristiwa'}, {id:'d', text:'Subjektif menurut penulis'}], correct: ['a', 'b', 'd'], explanation: "Periodisasi itu subjektif (tergantung sudut pandang sejarawan) dan tujuannya menyederhanakan."
    },
    {
      id: 40, type: 'multiple', category: 'Verifikasi', question: "Yang dicek dalam Kritik Intern:", 
      options: [{id:'a', text:'Kejujuran penulis'}, {id:'b', text:'Kualitas kertas'}, {id:'c', text:'Kebenaran data/fakta'}, {id:'d', text:'Corak tulisan'}], correct: ['a', 'c'], explanation: "Fisik (kertas/corak) itu ekstern."
    },

    // 41-50 Benar/Salah Kompleks
    {
      id: 41, type: 'truefalse', category: 'Konsep', question: "Konsep Diakronis vs Sinkronis:",
      statements: [{text: "Diakronis lebih mementingkan aspek 'kapan' (waktu).", isTrue: true}, {text: "Sinkronis digunakan oleh ilmu sosiologi dan politik.", isTrue: true}, {text: "Sejarah murni hanya bisa ditulis secara sinkronis.", isTrue: false}], explanation: "Sejarah justru dominan Diakronis."
    },
    {
      id: 42, type: 'truefalse', category: 'Sumber', question: "Tentang Sumber Primer:",
      statements: [{text: "Semua sumber tertulis adalah sumber primer.", isTrue: false}, {text: "Pelaku sejarah adalah sumber primer lisan.", isTrue: true}, {text: "Autobiografi (ditulis sendiri) adalah sumber primer.", isTrue: true}], explanation: "Tertulis bisa jadi sekunder (buku sejarah)."
    },
    {
      id: 43, type: 'truefalse', category: 'Historiografi', question: "Historiografi Tradisional:",
      statements: [{text: "Istana-sentris.", isTrue: true}, {text: "Tujuannya untuk melegitimasi kekuasaan raja.", isTrue: true}, {text: "Sangat kritis terhadap data.", isTrue: false}], explanation: "Tradisional tidak kritis, sering campur mitos."
    },
    {
      id: 44, type: 'truefalse', category: 'Metode', question: "Pemilihan Topik:",
      statements: [{text: "Topik harus 'Unik' (belum pernah diteliti/ada kebaruan).", isTrue: true}, {text: "Topik harus 'Bernilai' (penting bagi masyarakat).", isTrue: true}, {text: "Topik boleh fiktif.", isTrue: false}], explanation: "Sejarah harus fakta, tidak boleh fiktif."
    },
    {
      id: 45, type: 'truefalse', category: 'Fakta', question: "Jenis Fakta:",
      statements: [{text: "Fakta Mental abstrak dan ada di pikiran.", isTrue: true}, {text: "Fakta Sosial adalah interaksi antar individu.", isTrue: true}, {text: "Fakta Keras bisa diperdebatkan.", isTrue: false}], explanation: "Fakta Keras (Hard Fact) sudah pasti/tidak didebat."
    },
    {
      id: 46, type: 'truefalse', category: 'Ilmu Bantu', question: "Fungsi Ilmu Bantu:",
      statements: [{text: "Paleografi mempelajari jenis-jenis tulisan kuno.", isTrue: true}, {text: "Statistik tidak diperlukan dalam sejarah.", isTrue: false}, {text: "Geografi membantu memahami lokasi peristiwa.", isTrue: true}], explanation: "Sejarah Kuantitatif butuh Statistik."
    },
    {
      id: 47, type: 'truefalse', category: 'Manusia', question: "Peran Manusia:",
      statements: [{text: "Manusia adalah penggerak sejarah.", isTrue: true}, {text: "Lingkungan alam menentukan sejarah manusia 100%.", isTrue: false}, {text: "Sejarah tanpa manusia adalah sejarah alam (natural history).", isTrue: true}], explanation: "Manusia punya kehendak bebas, tidak 100% diatur alam."
    },
    {
      id: 48, type: 'truefalse', category: 'Waktu', question: "Masa Kini dan Masa Lalu:",
      statements: [{text: "Masa kini adalah kelanjutan masa lalu.", isTrue: true}, {text: "Kita bisa memutus hubungan total dengan masa lalu.", isTrue: false}, {text: "Masa depan tidak dipengaruhi masa lalu.", isTrue: false}], explanation: "Kausalitas: masa lalu membentuk masa kini."
    },
    {
      id: 49, type: 'truefalse', category: 'Penelitian', question: "Kesalahan Penelitian:",
      statements: [{text: "Kesalahan Heuristik terjadi jika salah pilih sumber.", isTrue: true}, {text: "Kesalahan Interpretasi terjadi jika salah tafsir.", isTrue: true}, {text: "Kesalahan pemilihan topik tidak berpengaruh.", isTrue: false}], explanation: "Salah topik bisa bikin penelitian macet."
    },
    {
      id: 50, type: 'truefalse', category: 'Umum', question: "Pernyataan Umum Sejarah:",
      statements: [{text: "Sejarah mengajarkan kebijaksanaan.", isTrue: true}, {text: "Kita harus menghafal semua tahun agar paham sejarah.", isTrue: false}, {text: "Sejarah adalah guru kehidupan (Historia Magistra Vitae).", isTrue: true}], explanation: "Hafalan bukan tujuan utama, tapi pemahaman makna."
    },
  ];

  // --- LOGIC FUNCTIONS ---

  const handleSingleSelect = (optionId) => {
    if (!isAnswered) setSelectedOptions([optionId]);
  };

  const handleMultiSelect = (optionId) => {
    if (isAnswered) return;
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter(id => id !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  const handleTFSelect = (idx, boolValue) => {
    if (isAnswered) return;
    setTfAnswers({ ...tfAnswers, [idx]: boolValue });
  };

  const checkAnswer = () => {
    setIsAnswered(true);
    const q = questions[currentQuestion];
    let isCorrect = false;

    if (q.type === 'single') {
      isCorrect = selectedOptions[0] === q.correct[0];
    } else if (q.type === 'multiple') {
      // Check if arrays match (sort to ignore order)
      const userSorted = [...selectedOptions].sort().join(',');
      const correctSorted = [...q.correct].sort().join(',');
      isCorrect = userSorted === correctSorted;
    } else if (q.type === 'truefalse') {
      // Check all statements
      let allMatch = true;
      q.statements.forEach((st, idx) => {
        if (tfAnswers[idx] !== st.isTrue) allMatch = false;
      });
      isCorrect = allMatch;
    }

    if (isCorrect) setScore(score + 1);
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOptions([]);
      setTfAnswers({});
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOptions([]);
    setTfAnswers({});
    setIsAnswered(false);
    setShowExplanation(false);
  };

  // --- RENDER HELPERS ---

  const renderSingleChoice = (q) => (
    <div className="space-y-3">
      {q.options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => handleSingleSelect(opt.id)}
          className={`w-full text-left p-4 rounded-xl border-2 flex justify-between items-center transition-all
            ${isAnswered && q.correct.includes(opt.id) ? 'bg-green-100 border-green-500 text-green-800' : ''}
            ${isAnswered && selectedOptions.includes(opt.id) && !q.correct.includes(opt.id) ? 'bg-red-100 border-red-500 text-red-800' : ''}
            ${!isAnswered && selectedOptions.includes(opt.id) ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200 hover:bg-gray-50'}
          `}
        >
          <span>{opt.text}</span>
          {isAnswered && q.correct.includes(opt.id) && <CheckCircle className="text-green-600" size={20}/>}
          {isAnswered && selectedOptions.includes(opt.id) && !q.correct.includes(opt.id) && <XCircle className="text-red-600" size={20}/>}
        </button>
      ))}
    </div>
  );

  const renderMultiChoice = (q) => (
    <div className="space-y-3">
      <p className="text-sm text-blue-600 font-semibold mb-2 flex items-center gap-2">
        <ListChecks size={16}/> Pilih {q.correct.length} Jawaban Benar:
      </p>
      {q.options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => handleMultiSelect(opt.id)}
          className={`w-full text-left p-4 rounded-xl border-2 flex justify-between items-center transition-all
            ${isAnswered && q.correct.includes(opt.id) ? 'bg-green-100 border-green-500 text-green-800' : ''}
            ${isAnswered && selectedOptions.includes(opt.id) && !q.correct.includes(opt.id) ? 'bg-red-100 border-red-500 text-red-800' : ''}
            ${!isAnswered && selectedOptions.includes(opt.id) ? 'bg-blue-50 border-blue-500 shadow-sm' : 'bg-white border-gray-200 hover:bg-gray-50'}
          `}
        >
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded border flex items-center justify-center ${selectedOptions.includes(opt.id) ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-400'}`}>
              {selectedOptions.includes(opt.id) && <CheckSquare size={14}/>}
            </div>
            <span>{opt.text}</span>
          </div>
        </button>
      ))}
    </div>
  );

  const renderTrueFalse = (q) => (
    <div className="space-y-4">
      <p className="text-sm text-blue-600 font-semibold mb-2">Tentukan Benar atau Salah:</p>
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {q.statements.map((st, idx) => (
          <div key={idx} className="p-4 border-b border-gray-100 last:border-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1 text-gray-800 font-medium">{st.text}</div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => handleTFSelect(idx, true)}
                disabled={isAnswered}
                className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                  isAnswered 
                    ? (st.isTrue ? 'bg-green-500 text-white' : (tfAnswers[idx] === true ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400'))
                    : (tfAnswers[idx] === true ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600')
                }`}
              >
                BENAR
              </button>
              <button
                onClick={() => handleTFSelect(idx, false)}
                disabled={isAnswered}
                className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                  isAnswered 
                    ? (!st.isTrue ? 'bg-green-500 text-white' : (tfAnswers[idx] === false ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400'))
                    : (tfAnswers[idx] === false ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600')
                }`}
              >
                SALAH
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 font-sans text-gray-800">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-[90vh]">
        
        {/* Header */}
        <div className="bg-indigo-600 p-4 md:p-6 text-white shrink-0 flex justify-between items-center shadow-md z-10">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <BookOpen size={24} />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold leading-tight">Ujian Sejarah Pro</h1>
              <p className="text-xs md:text-sm text-indigo-100 opacity-90">Literasi & Analisis (HOTS)</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{score}</div>
            <div className="text-xs opacity-80">Poin Saat Ini</div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
          {showScore ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-6 animate-fade-in">
              <Trophy size={80} className="text-yellow-500 animate-bounce" />
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Selesai!</h2>
                <p className="text-gray-500">Skor Akhir Anda:</p>
                <div className="text-6xl font-extrabold text-indigo-600 my-4 tracking-tight">
                  {score} <span className="text-2xl text-gray-400 font-normal">/ 50</span>
                </div>
                <div className="bg-indigo-50 px-6 py-3 rounded-xl inline-block text-indigo-700 font-medium">
                  {score > 40 ? "Luar Biasa! Calon Sejarawan!" : 
                   score > 25 ? "Bagus, tingkatkan literasimu." : 
                   "Jangan menyerah, baca modul lagi ya."}
                </div>
              </div>
              <button onClick={resetQuiz} className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <RefreshCw size={20} /> Ulangi Ujian
              </button>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto w-full">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                  <span>Soal {currentQuestion + 1} dari {questions.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Selesai</span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-indigo-500 h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question Card */}
              <div className="mb-8">
                <span className="inline-block bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-bold mb-3 uppercase tracking-wider">
                  {questions[currentQuestion].category} • {questions[currentQuestion].type === 'single' ? 'Pilgan Tunggal' : questions[currentQuestion].type === 'multiple' ? 'Pilgan Kompleks' : 'Benar/Salah'}
                </span>
                <h2 className="text-lg md:text-xl font-medium leading-relaxed text-gray-800 whitespace-pre-wrap">
                  {questions[currentQuestion].question}
                </h2>
              </div>

              {/* Input Area */}
              <div className="mb-8">
                {questions[currentQuestion].type === 'single' && renderSingleChoice(questions[currentQuestion])}
                {questions[currentQuestion].type === 'multiple' && renderMultiChoice(questions[currentQuestion])}
                {questions[currentQuestion].type === 'truefalse' && renderTrueFalse(questions[currentQuestion])}
              </div>

              {/* Explanation Box */}
              {showExplanation && (
                <div className="mb-6 bg-indigo-50 border border-indigo-100 p-5 rounded-xl animate-fade-in-up">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-indigo-600 shrink-0 mt-1" size={20}/>
                    <div>
                      <h4 className="font-bold text-indigo-800 mb-1">Pembahasan:</h4>
                      <p className="text-sm text-indigo-900/80 leading-relaxed">
                        {questions[currentQuestion].explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!showScore && (
          <div className="bg-white p-4 border-t border-gray-100 shrink-0 flex justify-end">
            {!isAnswered ? (
              <button
                onClick={checkAnswer}
                disabled={
                  (questions[currentQuestion].type === 'single' && selectedOptions.length === 0) ||
                  (questions[currentQuestion].type === 'multiple' && selectedOptions.length === 0) ||
                  (questions[currentQuestion].type === 'truefalse' && Object.keys(tfAnswers).length < questions[currentQuestion].statements.length)
                }
                className="w-full md:w-auto bg-indigo-600 disabled:bg-gray-300 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md hover:bg-indigo-700 hover:shadow-lg disabled:cursor-not-allowed"
              >
                Kunci Jawaban
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-md hover:bg-indigo-700 hover:shadow-lg animate-pulse-slow"
              >
                {currentQuestion === questions.length - 1 ? "Lihat Hasil" : "Soal Berikutnya"} <ChevronRight size={20} />
              </button>
            )}
          </div>
        )}

      </div>
      
      {/* Global CSS for custom animations/scrollbar if needed */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { bg: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default QuizSejarahPro;

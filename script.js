/* ================================================================
   SafetyCheck-IT — script.js
   Logika Interaktif Aplikasi Audit K3LH Digital
   Dibuat untuk: Tugas Kokurikuler SMK Jurusan RPL
   ================================================================ */

'use strict';

/* ================================================================
   IKON SVG BERSIH — Menggantikan semua emoji emoticon
   ================================================================ */
const SVG_ICONS = {
  plug: `<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H7a2 2 0 0 0-2 2v3a6 6 0 0 0 12 0V7a2 2 0 0 0-2-2z"/></svg>`,
  bolt: `<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  broom: `<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 21 18-18M11.5 12.5l3.5 3.5M8 9l7 7M5 6l13 13"/></svg>`,
  monitor: `<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  alert: `<svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  
  // Status & toast
  success: `<svg class="icon-svg text-green" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  warning: `<svg class="icon-svg text-orange" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  error: `<svg class="icon-svg text-red" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  info: `<svg class="icon-svg text-blue" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,

  // Status Titik Sederhana (pengganti emoji warna)
  dotRendah: `<span class="dot-status dot-rendah"></span>`,
  dotSedang: `<span class="dot-status dot-sedang"></span>`,
  dotTinggi: `<span class="dot-status dot-tinggi"></span>`,
  dotKritis: `<span class="dot-status dot-kritis"></span>`,
  dotDefault: `<span class="dot-status dot-default"></span>`,

  statusSelesai: `<span class="dot-status dot-selesai"></span>`,
  statusProses: `<span class="dot-status dot-proses"></span>`,
  statusBaru: `<span class="dot-status dot-baru"></span>`,
  statusDefault: `<span class="dot-status dot-default"></span>`
};

/* ================================================================
   STATE GLOBAL — Semua data disimpan di sini (Nama kelompok: Khensa, Syamil, Honest, Yoel)
   ================================================================ */
const APP = {
  currentPage: 'dashboard',

  // Data statistik dashboard
  stats: {
    totalLaporan: 7,
    kabelBermasalah: 12,
    auditHariIni: 3,
    itemChecked: 0,
    totalCheckItems: 0,
  },

  // Data riwayat audit dengan nama anggota kelompok
  riwayat: [
    { id:'RPT-001', tanggal:'2026-05-25', pelapor:'Khensa',       lokasi:'Ruang Server',       jenis:'Kabel Menggantung',     risiko:'kritis',  status:'selesai',  deskripsi:'Kabel power menggantung di langit-langit ruang server.' },
    { id:'RPT-002', tanggal:'2026-05-26', pelapor:'Syamil',       lokasi:'Workstation A',       jenis:'Kabel Melintang',       risiko:'tinggi',  status:'proses',   deskripsi:'Kabel LAN melintang di jalur lalu lintas utama.' },
    { id:'RPT-003', tanggal:'2026-05-26', pelapor:'Honest',       lokasi:'Area Animasi',        jenis:'Stop Kontak Rusak',     risiko:'tinggi',  status:'proses',   deskripsi:'Stop kontak di meja animasi longgar dan memercikkan bunga api.' },
    { id:'RPT-004', tanggal:'2026-05-27', pelapor:'Yoel',         lokasi:'Meja Editing',        jenis:'Perangkat Berantakan',  risiko:'sedang',  status:'selesai',  deskripsi:'Perangkat keras tidak tersusun rapi, menghalangi ventilasi.' },
    { id:'RPT-005', tanggal:'2026-05-27', pelapor:'Khensa',       lokasi:'Pintu Darurat',       jenis:'Jalur Tersumbat',       risiko:'kritis',  status:'baru',     deskripsi:'Kabel ekstensi melintang di depan pintu darurat.' },
    { id:'RPT-006', tanggal:'2026-05-28', pelapor:'Syamil',       lokasi:'Rak Peralatan',       jenis:'Perangkat Tidak Stabil',risiko:'sedang',  status:'baru',     deskripsi:'Monitor di rak peralatan hampir jatuh karena tidak terpasang.' },
    { id:'RPT-007', tanggal:'2026-05-28', pelapor:'Honest',       lokasi:'Ruang Komputer 2',    jenis:'Kabel Berantakan',      risiko:'rendah',  status:'selesai',  deskripsi:'Banyak kabel tidak berlabel dan tersebar tidak rapi.' },
  ],
};

/* ================================================================
   INISIALISASI — Dijalankan saat halaman selesai dimuat
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();        // Pasang event listener navigasi
  initDateTime();          // Tampilkan jam real-time
  initChecklist();         // Inisialisasi checklist K3
  initForm();              // Pasang event listener form laporan
  initTable();             // Render tabel riwayat audit
  initUpload();            // Fitur upload gambar drag & drop
  initProgressBars();      // Animasi progress bar
  initDashboard();         // Render data dashboard
  showPage('dashboard');   // Tampilkan halaman dashboard pertama kali
  showToast('info', 'SafetyCheck-IT', 'Sistem aktif. Selamat bertugas, Tim K3!', 5000);
});

/* ================================================================
   NAVIGASI — Sidebar & mobile hamburger
   ================================================================ */
function initNavigation() {
  // Pasang klik pada setiap item nav
  document.querySelectorAll('.nav-item[data-page]').forEach(item => {
    item.addEventListener('click', () => {
      const page = item.dataset.page;
      showPage(page);
      // Tutup sidebar di mobile setelah klik
      closeSidebarMobile();
    });
  });

  // Hamburger menu untuk mobile
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('sidebarOverlay');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
    });
  }
  if (overlay) {
    overlay.addEventListener('click', closeSidebarMobile);
  }
}

// Fungsi tampilkan halaman tertentu
function showPage(pageId) {
  // Sembunyikan semua halaman
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

  // Tampilkan halaman yang dipilih
  const targetPage = document.getElementById('page-' + pageId);
  const targetNav  = document.querySelector(`.nav-item[data-page="${pageId}"]`);
  if (targetPage) { targetPage.classList.add('active'); APP.currentPage = pageId; }
  if (targetNav)  { targetNav.classList.add('active'); }

  // Update judul topbar
  const titles = {
    dashboard: 'Dashboard',
    checklist: 'Checklist Audit K3',
    laporan:   'Form Laporan Bahaya',
    riwayat:   'Riwayat Audit',
    edukasi:   'Edukasi Budaya 5R',
  };
  const topbarTitle = document.getElementById('topbarTitle');
  if (topbarTitle) topbarTitle.textContent = titles[pageId] || 'SafetyCheck-IT';

  // Re-trigger animasi progress bar saat dashboard dibuka
  if (pageId === 'dashboard') { setTimeout(animateProgressBars, 100); }
  if (pageId === 'riwayat')   { renderTable(APP.riwayat); }
}

function closeSidebarMobile() {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebarOverlay')?.classList.remove('open');
}

/* ================================================================
   JAM REAL-TIME — Update setiap detik
   ================================================================ */
function initDateTime() {
  function update() {
    const now = new Date();
    const opts = { weekday:'short', year:'numeric', month:'short', day:'numeric' };
    const dateStr = now.toLocaleDateString('id-ID', opts);
    const timeStr = now.toLocaleTimeString('id-ID', { hour:'2-digit', minute:'2-digit', second:'2-digit' });
    const el = document.getElementById('datetimeBadge');
    if (el) el.textContent = `${dateStr}  ${timeStr}`;
  }
  update();
  setInterval(update, 1000);
}

/* ================================================================
   DASHBOARD — Statistik & animasi angka
   ================================================================ */
function initDashboard() {
  // Hitung status dari riwayat
  APP.stats.totalLaporan      = APP.riwayat.length;
  APP.stats.kabelBermasalah   = APP.riwayat.filter(r => r.jenis.toLowerCase().includes('kabel')).length;
  const kritisCount           = APP.riwayat.filter(r => r.risiko === 'kritis').length;

  // Render angka di kartu
  animateCounter('statTotalLaporan',    APP.stats.totalLaporan);
  animateCounter('statKabelBermasalah', APP.stats.kabelBermasalah);
  animateCounter('statAuditHariIni',    APP.stats.auditHariIni);
  animateCounter('statKritis',          kritisCount);
}

// Fungsi animasi counter angka
function animateCounter(id, target, duration = 1200) {
  const el = document.getElementById(id);
  if (!el) return;
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  };
  requestAnimationFrame(step);
}

/* ================================================================
   PROGRESS BARS — Animasi saat halaman terbuka
   ================================================================ */
function initProgressBars() {
  // Set lebar awal ke 0
  document.querySelectorAll('.progress-bar-fill').forEach(bar => {
    bar.style.width = '0%';
  });
}

function animateProgressBars() {
  document.querySelectorAll('.progress-bar-fill[data-width]').forEach(bar => {
    const target = bar.dataset.width;
    bar.style.width = target;
  });
}

/* ================================================================
   CHECKLIST AUDIT K3 — Interaktif & auto-hitung skor
   ================================================================ */
// Data item checklist dengan nama icon SVG
const checklistData = [
  {
    category: 'Manajemen Kabel',
    icon: 'plug',
    items: [
      'Kabel power tersusun rapi dengan cable tie',
      'Kabel tidak melintang di jalur lalu lintas',
      'Kabel diberi label identitas yang jelas',
      'Kabel tidak ada yang terbuka/terkelupas',
      'Kabel panjang digulung dan disimpan dengan rapi',
    ]
  },
  {
    category: 'Stop Kontak & Listrik',
    icon: 'bolt',
    items: [
      'Stop kontak dalam kondisi baik, tidak retak',
      'Tidak ada overloading pada satu stop kontak',
      'Stop kontak jauh dari sumber air/cairan',
      'Grounding terpasang dengan benar',
      'MCB/sekring berfungsi normal',
    ]
  },
  {
    category: 'Area Kerja (5R)',
    icon: 'broom',
    items: [
      'Meja kerja bebas dari barang yang tidak perlu',
      'Peralatan dikembalikan ke tempat semula',
      'Lantai bersih, tidak ada kotoran/debu berlebih',
      'Tempat sampah tersedia dan tidak penuh',
      'Papan nama/label area terpasang jelas',
    ]
  },
  {
    category: 'Perangkat & Hardware',
    icon: 'monitor',
    items: [
      'Monitor terpasang stabil, tidak miring',
      'Komputer memiliki ventilasi yang cukup',
      'Keyboard & mouse tersimpan rapi',
      'Perangkat peripheral disimpan di tempatnya',
      'Tidak ada makanan/minuman di dekat perangkat',
    ]
  },
  {
    category: 'Keselamatan Darurat',
    icon: 'alert',
    items: [
      'Jalur evakuasi bebas hambatan',
      'APAR tersedia dan mudah dijangkau',
      'Nomor darurat tertempel di lokasi strategis',
      'Kotak P3K tersedia dan terisi lengkap',
      'Tanda bahaya K3 terpasang sesuai aturan',
    ]
  },
];

function initChecklist() {
  const container = document.getElementById('checklistContainer');
  if (!container) return;

  let html = '';
  checklistData.forEach((cat, catIdx) => {
    const iconSvg = SVG_ICONS[cat.icon] || '';
    html += `
    <div class="checklist-category">
      <div class="checklist-cat-header">
        <span class="cat-icon-svg">${iconSvg}</span>
        <h3>${cat.category}</h3>
        <span class="cat-score" id="score-${catIdx}">0/${cat.items.length}</span>
      </div>
      <div class="checklist-items">`;

    cat.items.forEach((item, itemIdx) => {
      const id = `chk-${catIdx}-${itemIdx}`;
      html += `
        <div class="checklist-item" id="${id}" data-cat="${catIdx}" data-item="${itemIdx}" onclick="toggleCheck('${id}')">
          <div class="custom-checkbox" id="cb-${id}"></div>
          <span class="checklist-item-text">${item}</span>
          <span class="status-badge badge-periksa" id="badge-${id}">Periksa</span>
        </div>`;
    });

    html += `</div></div>`;
  });

  container.innerHTML = html;

  // Hitung total item
  APP.stats.totalCheckItems = checklistData.reduce((a, c) => a + c.items.length, 0);
  updateChecklistSummary();
}

function toggleCheck(id) {
  const el = document.getElementById(id);
  if (!el) return;

  const isChecked  = el.classList.contains('checked');
  const isUnchecked = el.classList.contains('unchecked');
  const cb   = document.getElementById('cb-' + id);
  const badge = document.getElementById('badge-' + id);

  if (!isChecked && !isUnchecked) {
    // Belum dipilih → AMAN
    el.classList.add('checked');
    cb.innerHTML = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
    badge.textContent = 'Aman';
    badge.className = 'status-badge badge-aman';
    showToast('success', 'Checklist', 'Item ditandai AMAN', 2000);
  } else if (isChecked) {
    // Aman → Tidak Aman
    el.classList.remove('checked');
    el.classList.add('unchecked');
    cb.innerHTML = `<svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
    badge.textContent = 'Bahaya';
    badge.className = 'status-badge badge-bahaya';
    showToast('warning', 'Perhatian', 'Item ditandai BAHAYA - Segera perbaiki!', 3000);
  } else {
    // Tidak Aman → Reset
    el.classList.remove('unchecked');
    cb.innerHTML = '';
    badge.textContent = 'Periksa';
    badge.className = 'status-badge badge-periksa';
  }

  updateChecklistSummary();
}

function updateChecklistSummary() {
  let totalChecked = 0;
  let totalUnchecked = 0;

  checklistData.forEach((cat, catIdx) => {
    let catChecked = 0;
    cat.items.forEach((_, itemIdx) => {
      const el = document.getElementById(`chk-${catIdx}-${itemIdx}`);
      if (el?.classList.contains('checked'))   { catChecked++; totalChecked++; }
      if (el?.classList.contains('unchecked')) { totalUnchecked++; }
    });
    const scoreEl = document.getElementById(`score-${catIdx}`);
    if (scoreEl) scoreEl.textContent = `${catChecked}/${cat.items.length}`;
  });

  APP.stats.itemChecked = totalChecked;

  // Update summary bar
  const pct = APP.stats.totalCheckItems > 0
    ? Math.round((totalChecked / APP.stats.totalCheckItems) * 100) : 0;

  const pctEl   = document.getElementById('auditPct');
  const fillEl  = document.getElementById('auditFill');
  const amanEl  = document.getElementById('totalAman');
  const bahayaEl= document.getElementById('totalBahaya');
  const sisaEl  = document.getElementById('totalSisa');

  if (pctEl)    pctEl.textContent  = pct + '%';
  if (fillEl)   fillEl.style.width = pct + '%';
  if (amanEl)   amanEl.textContent  = totalChecked;
  if (bahayaEl) bahayaEl.textContent = totalUnchecked;
  if (sisaEl) {
    const sisa = APP.stats.totalCheckItems - totalChecked - totalUnchecked;
    sisaEl.textContent = sisa;
  }
}

/* ================================================================
   FORM LAPORAN BAHAYA — Validasi & simpan ke riwayat
   ================================================================ */
function initForm() {
  const form = document.getElementById('formLaporan');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    submitLaporan();
  });
}

function submitLaporan() {
  // Ambil nilai dari form
  const pelapor  = document.getElementById('inputPelapor')?.value.trim();
  const lokasi   = document.getElementById('inputLokasi')?.value.trim();
  const jenis    = document.getElementById('inputJenis')?.value;
  const deskripsi= document.getElementById('inputDeskripsi')?.value.trim();
  const risikoEl = document.querySelector('input[name="risiko"]:checked');

  // Validasi sederhana
  if (!pelapor || !lokasi || !jenis || !deskripsi || !risikoEl) {
    showToast('error', 'Validasi Gagal', 'Mohon lengkapi semua field yang wajib diisi!', 4000);
    return;
  }

  // Buat ID laporan baru
  const newId = 'RPT-' + String(APP.riwayat.length + 1).padStart(3, '0');
  const today = new Date().toISOString().split('T')[0];

  // Tambahkan ke data riwayat
  APP.riwayat.unshift({
    id:       newId,
    tanggal:  today,
    pelapor,
    lokasi,
    jenis,
    risiko:   risikoEl.value,
    status:   'baru',
    deskripsi,
  });

  // Update statistik
  APP.stats.totalLaporan = APP.riwayat.length;

  // Tampilkan modal konfirmasi
  openModal('modalBerhasil',
    `Laporan ${newId} Berhasil Dikirim!`,
    `Laporan bahaya dari <strong>${pelapor}</strong> di lokasi <strong>${lokasi}</strong> telah dicatat. Tim K3 akan segera menindaklanjuti dalam 1×24 jam.`
  );

  // Reset form
  document.getElementById('formLaporan').reset();
  document.getElementById('uploadPreview').style.display = 'none';

  // Update badge di nav
  updateNavBadge();

  // Update counter di dashboard
  document.getElementById('statTotalLaporan') && (document.getElementById('statTotalLaporan').textContent = APP.stats.totalLaporan);
}

/* ================================================================
   UPLOAD GAMBAR — Drag & drop + preview
   ================================================================ */
function initUpload() {
  const area    = document.getElementById('uploadArea');
  const input   = document.getElementById('uploadInput');
  const preview = document.getElementById('uploadPreview');
  const img     = document.getElementById('previewImg');
  if (!area || !input) return;

  // Klik area untuk buka file dialog
  area.addEventListener('click', () => input.click());

  // Preview setelah pilih file
  input.addEventListener('change', () => {
    const file = input.files[0];
    if (!file) return;
    handleFilePreview(file, img, preview, area);
  });

  // Drag & Drop
  area.addEventListener('dragover', (e) => { e.preventDefault(); area.classList.add('dragover'); });
  area.addEventListener('dragleave',() => area.classList.remove('dragover'));
  area.addEventListener('drop', (e) => {
    e.preventDefault();
    area.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) handleFilePreview(file, img, preview, area);
  });
}

function handleFilePreview(file, img, preview, area) {
  if (!file.type.startsWith('image/')) {
    showToast('error', 'Format Salah', 'Hanya file gambar yang diperbolehkan (JPG, PNG, WEBP)', 3000);
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    img.src = e.target.result;
    preview.style.display = 'block';
    showToast('success', 'Gambar Ditambahkan', `File "${file.name}" berhasil diunggah`, 2500);
  };
  reader.readAsDataURL(file);
}

/* ================================================================
   TABEL RIWAYAT AUDIT — Render, filter, search
   ================================================================ */
function initTable() {
  renderTable(APP.riwayat);

  // Search
  const searchInput = document.getElementById('tableSearch');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      filterTable();
    });
  }

  // Filter status
  const filterStatus = document.getElementById('filterStatus');
  const filterRisiko = document.getElementById('filterRisiko');
  if (filterStatus) filterStatus.addEventListener('change', filterTable);
  if (filterRisiko) filterRisiko.addEventListener('change', filterTable);
}

function filterTable() {
  const q      = document.getElementById('tableSearch')?.value.toLowerCase() || '';
  const status = document.getElementById('filterStatus')?.value || 'all';
  const risiko = document.getElementById('filterRisiko')?.value || 'all';

  const filtered = APP.riwayat.filter(r => {
    const matchQ = !q ||
      r.pelapor.toLowerCase().includes(q) ||
      r.lokasi.toLowerCase().includes(q)  ||
      r.jenis.toLowerCase().includes(q);
    const matchStatus = status === 'all' || r.status === status;
    const matchRisiko = risiko === 'all' || r.risiko === risiko;
    return matchQ && matchStatus && matchRisiko;
  });

  renderTable(filtered);
}

function renderTable(data) {
  const tbody = document.getElementById('auditTableBody');
  if (!tbody) return;

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:32px;color:var(--text-muted);">Tidak ada data yang sesuai filter</td></tr>`;
    return;
  }

  tbody.innerHTML = data.map(r => `
    <tr>
      <td>${r.id}</td>
      <td>${r.tanggal}</td>
      <td style="color:var(--text-primary);font-weight:500">${r.pelapor}</td>
      <td>${r.lokasi}</td>
      <td>${r.jenis}</td>
      <td><span class="badge-risiko risiko-${r.risiko}">${risikoDot(r.risiko)} ${capitalize(r.risiko)}</span></td>
      <td><span class="badge-status status-${r.status}">${statusDot(r.status)} ${capitalize(r.status)}</span></td>
      <td>
        <button class="action-btn" onclick="viewDetail('${r.id}')">
          <svg style="width:12px;height:12px;vertical-align:middle;margin-right:4px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>Detail
        </button>
      </td>
    </tr>
  `).join('');
}

function risikoDot(r) {
  const map = {
    rendah: SVG_ICONS.dotRendah,
    sedang: SVG_ICONS.dotSedang,
    tinggi: SVG_ICONS.dotTinggi,
    kritis: SVG_ICONS.dotKritis
  };
  return map[r] || SVG_ICONS.dotDefault;
}

function statusDot(s) {
  const map = {
    selesai: SVG_ICONS.statusSelesai,
    proses: SVG_ICONS.statusProses,
    baru: SVG_ICONS.statusBaru
  };
  return map[s] || SVG_ICONS.statusDefault;
}

function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

function viewDetail(id) {
  const r = APP.riwayat.find(x => x.id === id);
  if (!r) return;
  openModal('modalDetail',
    `${r.id} — ${r.jenis}`,
    `<strong>Pelapor:</strong> ${r.pelapor}<br>
     <strong>Tanggal:</strong> ${r.tanggal}<br>
     <strong>Lokasi:</strong> ${r.lokasi}<br>
     <strong>Risiko:</strong> ${risikoDot(r.risiko)} ${capitalize(r.risiko)}<br>
     <strong>Status:</strong> ${statusDot(r.status)} ${capitalize(r.status)}<br><br>
     <strong>Deskripsi:</strong><br>${r.deskripsi}`
  );
}

/* ================================================================
   MODAL — Buka & tutup
   ================================================================ */
function openModal(modalId, title, body) {
  const overlay = document.getElementById(modalId);
  if (!overlay) return;
  const h = overlay.querySelector('h3');
  const p = overlay.querySelector('p');
  if (h) h.textContent = title;
  if (p) p.innerHTML  = body;
  overlay.classList.add('open');
}

function closeModal(modalId) {
  document.getElementById(modalId)?.classList.remove('open');
}

// Tutup modal saat klik di luar area modal
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

/* ================================================================
   TOAST NOTIFICATION — Notifikasi pop-up melayang bebas bug layout
   ================================================================ */
function showToast(type, title, message, duration = 4000) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const iconSvg = SVG_ICONS[type] || '';
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon-svg">${iconSvg}</span>
    <div class="toast-body">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
    <button class="toast-close" onclick="this.closest('.toast').remove()">✕</button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all .3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

/* ================================================================
   UTILITAS LAIN
   ================================================================ */

// Update badge merah di nav sidebar
function updateNavBadge() {
  const badge = document.getElementById('navBadgeLaporan');
  if (badge) {
    const newCount = APP.riwayat.filter(r => r.status === 'baru').length;
    badge.textContent = newCount;
    badge.style.display = newCount > 0 ? 'inline-block' : 'none';
  }
}

// Export data ke CSV sederhana
function exportCSV() {
  const header = ['ID', 'Tanggal', 'Pelapor', 'Lokasi', 'Jenis Bahaya', 'Risiko', 'Status'];
  const rows   = APP.riwayat.map(r =>
    [r.id, r.tanggal, r.pelapor, r.lokasi, r.jenis, r.risiko, r.status].join(',')
  );
  const csv    = [header.join(','), ...rows].join('\n');
  const blob   = new Blob([csv], { type: 'text/csv' });
  const url    = URL.createObjectURL(blob);
  const a      = Object.assign(document.createElement('a'), { href: url, download: 'riwayat-audit-k3.csv' });
  a.click(); URL.revokeObjectURL(url);
  showToast('success', 'Export Berhasil', 'Data riwayat audit berhasil diunduh sebagai CSV', 3000);
}

// Reset semua checklist
function resetChecklist() {
  openModal('modalReset', 'Reset Checklist', 'Yakin ingin mereset semua checklist? Semua status akan kembali ke kondisi awal.');
}

function confirmReset() {
  closeModal('modalReset');
  document.querySelectorAll('.checklist-item').forEach(el => {
    el.classList.remove('checked', 'unchecked');
    const cb    = el.querySelector('.custom-checkbox');
    const badge = el.querySelector('.status-badge');
    if (cb)    cb.innerHTML = '';
    if (badge) { badge.textContent = 'Periksa'; badge.className = 'status-badge badge-periksa'; }
  });
  updateChecklistSummary();
  showToast('info', 'Checklist Direset', 'Semua item checklist telah dikembalikan ke kondisi awal', 3000);
}

// Simpan hasil checklist (simulasi)
function saveChecklist() {
  const pct = APP.stats.totalCheckItems > 0
    ? Math.round((APP.stats.itemChecked / APP.stats.totalCheckItems) * 100) : 0;
  showToast('success', 'Checklist Disimpan', `Hasil audit disimpan: ${APP.stats.itemChecked}/${APP.stats.totalCheckItems} item aman (${pct}%)`, 4000);
}

// Print halaman
function printPage() { window.print(); }

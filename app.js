// Data from YAML
const data = {
  anggaran: {
    komponen: ['Anggaran Total 2025', 'Realisasi s.d April 2025', 'Sisa Anggaran'],
    jumlah: [4.7, 0.14, 4.56],
    persentase: [100, 3.0, 97.0]
  },
  capaian_periode: {
    periode: ['Februari 2025', 'Maret 2025', 'April 2025', 'Q2 2025', 'Agustus 2025', 'Oktober 2025'],
    jumlah_peserta: [0.4, 1.5, 4.3, 3.5, 38.0, 43.0],
    kumulatif: [0.4, 1.9, 4.3, 7.8, 38.0, 43.0]
  },
  provinsi_capaian: {
    provinsi: ['Jawa Tengah', 'Jawa Timur', 'Jawa Barat', 'DKI Jakarta', 'Sumatera Utara', 'Papua Pegunungan', 'Papua Barat', 'Papua Barat Daya', 'Papua Tengah', 'Kalimantan Utara'],
    kategori: ['Top 5', 'Top 5', 'Top 5', 'Top 5', 'Top 5', 'Bottom 5', 'Bottom 5', 'Bottom 5', 'Bottom 5', 'Bottom 5'],
    capaian: [52, 48, 45, 42, 38, 12, 14, 15, 16, 18]
  },
  biaya_kategori: {
    kategori_usia: ['Bayi Baru Lahir', 'Balita (1-6 tahun)', 'Usia Sekolah (7-17 tahun)', 'Dewasa (18-59 tahun)', 'Lansia (≥60 tahun)'],
    nilai_manfaat: [1600000, 1600000, 1600000, 2000000, 2000000],
    jenis_pemeriksaan: ['Skrining dasar', 'Skrining tumbuh kembang', 'Skrining kesehatan sekolah', 'Skrining komprehensif', 'Skrining geriatri']
  },
  puskesmas: {
    indikator: ['Total Puskesmas Indonesia', 'Puskesmas Aktif CKG (April)', 'Puskesmas Aktif CKG (Agt)', 'Target Puskesmas', 'Kabupaten/Kota Terlayani'],
    jumlah: [10200, 9346, 8885, 10200, 498],
    persentase: [100, 91.6, 87.1, 100, 96.7]
  },
  target_realisasi: {
    kategori: ['Target 2025', 'Realisasi Oktober 2025', 'Gap', 'Proyeksi Desember 2025'],
    jumlah_peserta: [102, 43, 59, 68],
    persentase_capaian: [100, 42.2, -57.8, 66.7]
  },
  sumber_anggaran: {
    sumber: ['Kementerian Kesehatan', 'DAK Non-Fisik', 'Cadangan Anggaran', 'Total'],
    alokasi: [2.2, 1.2, 1.3, 4.7],
    persentase: [46.8, 25.5, 27.7, 100]
  },
  distribusi_usia: {
    kategori_usia: ['Dewasa (18-59)', 'Lansia (≥60)', 'Usia Sekolah (7-17)', 'Balita & Pra-Sekolah (1-6)', 'Bayi (0-1)'],
    persentase: [37.6, 28.4, 20.5, 10.3, 3.2],
    estimasi_peserta: [16.2, 12.2, 8.8, 4.4, 1.4]
  },
  temuan_penyakit: {
    jenis_penyakit: ['Gangguan Fungsi Ginjal', 'Risiko Stroke', 'Hipertensi', 'Diabetes', 'Obesitas', 'Gangguan Kesehatan Mental'],
    tingkat_deteksi: ['Tinggi', 'Tinggi', 'Sedang-Tinggi', 'Sedang', 'Sedang', 'Rendah-Sedang'],
    persentase_estimasi: [15, 12, 25, 18, 20, 10]
  },
  kpi: {
    indikator: ['Tingkat Kehadiran', 'Tingkat Rujukan', 'Tingkat Follow-up', 'Kepuasan Peserta', 'Utilisasi Puskesmas'],
    target: [90, 15, 70, 85, 80],
    realisasi: [93.9, 12, 65, 88, 87.1],
    status: ['✓ Tercapai', '✓ Tercapai', '⚠ Perlu Perhatian', '✓ Tercapai', '✓ Tercapai']
  }
};

// Chart colors
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Tab Navigation
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tabId = btn.dataset.tab;
    
    // Remove active class from all tabs and buttons
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked button and corresponding content
    btn.classList.add('active');
    document.getElementById(tabId).classList.add('active');
  });
});

// Format number with thousand separator
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Format currency
function formatCurrency(num) {
  if (num >= 1) {
    return `Rp ${num.toFixed(2).replace('.', ',')} T`;
  }
  return `Rp ${formatNumber(Math.round(num * 1000))} M`;
}

// Initialize Charts
function initCharts() {
  // Chart 1: Alokasi Anggaran per Sumber (Pie Chart)
  const ctxAlokasi = document.getElementById('chartAlokasiAnggaran').getContext('2d');
  new Chart(ctxAlokasi, {
    type: 'pie',
    data: {
      labels: data.sumber_anggaran.sumber.slice(0, 3),
      datasets: [{
        data: data.sumber_anggaran.alokasi.slice(0, 3),
        backgroundColor: [chartColors[0], chartColors[1], chartColors[2]],
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: { size: 12 }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              const percentage = data.sumber_anggaran.persentase[context.dataIndex];
              return `${label}: Rp ${value.toFixed(1)} T (${percentage}%)`;
            }
          }
        }
      }
    }
  });

  // Chart 2: Realisasi vs Sisa Anggaran (Horizontal Bar)
  const ctxRealisasi = document.getElementById('chartRealisasiAnggaran').getContext('2d');
  new Chart(ctxRealisasi, {
    type: 'bar',
    data: {
      labels: ['Realisasi', 'Sisa Anggaran'],
      datasets: [{
        label: 'Triliun Rp',
        data: [0.14, 4.56],
        backgroundColor: [chartColors[1], chartColors[0]],
        borderWidth: 0
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Rp ${context.parsed.x.toFixed(2)} T`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return `Rp ${value} T`;
            }
          }
        }
      }
    }
  });

  // Chart 3: Tren Jumlah Peserta (Line Chart)
  const ctxTren = document.getElementById('chartTrenPeserta').getContext('2d');
  new Chart(ctxTren, {
    type: 'line',
    data: {
      labels: data.capaian_periode.periode,
      datasets: [{
        label: 'Jumlah Peserta Kumulatif (Juta)',
        data: data.capaian_periode.kumulatif,
        borderColor: chartColors[0],
        backgroundColor: chartColors[0] + '20',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.y} juta peserta`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value + ' jt';
            }
          }
        }
      }
    }
  });

  // Chart 4: Target vs Realisasi vs Proyeksi
  const ctxTarget = document.getElementById('chartTargetRealisasi').getContext('2d');
  new Chart(ctxTarget, {
    type: 'bar',
    data: {
      labels: ['Target 2025', 'Realisasi Okt 2025', 'Proyeksi Des 2025'],
      datasets: [{
        label: 'Juta Peserta',
        data: [102, 43, 68],
        backgroundColor: [chartColors[0], chartColors[1], chartColors[4]],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.y} juta peserta`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value + ' jt';
            }
          }
        }
      }
    }
  });

  // Chart 5: Top 5 Provinsi
  const topProvinsi = data.provinsi_capaian.provinsi.slice(0, 5);
  const topCapaian = data.provinsi_capaian.capaian.slice(0, 5);
  const ctxTop = document.getElementById('chartTopProvinsi').getContext('2d');
  new Chart(ctxTop, {
    type: 'bar',
    data: {
      labels: topProvinsi,
      datasets: [{
        label: 'Capaian (%)',
        data: topCapaian,
        backgroundColor: '#16a34a',
        borderWidth: 0
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.x}% capaian`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      }
    }
  });

  // Chart 6: Bottom 5 Provinsi
  const bottomProvinsi = data.provinsi_capaian.provinsi.slice(5);
  const bottomCapaian = data.provinsi_capaian.capaian.slice(5);
  const ctxBottom = document.getElementById('chartBottomProvinsi').getContext('2d');
  new Chart(ctxBottom, {
    type: 'bar',
    data: {
      labels: bottomProvinsi,
      datasets: [{
        label: 'Capaian (%)',
        data: bottomCapaian,
        backgroundColor: '#dc2626',
        borderWidth: 0
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `${context.parsed.x}% capaian`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      }
    }
  });

  // Chart 7: Cakupan Kabupaten/Kota
  const ctxKabupaten = document.getElementById('chartKabupatenKota').getContext('2d');
  new Chart(ctxKabupaten, {
    type: 'bar',
    data: {
      labels: ['Terlayani', 'Belum Terlayani'],
      datasets: [{
        label: 'Jumlah Kabupaten/Kota',
        data: [498, 16],
        backgroundColor: [chartColors[0], chartColors[2]],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              const total = 514;
              const percentage = ((context.parsed.y / total) * 100).toFixed(1);
              return `${context.parsed.y} kabupaten/kota (${percentage}%)`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Chart 8: Distribusi Usia (Donut Chart)
  const ctxUsia = document.getElementById('chartDistribusiUsia').getContext('2d');
  new Chart(ctxUsia, {
    type: 'doughnut',
    data: {
      labels: data.distribusi_usia.kategori_usia,
      datasets: [{
        data: data.distribusi_usia.persentase,
        backgroundColor: chartColors.slice(0, 5),
        borderWidth: 2,
        borderColor: '#fff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 10,
            font: { size: 11 }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const percentage = context.parsed || 0;
              const estimasi = data.distribusi_usia.estimasi_peserta[context.dataIndex];
              return `${label}: ${percentage}% (${estimasi} juta)`;
            }
          }
        }
      }
    }
  });

  // Chart 9: Temuan Penyakit
  const ctxPenyakit = document.getElementById('chartTemuanPenyakit').getContext('2d');
  new Chart(ctxPenyakit, {
    type: 'bar',
    data: {
      labels: data.temuan_penyakit.jenis_penyakit,
      datasets: [{
        label: 'Persentase Deteksi (%)',
        data: data.temuan_penyakit.persentase_estimasi,
        backgroundColor: chartColors.slice(0, 6),
        borderWidth: 0
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function(context) {
              const tingkat = data.temuan_penyakit.tingkat_deteksi[context.dataIndex];
              return `${context.parsed.x}% (Tingkat: ${tingkat})`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      }
    }
  });
}

// Populate Tables
function populateTables() {
  // Table: Breakdown Anggaran
  const tableAnggaran = document.getElementById('tableAnggaran');
  data.sumber_anggaran.sumber.forEach((sumber, index) => {
    const row = document.createElement('tr');
    const alokasi = data.sumber_anggaran.alokasi[index];
    const persentase = data.sumber_anggaran.persentase[index];
    
    row.innerHTML = `
      <td style="font-weight: ${sumber === 'Total' ? '600' : '400'};">${sumber}</td>
      <td style="font-weight: ${sumber === 'Total' ? '600' : '400'};">Rp ${alokasi.toFixed(1)} T</td>
      <td style="font-weight: ${sumber === 'Total' ? '600' : '400'};">${persentase.toFixed(1)}%</td>
    `;
    tableAnggaran.appendChild(row);
  });

  // Table: KPI
  const tableKPI = document.getElementById('tableKPI');
  data.kpi.indikator.forEach((indikator, index) => {
    const row = document.createElement('tr');
    const target = data.kpi.target[index];
    const realisasi = data.kpi.realisasi[index];
    const status = data.kpi.status[index];
    const isSuccess = status.includes('✓');
    const progressColor = isSuccess ? '#16a34a' : '#f59e0b';
    const statusClass = isSuccess ? 'success' : 'warning';
    
    row.innerHTML = `
      <td>${indikator}</td>
      <td>${target}%</td>
      <td>${realisasi}%</td>
      <td>
        <div class="kpi-progress">
          <div class="kpi-progress-fill" style="width: ${(realisasi/target)*100}%; background: ${progressColor};"></div>
        </div>
      </td>
      <td>
        <span class="kpi-status ${statusClass}">${status}</span>
      </td>
    `;
    tableKPI.appendChild(row);
  });
}

// Initialize on load
window.addEventListener('DOMContentLoaded', () => {
  initCharts();
  populateTables();
});
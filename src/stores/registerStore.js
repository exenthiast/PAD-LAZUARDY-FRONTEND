import { defineStore } from 'pinia';

export const useRegisterStore = defineStore('register', {
  state: () => ({
    form: {
      // umum
      namaLengkap: '',
      email: '',
      password: '',
      passwordConfirm: '',
      jenisKelamin: '',
      tanggalLahir: { hari: '', bulan: '', tahun: '' },
      nomorTelepon: '',
      agama: '',
      // alamat
      provinsi: '',
      kota: '',
      kecamatan: '',
      desa: '',
      alamat: '',
      // untuk flow siswa (opsional)
      asalSekolah: '',
      kelas: '',
      namaOrangtua: '',
      nomorTeleponOrangtua: '',
    },
  }),
  actions: {
    loadFromStorage() {
      try {
        const raw = localStorage.getItem('register:form');
        if (raw) this.form = { ...this.form, ...JSON.parse(raw) };
      } catch {}
    },
    saveToStorage() {
      localStorage.setItem('register:form', JSON.stringify(this.form));
    },
    reset() {
      localStorage.removeItem('register:form');
      this.$reset();
    },
  },
});
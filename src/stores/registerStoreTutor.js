import { defineStore } from "pinia";

export const useRegisterTutorStore = defineStore("registerTutor", {
  state: () => ({
    form: {
      // umum (shared)
      namaLengkap: "",
      email: "",
      password: "",
      passwordConfirm: "",
      jenisKelamin: "",
      tanggalLahir: { hari: "", bulan: "", tahun: "" },
      nomorTelepon: "",
      agama: "",
      // alamat (shared)
      provinsi: "",
      kabupaten: "",
      kecamatan: "",
      kelurahan: "",
      alamat: "",
      location: null,
      // khusus tutor (tambahan opsional)
      keahlian: "",
      marketSiswa: "sma", // default to SMA
      pengalaman: "",
      skilBahasa: "",
      organisasi: "",
      cv: null,
      ktp: null,
      ijazah: null,
    },
  }),
  actions: {
    loadFromStorage() {
      try {
        const raw = localStorage.getItem("register:tutor");
        if (raw) this.form = { ...this.form, ...JSON.parse(raw) };
      } catch (e) {
        console.warn("Failed to load tutor register data:", e);
      }
    },
    saveToStorage() {
      try {
        localStorage.setItem("register:tutor", JSON.stringify(this.form));
      } catch (e) {
        console.warn("Failed to save tutor register data:", e);
      }
    },
    reset() {
      localStorage.removeItem("register:tutor");
      this.$reset();
    },
  },
});

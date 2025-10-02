export async function sendOtpDummy(email) {
  console.log("Dummy: kirim OTP ke email ->", email)
  // delay 1 detik biar terasa realistis
  await new Promise((r) => setTimeout(r, 1000))
  return { ok: true, message: "OTP terkirim ke email (dummy). Kode: 1234" }
}

export async function verifyOtpDummy(email, code) {
  console.log("Dummy: verifikasi OTP untuk", email, "dengan code", code)
  await new Promise((r) => setTimeout(r, 800))
  if (code === "1234") {
    return { ok: true, message: "OTP valid (dummy)." }
  }
  return { ok: false, message: "Kode OTP salah (dummy)." }
}

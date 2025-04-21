import nodemailer from "nodemailer";

// Vytvorenie spoločného transportera
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


// 📬 Email pre zákazníka
async function sendMailCustomer(email) {
  await transporter.sendMail({
    from: '"Patras.sk" <patras@patras.sk>',
    to: email,
    subject: "Ďakujeme za Vašu objednávku – Patras.sk",
    text: `Dobrý deň,\n\nďakujeme, že ste si objednali z nášho e-shopu Patras.sk...`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #f9f9f9; padding: 20px; border-radius: 8px;">
        <h2 style="color: #2c3e50;">Ďakujeme za Vašu objednávku 🛍️</h2>
        <p>Dobrý deň,</p>
        <p>ďakujeme, že ste si objednali z nášho e-shopu.</p>
        <p>Vaša objednávka bola úspešne <strong>zaevidovaná</strong> a čoskoro sa pustíme do jej spracovania.</p>
        <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;" />
        <p style="margin-top: 30px;">S pozdravom,<br><strong>Tím Patras.sk</strong></p>
        <div style="margin-top: 40px; font-size: 12px; color: #888;">
          Tento e-mail bol generovaný automaticky. Neodpovedajte naň.
        </div>
      </div>
    `,
  });
}
// 📬 Email pre administrátora
async function sendMailOwner() {
  await transporter.sendMail({
    from: '"Patras.sk" <patras@patras.sk>',
    to: "patras@patras.sk",
    subject: "🆕 Nová objednávka na e-shope Patras.sk",
    text: `Ahoj,\n\npráve prišla nová objednávka`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #fff8f0; padding: 20px; border-radius: 8px;">
        <h2 style="color: #d35400;">🔔 Nová objednávka na e-shope Patras.sk</h2>
        <p>Ahoj,</p>
        <p>bola vytvorená <strong>nová objednávka</strong> na e-shope.</p>
        <p>Prosím, skontroluj si administráciu alebo databázu a priprav sa na jej spracovanie.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p>🗂️ <em>Pre detailné informácie odporúčame pozrieť backend alebo e-shop dashboard.</em></p>
        <p style="margin-top: 30px;">Pekný deň,<br><strong>Systém Patras.sk</strong></p>
        <div style="margin-top: 40px; font-size: 12px; color: #999;">
          Tento e-mail je automaticky generovaný systémom a slúži ako upozornenie.
        </div>
      </div>
    `,
  });
}

module.exports = {
  sendMailCustomer,
  sendMailOwner,
};
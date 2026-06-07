import { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

const STORE_INFO = {
  address: "Av. 24 de Julho, Maputo, Moçambique",
  phone: "+258 84 000 0000",
  whatsapp: "+258840000000",
  email: "contacto@izzy-essencial.co.mz",
  hours: [
    { day: "Segunda–Sexta", dayEn: "Mon–Fri",  time: "08:00 – 20:00" },
    { day: "Sábado",        dayEn: "Saturday", time: "08:00 – 18:00" },
    { day: "Domingo",       dayEn: "Sunday",   time: "09:00 – 14:00" },
  ],
};

// OpenStreetMap embed — free, no API key required. Update bbox/marker with exact store coords.
// Maputo centre: lat -25.9066, lon 32.5732
const MAP_EMBED_SRC =
  "https://www.openstreetmap.org/export/embed.html?bbox=32.54%2C-25.93%2C32.60%2C-25.88&layer=mapnik&marker=-25.9066%2C32.5732";

export default function Location() {
  const { t, lang } = useLanguage();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    // WhatsApp fallback: open WhatsApp with the message
    const msg = `Olá Izzy Essencial!\n\nNome: ${form.name}\nEmail: ${form.email}\n\nMensagem:\n${form.message}`;
    const url = `https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setSent(true);
    setSending(false);
    setForm({ name: "", email: "", message: "" });
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-surface-container border border-outline-variant text-on-surface font-body text-body-md focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition placeholder:text-outline";
  const labelClass = "block font-label text-label-md text-on-surface-variant mb-1.5";

  return (
    <div className="min-h-screen pb-24 md:pb-0">
      {/* Hero strip */}
      <section
        className="px-4 md:px-margin-desktop py-10 text-center"
        style={{ background: "radial-gradient(circle at top right, #c5e7ff 0%, #f9f9ff 70%)" }}
      >
        <div className="max-w-xl mx-auto">
          <span className="material-symbols-outlined text-[48px] text-primary mb-3 block anim-scale-in" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
          <h1 className="font-display font-bold text-headline-lg-mobile md:text-headline-lg text-on-surface anim-fade-up delay-75">
            {lang === "pt" ? "Localização & Contactos" : "Location & Contacts"}
          </h1>
          <p className="font-body text-body-md text-on-surface-variant mt-2 anim-fade-up delay-150">{STORE_INFO.address}</p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 md:px-margin-desktop py-8 space-y-10">

        {/* Map card — click opens Google Maps */}
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE_INFO.address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <section className="rounded-2xl overflow-hidden shadow-card border border-outline-variant relative">
            {/* Styled map placeholder */}
            <div
              className="h-64 md:h-80 flex flex-col items-center justify-center gap-4 relative"
              style={{ background: "linear-gradient(135deg, #c5e7ff 0%, #e7eeff 50%, #d5f5e3 100%)" }}
            >
              {/* Decorative grid lines */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: "linear-gradient(#006388 1px, transparent 1px), linear-gradient(90deg, #006388 1px, transparent 1px)",
                backgroundSize: "40px 40px"
              }} />
              {/* Pin */}
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-primary shadow-card-hover flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px] text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                </div>
                <div className="bg-surface-container-lowest/90 backdrop-blur-sm rounded-xl px-4 py-2.5 text-center shadow-card">
                  <p className="font-label font-bold text-label-md text-on-surface">{STORE_INFO.address}</p>
                  <p className="font-label text-[12px] text-primary mt-0.5 group-hover:underline">
                    {lang === "pt" ? "Abrir no Google Maps →" : "Open in Google Maps →"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </a>

        {/* Info cards + Contact form side-by-side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 anim-fade-up delay-150">

          {/* Left — store info */}
          <div className="space-y-5">
            {/* Address */}
            <InfoCard icon="store" title={lang === "pt" ? "Endereço" : "Address"}>
              <p className="font-body text-body-md text-on-surface">{STORE_INFO.address}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE_INFO.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 text-primary font-label text-label-md hover:underline"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                {lang === "pt" ? "Abrir no Google Maps" : "Open in Google Maps"}
              </a>
            </InfoCard>

            {/* Hours */}
            <InfoCard icon="schedule" title={lang === "pt" ? "Horário" : "Hours"}>
              <div className="space-y-2">
                {STORE_INFO.hours.map((h) => (
                  <div key={h.day} className="flex justify-between items-center">
                    <span className="font-body text-body-md text-on-surface">
                      {lang === "pt" ? h.day : h.dayEn}
                    </span>
                    <span className="font-label text-label-md text-primary bg-primary-fixed/40 px-2 py-0.5 rounded-full">
                      {h.time}
                    </span>
                  </div>
                ))}
              </div>
            </InfoCard>

            {/* Contact details */}
            <InfoCard icon="contact_phone" title={lang === "pt" ? "Contactos" : "Contacts"}>
              <div className="space-y-3">
                <ContactRow icon="phone" label={lang === "pt" ? "Telefone" : "Phone"} href={`tel:${STORE_INFO.phone}`} value={STORE_INFO.phone} />
                <ContactRow icon="chat" label="WhatsApp" href={`https://wa.me/${STORE_INFO.whatsapp}`} value={STORE_INFO.phone} external />
                <ContactRow icon="mail" label="Email" href={`mailto:${STORE_INFO.email}`} value={STORE_INFO.email} />
              </div>
            </InfoCard>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${STORE_INFO.whatsapp}?text=${encodeURIComponent("Olá! Gostaria de obter mais informações sobre a Izzy Essencial.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-secondary text-on-secondary font-label text-label-md hover:opacity-90 transition-opacity shadow-card"
            >
              <span className="material-symbols-outlined text-[22px]">chat</span>
              {lang === "pt" ? "Falar no WhatsApp" : "Chat on WhatsApp"}
            </a>
          </div>

          {/* Right — contact form */}
          <div>
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 md:p-8 shadow-card">
              <h2 className="font-display font-bold text-headline-md text-on-surface mb-6">
                {lang === "pt" ? "Enviar Mensagem" : "Send a Message"}
              </h2>

              {sent ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <span className="material-symbols-outlined text-[56px] text-secondary">check_circle</span>
                  <p className="font-display font-bold text-headline-md text-on-surface">
                    {lang === "pt" ? "Mensagem enviada!" : "Message sent!"}
                  </p>
                  <p className="font-body text-body-md text-on-surface-variant">
                    {lang === "pt"
                      ? "Redirecionámos a sua mensagem para o WhatsApp. Responderemos em breve."
                      : "We redirected your message to WhatsApp. We'll reply shortly."}
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 px-6 py-2.5 rounded-lg bg-surface-container text-on-surface font-label text-label-md hover:bg-surface-container-high transition-colors"
                  >
                    {lang === "pt" ? "Nova mensagem" : "New message"}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={labelClass}>{lang === "pt" ? "Nome" : "Name"} *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder={lang === "pt" ? "O seu nome" : "Your name"}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder={lang === "pt" ? "o.seu@email.com" : "your@email.com"}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{lang === "pt" ? "Mensagem" : "Message"} *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder={lang === "pt" ? "Como podemos ajudar?" : "How can we help?"}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3.5 rounded-xl bg-primary text-on-primary font-label text-label-md hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">send</span>
                    {lang === "pt" ? "Enviar via WhatsApp" : "Send via WhatsApp"}
                  </button>
                  <p className="text-center font-label text-[12px] text-on-surface-variant">
                    {lang === "pt"
                      ? "A mensagem será enviada via WhatsApp para resposta rápida."
                      : "Your message will be sent via WhatsApp for a fast response."}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-4 md:px-margin-desktop py-8 border-t border-outline-variant mt-8">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Izzy Essencial" className="w-8 h-8 object-contain rounded-full" />
            <span className="font-display font-bold text-[15px] text-on-surface">Izzy Essencial</span>
          </div>
          <p className="font-label text-label-md text-on-surface-variant">{t.copyright}</p>
        </div>
      </footer>
    </div>
  );
}

function InfoCard({ icon, title, children }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl border border-outline-variant p-5 shadow-card">
      <div className="flex items-center gap-2 mb-3">
        <span className="material-symbols-outlined text-[20px] text-primary">{icon}</span>
        <h3 className="font-label font-bold text-label-md text-on-surface">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function ContactRow({ icon, label, href, value, external }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-3 group"
    >
      <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center flex-shrink-0 group-hover:bg-primary-fixed transition-colors">
        <span className="material-symbols-outlined text-[18px] text-primary">{icon}</span>
      </div>
      <div>
        <p className="font-label text-[11px] text-on-surface-variant leading-none mb-0.5">{label}</p>
        <p className="font-body text-body-md text-on-surface group-hover:text-primary transition-colors">{value}</p>
      </div>
    </a>
  );
}

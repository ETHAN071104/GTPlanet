'use client';

import { useEffect, useState } from "react";

const whatsappBase = "https://wa.me/60194432950";
const defaultMessage = "Hi GT Planet, I would like to enquire about auto parts.";

const navLinks = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Services", "#services"],
  ["Parts", "#parts"],
  ["Gallery", "#gallery"],
  ["Contact", "#contact"],
];

const services = [
  ["mdi:cog-transfer", "Used Auto Parts Supply", "We supply used automotive spare parts and components for various Japanese car models."],
  ["mdi:truck-import", "Japanese Imported Components", "Our parts and components are mainly imported from Japan, offering customers practical replacement options for repair and maintenance needs."],
  ["mdi:engine", "Engine & Gearbox Parts", "We commonly handle major components such as engines, gearboxes, and related mechanical parts."],
  ["mdi:car-wrench", "Used Vehicle / Scrap Vehicle Handling", "We deal with old cars, scrap vehicles, and accident vehicles as part of our auto parts and dismantling-related business."],
  ["mdi:recycle-variant", "Scrap Metal Handling", "We also handle scrap metal and related vehicle components."],
  ["mdi:truck-delivery-outline", "Nationwide Delivery", "Although walk-in customers are welcome, we also support delivery across Malaysia for customers outside Kedah."],
];

const parts = [
  ["mdi:engine", "Engine"],
  ["mdi:car-shift-pattern", "Gearbox"],
  ["mdi:car-door", "Door"],
  ["mdi:car-hatchback", "Bonnet"],
  ["mdi:car-bumper", "Bumper"],
  ["mdi:car-light-high", "Headlamp"],
  ["mdi:car-light-dimmed", "Tail Lamp"],
  ["mdi:car-side-mirror", "Side Mirror"],
  ["mdi:coolant-temperature", "Radiator"],
  ["mdi:air-conditioner", "Compressor"],
  ["mdi:speedometer", "Dashboard"],
  ["mdi:car-seat", "Seat"],
  ["mdi:car-scissor-door", "Half-Cut Parts"],
  ["mdi:car-body", "Body Components"],
  ["mdi:cog", "Mechanical Components"],
];

const brands = [
  ["simple-icons:toyota", "Toyota"],
  ["simple-icons:honda", "Honda"],
  ["simple-icons:nissan", "Nissan"],
  ["simple-icons:mazda", "Mazda"],
  ["simple-icons:mitsubishi", "Mitsubishi"],
  ["simple-icons:suzuki", "Suzuki"],
  ["simple-icons:subaru", "Subaru"],
  ["simple-icons:isuzu", "Isuzu"],
  ["simple-icons:daihatsu", "Daihatsu"],
  ["simple-icons:lexus", "Lexus"],
];

const gallery = [
  ["autoparts-yard-wide", "Yard Overview", "large"],
  ["engine-parts-row", "Engine Parts", "medium"],
  ["gearbox-units-stack", "Gearbox Units", "medium"],
  ["company-front-auto-parts", "Company Front", "medium"],
  ["parts-storage-shelves", "Parts Storage", "medium"],
  ["headlamp-parts-row", "Headlamp Parts", "small"],
  ["car-bumper-stack", "Bumper Storage", "small"],
  ["car-door-storage", "Door Storage", "small"],
  ["vehicle-dismantling-area", "Vehicle Dismantling Area", "small"],
  ["dashboard-parts-pile", "Dashboard Parts", "small"],
  ["radiator-cooling-parts", "Radiator Parts", "small"],
  ["worker-loading-parts", "Parts Loading", "small"],
  ["scrap-vehicles-line", "Scrap Vehicles", "small"],
  ["seat-interior-parts", "Seat and Interior Parts", "small"],
  ["halfcut-vehicle-frame", "Half-Cut Vehicle Frame", "small"],
  ["compressor-ac-parts", "Compressor and AC Parts", "small"],
  ["mirror-side-lights", "Side Mirrors and Lights", "small"],
];

const steps = [
  ["Send Your Car Details", "Send us your car model, year, and the part you are looking for."],
  ["Send Photos if Available", "A clear photo of the part or vehicle helps us check faster."],
  ["Get a Reply via WhatsApp", "Our team will respond and assist based on availability."],
  ["Walk In or Arrange Delivery", "Walk in to our location, or arrange delivery across Malaysia."],
];

const photoNotes = [
  "Put uploaded photos in `public/` unless we later switch everything to a dedicated `public/photos/` folder.",
  "If the photo has a title, use that title in the file name, for example `about-main.png` or `engine-parts.png`.",
  "If it has no title, use a simple sequence like `1.png`, `2.png`, `3.png`.",
];

const heroImage = "/HeroPage.png";
const brandLogoImage = "/gt-planet-logo.png";
const exactAddress = "Lot 991, 225, Mukim Sungai Pasir, 08000 Sungai Petani, Kedah, Malaysia";
const mapDestination = `GT PLANET AUTO PARTS SDN BHD, ${exactAddress}`;
const encodedMapDestination = encodeURIComponent(mapDestination);

const aboutImage = {
  src: "/about-main.png",
  alt: "GT Planet Auto Parts warehouse interior in Sungai Petani",
};

const galleryPhotos = [
  { src: "/HeroPage.png", label: "Yard Overview", size: "large" },
  { src: "/engine-parts.png", label: "Engine Parts", size: "medium" },
  { src: "/gearbox-units.png", label: "Gearbox Units", size: "medium" },
  { src: "/company-front.jpg", label: "Company Front", size: "medium" },
  { src: "/parts-storage.jpg", label: "Parts Storage", size: "medium" },
  { src: "/headlamp-parts.jpg", label: "Headlamp Parts", size: "small" },
  { src: "/1.png", label: "1", size: "small" },
  { src: "/2.png", label: "2", size: "small" },
  { src: "/3.png", label: "3", size: "small" },
  { src: "/4.png", label: "4", size: "small" },
  { src: "/5.png", label: "5", size: "small" },
  { src: "/6.png", label: "6", size: "small" },
  { src: "/7.png", label: "7", size: "small" },
  { src: "/8.png", label: "8", size: "small" },
  { src: "/9.png", label: "9", size: "small" },
  { src: "/10.png", label: "10", size: "small" },
  { src: "/11.png", label: "11", size: "small" },
];

function whatsappUrl(message = defaultMessage) {
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
}

function Icon({ icon, className = "", width = 20 }) {
  return <span className={`iconify ${className}`} data-icon={icon} data-width={width} aria-hidden="true" />;
}

function Logo({ compact = false }) {
  return (
    <div className="flex items-center">
      <img
        src={brandLogoImage}
        alt={compact ? "GT Planet Auto Parts" : "GT Planet Auto Parts Sdn. Bhd."}
        className={compact ? "h-14 w-auto object-contain" : "h-16 w-auto object-contain"}
      />
    </div>
  );
}

function SectionLabel({ children, centered = false, dark = false }) {
  return (
    <div className={`mb-4 flex items-center gap-3 ${centered ? "justify-center" : ""}`}>
      <span className="h-1 w-[60px] bg-brand-red" />
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
        {children}
      </span>
      {centered ? <span className="h-1 w-[60px] bg-brand-red" /> : null}
    </div>
  );
}

function handleImageFallback(event) {
  if (event.currentTarget.dataset.fallbackApplied === "true") return;
  event.currentTarget.dataset.fallbackApplied = "true";
  event.currentTarget.src = heroImage;
}

function GalleryItem({ item, onOpen }) {
  const { src, label, size } = item;
  const isLarge = size === "large";
  const isMedium = size === "medium";

  return (
    <button
      type="button"
      onClick={() => onOpen({ src, label })}
      className={[
        "group relative w-full overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 text-left",
        isLarge ? "col-span-full h-[300px] md:h-[500px]" : "",
        isMedium ? "h-[180px] md:h-[250px]" : "h-[140px] md:h-[200px]",
      ].join(" ")}
      aria-label={`Open gallery image: ${label}`}
    >
      <img
        src={src}
        alt={`${label} at GT Planet Auto Parts`}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading={isLarge ? "eager" : "lazy"}
        onError={handleImageFallback}
      />
      <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
      {isLarge || isMedium ? (
        <span className="absolute bottom-4 left-4 rounded bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
          {label}
        </span>
      ) : null}
    </button>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen || lightbox ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, lightbox]);

  useEffect(() => {
    const sentinel = document.getElementById("nav-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(([entry]) => {
      setNavScrolled(!entry.isIntersecting);
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = document.querySelectorAll(".scroll-reveal");

    if (reducedMotion) {
      items.forEach((item) => item.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const siblings = entry.target.parentElement?.querySelectorAll(".scroll-reveal") ?? [];
          const index = Array.from(siblings).indexOf(entry.target);
          setTimeout(() => entry.target.classList.add("revealed"), Math.min(Math.max(index, 0) * 80, 400));
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const close = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setLightbox(null);
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);

  const enquireMessage = "Hi GT Planet, I would like to enquire about a part.\n\nCar Model: \nYear: \nPart Needed: ";

  return (
    <main className="bg-white text-zinc-900">
      <span id="nav-sentinel" className="absolute top-0 h-px w-px" aria-hidden="true" />

      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navScrolled ? "nav-scrolled" : "bg-transparent"}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
          <a href="#home" aria-label="GT Planet Auto Parts home">
            <Logo compact />
          </a>
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map(([label, href]) => (
              <a key={label} href={href} className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener"
              className="group hidden items-center gap-2 rounded border-2 border-brand-red bg-black/35 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(220,38,38,0.2)] transition-colors hover:bg-brand-red md:flex"
            >
              <Icon icon="mdi:whatsapp" className="text-brand-red group-hover:text-white" width={18} />
              WhatsApp Us
            </a>
            <button className="p-2 text-white lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <Icon icon="mdi:menu" width={28} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-panel fixed inset-y-0 right-0 z-[60] flex w-80 max-w-full flex-col bg-brand-dark ${menuOpen ? "is-open" : ""}`}>
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <span className="text-sm font-bold text-white">MENU</span>
          <button className="p-2 text-white" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <Icon icon="mdi:close" width={28} />
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-1 px-6 py-8">
          {navLinks.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)} className="border-b border-white/5 py-3 text-lg font-medium text-white/80 transition-colors hover:text-white">
              {label}
            </a>
          ))}
        </div>
        <div className="px-6 pb-8">
          <a href={whatsappUrl()} target="_blank" rel="noopener" className="flex w-full items-center justify-center gap-2 rounded bg-brand-red px-6 py-3.5 font-semibold text-white transition-colors hover:bg-brand-redDark">
            <Icon icon="mdi:whatsapp" />
            WhatsApp Us Now
          </a>
        </div>
      </div>
      {menuOpen ? <button className="fixed inset-0 z-[55] bg-black/50" aria-label="Close menu overlay" onClick={() => setMenuOpen(false)} /> : null}

      <section id="home" className="relative flex min-h-[100dvh] items-center overflow-hidden">
        <img src={heroImage} alt="GT Planet Auto Parts yard and parts inventory" className="absolute inset-0 h-full w-full object-cover" />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-28 md:px-8">
          <div className="max-w-3xl">
            <SectionLabel dark>Since 2006 / Sungai Petani, Kedah</SectionLabel>
            <h1 className="mb-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
              <span className="text-brand-red">GT</span> PLANET AUTO PARTS <span className="text-brand-red">SDN. BHD.</span>
            </h1>
            <p className="mb-10 max-w-2xl text-base font-light leading-relaxed text-zinc-300 md:text-lg">
              Quality used Japanese automotive spare parts for car owners, workshops, dealers, and business clients across Malaysia.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={whatsappUrl()} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded border-2 border-brand-red bg-brand-red px-7 py-4 text-sm font-semibold text-white shadow-[0_0_0_1px_rgba(220,38,38,0.45)] transition-colors hover:bg-brand-redDark">
                <Icon icon="mdi:whatsapp" />
                WhatsApp Us Now
              </a>
              <a href="#parts" className="inline-flex items-center gap-2 rounded border border-white/20 bg-white/10 px-7 py-4 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20">
                View Our Parts
                <Icon icon="mdi:arrow-down" width={16} />
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 px-4 py-4 text-sm font-medium text-white/70 transition-colors hover:text-white">
                <Icon icon="mdi:map-marker-outline" width={18} />
                Visit Our Location
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-brand-red/20 bg-[#0a0a0a]">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
            {[
              ["20+", "Years of Experience"],
              ["JP", "Japanese Imported Parts"],
              ["MY", "Nationwide Delivery"],
              ["OK", "Walk-in Available"],
            ].map(([value, label]) => (
              <div key={label} className="scroll-reveal px-4 py-6 text-center md:px-6 md:py-8">
                <div className="mb-1 text-2xl font-bold text-brand-red md:text-3xl">{value}</div>
                <div className="text-xs font-medium text-zinc-400 md:text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="scroll-reveal">
              <div className="relative">
                <img src={aboutImage.src} alt={aboutImage.alt} className="h-[400px] w-full rounded-lg object-cover md:h-[500px]" onError={handleImageFallback} />
                <div className="absolute -bottom-6 -right-6 hidden rounded-lg bg-brand-red p-6 text-white shadow-xl ring-1 ring-white/10 md:block">
                  <div className="text-3xl font-bold">20+</div>
                  <div className="text-sm font-medium text-white/80">Years in Business</div>
                </div>
              </div>
            </div>
            <div className="scroll-reveal">
              <SectionLabel>About Us</SectionLabel>
              <h2 className="mb-6 text-3xl font-bold leading-tight tracking-tight md:text-4xl">Trusted Used Auto Parts Supplier in Sungai Petani</h2>
              <p className="mb-5 leading-relaxed text-zinc-600">GT Planet Auto Parts Sdn. Bhd. is a used automotive spare parts company based in Sungai Petani, Kedah. Established in 2006, the company has around 20 years of experience in supplying used spare parts and components, mainly imported from Japan.</p>
              <p className="mb-5 leading-relaxed text-zinc-600">We serve a wide range of customers, including individual car owners, workshops, used car dealers, auto parts dealers, and company clients. With nationwide delivery available across Malaysia, GT Planet helps customers source reliable used auto parts for repair, replacement, and business needs.</p>
              <p className="mb-8 leading-relaxed text-zinc-600">Our business focuses on practical service, real inventory, and direct communication, making it easier for customers to find the right parts quickly.</p>
              <div className="flex flex-wrap gap-3">
                {["Individual Car Owners", "Workshops", "Used Car Dealers", "Auto Parts Dealers", "Company Clients"].map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1.5 rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-700">
                    <Icon icon="mdi:check-circle" className="text-brand-red" width={16} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="bg-zinc-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="scroll-reveal mb-14 text-center">
            <SectionLabel centered>What We Do</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Our Services</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map(([icon, title, text]) => (
              <article key={title} className="service-card scroll-reveal rounded-lg border border-zinc-200 bg-white p-8 transition-colors">
                <Icon icon={icon} className="service-icon mb-5 block text-4xl text-brand-metal transition-colors" width={40} />
                <h3 className="mb-3 text-lg font-semibold tracking-tight">{title}</h3>
                <p className="text-sm leading-relaxed text-zinc-500">{text}</p>
              </article>
            ))}
          </div>
          <div className="scroll-reveal mt-12 text-center">
            <a href={whatsappUrl("Hi GT Planet, I would like to enquire about your services.")} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded bg-brand-red px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-redDark">
              <Icon icon="mdi:whatsapp" />
              Enquire About Our Services
            </a>
          </div>
        </div>
      </section>

      <section id="parts" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="scroll-reveal mb-14 text-center">
            <SectionLabel centered>What We Have</SectionLabel>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Parts Categories</h2>
            <p className="mx-auto max-w-2xl text-zinc-500">Common used parts and components available through our yard and supplier network.</p>
          </div>
          <div className="scroll-reveal flex flex-wrap justify-center gap-3">
            {parts.map(([icon, name]) => (
              <button
                key={name}
                type="button"
                onClick={() => window.open(whatsappUrl(`Hi GT Planet, I am looking for: ${name}.\n\nCar Model: \nYear: `), "_blank", "noopener")}
                className="part-tag inline-flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-5 py-3 text-sm font-medium text-zinc-700 transition-colors"
              >
                <Icon icon={icon} width={18} />
                {name}
              </button>
            ))}
          </div>
          <div className="scroll-reveal mt-12 text-center">
            <a href={whatsappUrl("Hi GT Planet, I cannot find the part I need on the website.\n\nCar Model: \nYear: \nPart Needed: ")} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded bg-brand-black px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-dark">
              <Icon icon="mdi:whatsapp" />
              Can't Find Your Part? WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="scroll-reveal mb-14 text-center">
            <SectionLabel centered>Vehicle Brands</SectionLabel>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Japanese Vehicle Parts We Commonly Handle</h2>
            <p className="mx-auto max-w-2xl text-zinc-500">Send your car model, year, and required part so our team can check availability faster.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {brands.map(([icon, brand]) => (
              <button
                key={brand}
                type="button"
                onClick={() => window.open(whatsappUrl(`Hi GT Planet, I am looking for ${brand} parts.\n\nCar Model: \nYear: \nPart Needed: `), "_blank", "noopener")}
                className="brand-card scroll-reveal rounded-lg border border-zinc-200 bg-white p-6 text-center transition-colors"
              >
                <Icon icon={icon} className="mx-auto mb-4 block text-zinc-400" width={48} />
                <span className="text-sm font-semibold text-zinc-700">{brand}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="scroll-reveal mb-14 text-center">
            <SectionLabel centered>Our Yard & Parts</SectionLabel>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Gallery & Yard Showcase</h2>
            <p className="mx-auto max-w-2xl text-zinc-500">Photos from a physical auto-parts yard setting, showing the kind of inventory customers can enquire about.</p>
          </div>
          <div className="scroll-reveal grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryPhotos.map((item) => (
              <GalleryItem key={item.src} item={item} onOpen={setLightbox} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-black py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="scroll-reveal mb-14 text-center">
            <SectionLabel centered dark>Simple Process</SectionLabel>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">How to Enquire for Parts</h2>
            <p className="mx-auto max-w-2xl text-zinc-400">A clear message helps us check availability and respond faster.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([title, text], index) => (
              <article key={title} className="step-card scroll-reveal rounded-lg border border-white/10 bg-white/5 p-6 transition-colors hover:border-brand-red">
                <div className="step-num mb-5 flex h-12 w-12 items-center justify-center rounded-full border-2 border-zinc-700 text-lg font-bold text-zinc-400 transition-colors">
                  {index + 1}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">{title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{text}</p>
              </article>
            ))}
          </div>
          <div className="scroll-reveal mt-12 text-center">
            <a href={whatsappUrl(enquireMessage)} target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded bg-brand-red px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-redDark">
              <Icon icon="mdi:whatsapp" />
              Start Enquiring Now
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="scroll-reveal mb-14 text-center">
            <SectionLabel centered>Get In Touch</SectionLabel>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Contact Us</h2>
            <p className="mx-auto max-w-2xl text-zinc-500">Reach out via WhatsApp for the fastest response. Walk-in visitors are welcome.</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
            <div className="scroll-reveal space-y-6 lg:col-span-2">
              <a href={whatsappBase} target="_blank" rel="noopener" className="group flex items-start gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-5 transition-colors hover:border-brand-red">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-green-500 text-white"><Icon icon="mdi:whatsapp" width={24} /></span>
                <span>
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">WhatsApp</span>
                  <span className="block font-semibold text-zinc-900 transition-colors group-hover:text-brand-red">+60 19-443 2950</span>
                  <span className="mt-1 block text-xs text-zinc-400">Click to chat directly</span>
                </span>
              </a>
              <a href="mailto:gtplanet72@gmail.com" className="group flex items-start gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-5 transition-colors hover:border-brand-red">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brand-red text-white"><Icon icon="mdi:email-outline" width={24} /></span>
                <span>
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">Email</span>
                  <span className="block font-semibold text-zinc-900 transition-colors group-hover:text-brand-red">gtplanet72@gmail.com</span>
                </span>
              </a>
              <div className="flex items-start gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-5">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-brand-black text-white"><Icon icon="mdi:map-marker" width={24} /></span>
                <span>
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">Address</span>
                  <span className="block text-sm font-semibold leading-relaxed text-zinc-900">{exactAddress}</span>
                </span>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-zinc-200 bg-zinc-50 p-5">
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-700 text-white"><Icon icon="mdi:clock-outline" width={24} /></span>
                <span>
                  <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-400">Business Hours</span>
                  <span className="block font-semibold text-zinc-900">Monday - Saturday</span>
                  <span className="block text-sm text-zinc-500">9:00 AM - 5:30 PM</span>
                  <span className="mt-1 block text-xs text-zinc-400">Sunday & Public Holiday: Closed</span>
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
                <Icon icon="mdi:check-decagram" className="text-green-600" />
                <span className="text-sm font-medium text-green-800">Walk-in available - no appointment required</span>
              </div>
              <div className="flex gap-3">
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodedMapDestination}`} target="_blank" rel="noopener" className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white py-3 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400">
                  <Icon icon="mdi:google" width={18} />
                  Google Maps
                </a>
                <a href={`https://waze.com/ul?q=${encodedMapDestination}&navigate=yes`} target="_blank" rel="noopener" className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-300 bg-white py-3 text-sm font-medium text-zinc-700 transition-colors hover:border-zinc-400">
                  <Icon icon="mdi:navigation-variant" width={18} />
                  Waze
                </a>
              </div>
            </div>
            <div className="scroll-reveal lg:col-span-3">
              <div className="h-full min-h-[400px] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100 lg:min-h-[600px]">
                <iframe
                  src={`https://www.google.com/maps?q=${encodedMapDestination}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 400 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="GT Planet Auto Parts location on Google Maps"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-brand-black">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="lg:col-span-2">
              <div className="mb-5"><Logo /></div>
              <p className="mb-6 max-w-md text-sm leading-relaxed text-zinc-400">
                Reliable used auto parts supplier since 2006. Specializing in Japanese imported spare parts and components. Based in Sungai Petani, Kedah with nationwide delivery across Malaysia.
              </p>
              <div className="flex gap-3">
                <a href="#" className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-brand-red hover:bg-brand-red hover:text-white" aria-label="Facebook" title="Facebook coming soon">
                  <Icon icon="mdi:facebook" />
                </a>
                <a href={whatsappBase} target="_blank" rel="noopener" className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-green-600 hover:bg-green-600 hover:text-white" aria-label="WhatsApp">
                  <Icon icon="mdi:whatsapp" />
                </a>
                <a href="mailto:gtplanet72@gmail.com" className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-zinc-400 transition-colors hover:border-brand-red hover:bg-brand-red hover:text-white" aria-label="Email">
                  <Icon icon="mdi:email-outline" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="mb-5 text-sm font-semibold tracking-wide text-white">QUICK LINKS</h4>
              <ul className="space-y-3">
                {navLinks.map(([label, href]) => (
                  <li key={label}><a href={href} className="text-sm text-zinc-400 transition-colors hover:text-white">{label === "Parts" ? "Parts Categories" : label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-5 text-sm font-semibold tracking-wide text-white">CONTACT</h4>
              <ul className="space-y-3 text-sm text-zinc-400">
                <li className="flex items-start gap-2"><Icon icon="mdi:whatsapp" className="mt-0.5 flex-shrink-0 text-brand-red" width={16} /><a href={whatsappBase} target="_blank" rel="noopener" className="hover:text-white">+60 19-443 2950</a></li>
                <li className="flex items-start gap-2"><Icon icon="mdi:email-outline" className="mt-0.5 flex-shrink-0 text-brand-red" width={16} /><a href="mailto:gtplanet72@gmail.com" className="hover:text-white">gtplanet72@gmail.com</a></li>
                <li className="flex items-start gap-2"><Icon icon="mdi:map-marker" className="mt-0.5 flex-shrink-0 text-brand-red" width={16} /><span>Lot 991, 225, Mukim Sungai Pasir, 08000 Sungai Petani, Kedah</span></li>
                <li className="flex items-start gap-2"><Icon icon="mdi:clock-outline" className="mt-0.5 flex-shrink-0 text-brand-red" width={16} /><span>Mon-Sat: 9:00 AM - 5:30 PM</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-8">
            <p className="text-xs text-zinc-500">&copy; 2026 GT Planet Auto Parts Sdn. Bhd. All rights reserved.</p>
            <p className="text-xs text-zinc-600">Registration: GT PLANET AUTO PARTS SDN. BHD. / 环宇汽车机件有限公司</p>
          </div>
        </div>
      </footer>

      <a href={whatsappUrl()} target="_blank" rel="noopener" className="whatsapp-float fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition-colors hover:bg-green-600" aria-label="Chat on WhatsApp" title="Chat with us on WhatsApp">
        <Icon icon="mdi:whatsapp" width={28} />
      </a>

      {lightbox ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4" onClick={() => setLightbox(null)}>
          <button className="absolute right-6 top-6 p-2 text-white/70 transition-colors hover:text-white" onClick={() => setLightbox(null)} aria-label="Close lightbox">
            <Icon icon="mdi:close" width={32} />
          </button>
          <img src={lightbox.src} alt={lightbox.label} className="max-h-[85vh] max-w-full rounded object-contain" onClick={(event) => event.stopPropagation()} />
        </div>
      ) : null}
    </main>
  );
}

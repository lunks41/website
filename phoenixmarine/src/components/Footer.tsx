import Image from "next/image";
import Link from "next/link";
import { company, navLinks } from "@/data/company";

export function Footer() {
  const year = new Date().getFullYear();
  const wa = `https://wa.me/${company.whatsapp}`;

  return (
    <footer className="px-footer">
      <div className="wrap px-footer-top">
        <div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", marginBottom: "0.75rem" }}>
            <Image src="/logo.png" alt="" width={42} height={42} />
            <strong style={{ fontFamily: "var(--font-display)", letterSpacing: "0.08em", color: "#fff" }}>
              PHOENIX MARINE
            </strong>
          </div>
          <p>
            {company.nameAr}
            <br />
            {company.address}
          </p>
        </div>
        <div>
          <h4>Navigate</h4>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div>
          <h4>Contact</h4>
          <a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={wa} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <p>TRN {company.trn}</p>
        </div>
      </div>
      <div className="wrap px-footer-bottom">
        <span>
          © {year} {company.name}
        </span>
        <span>{company.location}</span>
      </div>
    </footer>
  );
}

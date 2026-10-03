import Image from "next/image";
import Link from "next/link";
import { company, navLinks, groupCompanies } from "@/data/company";

export function Footer() {
  const year = new Date().getFullYear();
  const wa = `https://wa.me/${company.whatsapp}`;

  return (
    <footer className="arc-footer">
      <div className="wrap arc-footer-top">
        <div>
          <Image src="/images/icons/header_icons/logo.svg" alt="" width={160} height={44} />
          <p>{company.tagline}</p>
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
          <h4>Group</h4>
          {groupCompanies.map((g) => (
            <a key={g.name} href={g.href} target="_blank" rel="noopener noreferrer">
              {g.name}
            </a>
          ))}
        </div>
        <div>
          <h4>Contact</h4>
          <a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a>
          <a href={`tel:${company.phoneDubai.replace(/\s/g, "")}`}>{company.phoneDubai}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <a href={wa} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
      <div className="wrap arc-footer-bottom">
        <span>
          © {year} {company.name}
        </span>
        <span>{company.location}</span>
      </div>
    </footer>
  );
}

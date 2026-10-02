import Image from "next/image";
import Link from "next/link";
import { company, navLinks } from "@/data/company";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="fx-footer">
      <div className="wrap fx-footer-top">
        <div className="fx-footer-brand">
          <Image src="/logo.png" alt="" width={64} height={64} />
          <div>
            <strong>Finix Marine</strong>
            <p>
              {company.nameAr}
              <br />
              Marine services from Fujairah — water, crew, customs, logistics.
            </p>
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div>
          <h4>Reach us</h4>
          <p className="muted">{company.address}</p>
          <a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <p className="muted">TRN {company.trn}</p>
        </div>
      </div>
      <div className="wrap fx-footer-bottom">
        <span>
          © {year} {company.name}
        </span>
        <span>{company.location}</span>
      </div>
    </footer>
  );
}

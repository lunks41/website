import Image from "next/image";
import Link from "next/link";
import { company, navLinks } from "@/data/company";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Image src="/logo.png" alt={company.name} width={160} height={42} />
          <p>
            Marine boat and barge services from Port of Fujairah — fresh water, goods, and crew
            transportation bay to vessel.
          </p>
        </div>
        <div className="footer-col">
          <h4>Navigate</h4>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <div className="footer-col">
          <h4>Operations</h4>
          <p>{company.address}</p>
          <a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <p>{company.hours}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {year} {company.name}. All rights reserved.
        </span>
        <span>{company.location}</span>
      </div>
    </footer>
  );
}

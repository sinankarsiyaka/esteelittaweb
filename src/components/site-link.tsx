import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/** Sayfa içi çıpalar düz <a> olarak kalır; ana sayfadaki yumuşak kaydırma
    davranışı böylece değişmez. Sayfa adresleri next/link ile ön yüklenir. */
export function SiteLink({ href, children, ...rest }: Props) {
  if (href.startsWith("#") || href.startsWith("http")) {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

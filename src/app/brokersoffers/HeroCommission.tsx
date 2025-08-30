import Image from "next/image";
import Link from "next/link";
import cls from "./index.module.scss";

type Stat = { value: string; label: string };

type Props = {
  background?: string;
  headline?: string;
  subtext?: string;
  ctaText?: string;
  ctaHref?: string;
  stats?: Stat[];
  className?: string;
};

export default function HeroCommission({
  background = "/blog2.webp", 
  headline = "Keep Up To 100% Commission",
  subtext = "Revolutionary commission structure that lets you keep what you earn. No caps, no limits, just pure profit potential.",
  ctaText = "Calculate Your Earnings",
  ctaHref = "#",
  stats = [
    { value: "90–100%", label: "Commission Split" },
    { value: "24/7", label: "Support" },
    { value: "10K+", label: "Active Brokers" },
    { value: "0%", label: "Extra Fees" },
  ],
  className,
}: Props) {
  const blur =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMScgaGVpZ2h0PScxJyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnPjxyZWN0IHdpZHRoPTEgaGVpZ2h0PTEgZmlsbD0nI2M2YzRmNCcvPjwvc3ZnPg==";

  return (
    <section className={`${cls.wrap} ${className || ""}`}>
      <div className={cls.bg}>
        <Image
          src={background}
          alt="Background"
          fill
          priority
          sizes="100vw"
          className={cls.bgImg}
          placeholder="blur"
          blurDataURL={blur}
        />
        <div className={cls.overlay} />
      </div>

      <div className={cls.inner}>
        <div className={cls.badge}>
          {/* ikonları sadə svg ilə veririk ki, JS gəlməsin */}
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V20h14v-3.5C15 14.17 10.33 13 8 13m8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V20h6v-3.5c0-2.33-4.67-3.5-7-3.5Z"/></svg>
          <span className={cls.badgeText}>Join with 10,000+ successful brokers</span>
        </div>

        <h1 className={cls.title}>{headline}</h1>
        <p className={cls.subtext}>{subtext}</p>

        {/* Client CTA – kiçik ada */}
        <div className={cls.ctaRow}>
          <Link href={ctaHref} className={cls.ctaBtn} aria-label={ctaText}>
            {ctaText}
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden className={cls.arrow}>
              <path fill="currentColor" d="M13 5l7 7l-7 7v-4H4v-6h9V5z"/>
            </svg>
          </Link>
        </div>

        <div className={cls.stats}>
          {stats.map((s, i) => (
            <div key={i} className={cls.statCard}>
              <span className={cls.statValue}>{s.value}</span>
              <span className={cls.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={cls.spark} aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M11 21l1.5-6.5L6 12l9-9l-1.5 6.5L18 12z"/></svg>
      </div>
    </section>
  );
}

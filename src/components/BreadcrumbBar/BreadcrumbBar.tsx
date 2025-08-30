"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import "./index.scss";
import { Container } from "../Lib/ProContainer/Container";

export type CrumbItem = { label: string; href?: string };

type BreadcrumbBarProps = {
    backLabel?: string;
    backHref?: string;
    items: CrumbItem[];
    className?: string;
};

export default function BreadcrumbBar({
    backLabel = "Back",
    backHref,
    items,
    className,
}: BreadcrumbBarProps) {
    const router = useRouter();

    return (
        <div className="breadcrumpblock">
            <Container>
                <nav aria-label="Breadcrumb" className={clsx("breadcrumb-bar", className)}>
                    {backHref ? (
                        <Link href={backHref} className="breadcrumb-back">
                            <ArrowLeftIcon className="arrow" />
                            <strong>{backLabel}</strong>
                        </Link>
                    ) : (
                        <button
                            type="button"
                            className="breadcrumb-back"
                            onClick={() => router.back()}
                            aria-label="Go back"
                        >
                            <ArrowLeftIcon className="arrow" />
                            <strong>{backLabel}</strong>
                        </button>
                    )}
                    <span className="breadcrumb-divider" aria-hidden="true" />
                    <ol className="crumbs">
                        {items.map((it, i) => {
                            const isLast = i === items.length - 1;
                            const label = it.label;
                            return (
                                <li key={i} {...(isLast ? { "aria-current": "page" } : {})}>
                                    {it.href && !isLast ? (
                                        <Link href={it.href}>{label}</Link>
                                    ) : (
                                        <span title={label}>{label}</span>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </Container>
        </div>

    );
}

function ArrowLeftIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

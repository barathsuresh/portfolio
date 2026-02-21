import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { navLinks } from "../data";
import "./Navbar.css";

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("");
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const ticking = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                requestAnimationFrame(() => {
                    setScrolled(window.scrollY > 40);
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // IntersectionObserver for active section
    useEffect(() => {
        const sections = navLinks
            .map(({ href }) => document.querySelector(href))
            .filter(Boolean) as Element[];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection("#" + entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        );

        sections.forEach((s) => observer.observe(s));
        return () => sections.forEach((s) => observer.unobserve(s));
    }, []);

    const handleNavClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        e.preventDefault();
        setMenuOpen(false);
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <motion.nav
            className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
            <div className="navbar__inner container">
                {/* Logo */}
                <a
                    href="#hero"
                    className="navbar__logo"
                    onClick={(e) => handleNavClick(e, "#hero")}
                >
                    BS
                </a>

                {/* Desktop links */}
                <ul className="navbar__links hide-mobile">
                    {navLinks.map(({ label, href }) => (
                        <li key={href}>
                            <a
                                href={href}
                                className={`navbar__link ${activeSection === href ? "navbar__link--active" : ""}`}
                                onClick={(e) => handleNavClick(e, href)}
                            >
                                {label}
                                {activeSection === href && (
                                    <motion.span
                                        className="navbar__link-dot"
                                        layoutId="nav-dot"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile hamburger */}
                <button
                    className="navbar__hamburger hide-desktop"
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label="Toggle menu"
                >
                    <span className={`navbar__bar ${menuOpen ? "navbar__bar--open" : ""}`} />
                    <span className={`navbar__bar ${menuOpen ? "navbar__bar--open" : ""}`} />
                </button>
            </div>

            {/* Mobile menu */}
            <motion.div
                className="navbar__mobile hide-desktop"
                initial={false}
                animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: "hidden" }}
            >
                <ul className="navbar__mobile-links">
                    {navLinks.map(({ label, href }) => (
                        <li key={href}>
                            <a
                                href={href}
                                className={`navbar__mobile-link ${activeSection === href ? "navbar__mobile-link--active" : ""}`}
                                onClick={(e) => handleNavClick(e, href)}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </motion.nav>
    );
}

import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from "react-icons/fi";
import { personal, socials } from "../data";
import { trackEvent } from "../utils/analytics";
import SectionReveal from "./SectionReveal";
import "./Socials.css";

const socialLinks = [
    { label: "GitHub", href: socials.github, icon: FiGithub },
    { label: "LinkedIn", href: socials.linkedin, icon: FiLinkedin },
    { label: "X / Twitter", href: socials.twitter, icon: FiTwitter },
    { label: "Email", href: socials.email, icon: FiMail },
];

export default function Socials() {
    return (
        <footer className="footer">
            <div className="container">
                <SectionReveal className="footer__inner">
                    <p className="footer__name">{personal.name}</p>

                    {/* Social icons */}
                    <div className="footer__socials">
                        {socialLinks.map((link, i) => (
                            <motion.a
                                key={link.label}
                                href={link.href}
                                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                                rel="noopener noreferrer"
                                className="footer__social"
                                aria-label={link.label}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                whileHover={{ y: -3 }}
                                onClick={() =>
                                    trackEvent("social_click", { platform: link.label })
                                }
                            >
                                <link.icon size={20} />
                                <span className="footer__social-label">{link.label}</span>
                                <span className="footer__social-line" />
                            </motion.a>
                        ))}
                    </div>

                    <p className="footer__copy">
                        © {new Date().getFullYear()} {personal.name} · Built with React & ❤️
                    </p>
                </SectionReveal>
            </div>
        </footer>
    );
}

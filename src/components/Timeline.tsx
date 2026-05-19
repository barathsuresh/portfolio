import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { education, experience } from "../data";
import SectionReveal from "./SectionReveal";
import "./Timeline.css";

type Tab = "experience" | "education";

export default function Timeline() {
    const [activeTab, setActiveTab] = useState<Tab>("experience");

    const items =
        activeTab === "experience"
            ? experience.map((e) => ({
                title: e.title,
                org: e.organization,
                sub: e.location,
                period: e.period,
                bullets: e.bullets,
            }))
            : education.map((e) => ({
                title: `${e.degree} in ${e.major}`,
                org: e.organization,
                sub: e.location,
                period: e.period,
                bullets: e.bullets,
            }));

    return (
        <section id="experience" className="section timeline-section">
            <div className="container">
                <SectionReveal>
                    <span className="section-label">Timeline</span>
                    <h2 className="section-title">Experience & Education</h2>
                    <div className="section-divider" />
                </SectionReveal>

                {/* Tab switcher */}
                <SectionReveal delay={0.1}>
                    <div className="timeline__tabs">
                        {(["experience", "education"] as Tab[]).map((tab) => (
                            <button
                                key={tab}
                                className={`timeline__tab ${activeTab === tab ? "timeline__tab--active" : ""}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                {activeTab === tab && (
                                    <motion.span
                                        className="timeline__tab-indicator"
                                        layoutId="tab-indicator"
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </SectionReveal>

                {/* Timeline content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        className="timeline__list"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {items.map((item, i) => (
                            <motion.div
                                key={i}
                                className="timeline__item"
                                initial={{ opacity: 0, x: -16 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.45,
                                    delay: i * 0.12,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                {/* Connector */}
                                <div className="timeline__connector">
                                    <div className="timeline__dot" />
                                    {i < items.length - 1 && <div className="timeline__line" />}
                                </div>

                                {/* Content */}
                                <div className="timeline__card">
                                    <div className="timeline__meta">
                                        <span className="timeline__period">{item.period}</span>
                                    </div>
                                    <h3 className="timeline__title">{item.title}</h3>
                                    <p className="timeline__org">
                                        {item.org}
                                        <span className="timeline__sub"> · {item.sub}</span>
                                    </p>
                                    <ul className="timeline__bullets">
                                        {item.bullets.map((b, j) => (
                                            <li key={j} className="timeline__bullet">
                                                <span className="timeline__bullet-dot" />
                                                {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

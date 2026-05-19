import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { personal } from "../data";
import "./About.css";
import AvatarBoil from "./AvatarBoil";
import SectionReveal from "./SectionReveal";

const chips = [
    { label: "Location", value: personal.location },
    { label: "Role", value: personal.role },
    { label: "Interests", value: personal.interests.join(", ") },
];

export default function About() {
    const chipsRef = useRef<HTMLDivElement>(null);
    const chipsInView = useInView(chipsRef, { once: true, margin: "-60px" });

    return (
        <section id="about" className="section about">
            <div className="container">
                <SectionReveal>
                    <span className="section-label">About</span>
                    <h2 className="section-title">Who I Am</h2>
                    <div className="section-divider" />
                </SectionReveal>

                <div className="about__grid">
                    {/* Left – Avatar with line-boil scribble border */}
                    <SectionReveal delay={0.1} className="about__avatar-wrap">
                        <div className="avatar-boil-wrap">
                            {/* Hand-drawn boiling circle SVG — drawn on top */}
                            <AvatarBoil />

                            {/* Circular photo inset inside the scribble ring */}
                            <div className="avatar-boil-photo">
                                {personal.profileImage ? (
                                    <img
                                        src={personal.profileImage}
                                        alt={personal.name}
                                        loading="lazy"
                                        className="about__photo"
                                    />
                                ) : (
                                    <div className="about__avatar-placeholder">
                                        <span>
                                            {personal.name
                                                .split(" ")
                                                .map((n) => n[0])
                                                .join("")}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </SectionReveal>

                    {/* Right – Content */}
                    <div className="about__info">
                        <SectionReveal delay={0.15}>
                            <p className="about__bio">{personal.about}</p>
                        </SectionReveal>

                        <div className="about__chips" ref={chipsRef}>
                            {chips.map((chip, i) => (
                                <motion.div
                                    key={chip.label}
                                    className="about__chip"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={chipsInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{
                                        duration: 0.45,
                                        delay: 0.25 + i * 0.1,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <span className="about__chip-label">{chip.label}</span>
                                    <span className="about__chip-value">{chip.value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { projects } from "../data";
import { trackEvent } from "../utils/analytics";
import "./Projects.css";
import SectionReveal from "./SectionReveal";

export default function Projects() {
    const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
    const [activeFilter, setActiveFilter] = useState("All");
    const gridRef = useRef<HTMLDivElement>(null);
    const gridInView = useInView(gridRef, { once: true, margin: "-60px" });

    const filtered =
        activeFilter === "All"
            ? projects
            : projects.filter((p) => p.tags.includes(activeFilter));

    return (
        <section id="projects" className="section projects-section">
            <div className="container">
                <SectionReveal>
                    <span className="section-label">Work</span>
                    <h2 className="section-title">Projects</h2>
                    <div className="section-divider" />
                </SectionReveal>

                {/* Filter chips */}
                <SectionReveal delay={0.1}>
                    <div className="projects__filters">
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                className={`projects__filter ${activeFilter === tag ? "projects__filter--active" : ""}`}
                                onClick={() => setActiveFilter(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </SectionReveal>

                {/* Cards grid */}
                <div className="projects__grid" ref={gridRef}>
                    {filtered.map((project, i) => (
                        <motion.a
                            key={project.name}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-card"
                            initial={{ opacity: 0, y: 28 }}
                            animate={gridInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                duration: 0.5,
                                delay: i * 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            whileHover={{ y: -5 }}
                            onClick={() => trackEvent("project_click", { project_name: project.name })}
                        >
                            <div className="project-card__header">
                                <div>
                                    <h3 className="project-card__name">{project.name}</h3>
                                    <p className="project-card__tagline">{project.description}</p>
                                </div>
                                <span className="project-card__arrow">↗</span>
                            </div>

                            <p className="project-card__desc">{project.longDescription}</p>

                            <div className="project-card__tags">
                                {project.tags.slice(0, 5).map((tag) => (
                                    <span key={tag} className="project-card__tag">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}

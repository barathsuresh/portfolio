import SectionReveal from "./SectionReveal";
import SkillsGlobe from "./SkillsGlobe";

export default function Skills() {
    return (
        <section id="skills" className="section skills-section">
            <div className="container">
                <SectionReveal>
                    <span className="section-label">Expertise</span>
                    <h2 className="section-title">Skills</h2>
                    <div className="section-divider" />
                </SectionReveal>

                <SectionReveal delay={0.15}>
                    <SkillsGlobe />
                </SectionReveal>
            </div>
        </section>
    );
}

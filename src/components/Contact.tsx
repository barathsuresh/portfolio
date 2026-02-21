import { personal } from "../data";
import "./Contact.css";
import SectionReveal from "./SectionReveal";

export default function Contact() {
    return (
        <section id="contact" className="section contact-section">
            <div className="container">
                <SectionReveal>
                    <span className="section-label">Get in Touch</span>
                    <h2 className="section-title">Contact</h2>
                    <div className="section-divider" />
                </SectionReveal>

                <div className="contact__grid">
                    {/* Info card */}
                    <SectionReveal delay={0.1} className="contact__info">
                        <p className="contact__open">{personal.openTo}</p>
                        <div className="contact__details">
                            <div className="contact__detail">
                                <span className="contact__detail-label">Email</span>
                                <a href={`mailto:${personal.email}`} className="contact__detail-value contact__link">
                                    {personal.email}
                                </a>
                            </div>
                            <div className="contact__detail">
                                <span className="contact__detail-label">Location</span>
                                <span className="contact__detail-value">{personal.location}</span>
                            </div>
                            <div className="contact__detail">
                                <span className="contact__detail-label">Availability</span>
                                <span className="contact__detail-value contact__status">
                                    <span className="contact__status-dot" />
                                    Open to opportunities
                                </span>
                            </div>
                        </div>
                    </SectionReveal>

                    {/* Form */}
                    <SectionReveal delay={0.2} className="contact__form-wrap">
                        <form
                            className="contact__form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target as HTMLFormElement;
                                const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                                const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                                const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;
                                window.location.href = `mailto:${personal.email}?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;
                            }}
                        >
                            <div className="contact__row">
                                <div className="contact__field">
                                    <label htmlFor="name" className="contact__label">Name</label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Your name"
                                        className="contact__input"
                                    />
                                </div>
                                <div className="contact__field">
                                    <label htmlFor="email" className="contact__label">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="your@email.com"
                                        className="contact__input"
                                    />
                                </div>
                            </div>
                            <div className="contact__field">
                                <label htmlFor="message" className="contact__label">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    placeholder="What's on your mind?"
                                    className="contact__input contact__textarea"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary contact__submit">
                                Send Message
                            </button>
                        </form>
                    </SectionReveal>
                </div>
            </div>
        </section>
    );
}

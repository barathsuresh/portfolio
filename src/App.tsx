import { AnimatePresence } from "framer-motion";
import { useCallback, useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Socials from "./components/Socials";
import Timeline from "./components/Timeline";
import "./styles/globals.css";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <AnimatePresence>
        {!loaded && <Loader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      {loaded && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Timeline />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Socials />
        </>
      )}
    </>
  );
}

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Terminal from "@/components/sections/Terminal";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      {/* Skip navigation — keyboard accessibility (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:rounded focus:font-mono focus:text-sm"
        style={{ background: "var(--color-accent)", color: "#080808" }}
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Terminal />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import { ThemeProvider } from "./hooks/useTheme";
import Navbar from "./components/sections/Navbar";
import Footer from "./components/sections/Footer";
import StarField from "./components/sections/StarField";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";
import "./App.css";

function Portfolio() {
  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <StarField />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  );
}
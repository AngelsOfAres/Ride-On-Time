import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import RaidProgress from './components/RaidProgress';
import Roster from './components/Roster';
import AOTCTeam from './components/aotc';
import Recruitment from './components/Recruitment';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <RaidProgress />
        <Roster />
        <AOTCTeam />
        <Recruitment />
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
}
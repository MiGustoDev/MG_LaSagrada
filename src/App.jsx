import Header from './components/Header';
import TitleSection from './components/TitleSection';
import HeroSection from './components/HeroSection';
import CountdownSection from './components/CountdownSection';
import IngredientsSection from './components/IngredientsSection';
import MarqueeSection from './components/MarqueeSection';
import PreLaunchSection from './components/PreLaunchSection';
import PreLaunchMarquee from './components/PreLaunchMarquee';
import Footer from './components/Footer';

function App() {
  return (
    <div className="dark">
      <Header />
      <main>
        <TitleSection />
        <HeroSection />
        <CountdownSection />
        <IngredientsSection />
        <MarqueeSection />
      </main>
      <PreLaunchSection />
      <PreLaunchMarquee />
      <Footer />
    </div>
  );
}

export default App;

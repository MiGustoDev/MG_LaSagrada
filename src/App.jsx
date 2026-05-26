import Header from './components/Header';
import HeroSection from './components/HeroSection';
import IngredientsSection from './components/IngredientsSection';
import PreLaunchSection from './components/PreLaunchSection';
import PreLaunchMarquee from './components/PreLaunchMarquee';
import Footer from './components/Footer';

function App() {
  return (
    <div className="dark">
      <Header />
      <main>
        <HeroSection />
        <IngredientsSection />
        <PreLaunchMarquee />
      </main>
      <PreLaunchSection />
      <Footer />
    </div>
  );
}

export default App;

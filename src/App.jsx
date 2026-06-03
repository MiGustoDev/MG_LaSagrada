import { useEffect } from 'react';
import ComingSoonScreen from './components/ComingSoonScreen';
import { supabase } from './utils/supabase';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import IngredientsSection from './components/IngredientsSection';
import PreLaunchMarquee from './components/PreLaunchMarquee';
import Footer from './components/Footer';

// Cambiar a true cuando quieras volver a mostrar el sitio completo
const SHOW_FULL_SITE = false;

function FullSite() {
  return (
    <div className="dark">
      <Header />
      <main>
        <HeroSection />
        <IngredientsSection />
        <PreLaunchMarquee />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    async function verifySupabase() {
      if (!supabase) {
        console.warn('[Supabase] Variables de entorno no configuradas');
        return;
      }
      const { error } = await supabase.auth.getSession();
      if (error) {
        console.error('[Supabase] Error de conexión:', error.message);
        return;
      }
      if (import.meta.env.DEV) {
        console.info('[Supabase] Cliente inicializado correctamente');
      }
    }

    verifySupabase();
  }, []);

  if (!SHOW_FULL_SITE) {
    return <ComingSoonScreen />;
  }

  return <FullSite />;
}

export default App;

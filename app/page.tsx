import Navigation from './components/Navigation';
import Hero from './components/Hero';
import OmOss from './components/OmOss';
import EventsCarousel from './components/EventsCarousel';
import Calendar from './components/Calendar';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <OmOss />
      <EventsCarousel />
      <Calendar />
      <Footer />
    </>
  );
}

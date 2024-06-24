import { Routes, Route } from 'react-router-dom';
import { Header } from './header/Header';
import { Footer } from './footer/Footer';
import { NotFoundPage } from './screens/notFoundPage/NotFoundPage';
import { Home } from './screens/home/Home';
import { Weather } from './screens/weather/Weather';
import { CurrencyConverter } from './screens/currencyConverter/CurrencyConverter';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/currency-converter" element={<CurrencyConverter />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;

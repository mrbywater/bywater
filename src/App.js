import './App.scss';
import {Routes, Route} from 'react-router-dom';
import {Header} from './Content/Header/Header.js';
import {Footer} from './Content/Footer/Footer.js';
import {NotFoundPage} from './Content/Components/NotFoundPage.js';
import {Home} from './Content/Screens/Home.js';
import {Weather} from './Content/Screens/Weather.js';
import {CurrencyConverter} from './Content/Screens/CurrencyConverter.js';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/weather" element={<Weather />}/>
        <Route path="/currency-converter" element={<CurrencyConverter />}/>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

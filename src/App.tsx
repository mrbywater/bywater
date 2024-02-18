import './App.scss';
import {Routes, Route} from 'react-router-dom';
import {Header} from './Content/Header/Header';
import {Footer} from './Content/Footer/Footer';
import {NotFoundPage} from './Content/Components/NotFoundPage';
import {Home} from './Content/Screens/Home';
import {Weather} from './Content/Screens/Weather';
import {CurrencyConverter} from './Content/Screens/CurrencyConverter';

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

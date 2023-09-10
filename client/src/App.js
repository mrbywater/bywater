import './App.scss';
import {Routes, Route} from 'react-router-dom';
import {Header} from './Components/Header/Header.js';
import {Footer} from './Components/Footer/Footer.js';
import {Home} from './Components/Content/Home.js';
import {ToDoList} from './Components/Content/ToDoList.js';
import {Weather} from './Components/Content/Weather.js';
import {CurrencyCalculator} from './Components/Content/CurrencyCalculator.js';
import {NotFoundPage} from './Components/Content/NotFoundPage.js';

function App() {
  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/to-do-list" element={<ToDoList />}/>
        <Route path="/weather" element={<Weather />}/>
        <Route path="/currency-calculator" element={<CurrencyCalculator />}/>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

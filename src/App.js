import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import BbsUpdatePage from './bbs/component/pages/BbsUpdatePage';
import BbsViewPage from './bbs/component/pages/BbsViewPage';
import BbsWritePage from './bbs/component/pages/BbsWritePage';
import ForecastPage from './bbs/component/pages/ForecastPage';
import HomePage from './bbs/component/pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <h2>React BBS Project</h2>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/bbs-write" element={<BbsWritePage/>}></Route>
        <Route path="/bbs-view/:id" element={<BbsViewPage/>}></Route>
        <Route path="/bbs-update" element={<BbsUpdatePage/>}></Route>
        <Route path="/forecast-write" element={<ForecastPage/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import UploadPage from '../pages/UploadPage';
import ResultPage from '../pages/ResultPage';
import RecommendPick from '../pages/RecommendPick';
import RecommendFlow from '../pages/RecommendFlow';
import RecommendRandom from '../pages/RecommendRandom';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/recommendpick" element={<RecommendPick />} />
        <Route path="/recommendflow" element={<RecommendFlow />} />
        <Route path="/recommendrandom" element={<RecommendRandom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Intro from './pages/Intro';
import Culture from './pages/Culture';
import Contract from './pages/Contract';
import Reflection from './pages/Reflection';

// Wrapper component to conditionally show Layout
function AppRoutes() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <>
      {isLanding ? (
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/intro" element={<Intro />} />
            <Route path="/culture" element={<Culture />} />
            <Route path="/contract" element={<Contract />} />
            <Route path="/reflection" element={<Reflection />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

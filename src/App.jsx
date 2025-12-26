import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Tools from './pages/Tools';
import SIPCalculator from './components/tools/SIPCalculator';
import LumpSumCalculator from './components/tools/LumpSumCalculator';
import IncomeTaxCalculator from './components/tools/IncomeTaxCalculator';
import FDCalculator from './components/tools/FDCalculator';
import RDCalculator from './components/tools/RDCalculator';
import PPFCalculator from './components/tools/PPFCalculator';
import Schemes from './pages/Schemes';
import SchemeDetail from './pages/SchemeDetail';
import Finance from './pages/Finance';
import Career from './pages/Career';
import News from './pages/News';
import About from './pages/About';
import Contact from './pages/Contact';
import SearchResults from './pages/SearchResults';
import Explained from './pages/Explained';
import ExplainedDetail from './pages/ExplainedDetail';
import Footer from './components/layout/Footer';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="app-wrapper">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/schemes/:slug" element={<SchemeDetail />} />
              <Route path="/explained" element={<Explained />} />
              <Route path="/explained/:slug" element={<ExplainedDetail />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/career" element={<Career />} />

              <Route path="/tools" element={<Tools />} />
              <Route path="/tools/sip" element={<SIPCalculator />} />
              <Route path="/tools/lumpsum" element={<LumpSumCalculator />} />
              <Route path="/tools/tax" element={<IncomeTaxCalculator />} />
              <Route path="/tools/fd" element={<FDCalculator />} />
              <Route path="/tools/rd" element={<RDCalculator />} />
              <Route path="/tools/ppf" element={<PPFCalculator />} />

              <Route path="/news" element={<News />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<div className="container section"><h2>Privacy Policy Coming Soon</h2></div>} />
              <Route path="/terms" element={<div className="container section"><h2>Terms of Use Coming Soon</h2></div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;

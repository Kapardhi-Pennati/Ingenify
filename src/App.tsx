import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CustomerStories from './pages/CustomerStories';
import Pricing from './pages/Pricing';
import BookDemo from './pages/BookDemo';
import { BeamsBackgroundDemo } from './pages/Demo';
import { BeamsBackground } from './components/ui/beams-background';

function App() {
  return (
    <BrowserRouter>
      {/* Global Shadcn Beams Background */}
      <BeamsBackground className="fixed inset-0 min-h-screen z-[-1]" />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer-stories" element={<CustomerStories />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/book-demo" element={<BookDemo />} />
        {/* Isolated component demo route */}
        <Route path="/demo" element={<BeamsBackgroundDemo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

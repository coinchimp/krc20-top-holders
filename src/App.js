import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Main from './components/Main';

const App = () => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    return (
        <Router>
            <div className="dark:bg-[#231f20] dark:text-white">
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <div>
                                <Hero />
                                <Main />
                            </div>
                        } 
                    />
                    <Route 
                        path="/:tick" 
                        element={
                            <div>
                                <Hero />
                                <Main />
                            </div>
                        } 
                    />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

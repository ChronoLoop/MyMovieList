import React from 'react';
import Routes from './routes/Routes';
import Footer from './components/Footer/Footer';
import './App.scss';
import { AuthProvider } from './contexts/AuthContext';
import { MovieProvider } from './contexts/MovieContext';
function App() {
    return (
        <div className="App">
            <AuthProvider>
                <MovieProvider>
                    <Routes />
                    <Footer />
                </MovieProvider>
            </AuthProvider>
        </div>
    );
}

export default App;

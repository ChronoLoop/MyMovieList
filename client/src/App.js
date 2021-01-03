import React from 'react';
import './App.scss';
//components
import Routes from './routes/Routes';
import Footer from './components/Footer/Footer';
//contexts
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

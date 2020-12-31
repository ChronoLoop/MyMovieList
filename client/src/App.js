import React from 'react';
import Routes from './routes/Routes';
import Footer from './components/Footer/Footer';
import './App.scss';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    return (
        <div className="App">
            <AuthProvider>
                <Routes />
                <Footer />
            </AuthProvider>
        </div>
    );
}

export default App;

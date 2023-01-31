import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import './reset.css';
import './index.css';

import reportWebVitals from './reportWebVitals';

import Header from './components/Header/Header';
import routesConfig from './routes/routesconfig';


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
// We listen to the resize event
window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Header/>
            <div className='container'>
                <Routes>
                    {routesConfig.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
            </div>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();

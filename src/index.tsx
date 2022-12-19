import React from 'react';
import ReactDOM from 'react-dom/client';

import './reset.css';
import './index.css';

import reportWebVitals from './reportWebVitals';
import Header from "./components/Header/Header";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import routesConfig from "./routes/routesconfig";
import Modal from "./components/Modal/Modal";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Header/>
            <div className="container">
                <Routes>
                    {routesConfig.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}/>
                    ))}
                </Routes>
            </div>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();

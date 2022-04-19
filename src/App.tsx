import React, { useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { NavigationType, Route, Router, Routes, useHref, useInRouterContext, useLocation, useMatch, useNavigate, useNavigationType, useOutlet, useParams, useResolvedPath, useRoutes } from 'react-router';
import HistoryPro, { NavEvent } from 'history-pro'
import createHistory, { ReactRouterNavigator } from 'history-pro/react'
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import { HistoryProRouter } from './react-router-pro-dom';

const historyPro = new HistoryPro()

declare global {
    interface Window { historyPro: any; }
}

window.historyPro = historyPro
const reactNavigator: ReactRouterNavigator = createHistory(historyPro)

console.log(reactNavigator)

function HOME() {
    const navigate = useNavigate()
    return <div>
        <h1>HOME</h1>
        <button onClick={() => navigate('1')}>Ir a /1</button>
    </div>
}

function P1() {
    const navigate = useNavigate()
    return <div>
        <h1>1</h1>
        <button onClick={() => navigate('/2', { state: { a: 1 }, replace: true })}>Ir a /2</button>
    </div>
}

function P2() {
    // useHref, useInRouterContext, useLocation, useMatch, useNavigationType, useNavigate, useOutlet, useOutletContext, useParams, useResolvedPath, useRoutes
    const href = useHref('x')
    const routerContext = useInRouterContext()
    const location = useLocation()
    const match = useMatch('2')

    return <div>
        <p>useHref('x'): {href}</p>
        <p>useInRouterContext(): {routerContext.toString()}</p>
        <p>useLocation(): {JSON.stringify(location)}</p>
        <p>useMatch('2'): {JSON.stringify(match)}</p>
        <p>useNavigationType(): {JSON.stringify(useNavigationType())}</p>
        <p>useOutlet(): {JSON.stringify(useOutlet())}</p>
        <p>useParams(): {JSON.stringify(useParams())}</p>
        <p>useResolvedPath(): {JSON.stringify(useResolvedPath('x'))}</p>
        <p>useSearchParams(): {JSON.stringify(useSearchParams())}</p>
    </div>
}

function App() {
    return (
        <div className="App">
            <HistoryProRouter
                history={historyPro}
            >
                <Routes>
                    <Route path="/" element={<HOME />} />
                    <Route path="/1" element={<P1 />} />
                    <Route path="/2" element={<P2 />} />
                    <Route path="/x">
                        <Route index element={<P1 />} />
                        <Route path="1" element={<P1 />} />
                        <Route path=":x" element={<P2 />} />
                    </Route>
                </Routes>
            </HistoryProRouter>
        </div>
    )
}

export default App;

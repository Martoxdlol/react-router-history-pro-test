import React, { useEffect, useMemo, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { NavigationType, Route, Router, Routes, useHref, useInRouterContext, useLocation, useMatch, useNavigate, useNavigationType, useOutlet, useParams, useResolvedPath, useRoutes } from 'react-router';
import HistoryPro, { NavEvent } from 'history-pro'
import createHistory, { ReactRouterNavigator } from 'history-pro/react'
import { BrowserRouter } from 'react-router-dom';

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

export function useLinkClickHandler() {
    console.log(useLocation())
}

export function useSearchParams() {
    return createSearchParams(useLocation().search)
}

function createSearchParams(init: any) {
    if (init === void 0) {
        init = "";
    }

    return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : objectToKeyValueArray(init));
}

function objectToKeyValueArray(init: { [key: string]: any }) {
    return Object.keys(init).reduce<Array<any>>((memo, key) => {
        let value: any = init[key];
        const r: Array<any> = [...memo, ...(Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]])]
        return r
    }, [])
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
    const [location, setLocation] = useState(historyPro.get(0))
    const [navType, setNavType] = useState(NavigationType.Pop)
    useEffect(() => {
        const cancel = historyPro.listen((e: NavEvent) => {
            setLocation(e.nextLocation)
            if (e.isPush) setNavType(NavigationType.Push)
            if (e.isReplace) setNavType(NavigationType.Replace)
            if (e.isBack || e.isForward || e.isPop) setNavType(NavigationType.Pop)
        })

        return () => cancel()
    }, [])

    return (
        <div className="App">
            <Router
                location={location.path}
                navigator={reactNavigator}
                navigationType={navType}
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
            </Router>
        </div>
    )
}

export default App;

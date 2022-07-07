import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IsLoadingContextProvider from './contexts/IsLoadingContext';
import UserContextProvider from './contexts/UserContext';
import { GlobalStyle, ResetStyle } from "./globalStyle";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

export default function App() {
    return (
        <BrowserRouter>
            <ResetStyle />
            <GlobalStyle />
            <UserContextProvider>
                <IsLoadingContextProvider>
                    <Routes>
                        <Route path={"/home"} element={<Home />}/>
                        <Route path={"/login"} element={<Login />} />
                        <Route path={"/signup"} element={<SignUp />} />
                    </Routes>
                </IsLoadingContextProvider>
            </UserContextProvider>
        </BrowserRouter>
    )
}
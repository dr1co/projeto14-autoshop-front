import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IsLoadingContextProvider from './contexts/IsLoadingContext';
import UserContextProvider from './contexts/UserContext';
import SignUp from './pages/SignUp';

export default function App() {
    return (
        <BrowserRouter>
            <UserContextProvider>
                <IsLoadingContextProvider>
                    <Routes>
                        <Route path={"/signup"} element={<SignUp />} />
                    </Routes>
                </IsLoadingContextProvider>
            </UserContextProvider>
        </BrowserRouter>
    )
}
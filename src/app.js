import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContextProvider from './contexts/UserContext';
import SignUp from './pages/SignUp';

export default function App() {
    return (
        <BrowserRouter>
            <UserContextProvider>
                <Routes>
                    <Route path={"/signup"} element={<SignUp/>}/>
                </Routes>
            </UserContextProvider>
        </BrowserRouter>
    )
}
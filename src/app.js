import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContextProvider from './contexts/UserContext';

export default function App() {
    return (
        <BrowserRouter>
            <UserContextProvider>
                <Routes>
                    Inserir rotas aqui.
                </Routes>
            </UserContextProvider>
        </BrowserRouter>
    )
}
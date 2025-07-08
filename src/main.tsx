import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { HeroUIProvider } from "@heroui/react";
import './styles/variables.scss';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <HeroUIProvider>
                <main className="dark text-foreground bg-background">
                    <App />
                </main>
            </HeroUIProvider>
        </BrowserRouter>
    </StrictMode>,
)
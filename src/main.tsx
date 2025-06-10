import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CompareProvider } from './components/context/CompareContext.tsx';
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "./components/ui/toast";
import { ToastViewport } from "./components/ui/toast";

createRoot(document.getElementById("root")!).render(
    <ToastProvider>
        <Toaster />
        <CompareProvider>
            <App />
        </CompareProvider>
        <ToastViewport />
    </ToastProvider>
);

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CompareProvider } from './components/context/CompareContext.tsx';

createRoot(document.getElementById("root")!).render(
    <CompareProvider>
        <App />
    </CompareProvider>
);

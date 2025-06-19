import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import App from './App.tsx'
import  store  from "./Kambaz/store"; 
import "bootstrap/dist/css/bootstrap.min.css";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
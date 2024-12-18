import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'antd/dist/reset.css'; // Cấu trúc CSS mới nhất của Ant Design
import { Provider } from 'react-redux';
import { store } from './store';

import "primereact/resources/themes/lara-light-cyan/theme.css";

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

)

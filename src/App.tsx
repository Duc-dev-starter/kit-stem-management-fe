import AppRouter from './routers'
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from './secret';
import { FooterComponent, Header, Navbar } from './components';
import { useLocation } from 'react-router-dom';
import { PATH } from './consts';
import { roles } from './enum';
function App() {
  const clientId = config.GOOGLE_CLIENT_ID;
  const location = useLocation();

  const isNotUseHeaderFooter =
    location.pathname.includes(roles.ADMIN) ||
    location.pathname.includes(roles.STAFF) ||
    location.pathname.includes(roles.MANAGER) ||
    location.pathname.includes(PATH.LOGIN) ||
    location.pathname.includes(PATH.REGISTER)
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {!isNotUseHeaderFooter && <Navbar />}
        {!isNotUseHeaderFooter && <Header />}
        <div className="flex-grow">
          <AppRouter />
        </div>
        {!isNotUseHeaderFooter && <FooterComponent />}
      </div>
    </>
  )
}

export default App

import AppRouter from './routers'
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from './secret';
import { FooterComponent, Header, Navbar } from './components';
import { isNotUseHeaderFooter } from './consts';
function App() {
  const clientId = config.GOOGLE_CLIENT_ID;
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

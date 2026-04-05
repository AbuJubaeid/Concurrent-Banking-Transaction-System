import { Outlet } from 'react-router';
import Footer from '../pages/shared/Footer/Footer';
import Navabr from '../pages/shared/Navbar/Navabr';

const RootLayout = () => {
    return (
      <div className='max-w-[900px] mx-auto'>
        <div className='sticky top-0 z-50'>
            <Navabr></Navabr>
        </div>
        <div className='min-h-[200px]'>
          <Outlet></Outlet>
        </div>
        <div>
            <Footer></Footer>
        </div>
      </div>
    );
};

export default RootLayout;
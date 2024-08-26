
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Postss from './Postss';



function Layout() {

   const userName = "Nousheen"

  return (
    <>
      <Header userName={userName} />
        <Outlet  />
      <Footer />
    
    </>
  )
}

export default Layout

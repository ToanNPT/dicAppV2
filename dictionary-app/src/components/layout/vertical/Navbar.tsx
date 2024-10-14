// Component Imports
'use client'
import LayoutNavbar from '@layouts/components/vertical/Navbar'
import NavbarContent from './NavbarContent'
import {useAuth} from "@core/contexts/AuthContext";

const Navbar = () => {
    const authCxt = useAuth() ? useAuth() : null;
    const user = authCxt ? authCxt.user : null;
  return (
    <LayoutNavbar>
      <NavbarContent auth={user} />
    </LayoutNavbar>
  )
}

export default Navbar

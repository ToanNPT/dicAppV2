// Type Imports
import type { ChildrenType } from '@core/types'

// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'

// Component Imports
import Providers from '@components/Providers'
import Navigation from '@components/layout/vertical/Navigation'
import Navbar from '@components/layout/vertical/Navbar'
import VerticalFooter from '@components/layout/vertical/Footer'
import {AuthProvider, useAuth} from "@core/contexts/AuthContext";

const Layout = async ({ children }: ChildrenType) => {
  // Vars
  const direction = 'ltr'


  return (
    <Providers direction={direction}>
        <AuthProvider>
            <LayoutWrapper
                verticalLayout={
                    <VerticalLayout navigation={<Navigation />} navbar={<Navbar />} footer={<VerticalFooter />}>

                        {children}

                    </VerticalLayout>
                }
            />
        </AuthProvider>

    </Providers>
  )
}

export default Layout

// MUI Imports
import Chip from '@mui/material/Chip'
import {useTheme} from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type {VerticalMenuContextProps} from '@menu/components/vertical-menu/Menu'

// Component Imports
import {Menu, SubMenu, MenuItem, MenuSection} from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
    open?: boolean
    transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = ({open, transitionDuration}: RenderExpandIconProps) => (
    <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
        <i className='ri-arrow-right-s-line'/>
    </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({scrollMenu, auth}: {
    scrollMenu: (container: any, isPerfectScrollbar: boolean) => void,
    auth: any }) => {
    // Hooks
    const theme = useTheme()
    const {isBreakpointReached, transitionDuration} = useVerticalNav()

    const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

    const isAuthenticated = auth !== null ? true : false;
    return (

        <ScrollWrapper
            {...(isBreakpointReached
                ? {
                    className: 'bs-full overflow-y-auto overflow-x-hidden',
                    onScroll: container => scrollMenu(container, false)
                }
                : {
                    options: {wheelPropagation: false, suppressScrollX: true},
                    onScrollY: container => scrollMenu(container, true)
                })}
        >
            <Menu
                menuItemStyles={menuItemStyles(theme)}
                renderExpandIcon={({open}) => <RenderExpandIcon open={open} transitionDuration={transitionDuration}/>}
                renderExpandedMenuItemIcon={{icon: <i className='ri-circle-line'/>}}
                menuSectionStyles={menuSectionStyles(theme)}
            >

                <MenuSection label='Chủ điểm & Từ vựng'>
                    <MenuItem
                        href={`/topics`}
                        icon={<i className='ri-bookmark-line'/>}
                    >
                        Chủ điểm
                    </MenuItem>
                    <MenuItem
                        href={`/words`}
                        icon={<i className="ri-character-recognition-fill"></i>}
                    >
                        Từ vựng
                    </MenuItem>
                </MenuSection>
                {
                    isAuthenticated === true
                        ? (
                            <MenuSection label='Quản Lý Nội Dung'>
                                <MenuItem
                                    href={`/authenticated/adminTopic`}
                                    icon={<i className='ri-bookmark-line'/>}
                                >
                                    Quản lý chủ điểm
                                </MenuItem>
                                <MenuItem
                                    href={`/authenticated/adminWords`}
                                    icon={<i className="ri-character-recognition-fill"></i>}
                                >
                                    Quản lý từ vựng
                                </MenuItem>
                            </MenuSection>
                        )
                        : null
                }
            </Menu>
        </ScrollWrapper>
    )
}

export default VerticalMenu

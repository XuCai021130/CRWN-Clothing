import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { UserContext } from "../../contexts/user.context";
import { CartContext } from "../../contexts/cart.context";

import { signOutUser } from "../../utils/firebase/firebase.util";

import {NavigationContainer, NavLink, NavLinks, LogoContainer} from './navigation.styles';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen} = useContext(CartContext);
  
  const signOutHandler = async () => {
    await signOutUser();
  }

  return (
    <>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className="logo"/>
        </LogoContainer>

        <NavLinks>
          <NavLink to='/shop'>
            Shop
          </NavLink>
          {currentUser 
            ? (<NavLink as='span' onClick={signOutHandler}>SIGN OUT</NavLink>)
            : (<NavLink to='/sign-in'>SIGN IN</NavLink>)}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </>
  )
}

export default Navigation;

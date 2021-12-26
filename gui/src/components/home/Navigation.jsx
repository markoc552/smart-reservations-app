import React, { useState } from "react";
import {
  Navigation as Nav,
  NavigationItemWrapper,
  NavAccountsItem,
} from "../util/RestaurantStyledComponents";
import { Icon, Image, Dropdown } from "semantic-ui-react";
import history from "../../history";
import Logo from "../../assets/images/logo.png";
import AccountModal from "../util/AccountModal";
import { useSelector, connect } from "react-redux";
import { login } from "../../redux/actions";

const Navigation = (props) => {
  const [accountShow, setAccountShow] = useState(false);

  const user = useSelector((state) => state.auth.user);

  const isLogged = useSelector((state) => state.auth.logged);

  const renderDropdownMenu = () => {
    return (
      <Dropdown
        style={{ margin: "0.3vh 0", display: "flex" }}
        icon="false"
        trigger={
          <NavAccountsItem style={{ margin: "auto auto" }}>
            {user !== undefined ? (
              <Image src={user.profilePhoto} avatar />
            ) : (
              <Icon name="user" />
            )}
            {user !== undefined && `${user.firstname} ${user.lastname}`}
          </NavAccountsItem>
        }
      >
        <Dropdown.Menu>
          <Dropdown.Header icon="user" content="Administrator" />
          <Dropdown.Divider />
          <Dropdown.Item
            icon="sitemap"
            text="Manage restaurants"
            onClick={() => history.push("/manageRestaurants")}
          />
          <Dropdown.Item
            icon="user"
            text="Manage users"
            onClick={() => history.push("/manageUsers")}
          />
          <Dropdown.Header icon="user" content="User" />
          <Dropdown.Divider />
          <Dropdown.Item
            icon="attention"
            text="My profile"
            onClick={() => history.push("/myProfile")}
          />
          <Dropdown.Item
            icon="sitemap"
            text="My restaurants"
            onClick={() => history.push("/myRestaurants")}
          />
          <Dropdown.Item
            icon="sign out"
            text="Sign out"
            onClick={() => props.login(false, undefined)}
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  return (
    <Nav>
      <NavigationItemWrapper style={{ cursor: "default" }}>
        <Image src={Logo} avatar />
        Smart Reservation App
      </NavigationItemWrapper>
      <NavigationItemWrapper onClick={() => history.push("/")}>
        <Icon name="home" /> Home
      </NavigationItemWrapper>
      <NavigationItemWrapper onClick={() => history.push("/restaurants")}>
        <Icon name="tablet alternate" />
        Restaurants
      </NavigationItemWrapper>
      {isLogged ? (
        renderDropdownMenu()
      ) : (
        <NavAccountsItem
          style={{ margin: "auto auto" }}
          onClick={() => setAccountShow(true)}
        >
          <Icon name="user circle" size="large" />
          {user !== undefined && `${user.firstname} ${user.lastname}`}
        </NavAccountsItem>
      )}
      {accountShow && (
        <AccountModal show={accountShow} setShow={setAccountShow} user={user} />
      )}
    </Nav>
  );
};

export default connect(null, { login })(Navigation);

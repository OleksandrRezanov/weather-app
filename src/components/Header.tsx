import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { signOut } from "firebase/auth";
import { auth, db } from '../firebase';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/usersSlice';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { User } from '../types/User';

interface Props {
  authorizedUser: User | null,
  setAuthorizedUser: (param: User | null) => void
}

export const Header: React.FC<Props> = ({ authorizedUser, setAuthorizedUser }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      setAnchorEl(null);
      dispatch(setUser(null));
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddNewCity = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    const newCityName = prompt("Enter the name of the new city:");

    if (newCityName && !!authorizedUser && !authorizedUser?.cities.includes(newCityName)) {
      const userRef = doc(db, "users", authorizedUser.id);

      try {
        await updateDoc(userRef, {
          cities: arrayUnion(newCityName)
        });
        if (authorizedUser) {
          setAuthorizedUser({ ...authorizedUser, cities: [...authorizedUser.cities, newCityName] });
        }
      } catch (error) {
        console.error("Error adding new city:", error);
      }
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Button
          variant="contained"
          color="primary"
          onClick={(event) => handleAddNewCity(event)} // Додати функціонал
          sx={{
            borderRadius: '4px',
            textTransform: 'none',
          }}
        >
          Add new city
        </Button>

        <div style={{ flexGrow: 1 }} />

        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
}

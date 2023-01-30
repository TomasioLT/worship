import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { UserAuth } from "../context/AuthContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import {
  alpha,
  Avatar,
  Badge,
  FormControlLabel,
  InputBase,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
} from "@mui/material";
import {
  EmailOutlined,
  FavoriteBorderOutlined,
  HomeOutlined,
  KeyboardArrowDown,
  LibraryMusicOutlined,
  Logout,
  LogoutOutlined,
  Notifications,
  PersonAdd,
  QueueMusicOutlined,
  Settings,
} from "@mui/icons-material";

const StyledLink = styled(Link)({
  color: "white",
  textDecoration: "none",
});

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navbar() {
  // Email & Google Authentication
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      handleDrawerClose();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  //Avatar Menu
  const [avatarAnchorEl, setAvatarAnchorEl] = React.useState(null);
  const openAvatar = Boolean(avatarAnchorEl);
  const handleClick = (event) => {
    setAvatarAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAvatarAnchorEl(null);
  };

  const [openSideBar, setOpenSideBar] = React.useState(true);

  const handleDrawer = () => {
    setOpenSideBar(!openSideBar);
  };

  // Search bar
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          {user && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            <StyledLink component={Link} to="/">
              {" "}
              Mini variant drawer
            </StyledLink>
          </Typography>
          {user?.displayName ? (
            <Box sx={{ flexGrow: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                </Search>
                <IconButton>
                  <Badge badgeContent={100} color="error">
                    <Notifications sx={{ color: "white" }} />
                  </Badge>
                </IconButton>

                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={openAvatar ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openAvatar ? "true" : undefined}>
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      alt={user.displayName}
                      src={user.photoURL}></Avatar>
                    <Typography color="white" pl={1}>
                      {user.displayName}
                    </Typography>
                    <KeyboardArrowDown sx={{ color: "white" }} />
                  </IconButton>
                </Tooltip>
              </Box>

              <Menu
                anchorEl={avatarAnchorEl}
                id="account-menu"
                open={openAvatar}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Avatar /> My account
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <PersonAdd fontSize="small" />
                  </ListItemIcon>
                  Language
                </MenuItem>
                <Divider />
                <MenuItem>
                  <ListItemIcon>
                    <LightModeIcon />
                  </ListItemIcon>
                  Dark Mode
                  <FormControlLabel
                    control={<Switch color="primary" />}
                    labelPlacement="start"
                    sx={{
                      display: "flex",
                    }}
                  />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <Divider />

                <MenuItem onClick={(handleClose, handleSignOut)}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <StyledLink component={Link} to="/signin">
              Sign in
            </StyledLink>
          )}
        </Toolbar>
      </AppBar>
      {user && (
        <Drawer variant="permanent" open={open}>
          <DrawerHeader onClick={handleDrawerClose}>
            <IconButton>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding sx={{ display: "block" }}>
              <StyledLink component={Link} to="/dashboard">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}>
                    <HomeOutlined />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0, color: "black" }}>
                    Dashboard
                  </ListItemText>
                </ListItemButton>
              </StyledLink>
            </ListItem>
            <ListItem disablePadding sx={{ display: "block" }}>
              <StyledLink component={Link} to="/songs">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}>
                    <LibraryMusicOutlined />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0, color: "black" }}>
                    Songs
                  </ListItemText>
                </ListItemButton>
              </StyledLink>
            </ListItem>

            <ListItem disablePadding sx={{ display: "block" }}>
              <StyledLink component={Link} to="/favorites">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}>
                    <FavoriteBorderOutlined />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0, color: "black" }}>
                    Favorites
                  </ListItemText>
                </ListItemButton>
              </StyledLink>
            </ListItem>
            <ListItem disablePadding sx={{ display: "block" }}>
              <StyledLink component={Link} to="/playlists">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}>
                    <QueueMusicOutlined />
                  </ListItemIcon>
                  <ListItemText
                    sx={{ opacity: open ? 1 : 0, color: "initial" }}>
                    Playlists
                  </ListItemText>
                </ListItemButton>
              </StyledLink>
            </ListItem>
            <ListItem disablePadding sx={{ display: "block" }}>
              <StyledLink component={Link} to="/contacts">
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}>
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}>
                    <EmailOutlined />
                  </ListItemIcon>
                  <ListItemText sx={{ opacity: open ? 1 : 0, color: "black" }}>
                    Contacts
                  </ListItemText>
                </ListItemButton>
              </StyledLink>
            </ListItem>
          </List>
          <Divider />

          <List
            sx={{
              flexGrow: 1,
              padding: 0,
              display: "flex",
              alignItems: "flex-end",
            }}>
            <ListItem disablePadding sx={{ display: "block" }}>
              <Divider />

              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={(handleClose, handleSignOut)}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}>
                  <LogoutOutlined />
                </ListItemIcon>
                <ListItemText sx={{ opacity: open ? 1 : 0 }}>
                  Logout
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>
      )}
    </Box>
  );
}

import * as React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Box, CssBaseline, Divider, Drawer, IconButton,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Toolbar, Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useLocation } from 'react-router';

const drawerWidth = 240;

export default function Sidebar({ children, window }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => setIsClosing(false);

  const handleDrawerToggle = () => {
    if (!isClosing) setMobileOpen(!mobileOpen);
  };

  let pageTitle;
  switch (location.pathname) {
    case '/projects':
      pageTitle = 'My Projects';
      break;
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['My Projects', 'Profile', 'Settings'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{color: 'white' }}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: '#121212',
        }}
      >
        {/* Mobile AppBar */}
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer (Sidebar) */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="sidebar navigation"
      >
        {/* Mobile */}
        <Drawer
          container={window !== undefined ? () => window().document.body : undefined}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#1E1E1E', // <-- sidebar background
              color: '#E0E0E0',            // <-- sidebar text color
              borderRight: '1px solid #2C2C2C', // subtle divider line
            },
          }}
          slotProps={{
            root: {
              keepMounted: true,
            },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: '#1E1E1E', // <-- sidebar background
              color: '#E0E0E0',            // <-- sidebar text color
              borderRight: '1px solid #2C2C2C', // subtle divider line
            },
          }}
          open
        >
          {drawer}
        </Drawer>

      </Box>

      {/* Main content area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: '#181818',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  children: PropTypes.node,
  window: PropTypes.func,
};

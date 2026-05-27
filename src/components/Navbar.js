import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Box, Button, IconButton,
  Drawer, List, ListItem, ListItemButton, ListItemText, Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteIcon from '@mui/icons-material/Favorite';

const navLinks = [
  { label: 'Home',        path: '/' },
  { label: 'Donate',      path: '/donate' },
  { label: 'Request Blood', path: '/request' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Guide',       path: '/guide' },
  { label: 'Pre-Surgery', path: '/presurgery' },
  { label: 'About',       path: '/about' },
];

export default function Navbar() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar position="sticky" elevation={0} sx={{
        bgcolor: 'white',
        borderBottom: '1px solid #FFEBEE',
        zIndex: 1100,
      }}>
        <Toolbar sx={{ px: { xs: 2, md: 5 }, py: 1, minHeight: '68px !important', justifyContent: 'space-between' }}>

          {/* LOGO */}
          <Box component={Link} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}>
            <Box sx={{
              width: 36, height: 36, borderRadius: '50%',
              bgcolor: '#C62828', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 10px rgba(198,40,40,0.35)',
            }}>
              <FavoriteIcon sx={{ color: 'white', fontSize: 18 }} />
            </Box>
            <Typography fontWeight={900} fontSize="1.2rem" color="#C62828"
              sx={{ fontFamily: 'Poppins, sans-serif', letterSpacing: 0.3 }}>
              BloodConnect
            </Typography>
          </Box>

          {/* DESKTOP LINKS */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              const isRequest = link.path === '/request';
              if (isRequest) return (
                <Button key={link.path} component={Link} to={link.path}
                  variant="contained"
                  sx={{
                    ml: 1,
                    bgcolor: '#C62828', color: 'white',
                    fontWeight: 700, fontSize: '0.82rem',
                    borderRadius: 2.5, textTransform: 'none',
                    px: 2.5, py: 1,
                    boxShadow: '0 4px 14px rgba(198,40,40,0.35)',
                    '&:hover': { bgcolor: '#8E0000', transform: 'translateY(-1px)' },
                    transition: 'all 0.2s',
                  }}>
                  🚨 Request Blood
                </Button>
              );
              return (
                <Button key={link.path} component={Link} to={link.path}
                  sx={{
                    color: active ? '#C62828' : '#444',
                    fontWeight: active ? 700 : 500,
                    fontSize: '0.85rem',
                    textTransform: 'none',
                    px: 1.5, py: 1,
                    borderRadius: 2,
                    borderBottom: active ? '2px solid #C62828' : '2px solid transparent',
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    '&:hover': { color: '#C62828', bgcolor: '#FFF5F5' },
                    transition: 'all 0.2s',
                  }}>
                  {link.label}
                </Button>
              );
            })}
          </Box>

          {/* MOBILE MENU ICON */}
          <IconButton sx={{ display: { xs: 'flex', md: 'none' }, color: '#C62828' }}
            onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </AppBar>

      {/* MOBILE DRAWER */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 260, pt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 3, mb: 3 }}>
            <FavoriteIcon sx={{ color: '#C62828' }} />
            <Typography fontWeight={900} color="#C62828" fontSize="1.1rem">BloodConnect</Typography>
          </Box>
          <List>
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <ListItem key={link.path} disablePadding>
                  <ListItemButton component={Link} to={link.path}
                    onClick={() => setDrawerOpen(false)}
                    sx={{
                      px: 3, py: 1.5,
                      bgcolor: active ? '#FFF0F0' : 'transparent',
                      borderLeft: active ? '3px solid #C62828' : '3px solid transparent',
                    }}>
                    <ListItemText
                      primary={link.label}
                      primaryTypographyProps={{
                        fontWeight: active ? 700 : 500,
                        color: active ? '#C62828' : '#333',
                        fontSize: '0.95rem',
                        fontFamily: 'Poppins',
                      }} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
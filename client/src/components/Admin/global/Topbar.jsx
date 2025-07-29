import React, { useState, useRef } from 'react';
import {
  Box,
  IconButton,
  Paper,
  ClickAwayListener,
  Grow,
  Popper,
  MenuList,
  MenuItem,
} from '@mui/material';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/auth/operations';
import { useProject } from '../../../context/ProjectContext';

const Topbar = () => {
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const { setOpenChangePassword } = useProject();
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpenMenu((prev) => !prev);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpenMenu(false);
  };

  return (
    <Box display='flex' justifyContent='end' p={2}>
      <Box display='flex'>
        <IconButton ref={anchorRef} onClick={handleToggle}>
          <PersonOutlinedIcon />
        </IconButton>

        <Popper
          open={openMenu}
          anchorEl={anchorRef.current}
          role={undefined}
          placement='bottom-end'
          transition
          disablePortal
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} style={{ transformOrigin: 'right top' }}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={openMenu}>
                    <MenuItem onClick={() => setOpenChangePassword(true)}>Змінити пароль</MenuItem>
                    <MenuItem onClick={() => dispatch(logOut())}>Вийти</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </Box>
  );
};

export default Topbar;

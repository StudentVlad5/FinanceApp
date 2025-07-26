import { useState } from 'react';
import { ProSidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import 'react-pro-sidebar/dist/css/styles.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import ReceiptOutlinedIcon from '@mui/icons-material/ReceiptOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import BallotOutlined from '@mui/icons-material/BallotOutlined';
import PlaylistAddOutlined from '@mui/icons-material/PlaylistAddOutlined';
import { tokens } from 'theme';
import default_user_img from '../../../images/defaultUserPhoto.jpg';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getUser } from '../../../redux/auth/selectors';
// import { getUser, getUserAvatar } from "../../../redux/auth/selectors";

const Item = ({ title, to, icon, selected, setSelected, className }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography className={className}>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState('Dashboard');
  const user = useSelector(getUser);
  // const userAvatar = useSelector(getUserAvatar);
  let avatar;
  // if (userAvatar !== '' && userAvatar !== undefined) {
  // avatar =
  // "https://event-shop-backend.vercel.app/uploads/avatars/" + userAvatar.split('/')[userAvatar.split('/').length - 1];
  // }
  return (
    <Box
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape='square'>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: '10px 0 20px 0',
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box display='flex' justifyContent='space-between' alignItems='center' ml='15px'>
                <Typography variant='h4' color={colors.grey[100]} textTransform={'capitalize'}>
                  {user.role}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb='25px'>
              <Box display='flex' justifyContent='center' alignItems='center'>
                <img
                  alt='profile-user'
                  width='100px'
                  height='100px'
                  src={avatar ? avatar : default_user_img}
                  style={{ cursor: 'pointer', borderRadius: '50%' }}
                />
              </Box>
              <Box textAlign='center'>
                <Typography
                  variant='h4'
                  color={colors.grey[100]}
                  fontWeight='bold'
                  sx={{ m: '10px 0 0 0' }}
                  textTransform={'uppercase'}
                >
                  {user.name}
                </Typography>
                <Typography
                  variant='h5'
                  color={colors.greenAccent[500]}
                  textTransform={'uppercase'}
                >
                  {user.role}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : '10%'}>
            <Item
              title='Залишки по рахункам'
              to='account_balances'
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              className='account_balances'
            />

            <Typography variant='h6' color={colors.grey[300]} sx={{ m: '15px 0 5px 20px' }}>
              Словники
            </Typography>
            <Item
              title='Назви рахунків'
              to='accounts'
              icon={<BallotOutlined />}
              selected={selected}
              setSelected={setSelected}
              className='accounts'
            />
            {/* <Item
              title='Manage Category'
              to='categories'
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              className='categories'
            />
            <Item
              title='Events Information'
              to='events'
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              className='events'
            />
            <Item
              title='Activate event'
              to='activate_events'
              icon={<PlaylistAddOutlined />}
              selected={selected}
              setSelected={setSelected}
              className='activate_events'
            />
            <Item
              title='Orders'
              to='orders'
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
              className='orders'
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

Item.propTypes = {
  title: PropTypes.any.isRequired,
  className: PropTypes.any,
  to: PropTypes.any.isRequired,
  icon: PropTypes.any.isRequired,
  selected: PropTypes.any.isRequired,
  setSelected: PropTypes.any.isRequired,
};

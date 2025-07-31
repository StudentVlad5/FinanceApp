import 'modern-normalize';
import { createGlobalStyle } from 'styled-components';
import { theme } from './Variables.styled';

export const GlobalStyle = createGlobalStyle`
  body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Playfair Display', 'Miama Nueva', sans-serif, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
  background-color: ${theme.colors.fon};
  color:${theme.colors.grey2};

  &.scroll {
      max-height: 100vh;
      overflow: hidden;
    }
 }

#root {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
/* 
@font-face {
	font-family: 'Miama Nueva';
	src: url('../../../../public/fonts/MiamaNueva.woff2') format('woff2'), url('../../../../public/fonts/MiamaNueva.woff') format('woff');
}  */

//-----reset-----//
h1, h2, h3, h4, h5, h6, p {
  padding: 0;
  margin: 0;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

img {
  display:block;
  max-width: 100%;
  height: auto;
}

a {
  text-decoration: none; 
}
//-----modal windows-----//
#popup-root {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 345;

  width: 100vw;
  height: 100vh;

  opacity: 1;
  visibility: visible;
  display: flex;

  background-color: #0000006b;
  transition: opacity .3s linear 50ms, visibility .3s linear 50ms;
}

#popup-root {
  &.is-hide {
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
      display: none;

      width: 0;
      height: 0;
  }
}

//-----Admin-----//

.specialistAvatar,
.img-app-theme--cell > img {
width: 40px;
height: 40px;
border-radius: 50%;
}

.inputSpecialistAvatar,
.inputEventAvatar {
  display: none;
}

.eventAvatar,
.img-app-theme--cell > img {
width: 50px;
height: 50px;
border-radius: 50%;
&:hover{
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
}

.img-app-theme--cell{
  display: flex;
  justify-content: center;
  align-items: center;
}
.pro-sidebar {
  z-index: 100 !important;
  width: 300px !important;
}
.pro-sidebar.collapsed {
  width: 80px !important;
}
/* GRID */

.row {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.row-middle {
  align-items: center;
}

.col {
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
}

.col-start {
  justify-content: flex-start;
  text-align: left;
}

.col-center {
  justify-content: center;
  text-align: center;
}

.col-end {
  justify-content: flex-end;
  text-align: right;
}

`;

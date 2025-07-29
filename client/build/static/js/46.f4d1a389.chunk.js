"use strict";(self.webpackChunkAddax_CRM=self.webpackChunkAddax_CRM||[]).push([[46],{518:(e,t,i)=>{i.d(t,{MG:()=>p,NW:()=>h,aV:()=>c,ah:()=>m,c$:()=>w,vX:()=>x,w4:()=>A,yt:()=>d});var o=i(8258),n=i(7291),r=i(1529),a=i(1384),s=i(5475),l=i(4586);const d=(0,r.Ay)(o.S1)`
  width: 100%;
  text-align: start;
`,c=r.Ay.div`
  position: absolute;
  white-space: nowrap;
  bottom: -5px;
  left: 15px;
  margin-bottom: -16px;
  color: #e53e3e;
  font-family: ${n.w.fonts[1]};
  font-size: ${n.w.fontSizes.small};
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.03em;
  @media screen and (min-width: ${n.w.breakpoints.tablet}) {
    left: 32px;
  }
`,p=(0,r.Ay)(l.mc)`
  max-width: 250px;
  @media screen and (min-width: ${n.w.breakpoints.tablet}) {
    max-width: 540px;
  }
`,A=(0,r.Ay)(o.ZQ)`
  min-width: 250px;
  border: 1px solid ${e=>e.bordercolor||"transparent"};
  @media screen and (min-width: ${n.w.breakpoints.tablet}) {
    min-width: 450px;
    margin-bottom: 35px;
  }
`,h=r.Ay.span`
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  right: 6%;
  top: 80%;
  transform: translateY(-80%);
  color: ${n.w.colors.grey2};
  cursor: pointer;
  @media screen and (min-width: ${n.w.breakpoints.tablet}) {
    top: 62%;
    height: 50px;
  }
  & svg {
    width: inherit;
    height: inherit;
  }
`,m=((0,r.Ay)(a.rt)`
  font-size: 14px;
  width: 180px;
  height: 50px;

  @media screen and (min-width: ${n.w.breakpoints.tablet}) {
    width: 217px;
    height: 70px;
    font-size: 16px;
  }

  @media screen and (min-width: ${n.w.breakpoints.tablet}) {
    font-size: 18px;
  }
`,(0,r.Ay)(s.N_)`
  color: ${n.w.colors.grey2};
  transition: ${n.w.transition[0]};
  text-decoration: none;

  &:hover,
  &:focus {
    color: ${n.w.colors.accent};
  }
`),x=r.Ay.div`
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 16px;

  & span {
    color: ${n.w.colors.grey1};
    font-weight: 400;
    font-size: 14px;
    font-family: ${n.w.fonts[0]};
    font-style: normal;
    letter-spacing: 0.04em;

    @media screen and (min-width: ${n.w.breakpoints.tablet}) {
      font-size: 16px;
    }

    @media screen and (min-width: ${n.w.breakpoints.desktop}) {
      font-size: 18px;
    }
  }
`,w=(0,r.Ay)(o.q)`
  gap: 15px;
  &:last-child {
    margin-bottom: 20px;
  }
`},1384:(e,t,i)=>{i.d(t,{rt:()=>a});var o=i(5475),n=i(1529),r=i(7291);const a=n.Ay.button`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 125px;
  padding: 13px 23px;
  margin: 0 auto;

  font-family: ${r.w.fonts[0]};
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${r.w.colors.grey1};
  text-transform: uppercase;

  background-color: ${r.w.colors.fon};
  border: 1px solid ${r.w.colors.grey1};
  border-radius: 7px;

  cursor: pointer;
  transition: ${r.w.transition};

  @media screen and (min-width: ${r.w.breakpoints.tablet}) {
    font-size: 14px;
    padding: 18px 33px;
  }

  @media screen and (min-width: ${r.w.breakpoints.desktop}) {
    font-size: 16px;
  }

  &:hover,
  &:focus {
    color: ${r.w.colors.white};
    background-color: ${r.w.colors.accent};
    border: 1px solid ${r.w.colors.accent};
  }
  &:disabled {
    color: ${r.w.colors.brown2};
    background-color: ${r.w.colors.grey1};
    opacity: 0.4;
    border: 1px solid ${r.w.colors.accent};
  }
`;n.Ay.button`
  min-width: 220px;
  padding: 13px 23px;
  margin: 0 auto;

  font-family: ${r.w.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: ${r.w.colors.white};

  border-radius: 7px;
  background: ${r.w.colors.accent};
  border: 1px solid ${r.w.colors.accent};

  cursor: pointer;
  transition: ${r.w.transition};

  @media screen and (min-width: ${r.w.breakpoints.desktop}) {
    font-size: 20px;
  }

  &:hover,
  &:focus {
    color: ${r.w.colors.grey2};
    background-color: transparent;
    border: 1px solid ${r.w.colors.grey2};
  }
  &:disabled,
  &[disabled]{
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}
`,(0,n.Ay)(o.k2)`
  position: relative;
  padding: 2px;

  color: ${r.w.colors.grey1};
  font-family: ${r.w.fonts[0]};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */

  transition: ${r.w.transition};

  @media screen and (min-width: ${r.w.breakpoints.tablet}) {
  }

  @media screen and (min-width: ${r.w.breakpoints.desktop}) {
    font-size: 16px;
  }

  &::before,
  &::after,
  & span::after,
  & span::before {
    content: '';
    position: absolute;
    top: 100%;
    bottom: 0;
    left: -16px;
    width: 1px;
    background: ${r.w.colors.accent};
    transition: ${r.w.transition};
  }

  &::before {
    right: -16px;
    left: -16px;
    width: auto;
    background: 0;
    border-right: 1px solid ${r.w.colors.accent};
    border-left: 1px solid ${r.w.colors.accent};
  }

  &::after {
    right: 0;
    left: 0;
    height: 1px;
    width: auto;
  }

  & span {
    position: relative;
    display: inline-block;

    &::before,
    &::after {
      top: -2px;
      left: auto;
      right: auto;
      width: 0;
      height: 1px;
      transition: ${r.w.transition};
    }

    &::before {
      left: -18px;
    }

    &::after {
      right: -18px;
    }
  }

  &:hover,
  &:focus {
    &::before {
      top: 0;
    }
    &::after {
      right: -16px;
      left: -16px;
    }

    & span::before,
    & span::after {
      width: 60%;
    }
  }
`},4586:(e,t,i)=>{i.d(t,{$j:()=>l,mc:()=>s,wn:()=>a});var o=i(1529),n=i(7291);const r=o.i7`
  0% {
    transform: scale(2);
    filter: blur(4px);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    filter: blur(0px);
    opacity: 1;
  }
`,a=o.Ay.section`
  position: relative;
  margin: 0 auto;
  padding: 30px 0;
  width: 100%;

  @media screen and (min-width: ${n.w.breakpoints.tablet}) {
    padding: 50px 0;
  }

  @media screen and (min-width: ${n.w.breakpoints.desktop}) {
    padding: 70px 0;
  }
`,s=o.Ay.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;

  @media screen and (min-width: ${n.w.breakpoints.tablet}) {
    padding: 0 30px;
  }

  @media screen and (min-width: ${n.w.breakpoints.desktop}) {
    max-width: ${n.w.breakpoints.desktop};
    padding: 0 80px;
  }
`,l=(o.Ay.h1`
  margin-bottom: 30px;

  font-family: ${n.w.fonts[1]};
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  color: ${e=>e.$white?n.w.colors.fon:n.w.colors.grey1};

  /* animation: ${r} 0.7s cubic-bezier(0.47, 0, 0.745, 0.715)
    both; */

  @media screen and (min-width: ${n.w.breakpoints.desktop}) {
    font-size: 36px;
  }

  @media screen and (min-width: ${n.w.breakpoints.desktop}) {
    margin-bottom: 45px;
    font-size: 40px;
  }
`,o.Ay.h2`
  font-family: ${n.w.fonts[0]};
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px;
  text-transform: capitalize;

  color: ${n.w.colors.grey1};

  @media screen and (min-width: ${n.w.breakpoints.tablet}) {
    font-size: 36px;
  }

  @media screen and (min-width: ${n.w.breakpoints.desktop}) {
    font-size: 52px;
    line-height: 65px; /* 125% */
  }
`);o.Ay.p`
  font-family: ${n.w.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  text-align: center;

  color: ${e=>e.$white?n.w.colors.white:n.w.colors.grey2};

  @media screen and (min-width: ${n.w.breakpoints.desktop}) {
    font-size: 18px;
  }

  @media screen and (min-width: ${n.w.breakpoints.desktop}) {
    font-size: 24px;
    line-height: 39px; /* 162.5% */
  }
`},8258:(e,t,i)=>{i.d(t,{$D:()=>m,S1:()=>d,ZQ:()=>h,lR:()=>A,q:()=>c,zB:()=>p});var o=i(1529),n=i(3892),r=i(184),a=i(1384),s=i(7291),l=i(4586);const d=(0,o.Ay)(l.$j)`
  font-size: 18px;

  @media screen and (min-width: ${s.w.breakpoints.tablet}) {
    font-size: 24px;
  }

  @media screen and (min-width: ${s.w.breakpoints.tablet}) {
    font-size: 32px;
  }
`,c=(0,o.Ay)(n.lV)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
`,p=(o.Ay.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: stretch;
  gap: 15px;

  width: 100%;

  @media screen and (min-width: ${s.w.breakpoints.desktop}) {
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }
`,o.Ay.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
`),A=o.Ay.label`
  font-family: ${s.w.fonts[0]};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px; /* 80% */
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: ${s.w.colors.grey1};

  @media screen and (min-width: ${s.w.breakpoints.tablet}) {
    font-size: 16px;
  }

  @media screen and (min-width: ${s.w.breakpoints.desktop}) {
    font-size: 18px;
  }
`,h=(o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;

  width: 100%;

  font-family: ${s.w.fonts[0]};
  font-size: 12px;
  font-weight: 500;
  line-height: 1.33;
  letter-spacing: 0.04em;
`,o.Ay.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;

  width: 70%;

  font-family: ${s.w.fonts[0]};
  font-size: 10px;
  font-weight: 500;
  line-height: 1.33;
  letter-spacing: 0.04em;
`,o.Ay.div`
  display: flex;
  gap: 8px;
  width: 70%;
`,o.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 70%;

  & input {
    width: calc(100% - 42px);
  }
`,(0,o.Ay)(n.D0)`
  width: 100%;
  padding: 12px;

  font-family: ${s.w.fonts[0]};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 100% */
  letter-spacing: 1.6px;
  /* text-transform: capitalize; */
  color: ${s.w.colors.grey2};

  background: ${s.w.colors.white};
  border: none;
  border-radius: 14px;
  transition: ${s.w.transition};

  &:focus,
  &:hover {
    outline: none;
  }

  @media screen and (min-width: ${s.w.breakpoints.tablet}) {
    padding: 16px;
    font-size: 14px;
  }

  @media screen and (min-width: ${s.w.breakpoints.desktop}) {
    max-width: 365px;
    padding: 16px 25px;
    font-size: 16px;
  }

  &::placeholder {
    color: ${s.w.colors.grey2};
  }

  &:hover,
  &:focus,
  &:focus-within {
    &::placeholder {
      opacity: 0;
    }
  }
`),m=(o.Ay.span`
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  right: 6%;
  top: 62%;
  transform: translateY(-80%);
  color: grey;

  cursor: pointer;

  & svg {
    width: inherit;
    height: inherit;
  }
`,o.Ay.span`
  position: absolute;
  left: 20px;
  top: 13px;

  font-family: ${s.w.fonts[0]};
  font-size: ${s.w.fontSizes.small};
  text-transform: uppercase;
  pointer-events: none;

  transition: ${s.w.transition};
`,(0,o.Ay)(r.CMH)`
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  right: 6%;
  top: 62%;
  transform: translateY(-80%);
  color: grey;
  cursor: pointer;

  & svg {
    width: inherit;
    height: inherit;
  }
`,(0,o.Ay)(r.QCr)`
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  right: 6%;
  top: 62%;
  transform: translateY(-80%);
  color: grey;
  cursor: pointer;

  & svg {
    width: inherit;
    height: inherit;
  }
`,(0,o.Ay)(a.rt)`
  &:disabled {
    opacity: 0.5;
    cursor: auto;
  }
`,o.Ay.span`
  position: absolute;
  bottom: -15px;
  right: 0px;
  z-index: 99;

  font-family: ${s.w.fonts[0]};
  font-style: normal;
  font-weight: 400;
  font-size: 8px;
  text-align: right;
  color: ${s.w.colors.red};
`)},3883:(e,t,i)=>{i.r(t),i.d(t,{default:()=>_});var o=i(3216),n=i(5043),r=i(8617),a=i(3969),s=i(6647),l=i(9181),d=i(6595),c=i(4799),p=i(947),A=i(7457),h=i(7471),m=i(5298),x=i(3003),w=i(4321),f=i(1382),g=i(579);const b=()=>{const e=(0,x.wA)(),[t,i]=(0,n.useState)(!1),{setOpenChangePassword:o}=(0,f.B)(),r=(0,n.useRef)(null),b=e=>{r.current&&r.current.contains(e.target)||i(!1)};return(0,g.jsx)(a.A,{display:"flex",justifyContent:"end",p:2,children:(0,g.jsxs)(a.A,{display:"flex",children:[(0,g.jsx)(s.A,{ref:r,onClick:()=>{i((e=>!e))},children:(0,g.jsx)(m.A,{})}),(0,g.jsx)(l.A,{open:t,anchorEl:r.current,role:void 0,placement:"bottom-end",transition:!0,disablePortal:!0,children:i=>{let{TransitionProps:n}=i;return(0,g.jsx)(d.A,{...n,style:{transformOrigin:"right top"},children:(0,g.jsx)(c.A,{children:(0,g.jsx)(p.x,{onClickAway:b,children:(0,g.jsxs)(A.A,{autoFocusItem:t,children:[(0,g.jsx)(h.A,{onClick:()=>o(!0),children:"\u0417\u043c\u0456\u043d\u0438\u0442\u0438 \u043f\u0430\u0440\u043e\u043b\u044c"}),(0,g.jsx)(h.A,{onClick:()=>e((0,w.je)()),children:"\u0412\u0438\u0439\u0442\u0438"})]})})})})}})]})})};var y=i(4223),u=i(267),j=i(5895),k=i(5475),S=(i(5645),i(7868)),v=i(144),$=i(2798),I=i(8932),C=i(1909),z=i(5714);const Q=e=>({..."dark"===e?{grey:{100:"#e0e0e0",200:"#c2c2c2",300:"#a3a3a3",400:"#858585",500:"#666666",600:"#525252",700:"#3d3d3d",800:"#292929",900:"#141414"},primary:{100:"#d0d1d5",200:"#a1a4ab",300:"#727681",400:"#434957",500:"#141b2d",600:"#101624",700:"#0c101b",800:"#080b12",900:"#040509"},greenAccent:{100:"#dbf5ee",200:"#b7ebde",300:"#94e2cd",400:"#70d8bd",500:"#4cceac",600:"#3da58a",700:"#2e7c67",800:"#1e5245",900:"#0f2922"},redAccent:{100:"#f8dcdb",200:"#f1b9b7",300:"#e99592",400:"#e2726e",500:"#db4f4a",600:"#af3f3b",700:"#832f2c",800:"#58201e",900:"#2c100f"},blueAccent:{100:"#e1e2fe",200:"#c3c6fd",300:"#a4a9fc",400:"#868dfb",500:"#6870fa",600:"#535ac8",700:"#3e4396",800:"#2a2d64",900:"#151632"}}:{grey:{100:"#141414",200:"#292929",300:"#3d3d3d",400:"#525252",500:"#666666",600:"#858585",700:"#a3a3a3",800:"#c2c2c2",900:"#e0e0e0"},primary:{100:"#040509",200:"#080b12",300:"#0c101b",400:"#f2f0f0",500:"#141b2d",600:"#434957",700:"#727681",800:"#a1a4ab",900:"#d0d1d5"},greenAccent:{100:"#0f2922",200:"#1e5245",300:"#2e7c67",400:"#3da58a",500:"#4cceac",600:"#70d8bd",700:"#94e2cd",800:"#b7ebde",900:"#dbf5ee"},redAccent:{100:"#2c100f",200:"#58201e",300:"#832f2c",400:"#af3f3b",500:"#db4f4a",600:"#e2726e",700:"#e99592",800:"#f1b9b7",900:"#f8dcdb"},blueAccent:{100:"#151632",200:"#2a2d64",300:"#3e4396",400:"#535ac8",500:"#6870fa",600:"#868dfb",700:"#a4a9fc",800:"#c3c6fd",900:"#e1e2fe"}}});var E=i(3978);const B=e=>{let{title:t,to:i,icon:o,selected:n,setSelected:r,className:a}=e;const s=(0,u.A)(),l=Q(s.palette.mode);return(0,g.jsxs)(y.Dr,{active:n===t,style:{color:l.grey[100]},onClick:()=>r(t),icon:o,children:[(0,g.jsx)(j.A,{className:a,children:t}),(0,g.jsx)(k.N_,{to:i})]})},Y=()=>{const e=(0,u.A)(),t=Q(e.palette.mode),[i,o]=(0,n.useState)(!1),[r,l]=(0,n.useState)("Dashboard"),d=(0,x.d4)(E.wz);return(0,g.jsx)(a.A,{sx:{"& .pro-sidebar-inner":{background:`${t.primary[400]} !important`},"& .pro-icon-wrapper":{backgroundColor:"transparent !important"},"& .pro-inner-item":{padding:"5px 35px 5px 20px !important"},"& .pro-inner-item:hover":{color:"#868dfb !important"},"& .pro-menu-item.active":{color:"#6870fa !important"}},children:(0,g.jsx)(y.M9,{collapsed:i,children:(0,g.jsxs)(y.W1,{iconShape:"square",children:[(0,g.jsx)(y.Dr,{onClick:()=>o(!i),icon:i?(0,g.jsx)(I.A,{}):void 0,style:{margin:"10px 0 20px 0",color:t.grey[100]},children:!i&&(0,g.jsxs)(a.A,{display:"flex",justifyContent:"space-between",alignItems:"center",ml:"15px",children:[(0,g.jsx)(j.A,{variant:"h4",color:t.grey[100],textTransform:"capitalize",children:d.role}),(0,g.jsx)(s.A,{onClick:()=>o(!i),children:(0,g.jsx)(I.A,{})})]})}),!i&&(0,g.jsxs)(a.A,{mb:"25px",children:[(0,g.jsx)(a.A,{display:"flex",justifyContent:"center",alignItems:"center",children:(0,g.jsx)("img",{alt:"profile-user",width:"100px",height:"100px",src:"data:image/jpeg;base64,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",style:{cursor:"pointer",borderRadius:"50%"}})}),(0,g.jsxs)(a.A,{textAlign:"center",children:[(0,g.jsx)(j.A,{variant:"h4",color:t.grey[100],fontWeight:"bold",sx:{m:"10px 0 0 0"},textTransform:"uppercase",children:d.name}),(0,g.jsx)(j.A,{variant:"h5",color:t.greenAccent[500],textTransform:"uppercase",children:d.role})]})]}),(0,g.jsxs)(a.A,{paddingLeft:i?void 0:"10%",children:[(0,g.jsx)(B,{title:"\u0417\u0430\u043b\u0438\u0448\u043a\u0438 \u043f\u043e \u0440\u0430\u0445\u0443\u043d\u043a\u0430\u043c",to:"account_balances",icon:(0,g.jsx)(S.A,{}),selected:r,setSelected:l,className:"account_balances"}),(0,g.jsx)(j.A,{variant:"h6",color:t.grey[300],sx:{m:"15px 0 5px 20px"},children:"\u0421\u043b\u043e\u0432\u043d\u0438\u043a\u0438"}),(0,g.jsx)(B,{title:"\u041d\u0430\u0437\u0432\u0438 \u0440\u0430\u0445\u0443\u043d\u043a\u0456\u0432",to:"accounts",icon:(0,g.jsx)(C.A,{}),selected:r,setSelected:l,className:"accounts"}),(0,g.jsx)(B,{title:"\u0413\u0440\u0443\u043f\u0438 \u0440\u0430\u0445\u0443\u043d\u043a\u0456\u0432",to:"group",icon:(0,g.jsx)($.A,{}),selected:r,setSelected:l,className:"group"}),(0,g.jsx)(B,{title:"\u0422\u0438\u043f\u0438 \u0440\u0430\u0445\u0443\u043d\u043a\u0456\u0432",to:"types",icon:(0,g.jsx)(z.A,{}),selected:r,setSelected:l,className:"types"}),(0,g.jsx)(B,{title:"\u0412\u0430\u043b\u044e\u0442\u0438",to:"currency",icon:(0,g.jsx)(v.A,{}),selected:r,setSelected:l,className:"currency"})]})]})})})};const M=i(1529).Ay.div`
display: flex;
flex-direction: row;
width: 100%;
justify-content: start;
align-items: start;
`;var D=i(5910);var O=i(3690),U=i(3892),N=i(2661),q=i(1314),P=i(4586),G=i(7291),R=i(518),L=i(8258),J=i(1384),Z=i(3023),F=i(1911),H=i(8776);const T=()=>{const[e,t]=(0,n.useState)(!1),[i,o]=(0,n.useState)(!1),{openChangePassword:r,setOpenChangePassword:a}=(0,f.B)(),s=(0,x.wA)(),l=(0,U.Wx)({initialValues:{email:"",password:""},validationSchema:q.A.changePasswordSchema,onSubmit:(e,i)=>{(async e=>{let{values:i}=e;t(!0);try{const{email:e,password:t}=i;await s((0,w.w2)({email:e,password:t})),a(!1)}catch(o){console.error("Change password error:",o)}finally{t(!1)}})({values:e,action:i})}}),d=!!(l.errors.email&&l.touched.email||""===l.values.email),c=(e,t)=>e?t?`${G.w.colors.red}`:`${G.w.colors.darkGreen}`:null;return(0,g.jsxs)(Z.A,{open:r,onClose:()=>a(!1),maxWidth:"md",fullWidth:!0,children:[(0,g.jsx)(F.A,{children:"\u043f\u0440\u043e\u0432\u043e\u0434\u0438\u043c\u043e \u0437\u043c\u0456\u043d\u0443 \u043f\u0430\u0440\u043e\u043b\u044f \u043d\u0430 \u043d\u043e\u0432\u0438\u0439"}),(0,g.jsx)(H.A,{children:(0,g.jsx)(P.wn,{children:(0,g.jsx)(P.mc,{children:(0,g.jsx)(U.l1,{validationSchema:q.A.changePasswordSchema,children:(0,g.jsxs)(R.c$,{onSubmit:l.handleSubmit,autoComplete:"off",children:[(0,g.jsx)(R.yt,{children:"\u0417\u043c\u0456\u043d\u0438\u0442\u0438 \u043f\u0430\u0440\u043e\u043b\u044c"}),(0,g.jsxs)(L.zB,{children:[(0,g.jsxs)(L.lR,{htmlFor:"email",children:[(0,g.jsx)("span",{children:"E-mail"}),l.errors.email&&l.touched.email?(0,g.jsx)(L.$D,{children:l.errors.email}):null]}),(0,g.jsx)(R.w4,{bordercolor:c(l.values.email,l.errors.email),name:"email",type:"email",value:l.values.email,validate:q.A.changePasswordSchema.email,onChange:l.handleChange,onBlur:l.handleBlur}),l.errors.email&&l.touched.email?(0,g.jsx)(R.aV,{style:{bottom:"22px"},children:l.errors.email}):null]}),(0,g.jsxs)(L.zB,{children:[(0,g.jsxs)(L.lR,{htmlFor:"password",children:[(0,g.jsx)("span",{children:"\u041d\u043e\u0432\u0438\u0439 \u041f\u0430\u0440\u043e\u043b\u044c"}),l.errors.password&&l.touched.password?(0,g.jsx)(L.$D,{children:l.errors.password}):null]}),(0,g.jsx)(R.w4,{bordercolor:c(l.values.password,l.errors.emapasswordil),name:"password",type:i?"text":"password",value:l.values.password,validate:q.A.changePasswordSchema.password,onChange:l.handleChange,onBlur:l.handleBlur}),(0,g.jsx)(R.NW,{onClick:()=>{o(!i)},children:i?(0,g.jsx)(N.KeP,{}):(0,g.jsx)(N.qIT,{})}),l.errors.password&&l.touched.password?(0,g.jsx)(R.aV,{style:{bottom:"22px"},children:l.errors.password}):null]}),(0,g.jsx)(J.rt,{style:{height:"auto"},type:"submit",disabled:d,"aria-label":"\u0417\u043c\u0456\u043d\u0438\u0442\u0438 \u043f\u0430\u0440\u043e\u043b\u044c",children:e?"\u0412 \u043f\u0440\u043e\u0446\u0435\u0441\u0456":"\u0417\u043c\u0456\u043d\u0438\u0442\u0438"})]})})})})})]})};var X=i(9783),K=i(6554),W=i(3899),V=i(9433);const _=()=>{const[e]=(0,n.useState)(!1),[t]=(0,n.useState)(null),i=(0,x.wA)();return(0,n.useEffect)((()=>{window.scrollTo({top:0,left:0,behavior:"smooth"}),i((0,X.VC)()),i((0,K.Is)()),i((0,W.nJ)()),i((0,V.DI)())}),[i]),(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(r.k,{title:"Administration",description:"Page Administration"}),e?D.Loading.circle("Loading...",{backgroundColor:"transparent",svgSize:"160px",svgColor:`${e=>e.theme.white_fon}`,messageFontSize:"20px"}):D.Loading.remove(),t&&(0,O.K5)("Whoops, something went wrong"),(0,g.jsx)(b,{}),(0,g.jsxs)(M,{children:[(0,g.jsx)(Y,{}),(0,g.jsx)(o.sv,{}),(0,g.jsx)(T,{})]})]})}},1314:(e,t,i)=>{i.d(t,{A:()=>l});var o=i(899);const n=o.Ik().shape({name:o.Yj().required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),email:o.Yj().email("\u041f\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435 email").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),phone:o.ai().min(99999,"\u041d\u043e\u043c\u0435\u0440 \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u043a\u043e\u0440\u043e\u0442\u043a\u0438").max(999999999999,"\u041d\u043e\u043c\u0435\u0440 \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u0432\u0435\u043b\u0438\u043a\u0438\u0439").nullable(!0).required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),password:o.Yj().min(4,"\u041f\u0430\u0440\u043e\u043b\u044c \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u043c\u0430\u043b\u0438\u0439 (min 4)").max(32,"\u041f\u0430\u0440\u043e\u043b\u044c \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u0432\u0435\u043b\u0438\u043a\u0438\u0439 (max 32)").matches(/^\s*\S+\s*$/,"\u041f\u0430\u0440\u043e\u043b\u044c \u043d\u0435 \u043f\u043e\u0432\u0438\u043d\u0435\u043d \u043c\u0456\u0441\u0442\u0438\u0442\u0438 \u043f\u0440\u043e\u043f\u0443\u0441\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440")}),r=o.Ik().shape({email:o.Yj().email("\u041f\u043e\u043c\u0438\u043b\u043a\u0430 \u0432 \u0434\u0430\u043d\u0438\u0445 \u043f\u043e\u0448\u0442\u043e\u0432\u043e\u0457 \u0441\u043a\u0440\u0438\u043d\u044c\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),password:o.Yj().min(4,"\u041f\u0430\u0440\u043e\u043b\u044c \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u043c\u0430\u043b\u0438\u0439 (min 4)").max(32,"\u041f\u0430\u0440\u043e\u043b\u044c \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u0432\u0435\u043b\u0438\u043a\u0438\u0439 (max 32)").matches(/^\s*\S+\s*$/,"\u041f\u0430\u0440\u043e\u043b\u044c \u043d\u0435 \u043f\u043e\u0432\u0438\u043d\u0435\u043d \u043c\u0456\u0441\u0442\u0438\u0442\u0438 \u043f\u0440\u043e\u043f\u0443\u0441\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440")}),a=o.Ik().shape({email:o.Yj().email("\u041f\u043e\u043c\u0438\u043b\u043a\u0430 \u0432 \u0434\u0430\u043d\u0438\u0445 \u043f\u043e\u0448\u0442\u043e\u0432\u043e\u0457 \u0441\u043a\u0440\u0438\u043d\u044c\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),password:o.Yj().min(4,"\u041f\u0430\u0440\u043e\u043b\u044c \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u043c\u0430\u043b\u0438\u0439 (min 4)").max(32,"\u041f\u0430\u0440\u043e\u043b\u044c \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u0432\u0435\u043b\u0438\u043a\u0438\u0439 (max 32)").matches(/^\s*\S+\s*$/,"\u041f\u0430\u0440\u043e\u043b\u044c \u043d\u0435 \u043f\u043e\u0432\u0438\u043d\u0435\u043d \u043c\u0456\u0441\u0442\u0438\u0442\u0438 \u043f\u0440\u043e\u043f\u0443\u0441\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440")}),s=o.Ik().shape({email:o.Yj().email("\u041f\u043e\u043c\u0438\u043b\u043a\u0430 \u0432 \u0434\u0430\u043d\u0438\u0445 \u043f\u043e\u0448\u0442\u043e\u0432\u043e\u0457 \u0441\u043a\u0440\u0438\u043d\u044c\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440")}),l={registerSchema:n,schemasLogin:r,changePasswordSchema:a,updateUserSchema:o.Ik().shape({name:o.Yj().required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),surname:o.Yj(),email:o.Yj().email("\u041f\u043e\u043c\u0438\u043b\u043a\u0430 \u0432 \u0434\u0430\u043d\u0438\u0445 \u043f\u043e\u0448\u0442\u043e\u0432\u043e\u0457 \u0441\u043a\u0440\u0438\u043d\u044c\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),phone:o.ai(),avatar:o.Yj(),favorites:o.YO(),events:o.YO(),role:o.Yj()}),createUserSchema:o.Ik().shape({name:o.Yj().required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),surname:o.Yj(),email:o.Yj().email("\u041f\u043e\u043c\u0438\u043b\u043a\u0430 \u0432 \u0434\u0430\u043d\u0438\u0445 \u043f\u043e\u0448\u0442\u043e\u0432\u043e\u0457 \u0441\u043a\u0440\u0438\u043d\u044c\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),password:o.Yj(),phone:o.ai(),avatar:o.Yj(),favorites:o.YO(),events:o.YO(),role:o.Yj()}),updatePasswordSchema:o.Ik().shape({password:o.Yj(),confirmPassword:o.Yj()}),forgotPasswordSchema:s}}}]);
//# sourceMappingURL=46.f4d1a389.chunk.js.map
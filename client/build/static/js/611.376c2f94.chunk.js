"use strict";(self.webpackChunkAddax_CRM=self.webpackChunkAddax_CRM||[]).push([[611],{518:(e,t,i)=>{i.d(t,{MG:()=>c,NW:()=>m,aV:()=>p,ah:()=>w,c$:()=>f,vX:()=>x,w4:()=>h,yt:()=>d});var o=i(8258),n=i(7291),r=i(1529),a=i(1384),s=i(5475),l=i(4586);const d=(0,r.Ay)(o.S1)`
  width: 100%;
  text-align: start;
`,p=r.Ay.div`
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
`,c=(0,r.Ay)(l.mc)`
  max-width: 250px;
  @media screen and (min-width: ${n.w.breakpoints.tablet}) {
    max-width: 540px;
  }
`,h=(0,r.Ay)(o.ZQ)`
  min-width: 250px;

  @media screen and (min-width: ${n.w.breakpoints.tablet}) {
    min-width: 450px;
    margin-bottom: 35px;
  }
`,m=r.Ay.span`
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
    height: 50px;
    top: 62%;
  }
  & svg {
    width: inherit;
    height: inherit;
  }
`,w=((0,r.Ay)(a.rt)`
  font-size: 14px;
  width: 180px;
  height: 50px;

  @media screen and (min-width: ${n.w.breakpoints.tablet}) {
    font-size: 16px;
    width: 217px;
    height: 70px;
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
    font-family: ${n.w.fonts[0]};
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0.04em;
    color: ${n.w.colors.grey1};

    @media screen and (min-width: ${n.w.breakpoints.tablet}) {
      font-size: 16px;
    }

    @media screen and (min-width: ${n.w.breakpoints.desktop}) {
      font-size: 18px;
    }
  }
`,f=(0,r.Ay)(o.q)`
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
`},8258:(e,t,i)=>{i.d(t,{$D:()=>w,S1:()=>d,ZQ:()=>m,lR:()=>h,q:()=>p,zB:()=>c});var o=i(1529),n=i(3892),r=i(184),a=i(1384),s=i(7291),l=i(4586);const d=(0,o.Ay)(l.$j)`
  font-size: 18px;

  @media screen and (min-width: ${s.w.breakpoints.tablet}) {
    font-size: 24px;
  }

  @media screen and (min-width: ${s.w.breakpoints.tablet}) {
    font-size: 32px;
  }
`,p=(0,o.Ay)(n.lV)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
`,c=(o.Ay.div`
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
`),h=o.Ay.label`
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
`,m=(o.Ay.div`
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
`),w=(o.Ay.span`
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
`)},611:(e,t,i)=>{i.r(t),i.d(t,{default:()=>g});var o=i(5043),n=i(8617),r=i(3003),a=i(2661),s=i(3892),l=i(1314),d=i(7291),p=i(4586),c=i(8258),h=i(1384),m=i(518),w=i(9388),x=i(579);const f=()=>{const[e,t]=(0,o.useState)(!1),[i,n]=(0,o.useState)(!1),f=(0,r.wA)(),g=(0,s.Wx)({initialValues:{email:"",password:""},validationSchema:l.A.schemasLogin,onSubmit:e=>{n(!0);const{email:t,password:i}=e;f((0,w.E8)({email:t,password:i})),n(!1)}}),u=!!(g.errors.email&&g.touched.email||g.errors.password&&g.touched.password||""===g.values.email),b=(e,t)=>e?t?`${d.w.colors.red}`:`${d.w.colors.darkGreen}`:null;return(0,x.jsx)(p.wn,{children:(0,x.jsx)(p.mc,{children:(0,x.jsx)(s.l1,{validationSchema:l.A.schemasLogin,children:(0,x.jsxs)(m.c$,{onSubmit:g.handleSubmit,autoComplete:"off",children:[(0,x.jsx)(m.yt,{hidden:!0,children:"Log In"}),(0,x.jsxs)(c.zB,{children:[(0,x.jsxs)(c.lR,{htmlFor:"email",children:[(0,x.jsx)("span",{children:"Email"}),g.errors.name&&g.touched.name?(0,x.jsx)(c.$D,{children:g.errors.name}):null]}),(0,x.jsx)(m.w4,{style:{borderColor:b(g.values.email,g.errors.email)},name:"email",type:"email",onChange:g.handleChange,value:g.values.email,onBlur:g.handleBlur})]}),(0,x.jsxs)(c.zB,{children:[(0,x.jsxs)(c.lR,{htmlFor:"password",children:[(0,x.jsx)("span",{children:"Password"}),g.errors.name&&g.touched.name?(0,x.jsx)(c.$D,{children:g.errors.name}):null]}),(0,x.jsx)(m.w4,{style:{borderColor:b(g.values.password,g.errors.password)},name:"password",type:e?"text":"password",onChange:g.handleChange,value:g.values.password,onBlur:g.handleBlur}),(0,x.jsx)(m.NW,{onClick:()=>{t(!e)},children:e?(0,x.jsx)(a.KeP,{}):(0,x.jsx)(a.qIT,{})}),g.errors.password&&g.touched.password?(0,x.jsx)(m.aV,{children:g.errors.password}):null]}),(0,x.jsxs)(m.MG,{children:[(0,x.jsx)(m.vX,{children:(0,x.jsx)(m.ah,{to:"/signup",children:"You are new here?"})}),(0,x.jsx)(m.vX,{children:(0,x.jsx)(m.ah,{to:"/forgot_password",children:"Forgot password?"})}),(0,x.jsx)(h.rt,{type:"submit",disabled:u,"aria-label":"submit log in",children:i?"Loading":"Log In"})]})]})})})})},g=()=>((0,o.useEffect)((()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})}),[]),(0,x.jsxs)(x.Fragment,{children:[(0,x.jsx)(n.k,{title:"Login",description:""}),(0,x.jsx)(f,{})]}))},1314:(e,t,i)=>{i.d(t,{A:()=>n});var o=i(899);const n={registerSchema:o.Ik().shape({name:o.Yj().required("Require field"),email:o.Yj().email("Invalid email").required("Require field"),phone:o.ai().nullable(!0).required("Require field"),password:o.Yj().min(4,"Password too short (min 4)").max(32,"Password too long (max 32)").matches(/^\s*\S+\s*$/,"Password must be without spaces").required("Require")}),schemasLogin:o.Ik().shape({email:o.Yj().email("Invalid email").required("Require"),password:o.Yj().min(4,"Password too short (min 4)").max(32,"Password too long (max 32)").matches(/^\s*\S+\s*$/,"Password must be without spaces").required("Require")}),changePasswordSchema:o.Ik().shape({email:o.Yj().email("Invalid email").required("Require field"),password:o.Yj().min(4,"Password too short (min 4)").max(32,"Password too long (max 32)").matches(/^\s*\S+\s*$/,"Password must be without spaces").required("Require")}),updateUserSchema:o.Ik().shape({name:o.Yj().required("Require field"),surname:o.Yj(),email:o.Yj().email("Invalid email").required("Require field"),phone:o.ai(),avatar:o.Yj(),favorites:o.YO(),events:o.YO(),role:o.Yj()}),createUserSchema:o.Ik().shape({name:o.Yj().required("Require field"),surname:o.Yj(),email:o.Yj().email("Invalid email").required("Require field"),password:o.Yj(),phone:o.ai(),avatar:o.Yj(),favorites:o.YO(),events:o.YO(),role:o.Yj()}),updatePasswordSchema:o.Ik().shape({password:o.Yj(),confirmPassword:o.Yj()})}}}]);
//# sourceMappingURL=611.376c2f94.chunk.js.map
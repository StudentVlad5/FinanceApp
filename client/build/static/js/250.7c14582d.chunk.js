"use strict";(self.webpackChunkAddax_CRM=self.webpackChunkAddax_CRM||[]).push([[250],{1384:(e,t,i)=>{i.d(t,{rt:()=>a});var n=i(5475),o=i(1529),r=i(7291);const a=o.Ay.button`
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
`;o.Ay.button`
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
`,(0,o.Ay)(n.k2)`
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
`},4586:(e,t,i)=>{i.d(t,{$j:()=>l,mc:()=>s,wn:()=>a});var n=i(1529),o=i(7291);const r=n.i7`
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
`,a=n.Ay.section`
  position: relative;
  margin: 0 auto;
  padding: 30px 0;
  width: 100%;

  @media screen and (min-width: ${o.w.breakpoints.tablet}) {
    padding: 50px 0;
  }

  @media screen and (min-width: ${o.w.breakpoints.desktop}) {
    padding: 70px 0;
  }
`,s=n.Ay.div`
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;

  @media screen and (min-width: ${o.w.breakpoints.tablet}) {
    padding: 0 30px;
  }

  @media screen and (min-width: ${o.w.breakpoints.desktop}) {
    max-width: ${o.w.breakpoints.desktop};
    padding: 0 80px;
  }
`,l=(n.Ay.h1`
  margin-bottom: 30px;

  font-family: ${o.w.fonts[1]};
  font-size: 28px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-align: center;
  color: ${e=>e.$white?o.w.colors.fon:o.w.colors.grey1};

  /* animation: ${r} 0.7s cubic-bezier(0.47, 0, 0.745, 0.715)
    both; */

  @media screen and (min-width: ${o.w.breakpoints.desktop}) {
    font-size: 36px;
  }

  @media screen and (min-width: ${o.w.breakpoints.desktop}) {
    margin-bottom: 45px;
    font-size: 40px;
  }
`,n.Ay.h2`
  font-family: ${o.w.fonts[0]};
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 35px;
  text-transform: capitalize;

  color: ${o.w.colors.grey1};

  @media screen and (min-width: ${o.w.breakpoints.tablet}) {
    font-size: 36px;
  }

  @media screen and (min-width: ${o.w.breakpoints.desktop}) {
    font-size: 52px;
    line-height: 65px; /* 125% */
  }
`);n.Ay.p`
  font-family: ${o.w.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px; /* 150% */
  text-align: center;

  color: ${e=>e.$white?o.w.colors.white:o.w.colors.grey2};

  @media screen and (min-width: ${o.w.breakpoints.desktop}) {
    font-size: 18px;
  }

  @media screen and (min-width: ${o.w.breakpoints.desktop}) {
    font-size: 24px;
    line-height: 39px; /* 162.5% */
  }
`},8258:(e,t,i)=>{i.d(t,{$D:()=>w,S1:()=>d,ZQ:()=>m,lR:()=>h,q:()=>p,zB:()=>c});var n=i(1529),o=i(3892),r=i(184),a=i(1384),s=i(7291),l=i(4586);const d=(0,n.Ay)(l.$j)`
  font-size: 18px;

  @media screen and (min-width: ${s.w.breakpoints.tablet}) {
    font-size: 24px;
  }

  @media screen and (min-width: ${s.w.breakpoints.tablet}) {
    font-size: 32px;
  }
`,p=(0,n.Ay)(o.lV)`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
`,c=(n.Ay.div`
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
`,n.Ay.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
`),h=n.Ay.label`
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
`,m=(n.Ay.div`
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
`,n.Ay.div`
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
`,n.Ay.div`
  display: flex;
  gap: 8px;
  width: 70%;
`,n.Ay.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 70%;

  & input {
    width: calc(100% - 42px);
  }
`,(0,n.Ay)(o.D0)`
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
`),w=(n.Ay.span`
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
`,n.Ay.span`
  position: absolute;
  left: 20px;
  top: 13px;

  font-family: ${s.w.fonts[0]};
  font-size: ${s.w.fontSizes.small};
  text-transform: uppercase;
  pointer-events: none;

  transition: ${s.w.transition};
`,(0,n.Ay)(r.CMH)`
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
`,(0,n.Ay)(r.QCr)`
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
`,(0,n.Ay)(a.rt)`
  &:disabled {
    opacity: 0.5;
    cursor: auto;
  }
`,n.Ay.span`
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
`)},8250:(e,t,i)=>{i.r(t),i.d(t,{default:()=>z});var n=i(5043),o=i(8617),r=i(3003),a=i(2661),s=i(3892),l=i(1314),d=i(7291),p=i(4586),c=i(8258),h=i(1384),m=i(1529),w=i(5475);const x=(0,m.Ay)(c.S1)`
  width: 100%;
  text-align: start;
`,f=(m.Ay.div`
  position: absolute;
  white-space: nowrap;
  bottom: -5px;
  left: 15px;
  margin-bottom: -16px;
  color: #e53e3e;
  font-family: ${d.w.fonts[1]};
  font-size: ${d.w.fontSizes.small};
  font-style: normal;
  line-height: 1.4;
  letter-spacing: 0.03em;
  @media screen and (min-width: ${d.w.breakpoints.tablet}) {
    left: 32px;
  }
`,(0,m.Ay)(p.mc)`
  max-width: 250px;
  @media screen and (min-width: ${d.w.breakpoints.tablet}) {
    max-width: 540px;
  }
`),g=(0,m.Ay)(c.ZQ)`
  min-width: 250px;
  border: 1px solid ${e=>e.bordercolor||"transparent"};
  @media screen and (min-width: ${d.w.breakpoints.tablet}) {
    min-width: 450px;
    margin-bottom: 35px;
  }
`,u=m.Ay.span`
  display: inline-block;
  position: absolute;
  width: 20px;
  height: 20px;
  right: 6%;
  top: 80%;
  transform: translateY(-80%);
  color: ${d.w.colors.grey2};
  cursor: pointer;
  @media screen and (min-width: ${d.w.breakpoints.tablet}) {
    top: 62%;
    height: 50px;
  }
  & svg {
    width: inherit;
    height: inherit;
  }
`,b=((0,m.Ay)(h.rt)`
  font-size: 14px;
  width: 180px;
  height: 50px;

  @media screen and (min-width: ${d.w.breakpoints.tablet}) {
    width: 217px;
    height: 70px;
    font-size: 16px;
  }

  @media screen and (min-width: ${d.w.breakpoints.tablet}) {
    font-size: 18px;
  }
`,(0,m.Ay)(w.N_)`
  color: ${d.w.colors.grey2};
  transition: ${d.w.transition[0]};
  text-decoration: none;

  &:hover,
  &:focus {
    color: ${d.w.colors.accent};
  }
`),y=m.Ay.div`
  display: flex;
  justify-content: center;
  align-items: end;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 16px;

  & span {
    color: ${d.w.colors.grey1};
    font-weight: 400;
    font-size: 14px;
    font-family: ${d.w.fonts[0]};
    font-style: normal;
    letter-spacing: 0.04em;

    @media screen and (min-width: ${d.w.breakpoints.tablet}) {
      font-size: 16px;
    }

    @media screen and (min-width: ${d.w.breakpoints.desktop}) {
      font-size: 18px;
    }
  }
`,$=(0,m.Ay)(c.q)`
  gap: 15px;
  &:last-child {
    margin-bottom: 20px;
  }
`;var k=i(4321),j=i(579);const v=()=>{const[e,t]=(0,n.useState)(!1),[i,o]=(0,n.useState)(!1),m=(0,r.wA)(),w=(0,s.Wx)({initialValues:{email:"",name:"",phone:"",password:""},validationSchema:l.A.registerSchema,onSubmit:e=>{o(!0);const{email:t,name:i,phone:n,password:r}=e;m((0,k.kz)({email:t,name:i,phone:n.toString(),password:r})),o(!1)}}),v=!!(w.errors.email&&w.touched.email||w.errors.password&&w.touched.password||w.errors.name&&w.touched.name||w.errors.phone&&w.touched.phone),z=(e,t)=>e?t?`${d.w.colors.red}`:`${d.w.colors.darkGreen}`:null;return(0,j.jsx)(p.wn,{children:(0,j.jsx)(p.mc,{children:(0,j.jsx)(s.l1,{validationSchema:l.A.registerSchema,children:(0,j.jsxs)($,{onSubmit:w.handleSubmit,autoComplete:"off",children:[(0,j.jsx)(x,{hidden:!0,children:"\u0420\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044f"}),(0,j.jsxs)(c.zB,{children:[(0,j.jsxs)(c.lR,{htmlFor:"name",children:[(0,j.jsx)("span",{children:"\u0406\u043c'\u044f"}),w.errors.name&&w.touched.name?(0,j.jsx)(c.$D,{children:w.errors.name}):null]}),(0,j.jsx)(g,{bordercolor:z(w.values.name,w.errors.name),name:"name",type:"text",validate:l.A.schemasLogin.name,onChange:w.handleChange,value:w.values.name,onBlur:w.handleBlur})]}),(0,j.jsxs)(c.zB,{children:[(0,j.jsxs)(c.lR,{htmlFor:"email",children:[(0,j.jsx)("span",{children:"Email"}),w.errors.email&&w.touched.email?(0,j.jsx)(c.$D,{children:w.errors.email}):null]}),(0,j.jsx)(g,{bordercolor:z(w.values.email,w.errors.email),name:"email",type:"email",validate:l.A.schemasLogin.email,onChange:w.handleChange,value:w.values.email,onBlur:w.handleBlur})]}),(0,j.jsxs)(c.zB,{children:[(0,j.jsxs)(c.lR,{htmlFor:"phone",children:[(0,j.jsx)("span",{children:"\u041d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0443"}),w.errors.phone&&w.touched.phone?(0,j.jsx)(c.$D,{children:w.errors.phone}):null]}),(0,j.jsx)(g,{bordercolor:z(w.values.phone,w.errors.phone),name:"phone",type:"number",validate:l.A.schemasLogin.phone,onChange:w.handleChange,value:w.values.phone,onBlur:w.handleBlur})]}),(0,j.jsxs)(c.zB,{children:[(0,j.jsxs)(c.lR,{htmlFor:"password",children:[(0,j.jsx)("span",{children:"\u041f\u0430\u0440\u043e\u043b\u044c"}),w.errors.password&&w.touched.password?(0,j.jsx)(c.$D,{children:w.errors.password}):null]}),(0,j.jsx)(g,{bordercolor:z(w.values.password,w.errors.password),name:"password",type:e?"text":"password",onChange:w.handleChange,value:w.values.password,onBlur:w.handleBlur}),(0,j.jsx)(u,{onClick:()=>{t(!e)},children:e?(0,j.jsx)(a.KeP,{}):(0,j.jsx)(a.qIT,{})})]}),(0,j.jsxs)(f,{children:[(0,j.jsx)(y,{children:(0,j.jsx)(b,{to:"/login",children:"Already have account?"})}),(0,j.jsx)(h.rt,{type:"submit",disabled:v,"aria-label":"submit sign in",children:i?"Loading":"Sign In"})]})]})})})})},z=()=>((0,n.useEffect)((()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})}),[]),(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(o.k,{title:"Register",description:""}),(0,j.jsx)(v,{})]}))},1314:(e,t,i)=>{i.d(t,{A:()=>l});var n=i(899);const o=n.Ik().shape({name:n.Yj().required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),email:n.Yj().email("\u041f\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435 email").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),phone:n.ai().min(99999,"\u041d\u043e\u043c\u0435\u0440 \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u043a\u043e\u0440\u043e\u0442\u043a\u0438").max(999999999999,"\u041d\u043e\u043c\u0435\u0440 \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u0432\u0435\u043b\u0438\u043a\u0438\u0439").nullable(!0).required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),password:n.Yj().min(4,"\u041f\u0430\u0440\u043e\u043b\u044c \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u043c\u0430\u043b\u0438\u0439 (min 4)").max(32,"\u041f\u0430\u0440\u043e\u043b\u044c \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u0432\u0435\u043b\u0438\u043a\u0438\u0439 (max 32)").matches(/^\s*\S+\s*$/,"\u041f\u0430\u0440\u043e\u043b\u044c \u043d\u0435 \u043f\u043e\u0432\u0438\u043d\u0435\u043d \u043c\u0456\u0441\u0442\u0438\u0442\u0438 \u043f\u0440\u043e\u043f\u0443\u0441\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440")}),r=n.Ik().shape({email:n.Yj().email("\u041f\u043e\u043c\u0438\u043b\u043a\u0430 \u0432 \u0434\u0430\u043d\u0438\u0445 \u043f\u043e\u0448\u0442\u043e\u0432\u043e\u0457 \u0441\u043a\u0440\u0438\u043d\u044c\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),password:n.Yj().min(4,"\u041f\u0430\u0440\u043e\u043b\u044c \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u043c\u0430\u043b\u0438\u0439 (min 4)").max(32,"\u041f\u0430\u0440\u043e\u043b\u044c \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u0432\u0435\u043b\u0438\u043a\u0438\u0439 (max 32)").matches(/^\s*\S+\s*$/,"\u041f\u0430\u0440\u043e\u043b\u044c \u043d\u0435 \u043f\u043e\u0432\u0438\u043d\u0435\u043d \u043c\u0456\u0441\u0442\u0438\u0442\u0438 \u043f\u0440\u043e\u043f\u0443\u0441\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440")}),a=n.Ik().shape({email:n.Yj().email("\u041f\u043e\u043c\u0438\u043b\u043a\u0430 \u0432 \u0434\u0430\u043d\u0438\u0445 \u043f\u043e\u0448\u0442\u043e\u0432\u043e\u0457 \u0441\u043a\u0440\u0438\u043d\u044c\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),password:n.Yj().min(4,"\u041f\u0430\u0440\u043e\u043b\u044c \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u043c\u0430\u043b\u0438\u0439 (min 4)").max(32,"\u041f\u0430\u0440\u043e\u043b\u044c \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u0432\u0435\u043b\u0438\u043a\u0438\u0439 (max 32)").matches(/^\s*\S+\s*$/,"\u041f\u0430\u0440\u043e\u043b\u044c \u043d\u0435 \u043f\u043e\u0432\u0438\u043d\u0435\u043d \u043c\u0456\u0441\u0442\u0438\u0442\u0438 \u043f\u0440\u043e\u043f\u0443\u0441\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440")}),s=n.Ik().shape({email:n.Yj().email("\u041f\u043e\u043c\u0438\u043b\u043a\u0430 \u0432 \u0434\u0430\u043d\u0438\u0445 \u043f\u043e\u0448\u0442\u043e\u0432\u043e\u0457 \u0441\u043a\u0440\u0438\u043d\u044c\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440")}),l={registerSchema:o,schemasLogin:r,changePasswordSchema:a,updateUserSchema:n.Ik().shape({name:n.Yj().required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),surname:n.Yj(),email:n.Yj().email("\u041f\u043e\u043c\u0438\u043b\u043a\u0430 \u0432 \u0434\u0430\u043d\u0438\u0445 \u043f\u043e\u0448\u0442\u043e\u0432\u043e\u0457 \u0441\u043a\u0440\u0438\u043d\u044c\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),phone:n.ai(),avatar:n.Yj(),favorites:n.YO(),events:n.YO(),role:n.Yj()}),createUserSchema:n.Ik().shape({name:n.Yj().required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),surname:n.Yj(),email:n.Yj().email("\u041f\u043e\u043c\u0438\u043b\u043a\u0430 \u0432 \u0434\u0430\u043d\u0438\u0445 \u043f\u043e\u0448\u0442\u043e\u0432\u043e\u0457 \u0441\u043a\u0440\u0438\u043d\u044c\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),password:n.Yj(),phone:n.ai(),avatar:n.Yj(),favorites:n.YO(),events:n.YO(),role:n.Yj()}),updatePasswordSchema:n.Ik().shape({password:n.Yj(),confirmPassword:n.Yj()}),forgotPasswordSchema:s}}}]);
//# sourceMappingURL=250.7c14582d.chunk.js.map
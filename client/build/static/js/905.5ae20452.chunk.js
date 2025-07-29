"use strict";(self.webpackChunkAddax_CRM=self.webpackChunkAddax_CRM||[]).push([[905],{518:(e,t,i)=>{i.d(t,{MG:()=>c,NW:()=>m,aV:()=>p,ah:()=>w,c$:()=>x,vX:()=>f,w4:()=>h,yt:()=>d});var o=i(8258),n=i(7291),a=i(1529),r=i(1384),s=i(5475),l=i(4586);const d=(0,a.Ay)(o.S1)`
  width: 100%;
  text-align: start;
`,p=a.Ay.div`
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
`,c=(0,a.Ay)(l.mc)`
  max-width: 250px;
  @media screen and (min-width: ${n.w.breakpoints.tablet}) {
    max-width: 540px;
  }
`,h=(0,a.Ay)(o.ZQ)`
  min-width: 250px;
  border: 1px solid ${e=>e.bordercolor||"transparent"};
  @media screen and (min-width: ${n.w.breakpoints.tablet}) {
    min-width: 450px;
    margin-bottom: 35px;
  }
`,m=a.Ay.span`
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
`,w=((0,a.Ay)(r.rt)`
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
`,(0,a.Ay)(s.N_)`
  color: ${n.w.colors.grey2};
  transition: ${n.w.transition[0]};
  text-decoration: none;

  &:hover,
  &:focus {
    color: ${n.w.colors.accent};
  }
`),f=a.Ay.div`
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
`,x=(0,a.Ay)(o.q)`
  gap: 15px;
  &:last-child {
    margin-bottom: 20px;
  }
`},1384:(e,t,i)=>{i.d(t,{rt:()=>r});var o=i(5475),n=i(1529),a=i(7291);const r=n.Ay.button`
  display: flex;
  justify-content: center;
  align-items: center;

  min-width: 125px;
  padding: 13px 23px;
  margin: 0 auto;

  font-family: ${a.w.fonts[0]};
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${a.w.colors.grey1};
  text-transform: uppercase;

  background-color: ${a.w.colors.fon};
  border: 1px solid ${a.w.colors.grey1};
  border-radius: 7px;

  cursor: pointer;
  transition: ${a.w.transition};

  @media screen and (min-width: ${a.w.breakpoints.tablet}) {
    font-size: 14px;
    padding: 18px 33px;
  }

  @media screen and (min-width: ${a.w.breakpoints.desktop}) {
    font-size: 16px;
  }

  &:hover,
  &:focus {
    color: ${a.w.colors.white};
    background-color: ${a.w.colors.accent};
    border: 1px solid ${a.w.colors.accent};
  }
  &:disabled {
    color: ${a.w.colors.brown2};
    background-color: ${a.w.colors.grey1};
    opacity: 0.4;
    border: 1px solid ${a.w.colors.accent};
  }
`;n.Ay.button`
  min-width: 220px;
  padding: 13px 23px;
  margin: 0 auto;

  font-family: ${a.w.fonts[0]};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: ${a.w.colors.white};

  border-radius: 7px;
  background: ${a.w.colors.accent};
  border: 1px solid ${a.w.colors.accent};

  cursor: pointer;
  transition: ${a.w.transition};

  @media screen and (min-width: ${a.w.breakpoints.desktop}) {
    font-size: 20px;
  }

  &:hover,
  &:focus {
    color: ${a.w.colors.grey2};
    background-color: transparent;
    border: 1px solid ${a.w.colors.grey2};
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

  color: ${a.w.colors.grey1};
  font-family: ${a.w.fonts[0]};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */

  transition: ${a.w.transition};

  @media screen and (min-width: ${a.w.breakpoints.tablet}) {
  }

  @media screen and (min-width: ${a.w.breakpoints.desktop}) {
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
    background: ${a.w.colors.accent};
    transition: ${a.w.transition};
  }

  &::before {
    right: -16px;
    left: -16px;
    width: auto;
    background: 0;
    border-right: 1px solid ${a.w.colors.accent};
    border-left: 1px solid ${a.w.colors.accent};
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
      transition: ${a.w.transition};
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
`},4586:(e,t,i)=>{i.d(t,{$j:()=>l,mc:()=>s,wn:()=>r});var o=i(1529),n=i(7291);const a=o.i7`
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
`,r=o.Ay.section`
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

  /* animation: ${a} 0.7s cubic-bezier(0.47, 0, 0.745, 0.715)
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
`},8258:(e,t,i)=>{i.d(t,{$D:()=>w,S1:()=>d,ZQ:()=>m,lR:()=>h,q:()=>p,zB:()=>c});var o=i(1529),n=i(3892),a=i(184),r=i(1384),s=i(7291),l=i(4586);const d=(0,o.Ay)(l.$j)`
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
`,(0,o.Ay)(a.CMH)`
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
`,(0,o.Ay)(a.QCr)`
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
`,(0,o.Ay)(r.rt)`
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
`)},3905:(e,t,i)=>{i.r(t),i.d(t,{default:()=>g});var o=i(5043),n=i(8617),a=i(3216),r=i(3003),s=i(3892),l=i(4321),d=i(1314),p=i(4586),c=i(7291),h=i(518),m=i(8258),w=i(1384),f=i(579);const x=()=>{const[e,t]=(0,o.useState)(!1),i=(0,r.wA)(),n=(0,a.Zp)(),x=(0,s.Wx)({initialValues:{email:""},validationSchema:d.A.forgotPasswordSchema,onSubmit:async e=>{try{t(!0),await i((0,l.h)({email:e.email})),n("/login")}catch(o){console.error("Forgot password error:",o)}finally{t(!1)}}}),g=!!(x.errors.email&&x.touched.email||""===x.values.email);return(0,f.jsx)(p.wn,{children:(0,f.jsx)(p.mc,{children:(0,f.jsx)(s.l1,{validationSchema:d.A.forgotPasswordSchema,children:(0,f.jsxs)(h.c$,{onSubmit:x.handleSubmit,autoComplete:"off",children:[(0,f.jsx)(h.yt,{children:"\u0417\u0430\u0431\u0443\u0432 \u043f\u0430\u0440\u043e\u043b\u044c"}),(0,f.jsxs)(m.zB,{children:[(0,f.jsxs)(m.lR,{htmlFor:"email",children:[(0,f.jsx)("span",{children:"E-mail"}),x.errors.name&&x.touched.name?(0,f.jsx)(m.$D,{children:x.errors.name}):null]}),(0,f.jsx)(h.w4,{bordercolor:(b=x.values.email,u=x.errors.email,b?u?`${c.w.colors.red}`:`${c.w.colors.darkGreen}`:null),name:"email",type:"email",value:x.values.email,validate:d.A.forgotPasswordSchema.email,onChange:x.handleChange,onBlur:x.handleBlur}),x.errors.email&&x.touched.email?(0,f.jsx)(h.aV,{style:{bottom:"22px"},children:x.errors.email}):null]}),(0,f.jsx)(w.rt,{style:{height:"auto"},type:"submit",disabled:g,"aria-label":"submit to change password",children:e?"\u0412 \u043f\u0440\u043e\u0446\u0435\u0441\u0456":"\u0417\u043c\u0456\u043d\u0438\u0442\u0438"}),(0,f.jsxs)(h.vX,{children:[(0,f.jsx)("span",{children:"Already have an account?"}),(0,f.jsx)(h.ah,{to:"/login",children:"Log In"})]})]})})})});var b,u},g=()=>((0,o.useEffect)((()=>{window.scrollTo({top:0,left:0,behavior:"smooth"})}),[]),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(n.k,{title:"Forgot Password",description:""}),(0,f.jsx)(x,{})]}))},1314:(e,t,i)=>{i.d(t,{A:()=>l});var o=i(899);const n=o.Ik().shape({name:o.Yj().required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),email:o.Yj().email("\u041f\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435 email").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),phone:o.ai().min(99999,"\u041d\u043e\u043c\u0435\u0440 \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u043a\u043e\u0440\u043e\u0442\u043a\u0438").max(999999999999,"\u041d\u043e\u043c\u0435\u0440 \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u0432\u0435\u043b\u0438\u043a\u0438\u0439").nullable(!0).required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),password:o.Yj().min(4,"\u041f\u0430\u0440\u043e\u043b\u044c \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u043c\u0430\u043b\u0438\u0439 (min 4)").max(32,"\u041f\u0430\u0440\u043e\u043b\u044c \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u0432\u0435\u043b\u0438\u043a\u0438\u0439 (max 32)").matches(/^\s*\S+\s*$/,"\u041f\u0430\u0440\u043e\u043b\u044c \u043d\u0435 \u043f\u043e\u0432\u0438\u043d\u0435\u043d \u043c\u0456\u0441\u0442\u0438\u0442\u0438 \u043f\u0440\u043e\u043f\u0443\u0441\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440")}),a=o.Ik().shape({email:o.Yj().email("\u041f\u043e\u043c\u0438\u043b\u043a\u0430 \u0432 \u0434\u0430\u043d\u0438\u0445 \u043f\u043e\u0448\u0442\u043e\u0432\u043e\u0457 \u0441\u043a\u0440\u0438\u043d\u044c\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),password:o.Yj().min(4,"\u041f\u0430\u0440\u043e\u043b\u044c \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u043c\u0430\u043b\u0438\u0439 (min 4)").max(32,"\u041f\u0430\u0440\u043e\u043b\u044c \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u0432\u0435\u043b\u0438\u043a\u0438\u0439 (max 32)").matches(/^\s*\S+\s*$/,"\u041f\u0430\u0440\u043e\u043b\u044c \u043d\u0435 \u043f\u043e\u0432\u0438\u043d\u0435\u043d \u043c\u0456\u0441\u0442\u0438\u0442\u0438 \u043f\u0440\u043e\u043f\u0443\u0441\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440")}),r=o.Ik().shape({email:o.Yj().email("\u041f\u043e\u043c\u0438\u043b\u043a\u0430 \u0432 \u0434\u0430\u043d\u0438\u0445 \u043f\u043e\u0448\u0442\u043e\u0432\u043e\u0457 \u0441\u043a\u0440\u0438\u043d\u044c\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),password:o.Yj().min(4,"\u041f\u0430\u0440\u043e\u043b\u044c \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u043c\u0430\u043b\u0438\u0439 (min 4)").max(32,"\u041f\u0430\u0440\u043e\u043b\u044c \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u0432\u0435\u043b\u0438\u043a\u0438\u0439 (max 32)").matches(/^\s*\S+\s*$/,"\u041f\u0430\u0440\u043e\u043b\u044c \u043d\u0435 \u043f\u043e\u0432\u0438\u043d\u0435\u043d \u043c\u0456\u0441\u0442\u0438\u0442\u0438 \u043f\u0440\u043e\u043f\u0443\u0441\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440")}),s=o.Ik().shape({email:o.Yj().email("\u041f\u043e\u043c\u0438\u043b\u043a\u0430 \u0432 \u0434\u0430\u043d\u0438\u0445 \u043f\u043e\u0448\u0442\u043e\u0432\u043e\u0457 \u0441\u043a\u0440\u0438\u043d\u044c\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440")}),l={registerSchema:n,schemasLogin:a,changePasswordSchema:r,updateUserSchema:o.Ik().shape({name:o.Yj().required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),surname:o.Yj(),email:o.Yj().email("\u041f\u043e\u043c\u0438\u043b\u043a\u0430 \u0432 \u0434\u0430\u043d\u0438\u0445 \u043f\u043e\u0448\u0442\u043e\u0432\u043e\u0457 \u0441\u043a\u0440\u0438\u043d\u044c\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),phone:o.ai(),avatar:o.Yj(),favorites:o.YO(),events:o.YO(),role:o.Yj()}),createUserSchema:o.Ik().shape({name:o.Yj().required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),surname:o.Yj(),email:o.Yj().email("\u041f\u043e\u043c\u0438\u043b\u043a\u0430 \u0432 \u0434\u0430\u043d\u0438\u0445 \u043f\u043e\u0448\u0442\u043e\u0432\u043e\u0457 \u0441\u043a\u0440\u0438\u043d\u044c\u043a\u0438").required("\u041e\u0431\u0432'\u044f\u0437\u043a\u043e\u0432\u0438\u0439 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440"),password:o.Yj(),phone:o.ai(),avatar:o.Yj(),favorites:o.YO(),events:o.YO(),role:o.Yj()}),updatePasswordSchema:o.Ik().shape({password:o.Yj(),confirmPassword:o.Yj()}),forgotPasswordSchema:s}}}]);
//# sourceMappingURL=905.5ae20452.chunk.js.map
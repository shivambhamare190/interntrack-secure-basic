import React, { useState } from "react";

import {
ShieldCheck,
Lock,
User
} from "lucide-react";

export default function AdminLogin({

setAdminLoggedIn

}){

const [email,setEmail]=useState("");

const [password,setPassword]=useState("");

const handleLogin=(e)=>{

e.preventDefault();

if(

email==="admin@gmail.com"

&&

password==="admin123"

){

setAdminLoggedIn(true);

}

else{

alert(

"Wrong Admin Credentials"

);

}

};

return(

<div

style={{

minHeight:"100vh",

background:

"linear-gradient(135deg,#071739,#0D2C6C)",

display:"flex",

justifyContent:"center",

alignItems:"center",

overflow:"hidden",

position:"relative"

}}

>

<div

style={{

position:"absolute",

width:"300px",

height:"300px",

background:"#FF6B00",

borderRadius:"50%",

filter:"blur(140px)",

top:"-80px",

right:"-80px",

opacity:"0.5",

animation:

"float 6s infinite"

}}

></div>

<div

style={{

position:"absolute",

width:"250px",

height:"250px",

background:"#2563EB",

borderRadius:"50%",

filter:"blur(130px)",

bottom:"-80px",

left:"-80px",

opacity:"0.4"

}}

></div>

<div

style={{

width:"420px",

padding:"40px",

background:

"rgba(255,255,255,0.08)",

backdropFilter:

"blur(20px)",

border:

"1px solid rgba(255,255,255,0.1)",

borderRadius:"30px",

boxShadow:

"0 25px 60px rgba(0,0,0,0.3)",

color:"white",

zIndex:"2",

animation:

"slideUp 1s"

}}

>

<div

style={{

display:"flex",

justifyContent:"center",

marginBottom:"20px"

}}

>

<div

style={{

background:"#FF6B00",

padding:"18px",

borderRadius:"50%"

}}

>

<ShieldCheck size={42}/>

</div>

</div>

<h1

style={{

textAlign:"center",

fontSize:"34px",

marginBottom:"10px"

}}

>

Admin Login

</h1>

<p

style={{

textAlign:"center",

color:"#CBD5E1",

marginBottom:"30px"

}}

>

InternTrack Secure Panel

</p>

<form

onSubmit={handleLogin}

>

<div

style={{

display:"flex",

alignItems:"center",

background:

"rgba(255,255,255,0.08)",

padding:"15px",

borderRadius:"12px",

marginBottom:"18px"

}}

>

<User/>

<input

type="email"

placeholder="Admin Email"

value={email}

onChange={(e)=>

setEmail(

e.target.value

)

}

style={{

background:"transparent",

border:"none",

outline:"none",

color:"white",

width:"100%",

marginLeft:"12px",

fontSize:"15px"

}}

/>

</div>

<div

style={{

display:"flex",

alignItems:"center",

background:

"rgba(255,255,255,0.08)",

padding:"15px",

borderRadius:"12px",

marginBottom:"25px"

}}

>

<Lock/>

<input

type="password"

placeholder="Password"

value={password}

onChange={(e)=>

setPassword(

e.target.value

)

}

style={{

background:"transparent",

border:"none",

outline:"none",

color:"white",

width:"100%",

marginLeft:"12px",

fontSize:"15px"

}}

/>

</div>

<button

type="submit"

style={{

width:"100%",

padding:"16px",

background:

"linear-gradient(90deg,#FF6B00,#FF8C00)",

border:"none",

borderRadius:"12px",

color:"white",

fontWeight:"800",

fontSize:"16px",

cursor:"pointer",

transition:"0.3s"

}}

onMouseEnter={(e)=>{

e.target.style.transform=

"scale(1.03)";

}}

onMouseLeave={(e)=>{

e.target.style.transform=

"scale(1)";

}}

>

Login Admin

</button>

</form>

</div>

<style>

{`

@keyframes slideUp{

from{

opacity:0;

transform:

translateY(50px);

}

to{

opacity:1;

transform:

translateY(0px);

}

}

@keyframes float{

0%{

transform:

translateY(0px);

}

50%{

transform:

translateY(20px);

}

100%{

transform:

translateY(0px);

}

}

input::placeholder{

color:#CBD5E1;

}

`}

</style>

</div>

);

}
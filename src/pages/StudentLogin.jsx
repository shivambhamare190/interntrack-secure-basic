import React, { useState } from "react";

import { db } from "../firebase";

import {

collection,
query,
where,
getDocs

} from "firebase/firestore";

import {

GraduationCap,
Lock,
UserCircle2

} from "lucide-react";

export default function StudentLogin({

setStudentLoggedIn

}) {

const [rollNo,setRollNo]=useState("");

const [password,setPassword]=useState("");

const [loading,setLoading]=useState(false);

const handleLogin=async(e)=>{

e.preventDefault();

setLoading(true);

try{

const q=query(

collection(db,"students"),

where(

"rollNo",

"==",

rollNo

),

where(

"password",

"==",

password

),

where(

"approved",

"==",

true

)

);

const snapshot=

await getDocs(q);

if(

!snapshot.empty

){

const studentData=

snapshot.docs[0].data();

setStudentLoggedIn({

name:

studentData.name,

rollNo:

studentData.rollNo,

company:

studentData.company,

department:

studentData.department,

year:

studentData.year

});

alert(

"Login Success"

);

}

else{

alert(

"Wrong Details Or Not Approved"

);

}

}

catch(error){

console.log(error);

alert(

"Login Failed"

);

}

setLoading(false);

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

position:"relative",

overflow:"hidden"

}}

>

<div

style={{

position:"absolute",

width:"320px",

height:"320px",

background:"#2563EB",

borderRadius:"50%",

filter:"blur(140px)",

top:"-100px",

left:"-100px",

opacity:"0.45",

animation:

"float 6s infinite"

}}

></div>

<div

style={{

position:"absolute",

width:"300px",

height:"300px",

background:"#FF6B00",

borderRadius:"50%",

filter:"blur(140px)",

bottom:"-100px",

right:"-100px",

opacity:"0.45"

}}

></div>

<div

style={{

width:"420px",

padding:"40px",

background:

"rgba(255,255,255,0.08)",

backdropFilter:

"blur(18px)",

border:

"1px solid rgba(255,255,255,0.12)",

borderRadius:"28px",

boxShadow:

"0 25px 60px rgba(0,0,0,0.3)",

color:"white",

zIndex:"2",

animation:

"slideUp 0.9s"

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

background:"#10B981",

padding:"18px",

borderRadius:"50%"

}}

>

<GraduationCap

size={42}

/>

</div>

</div>

<h1

style={{

textAlign:"center",

fontSize:"34px",

marginBottom:"10px"

}}

>

Student Login

</h1>

<p

style={{

textAlign:"center",

color:"#CBD5E1",

marginBottom:"30px"

}}

>

InternTrack Secure Portal

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

<UserCircle2/>

<input

value={rollNo}

onChange={(e)=>

setRollNo(

e.target.value

)

}

placeholder=

"Roll Number"

required

style={{

background:"transparent",

border:"none",

outline:"none",

color:"white",

marginLeft:"12px",

width:"100%",

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

value={password}

onChange={(e)=>

setPassword(

e.target.value

)

}

placeholder=

"Password"

required

style={{

background:"transparent",

border:"none",

outline:"none",

color:"white",

marginLeft:"12px",

width:"100%",

fontSize:"15px"

}}

/>

</div>

<button

type="submit"

disabled={loading}

style={{

width:"100%",

padding:"16px",

background:

"linear-gradient(90deg,#10B981,#059669)",

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

{

loading

?

"Checking..."

:

"Login"

}

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

translateY(0);

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
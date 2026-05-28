import React,{useState} from "react";

import {db} from "../firebase";

import {

collection,
addDoc

} from "firebase/firestore";

import {

User,
Lock,
Building2,
GraduationCap,
Hash

} from "lucide-react";

export default function Register(){

const [student,setStudent]=

useState({

name:"",
rollNo:"",
password:"",
department:"",
year:"",
company:""

});

const [loading,setLoading]=

useState(false);

const handleChange=(e)=>{

setStudent({

...student,

[e.target.name]:

e.target.value

});

};

const handleSubmit=async(e)=>{

e.preventDefault();

if(

!student.name ||
!student.rollNo ||
!student.password ||
!student.department ||
!student.year ||
!student.company

){

alert(

"All Fields Are Mandatory"

);

return;

}

setLoading(true);

try{

await addDoc(

collection(

db,

"students"

),

{

...student,

approved:false,

createdAt:new Date()

}

);

alert(

"Registration Submitted Successfully"

);

setStudent({

name:"",
rollNo:"",
password:"",
department:"",
year:"",
company:""

});

}

catch(error){

console.log(error);

alert(

"Registration Failed"

);

}

setLoading(false);

};

return(

<div

style={{

minHeight:"100vh",

display:"flex",

justifyContent:"center",

alignItems:"center",

background:

"linear-gradient(135deg,#071739,#0D2C6C)",

overflow:"hidden",

position:"relative",

padding:"20px"

}}

>

<div

style={{

position:"absolute",

width:"320px",

height:"320px",

background:"#FF6B00",

borderRadius:"50%",

filter:"blur(140px)",

top:"-100px",

right:"-100px",

opacity:"0.3",

animation:

"float 6s infinite"

}}

></div>

<div

style={{

position:"absolute",

width:"300px",

height:"300px",

background:"#2563EB",

borderRadius:"50%",

filter:"blur(140px)",

bottom:"-100px",

left:"-100px",

opacity:"0.3"

}}

></div>

<div

style={{

width:"430px",

background:

"rgba(255,255,255,0.08)",

backdropFilter:

"blur(18px)",

padding:"35px",

borderRadius:"30px",

border:

"1px solid rgba(255,255,255,0.1)",

boxShadow:

"0 25px 60px rgba(0,0,0,0.35)",

position:"relative",

zIndex:"2",

animation:

"slideUp 0.7s"

}}

>

<h1

style={{

textAlign:"center",

fontSize:"38px",

fontWeight:"800",

color:"white",

marginBottom:"8px"

}}

>

InternTrack

</h1>

<p

style={{

textAlign:"center",

color:"#CBD5E1",

marginBottom:"30px"

}}

>

Student Registration Portal

</p>

<form onSubmit={handleSubmit}>

<Input

icon={<User size={18}/>}

name="name"

placeholder="Full Name"

value={student.name}

handleChange={handleChange}

/>

<Input

icon={<Hash size={18}/>}

name="rollNo"

placeholder="Roll Number"

value={student.rollNo}

handleChange={handleChange}

/>

<Input

icon={<Lock size={18}/>}

name="password"

type="password"

placeholder="Password"

value={student.password}

handleChange={handleChange}

/>

<Input

icon={<GraduationCap size={18}/>}

name="department"

placeholder="Department"

value={student.department}

handleChange={handleChange}

/>

<Input

icon={<GraduationCap size={18}/>}

name="year"

placeholder="Year"

value={student.year}

handleChange={handleChange}

/>

<Input

icon={<Building2 size={18}/>}

name="company"

placeholder="Company"

value={student.company}

handleChange={handleChange}

/>

<button

type="submit"

disabled={loading}

style={{

width:"100%",

padding:"16px",

background:

"linear-gradient(135deg,#FF6B00,#ff8c42)",

color:"white",

border:"none",

borderRadius:"14px",

fontWeight:"800",

cursor:"pointer",

fontSize:"16px",

marginTop:"10px",

transition:"0.3s"

}}

onMouseEnter={(e)=>{

e.currentTarget.style.transform=

"translateY(-3px)";

}}

onMouseLeave={(e)=>{

e.currentTarget.style.transform=

"translateY(0px)";

}}

>

{

loading

?

"Submitting..."

:

"Create Account"

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

translateY(40px);

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

`}

</style>

</div>

);

}

function Input({

icon,
name,
placeholder,
handleChange,
value,
type="text"

}){

return(

<div

style={{

display:"flex",

alignItems:"center",

background:

"rgba(255,255,255,0.08)",

border:

"1px solid rgba(255,255,255,0.1)",

padding:"14px",

borderRadius:"15px",

marginBottom:"18px",

color:"white"

}}

>

<div

style={{

color:"#FF6B00"

}}

>

{icon}

</div>

<input

type={type}

name={name}

placeholder={placeholder}

value={value}

onChange={handleChange}

required

style={{

border:"none",

outline:"none",

background:"transparent",

width:"100%",

marginLeft:"12px",

fontSize:"15px",

color:"white"

}}

/>

</div>

);

}
import React,{useEffect,useState} from "react";

import {db} from "../firebase";

import {

collection,
getDocs

} from "firebase/firestore";

export default function ApprovedStudents(){

const [students,setStudents]=

useState([]);

useEffect(()=>{

loadStudents();

},[]);

const loadStudents=async()=>{

const snapshot=

await getDocs(

collection(

db,

"students"

)

);

const data=

snapshot.docs

.map(

doc=>({

id:doc.id,

...doc.data()

})

)

.filter(

student=>

student.approved===true

)

.sort(

(a,b)=>

Number(a.rollNo)

-

Number(b.rollNo)

);

setStudents(data);

};

return(

<div

style={{

padding:"25px",

position:"relative",

overflow:"hidden"

}}

>

<div

style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"25px",

flexWrap:"wrap",

gap:"20px"

}}

>

<div>

<h1

style={{

fontSize:"30px",

fontWeight:"800",

color:"white",

marginBottom:"6px"

}}

>

Approved Students

</h1>

<p

style={{

color:"#CBD5E1"

}}

>

Professional Student Management

</p>

</div>

<div

style={{

background:

"rgba(255,255,255,0.08)",

backdropFilter:

"blur(18px)",

padding:"16px 24px",

borderRadius:"22px",

border:

"1px solid rgba(255,255,255,0.1)",

boxShadow:

"0 15px 35px rgba(0,0,0,0.25)"

}}

>

<p

style={{

color:"#CBD5E1",

fontSize:"14px"

}}

>

Total Approved

</p>

<h1

style={{

fontSize:"28px",

color:"#10B981",

fontWeight:"800"

}}

>

{students.length}

</h1>

</div>

</div>

<div

style={{

display:"flex",

gap:"20px",

overflowX:"auto",

paddingBottom:"15px",

scrollBehavior:"smooth"

}}

>

{

students.map(

(student,index)=>(

<div

key={student.id}

style={{

width:"280px",

minWidth:"280px",

background:

"rgba(255,255,255,0.08)",

backdropFilter:

"blur(18px)",

padding:"20px",

borderRadius:"24px",

border:

"1px solid rgba(255,255,255,0.1)",

boxShadow:

"0 20px 45px rgba(0,0,0,0.25)",

transition:"0.35s",

cursor:"pointer",

animation:

"slideUp 0.6s"

}}

onMouseEnter={(e)=>{

e.currentTarget.style.transform=

"translateY(-8px) scale(1.02)";

e.currentTarget.style.boxShadow=

"0 30px 60px rgba(0,0,0,0.35)";

}}

onMouseLeave={(e)=>{

e.currentTarget.style.transform=

"translateY(0px) scale(1)";

e.currentTarget.style.boxShadow=

"0 20px 45px rgba(0,0,0,0.25)";

}}

>

<div

style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"18px"

}}

>

<div

style={{

width:"45px",

height:"45px",

borderRadius:"15px",

background:

"linear-gradient(135deg,#10B981,#059669)",

display:"flex",

justifyContent:"center",

alignItems:"center",

fontWeight:"800",

fontSize:"18px",

color:"white"

}}

>

{index+1}

</div>

<div

style={{

padding:"7px 14px",

borderRadius:"30px",

background:

"rgba(16,185,129,0.15)",

color:"#10B981",

fontWeight:"700",

fontSize:"13px"

}}

>

Approved

</div>

</div>

<h2

style={{

fontSize:"20px",

marginBottom:"18px",

color:"white"

}}

>

{student.name}

</h2>

<div

style={{

display:"flex",

flexDirection:"column",

gap:"10px"

}}

>

<div

style={{

background:

"rgba(255,255,255,0.06)",

padding:"12px",

borderRadius:"14px"

}}

>

<p

style={{

color:"#CBD5E1",

fontSize:"12px",

marginBottom:"4px"

}}

>

ROLL NUMBER

</p>

<h3

style={{

fontSize:"16px",

color:"white"

}}

>

{student.rollNo}

</h3>

</div>

<div

style={{

background:

"rgba(255,255,255,0.06)",

padding:"12px",

borderRadius:"14px"

}}

>

<p

style={{

color:"#CBD5E1",

fontSize:"12px",

marginBottom:"4px"

}}

>

DEPARTMENT

</p>

<h3

style={{

fontSize:"16px",

color:"white"

}}

>

{student.department}

</h3>

</div>

<div

style={{

background:

"rgba(255,255,255,0.06)",

padding:"12px",

borderRadius:"14px"

}}

>

<p

style={{

color:"#CBD5E1",

fontSize:"12px",

marginBottom:"4px"

}}

>

YEAR

</p>

<h3

style={{

fontSize:"16px",

color:"white"

}}

>

{student.year}

</h3>

</div>

<div

style={{

background:

"rgba(255,255,255,0.06)",

padding:"12px",

borderRadius:"14px"

}}

>

<p

style={{

color:"#CBD5E1",

fontSize:"12px",

marginBottom:"4px"

}}

>

COMPANY

</p>

<h3

style={{

fontSize:"16px",

color:"white"

}}

>

{student.company}

</h3>

</div>

</div>

</div>

)

)

}

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

div::-webkit-scrollbar{

height:8px;

}

div::-webkit-scrollbar-track{

background:transparent;

}

div::-webkit-scrollbar-thumb{

background:#FF6B00;

borderRadius:20px;

}

`}

</style>

</div>

);

}
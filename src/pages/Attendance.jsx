import React, { useState } from "react";

import { db } from "../firebase";

import {

collection,
addDoc,
query,
where,
getDocs

} from "firebase/firestore";

import {

Camera,
MapPin,
CheckCircle,
User

} from "lucide-react";

export default function Attendance({

student

}){

const [photo,setPhoto]=useState(null);

const [preview,setPreview]=useState("");

const [loading,setLoading]=useState(false);

const capturePhoto=(e)=>{

const file=e.target.files[0];

if(!file)return;

const reader=new FileReader();

reader.onload=(event)=>{

const img=new Image();

img.onload=()=>{

const canvas=

document.createElement(

"canvas"

);

const MAX_WIDTH=400;

const scale=

MAX_WIDTH/img.width;

canvas.width=

MAX_WIDTH;

canvas.height=

img.height*scale;

const ctx=

canvas.getContext(

"2d"

);

ctx.drawImage(

img,

0,

0,

canvas.width,

canvas.height

);

const compressed=

canvas.toDataURL(

"image/jpeg",

0.5

);

setPhoto(

compressed

);

setPreview(

compressed

);

};

img.src=

event.target.result;

};

reader.readAsDataURL(file);

};

const markAttendance=async()=>{

if(!photo){

alert(

"Capture Photo First"

);

return;

}

if(

!navigator.geolocation

){

alert(

"GPS Required"

);

return;

}

setLoading(true);

navigator.geolocation.getCurrentPosition(

async(position)=>{

try{

const latitude=

position.coords.latitude;

const longitude=

position.coords.longitude;

const today=

new Date()

.toDateString();

const attendanceQuery=

query(

collection(

db,

"attendance"

),

where(

"rollNo",

"==",

student.rollNo

)

);

const existing=

await getDocs(

attendanceQuery

);

const alreadyMarked=

existing.docs.some(

(doc)=>{

const data=

doc.data();

return(

data.date===today

);

}

);

if(

alreadyMarked

){

alert(

"Attendance Already Marked Today"

);

setLoading(false);

return;

}

await addDoc(

collection(

db,

"attendance"

),

{

name:

student.name,

rollNo:

student.rollNo,

company:

student.company,

department:

student.department,

year:

student.year,

photo,

latitude,

longitude,

date:today,

timestamp:

new Date()

}

);

alert(

"Attendance Saved"

);

setPhoto(null);

setPreview("");

}

catch(error){

console.log(error);

alert(

"Save Failed"

);

}

setLoading(false);

},

()=>{

alert(

"GPS Permission Required"

);

setLoading(false);

},

{

enableHighAccuracy:true,

timeout:10000,

maximumAge:0

}

);

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

width:"300px",

height:"300px",

background:"#FF6B00",

borderRadius:"50%",

filter:"blur(140px)",

top:"-80px",

right:"-80px",

opacity:"0.45",

animation:

"float 6s infinite"

}}

></div>

<div

style={{

position:"absolute",

width:"280px",

height:"280px",

background:"#2563EB",

borderRadius:"50%",

filter:"blur(140px)",

bottom:"-80px",

left:"-80px",

opacity:"0.45"

}}

></div>

<div

style={{

width:"450px",

padding:"35px",

background:

"rgba(255,255,255,0.08)",

backdropFilter:

"blur(18px)",

border:

"1px solid rgba(255,255,255,0.1)",

borderRadius:"28px",

boxShadow:

"0 25px 60px rgba(0,0,0,0.3)",

color:"white",

zIndex:"2",

animation:

"slideUp 0.8s"

}}

>

<div

style={{

display:"flex",

justifyContent:"center",

marginBottom:"18px"

}}

>

<div

style={{

background:"#10B981",

padding:"18px",

borderRadius:"50%"

}}

>

<CheckCircle

size={42}

/>

</div>

</div>

<h1

style={{

textAlign:"center",

fontSize:"32px",

marginBottom:"10px"

}}

>

Attendance

</h1>

<p

style={{

textAlign:"center",

color:"#CBD5E1",

marginBottom:"25px"

}}

>

Capture Photo + GPS

</p>

<div

style={{

background:

"rgba(255,255,255,0.08)",

padding:"15px",

borderRadius:"12px",

marginBottom:"15px"

}}

>

<User size={18}/>

<span

style={{

marginLeft:"10px"

}}

>

{student?.name}

</span>

</div>

<div

style={{

display:"flex",

gap:"10px"

}}

>

<button

onClick={()=>{

document

.getElementById(

"camera"

)

.click();

}}

style={{

flex:1,

padding:"15px",

background:"#2563EB",

border:"none",

color:"white",

borderRadius:"12px",

fontWeight:"700",

cursor:"pointer"

}}

>

<Camera/>

 Open Camera

</button>

<button

style={{

flex:1,

padding:"15px",

background:"#10B981",

border:"none",

color:"white",

borderRadius:"12px",

fontWeight:"700"

}}

>

<MapPin/>

 GPS Required

</button>

</div>

<input

id="camera"

type="file"

accept="image/*"

capture="environment"

onChange={capturePhoto}

style={{

display:"none"

}}

/>

{

preview&&

<img

src={preview}

alt="preview"

style={{

width:"100%",

marginTop:"20px",

borderRadius:"18px",

border:

"3px solid rgba(255,255,255,0.2)"

}}

/>

}

<button

onClick={markAttendance}

disabled={loading}

style={{

width:"100%",

marginTop:"22px",

padding:"16px",

background:

"linear-gradient(90deg,#FF6B00,#FB923C)",

border:"none",

borderRadius:"12px",

fontWeight:"800",

fontSize:"16px",

color:"white",

cursor:"pointer"

}}

>

{

loading

?

"Saving..."

:

"Mark Attendance"

}

</button>

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

translateY(18px);

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
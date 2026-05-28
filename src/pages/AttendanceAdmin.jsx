import React,{useEffect,useState} from "react";

import {db} from "../firebase";

import {

collection,
getDocs,
deleteDoc,
doc

} from "firebase/firestore";

import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

export default function AttendanceAdmin(){

const [records,setRecords]=useState([]);

const [date,setDate]=useState("");

useEffect(()=>{

loadAttendance();

},[]);

const loadAttendance=async()=>{

const snapshot=

await getDocs(

collection(

db,

"attendance"

)

);

const data=

snapshot.docs

.map(doc=>({

id:doc.id,

...doc.data()

}))

.sort(

(a,b)=>{

const A=

a.timestamp?.seconds||0;

const B=

b.timestamp?.seconds||0;

return B-A;

}

);

setRecords(data);

};

const deleteAttendance=

async(id)=>{

const confirmDelete=

window.confirm(

"Delete Attendance ?"

);

if(

!confirmDelete

)return;

await deleteDoc(

doc(

db,

"attendance",

id

)

);

loadAttendance();

};

const filtered=

date

?

records.filter(

item=>{

if(

!item.timestamp

)return false;

const d=

item.timestamp

.toDate()

.toISOString()

.split("T")[0];

return d===date;

}

)

:

records;

const exportExcel=()=>{

const excelData=

filtered.map(

(item,index)=>({

"Sr No":

index+1,

"Roll No":

item.rollNo,

"Student Name":

item.name,

"Department":

item.department,

"Company":

item.company,

"Date":

item.timestamp

?.toDate()

?.toLocaleDateString(),

"Time":

item.timestamp

?.toDate()

?.toLocaleTimeString(),

"Present":

"YES",

"Latitude":

item.latitude,

"Longitude":

item.longitude

})

);

const worksheet=

XLSX.utils.json_to_sheet(

excelData

);

const workbook=

XLSX.utils.book_new();

XLSX.utils.book_append_sheet(

workbook,

worksheet,

"Attendance"

);

const excelBuffer=

XLSX.write(

workbook,

{

bookType:"xlsx",

type:"array"

}

);

const file=

new Blob(

[excelBuffer],

{

type:

"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"

}

);

saveAs(

file,

"Attendance_Report.xlsx"

);

};

return(

<div

style={{

padding:"30px",

background:

"linear-gradient(135deg,#071739,#0D2C6C)",

minHeight:"100vh",

color:"white",

position:"relative",

overflow:"hidden"

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

top:"-120px",

right:"-100px",

opacity:"0.25"

}}

></div>

<div

style={{

position:"absolute",

width:"280px",

height:"280px",

background:"#2563EB",

borderRadius:"50%",

filter:"blur(130px)",

bottom:"-100px",

left:"-100px",

opacity:"0.25"

}}

></div>

<div

style={{

position:"relative",

zIndex:"2"

}}

>

<h1

style={{

fontSize:"38px",

marginBottom:"10px",

fontWeight:"800",

animation:

"fade 0.8s"

}}

>

Attendance History

</h1>

<p

style={{

color:"#CBD5E1",

marginBottom:"30px"

}}

>

Professional Attendance Monitoring System

</p>

<div

style={{

display:"flex",

gap:"20px",

marginBottom:"30px",

flexWrap:"wrap",

alignItems:"center"

}}

>

<div

style={{

background:

"rgba(255,255,255,0.08)",

backdropFilter:

"blur(18px)",

padding:"22px",

borderRadius:"22px",

width:"240px",

border:

"1px solid rgba(255,255,255,0.1)",

boxShadow:

"0 15px 35px rgba(0,0,0,0.25)"

}}

>

<p

style={{

color:"#CBD5E1",

marginBottom:"6px"

}}

>

Total Records

</p>

<h1

style={{

fontSize:"34px",

fontWeight:"800"

}}

>

{filtered.length}

</h1>

</div>

<div

style={{

background:

"rgba(255,255,255,0.08)",

backdropFilter:

"blur(18px)",

padding:"22px",

borderRadius:"22px",

border:

"1px solid rgba(255,255,255,0.1)",

boxShadow:

"0 15px 35px rgba(0,0,0,0.25)"

}}

>

<p

style={{

marginBottom:"10px",

color:"#CBD5E1"

}}

>

Select Date

</p>

<input

type="date"

value={date}

onChange={(e)=>

setDate(

e.target.value

)

}

style={{

padding:"12px",

borderRadius:"12px",

border:"none",

outline:"none",

fontWeight:"600"

}}

/>

</div>

<button

onClick={exportExcel}

style={{

padding:"16px 24px",

background:

"linear-gradient(135deg,#10B981,#059669)",

border:"none",

borderRadius:"14px",

color:"white",

fontWeight:"700",

cursor:"pointer",

height:"60px",

marginTop:"auto",

boxShadow:

"0 12px 25px rgba(0,0,0,0.25)",

transition:"0.3s"

}}

onMouseEnter={(e)=>{

e.currentTarget.style.transform=

"translateY(-4px)";

}}

onMouseLeave={(e)=>{

e.currentTarget.style.transform=

"translateY(0px)";

}}

>

Export Excel

</button>

</div>

<div

style={{

display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(320px,1fr))",

gap:"25px"

}}

>

{

filtered.map(

(item,index)=>(

<div

key={item.id}

style={{

background:

"rgba(255,255,255,0.08)",

backdropFilter:

"blur(18px)",

padding:"20px",

borderRadius:"24px",

border:

"1px solid rgba(255,255,255,0.1)",

animation:

"card 0.5s",

boxShadow:

"0 20px 45px rgba(0,0,0,0.3)",

transition:"0.35s",

cursor:"pointer"

}}

onMouseEnter={(e)=>{

e.currentTarget.style.transform=

"translateY(-8px) scale(1.02)";

}}

onMouseLeave={(e)=>{

e.currentTarget.style.transform=

"translateY(0px) scale(1)";

}}

>

<div

style={{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"15px"

}}

>

<div

style={{

width:"45px",

height:"45px",

borderRadius:"14px",

background:

"linear-gradient(135deg,#FF6B00,#ff8c42)",

display:"flex",

justifyContent:"center",

alignItems:"center",

fontWeight:"800",

fontSize:"18px"

}}

>

{index+1}

</div>

<div

style={{

padding:"8px 15px",

borderRadius:"30px",

background:

"rgba(16,185,129,0.15)",

color:"#10B981",

fontWeight:"700",

fontSize:"13px"

}}

>

Present

</div>

</div>

{

item.photo

&&

<img

src={item.photo}

alt="student"

style={{

width:"100%",

height:"220px",

objectFit:"cover",

borderRadius:"18px",

marginBottom:"18px"

}}

/>

}

<h2

style={{

fontSize:"24px",

marginBottom:"15px"

}}

>

{item.name}

</h2>

<div

style={{

display:"flex",

flexDirection:"column",

gap:"10px"

}}

>

<Info title="ROLL NO" value={item.rollNo}/>

<Info title="COMPANY" value={item.company}/>

<Info title="DEPARTMENT" value={item.department}/>

<Info title="YEAR" value={item.year}/>

<Info title="LATITUDE" value={item.latitude}/>

<Info title="LONGITUDE" value={item.longitude}/>

<Info

title="DATE"

value={

item.timestamp

?.toDate()

?.toLocaleDateString()

}

/>

<Info

title="TIME"

value={

item.timestamp

?.toDate()

?.toLocaleTimeString()

}

/>

</div>

<button

onClick={()=>

deleteAttendance(

item.id

)

}

style={{

width:"100%",

padding:"14px",

marginTop:"18px",

background:

"linear-gradient(135deg,#DC2626,#EF4444)",

border:"none",

borderRadius:"14px",

color:"white",

fontWeight:"700",

cursor:"pointer",

transition:"0.3s"

}}

>

Delete Attendance

</button>

</div>

)

)

}

</div>

</div>

<style>

{`

@keyframes card{

from{

opacity:0;

transform:

translateY(40px);

}

to{

opacity:1;

transform:

translateY(0);

}

}

@keyframes fade{

from{

opacity:0;

}

to{

opacity:1;

}

}

`}

</style>

</div>

);

}

function Info({

title,
value

}){

return(

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

fontSize:"12px",

color:"#CBD5E1",

marginBottom:"4px"

}}

>

{title}

</p>

<h3

style={{

fontSize:"15px",

color:"white"

}}

>

{value || "N/A"}

</h3>

</div>

);

}
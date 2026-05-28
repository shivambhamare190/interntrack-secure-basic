import React from "react";

import {
 UserPlus,
 UserCheck,
 ShieldCheck
} from "lucide-react";

export default function Home({

 setPage

}) {

 const cards=[

 {

 title:"Student Register",

 icon:<UserPlus size={42}/>,

 color:"#2563EB",

 action:"register"

 },

 {

 title:"Student Login",

 icon:<UserCheck size={42}/>,

 color:"#10B981",

 action:"studentLogin"

 },

 {

 title:"Admin Login",

 icon:<ShieldCheck size={42}/>,

 color:"#FF6B00",

 action:"admin"

 }

 ];

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

 filter:"blur(150px)",

 top:"-100px",

 right:"-100px",

 opacity:"0.4"

 }}

 />

 <div

 style={{

 position:"absolute",

 width:"250px",

 height:"250px",

 background:"#2563EB",

 filter:"blur(120px)",

 bottom:"-80px",

 left:"-80px",

 opacity:"0.5"

 }}

 />

 <div

 style={{

 textAlign:"center",

 zIndex:"10"

 }}

 >

 <h1

 style={{

 color:"white",

 fontSize:"52px",

 marginBottom:"15px",

 fontWeight:"800"

 }}

 >

 InternTrack Secure

 </h1>

 <p

 style={{

 color:"#CBD5E1",

 marginBottom:"50px",

 fontSize:"18px"

 }}

 >

 Smart Internship Attendance System

 </p>

 <div

 style={{

 display:"flex",

 gap:"30px",

 flexWrap:"wrap",

 justifyContent:"center"

 }}

 >

 {

 cards.map(

 (item,index)=>(

 <div

 key={index}

 onClick={()=>

 setPage(

 item.action

 )

 }

 style={{

 width:"240px",

 padding:"35px",

 borderRadius:"24px",

 background:

 "rgba(255,255,255,0.08)",

 backdropFilter:

 "blur(15px)",

 border:

 "1px solid rgba(255,255,255,0.1)",

 color:"white",

 cursor:"pointer",

 transition:"0.3s",

 boxShadow:

 "0 15px 40px rgba(0,0,0,0.2)"

 }}

 onMouseEnter={(e)=>{

 e.currentTarget.style.transform=

 "translateY(-10px)";

 }}

 onMouseLeave={(e)=>{

 e.currentTarget.style.transform=

 "translateY(0px)";

 }}

 >

 <div

 style={{

 marginBottom:"20px",

 color:item.color

 }}

 >

 {item.icon}

 </div>

 <h2>

 {item.title}

 </h2>

 </div>

 )

 )

 }

 </div>

 </div>

 </div>

 );

}
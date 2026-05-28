import React, { useState } from "react";

import Attendance from "./pages/Attendance";
import StudentLogin from "./pages/StudentLogin";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

import {
  UserPlus,
  UserCheck,
  ShieldCheck,
  LogOut
} from "lucide-react";

function App() {

  const [page,setPage]=useState("home");

  const [adminLoggedIn,
  setAdminLoggedIn]=useState(false);

  const [studentLoggedIn,
  setStudentLoggedIn]=useState(null);

  const handleLogout=()=>{

    setAdminLoggedIn(false);

    setStudentLoggedIn(null);

    setPage("home");

  };

  if(adminLoggedIn){

    return(

      <div>

        <LogoutButton

        handleLogout={
        handleLogout
        }

        />

        <AdminDashboard/>

      </div>

    );

  }

  if(studentLoggedIn){

    return(

      <div>

        <LogoutButton

        handleLogout={
        handleLogout
        }

        />

        <Attendance

        student={
        studentLoggedIn
        }

        />

      </div>

    );

  }

  if(page==="register"){

    return(

      <div>

        <TopBar

        setPage={
        setPage
        }

        />

        <Register/>

      </div>

    );

  }

  if(page==="studentLogin"){

    return(

      <div>

        <TopBar

        setPage={
        setPage
        }

        />

        <StudentLogin

        setStudentLoggedIn={
        setStudentLoggedIn
        }

        />

      </div>

    );

  }

  if(page==="admin"){

    return(

      <div>

        <TopBar

        setPage={
        setPage
        }

        />

        <AdminLogin

        setAdminLoggedIn={
        setAdminLoggedIn
        }

        />

      </div>

    );

  }

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

      width:"350px",

      height:"350px",

      background:"#FF6B00",

      borderRadius:"50%",

      filter:"blur(140px)",

      top:"-100px",

      right:"-100px",

      opacity:"0.45",

      animation:

      "pulse 4s infinite"

      }}

      />

      <div

      style={{

      position:"absolute",

      width:"300px",

      height:"300px",

      background:"#2563EB",

      borderRadius:"50%",

      filter:"blur(130px)",

      bottom:"-100px",

      left:"-100px",

      opacity:"0.45"

      }}

      />

      <div

      style={{

      textAlign:"center",

      zIndex:"5"

      }}

      >

        <h1

        style={{

        color:"white",

        fontSize:"60px",

        fontWeight:"900",

        marginBottom:"10px"

        }}

        >

        InternTrack Secure

        </h1>

        <p

        style={{

        color:"#CBD5E1",

        fontSize:"20px",

        marginBottom:"50px"

        }}

        >

        Internship Attendance System

        </p>

        <div

        style={{

        display:"flex",

        gap:"25px",

        flexWrap:"wrap",

        justifyContent:"center"

        }}

        >

          <Card

          title="Register"

          icon={<UserPlus size={45}/>}

          color="#2563EB"

          click={()=>

          setPage("register")

          }

          />

          <Card

          title="Student Login"

          icon={<UserCheck size={45}/>}

          color="#10B981"

          click={()=>

          setPage("studentLogin")

          }

          />

          <Card

          title="Admin Login"

          icon={<ShieldCheck size={45}/>}

          color="#FF6B00"

          click={()=>

          setPage("admin")

          }

          />

        </div>

      </div>

    </div>

  );

}

function Card({

title,

icon,

click,

color

}){

return(

<div

onClick={click}

style={{

width:"240px",

padding:"35px",

background:

"rgba(255,255,255,0.08)",

backdropFilter:

"blur(15px)",

border:

"1px solid rgba(255,255,255,0.1)",

borderRadius:"25px",

color:"white",

cursor:"pointer",

transition:"0.3s",

boxShadow:

"0 15px 40px rgba(0,0,0,0.25)"

}}

onMouseEnter={(e)=>{

e.currentTarget.style.transform=

"translateY(-12px)";

}}

onMouseLeave={(e)=>{

e.currentTarget.style.transform=

"translateY(0px)";

}}

>

<div

style={{

color:color,

marginBottom:"20px"

}}

>

{icon}

</div>

<h2>

{title}

</h2>

</div>

);

}

function LogoutButton({

handleLogout

}){

return(

<button

onClick={handleLogout}

style={{

position:"fixed",

top:"20px",

left:"20px",

padding:"12px 18px",

background:"#DC2626",

border:"none",

borderRadius:"10px",

color:"white",

cursor:"pointer",

fontWeight:"700",

zIndex:"1000"

}}

>

<LogOut size={18}/>

</button>

);

}

function TopBar({

setPage

}){

return(

<button

onClick={()=>

setPage("home")

}

style={{

position:"fixed",

top:"20px",

left:"20px",

padding:"12px 20px",

background:"#071739",

border:"none",

borderRadius:"10px",

color:"white",

cursor:"pointer",

zIndex:"1000"

}}

>

Home

</button>

);

}

export default App;
import React,{useEffect,useState} from "react";

import { db } from "../firebase";

import {

collection,
getDocs

} from "firebase/firestore";

export default function AttendanceHistory(){

const [records,setRecords]=useState([]);

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

snapshot.docs.map(

(docItem)=>({

id:docItem.id,

...docItem.data()

})

);

setRecords(data);

};

return(

<div
style={{

padding:"30px"

}}
>

<h1>

Attendance History

</h1>

{

records.length===0

?

<p>

No Attendance Found

</p>

:

records.map(

(item)=>(

<div

key={item.id}

style={{

border:"1px solid #ddd",

padding:"15px",

marginBottom:"10px",

borderRadius:"10px"

}}

>

<p>

GPS:

{item.gps}

</p>

<p>

Time:

{

item.timestamp

?.toDate()

?.toString()

}

</p>

</div>

)

)

}

</div>

);

}
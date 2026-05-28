import ApprovedStudents from "./ApprovedStudents";
import React, { useEffect, useState } from "react";

import { db } from "../firebase";

import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc
} from "firebase/firestore";

import AttendanceAdmin from "./AttendanceAdmin";

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const snapshot = await getDocs(collection(db, "students"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setStudents(data);
  };

  const approveStudent = async (id) => {
    await updateDoc(doc(db, "students", id), {
      approved: true
    });

    loadStudents();
  };

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm("Delete Student?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "students", id));

    loadStudents();
  };

  const pending = students.filter((s) => !s.approved);
  const approved = students.filter((s) => s.approved);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "35px",
        background: "linear-gradient(135deg,#071739,#0D2C6C)",
        color: "white"
      }}
    >
      <h1
        style={{
          fontSize: "44px",
          marginBottom: "30px",
          fontWeight: "800",
          animation: "fade 0.8s"
        }}
      >
        Admin Dashboard
      </h1>

      {/* TOP CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "25px",
          marginBottom: "40px"
        }}
      >
        <Card title="Total Students" value={students.length} color="#3B82F6" />
        <Card title="Approved" value={approved.length} color="#10B981" />
        <Card title="Pending" value={pending.length} color="#F59E0B" />
      </div>

      {/* PENDING */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px"
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "20px",
            borderRadius: "25px",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.08)"
          }}
        >
          <h2>Pending Approval</h2>

          {pending.map((student) => (
            <div
              key={student.id}
              style={{
                padding: "12px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                transition: "0.3s"
              }}
            >
              <h3>{student.name}</h3>
              <p>{student.rollNo}</p>

              <button
                onClick={() => approveStudent(student.id)}
                style={{
                  background: "#10B981",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  color: "white",
                  cursor: "pointer",
                  marginRight: "10px"
                }}
              >
                Approve
              </button>

              <button
                onClick={() => deleteStudent(student.id)}
                style={{
                  background: "#EF4444",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* APPROVED */}
        <div
          style={{
            background: "rgba(255,255,255,0.05)",
            padding: "20px",
            borderRadius: "25px",
            backdropFilter: "blur(18px)",
            border: "1px solid rgba(255,255,255,0.08)"
          }}
        >
          <h2>Approved Students</h2>

          {approved.map((student) => (
            <div
              key={student.id}
              style={{
                padding: "12px",
                borderBottom: "1px solid rgba(255,255,255,0.1)"
              }}
            >
              <h3>{student.name}</h3>
              <p>Roll: {student.rollNo}</p>
              <p>Company: {student.company}</p>

              <button
                onClick={() => deleteStudent(student.id)}
                style={{
                  background: "#EF4444",
                  border: "none",
                  padding: "6px 12px",
                  borderRadius: "8px",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div
        style={{
          marginTop: "40px",
          background: "rgba(255,255,255,0.05)",
          padding: "25px",
          borderRadius: "30px",
          backdropFilter: "blur(18px)"
        }}
      >
        <ApprovedStudents />
        <AttendanceAdmin />
      </div>

      {/* ANIMATION */}
      <style>
        {`
          @keyframes fade {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0px);
            }
          }
        `}
      </style>
    </div>
  );
}

/* CARD (from your second code style) */
function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(18px)",
        padding: "28px",
        borderRadius: "25px",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 20px 45px rgba(0,0,0,0.25)",
        transition: "0.35s",
        cursor: "pointer",
        animation: "fade 0.7s"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow = "0 30px 60px rgba(0,0,0,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.boxShadow = "0 20px 45px rgba(0,0,0,0.25)";
      }}
    >
      <p style={{ color: "#CBD5E1", fontSize: "15px" }}>{title}</p>

      <h1 style={{ fontSize: "42px", margin: "10px 0", color }}>
        {value}
      </h1>
    </div>
  );
}
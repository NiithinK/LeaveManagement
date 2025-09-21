import React, { useState, useEffect } from "react";
import { LeaveService } from "../Api/api";
import Loading from "../components/Loading";

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const [pRes, eRes] = await Promise.all([
        LeaveService.getPending(),
        LeaveService.getEmployees(),
      ]);
      setPending(pRes.data.leaves);
      setEmployees(eRes.data.employees);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(id) {
    const comment = prompt("Comment (optional)") || "";
    await LeaveService.approve(id, { comment });
    fetchData();
  }

  async function handleReject(id) {
    const comment = prompt("Reason for rejection (optional)") || "";
    await LeaveService.reject(id, { comment });
    fetchData();
  }

  async function changeBalance(empId) {
    const delta = parseInt(prompt("Enter number to add (+) or reduce (-):"), 10);
    if (isNaN(delta)) return alert("Invalid number");
    await LeaveService.updateBalance(empId, { delta });
    fetchData();
  }

  // ==== Inline Styles ====
  const containerStyle = { padding: "24px", fontFamily: "Arial, sans-serif" };
  const sectionStyle = {
    backgroundColor: "#fff",
    padding: "16px",
    borderRadius: "8px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  };
  const gridStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" };
  const buttonStyle = (bg) => ({
    padding: "6px 12px",
    backgroundColor: bg,
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
  });
  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "14px",
  };
  const thtdStyle = {
    borderBottom: "1px solid #e5e7eb",
    padding: "8px",
    textAlign: "left",
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ fontSize: "22px", marginBottom: "16px", fontWeight: "bold" }}>
        Admin Dashboard
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <div style={gridStyle}>
          {/* Pending Requests */}
          <div style={sectionStyle}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px" }}>Pending Leave Requests</h3>
            {pending.length === 0 ? (
              <div>No pending requests</div>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {pending.map((l) => (
                  <li
                    key={l._id}
                    style={{
                      padding: "12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      marginBottom: "10px",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <div>
                          <strong>{l.employee.name}</strong> ({l.employee.employeeId})
                        </div>
                        <div>
                          {l.category} / {l.reasonType} —{" "}
                          {new Date(l.from).toLocaleDateString()} to{" "}
                          {new Date(l.to).toLocaleDateString()}
                        </div>
                        <div>Applied: {new Date(l.createdAt).toLocaleString()}</div>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <button onClick={() => handleApprove(l._id)} style={buttonStyle("#16a34a")}>
                          Approve
                        </button>
                        <button onClick={() => handleReject(l._id)} style={buttonStyle("#dc2626")}>
                          Reject
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Employees */}
          <div style={sectionStyle}>
            <h3 style={{ fontSize: "18px", marginBottom: "12px" }}>Employees</h3>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thtdStyle}>Name</th>
                  <th style={thtdStyle}>ID</th>
                  <th style={thtdStyle}>Dept</th>
                  <th style={thtdStyle}>Balance</th>
                  <th style={thtdStyle}>Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp._id}>
                    <td style={thtdStyle}>{emp.name}</td>
                    <td style={thtdStyle}>{emp.employeeId}</td>
                    <td style={thtdStyle}>{emp.department}</td>
                    <td style={thtdStyle}>
                      Casual: {emp.balance?.casual || 0} | Privilege:{" "}
                      {emp.balance?.privilege || 0}
                    </td>
                    <td style={thtdStyle}>
                      <button
                        onClick={() => changeBalance(emp._id)}
                        style={buttonStyle("#4f46e5")}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

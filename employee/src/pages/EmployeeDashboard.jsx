import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LeaveService } from "../Api/api";
import Loading from "../components/Loading";
import ApplyLeaveModal from "../components/ApplyLeaveModal";

export default function EmployeeDashboard() {
  const [balance, setBalance] = useState({ casual: 0, privilege: 0 });
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showApply, setShowApply] = useState(false);

  useEffect(() => {
    fetchMyLeaves();
  }, []);

  async function fetchMyLeaves() {
    try {
      setLoading(true);
      const res = await LeaveService.getMyLeaves();
      setLeaves(res.data.leaves);
      setBalance(res.data.balance || { casual: 0, privilege: 0 });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const containerStyle = { padding: "20px", fontFamily: "Arial, sans-serif" };
  const headerStyle = { display: "flex", justifyContent: "space-between", marginBottom: "20px", alignItems: "center" };
  const buttonStyle = { padding: "8px 16px", backgroundColor: "#3b82f6", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" };
  const balanceCardStyle = { padding: "15px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" };
  const tableStyle = { width: "100%", borderCollapse: "collapse" };
  const thStyle = { textAlign: "left", borderBottom: "2px solid #e5e7eb", padding: "8px" };
  const tdStyle = { padding: "8px", borderBottom: "1px solid #e5e7eb" };
  const sectionStyle = { backgroundColor: "#fff", borderRadius: "8px", padding: "15px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "20px" };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Employee Dashboard</h2>
        <button onClick={() => setShowApply(true)} style={buttonStyle}>
          Apply Leave
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px", marginBottom: "20px" }}>
        <div style={balanceCardStyle}>
          Casual Leave Balance: <strong>{balance.casual}</strong>
        </div>
        <div style={balanceCardStyle}>
          Privilege Leave Balance: <strong>{balance.privilege}</strong>
        </div>
      </div>

      <div style={sectionStyle}>
        <h3 style={{ fontSize: "18px", marginBottom: "12px", fontWeight: "bold" }}>Leave History</h3>
        {loading ? (
          <Loading />
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>From</th>
                <th style={thStyle}>To</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Applied At</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((l) => (
                <tr key={l._id}>
                  <td style={tdStyle}>{new Date(l.from).toLocaleDateString()}</td>
                  <td style={tdStyle}>{new Date(l.to).toLocaleDateString()}</td>
                  <td style={tdStyle}>{l.category} / {l.reasonType}</td>
                  <td style={tdStyle}>{l.status}{l.managerComment ? ` — ${l.managerComment}` : ""}</td>
                  <td style={tdStyle}>{new Date(l.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showApply && (
        <ApplyLeaveModal onClose={() => { setShowApply(false); fetchMyLeaves(); }} />
      )}
    </div>
  );
}

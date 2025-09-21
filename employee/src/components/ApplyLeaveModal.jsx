import React, { useState } from "react";
import { LeaveService } from "../Api/api";
import './ApplyLeaveModal.css';

export default function ApplyLeaveModal({ onClose }) {
  const [form, setForm] = useState({
    from: "",
    to: "",
    category: "Casual",
    reasonType: "Sick",
    reason: ""
  });

  async function handleSubmit(e) {
    e.preventDefault();
    await LeaveService.applyLeave(form);
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h3 className="modal-title">Apply Leave</h3>
        <form onSubmit={handleSubmit} className="modal-form">
          <input type="date" value={form.from} onChange={e => setForm({ ...form, from: e.target.value })} className="modal-input"/>
          <input type="date" value={form.to} onChange={e => setForm({ ...form, to: e.target.value })} className="modal-input"/>
          <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="modal-select">
            <option>Casual</option>
            <option>Privilege</option>
          </select>
          <select value={form.reasonType} onChange={e => setForm({ ...form, reasonType: e.target.value })} className="modal-select">
            <option>Sick</option>
            <option>Vacation</option>
          </select>
          <textarea value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })} className="modal-textarea" placeholder="Reason"/>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="modal-btn cancel">Cancel</button>
            <button type="submit" className="modal-btn apply">Apply</button>
          </div>
        </form>
      </div>
    </div>
  );
}

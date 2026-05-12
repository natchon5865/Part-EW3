import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function App() {
  const [parts, setParts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [location, setLocation] = useState("");
  const [system, setSystem] = useState("ELINT/COMINT");
  const [status, setStatus] = useState("ดี");
  const [editId, setEditId] = useState<string | null>(null);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "parts"), (snapshot: any) => {
      const data = snapshot.docs.map((doc: any) => ({
        firebaseId: doc.id,
        ...doc.data(),
      }));
      setParts(data);
    });

    return () => unsubscribe();
  }, []);

  const addPart = async () => {
    const newPart = {
      id,
      name,
      qty: qty ? Number(qty) : 0,
      location,
      system,
      status,
    };

    if (editId) {
      await updateDoc(doc(db, "parts", editId), newPart);
      setEditId(null);
    } else {
      await addDoc(collection(db, "parts"), newPart);
    }

    setId("");
    setName("");
    setQty("");
    setLocation("");
    setSystem("ELINT/COMINT");
    setStatus("ดี");
  };

  const deletePart = async (firebaseId: string) => {
    await deleteDoc(doc(db, "parts", firebaseId));
  };

  const editPart = (part: any) => {
    setId(part.id);
    setName(part.name);
    setQty(part.qty.toString());
    setLocation(part.location);
    setSystem(part.system);
    setStatus(part.status);
    setEditId(part.firebaseId);
  };

const filteredParts = parts.filter((part) => {
  const text = search.toLowerCase();
  return (
    part.id?.toLowerCase().includes(text) ||
    part.name?.toLowerCase().includes(text) ||
    part.system?.toLowerCase().includes(text) ||
    part.location?.toLowerCase().includes(text) ||
    part.status?.toLowerCase().includes(text) ||
    part.qty?.toString().includes(text)
  );
});

  const total = parts.length;
  const good = parts.filter((p) => p.status === "ดี").length;
  const bad = parts.filter((p) => p.status === "เสีย").length;

  const inputStyle = {
    padding: "12px",
    borderRadius: "10px",
    border: "2px solid #cbd5e1",
    fontSize: "15px",
    fontWeight: "600",
    color: "#111827",
    backgroundColor: "#ffffff",
    outline: "none",
    width: "100%",
    boxSizing: "border-box" as const,
  };

  return (
    <div
      style={{
        background: "#f1f5f9",
        minHeight: "100vh",
        padding: isMobile ? "15px" : "30px",
        fontFamily: "'Segoe UI', 'Prompt', sans-serif",
        color: "#111827",
        width: "100%",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <div
          style={{
            display: "inline-block",
            background: "linear-gradient(90deg, #1d4ed8, #2563eb)",
            padding: isMobile ? "12px 20px" : "18px 40px",
            borderRadius: "14px",
          }}
        >
          <h1
            style={{
              fontSize: isMobile ? "28px" : "48px",
              fontWeight: "900",
              color: "#ffffff",
              margin: 0,
            }}
          >
            📦 ระบบจัดเก็บอะไหล่ห้องซ่อม
          </h1>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        {[
          ["📦 อะไหล่ทั้งหมด", total, "#111827"],
          ["🟢 ดี", good, "#16a34a"],
          ["🔴 เสีย", bad, "#dc2626"],
        ].map(([label, value, color], i) => (
          <div
            key={i}
            style={{
              background: "white",
              borderRadius: "18px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <h3>{label}</h3>
            <h1
              style={{
                fontSize: isMobile ? "32px" : "58px",
                color: color as string,
                margin: 0,
              }}
            >
              {value}
            </h1>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "25px" }}>
        <input
          type="text"
          placeholder="🔍 ค้นหา..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "18px",
          padding: "25px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(7, 1fr)",
            gap: "10px",
          }}
        >
          <input placeholder="P/N,S/N" value={id} onChange={(e) => setId(e.target.value)} style={inputStyle} />
          <input placeholder="ชื่ออะไหล่" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
          <input placeholder="จำนวน" value={qty} onChange={(e) => setQty(e.target.value)} style={inputStyle} />
          <input placeholder="ตำแหน่ง" value={location} onChange={(e) => setLocation(e.target.value)} style={inputStyle} />

          <select value={system} onChange={(e) => setSystem(e.target.value)} style={inputStyle}>
            <option>ELINT/COMINT</option>
            <option>PRAKARN</option>
            <option>Perimaster</option>
            <option>EW3</option>
            <option>Red Sky II</option>
          </select>

          <select value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle}>
            <option>ดี</option>
            <option>เสีย</option>
          </select>

          <button
            onClick={addPart}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "12px",
              fontWeight: "800",
              cursor: "pointer",
            }}
          >
            {editId ? "บันทึก" : "เพิ่ม"}
          </button>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: "18px", overflowX: "auto" }}>
        <table style={{ width: "100%", minWidth: "900px", borderCollapse: "collapse" }}>
          <thead style={{ background: "#0f172a", color: "white" }}>
            <tr>
              <th style={{ padding: "16px" }}>P/N,S/N</th>
              <th>ชื่ออะไหล่</th>
              <th>จำนวน</th>
              <th>ตำแหน่ง</th>
              <th>ระบบ</th>
              <th>สถานะ</th>
              <th>จัดการ</th>
            </tr>
          </thead>

          <tbody>
            {filteredParts.map((part) => (
              <tr key={part.firebaseId} style={{ textAlign: "center", borderBottom: "1px solid #e2e8f0" }}>
                <td style={{ padding: "14px" }}>{part.id}</td>
                <td>{part.name}</td>
                <td>{part.qty}</td>
                <td>{part.location}</td>
                <td>{part.system}</td>

                <td>
                  <span
                    style={{
                      padding: "6px 14px",
                      borderRadius: "999px",
                      color: "white",
                      fontWeight: "700",
                      background: part.status === "ดี" ? "#16a34a" : "#dc2626",
                    }}
                  >
                    {part.status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => editPart(part)}
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      marginRight: "8px",
                    }}
                  >
                    แก้ไข
                  </button>

                  <button
                    onClick={() => deletePart(part.firebaseId)}
                    style={{
                      background: "#dc2626",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

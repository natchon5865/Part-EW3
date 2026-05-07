import { useEffect, useState } from "react";

function App() {
  const [parts, setParts] = useState<any[]>(() => {
    const saved = localStorage.getItem("parts");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [location, setLocation] = useState("");
  const [system, setSystem] = useState("ELINT/COMINT");
  const [status, setStatus] = useState("พร้อมใช้");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    localStorage.setItem("parts", JSON.stringify(parts));
  }, [parts]);

  const addPart = () => {
    const newPart = {
      id,
      name,
      qty: qty ? Number(qty) : 0,
      location,
      system,
      status,
    };

    if (editIndex !== null) {
      const updated = [...parts];
      updated[editIndex] = newPart;
      setParts(updated);
      setEditIndex(null);
    } else {
      setParts([...parts, newPart]);
    }

    setId("");
    setName("");
    setQty("");
    setLocation("");
    setSystem("ELINT/COMINT");
    setStatus("พร้อมใช้");
  };

  const deletePart = (indexToDelete: number) => {
    setParts(parts.filter((_, index) => index !== indexToDelete));
  };

  const editPart = (part: any, index: number) => {
    setId(part.id);
    setName(part.name);
    setQty(part.qty.toString());
    setLocation(part.location);
    setSystem(part.system);
    setStatus(part.status);
    setEditIndex(index);
  };

  const filteredParts = parts.filter((part) => {
    const text = search.toLowerCase();
    return (
      part.id?.toLowerCase().includes(text) ||
      part.name?.toLowerCase().includes(text) ||
      part.system?.toLowerCase().includes(text)
    );
  });

  const total = parts.length;
  const low = parts.filter((p) => p.qty > 0 && p.qty <= 5).length;
  const empty = parts.filter((p) => p.qty === 0).length;
  const ready = parts.filter((p) => p.status === "พร้อมใช้").length;

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
      <h1
        style={{
          textAlign: "center",
          fontSize: isMobile ? "28px" : "46px",
          marginBottom: "25px",
        }}
      >
        📦 ระบบจัดเก็บอะไหล่ห้องซ่อม
      </h1>

      {/* กล่องสรุป */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
          gap: "15px",
          marginBottom: "30px",
        }}
      >
        {[
          ["📦 อะไหล่ทั้งหมด", total, "#111827"],
          ["🟠 ใกล้หมด", low, "#f59e0b"],
          ["🔴 หมด", empty, "#dc2626"],
          ["🟢 พร้อมใช้", ready, "#16a34a"],
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
              }}
            >
              {value}
            </h1>
          </div>
        ))}
      </div>

      {/* ค้นหา */}
      <div style={{ marginBottom: "25px" }}>
        <input
          type="text"
          placeholder="🔍 ค้นหาชื่ออะไหล่ หรือ ระบบ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* ฟอร์ม */}
      <div
        style={{
          background: "white",
          borderRadius: "18px",
          padding: "25px",
          marginBottom: "30px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontSize: isMobile ? "24px" : "34px",
          }}
        >
          ➕ เพิ่มอะไหล่
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(7, 1fr)",
            gap: "10px",
          }}
        >
          <input
            placeholder="P/N,S/N"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="ชื่ออะไหล่"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="จำนวน"
            value={qty}
            onChange={(e) => setQty(e.target.value)}
            style={inputStyle}
          />
          <input
            placeholder="ตำแหน่ง"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={inputStyle}
          />

          <select
            value={system}
            onChange={(e) => setSystem(e.target.value)}
            style={inputStyle}
          >
            <option>ELINT/COMINT</option>
            <option>PRAKARN</option>
            <option>Perimaster</option>
            <option>EW3</option>
            <option>Red Sky II</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={inputStyle}
          >
            <option>พร้อมใช้</option>
            <option>ใกล้หมด</option>
            <option>หมด</option>
          </select>

          <button
            onClick={addPart}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "10px",
              padding: "12px",
              fontWeight: "700",
              cursor: "pointer",
              width: "100%",
            }}
          >
            {editIndex !== null ? "บันทึก" : "เพิ่ม"}
          </button>
        </div>
      </div>

      {/* ตาราง */}
      <div
        style={{
          background: "white",
          borderRadius: "18px",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            minWidth: "900px",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              background: "#0f172a",
              color: "white",
            }}
          >
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
            {filteredParts.map((part, index) => (
              <tr
                key={index}
                style={{
                  textAlign: "center",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
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
                      background:
                        part.status === "พร้อมใช้"
                          ? "#16a34a"
                          : part.status === "ใกล้หมด"
                          ? "#f59e0b"
                          : "#dc2626",
                    }}
                  >
                    {part.status}
                  </span>
                </td>

                <td>
                  <button
                    onClick={() => editPart(part, index)}
                    style={{
                      background: "#2563eb",
                      color: "white",
                      border: "none",
                      padding: "8px 12px",
                      borderRadius: "8px",
                      marginRight: "8px",
                      cursor: "pointer",
                    }}
                  >
                    แก้ไข
                  </button>

                  <button
                    onClick={() => deletePart(index)}
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

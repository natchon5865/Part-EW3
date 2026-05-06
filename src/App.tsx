import { useState } from "react";

function App() {
  const [parts, setParts] = useState<any[]>([
    {
      id: "P001",
      name: "Battery",
      qty: 12,
      location: "ชั้น A1",
      system: "ELINT/COMINT",
      status: "พร้อมใช้",
    },
  ]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [location, setLocation] = useState("");
  const [system, setSystem] = useState("ELINT/COMINT");
  const [status, setStatus] = useState("พร้อมใช้");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  // เพิ่ม / แก้ไข
  const addPart = () => {
    const newPart = {
      id,
      name,
      qty: qty ? Number(qty) : 0,
      location,
      system,
      status,
    };

    if (editId) {
      const updated = parts.map((part) =>
        part.id === editId ? newPart : part
      );

      setParts(updated);
      setEditId(null);
    } else {
      setParts([...parts, newPart]);
    }

    // reset
    setId("");
    setName("");
    setQty("");
    setLocation("");
    setSystem("ELINT/COMINT");
    setStatus("พร้อมใช้");
  };

  // ลบ
  const deletePart = (id: string) => {
    setParts(parts.filter((part) => part.id !== id));
  };

  // แก้ไข
  const editPart = (part: any) => {
    setId(part.id);
    setName(part.name);
    setQty(part.qty.toString());
    setLocation(part.location);
    setSystem(part.system);
    setStatus(part.status);

    setEditId(part.id);
  };

  // ค้นหา
  const filteredParts = parts.filter((part) => {
    const text = search.toLowerCase();

    return (
      part.name?.toLowerCase().includes(text) ||
      part.system?.toLowerCase().includes(text) ||
      part.id?.toLowerCase().includes(text)
    );
  });

  // สรุป
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
        padding: "30px",
        fontFamily: "'Segoe UI', 'Prompt', sans-serif",
        color: "#111827",
      }}
    >
      {/* หัวข้อ */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "44px",
          marginBottom: "25px",
          fontWeight: "700",
        }}
      >
        📦 ระบบจัดเก็บอะไหล่ห้องซ่อม
      </h1>

      {/* กล่องสรุป */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h3>📦 อะไหล่ทั้งหมด</h3>

          <h1
            style={{
              fontSize: "58px",
              color: "#111827",
              marginTop: "10px",
            }}
          >
            {total}
          </h1>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h3>🟠 ใกล้หมด</h3>

          <h1
            style={{
              fontSize: "58px",
              color: "#f59e0b",
              marginTop: "10px",
            }}
          >
            {low}
          </h1>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h3>🔴 หมด</h3>

          <h1
            style={{
              fontSize: "58px",
              color: "#dc2626",
              marginTop: "10px",
            }}
          >
            {empty}
          </h1>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "16px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          <h3>🟢 พร้อมใช้</h3>

          <h1
            style={{
              fontSize: "58px",
              color: "#16a34a",
              marginTop: "10px",
            }}
          >
            {ready}
          </h1>
        </div>
      </div>

      {/* ค้นหา */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 ค้นหาชื่ออะไหล่ หรือ ระบบ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            ...inputStyle,
            width: "420px",
          }}
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
            fontSize: "34px",
          }}
        >
          ➕ เพิ่มอะไหล่
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "120px 160px 100px 150px 180px 130px 90px",
            gap: "12px",
            alignItems: "center",
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
            }}
          >
            {editId ? "บันทึก" : "เพิ่ม"}
          </button>
        </div>
      </div>

      {/* ตาราง */}
      <div
        style={{
          background: "white",
          borderRadius: "18px",
          overflow: "hidden",
        }}
      >
        <table
          style={{
            width: "100%",
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
                  fontWeight: "600",
                  color: "#111827",
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
                      fontSize: "14px",
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
                    onClick={() => editPart(part)}
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
                    onClick={() => deletePart(part.id)}
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

import { useEffect, useState } from "react";

function App() {
  // ข้อมูลอะไหล่
  const [parts, setParts] = useState(() => {
    const saved = localStorage.getItem("parts");

    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "P001",
            name: "Battery",
            qty: 12,
            location: "ชั้น A1",
            system: "ELINT/COMINT",
            status: "พร้อมใช้",
          },
        ];
  });

  // บันทึกข้อมูล
  useEffect(() => {
    localStorage.setItem("parts", JSON.stringify(parts));
  }, [parts]);

  // state
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [location, setLocation] = useState("");
  const [system, setSystem] = useState("ELINT/COMINT");
  const [status, setStatus] = useState("พร้อมใช้");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState("");

  // Dashboard
  const totalParts = parts.length;

  const lowStock = parts.filter(
    (part: any) => part.status === "ใกล้หมด"
  ).length;

  const outOfStock = parts.filter(
    (part: any) => part.status === "หมด"
  ).length;

  // style input
  const inputStyle = {
    backgroundColor: "#ffffff",
    color: "#000000",
    border: "1px solid #cbd5e1",
    padding: "10px",
    borderRadius: "8px",
    outline: "none",
    appearance: "none" as const,
    WebkitAppearance: "none" as const,
  };

  // เพิ่ม / แก้ไข
  const addPart = () => {
    if (!id || !name || !qty || !location) return;

    if (editId) {
      const updated = parts.map((part: any) =>
        part.id === editId
          ? {
              id,
              name,
              qty: Number(qty),
              location,
              system,
              status,
            }
          : part
      );

      setParts(updated);

      setEditId("");
    } else {
      const newPart = {
        id,
        name,
        qty: Number(qty),
        location,
        system,
        status,
      };

      setParts([...parts, newPart]);
    }

    setId("");
    setName("");
    setQty("");
    setLocation("");
    setSystem("ELINT/COMINT");
    setStatus("พร้อมใช้");
  };

  // โหลดข้อมูลมาแก้ไข
  const editPart = (part: any) => {
    setId(part.id);
    setName(part.name);
    setQty(part.qty);
    setLocation(part.location);
    setSystem(part.system);
    setStatus(part.status);

    setEditId(part.id);
  };

  // ลบ
  const deletePart = (id: string) => {
    setParts(parts.filter((part: any) => part.id !== id));
  };

  // สีสถานะ
  const getStatusColor = (status: string) => {
    switch (status) {
      case "พร้อมใช้":
        return "#16a34a";

      case "ใกล้หมด":
        return "#f59e0b";

      case "หมด":
        return "#dc2626";

      default:
        return "gray";
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f1f5f9",
        padding: "30px",
        fontFamily: "sans-serif",
      }}
    >
      {/* หัวเว็บ */}
      <h1
        style={{
          marginBottom: "20px",
          textAlign: "center",
          color: "#111827",
          fontSize: "40px",
        }}
      >
        📦 ระบบจัดเก็บอะไหล่ห้องซ่อม
      </h1>

      {/* Dashboard */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        {/* ทั้งหมด */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            flex: 1,
            minWidth: "200px",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ color: "#111827" }}>
            📦 อะไหล่ทั้งหมด
          </h3>

          <h1 style={{ color: "#111827" }}>
            {totalParts}
          </h1>
        </div>

        {/* ใกล้หมด */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            flex: 1,
            minWidth: "200px",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ color: "#111827" }}>
            🟠 ใกล้หมด
          </h3>

          <h1 style={{ color: "#111827" }}>
            {lowStock}
          </h1>
        </div>

        {/* หมด */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            flex: 1,
            minWidth: "200px",
            textAlign: "center",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ color: "#111827" }}>
            🔴 หมด
          </h3>

          <h1 style={{ color: "#111827" }}>
            {outOfStock}
          </h1>
        </div>
      </div>

      {/* ค้นหา */}
      <div
        style={{
          marginBottom: "20px",
          textAlign: "center",
        }}
      >
        <input
          type="text"
          placeholder="🔍 ค้นหาอะไหล่..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            ...inputStyle,
            width: "300px",
          }}
        />
      </div>

      {/* ฟอร์ม */}
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          marginBottom: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#111827",
          }}
        >
          {editId ? "✏️ แก้ไขอะไหล่" : "➕ เพิ่มอะไหล่"}
        </h2>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "15px",
          }}
        >
          <input
            placeholder="รหัส"
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

          {/* ระบบ */}
          <select
            value={system}
            onChange={(e) => setSystem(e.target.value)}
            style={inputStyle}
          >
            <option>ELINT/COMINT</option>
            <option>PRAKARN</option>
            <option>Perimaster</option>
          </select>

          {/* สถานะ */}
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
              background: editId ? "#f59e0b" : "#2563eb",
              color: "white",
              border: "none",
              padding: "10px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {editId ? "อัปเดต" : "เพิ่ม"}
          </button>
        </div>
      </div>

      {/* ตาราง */}
      <table
        style={{
          width: "100%",
          background: "white",
          borderCollapse: "collapse",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#1e293b",
              color: "white",
            }}
          >
            <th style={{ padding: "14px" }}>รหัส</th>
            <th>ชื่ออะไหล่</th>
            <th>จำนวน</th>
            <th>ตำแหน่ง</th>
            <th>ระบบ</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>

        <tbody>
          {parts
            .filter((part: any) =>
              part.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((part: any) => (
              <tr
                key={part.id}
                style={{
                  borderBottom: "1px solid #e2e8f0",
                  color: "#111827",
                }}
              >
                <td
                  style={{
                    padding: "14px",
                    textAlign: "center",
                  }}
                >
                  {part.id}
                </td>

                <td style={{ textAlign: "center" }}>
                  {part.name}
                </td>

                <td style={{ textAlign: "center" }}>
                  {part.qty}
                </td>

                <td style={{ textAlign: "center" }}>
                  {part.location}
                </td>

                <td style={{ textAlign: "center" }}>
                  {part.system}
                </td>

                <td style={{ textAlign: "center" }}>
                  <span
                    style={{
                      background: getStatusColor(part.status),
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "14px",
                    }}
                  >
                    {part.status}
                  </span>
                </td>

                <td
                  style={{
                    textAlign: "center",
                  }}
                >
                                    <button

                    onClick={() => editPart(part)}

                    style={{

                      background: "#2563eb",

                      color: "white",

                      border: "none",

                      padding: "8px 12px",

                      borderRadius: "8px",

                      cursor: "pointer",

                      marginRight: "10px",

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

  );

}

export default App;
                  

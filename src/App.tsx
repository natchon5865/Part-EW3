import { useEffect, useState } from "react";

function App() {
  // โหลดข้อมูล
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

  // save localStorage
  useEffect(() => {
    localStorage.setItem("parts", JSON.stringify(parts));
  }, [parts]);

  // states
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [qty, setQty] = useState("");
  const [location, setLocation] = useState("");
  const [system, setSystem] = useState("ELINT/COMINT");
  const [status, setStatus] = useState("พร้อมใช้");

  const [searchText, setSearchText] = useState("");

  const [editId, setEditId] = useState("");

  // dashboard
  const totalParts = parts.length;

  const lowStock = parts.filter(
    (part: any) => part.status === "ใกล้หมด"
  ).length;

  const outOfStock = parts.filter(
    (part: any) => part.status === "หมด"
  ).length;

  // style
const inputStyle = {
  backgroundColor: "#ffffff",
  color: "#000000",
  border: "2px solid #94a3b8",
  padding: "10px",
  borderRadius: "8px",
  outline: "none",
  fontWeight: "600",
};

  // เพิ่มข้อมูล
  const _addPart = () => {
    if (
      id === "" &&
      name === "" &&
      qty === "" &&
      location === ""
    ) {
      return;
    }

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

  // แก้ไข
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
      {/* title */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "42px",
          marginBottom: "20px",
          color: "#111827",
        }}
      >
        📦 ระบบจัดเก็บอะไหล่ห้องซ่อม
      </h1>

      {/* dashboard */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "220px",
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h3>📦 อะไหล่ทั้งหมด</h3>
          <h1>{totalParts}</h1>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "220px",
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h3>🟠 ใกล้หมด</h3>
          <h1>{lowStock}</h1>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: "220px",
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            textAlign: "center",
          }}
        >
          <h3>🔴 หมด</h3>
          <h1>{outOfStock}</h1>
        </div>
      </div>

      {/* search */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="🔍 ค้นหาชื่ออะไหล่ หรือ ระบบ..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{
            ...inputStyle,
            width: "350px",
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
    overflowX: "auto",
  }}
>
  <h2
    style={{
      textAlign: "center",
      marginBottom: "20px",
      color: "#000000",
      fontWeight: "700",
    }}
  >
    ➕ เพิ่มอะไหล่
  </h2>

  <div
    style={{
      display: "flex",
      gap: "10px",
      flexWrap: "nowrap",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <input
      type="text"
      placeholder="P/N,S/N"
      style={inputStyle}
    />

    <input
      type="text"
      placeholder="ชื่ออะไหล่"
      style={inputStyle}
    />

    <input
      type="number"
      placeholder="จำนวน"
      style={inputStyle}
    />

    <input
      type="text"
      placeholder="ตำแหน่ง"
      style={inputStyle}
    />

    <select style={inputStyle}>
      <option>ELINT/COMINT</option>
      <option>Perimaster</option>
      <option>Red Sky II</option>
      <option>EW3</option>
      <option>PRAKARN</option>
    </select>

    <select style={inputStyle}>
      <option>พร้อมใช้</option>
      <option>ใกล้หมด</option>
      <option>หมด</option>
    </select>

    <button
      style={{
        background: "#2563eb",
        color: "white",
        border: "none",
        padding: "10px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "700",
      }}
    >
      เพิ่ม
    </button>
  </div>
</div>
      {/* table */}
      <table
        style={{
          width: "100%",
          background: "white",
          borderCollapse: "collapse",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#0f172a",
              color: "white",
            }}
          >
            <th style={{ padding: "14px" }}>
              P/N,S/N
            </th>

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
            .filter((part: any) => {
              const text = searchText
                .toLowerCase()
                .trim();

              if (text === "") return true;

              return (
                part.name
                  .toLowerCase()
                  .includes(text) ||
                part.system
                  .toLowerCase()
                  .includes(text)
              );
            })
            .map((part: any, index: number) => (
              <tr
                key={index}
                style={{
                  borderBottom:
                    "1px solid #e2e8f0",
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
                      background:
                        getStatusColor(
                          part.status
                        ),
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "14px",
                    }}
                  >
                    {part.status}
                  </span>
                </td>
 <td style={{ textAlign: "center" }}>

                  <button

                    onClick={() =>

                      editPart(part)

                    }

                    style={{

                      background: "#2563eb",

                      color: "white",

                      border: "none",

                      padding: "8px 12px",

                      borderRadius: "8px",

                      marginRight: "10px",

                      cursor: "pointer",

                    }}

                  >

                    แก้ไข

                  </button>

                  <button

                    onClick={() =>

                      deletePart(part.id)

                    }

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

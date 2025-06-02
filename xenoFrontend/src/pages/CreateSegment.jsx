import { useState } from "react";
import axios from 'axios';

export default function CreateSegment() {
  const [name, setName] = useState("");
  const [rules, setRules] = useState([
    { field: "totalSpend", operator: ">", value: 1000 },
  ]);
  const [combineWith, setCombineWith] = useState("AND");
  const [preview, setPreview] = useState(null);

  const handlePreview = async () => {
    try {
      const res = await axios.post("https://crmplatform.onrender.com/api/segments/preview", {
        rules,
        combineWith,
      });
      setPreview(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Error previewing segment");
    }
  };

  const handleSave = async () => {
    try {
      await axios.post("https://crmplatform.onrender.com/api/segments", {
        name,
        ruleGroup: { rules, combineWith },
      });
      alert("Segment saved!");
    } catch (err) {
      alert("Failed to save segment");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Segment</h2>

      <input
        placeholder="Segment name"
        className="border p-2 w-full mb-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      {/* Just basic fields for now */}
      <div className="space-y-2">
        {rules.map((rule, idx) => (
          <div key={idx} className="flex gap-2">
            <input
              className="border p-1"
              value={rule.field}
              onChange={(e) =>
                setRules((prev) =>
                  prev.map((r, i) => i === idx ? { ...r, field: e.target.value } : r
                ))
              }
              placeholder="Field"
            />
            <input
              className="border p-1 w-12"
              value={rule.operator}
              onChange={(e) =>
                setRules((prev) =>
                  prev.map((r, i) => i === idx ? { ...r, operator: e.target.value } : r
                ))
              }
              placeholder="Op"
            />
            <input
              className="border p-1"
              value={rule.value}
              onChange={(e) =>
                setRules((prev) =>
                  prev.map((r, i) => i === idx ? { ...r, value: e.target.value } : r
                ))
              }
              placeholder="Value"
            />
          </div>
        ))}
      </div>

      <select
        className="border p-2 my-2"
        value={combineWith}
        onChange={(e) => setCombineWith(e.target.value)}
      >
        <option value="AND">AND</option>
        <option value="OR">OR</option>
      </select>

      <div className="flex gap-4 mt-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handlePreview}>
          Preview
        </button>
        <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSave}>
          Save Segment
        </button>
      </div>

      {preview && (
        <div className="mt-6">
          <p>Matched Customers: {preview.count}</p>
          <ul className="list-disc ml-6">
            {preview.sample.map((c) => (
              <li key={c._id}>{c.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

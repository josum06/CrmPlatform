import { useEffect, useState } from "react";
import axios from 'axios';


export default function CreateCampaign() {
  const [segments, setSegments] = useState([]);
  const [selectedSegmentId, setSelectedSegmentId] = useState("");
  const [message, setMessage] = useState("Hi {{name}}, enjoy 10% off!");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Fetch all segments for dropdown
    const fetchSegments = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/segments");
        setSegments(res.data);
        if (res.data.length > 0) {
          setSelectedSegmentId(res.data[0]._id); // default selection
        }
      } catch (err) {
        console.error("Error fetching segments:", err);
      }
    };
    fetchSegments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSegmentId || !message) return alert("Fill all fields");

    try {
      setSending(true);
      const res = await axios.post("http://localhost:3000/api/campaigns", {
        segmentId: selectedSegmentId,
        message,
      });
      setResult(res.data);
    } catch (err) {
      alert("Campaign creation failed");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Create Campaign</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Select Segment</label>
          <select
            className="w-full border p-2"
            value={selectedSegmentId}
            onChange={(e) => setSelectedSegmentId(e.target.value)}
          >
            {segments.map((seg) => (
              <option key={seg._id} value={seg._id}>
                {seg.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold">Message Template</label>
          <textarea
            className="w-full border p-2 h-24"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Hi {{name}}, you’ve been selected for a special offer!"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={sending}
        >
          {sending ? "Sending..." : "Send Campaign"}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-white shadow p-4 rounded">
          <h3 className="font-bold">✅ Campaign Sent</h3>
          <p>Total Customers: {result.campaign.stats.total}</p>
          <p>Sent: {result.campaign.stats.sent}</p>
          <p>Failed: {result.campaign.stats.failed}</p>
        </div>
      )}
    </div>
  );
}

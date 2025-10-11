import React, { useState, useEffect } from "react";
import axios from "axios";

const NewsletterDashboard = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/newsletter")
      .then((res) => setSubscribers(res.data));
  }, []);

  const handleSend = async () => {
    try {
      await axios.post("http://localhost:5000/api/newsletter/send", {
        subject,
        message,
      });
      setStatus("Message sent to all subscribers!");
      setSubject("");
      setMessage("");
    } catch (error) {
      setStatus(error.response?.data?.message || "Error sending message");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Newsletter Dashboard</h2>

      <h3 className="font-semibold mb-2">Subscribers ({subscribers.length})</h3>
      <ul className="mb-4">
        {subscribers.map((s) => (
          <li key={s._id}>{s.email}</li>
        ))}
      </ul>

      <input
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <textarea
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      ></textarea>
      <button
        onClick={handleSend}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Send to All
      </button>
      {status && <p className="mt-2 text-sm text-gray-700">{status}</p>}
    </div>
  );
};

export default NewsletterDashboard;

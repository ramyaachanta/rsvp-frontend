import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RsvpEntry {
  id: string;
  name: string;
  status: 'Yes' | 'No' | 'Maybe';
}

const App: React.FC = () => {
  const [showToast, setShowToast] = useState(false);
  const [entries, setEntries] = useState<RsvpEntry[]>([]);
  const [counts, setCounts] = useState({ total: 0, confirmed: 0, declined: 0 });
  const [formList, setFormList] = useState<Omit<RsvpEntry, 'id'>[]>([{ name: '', status: 'Yes' }]);

  const fetchRsvps = async () => {
    const res = await fetch('http://localhost:5000/api/rsvp');
    const data = await res.json();
    setEntries(data);
  };

  const fetchCounts = async () => {
    const res = await fetch('http://localhost:5000/api/rsvp/counts');
    const data = await res.json();
    setCounts(data);
  };

  const handleInputChange = (index: number, field: keyof Omit<RsvpEntry, 'id'>, value: string) => {
    const updated = [...formList];
    if (field === 'status') {
      updated[index].status = value as RsvpEntry['status'];
    } else {
      updated[index].name = value;
    }
    setFormList(updated);
  };

  const addFormEntry = () => {
    setFormList([...formList, { name: '', status: 'Yes' }]);
  };

  const removeFormEntry = (index: number) => {
    const updated = [...formList];
    updated.splice(index, 1);
    setFormList(updated);
  };

  const handleSubmit = async () => {
    if (formList.length === 1) {
      const id = Date.now().toString();
      await fetch('http://localhost:5000/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...formList[0] }),
      });
    } else {
      const payload = formList.map((item) => ({
        ...item,
        id: Date.now().toString() + Math.random().toString().slice(2, 6),
      }));
      await fetch('http://localhost:5000/api/rsvp/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entries: payload }),
      });
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
    setFormList([{ name: '', status: 'Yes' }]);
    fetchRsvps();
    fetchCounts();
  };

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:5000/api/rsvp/${id}`, { method: 'DELETE' });
    fetchRsvps();
    fetchCounts();
  };

  useEffect(() => {
    fetchRsvps();
    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-200 via-indigo-200 to-blue-200 flex flex-col items-center py-10 px-4 transition-all">
      <motion.h1
        className="text-5xl font-extrabold mb-10 text-indigo-800 tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🎉 RSVP Manager
      </motion.h1>

      <motion.div
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-2xl space-y-6 border border-gray-300"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-gray-800">RSVP Form</h2>
        {formList.map((entry, index) => (
          <motion.div key={index} className="flex flex-col sm:flex-row gap-3 items-center">
            <input
              type="text"
              className="flex-1 border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
              placeholder="Enter name"
              value={entry.name}
              onChange={(e) => handleInputChange(index, 'name', e.target.value)}
              required
            />
            <select
              value={entry.status}
              onChange={(e) => handleInputChange(index, 'status', e.target.value)}
              className="border border-gray-300 p-3 rounded-xl focus:outline-none shadow-sm"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              <option value="Maybe">Maybe</option>
            </select>
            {formList.length > 1 && (
              <button
                type="button"
                onClick={() => removeFormEntry(index)}
                className="text-red-500 hover:text-red-700 text-xl"
              >
                ✕
              </button>
            )}
          </motion.div>
        ))}

        <div className="flex justify-between gap-4 pt-2">
          <button
            onClick={addFormEntry}
            className="bg-gray-700 text-white px-5 py-2 rounded-xl shadow-md hover:bg-gray-800 transition-all"
          >
            + Add RSVP
          </button>
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl shadow-md hover:bg-indigo-700 transition-all"
          >
            Submit RSVP
          </button>
        </div>
      </motion.div>

      <motion.div
        className="mt-12 w-full max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">All RSVPs</h2>
        <ul className="bg-white rounded-3xl shadow-lg divide-y divide-gray-100">
          {entries.map((entry) => (
            <li key={entry.id} className="flex items-center justify-between p-4 hover:bg-indigo-50">
              <div>
                <p className="font-medium text-gray-900">{entry.name}</p>
                <p className="text-sm text-gray-500">Status: {entry.status}</p>
              </div>
              <button
                onClick={() => handleDelete(entry.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-xl hover:bg-red-600 transition"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-6 p-6 bg-white rounded-3xl shadow-lg text-center border-t border-gray-100">
          <p className="font-bold text-gray-800 text-lg">
            Total RSVPs: <span className="text-indigo-700 font-extrabold">{counts.total}</span>
          </p>
          <p className="text-green-600 font-medium">Confirmed: {counts.confirmed}</p>
          <p className="text-red-500 font-medium">Declined: {counts.declined}</p>
        </div>
      </motion.div>
    {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          className="fixed bottom-6  bg-green-500 text-white px-6 py-3 rounded-xl shadow-xl z-50"
        >
          ✅ RSVP submitted successfully!
        </motion.div>
      )}
    </div>
  );
};

export default App;

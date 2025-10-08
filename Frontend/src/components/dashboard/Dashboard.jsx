import React from "react";

const Dashboard = () => {
  // Dummy stats
  const stats = [
    { name: "Projects", value: 12, color: "bg-blue-500" },
    { name: "Skills", value: 8, color: "bg-green-500" },
    { name: "Messages", value: 5, color: "bg-pink-500" },
  ];

  // Dummy recent messages
  const recentMessages = [
    { id: 1, sender: "Ali", subject: "Project Update", date: "2025-09-24" },
    { id: 2, sender: "Sara", subject: "New Collaboration", date: "2025-09-22" },
    { id: 3, sender: "Omid", subject: "Meeting Schedule", date: "2025-09-20" },
  ];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="rounded-xl shadow-md p-6 flex items-center gap-4 bg-white dark:bg-gray-800 transition"
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full text-white ${stat.color}`}
            >
              {stat.value}
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {stat.name}
              </p>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Messages Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
          Recent Messages
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                <th className="py-2 px-4">Sender</th>
                <th className="py-2 px-4">Subject</th>
                <th className="py-2 px-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentMessages.map((msg) => (
                <tr
                  key={msg.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {msg.sender}
                  </td>
                  <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                    {msg.subject}
                  </td>
                  <td className="py-2 px-4 text-gray-500 dark:text-gray-400">
                    {msg.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

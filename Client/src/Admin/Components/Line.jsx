// components/graphs/UserRegistrationsGraph.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { date: '2025-07-01', seeker: 30, provider: 10, admin: 1 },
  { date: '2025-07-02', seeker: 45, provider: 15, admin: 0 },
  { date: '2025-07-03', seeker: 50, provider: 25, admin: 1 },
];

export default function UserRegistrationsGraph() {
  return (
    <div className="p-4 bg-gray-900 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">User Registrations Over Time</h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid stroke="#eee" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="seeker" stroke="#8884d8" />
        <Line type="monotone" dataKey="provider" stroke="#82ca9d" />
        <Line type="monotone" dataKey="admin" stroke="#ff6b6b" />
      </LineChart>
    </div>
  );
}

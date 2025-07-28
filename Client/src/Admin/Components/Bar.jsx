// components/graphs/ActiveJobsByCategory.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { category: 'IT', jobs: 120 },
  { category: 'Marketing', jobs: 80 },
  { category: 'Finance', jobs: 60 },
];

export default function ActiveJobsByCategory() {
  return (
    <div className="p-4 bg-gray-900 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Active Job Posts by Category</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="jobs" fill="#0c0c3a" />
      </BarChart>
    </div>
  );
}

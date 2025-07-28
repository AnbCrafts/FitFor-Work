// components/graphs/TopAppliedJobs.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { jobTitle: 'Frontend Dev', applications: 70 },
  { jobTitle: 'Backend Dev', applications: 65 },
  { jobTitle: 'HR Manager', applications: 40 },
];

export default function TopAppliedJobs() {
  return (
    <div className="p-4 bg-gray-900 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Top Applied Job Posts</h2>
      <BarChart width={600} height={300} layout="vertical" data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="jobTitle" />
        <Tooltip />
        <Bar dataKey="applications" fill="#FF6B6B" />
      </BarChart>
    </div>
  );
}

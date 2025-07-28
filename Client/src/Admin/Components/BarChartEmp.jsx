// components/graphs/TopEmployersGraph.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { company: 'TCS', posts: 90 },
  { company: 'Infosys', posts: 75 },
  { company: 'Wipro', posts: 50 },
];

export default function TopEmployersGraph() {
  return (
    <div className="p-4 bg-gray-900 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Top Employers by Job Posts</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="company" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="posts" fill="#0c0c3a" />
      </BarChart>
    </div>
  );
}

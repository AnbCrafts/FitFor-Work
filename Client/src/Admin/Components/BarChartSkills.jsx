// components/graphs/TopSkillsGraph.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { skill: 'React', count: 85 },
  { skill: 'Node.js', count: 60 },
  { skill: 'Python', count: 45 },
];

export default function TopSkillsGraph() {
  return (
    <div className="p-4 bg-gray-900 rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Top Skills in Demand</h2>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="skill" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

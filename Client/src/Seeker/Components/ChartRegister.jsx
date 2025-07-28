// src/ChartRegister.js

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadarController,
  RadialLinearScale,
} from 'chart.js';

// ✅ Register once globally
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadarController,
  RadialLinearScale
);

// ✅ No need to export a React component
// Just export something to make the import valid
export default {};

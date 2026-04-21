import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import PradeepResume from './pradeep_ananth.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PradeepResume />
    <Analytics />
  </React.StrictMode>
);
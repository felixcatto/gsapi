import '../css/index.css'; // Import FIRST
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '../css/tailwind.css'; // Import LAST

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);

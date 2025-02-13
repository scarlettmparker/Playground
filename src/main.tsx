import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './style.css';

import Index from './routes'
import Wordle from './routes/wordle'
import Pokemon from './routes/pokemon'
import Three from './routes/three'

createRoot(document.getElementById('root')!).render(
  <Router>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/wordle" element={<Wordle />} />
      <Route path="/pokemon" element={<Pokemon />} />
      <Route path="/three" element={<Three />} />
    </Routes>
  </Router>,
)

import type React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import DoctorsPage from './pages/DoctorsPage';
import NursesPage from './pages/NursesPage';
import AddUserPage from './pages/AddUserPage';
import { UserProvider } from './context/StaffContext';

const App: React.FC = () => (
  <UserProvider>
    <Router>
      <Header />
      <main className="container mx-auto py-4">
        <Routes>
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/nurses" element={<NursesPage />} />
          
        </Routes>
        <AddUserPage />
      </main>
    </Router>
  </UserProvider>
);

export default App;

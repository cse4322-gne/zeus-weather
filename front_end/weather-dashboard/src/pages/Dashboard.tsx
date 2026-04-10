import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { CloudRain, LogOut } from 'lucide-react';
import './Auth.css';

export default function Dashboard() {
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setEmail(user.email ?? null);
      }
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="dashboard-logo">
          <CloudRain size={28} />
          <span>Zeus Weather</span>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </nav>
      
      <main>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Welcome back{email ? `, ${email}` : ''}!</h1>
        <p style={{ color: 'var(--auth-text-secondary)'}}>
          This is your protected dashboard. You are successfully authenticated via Supabase.
        </p>

        {/* Temporary placeholder content */}
        <div style={{ marginTop: '2rem', padding: '2rem', background: 'var(--auth-card-bg)', borderRadius: '16px', border: '1px solid var(--auth-card-border)' }}>
          <h3>Weather data will appear here...</h3>
        </div>
      </main>
    </div>
  );
}

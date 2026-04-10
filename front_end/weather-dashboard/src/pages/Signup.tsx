import { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { CloudLightning, AlertCircle, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Auth.css';

gsap.registerPlugin(useGSAP);

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const container = useRef<HTMLDivElement>(null);
  const lightningOverlay = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Initial entrance animation
    gsap.from('.auth-card', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });

    // Cloud floating animations
    gsap.to('.cloud-1', {
      x: window.innerWidth + 400,
      duration: 45,
      ease: 'none',
      repeat: -1,
    });
    
    gsap.to('.cloud-2', {
      x: -window.innerWidth - 250,
      duration: 35,
      ease: 'none',
      repeat: -1,
    });
    
    gsap.to('.cloud-3', {
      x: window.innerWidth + 300,
      duration: 55,
      ease: 'none',
      repeat: -1,
    });
  }, { scope: container });

  const triggerLightningStrike = (onComplete: () => void) => {
    const tl = gsap.timeline({ onComplete });
    tl.to(lightningOverlay.current, { opacity: 1, duration: 0.05 })
      .to(lightningOverlay.current, { opacity: 0, duration: 0.1 })
      .to(lightningOverlay.current, { opacity: 1, duration: 0.05 })
      .to(lightningOverlay.current, { opacity: 0, duration: 0.8, ease: 'power2.out' })
      .to('.auth-card', { opacity: 0, scale: 0.95, duration: 0.3 }, "<0.2");
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Success! Trigger Zeus Lightning Effect then route
      triggerLightningStrike(() => {
        navigate('/');
      });
    }
  };

  return (
    <div className="auth-wrapper" ref={container}>
      <div className="clouds-container">
        <svg className="cloud cloud-1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5,19c1.9,0,3.5-1.6,3.5-3.5c0-1.8-1.5-3.3-3.3-3.4c-0.1-2.9-2.5-5.1-5.4-5.1c-2.4,0-4.5,1.6-5.2,3.8c-2,0.1-3.5,1.7-3.5,3.7C3.5,17.4,5.1,19,7,19H17.5z" />
        </svg>
        <svg className="cloud cloud-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5,19c1.9,0,3.5-1.6,3.5-3.5c0-1.8-1.5-3.3-3.3-3.4c-0.1-2.9-2.5-5.1-5.4-5.1c-2.4,0-4.5,1.6-5.2,3.8c-2,0.1-3.5,1.7-3.5,3.7C3.5,17.4,5.1,19,7,19H17.5z" />
        </svg>
        <svg className="cloud cloud-3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5,19c1.9,0,3.5-1.6,3.5-3.5c0-1.8-1.5-3.3-3.3-3.4c-0.1-2.9-2.5-5.1-5.4-5.1c-2.4,0-4.5,1.6-5.2,3.8c-2,0.1-3.5,1.7-3.5,3.7C3.5,17.4,5.1,19,7,19H17.5z" />
        </svg>
      </div>
      
      <div className="lightning-overlay" ref={lightningOverlay}></div>

      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">
              <CloudLightning size={36} />
            </div>
            <h1 className="auth-title">Join the Storm</h1>
            <p className="auth-subtitle">Create your Zeus Weather profile</p>
          </div>

          <form className="auth-form" onSubmit={handleSignup}>
            {error && (
              <div className="auth-error">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="auth-input-group">
              <label className="auth-label" htmlFor="name">Full Name</label>
              <input
                id="name"
                className="auth-input"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            
            <div className="auth-input-group">
              <label className="auth-label" htmlFor="email">Email</label>
              <input
                id="email"
                className="auth-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-input-group">
              <label className="auth-label" htmlFor="password">Password</label>
              <input
                id="password"
                className="auth-input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>

            <button className="auth-button" type="submit" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" size={22} /> : 'Summon Account'}
            </button>
          </form>

          <div className="auth-footer">
            Already in the storm? <Link to="/login" className="auth-link">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

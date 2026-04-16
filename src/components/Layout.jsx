import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar.jsx';
import { initScrollEffects, initAnimations, initLoadedState } from '@/lib/siteUtils.js';

export default function Layout() {
    const location = useLocation();

    useEffect(() => {
        initScrollEffects();
        initLoadedState();
    }, []);

    useEffect(() => {
        initAnimations();
    }, [location.pathname]);

    return (
        <>
            <Navbar />
            <Outlet />
            <footer className="footer">
                <p>
                    &copy; 2026 阳光小站 | Made with
                    <i className="fas fa-heart" style={{ color: '#ff6b6b', margin: '0 4px' }} />
                    by Bella
                </p>
            </footer>
        </>
    );
}

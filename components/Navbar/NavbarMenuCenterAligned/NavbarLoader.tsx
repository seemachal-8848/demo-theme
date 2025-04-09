import React from 'react';
import { Placeholder } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this is imported

const NavbarLoader = () => {
  return (
    <header style={{ backgroundColor: '#f8f9fa', padding: '10px 20px' }}>
      <nav>
        <div className="d-flex justify-content-between align-items-center">
          {/* Logo Placeholder */}
          <Placeholder animation="glow" className="d-none d-md-block">
            <Placeholder xs={12} style={{ height: '58px', width: '248px' }} />
          </Placeholder>

          <Placeholder animation="glow" className="d-block d-md-none">
            <Placeholder xs={12} style={{ height: '58px', width: '158px' }} />
          </Placeholder>

          {/* Navigation Links Placeholder */}
          <div className="d-none d-md-flex gap-4 w-50 px-5">
            {[1, 2].map((item) => (
              <Placeholder key={item} animation="glow">
                <Placeholder xs={6} style={{ height: '20px', width: '90px' }} />
              </Placeholder>
            ))}
          </div>

          {/* Icons Placeholder */}
          <div className="d-flex gap-3 align-items-center">
            {[1, 2, 3].map((item) => (
              <Placeholder key={item} animation="glow">
                <Placeholder xs={12} className="rounded-circle" style={{ width: '30px', height: '30px' }} />
              </Placeholder>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavbarLoader;

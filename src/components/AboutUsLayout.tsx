import React, { ReactNode } from 'react';

interface AboutUsLayoutProps {
  children: ReactNode;
}

const AboutUsLayout: React.FC<AboutUsLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
};

export default AboutUsLayout;

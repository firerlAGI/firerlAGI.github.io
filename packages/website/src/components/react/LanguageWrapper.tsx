import React from 'react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import Navbar from './Navbar';

const LanguageWrapper: React.FC = () => {
  return (
    <LanguageProvider>
      <Navbar />
    </LanguageProvider>
  );
};

export default LanguageWrapper;

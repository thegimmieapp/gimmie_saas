import React from 'react';
import B2BHeader from './B2BHeader';
import B2BFooter from './B2BFooter';

export default function B2BLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <B2BHeader />
      <main className="flex-grow">{children}</main>
      <B2BFooter />
    </div>
  );
}
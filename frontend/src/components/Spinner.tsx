import React from 'react';

export default function Spinner() {
  return (
    <div className="flex justify-center py-24">
      <div
        className="w-6 h-6 rounded-full border-2 border-t-transparent animate-spin"
        style={{ borderColor: 'var(--color-green)', borderTopColor: 'transparent' }}
      />
    </div>
  );
}


import React from 'react';

export default function CardContainer({ title, children }) {
  return (
    <div className="bg-gray-100 p-5 rounded-xl shadow border border-gray-300 mb-6">
      {title && (
        <h2 className="font-semibold text-lg mb-3 text-gray-800">{title}</h2>
      )}
      {children}
    </div>
  );
}

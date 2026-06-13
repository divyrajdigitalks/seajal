import React from 'react';

export const WhatsAppWidget: React.FC = () => {
  const whatsappUrl = "https://wa.me/918048039988?text=Hi%20Aqua%20J1,%20I%20am%20interested%20in%20your%20water%20purifier/softener%20solutions.";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 hover:shadow-2xl active:scale-95 transition-all duration-300 group"
      aria-label="Chat on WhatsApp"
    >
      <svg
        className="h-8 w-8 fill-current transition-transform duration-300 group-hover:rotate-12"
        viewBox="0 0 24 24"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.116-2.905-6.993C16.255 1.87 13.78 1.843 11.47 1.843c-5.437 0-9.861 4.421-9.865 9.864 0 1.63.499 3.224 1.453 4.825L1.96 20.89l4.687-1.736zm10.413-6.205c-.308-.154-1.82-.9-2.1-.1-.281.1-.56.415-.688.563-.127.147-.255.166-.563.011-.307-.154-1.3-.478-2.477-1.53-.914-.816-1.53-1.824-1.71-2.131-.18-.308-.02-.475.134-.628.14-.137.308-.36.462-.54.153-.18.205-.308.308-.513.102-.206.051-.385-.026-.54-.077-.154-.688-1.657-.943-2.27-.248-.598-.5-.517-.688-.527-.178-.008-.383-.01-.587-.01-.205 0-.537.077-.819.385-.282.308-1.077 1.05-1.077 2.562 0 1.514 1.102 2.977 1.254 3.182.154.205 2.169 3.313 5.256 4.646.734.317 1.307.506 1.753.648.737.234 1.408.201 1.94.122.592-.087 1.82-.743 2.076-1.46.256-.718.256-1.334.18-1.46-.077-.128-.282-.205-.59-.359z" />
      </svg>
      {/* Tooltip */}
      <span className="absolute right-16 scale-0 group-hover:scale-100 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg transition-transform origin-right duration-200">
        Need Help? Chat with us
      </span>
    </a>
  );
};

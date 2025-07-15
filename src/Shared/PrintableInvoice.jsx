// PrintableInvoice.jsx
import React, { forwardRef } from "react";

const PrintableInvoice = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="printable-area" style={{ backgroundColor: "white" }}>
      <div className="flex justify-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          <span className="text-blue-600">●</span> WARIUM
        </h2>
      </div>
      {/* Other invoice content here - same as before */}
      <p className="mt-8 text-gray-500">
        Extra note such as company or payment information...
      </p>
    </div>
  );
});

export default PrintableInvoice;

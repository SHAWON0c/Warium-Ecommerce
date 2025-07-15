import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import PrintableInvoice from '../../Shared/PrintableInvoice';

const Invoice = () => {
const componentRef = useRef<HTMLDivElement>('hello');

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Invoice",
  });



    const handleExport = () => {
        alert('Exporting Invoice... (Integrate your export logic here)');
    };

    return (
        <div className="w-full mx-auto p-6 bg-white border rounded-md mt-10">
            {/* Header */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h1 className="text-lg font-semibold">INVOICE</h1>
                <div className="space-x-2">
                    <button
                        onClick={()=>{
                            console.log('Button clicked');
                            handlePrint();
                        }}
                        
                        className="bg-gray-800 text-white px-4 py-2 rounded"
                    >
                        Print
                    </button>
                    <button
                        onClick={handleExport}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Export
                    </button>
                </div>
            </div>

            {/* Invoice Content */}
            <div>
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">
                        <span className="text-blue-600">●</span> WARIUM
                    </h2>
                </div>

                {/* Info Section */}
                <div className="flex justify-between mb-6 text-gray-500 text-sm py-2">
                    <div className="py-2">
                        <p className="py-2">
                            To : <span className="font-bold">Alex Doe</span>
                        </p>
                        <p>123, Mountain View,</p>
                        <p className="py-2">California, US State.</p>
                        <p>
                            <span className="font-bold">Phone :</span> 1234567890
                        </p>
                    </div>
                    <div className="text-right text-gray-500 text-sm">
                        <p className="py-2">
                            <span className="font-bold">ID :</span> #111-222
                        </p>
                        <p>
                            <span className="font-bold">HSN Code :</span> #123456
                        </p>
                        <p className="py-2">
                            <span className="font-bold">Issue Date :</span> Oct 12, 2021-2022
                        </p>
                        <p>
                            <span className="font-bold">Invoice No :</span> 6548
                        </p>
                    </div>
                </div>

                {/* Table */}
                <table className="w-full text-left text-gray-700 border-collapse text-sm">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2">ID</th>
                            <th className="py-2">Name</th>
                            <th className="py-2 text-right">Qty</th>
                            <th className="py-2 text-right">Price</th>
                            <th className="py-2 text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="py-4 font-semibold">225</td>
                            <td className="py-4">Women sleeveless top</td>
                            <td className="py-4 text-right">2</td>
                            <td className="py-4 text-right">$65</td>
                            <td className="py-4 text-right">$130</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-4 font-semibold">548</td>
                            <td className="py-4">Mens cotton fabric shirt</td>
                            <td className="py-4 text-right">3</td>
                            <td className="py-4 text-right">$10</td>
                            <td className="py-4 text-right">$30</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-4 font-semibold">684</td>
                            <td className="py-4">Baby clothes pair</td>
                            <td className="py-4 text-right">1</td>
                            <td className="py-4 text-right">$360</td>
                            <td className="py-4 text-right">$360</td>
                        </tr>
                        <tr className="border-b">
                            <td className="py-4 font-semibold">987</td>
                            <td className="py-4">Hand bags for women</td>
                            <td className="py-4 text-right">5</td>
                            <td className="py-4 text-right">$50</td>
                            <td className="py-4 text-right">$250</td>
                        </tr>
                    </tbody>
                </table>

                {/* Summary Section */}
                <div className="w-full flex justify-end mt-6 text-gray-700 text-sm">
                    <div className="w-[250px]">
                        <div className="flex justify-between py-2 border-b">
                            <span>Sub Total</span>
                            <span className="font-bold text-sm text-gray-500">$3520</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span>Tax (10%)</span>
                            <span className="font-bold text-sm text-gray-500">$352</span>
                        </div>
                        <div className="flex justify-between py-2 border-b">
                            <span>Total</span>
                            <span className="font-bold text-sm text-gray-500">$3872</span>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <p className="mt-8 text-gray-500">
                    Extra note such as company or payment information...
                </p>
            </div>

 
        </div>
    );
};

export default Invoice;

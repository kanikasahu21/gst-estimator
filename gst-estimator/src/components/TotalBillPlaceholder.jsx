import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import jsPDF from "jspdf";
import "jspdf-autotable";
import backendURL from "@/config"; // ✅ Changed to alias

const TotalBillPlaceholder = ({ items = [] }) => {
  const [billData, setBillData] = useState({
    itemsWithGST: [],
    totalBeforeGST: 0,
    totalGST: 0,
    totalWithGST: 0,
  });

  // 🔹 Download PDF Function
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Title (Centered)
    doc.setFontSize(16);
    doc.text("Bill Summary", doc.internal.pageSize.getWidth() / 2, 15, { align: "center" });

    // Table data
    const tableData = billData.itemsWithGST.map(item => [
      item.name,
      item.quantity,
      `Rs. ${(parseFloat(item.price) * item.quantity).toFixed(2)}`,
      `GST @ ${item.gstRate}%`,
      `Rs. ${parseFloat(item.gstAmount).toFixed(2)}`
    ]);

    // AutoTable
    doc.autoTable({
      head: [["Item", "Qty", "Amt", "GST Rate", "GST Amt"]],
      body: tableData,
      startY: 25,
      theme: "grid",
      styles: { halign: "center", valign: "middle" },
      columnStyles: {
        0: { halign: "left" },
        1: { halign: "center" },
        2: { halign: "right" },
        3: { halign: "center" },
        4: { halign: "right" }
      },
      tableWidth: "auto",
      margin: { left: (doc.internal.pageSize.getWidth() - 170) / 2 },
    });

    // Totals
    let finalY = doc.lastAutoTable.finalY + 10;
    doc.setFontSize(12);
    const rightMargin = 14;
    doc.text(`Subtotal: Rs. ${billData.totalBeforeGST.toFixed(2)}`, doc.internal.pageSize.getWidth() - rightMargin, finalY, { align: "right" });
    doc.text(`Total GST: Rs. ${billData.totalGST.toFixed(2)}`, doc.internal.pageSize.getWidth() - rightMargin, finalY + 7, { align: "right" });
    doc.text(`Total: Rs. ${billData.totalWithGST.toFixed(2)}`, doc.internal.pageSize.getWidth() - rightMargin, finalY + 14, { align: "right" });

    doc.save("Bill_Summary.pdf");
  };

  useEffect(() => {
    if (items.length === 0) {
      setBillData({
        itemsWithGST: [],
        totalBeforeGST: 0,
        totalGST: 0,
        totalWithGST: 0,
      });
      return;
    }

    const fetchBill = async () => {
      try {
        const res = await fetch(`${backendURL}/calculate-gst`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items }),
        });

        const data = await res.json();
        if (data.items) {
          setBillData({
            itemsWithGST: data.items,
            totalBeforeGST: parseFloat(data.totalBeforeGST),
            totalGST: parseFloat(data.totalGST),
            totalWithGST: parseFloat(data.totalWithGST),
          });
        }
      } catch (err) {
        console.error("❌ Error fetching GST data:", err);
      }
    };

    fetchBill();
  }, [items]);

  return (
    <motion.section
      className="bg-white border border-blue-200 shadow-md rounded-2xl p-6 mx-4 my-4 sm:mx-8 sm:my-6 font-mono"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Header with Download Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-[#0F2B47]">BILL SUMMARY</h2>
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-blue-900 transition"
        >
          Download PDF
        </button>
      </div>

      {/* Table Header */}
      <div className="flex justify-between border-b border-gray-300 pb-1 font-semibold">
        <span className="w-1/2">Item</span>
        <span className="w-1/4 text-center">Qty</span>
        <span className="w-1/4 text-right">Amt</span>
      </div>

      {/* Items List */}
      {billData.itemsWithGST.map((item, idx) => (
        <div key={idx} className="mb-3">
          <div className="flex justify-between">
            <span className="w-1/2">{item.name}</span>
            <span className="w-1/4 text-center">{item.quantity}</span>
            <span className="w-1/4 text-right">
              Rs. {(parseFloat(item.price) * item.quantity).toFixed(2)}
            </span>
          </div>

          {/* GST Info */}
          <div className="text-xs text-gray-500 ml-2 mt-0.5">
            <div className="flex justify-between">
              <span>GST @ {item.gstRate}%</span>
              <span className="text-right">
                Rs. {parseFloat(item.gstAmount).toFixed(2)}
              </span>
            </div>
            <div className="italic text-gray-400">{item.reasoning}</div>
          </div>
        </div>
      ))}

      <hr className="my-3" />

      {/* Totals */}
      <div className="flex justify-between">
        <span>Subtotal</span>
        <span>Rs. {billData.totalBeforeGST.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Total GST</span>
        <span>Rs. {billData.totalGST.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-lg mt-2 text-blue-800">
        <span>Total</span>
        <span>Rs. {billData.totalWithGST.toFixed(2)}</span>
      </div>
    </motion.section>
  );
};

export default TotalBillPlaceholder;

'use client';

import { useState } from 'react';

export default function AIPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Kotak Chat AI (Hanya muncul jika isOpen = true) */}
      {isOpen && (
        <div className="mb-4 w-80 rounded-2xl border border-gray-200 bg-white p-4 shadow-2xl transition-all">
          <div className="mb-3 flex items-center justify-between border-b pb-2">
            <h3 className="font-bold text-gray-800">Asisten AI Jalur Rempah</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          
          <div className="h-60 overflow-y-auto rounded-lg bg-gray-50 p-3 text-sm text-gray-600">
            Halo! Ada yang bisa aku bantu seputar Jalur Rempah?
          </div>

          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="Tulis pertanyaan..."
              className="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button className="rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold text-white hover:bg-amber-700">
              Kirim
            </button>
          </div>
        </div>
      )}

      {/* Tombol Bulat Melayang di Bawah */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-600 text-2xl text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        💬
      </button>
    </div>
  );
}
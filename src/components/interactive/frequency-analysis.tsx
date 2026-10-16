'use client';

import React, { useState } from 'react';
import { BarChart3 } from 'lucide-react';

const ENGLISH_FREQ: Record<string, number> = {
  E: 12.7, T: 9.1, A: 8.2, O: 7.5, I: 7.0, N: 6.7, S: 6.3, H: 6.1, R: 6.0,
  D: 4.3, L: 4.0, C: 2.8, U: 2.8, M: 2.4, W: 2.4, F: 2.2, G: 2.0, Y: 2.0,
  P: 1.9, B: 1.5, V: 1.0, K: 0.8, J: 0.15, X: 0.15, Q: 0.1, Z: 0.07
};

export function FrequencyAnalysis() {
  const [ciphertext, setCiphertext] = useState<string>(
    'KHOOR ZRUOG WKLV LV D VDPSOH FLSKHUWHAW IRU IUHTXHQFB DQDOBVLV'
  );

  const calculateFrequencies = (text: string) => {
    const counts: Record<string, number> = {};
    let total = 0;
    const cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');

    for (const char of cleanText) {
      counts[char] = (counts[char] || 0) + 1;
      total++;
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    return alphabet.map((letter) => {
      const count = counts[letter] || 0;
      const percentage = total > 0 ? (count / total) * 100 : 0;
      return {
        letter,
        count,
        percentage,
        englishPercentage: ENGLISH_FREQ[letter] || 0,
      };
    });
  };

  const freqData = calculateFrequencies(ciphertext);
  const maxPerc = Math.max(...freqData.map((d) => Math.max(d.percentage, d.englishPercentage)), 15);

  return (
    <div className="my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-6">
        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Frequency Analysis Tool</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Compare letter frequencies in ciphertext against standard English letter frequencies
          </p>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
          Ciphertext Input
        </label>
        <textarea
          rows={3}
          value={ciphertext}
          onChange={(e) => setCiphertext(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          placeholder="Paste or type ciphertext..."
        />
      </div>

      <div className="flex items-center justify-end gap-4 text-xs mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-emerald-500 inline-block"></span>
          <span className="text-zinc-600 dark:text-zinc-400">Ciphertext Frequency (%)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-zinc-300 dark:bg-zinc-700 inline-block"></span>
          <span className="text-zinc-600 dark:text-zinc-400">Standard English Frequency (%)</span>
        </div>
      </div>

      {/* Histogram */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-flex items-end gap-1.5 h-48 pt-6 px-2 min-w-full">
          {freqData.map((d) => {
            const cipherHeight = (d.percentage / maxPerc) * 100;
            const englishHeight = (d.englishPercentage / maxPerc) * 100;

            return (
              <div key={d.letter} className="flex-1 flex flex-col items-center min-w-[22px] group relative h-full justify-end">
                {/* Tooltip */}
                <div className="absolute -top-10 hidden group-hover:flex flex-col items-center bg-zinc-900 text-white text-[10px] py-1 px-2 rounded shadow-lg z-10 whitespace-nowrap">
                  <span>Letter: {d.letter}</span>
                  <span>Text: {d.percentage.toFixed(1)}% ({d.count})</span>
                  <span>Eng: {d.englishPercentage.toFixed(1)}%</span>
                </div>

                <div className="w-full flex items-end justify-center gap-0.5 h-36 border-b border-zinc-200 dark:border-zinc-800 pb-1">
                  {/* Ciphertext bar */}
                  <div
                    style={{ height: `${cipherHeight}%` }}
                    className="w-2.5 bg-emerald-500 rounded-t transition-all duration-300"
                  />
                  {/* English bar */}
                  <div
                    style={{ height: `${englishHeight}%` }}
                    className="w-2.5 bg-zinc-300 dark:bg-zinc-700 rounded-t transition-all duration-300"
                  />
                </div>
                <span className="text-xs font-mono font-semibold text-zinc-800 dark:text-zinc-200 mt-1">
                  {d.letter}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

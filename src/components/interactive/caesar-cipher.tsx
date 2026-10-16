'use client';

import React, { useState } from 'react';
import { ArrowRightLeft, ShieldCheck } from 'lucide-react';

export function CaesarCipher() {
  const [text, setText] = useState<string>('CRYPTOGRAPHY');
  const [shift, setShift] = useState<number>(3);
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');

  const processText = (input: string, k: number, isEncode: boolean): string => {
    const effectiveShift = isEncode ? (k % 26 + 26) % 26 : (26 - (k % 26)) % 26;
    return input
      .split('')
      .map((char) => {
        const code = char.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return String.fromCharCode(((code - 65 + effectiveShift) % 26) + 65);
        } else if (code >= 97 && code <= 122) {
          return String.fromCharCode(((code - 97 + effectiveShift) % 26) + 97);
        }
        return char;
      })
      .join('');
  };

  const result = processText(text, shift, mode === 'encode');

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Interactive Caesar / Shift Cipher</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Additive substitution cipher modulo 26: $C \equiv (P + k) \bmod 26$</p>
          </div>
        </div>
        <button
          onClick={() => setMode(mode === 'encode' ? 'decode' : 'encode')}
          aria-label={`Toggle mode, currently ${mode === 'encode' ? 'Encrypting' : 'Decrypting'}`}
          className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
        >
          <ArrowRightLeft className="w-3.5 h-3.5" />
          {mode === 'encode' ? 'Encrypting' : 'Decrypting'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="caesar-input" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Input Text ({mode === 'encode' ? 'Plaintext' : 'Ciphertext'})
          </label>
          <input
            id="caesar-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            aria-label="Input text for Caesar cipher"
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Type plaintext or ciphertext..."
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="caesar-shift" className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Shift Key ($k = {shift}$)
            </label>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-mono">
              ROT-{shift}
            </span>
          </div>
          <input
            id="caesar-shift"
            type="range"
            min="0"
            max="25"
            value={shift}
            onChange={(e) => setShift(parseInt(e.target.value, 10))}
            aria-label={`Shift key slider, value ${shift}`}
            className="w-full accent-indigo-600 cursor-pointer"
          />
        </div>
      </div>

      {/* Output box */}
      <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 mb-6">
        <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1">
          {mode === 'encode' ? 'Ciphertext Output' : 'Plaintext Output'}
        </div>
        <div className="font-mono text-lg font-bold text-indigo-600 dark:text-indigo-400 break-all">
          {result || <span className="text-zinc-400 dark:text-zinc-600 font-normal italic">Enter text above...</span>}
        </div>
      </div>

      {/* Alphabet shift mapping preview */}
      <div>
        <div className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-2">
          Alphabet Shift Mapping ($k={shift}$)
        </div>
        <div className="overflow-x-auto pb-2">
          <div className="inline-flex gap-1">
            {alphabet.map((char, idx) => {
              const shiftedChar = processText(char, shift, true);
              return (
                <div key={idx} className="flex flex-col items-center bg-zinc-100 dark:bg-zinc-800/80 rounded px-1.5 py-1 min-w-[28px]">
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">{char}</span>
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">{shiftedChar}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

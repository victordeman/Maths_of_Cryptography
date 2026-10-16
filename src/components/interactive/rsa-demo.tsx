'use client';

import React, { useState } from 'react';
import { Key, Unlock, Lock, ShieldAlert } from 'lucide-react';
import { FormattedText } from '@/components/course/formatted-text';

export function RSADemo() {
  const [p, setP] = useState<number>(61);
  const [q, setQ] = useState<number>(53);
  const [e, setE] = useState<number>(17);
  const [msg, setMsg] = useState<number>(42);

  // Helper for gcd
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

  // Helper for modInverse
  const modInverse = (a: number, m: number): number | null => {
    let t = 0, newt = 1;
    let r = m, newr = ((a % m) + m) % m;
    while (newr !== 0) {
      const quotient = Math.floor(r / newr);
      [t, newt] = [newt, t - quotient * newt];
      [r, newr] = [newr, r % newr];
    }
    if (r > 1) return null;
    if (t < 0) t = t + m;
    return t;
  };

  // Helper for modPow
  const modPow = (base: number, exp: number, modulus: number): number => {
    let result = 1;
    let b = base % modulus;
    let ev = exp;
    while (ev > 0) {
      if (ev % 2 === 1) result = (result * b) % modulus;
      ev = Math.floor(ev / 2);
      b = (b * b) % modulus;
    }
    return result;
  };

  const n = p * q;
  const phi = (p - 1) * (q - 1);
  const isValidE = gcd(e, phi) === 1 && e > 1 && e < phi;
  const d = isValidE ? modInverse(e, phi) : null;

  const validMsg = msg >= 0 && msg < n;
  const ciphertext = (isValidE && d !== null && validMsg) ? modPow(msg, e, n) : null;
  const decrypted = (ciphertext !== null && d !== null) ? modPow(ciphertext, d, n) : null;

  return (
    <div className="my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-6">
        <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400">
          <Key className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">RSA Key Generation & Encryption Demo</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            <FormattedText text="Public key $(e, n)$, Private key $(d, n)$. Encryption: $c = m^e \bmod n$, Decryption: $m = c^d \bmod n$" />
          </p>
        </div>
      </div>

      {/* Inputs for p, q, e */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            <FormattedText text="Prime $p$" />
          </label>
          <input
            type="number"
            min="2"
            value={p}
            onChange={(e) => setP(parseInt(e.target.value) || 2)}
            className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            <FormattedText text="Prime $q$" />
          </label>
          <input
            type="number"
            min="2"
            value={q}
            onChange={(e) => setQ(parseInt(e.target.value) || 2)}
            className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            <FormattedText text="Public Exponent $e$" />
          </label>
          <input
            type="number"
            min="2"
            value={e}
            onChange={(e) => setE(parseInt(e.target.value) || 2)}
            className={`w-full px-3 py-1.5 rounded-lg border text-zinc-900 dark:text-zinc-100 font-mono text-sm ${
              isValidE
                ? 'border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950'
                : 'border-red-500 bg-red-50 dark:bg-red-950/30'
            }`}
          />
        </div>
      </div>

      {/* Key Setup Overview */}
      <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 mb-6 text-xs space-y-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div>
            <span className="text-zinc-500 dark:text-zinc-400 block"><FormattedText text="Modulus $n = p \times q$:" /></span>
            <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-sm">{n}</span>
          </div>
          <div>
            <span className="text-zinc-500 dark:text-zinc-400 block"><FormattedText text="Euler Totient $\phi(n)$:" /></span>
            <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100 text-sm">{phi}</span>
          </div>
          <div>
            <span className="text-zinc-500 dark:text-zinc-400 block"><FormattedText text="Public Key $(e, n)$:" /></span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400 text-sm">({e}, {n})</span>
          </div>
          <div>
            <span className="text-zinc-500 dark:text-zinc-400 block"><FormattedText text="Private Key $(d, n)$:" /></span>
            <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-sm">
              {d !== null ? `(${d}, ${n})` : 'Invalid e'}
            </span>
          </div>
        </div>

        {!isValidE && (
          <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 pt-1">
            <ShieldAlert className="w-4 h-4" />
            <span><FormattedText text="Invalid $e$: $\gcd(e, \phi(n))$ must equal 1." /></span>
          </div>
        )}
      </div>

      {/* Encrypt / Decrypt Test */}
      <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4">
        <h4 className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
          Message Encryption & Decryption Test
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div>
            <label className="block font-sans font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              <FormattedText text={`Message integer $m$ ($0 \\le m < ${n}$)`} />
            </label>
            <input
              type="number"
              min="0"
              max={n - 1}
              value={msg}
              onChange={(e) => setMsg(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 text-sm"
            />
          </div>

          <div className="p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-lg">
            <div className="text-amber-800 dark:text-amber-300 font-sans flex items-center gap-1 font-semibold mb-1">
              <Lock className="w-3.5 h-3.5" /> <FormattedText text="Ciphertext ($c = m^e \bmod n$)" />
            </div>
            <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
              {ciphertext !== null ? ciphertext : 'N/A'}
            </div>
          </div>

          <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 rounded-lg">
            <div className="text-indigo-800 dark:text-indigo-300 font-sans flex items-center gap-1 font-semibold mb-1">
              <Unlock className="w-3.5 h-3.5" /> <FormattedText text="Decrypted ($m = c^d \bmod n$)" />
            </div>
            <div className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              {decrypted !== null ? decrypted : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

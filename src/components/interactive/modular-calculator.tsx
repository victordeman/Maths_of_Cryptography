'use client';

import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { FormattedText } from '@/components/course/formatted-text';

export function ModularCalculator() {
  const [a, setA] = useState<number>(17);
  const [b, setB] = useState<number>(5);
  const [m, setM] = useState<number>(13);

  // Helper for fast modular exponentiation
  const modPow = (base: number, exp: number, modulus: number): number => {
    if (modulus === 1) return 0;
    let result = 1;
    let b = ((base % modulus) + modulus) % modulus;
    let e = exp;
    while (e > 0) {
      if (e % 2 === 1) result = (result * b) % modulus;
      e = Math.floor(e / 2);
      b = (b * b) % modulus;
    }
    return result;
  };

  // Helper for extended Euclidean algorithm for modular inverse
  const modInverse = (a: number, m: number): { inv: number | null; gcd: number; steps: string[] } => {
    let t = 0, newt = 1;
    let r = m, newr = ((a % m) + m) % m;
    const steps: string[] = [];

    while (newr !== 0) {
      const quotient = Math.floor(r / newr);
      steps.push(`${r} = ${quotient} × ${newr} + ${r % newr}`);
      [t, newt] = [newt, t - quotient * newt];
      [r, newr] = [newr, r % newr];
    }

    if (r > 1) {
      return { inv: null, gcd: r, steps };
    }
    if (t < 0) t = t + m;
    return { inv: t, gcd: 1, steps };
  };

  const addRes = m > 0 ? ((a + b) % m + m) % m : null;
  const mulRes = m > 0 ? ((a * b) % m + m) % m : null;
  const expRes = m > 0 && b >= 0 ? modPow(a, b, m) : null;
  const invRes = m > 0 ? modInverse(a, m) : { inv: null, gcd: 0, steps: [] };

  return (
    <div className="my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-6">
        <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Modular Arithmetic Calculator</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            <FormattedText text="Calculate addition, multiplication, exponentiation, and modular inverse in $\mathbb{Z}_m$" />
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Value $a$
          </label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Value $b$ / Exponent
          </label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Modulus $m$
          </label>
          <input
            type="number"
            min="1"
            value={m}
            onChange={(e) => setM(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Grid of Results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 font-mono">
            ({a} + {b}) mod {m}
          </div>
          <div className="text-xl font-mono font-bold text-purple-600 dark:text-purple-400">
            {addRes}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 font-mono">
            ({a} × {b}) mod {m}
          </div>
          <div className="text-xl font-mono font-bold text-purple-600 dark:text-purple-400">
            {mulRes}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 font-mono">
            {a}<sup>{b}</sup> mod {m}
          </div>
          <div className="text-xl font-mono font-bold text-purple-600 dark:text-purple-400">
            {expRes}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 font-mono">
            {a}<sup>-1</sup> mod {m} (Modular Inverse)
          </div>
          <div className="text-xl font-mono font-bold text-purple-600 dark:text-purple-400">
            {invRes.inv !== null ? invRes.inv : <span className="text-amber-500 text-sm font-normal">No inverse (gcd({a}, {m}) = {invRes.gcd})</span>}
          </div>
        </div>
      </div>

      {/* Euclidean Trace */}
      {invRes.steps.length > 0 && (
        <div className="p-3 rounded-lg bg-purple-50/50 dark:bg-purple-950/20 border border-purple-100 dark:border-purple-900/40">
          <div className="text-xs font-semibold text-purple-900 dark:text-purple-300 mb-1">
            Euclidean Algorithm Steps:
          </div>
          <div className="font-mono text-xs text-purple-700 dark:text-purple-400 space-y-0.5">
            {invRes.steps.map((step, i) => (
              <div key={i}>{step}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

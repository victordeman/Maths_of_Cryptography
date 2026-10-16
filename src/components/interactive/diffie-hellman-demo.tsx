'use client';

import React, { useState } from 'react';
import { KeyRound, Lock, UserCheck } from 'lucide-react';
import { FormattedText } from '@/components/course/formatted-text';

export function DiffieHellmanDemo() {
  const [p, setP] = useState<number>(23); // prime modulus
  const [g, setG] = useState<number>(5);  // generator
  const [aSecret, setASecret] = useState<number>(6); // Alice private
  const [bSecret, setBSecret] = useState<number>(15); // Bob private

  // Helper for modular exponentiation
  const modPow = (base: number, exp: number, modulus: number): number => {
    let result = 1;
    let b = base % modulus;
    let e = exp;
    while (e > 0) {
      if (e % 2 === 1) result = (result * b) % modulus;
      e = Math.floor(e / 2);
      b = (b * b) % modulus;
    }
    return result;
  };

  const alicePublic = modPow(g, aSecret, p); // A = g^a mod p
  const bobPublic = modPow(g, bSecret, p);   // B = g^b mod p

  const aliceShared = modPow(bobPublic, aSecret, p); // S = B^a mod p
  const bobShared = modPow(alicePublic, bSecret, p);   // S = A^b mod p

  return (
    <div className="my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-6">
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400">
          <KeyRound className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Diffie-Hellman Key Exchange Visualization</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            <FormattedText text="Establish a shared secret over an insecure channel: $S = g^{ab} \bmod p$" />
          </p>
        </div>
      </div>

      {/* Public Parameters */}
      <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 mb-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-3">
          1. Public Domain Parameters (Shared Openly)
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              <FormattedText text="Prime Modulus ($p$)" />
            </label>
            <input
              type="number"
              min="3"
              value={p}
              onChange={(e) => setP(Math.max(3, parseInt(e.target.value) || 3))}
              className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              <FormattedText text="Generator ($g$)" />
            </label>
            <input
              type="number"
              min="2"
              value={g}
              onChange={(e) => setG(Math.max(2, parseInt(e.target.value) || 2))}
              className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Alice and Bob Exchange */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Alice */}
        <div className="p-4 rounded-lg border border-blue-200 dark:border-blue-900/50 bg-blue-50/30 dark:bg-blue-950/20">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-blue-900 dark:text-blue-200 flex items-center gap-1.5 text-sm">
              <UserCheck className="w-4 h-4" /> Alice
            </span>
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-mono">
              <FormattedText text={`Private $a = ${aSecret}$`} />
            </span>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              <FormattedText text="Alice's Secret Key ($a$)" />
            </label>
            <input
              type="number"
              min="1"
              value={aSecret}
              onChange={(e) => setASecret(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-mono text-sm"
            />
          </div>

          <div className="p-3 bg-white dark:bg-zinc-900 rounded border border-blue-100 dark:border-blue-900/40 text-xs space-y-1">
            <div className="text-zinc-500 dark:text-zinc-400"><FormattedText text="Computes Public Key $A$:" /></div>
            <div className="font-mono font-semibold text-blue-600 dark:text-blue-400">
              <FormattedText text={`$A = ${g}^{${aSecret}} \\bmod ${p} = ${alicePublic}$`} />
            </div>
          </div>
        </div>

        {/* Bob */}
        <div className="p-4 rounded-lg border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5 text-sm">
              <UserCheck className="w-4 h-4" /> Bob
            </span>
            <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-mono">
              <FormattedText text={`Private $b = ${bSecret}$`} />
            </span>
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              <FormattedText text="Bob's Secret Key ($b$)" />
            </label>
            <input
              type="number"
              min="1"
              value={bSecret}
              onChange={(e) => setBSecret(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-mono text-sm"
            />
          </div>

          <div className="p-3 bg-white dark:bg-zinc-900 rounded border border-emerald-100 dark:border-emerald-900/40 text-xs space-y-1">
            <div className="text-zinc-500 dark:text-zinc-400"><FormattedText text="Computes Public Key $B$:" /></div>
            <div className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
              <FormattedText text={`$B = ${g}^{${bSecret}} \\bmod ${p} = ${bobPublic}$`} />
            </div>
          </div>
        </div>
      </div>

      {/* Shared Secret Result */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-950/40 dark:to-emerald-950/40 border border-blue-200 dark:border-blue-900/60">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" /> <FormattedText text="Established Shared Secret ($S$)" />
          </h4>
          <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
            Equal on both sides!
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 bg-white dark:bg-zinc-900 rounded border border-blue-200 dark:border-blue-900">
            <span className="text-zinc-500 dark:text-zinc-400 block text-[10px] font-sans"><FormattedText text="Alice computes $S = B^a \bmod p$:" /></span>
            <span className="text-base font-bold text-blue-600 dark:text-blue-400">
              {bobPublic}<sup>{aSecret}</sup> mod {p} = {aliceShared}
            </span>
          </div>

          <div className="p-3 bg-white dark:bg-zinc-900 rounded border border-emerald-200 dark:border-emerald-900">
            <span className="text-zinc-500 dark:text-zinc-400 block text-[10px] font-sans"><FormattedText text="Bob computes $S = A^b \bmod p$:" /></span>
            <span className="text-base font-bold text-emerald-600 dark:text-emerald-400">
              {alicePublic}<sup>{bSecret}</sup> mod {p} = {bobShared}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

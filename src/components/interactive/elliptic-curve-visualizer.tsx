'use client';

import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { FormattedText } from '@/components/course/formatted-text';

export function EllipticCurveVisualizer() {
  const [a, setA] = useState<number>(-3);
  const [b, setB] = useState<number>(5);
  const [px, setPx] = useState<number>(1);
  const [qx, setQx] = useState<number>(2);

  // Compute y coordinate for given x on y^2 = x^3 + ax + b
  const getPointY = (xVal: number): number | null => {
    const rhs = Math.pow(xVal, 3) + a * xVal + b;
    if (rhs < 0) return null;
    return Math.sqrt(rhs);
  };

  const py = getPointY(px);
  const qy = getPointY(qx);

  // Point Addition logic P + Q over R
  const computeAddition = () => {
    if (py === null || qy === null) return null;

    if (px === qx) {
      if (Math.abs(py + qy) < 0.0001) {
        return { rx: null, ry: null, lambda: Infinity, type: 'Point at Infinity' };
      }
      // Point Doubling
      const lambda = (3 * Math.pow(px, 2) + a) / (2 * py);
      const rx = Math.pow(lambda, 2) - 2 * px;
      const ry = -(py + lambda * (rx - px));
      return { rx, ry, lambda, type: 'Point Doubling (2P)' };
    } else {
      // Point Addition
      const lambda = (qy - py) / (qx - px);
      const rx = Math.pow(lambda, 2) - px - qx;
      const ry = -(py + lambda * (rx - px));
      return { rx, ry, lambda, type: 'Point Addition (P + Q)' };
    }
  };

  const addResult = computeAddition();

  return (
    <div className="my-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <div className="flex items-center gap-2 pb-4 border-b border-zinc-100 dark:border-zinc-800 mb-6">
        <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/50 text-teal-600 dark:text-teal-400">
          <Activity className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">Elliptic Curve Point Group Law Visualizer</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            <FormattedText text={`Short Weierstrass equation $y^2 = x^3 + ${a}x + ${b}$ over $\\mathbb{R}$`} />
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Parameter $a$
          </label>
          <input
            type="number"
            value={a}
            onChange={(e) => setA(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-mono text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Parameter $b$
          </label>
          <input
            type="number"
            value={b}
            onChange={(e) => setB(parseInt(e.target.value) || 0)}
            className="w-full px-3 py-1.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-mono text-sm"
          />
        </div>
      </div>

      {/* Point Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-3 rounded-lg border border-teal-200 dark:border-teal-900/50 bg-teal-50/20 dark:bg-teal-950/20">
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Point $P$ ($x_1 = {px}$)
          </label>
          <input
            type="range"
            min="-3"
            max="4"
            step="0.5"
            value={px}
            onChange={(e) => setPx(parseFloat(e.target.value))}
            className="w-full accent-teal-600 cursor-pointer mb-2"
          />
          <div className="font-mono text-xs text-teal-700 dark:text-teal-300">
            {py !== null ? `P = (${px.toFixed(2)}, ${py.toFixed(2)})` : 'No real y value for x1'}
          </div>
        </div>

        <div className="p-3 rounded-lg border border-indigo-200 dark:border-indigo-900/50 bg-indigo-50/20 dark:bg-indigo-950/20">
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">
            Point $Q$ ($x_2 = {qx}$)
          </label>
          <input
            type="range"
            min="-3"
            max="4"
            step="0.5"
            value={qx}
            onChange={(e) => setQx(parseFloat(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer mb-2"
          />
          <div className="font-mono text-xs text-indigo-700 dark:text-indigo-300">
            {qy !== null ? `Q = (${qx.toFixed(2)}, ${qy.toFixed(2)})` : 'No real y value for x2'}
          </div>
        </div>
      </div>

      {/* Addition Result */}
      <div className="p-4 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-mono text-xs space-y-2">
        <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-2 font-sans">
          <span className="font-semibold text-zinc-800 dark:text-zinc-200">Point Addition Algebra Result</span>
          <span className="text-[11px] bg-teal-100 dark:bg-teal-900/50 text-teal-800 dark:text-teal-300 px-2 py-0.5 rounded">
            {addResult?.type || 'Undefined'}
          </span>
        </div>

        {addResult && addResult.rx !== null && addResult.ry !== null ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-zinc-500 dark:text-zinc-400 block"><FormattedText text="Slope $\lambda$:" /></span>
              <span className="text-sm font-bold text-teal-600 dark:text-teal-400">
                {addResult.lambda.toFixed(4)}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 dark:text-zinc-400 block"><FormattedText text="Resulting Point $R = P + Q$:" /></span>
              <span className="text-sm font-bold text-teal-600 dark:text-teal-400">
                ({addResult.rx.toFixed(3)}, {addResult.ry.toFixed(3)})
              </span>
            </div>
          </div>
        ) : (
          <div className="text-amber-600 dark:text-amber-400">
            <FormattedText text="Result is the Point at Infinity ($\mathcal{O}$)." />
          </div>
        )}
      </div>
    </div>
  );
}

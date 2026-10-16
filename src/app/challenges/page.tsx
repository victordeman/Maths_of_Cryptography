"use client"

import React, { useState } from "react"
import { PageHeader, FormattedText } from "@/components/course"
import { useCourseProgress } from "@/lib/progress"
import { KeyRound, ShieldCheck, HelpCircle, CheckCircle2, Lock, Award, ArrowRight } from "lucide-react"

interface Challenge {
  id: string
  title: string
  level: "Beginner" | "Intermediate" | "Advanced"
  topic: string
  prompt: string
  ciphertextOrGiven: string
  hint: string
  expectedAnswer: string
  solutionExplanation: string
}

const CHALLENGES: Challenge[] = [
  {
    id: "ch1",
    title: "Challenge 1: Decrypt the Caesar Shift",
    level: "Beginner",
    topic: "Classical Cryptography",
    prompt: "An intercepted encrypted message reads below. Decrypt the message using frequency or brute-force shift analysis.",
    ciphertextOrGiven: "KHOOR ZRUOG",
    hint: "Try shift $k = 3$. Reverse shift each letter by subtracting 3 positions in the alphabet.",
    expectedAnswer: "HELLO WORLD",
    solutionExplanation: "Shifting each letter backward by 3 positions ($K \\to H, H \\to E, O \\to L, R \\to O, Z \\to W, U \\to R, G \\to D$) reveals 'HELLO WORLD'.",
  },
  {
    id: "ch2",
    title: "Challenge 2: Modular Inverse Extraction",
    level: "Intermediate",
    topic: "Number Theory",
    prompt: "Compute the multiplicative inverse $x = 17^{-1} \\bmod 31$, i.e., the unique integer $x \\in [1, 30]$ satisfying $17x \\equiv 1 \\pmod{31}$.",
    ciphertextOrGiven: "17 * x ≡ 1 (mod 31)",
    hint: "Use the Extended Euclidean Algorithm on $(31, 17)$: $31 = 1(17) + 14 \\implies 17 = 1(14) + 3 \\implies 14 = 4(3) + 2 \\implies 3 = 1(2) + 1$.",
    expectedAnswer: "11",
    solutionExplanation: "$17 \\times 11 = 187 = 6 \\times 31 + 1 \\equiv 1 \\pmod{31}$. Thus $x = 11$.",
  },
  {
    id: "ch3",
    title: "Challenge 3: RSA Modulus & Totient Break",
    level: "Intermediate",
    topic: "Public-Key Infrastructure",
    prompt: "An adversary uses public key $(e = 7, n = 143)$. Factor $n$ to determine $(p, q)$, compute $\\phi(n)$, and find private exponent $d = e^{-1} \\bmod \\phi(n)$.",
    ciphertextOrGiven: "n = 143, e = 7",
    hint: "$143 = 11 \\times 13$. $\\phi(143) = (11-1)(13-1) = 120$. Find $7^{-1} \\bmod 120$.",
    expectedAnswer: "103",
    solutionExplanation: "$p = 11, q = 13 \\implies \\phi(143) = 120$. $7 \\times 103 = 721 = 6 \\times 120 + 1 \\equiv 1 \\pmod{120}$. So $d = 103$.",
  },
  {
    id: "ch4",
    title: "Challenge 4: Diffie-Hellman Key Intercept",
    level: "Advanced",
    topic: "Key Exchange Protocols",
    prompt: "Public parameters are $p = 23, g = 5$. Alice sends $A = 8$, Bob sends $B = 19$. Eve discovers Alice's secret key is $a = 6$. What is the shared secret $S$?",
    ciphertextOrGiven: "p = 23, g = 5, A = 8, B = 19, a = 6",
    hint: "Eve calculates shared secret $S = B^a \\bmod p = 19^6 \\bmod 23$.",
    expectedAnswer: "2",
    solutionExplanation: "$S = 19^6 \\bmod 23$. $19 \\equiv -4 \\pmod{23}$, so $(-4)^6 = 4096 \\equiv 2 \\pmod{23}$.",
  },
]

export default function ChallengesPage() {
  const { progress, recordChallengeSolved } = useCourseProgress()
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showHints, setShowHints] = useState<Record<string, boolean>>({})
  const [feedback, setFeedback] = useState<Record<string, { success: boolean; msg: string }>>({})

  const handleInputChange = (id: string, val: string) => {
    setAnswers((prev) => ({ ...prev, [id]: val }))
  }

  const toggleHint = (id: string) => {
    setShowHints((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleVerify = (ch: Challenge) => {
    const userVal = (answers[ch.id] || "").trim().toUpperCase()
    const expected = ch.expectedAnswer.trim().toUpperCase()

    if (userVal === expected) {
      setFeedback((prev) => ({
        ...prev,
        [ch.id]: { success: true, msg: "Correct! Challenge solved." },
      }))
      recordChallengeSolved(ch.id)
    } else {
      setFeedback((prev) => ({
        ...prev,
        [ch.id]: { success: false, msg: "Incorrect solution. Review the hints and try again." },
      }))
    }
  }

  const solvedCount = progress.solvedChallenges.length
  const totalCount = CHALLENGES.length

  return (
    <main className="container max-w-5xl mx-auto px-4 py-8 space-y-8">
      <PageHeader
        title="Final Cryptography Challenges"
        description="Put your mathematical and cryptographic skills to the test with multi-stage cipher-solving exercises."
      />

      {/* Progress Summary Card */}
      <div className="bg-gradient-to-r from-blue-900/10 via-indigo-900/10 to-purple-900/10 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 p-6 rounded-xl border border-blue-200 dark:border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-bold text-lg text-zinc-900 dark:text-zinc-100">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Challenge Progress</span>
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            Solve all progressive exercises to demonstrate mastery of course primitives.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm shrink-0">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <span className="font-mono text-sm font-semibold">
            {solvedCount} / {totalCount} Solved
          </span>
        </div>
      </div>

      {/* Challenge List */}
      <div className="space-y-6">
        {CHALLENGES.map((ch, idx) => {
          const isSolved = progress.solvedChallenges.includes(ch.id)
          const fb = feedback[ch.id]

          return (
            <div
              key={ch.id}
              className={`p-6 rounded-xl border transition-all ${
                isSolved
                  ? "border-emerald-300 dark:border-emerald-900/60 bg-emerald-50/20 dark:bg-emerald-950/10"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-mono text-sm font-bold">
                    {idx + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                      {ch.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                      <span>{ch.topic}</span>
                      <span>•</span>
                      <span className="font-medium text-blue-600 dark:text-blue-400">{ch.level}</span>
                    </div>
                  </div>
                </div>

                {isSolved && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-3 py-1 rounded-full w-fit">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                  </span>
                )}
              </div>

              <div className="space-y-3 mb-6 text-sm text-zinc-700 dark:text-zinc-300">
                <FormattedText text={ch.prompt} as="span" />

                <div className="bg-zinc-100 dark:bg-zinc-950 p-3 rounded-lg font-mono text-xs text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <span>Given / Ciphertext: <strong>{ch.ciphertextOrGiven}</strong></span>
                  <Lock className="w-4 h-4 text-zinc-400 shrink-0" />
                </div>
              </div>

              {/* Input section */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    type="text"
                    value={answers[ch.id] || ""}
                    onChange={(e) => handleInputChange(ch.id, e.target.value)}
                    placeholder="Enter decrypted string or calculated integer..."
                    className="flex-1 px-3 py-2 text-sm font-mono rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleVerify(ch)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm shrink-0"
                  >
                    <span>Check Solution</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleHint(ch.id)}
                    className="px-3 py-2 border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs rounded-lg transition-colors flex items-center justify-center gap-1 shrink-0"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    {showHints[ch.id] ? "Hide Hint" : "Hint"}
                  </button>
                </div>

                {showHints[ch.id] && (
                  <div className="text-xs bg-amber-50 dark:bg-amber-950/40 p-3 rounded-lg border border-amber-200 dark:border-amber-900/50 text-amber-900 dark:text-amber-200">
                    <strong>Hint:</strong> <FormattedText text={ch.hint} as="span" />
                  </div>
                )}

                {fb && (
                  <div
                    className={`text-xs p-3 rounded-lg border flex items-center gap-2 ${
                      fb.success
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200 font-medium"
                        : "bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-900 text-red-900 dark:text-red-200"
                    }`}
                  >
                    {fb.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <KeyRound className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                    )}
                    <span>{fb.msg}</span>
                  </div>
                )}

                {isSolved && (
                  <div className="text-xs bg-zinc-100 dark:bg-zinc-800/60 p-3 rounded-lg border-l-2 border-emerald-500 text-zinc-700 dark:text-zinc-300 space-y-1 mt-2">
                    <strong className="block text-zinc-900 dark:text-zinc-100">
                      Solution Breakdown:
                    </strong>
                    <FormattedText text={ch.solutionExplanation} as="span" />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}

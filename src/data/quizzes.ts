export interface QuizOption {
  id: string
  label: string
  isCorrect: boolean
  explanation: string
}

export interface Question {
  id: string
  type: "multiple-choice" | "numeric"
  prompt: string
  options?: QuizOption[]
  correctAnswer?: number | string // For numeric / exact input
  explanation: string
  hint?: string
}

export interface Quiz {
  lessonSlug: string
  title: string
  description: string
  questions: Question[]
}

export const QUIZZES: Record<string, Quiz> = {
  "divisibility-euclidean-algorithm": {
    lessonSlug: "divisibility-euclidean-algorithm",
    title: "Check Your Understanding: Euclidean Algorithm",
    description: "Test your knowledge on divisibility properties, greatest common divisors, and Bézout's identity.",
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        prompt: "What is the Greatest Common Divisor $\\gcd(252, 105)$?",
        options: [
          { id: "a", label: "7", isCorrect: false, explanation: "7 divides both, but it is not the greatest." },
          { id: "b", label: "21", isCorrect: true, explanation: "Correct! $252 = 2 \\times 105 + 42$, $105 = 2 \\times 42 + 21$, $42 = 2 \\times 21 + 0$. So $\\gcd = 21$." },
          { id: "c", label: "42", isCorrect: false, explanation: "42 does not divide 105." },
          { id: "d", label: "105", isCorrect: false, explanation: "105 does not divide 252." },
        ],
        explanation: "Using the Euclidean algorithm: $252 = 2(105) + 42 \\implies 105 = 2(42) + 21 \\implies 42 = 2(21) + 0$. Thus $\\gcd(252, 105) = 21$.",
      },
      {
        id: "q2",
        type: "numeric",
        prompt: "For $\\gcd(35, 15) = 5$, find the integer coefficient $x$ in Bézout's identity $35x + 15y = 5$ where $x$ is the smallest non-negative integer.",
        correctAnswer: "1",
        explanation: "$35(1) + 15(-2) = 35 - 30 = 5$. Thus $x = 1$.",
        hint: "Run $35 \\bmod 15$: $35 = 2(15) + 5 \\implies 5 = 1(35) - 2(15)$.",
      },
    ],
  },
  "modular-arithmetic-congruences": {
    lessonSlug: "modular-arithmetic-congruences",
    title: "Check Your Understanding: Modular Congruences",
    description: "Assess your understanding of congruence classes and modular inverse computation.",
    questions: [
      {
        id: "q1",
        type: "numeric",
        prompt: "Compute $7^{-1} \\bmod 11$, i.e., find the modular inverse of 7 modulo 11 in range $[0, 10]$.",
        correctAnswer: "8",
        explanation: "$7 \\times 8 = 56 = 5 \\times 11 + 1 \\equiv 1 \\pmod{11}$. So $7^{-1} \\bmod 11 = 8$.",
        hint: "Test $7x \\equiv 1 \\pmod{11}$ for $x \\in \\{1, 2, \\dots, 10\\}$.",
      },
      {
        id: "q2",
        type: "multiple-choice",
        prompt: "When does a modular inverse $a^{-1} \\pmod m$ exist?",
        options: [
          { id: "a", label: "Always for any non-zero $a$", isCorrect: false, explanation: "Incorrect; e.g., $2^{-1} \\pmod 4$ does not exist." },
          { id: "b", label: "If and only if $\\gcd(a, m) = 1$", isCorrect: true, explanation: "Correct! $a$ and $m$ must be coprime for $ax \\equiv 1 \\pmod m$ to have a solution." },
          { id: "c", label: "Only if $m$ is even", isCorrect: false, explanation: "Modulus parity is irrelevant." },
          { id: "d", label: "If $a > m$", isCorrect: false, explanation: "Value relative size does not dictate invertibility." },
        ],
        explanation: "By Bézout's identity, $ax + my = 1$ has integer solutions if and only if $\\gcd(a, m) = 1$.",
      },
    ],
  },
  "rsa-cryptosystem": {
    lessonSlug: "rsa-cryptosystem",
    title: "Check Your Understanding: RSA Principles",
    description: "Verify key calculation, totient function usage, and RSA encryption exponent relations.",
    questions: [
      {
        id: "q1",
        type: "numeric",
        prompt: "Given primes $p = 61$ and $q = 53$, calculate Euler's totient $\\phi(n)$ where $n = p \\times q$.",
        correctAnswer: "3120",
        explanation: "$\\phi(n) = (p-1)(q-1) = (60)(52) = 3120$.",
      },
      {
        id: "q2",
        type: "multiple-choice",
        prompt: "Which equation guarantees RSA decryption $m^{ed} \\equiv m \\pmod n$?",
        options: [
          { id: "a", label: "$ed \\equiv 1 \\pmod{\\phi(n)}$", isCorrect: true, explanation: "Correct! By Euler's Totient Theorem, $m^{\\phi(n)} \\equiv 1 \\pmod n$, so $m^{ed} = m^{k\\phi(n) + 1} \\equiv m \\pmod n$." },
          { id: "b", label: "$e + d = n$", isCorrect: false, explanation: "Sum of exponents is not related." },
          { id: "c", label: "$e \\times d = n$", isCorrect: false, explanation: "$ed$ must be congruent to 1 modulo $\\phi(n)$." },
          { id: "d", label: "$e^d \\equiv 1 \\pmod n$", isCorrect: false, explanation: "This is incorrect." },
        ],
        explanation: "By design, $d$ is chosen as $e^{-1} \\pmod{\\phi(n)}$, meaning $ed \\equiv 1 \\pmod{\\phi(n)}$.",
      },
    ],
  },
  "diffie-hellman-key-exchange": {
    lessonSlug: "diffie-hellman-key-exchange",
    title: "Check Your Understanding: Diffie-Hellman",
    description: "Test your calculation of shared secrets and understanding of discrete logarithms.",
    questions: [
      {
        id: "q1",
        type: "numeric",
        prompt: "Let $p = 23$, $g = 5$, Alice's secret $a = 6$, and Bob's public key $B = 19$. Compute Alice's derived shared secret $S = B^a \\bmod p$.",
        correctAnswer: "2",
        explanation: "$S = 19^6 \\bmod 23$. $19 \\equiv -4 \\pmod{23}$, so $19^6 \\equiv (-4)^6 = 4096 \\pmod{23}$. $4096 = 178 \\times 23 + 2 \\equiv 2 \\pmod{23}$.",
        hint: "Use modular exponentiation: $19^2 = 361 \\equiv 16 \\pmod{23}$. $16^3 = 4096 \\equiv 2 \\pmod{23}$.",
      },
    ],
  },
}

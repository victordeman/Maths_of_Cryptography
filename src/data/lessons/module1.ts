import { DetailedLessonContent } from "./types"

export const module1Lessons: Record<string, DetailedLessonContent> = {
  "divisibility-euclidean-algorithm": {
    slug: "divisibility-euclidean-algorithm",
    sections: [
      {
        id: "overview",
        title: "Overview & Division Algorithm",
        content: "Divisibility is the foundational concept of number theory. An integer $a$ divides an integer $b$ (written $a \\mid b$) if there exists an integer $c$ such that $b = a \\cdot c$. The Division Algorithm states that for any integers $a$ and $b > 0$, there exist unique integers $q$ (quotient) and $r$ (remainder) such that $a = b \\cdot q + r$ with $0 \\le r < b$.",
        callout: {
          type: "definition",
          title: "Greatest Common Divisor (GCD)",
          content: "The greatest common divisor of two integers $a$ and $b$, denoted $\\gcd(a, b)$, is the largest positive integer $d$ that divides both $a$ and $b$. If $\\gcd(a, b) = 1$, then $a$ and $b$ are coprime (relatively prime)."
        }
      },
      {
        id: "euclidean-algorithm",
        title: "The Euclidean Algorithm",
        content: "The Euclidean Algorithm computes $\\gcd(a, b)$ efficiently using repeated division based on the identity $\\gcd(a, b) = \\gcd(b, a \\pmod b)$. Instead of factoring $a$ and $b$, which is computationally hard for large numbers, the Euclidean algorithm terminates in logarithmic time $O(\\log(\\min(a, b)))$ according to Lamé's Theorem.",
        callout: {
          type: "theorem",
          title: "Bézout's Identity",
          content: "For any non-zero integers $a$ and $b$, there exist integers $x$ and $y$ such that $a \\cdot x + b \\cdot y = \\gcd(a, b)$. The coefficients $x$ and $y$ are called Bézout coefficients."
        },
        codeExample: {
          language: "python",
          title: "Extended Euclidean Algorithm in Python",
          code: `def extended_gcd(a: int, b: int):
    """Returns (gcd, x, y) such that a*x + b*y = gcd(a, b)."""
    if b == 0:
        return a, 1, 0
    gcd, x1, y1 = extended_gcd(b, a % b)
    x = y1
    y = x1 - (a // b) * y1
    return gcd, x, y

# Example: Compute modular inverse of 17 modulo 3120
gcd, x, y = extended_gcd(17, 3120)
inv = x % 3120 if gcd == 1 else None
print(f"gcd(17, 3120) = {gcd}, Inverse = {inv}")`
        }
      },
      {
        id: "modular-inverse",
        title: "Modular Inverses via Extended GCD",
        content: "In modular arithmetic, the multiplicative inverse of $a \\pmod m$ is an integer $x$ such that $a \\cdot x \\equiv 1 \\pmod m$. A modular inverse exists if and only if $\\gcd(a, m) = 1$. The Extended Euclidean Algorithm directly computes $x$ from Bézout's identity $a \\cdot x + m \\cdot y = 1 \\implies a \\cdot x \\equiv 1 \\pmod m$.",
        callout: {
          type: "historical",
          title: "Historical Significance",
          content: "Euclid introduced this geometric algorithm around 300 BCE in Book VII of Elements. Today, it forms the engine behind RSA key generation and Diffie-Hellman parameter generation."
        }
      }
    ],
    summaryTakeaways: [
      "Division Algorithm produces unique quotient $q$ and remainder $r$ with $0 \\le r < b$.",
      "Euclidean Algorithm computes $\\gcd(a, b)$ in $O(\\log(\\min(a, b)))$ time.",
      "Bézout's Identity proves $\\gcd(a, b) = a x + b y$, enabling modular inverse calculation."
    ]
  },

  "modular-arithmetic-congruences": {
    slug: "modular-arithmetic-congruences",
    sections: [
      {
        id: "congruences",
        title: "Congruence Relations & Equivalence Classes",
        content: "Two integers $a$ and $b$ are congruent modulo $m$ (written $a \\equiv b \\pmod m$) if $m \\mid (a - b)$. The relation of congruence modulo $m$ is an equivalence relation on $\\mathbb{Z}$, partitioning integers into $m$ disjoint equivalence classes: $\\mathbb{Z}_m = \\{[0], [1], \\dots, [m-1]\\}$.",
        callout: {
          type: "definition",
          title: "Ring of Integers Modulo m",
          content: "The set $\\mathbb{Z}_m = \\{0, 1, \\dots, m-1\\}$ endowed with modular addition $(a + b) \\pmod m$ and modular multiplication $(a \\cdot b) \\pmod m$ forms a commutative ring with unity."
        }
      },
      {
        id: "modular-exponentiation",
        title: "Fast Modular Exponentiation (Square-and-Multiply)",
        content: "Computing $g^e \\pmod m$ directly by evaluating $g^e$ is intractable for 2048-bit integers. The Square-and-Multiply algorithm computes $g^e \\pmod m$ in $O(\\log e)$ modular multiplications using binary decomposition of the exponent $e$.",
        codeExample: {
          language: "python",
          title: "Square-and-Multiply Algorithm",
          code: `def modular_pow(base: int, exponent: int, modulus: int) -> int:
    """Computes (base ** exponent) % modulus in O(log exponent) time."""
    result = 1
    base = base % modulus
    while exponent > 0:
        if exponent % 2 == 1:
            result = (result * base) % modulus
        exponent = exponent // 2
        base = (base * base) % modulus
    return result

# Example: Compute 7^256 modulo 13
print("7^256 mod 13 =", modular_pow(7, 256, 13))`
        }
      }
    ],
    summaryTakeaways: [
      "Congruence modulo $m$ partitions integers into $m$ equivalence classes.",
      "Modular arithmetic is consistent under addition, subtraction, and multiplication.",
      "Square-and-Multiply computes $g^e \\pmod m$ efficiently in $O(\\log e)$ steps."
    ]
  },

  "primes-and-primality-testing": {
    slug: "primes-and-primality-testing",
    sections: [
      {
        id: "prime-distribution",
        title: "Prime Numbers & Fermat's Little Theorem",
        content: "A prime number $p > 1$ has no positive divisors other than $1$ and $p$. The Prime Number Theorem shows that the number of primes $\\pi(x) \\le x$ is asymptotically $\\pi(x) \\sim \\frac{x}{\\ln x}$. Fermat's Little Theorem states that if $p$ is prime and $\\gcd(a, p) = 1$, then $a^{p-1} \\equiv 1 \\pmod p$.",
        callout: {
          type: "theorem",
          title: "Euler's Totient Function & Euler's Theorem",
          content: "Euler's totient function $\\phi(n)$ counts positive integers up to $n$ coprime to $n$. For $n = p \\cdot q$ (with prime $p, q$), $\\phi(n) = (p-1)(q-1)$. Euler's Theorem proves $a^{\\phi(n)} \\equiv 1 \\pmod n$ for $\\gcd(a, n) = 1$."
        }
      },
      {
        id: "miller-rabin",
        title: "Miller-Rabin Probabilistic Primality Test",
        content: "Deterministically factoring large numbers is hard, but probabilistic primality testing is fast. The Miller-Rabin test decomposes $n-1 = 2^s \\cdot d$ with $d$ odd. If $a^d \\not\\equiv 1 \\pmod n$ and $a^{2^r d} \\not\\equiv -1 \\pmod n$ for all $0 \\le r < s$, then $n$ is composite.",
        callout: {
          type: "warning",
          title: "Carmichael Numbers",
          content: "Composite numbers like $561$ satisfy $a^{n-1} \\equiv 1 \\pmod n$ for all coprime $a$. These 'Fermat pseudoprimes' bypass Fermat's test, making Miller-Rabin mandatory."
        },
        codeExample: {
          language: "python",
          title: "Miller-Rabin Primality Test",
          code: `import random

def is_prime_miller_rabin(n: int, k: int = 10) -> bool:
    if n <= 1 or n == 4: return False
    if n <= 3: return True
    d = n - 1
    s = 0
    while d % 2 == 0:
        d //= 2
        s += 1
    for _ in range(k):
        a = random.randint(2, n - 2)
        x = pow(a, d, n)
        if x == 1 or x == n - 1:
            continue
        for _ in range(s - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break
        else:
            return False
    return True`
        }
      }
    ],
    summaryTakeaways: [
      "Fermat's Little Theorem ($a^{p-1} \\equiv 1 \\pmod p$) and Euler's Theorem generalize prime powers.",
      "Miller-Rabin provides $1 - 4^{-k}$ accuracy for prime generation in RSA/DH.",
      "Carmichael numbers bypass naive Fermat primality testing."
    ]
  },

  "chinese-remainder-theorem": {
    slug: "chinese-remainder-theorem",
    sections: [
      {
        id: "crt-theorem",
        title: "The Chinese Remainder Theorem (CRT)",
        content: "The Chinese Remainder Theorem states that if $m_1, m_2, \\dots, m_k$ are pairwise coprime positive integers, then the system of simultaneous congruences $x \\equiv a_i \\pmod{m_i}$ has a unique solution modulo $M = \\prod_{i=1}^k m_i$.",
        callout: {
          type: "definition",
          title: "CRT Constructive Formula",
          content: "Let $M = m_1 m_2 \\dots m_k$ and $M_i = M / m_i$. Since $\\gcd(M_i, m_i) = 1$, let $y_i \\equiv M_i^{-1} \\pmod{m_i}$. The unique solution modulo $M$ is $x = \\sum_{i=1}^k a_i \\cdot M_i \\cdot y_i \\pmod M$."
        }
      },
      {
        id: "crt-applications",
        title: "Cryptographic Acceleration via CRT",
        content: "In RSA decryption, computing $c^d \\pmod N$ with 2048-bit $N = p \\cdot q$ is slow. Using CRT, exponentiation is performed modulo $p$ and modulo $q$ independently (using 1024-bit numbers), yielding a $\\sim 4\\times$ speedup.",
        codeExample: {
          language: "python",
          title: "CRT Solver in Python",
          code: `def solve_crt(rem: list[int], mod: list[int]) -> int:
    """Solves system x = rem[i] mod mod[i] using CRT."""
    from math import prod
    M = prod(mod)
    x = 0
    for a_i, m_i in zip(rem, mod):
        M_i = M // m_i
        y_i = pow(M_i, -1, m_i) # modular inverse
        x = (x + a_i * M_i * y_i) % M
    return x

# System: x = 2 mod 3, x = 3 mod 5, x = 2 mod 7 -> x = 23 mod 105
print("Solution x =", solve_crt([2, 3, 2], [3, 5, 7]))`
        }
      }
    ],
    summaryTakeaways: [
      "CRT proves isomorphism $\\mathbb{Z}_M \\cong \\mathbb{Z}_{m_1} \\times \\dots \\times \\mathbb{Z}_{m_k}$.",
      "Accelerates RSA private key operations by $4\\times$ using $p$ and $q$ decomposition.",
      "Requires pairwise coprime moduli $m_i$ for guaranteed unique solutions."
    ]
  }
}

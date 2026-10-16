import { DetailedLessonContent } from "./types"

export const module2Lessons: Record<string, DetailedLessonContent> = {
  "group-theory-cyclic-groups": {
    slug: "group-theory-cyclic-groups",
    sections: [
      {
        id: "group-definition",
        title: "Groups, Subgroups & Group Axioms",
        content: "A group $(G, \\cdot)$ is a set $G$ closed under a binary operation $\\cdot$ satisfying four axioms: Closure, Associativity, Existence of Identity element $e \\in G$, and Existence of Inverse $g^{-1}$ for every $g \\in G$. If $a \\cdot b = b \\cdot a$ for all $a,b \\in G$, $G$ is called an Abelian (commutative) group.",
        callout: {
          type: "definition",
          title: "Order of Group & Element Order",
          content: "The order of a group $|G|$ is the number of elements in $G$. The order of an element $g \\in G$, denoted $\\text{ord}(g)$, is the smallest positive integer $k$ such that $g^k = e$."
        }
      },
      {
        id: "cyclic-groups",
        title: "Cyclic Groups & Generators",
        content: "A group $G$ is cyclic if there exists a generator $g \\in G$ such that $G = \\langle g \\rangle = \\{g^k \\mid k \\in \\mathbb{Z}\\}$. Multiplicative groups modulo prime $p$, denoted $\\mathbb{Z}_p^* = \\{1, 2, \\dots, p-1\\}$, are cyclic of order $p-1$. Cyclic groups form the backbone of Diffie-Hellman key exchange.",
        callout: {
          type: "theorem",
          title: "Lagrange's Theorem",
          content: "If $H$ is a subgroup of a finite group $G$, then the order $|H|$ divides $|G|$. In particular, $\\text{ord}(g)$ divides $|G|$ for every element $g \\in G$."
        }
      }
    ],
    summaryTakeaways: [
      "Group axioms (closure, associativity, identity, inverse) govern algebraic structures.",
      "Multiplicative groups $\\mathbb{Z}_p^*$ are cyclic and contain primitive generators $g$.",
      "Lagrange's Theorem proves $\\text{ord}(g) \\mid |G|$, ensuring $g^{|G|} = e$."
    ]
  },

  "ring-theory-polynomials": {
    slug: "ring-theory-polynomials",
    sections: [
      {
        id: "rings-ideals",
        title: "Ring Theory & Polynomial Rings",
        content: "A ring $(R, +, \\cdot)$ is a set equipped with two binary operations where $(R, +)$ is an abelian group and $(R, \\cdot)$ is associative and distributive over addition. For a field $F$, $F[x]$ denotes the polynomial ring consisting of polynomials with coefficients in $F$.",
        callout: {
          type: "definition",
          title: "Irreducible Polynomials",
          content: "A polynomial $f(x) \\in F[x]$ of degree $d \\ge 1$ is irreducible over $F$ if it cannot be factored into two polynomials of lower degree over $F$. Irreducible polynomials play the role of prime numbers in field extensions."
        }
      },
      {
        id: "polynomial-division",
        title: "Polynomial Arithmetic Modulo f(x)",
        content: "Given $f(x) \\in F[x]$, polynomials $a(x)$ can be reduced modulo $f(x)$ using polynomial division: $a(x) = q(x) \\cdot f(x) + r(x)$ with $\\deg(r) < \\deg(f)$. The quotient ring $F[x] / \\langle f(x) \\rangle$ forms a finite field when $f(x)$ is irreducible.",
        codeExample: {
          language: "python",
          title: "Polynomial Multiplication in GF(2)[x]",
          code: `def poly_mul_gf2(a: int, b: int) -> int:
    """Multiplies two polynomials represented as bitmasks over GF(2)."""
    result = 0
    while b > 0:
        if b & 1:
            result ^= a
        a <<= 1
        b >>= 1
    return result

# Multiply x^2 + 1 (0b101 = 5) and x + 1 (0b011 = 3) -> x^3 + x^2 + x + 1 (0b1111 = 15)
print("Polynomial product =", bin(poly_mul_gf2(5, 3)))`
        }
      }
    ],
    summaryTakeaways: [
      "Polynomial ring $F[x]$ allows formal polynomial arithmetic over fields.",
      "Irreducible polynomials $f(x)$ act as prime elements for modulus reduction.",
      "Quotient ring $F[x] / \\langle f(x) \\rangle$ constructs Galois extensions."
    ]
  },

  "finite-fields-galois-fields": {
    slug: "finite-fields-galois-fields",
    sections: [
      {
        id: "galois-fields",
        title: "Galois Fields GF(p^k) & Field Extensions",
        content: "A finite field (Galois Field, $\\text{GF}(q)$) is a field containing a finite number of elements $q$. The order $q$ must be a prime power $q = p^k$, where $p$ is the characteristic prime. Prime fields are denoted $\\text{GF}(p)$, while non-prime extensions $\\text{GF}(p^k)$ are built using irreducible polynomials of degree $k$ over $\\text{GF}(p)$.",
        callout: {
          type: "definition",
          title: "AES Galois Field GF(2^8)",
          content: "The Advanced Encryption Standard (AES) performs byte arithmetic inside $\\text{GF}(2^8)$ constructed using the irreducible polynomial $P(x) = x^8 + x^4 + x^3 + x + 1$ (represented in hex as 0x11B)."
        }
      },
      {
        id: "field-arithmetic",
        title: "Field Arithmetic in GF(2^8)",
        content: "Addition in $\\text{GF}(2^8)$ corresponds to bitwise XOR $(\\oplus)$. Multiplication multiplies polynomials over $\\text{GF}(2)$ and reduces modulo $P(x) = x^8 + x^4 + x^3 + x + 1$. Multiplicative inverses in $\\text{GF}(2^8)$ form the core non-linear transformation in AES S-Box design.",
        codeExample: {
          language: "python",
          title: "GF(2^8) Multiplication (AES xtime)",
          code: `def gf_mul_256(a: int, b: int, poly: int = 0x11B) -> int:
    """Multiplies two bytes in GF(2^8) modulo P(x) = x^8 + x^4 + x^3 + x + 1."""
    p = 0
    for _ in range(8):
        if b & 1:
            p ^= a
        hi_bit = a & 0x80
        a = (a << 1) & 0xFF
        if hi_bit:
            a ^= (poly & 0xFF)
        b >>= 1
    return p

print("0x57 * 0x83 in GF(2^8) =", hex(gf_mul_256(0x57, 0x83)))`
        }
      }
    ],
    summaryTakeaways: [
      "Galois Fields exist if and only if order is a prime power $q = p^k$.",
      "Addition in $\\text{GF}(2^8)$ is XOR ($\oplus$), avoiding carry bits.",
      "Multiplication reduces modulo irreducible polynomials, underlying AES security."
    ]
  }
}

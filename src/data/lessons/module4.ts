import { DetailedLessonContent } from "./types"

export const module4Lessons: Record<string, DetailedLessonContent> = {
  "rsa-cryptosystem-factorization": {
    slug: "rsa-cryptosystem-factorization",
    sections: [
      {
        id: "rsa-keygen",
        title: "RSA Key Generation & Mathematical Foundations",
        content: "The RSA cryptosystem (Rivest, Shamir, Adleman 1978) relies on the integer factorization trapdoor permutation. Key Generation picks two distinct large prime numbers $p, q$ and computes $N = p \\cdot q$ and $\\phi(N) = (p-1)(q-1)$. A public exponent $e$ is chosen with $\\gcd(e, \\phi(N)) = 1$ (commonly $e = 65537$). The private key exponent is $d \\equiv e^{-1} \\pmod{\\phi(N)}$.",
        callout: {
          type: "theorem",
          title: "RSA Correctness Proof",
          content: "Encryption computes $c \\equiv m^e \\pmod N$. Decryption computes $c^d \\equiv (m^e)^d \\equiv m^{e \\cdot d} \\pmod N$. Since $e \\cdot d \\equiv 1 \\pmod{\\phi(N)}$, $e \\cdot d = 1 + k \\phi(N)$. By Euler's Theorem, $m^{1 + k \\phi(N)} \\equiv m \\cdot (m^{\\phi(N)})^k \\equiv m \\cdot 1^k \\equiv m \\pmod N$."
        },
        codeExample: {
          language: "python",
          title: "Minimal RSA Implementation in Python",
          code: `def rsa_demo(p: int = 61, q: int = 53):
    N = p * q
    phi = (p - 1) * (q - 1)
    e = 17 # public exponent
    d = pow(e, -1, phi) # private key exponent

    msg = 42
    ciphertext = pow(msg, e, N)
    decrypted = pow(ciphertext, d, N)

    print(f"RSA N={N}, e={e}, d={d}")
    print(f"Message={msg} -> Ciphertext={ciphertext} -> Decrypted={decrypted}")

rsa_demo()`
        }
      },
      {
        id: "rsa-attacks",
        title: "RSA Padding & Security Vulnerabilities",
        content: "Textbook RSA ($c = m^e \\pmod N$) is deterministic and highly insecure: $m=0$ or $m=1$ encrypt to themselves, small messages ($m^e < N$) are decrypted by taking $e$-th roots, and homomorphic properties allow malleability $e_k(m_1) \\cdot e_k(m_2) = e_k(m_1 \\cdot m_2 \\pmod N)$. Modern RSA requires OAEP (Optimal Asymmetric Encryption Padding).",
        callout: {
          type: "warning",
          title: "Integer Factorization & Quantum Vulnerability",
          content: "RSA security assumes integer factorization is intractable for classical computers ($O(\\exp((\\ln N)^{1/3}))$, General Number Field Sieve). However, Shor's Quantum Algorithm solves factorization in polynomial time $O((\\log N)^3)$."
        }
      }
    ],
    summaryTakeaways: [
      "RSA key pair relies on prime products $N = p \\cdot q$ and modular inverses $d \\equiv e^{-1} \\pmod{\\phi(N)}$.",
      "Textbook RSA is vulnerable to homomorphic attacks; OAEP padding is mandatory.",
      "Factorization hardness protects RSA classically, but Shor's quantum algorithm breaks it."
    ]
  },

  "diffie-hellman-discrete-log": {
    slug: "diffie-hellman-discrete-log",
    sections: [
      {
        id: "dlp-assumption",
        title: "The Discrete Logarithm Problem (DLP)",
        content: "Let $G = \\langle g \\rangle$ be a finite cyclic group of order $q$. Given $g \\in G$ and $y = g^x \\in G$, the Discrete Logarithm Problem (DLP) is to find $x = \\log_g y$. In carefully chosen groups (e.g. $\\mathbb{Z}_p^*$ with 2048-bit prime $p$), computing $g^x \\pmod p$ is easy, but computing $x$ from $y$ is computationally infeasible.",
        callout: {
          type: "definition",
          title: "Diffie-Hellman Hardness Assumptions",
          content: "Computational Diffie-Hellman (CDH): Given $(g, g^a, g^b)$, compute $g^{ab}$. Decisional Diffie-Hellman (DDH): Distinguish $(g, g^a, g^b, g^{ab})$ from $(g, g^a, g^b, g^c)$ where $c$ is uniformly random."
        }
      },
      {
        id: "dh-key-exchange",
        title: "Diffie-Hellman Key Exchange Protocol",
        content: "Alice and Bob agree on domain parameters $(p, g)$. Alice picks secret exponent $a \\in_R [1, p-2]$ and sends $A = g^a \\pmod p$. Bob picks secret $b \\in_R [1, p-2]$ and sends $B = g^b \\pmod p$. Alice computes $K = B^a \\equiv (g^b)^a \\equiv g^{ab} \\pmod p$. Bob computes $K = A^b \\equiv (g^a)^b \\equiv g^{ab} \\pmod p$. Both establish shared secret $K$.",
        codeExample: {
          language: "python",
          title: "Diffie-Hellman Protocol Demo",
          code: `import random

def diffie_hellman():
    p = 23 # prime modulus
    g = 5  # generator

    # Alice keypair
    a = random.randint(1, p-1)
    A = pow(g, a, p)

    # Bob keypair
    b = random.randint(1, p-1)
    B = pow(g, b, p)

    # Shared secret exchange
    s_alice = pow(B, a, p)
    s_bob = pow(A, b, p)

    print(f"Alice Secret: {s_alice}, Bob Secret: {s_bob}, Shared Equal: {s_alice == s_bob}")

diffie_hellman()`
        }
      }
    ],
    summaryTakeaways: [
      "Discrete Logarithm Problem ($y = g^x$) forms a computational one-way function in cyclic groups.",
      "Diffie-Hellman allows two parties to establish shared keys over unencrypted channels.",
      "Requires authenticated channels (e.g., certificates) to prevent Man-in-the-Middle (MitM) attacks."
    ]
  },

  "elgamal-digital-signatures": {
    slug: "elgamal-digital-signatures",
    sections: [
      {
        id: "elgamal-encryption",
        title: "ElGamal Encryption Scheme",
        content: "ElGamal encryption is a probabilistic asymmetric scheme based on DLP. Domain parameters are prime $p$ and generator $g$. Public key is $Y = g^x \\pmod p$; private key is $x$. To encrypt message $m$, choose ephemeral random $k \\in_R \\mathbb{Z}_p^*$. Ciphertext pair is $(c_1, c_2) = (g^k \\pmod p, m \\cdot Y^k \\pmod p)$. Decryption computes $m = c_2 \\cdot (c_1^x)^{-1} \\pmod p$.",
        callout: {
          type: "definition",
          title: "Digital Signatures & Non-Repudiation",
          content: "A digital signature algorithm (DSA) provides Integrity, Authenticity, and Non-Repudiation. Only the private key holder can generate a signature, while anyone with the public key can verify it."
        }
      },
      {
        id: "dsa-signature",
        title: "Digital Signature Algorithm (DSA)",
        content: "DSA standardizes signatures over subgroup $\\langle g \\rangle \\subset \\mathbb{Z}_p^*$ of prime order $q$. To sign hash $H(m)$, pick ephemeral $k$. Signature is $(r, s)$ where $r = (g^k \\pmod p) \\pmod q$ and $s = k^{-1} (H(m) + x r) \\pmod q$. Verification checks whether $v = r$ where $v = (g^{u_1} Y^{u_2} \\pmod p) \\pmod q$ with $w = s^{-1} \\pmod q, u_1 = H(m)w, u_2 = rw$.",
        callout: {
          type: "warning",
          title: "Catastrophic Ephemeral Nonce Reuse",
          content: "If the nonce $k$ is reused across two different signatures $(r, s_1)$ and $(r, s_2)$, the private key $x$ can be extracted algebraically in milliseconds: $x = (s_1 H(m_2) - s_2 H(m_1)) \\cdot (r(s_2 - s1))^{-1} \\pmod q$."
        }
      }
    ],
    summaryTakeaways: [
      "ElGamal provides randomized probabilistic encryption ($c_1, c_2$) to prevent deterministic cipher leakage.",
      "DSA guarantees non-repudiation and verification based on discrete logarithm difficulty.",
      "Ephemeral nonce $k$ reuse instantly leaks private keys (e.g. Sony PS3 ECDSA attack)."
    ]
  }
}

import { DetailedLessonContent } from "./types"

export const module3Lessons: Record<string, DetailedLessonContent> = {
  "classical-ciphers-cryptanalysis": {
    slug: "classical-ciphers-cryptanalysis",
    sections: [
      {
        id: "classical-overview",
        title: "Substitution, Permutation & Transposition Ciphers",
        content: "Classical cryptography operates on characters using monoalphabetic substitution (e.g. Shift/Caesar cipher $e_k(p) = (p + k) \\pmod{26}$) or polyalphabetic substitution (e.g. Vigenère cipher $c_i = (p_i + k_{i \\pmod m}) \\pmod{26}$). Affine ciphers use linear keys: $e_{a,b}(p) = (a \\cdot p + b) \\pmod{26}$ requiring $\\gcd(a, 26) = 1$.",
        callout: {
          type: "warning",
          title: "Insecurity of Classical Ciphers",
          content: "Monoalphabetic substitution ciphers preserve natural letter frequency distributions (e.g., 'E' is ~12.7% in English text). Frequency analysis breaks monoalphabetic ciphers instantly regardless of key length."
        }
      },
      {
        id: "cryptanalysis-methods",
        title: "Cryptanalysis & Kasiski Examination",
        content: "Polyalphabetic ciphers like Vigenère mask letter frequencies by shifting characters across key positions. However, repeating key phrases introduce periodic repetitions. The Kasiski Examination identifies repeated letter n-grams to deduce key length $m$, reducing Vigenère cryptanalysis to $m$ independent monoalphabetic frequency analyses.",
        callout: {
          type: "historical",
          title: "The Unbreakable Cipher Broken",
          content: "For three centuries, the Vigenère cipher was deemed 'le chiffre indéchiffrable'. In 1863, Prussian officer Friedrich Kasiski published the first general cryptanalytic attack."
        }
      }
    ],
    summaryTakeaways: [
      "Shift and Affine ciphers have tiny key spaces ($26$ and $312$ keys) easily brute-forced.",
      "Frequency analysis breaks substitution by exploiting natural language statistics.",
      "Kasiski examination breaks Vigenère ciphers by identifying repeating key periods."
    ]
  },

  "stream-ciphers-lfsr": {
    slug: "stream-ciphers-lfsr",
    sections: [
      {
        id: "otp-perfect-secrecy",
        title: "One-Time Pad & Information-Theoretic Secrecy",
        content: "The One-Time Pad (OTP) encrypts plaintext $p_i$ with random keystream $k_i$ via $c_i = p_i \\oplus k_i$. Shannon proved OTP provides Information-Theoretic Secrecy (Perfect Secrecy) if the key $k$ is uniformly random, used only once, and as long as the message $p$.",
        callout: {
          type: "definition",
          title: "Information-Theoretic vs Computational Secrecy",
          content: "Perfect secrecy means $P(P = p \\mid C = c) = P(P = p)$; ciphertext gives an eavesdropper zero information about plaintext regardless of computing power. Computational secrecy relies on bounded computational limits."
        }
      },
      {
        id: "lfsr-prng",
        title: "Linear Feedback Shift Registers (LFSR)",
        content: "To generate pseudo-random keystreams efficiently in hardware, Linear Feedback Shift Registers (LFSRs) shift internal state bits and feed back linear combinations via primitive feedback polynomials $P(x)$. An $n$-bit LFSR achieves a maximal period $T = 2^n - 1$ (m-sequence).",
        callout: {
          type: "warning",
          title: "Berlekamp-Massey Attack on Raw LFSRs",
          content: "Raw LFSR output is vulnerable: given just $2n$ output bits, the Berlekamp-Massey algorithm reconstructs the entire feedback polynomial and state in $O(n^2)$ steps. Modern stream ciphers like ChaCha20 use non-linear ARX (Add-Rotate-XOR) operations."
        }
      }
    ],
    summaryTakeaways: [
      "One-Time Pad offers unbreakable perfect secrecy but requires unsharable key lengths.",
      "LFSRs produce maximal $2^n - 1$ keystreams using linear feedback polynomials.",
      "Raw LFSRs are insecure due to Berlekamp-Massey synthesis; modern stream ciphers use non-linear functions."
    ]
  },

  "block-ciphers-aes-math": {
    slug: "block-ciphers-aes-math",
    sections: [
      {
        id: "spn-feistel",
        title: "Substitution-Permutation Networks (SPN)",
        content: "Block ciphers partition plaintext into fixed $b$-bit blocks (e.g. 128 bits) and apply round functions based on Shannon's properties: Confusion (masking key-ciphertext relations via non-linear S-Boxes) and Diffusion (spreading plaintext influence across all ciphertext bits via linear permutations).",
        callout: {
          type: "definition",
          title: "AES Architecture & State Array",
          content: "AES processes 128-bit blocks organized as a $4 \\times 4$ matrix of bytes called the State. Depending on key size (128, 192, 256 bits), AES executes 10, 12, or 14 rounds consisting of SubBytes, ShiftRows, MixColumns, and AddRoundKey."
        }
      },
      {
        id: "aes-mixcolumns",
        title: "AES Mathematical Transformations",
        content: "The SubBytes step computes multiplicative inverses in $\\text{GF}(2^8)$ followed by an affine transformation over $\\mathbb{F}_2^8$ to resist linear/differential cryptanalysis. The MixColumns step multiplies state columns by a fixed matrix over $\\text{GF}(2^8)$ with maximum distance separable (MDS) codes.",
        codeExample: {
          language: "python",
          title: "AES MixColumns Matrix Multiplication",
          code: `# MixColumns matrix multiplication over GF(2^8)
def mix_column(col: list[int]) -> list[int]:
    """Multiplies column vector col by AES MDS matrix in GF(2^8)."""
    # Matrix coefficients: [2, 3, 1, 1], [1, 2, 3, 1], etc.
    def g2(x): return ((x << 1) ^ 0x11B) if (x & 0x80) else (x << 1)
    def g3(x): return g2(x) ^ x

    c0, c1, c2, c3 = col
    return [
        g2(c0) ^ g3(c1) ^ c2 ^ c3,
        c0 ^ g2(c1) ^ g3(c2) ^ c3,
        c0 ^ c1 ^ g2(c2) ^ g3(c3),
        g3(c0) ^ c1 ^ c2 ^ g2(c3)
    ]`
        }
      }
    ],
    summaryTakeaways: [
      "Confusion (S-Box) and Diffusion (MixColumns/ShiftRows) achieve non-linear block cipher security.",
      "AES S-Box relies on algebraic field inversion in $\\text{GF}(2^8)$ to neutralize differential attacks.",
      "MixColumns provides optimal MDS branch factor of 5, diffusing single bit changes across entire columns."
    ]
  },

  "hash-functions-mac": {
    slug: "hash-functions-mac",
    sections: [
      {
        id: "hash-properties",
        title: "Cryptographic Hash Functions & Security Properties",
        content: "A cryptographic hash function $H: \\{0, 1\\}^* \\to \\{0, 1\\}^n$ maps arbitrary-length messages to fixed $n$-bit hash digests. A secure hash function must satisfy three essential properties: Preimage Resistance (One-Wayness), Second Preimage Resistance, and Collision Resistance.",
        callout: {
          type: "definition",
          title: "Birthday Paradox & Collision Security",
          content: "By the Birthday Paradox, finding a collision for an $n$-bit hash digest requires approximately $2^{n/2}$ evaluations. Thus, a 256-bit hash function (like SHA-256) yields 128-bit security against collision attacks."
        }
      },
      {
        id: "merkle-damgard-hmac",
        title: "Merkle-Damgård Construction & HMAC",
        content: "The Merkle-Damgård construction processes padded messages in sequential blocks $M_1, M_2, \\dots, M_k$ using a compression function $f: H_i = f(H_{i-1}, M_i)$. HMAC (Hash-based Message Authentication Code) prevents length-extension attacks by nesting hash operations: $\\text{HMAC}(K, M) = H((K \\oplus \\text{opad}) \\mathbin{\\Vert} H((K \\oplus \\text{ipad}) \\mathbin{\\Vert} M))$.",
        callout: {
          type: "warning",
          title: "Deprecation of MD5 & SHA-1",
          content: "MD5 ($128$-bit) and SHA-1 ($160$-bit) are broken due to practical collision attacks ($2^{39}$ for SHA-1). SHA-256, SHA-3 (Keccak Sponge construction), and BLAKE2/BLAKE3 are recommended standards."
        }
      }
    ],
    summaryTakeaways: [
      "Hash security requires Preimage, 2nd Preimage, and $2^{n/2}$ Collision resistance.",
      "Merkle-Damgård process sequential blocks but require nested HMAC to block length extension.",
      "SHA-3 uses Sponge construction (Absorb/Squeeze) independent of Merkle-Damgård limits."
    ]
  }
}

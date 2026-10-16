export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  moduleSlug: string;
  order: number;
  estimatedTime?: string;
}

export interface Module {
  id: string;
  slug: string;
  title: string;
  description: string;
  estimatedTime?: string;
  lessons: Lesson[];
}

export const syllabusModules: Module[] = [
  {
    id: "mod-1",
    slug: "foundations-number-theory",
    title: "1. Foundations of Number Theory & Modular Arithmetic",
    description: "Divisibility, Euclidean Algorithm, Modular Arithmetic, Chinese Remainder Theorem, Euler's Totient Function.",
    estimatedTime: "2 Weeks",
    lessons: [
      {
        id: "l1-1",
        slug: "divisibility-euclidean-algorithm",
        title: "Divisibility & The Euclidean Algorithm",
        description: "Greatest common divisors, Bézout's identity, and the Extended Euclidean Algorithm for modular inverses.",
        moduleSlug: "foundations-number-theory",
        order: 1,
        estimatedTime: "3 Hours",
      },
      {
        id: "l1-2",
        slug: "modular-arithmetic-congruences",
        title: "Modular Arithmetic & Congruences",
        description: "Equivalence classes, modular operations, multiplicative inverses, and fast exponentiation algorithms.",
        moduleSlug: "foundations-number-theory",
        order: 2,
        estimatedTime: "3 Hours",
      },
      {
        id: "l1-3",
        slug: "primes-and-primality-testing",
        title: "Prime Numbers & Primality Testing",
        description: "Distribution of primes, Fermat's Little Theorem, Euler's Totient Function, and the Miller-Rabin primality test.",
        moduleSlug: "foundations-number-theory",
        order: 3,
        estimatedTime: "4 Hours",
      },
      {
        id: "l1-4",
        slug: "chinese-remainder-theorem",
        title: "Chinese Remainder Theorem & Modular Systems",
        description: "Existence, construction, and computational applications of the Chinese Remainder Theorem (CRT) in multi-modular arithmetic.",
        moduleSlug: "foundations-number-theory",
        order: 4,
        estimatedTime: "3 Hours",
      },
    ],
  },
  {
    id: "mod-2",
    slug: "abstract-algebra",
    title: "2. Abstract Algebra for Cryptography",
    description: "Groups, rings, finite fields (Galois Fields), cyclic groups, and generators essential for algebraic cryptography.",
    estimatedTime: "2 Weeks",
    lessons: [
      {
        id: "l2-1",
        slug: "group-theory-cyclic-groups",
        title: "Group Theory & Cyclic Groups",
        description: "Groups, subgroups, generators, order of elements, Lagrange's theorem, and cyclic group structure.",
        moduleSlug: "abstract-algebra",
        order: 1,
        estimatedTime: "4 Hours",
      },
      {
        id: "l2-2",
        slug: "ring-theory-polynomials",
        title: "Ring Theory & Polynomial Rings",
        description: "Rings, ideals, polynomial rings over fields, and polynomial division with remainder.",
        moduleSlug: "abstract-algebra",
        order: 2,
        estimatedTime: "3 Hours",
      },
      {
        id: "l2-3",
        slug: "finite-fields-galois-fields",
        title: "Finite Fields (Galois Fields) & Field Arithmetic",
        description: "Construction of GF(p^k), irreducible polynomials, field extensions, and finite field arithmetic.",
        moduleSlug: "abstract-algebra",
        order: 3,
        estimatedTime: "4 Hours",
      },
    ],
  },
  {
    id: "mod-3",
    slug: "symmetric-cryptography",
    title: "3. Symmetric Cryptography & Mathematical Foundations",
    description: "Classical substitution-permutation ciphers, stream ciphers, finite field math in AES, and cryptographic hash function theory.",
    estimatedTime: "3 Weeks",
    lessons: [
      {
        id: "l3-1",
        slug: "classical-ciphers-cryptanalysis",
        title: "Classical Ciphers & Cryptanalysis",
        description: "Shift ciphers, affine ciphers, Vigenère cipher, frequency analysis, and key space evaluation.",
        moduleSlug: "symmetric-cryptography",
        order: 1,
        estimatedTime: "3 Hours",
      },
      {
        id: "l3-2",
        slug: "stream-ciphers-lfsr",
        title: "Stream Ciphers & Pseudo-Random Generators",
        description: "One-Time Pad, information-theoretic secrecy, linear feedback shift registers (LFSR), and stream cipher construction.",
        moduleSlug: "symmetric-cryptography",
        order: 2,
        estimatedTime: "4 Hours",
      },
      {
        id: "l3-3",
        slug: "block-ciphers-aes-math",
        title: "Block Ciphers & Modern AES Mathematics",
        description: "Substitution-Permutation Networks (SPN), S-Box construction, MixColumns in GF(2^8), and Rijndael algebra.",
        moduleSlug: "symmetric-cryptography",
        order: 3,
        estimatedTime: "4 Hours",
      },
      {
        id: "l3-4",
        slug: "hash-functions-mac",
        title: "Hash Functions & Message Authentication",
        description: "Collision resistance, preimage resistance, Merkle-Damgård construction, Sponge construction, and HMAC mathematical proofs.",
        moduleSlug: "symmetric-cryptography",
        order: 4,
        estimatedTime: "3 Hours",
      },
    ],
  },
  {
    id: "mod-4",
    slug: "public-key-cryptography",
    title: "4. Public-Key Cryptography & Asymmetric Algorithms",
    description: "RSA encryption, integer factorization, Discrete Logarithm Problem (DLP), Diffie-Hellman key exchange, and ElGamal signatures.",
    estimatedTime: "3 Weeks",
    lessons: [
      {
        id: "l4-1",
        slug: "rsa-cryptosystem-factorization",
        title: "RSA Cryptosystem & Integer Factorization",
        description: "Key generation, Euler's totient application, RSA trapdoor permutation, padding schemes (OAEP), and factorization attacks.",
        moduleSlug: "public-key-cryptography",
        order: 1,
        estimatedTime: "4 Hours",
      },
      {
        id: "l4-2",
        slug: "diffie-hellman-discrete-log",
        title: "Diffie-Hellman Key Exchange & Discrete Logarithms",
        description: "Key negotiation over cyclic groups, Discrete Logarithm Problem (DLP), Computational/Decisional Diffie-Hellman assumptions.",
        moduleSlug: "public-key-cryptography",
        order: 2,
        estimatedTime: "4 Hours",
      },
      {
        id: "l4-3",
        slug: "elgamal-digital-signatures",
        title: "ElGamal Cryptosystem & Digital Signatures",
        description: "Probabilistic encryption, ElGamal signature scheme, Digital Signature Algorithm (DSA), and verification proofs.",
        moduleSlug: "public-key-cryptography",
        order: 3,
        estimatedTime: "3 Hours",
      },
    ],
  },
  {
    id: "mod-5",
    slug: "elliptic-curve-cryptography",
    title: "5. Elliptic Curve Cryptography (ECC)",
    description: "Geometric and algebraic curve addition laws over finite fields, ECDH, ECDSA, and pairing-based cryptography.",
    estimatedTime: "2 Weeks",
    lessons: [
      {
        id: "l5-1",
        slug: "elliptic-curves-real-finite-fields",
        title: "Elliptic Curves over Real & Finite Fields",
        description: "Weierstrass equations, chord-and-tangent group law, point addition/doubling algebra, and Hasse's bound over GF(p).",
        moduleSlug: "elliptic-curve-cryptography",
        order: 1,
        estimatedTime: "4 Hours",
      },
      {
        id: "l5-2",
        slug: "ecdh-ecdsa-protocols",
        title: "ECDH & ECDSA Protocols",
        description: "Elliptic Curve Diffie-Hellman key exchange, Elliptic Curve Digital Signature Algorithm, domain parameters (secp256k1), and security bounds.",
        moduleSlug: "elliptic-curve-cryptography",
        order: 2,
        estimatedTime: "4 Hours",
      },
      {
        id: "l5-3",
        slug: "pairing-based-cryptography",
        title: "Pairing-Based Cryptography & Advanced Curves",
        description: "Bilinear pairings (Weil & Tate pairings), BLS signature schemes, and Edwards curves (Ed25519).",
        moduleSlug: "elliptic-curve-cryptography",
        order: 3,
        estimatedTime: "3 Hours",
      },
    ],
  },
  {
    id: "mod-6",
    slug: "advanced-post-quantum",
    title: "6. Advanced & Post-Quantum Cryptography",
    description: "Lattice-based cryptography, Learning With Errors (LWE), zero-knowledge proofs, and fully homomorphic encryption.",
    estimatedTime: "2 Weeks",
    lessons: [
      {
        id: "l6-1",
        slug: "lattice-based-cryptography-lwe",
        title: "Lattice-Based Cryptography & LWE",
        description: "Lattice geometry, Shortest Vector Problem (SVP), Learning With Errors (LWE), NTRU, and post-quantum NIST standards (Kyber/Dilithium).",
        moduleSlug: "advanced-post-quantum",
        order: 1,
        estimatedTime: "4 Hours",
      },
      {
        id: "l6-2",
        slug: "zero-knowledge-proofs",
        title: "Zero-Knowledge Proofs & Interactive Proof Systems",
        description: "Completeness, soundness, zero-knowledge properties, Schnorr identification protocol, zk-SNARKs and zk-STARKs foundations.",
        moduleSlug: "advanced-post-quantum",
        order: 2,
        estimatedTime: "4 Hours",
      },
      {
        id: "l6-3",
        slug: "homomorphic-encryption-mpc",
        title: "Homomorphic Encryption & Secure Multiparty Computation",
        description: "Somewhat and Fully Homomorphic Encryption (FHE), Shamir's secret sharing, and secure multi-party computation protocols.",
        moduleSlug: "advanced-post-quantum",
        order: 3,
        estimatedTime: "3 Hours",
      },
    ],
  },
];

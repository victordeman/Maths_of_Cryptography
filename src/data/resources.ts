export interface Resource {
  title: string;
  category: "Book" | "Paper" | "Software" | "Course" | "Tool";
  description: string;
  author?: string;
  url: string;
}

export const courseResources: Resource[] = [
  {
    title: "An Introduction to Mathematical Cryptography",
    category: "Book",
    author: "Jeffrey Hoffstein, Jill Pipher, J.H. Silverman",
    description: "An outstanding undergraduate and graduate-level introduction to modern cryptography from a rigorous mathematical perspective.",
    url: "https://link.springer.com/book/10.1007/978-0-387-77993-5",
  },
  {
    title: "Handbook of Applied Cryptography",
    category: "Book",
    author: "Alfred J. Menezes, Paul C. van Oorschot, Scott A. Vanstone",
    description: "A classic, comprehensive reference book detailing cryptographic algorithms, primitives, and protocol designs.",
    url: "https://cacr.uwaterloo.ca/hac/",
  },
  {
    title: "Understanding Cryptography: A Textbook for Students and Practitioners",
    category: "Book",
    author: "Christof Paar, Jan Pelzl",
    description: "A practical textbook explaining modern cryptographic building blocks with accessible mathematical foundations.",
    url: "https://www.crypto-textbook.com/",
  },
  {
    title: "A Graduate Course in Applied Cryptography",
    category: "Book",
    author: "Dan Boneh, Victor Shoup",
    description: "A rigorous modern graduate textbook focusing on theoretical security definitions, reductions, and concrete constructions.",
    url: "https://toc.cryptobook.us/",
  },
  {
    title: "A Method for Obtaining Digital Signatures and Public-Key Cryptosystems",
    category: "Paper",
    author: "R.L. Rivest, A. Shamir, L. Adleman (1978)",
    description: "The landmark paper introducing the RSA public-key cryptosystem based on integer factorization hardness.",
    url: "https://dl.acm.org/doi/10.1145/359340.359342",
  },
  {
    title: "New Directions in Cryptography",
    category: "Paper",
    author: "W. Diffie, M. E. Hellman (1976)",
    description: "The foundational paper that introduced public-key exchange concepts and asymmetric cryptography.",
    url: "https://ee.stanford.edu/~hellman/publications/24.pdf",
  },
  {
    title: "SageMath Mathematics Software System",
    category: "Tool",
    description: "Open-source mathematical software system featuring extensive native libraries for number theory, modular arithmetic, abstract algebra, and elliptic curve calculations.",
    url: "https://www.sagemath.org/",
  },
  {
    title: "CrypTool Project",
    category: "Software",
    description: "An open-source e-learning software system and interactive platform for analyzing and testing cryptographic procedures.",
    url: "https://www.cryptool.org/",
  },
  {
    title: "OpenSSL Cryptographic Toolkit",
    category: "Software",
    description: "A robust, commercial-grade, full-featured toolkit implementing the Transport Layer Security (TLS) and Secure Sockets Layer (SSL) protocols as well as general-purpose cryptographic algorithms.",
    url: "https://www.openssl.org/",
  },
  {
    title: "NIST Post-Quantum Cryptography Standardization",
    category: "Course",
    description: "Official NIST documentation, specifications, and reference implementations for standardized quantum-resistant cryptographic algorithms.",
    url: "https://csrc.nist.gov/projects/post-quantum-cryptography",
  },
];

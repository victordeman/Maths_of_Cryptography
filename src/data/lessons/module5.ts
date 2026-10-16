import { DetailedLessonContent } from "./types"

export const module5Lessons: Record<string, DetailedLessonContent> = {
  "elliptic-curves-real-finite-fields": {
    slug: "elliptic-curves-real-finite-fields",
    sections: [
      {
        id: "ec-definition",
        title: "Weierstrass Equations & Curve Geometry",
        content: "An elliptic curve $E$ over a field $F$ (with characteristic $\\ne 2, 3$) is defined by the short Weierstrass equation $y^2 = x^3 + a x + b$ where $4 a^3 + 27 b^2 \\ne 0$ (non-singular condition). The set of points $E(F) = \\{(x,y) \\in F \\times F \\mid y^2 = x^3 + ax + b\\} \\cup \\{\\mathcal{O}\\}$ forms an abelian group with point at infinity $\\mathcal{O}$ as identity element.",
        callout: {
          type: "definition",
          title: "Chord-and-Tangent Group Law",
          content: "Addition of two points $P = (x_1, y_1)$ and $Q = (x_2, y_2)$: draw line through $P$ and $Q$, find third intersection point $R = (x_3, -y_3)$, and reflect across $x$-axis to obtain $P + Q = (x_3, y_3)$. If $P = Q$, draw tangent line at $P$ (Point Doubling)."
        }
      },
      {
        id: "ec-finite-fields",
        title: "Elliptic Curves over Finite Fields GF(p)",
        content: "In cryptography, elliptic curves are evaluated over prime fields $\\text{GF}(p)$. Hasse's Theorem bounds the number of points on $E(\\mathbb{F}_p)$: $|\\#E(\\mathbb{F}_p) - (p+1)| \\le 2 \\sqrt{p}$. Because group arithmetic works on 256-bit points rather than 2048-bit integers, ECC achieves security equal to 2048-bit RSA using 256-bit keys.",
        codeExample: {
          language: "python",
          title: "Point Addition on Short Weierstrass Curve in GF(p)",
          code: `def ec_add(P, Q, a, p):
    """Adds two points P and Q on y^2 = x^3 + a*x + b over GF(p)."""
    if P is None: return Q
    if Q is None: return P
    x1, y1 = P
    x2, y2 = Q
    if x1 == x2 and y1 != y2: return None # Point at infinity

    if P == Q:
        if y1 == 0: return None
        s = (3 * x1**2 + a) * pow(2 * y1, -1, p) % p
    else:
        s = (y2 - y1) * pow(x2 - x1, -1, p) % p

    x3 = (s**2 - x1 - x2) % p
    y3 = (s * (x1 - x3) - y1) % p
    return (x3, y3)`
        }
      }
    ],
    summaryTakeaways: [
      "Elliptic curve points $E(F) \\cup \\{\\mathcal{O}\\}$ form an abelian group via Chord-and-Tangent addition.",
      "Hasse's Theorem bounds point count $|\\#E(\\mathbb{F}_p) - (p+1)| \\le 2 \\sqrt{p}$.",
      "ECC 256-bit key sizes provide equivalent security to 2048-bit RSA with massive computational savings."
    ]
  },

  "ecdh-ecdsa-protocols": {
    slug: "ecdh-ecdsa-protocols",
    sections: [
      {
        id: "ecdh-protocol",
        title: "Elliptic Curve Diffie-Hellman (ECDH)",
        content: "ECDH translates Diffie-Hellman key exchange to elliptic curve groups. Given domain parameters $(E, G, n, h)$ where $G$ is a base point of prime order $n$, Alice picks private key $d_A \\in_R [1, n-1]$ and publishes public key point $Q_A = d_A G$. Bob picks $d_B$ and publishes $Q_B = d_B G$. Shared point $S = d_A Q_B = d_A (d_B G) = d_B (d_A G) = d_B Q_A$.",
        callout: {
          type: "definition",
          title: "secp256k1 Domain Parameters",
          content: "Bitcoin and Ethereum utilize curve secp256k1: $y^2 = x^3 + 7 \\pmod p$ with 256-bit prime $p = 2^{256} - 2^{32} - 977$. It features efficient point doubling and endomorphisms."
        }
      },
      {
        id: "ecdsa-signatures",
        title: "Elliptic Curve Digital Signature Algorithm (ECDSA)",
        content: "To sign message hash $e = H(m)$ using private key $d$, select random nonce $k \\in_R [1, n-1]$. Compute point $(x_1, y_1) = k G$ and let $r = x_1 \\pmod n$. Compute $s = k^{-1} (e + r \\cdot d) \\pmod n$. Signature pair is $(r, s)$. Verification evaluates $u_1 = e s^{-1} \\pmod n, u_2 = r s^{-1} \\pmod n$ and checks $x_1 \\pmod n = r$ for $(x_1, y_1) = u_1 G + u_2 Q$.",
        callout: {
          type: "warning",
          title: "Deterministic Nonces (RFC 6979)",
          content: "To eliminate catastrophic vulnerabilities from bad random number generators (RNGs), RFC 6979 derives the ECDSA nonce $k$ deterministically via HMAC-SHA256 from the private key and message."
        }
      }
    ],
    summaryTakeaways: [
      "ECDH achieves shared key agreement with $8\\times$ smaller keys than classical DH.",
      "ECDSA produces compact signatures $(r, s)$ powering modern SSL/TLS and blockchains.",
      "RFC 6979 deterministic nonce generation prevents key leaks from RNG failures."
    ]
  },

  "pairing-based-cryptography": {
    slug: "pairing-based-cryptography",
    sections: [
      {
        id: "bilinear-pairings",
        title: "Bilinear Pairings & Weil/Tate Pairings",
        content: "A bilinear pairing is a map $e: G_1 \\times G_2 \\to G_T$ between elliptic curve subgroups $G_1, G_2$ and a multiplicative target group $G_T$ satisfying Bilinearity $e(a P, b Q) = e(P, Q)^{a b}$ and Non-degeneracy $e(P, Q) \\ne 1$. Weil and Tate pairings construct these maps over pairing-friendly curves (e.g. BN-254 or BLS12-381).",
        callout: {
          type: "theorem",
          title: "BLS Short Digital Signatures (Boneh-Lynn-Shacham)",
          content: "BLS signature scheme allows signing $m$ into curve point $H(m) \\in G_1$ via $\\sigma = d \\cdot H(m)$. Anyone verifies signature $\\sigma$ using public key $P = d G$ by checking pairing equality $e(\\sigma, G) = e(H(m), P)$."
        }
      },
      {
        id: "advanced-curves",
        title: "Edwards Curves & Ed25519",
        content: "Twisted Edwards curves $a x^2 + y^2 = 1 + d x^2 y^2$ (such as Ed25519) provide complete addition formulas without exceptional points, eliminating side-channel timing leaks associated with point doubling vs point addition.",
        callout: {
          type: "historical",
          title: "Identity-Based Encryption (IBE)",
          content: "In 2001, Dan Boneh and Matthew Franklin used bilinear pairings to construct the first practical Identity-Based Encryption (IBE) scheme, where a user's public key is their email address."
        }
      }
    ],
    summaryTakeaways: [
      "Bilinear pairings $e(aP, bQ) = e(P, Q)^{ab}$ enable advanced multi-party cryptosystems.",
      "BLS signatures enable non-interactive signature aggregation used in consensus protocols.",
      "Ed25519 complete Edwards curve addition resists side-channel timing attacks."
    ]
  }
}

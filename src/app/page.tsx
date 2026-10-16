import { PageHeader, Section, Callout } from "@/components/course"

export default function Home() {
  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <PageHeader
        title="Mathematics of Cryptography"
        description="A modern course on foundational number theory, abstract algebra, and modern cryptographic protocols."
        badge="CS / MATH 401"
      />

      <Section title="Course Primitives Showcase" description="Testing design system callouts and layout containers">
        <div className="space-y-4">
          <Callout type="definition" title="Group Theory">
            A group (G, *) is a set G with a binary operation * satisfying closure, associativity, identity, and inverses.
          </Callout>

          <Callout type="theorem" title="Fermat's Little Theorem">
            If p is a prime number and a is an integer not divisible by p, then a^(p-1) ≡ 1 (mod p).
          </Callout>

          <Callout type="warning" title="Security Notice">
            Do not implement custom cryptographic primitives in production systems. Always use standard libraries.
          </Callout>

          <Callout type="historical" title="RSA Cryptosystem">
            RSA was publicly described in 1977 by Ron Rivest, Adi Shamir, and Leonard Adleman at MIT.
          </Callout>

          <Callout type="tip" title="Study Tip">
            Master Modular Arithmetic and the Extended Euclidean Algorithm before moving to RSA and Diffie-Hellman.
          </Callout>
        </div>
      </Section>
    </div>
  )
}

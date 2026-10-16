import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Shield, BookOpen, Key, Cpu, Award } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-16 py-12 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium bg-muted/50">
          <Shield className="h-3.5 w-3.5 text-primary" />
          MATH 401 — Foundational & Post-Quantum Cryptography
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Mathematics of Cryptography
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore the mathematical bedrock of secure communication — from classical modular arithmetic and RSA to elliptic curves and lattice-based post-quantum algorithms.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button asChild size="lg">
            <Link href="/modules">Explore Modules</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/prerequisites">Check Prerequisites</Link>
          </Button>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold">Course Highlights</h2>
          <p className="text-muted-foreground">Core pillars covered in this curriculum</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <BookOpen className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Number Theory</CardTitle>
              <CardDescription>
                Modular arithmetic, prime generation, Euclidean algorithm, and CRT.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Key className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Public-Key Crypto</CardTitle>
              <CardDescription>
                RSA, Diffie-Hellman, ElGamal, and Discrete Logarithm Problems.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Cpu className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Elliptic Curves</CardTitle>
              <CardDescription>
                Group law on curves, ECDH, ECDSA, and pairing-based cryptography.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Award className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-lg">Post-Quantum</CardTitle>
              <CardDescription>
                Lattice-based cryptography, Learning With Errors (LWE), and NTRU.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  )
}

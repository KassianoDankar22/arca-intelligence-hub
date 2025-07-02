import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-center">
      <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
        Bem-vindo à <span className="text-primary">Arca Intelligence</span>
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
        Sua plataforma completa para criatividade e gestão de projetos.
      </p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Button asChild className="rounded-xl px-6 py-3 text-lg">
          <Link href="/login">Fazer Login</Link>
        </Button>
      </div>
    </main>
  )
}

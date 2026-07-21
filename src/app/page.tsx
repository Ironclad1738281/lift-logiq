import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-emerald-400">
          Train smarter
        </p>

        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
          LiftLogIQ
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Track your workouts, monitor recovery, and identify injury-risk
          patterns before they slow down your progress.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/workouts/new"
            className="rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Log a workout
          </Link>

          <Link
            href="/dashboard"
            className="rounded-lg border border-slate-600 px-6 py-3 font-semibold hover:bg-slate-800"
          >
            View dashboard
          </Link>

          <Link
            href="/recovery/new"
            className="rounded-lg border border-emerald-500 px-6 py-3 font-semibold text-emerald-400 hover:bg-emerald-950"
          >
            Recovery check-in
          </Link>

        </div>
      </section>
    </main>
  );
}
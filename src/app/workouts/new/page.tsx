import Link from "next/link";

export default function NewWorkoutPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <section className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
        >
          ← Back home
        </Link>

        <h1 className="mt-6 text-4xl font-bold">Log a workout</h1>

        <p className="mt-3 text-slate-300">
          Record an exercise and the training details for your session.
        </p>

        <form className="mt-10 space-y-6">
          <div>
            <label
              htmlFor="exercise"
              className="mb-2 block font-medium"
            >
              Exercise
            </label>

            <input
              id="exercise"
              name="exercise"
              type="text"
              placeholder="Bench press"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-emerald-400"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <label htmlFor="sets" className="mb-2 block font-medium">
                Sets
              </label>

              <input
                id="sets"
                name="sets"
                type="number"
                min="1"
                placeholder="3"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="reps" className="mb-2 block font-medium">
                Reps
              </label>

              <input
                id="reps"
                name="reps"
                type="number"
                min="1"
                placeholder="8"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="weight" className="mb-2 block font-medium">
                Weight
              </label>

              <input
                id="weight"
                name="weight"
                type="number"
                min="0"
                placeholder="135"
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="rpe" className="mb-2 block font-medium">
              Intensity / RPE
            </label>

            <input
              id="rpe"
              name="rpe"
              type="number"
              min="1"
              max="10"
              placeholder="8"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-emerald-400"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Save workout
          </button>
        </form>
      </section>
    </main>
  );
}
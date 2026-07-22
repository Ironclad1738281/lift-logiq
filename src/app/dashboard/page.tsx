import Link from "next/link";

type Workout = {
  id: number;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  rpe: number;
  date: string;
};

type RecoveryCheckIn = {
  sleep: number;
  soreness: number;
  energy: number;
  painLevel: number;
};

const workouts: Workout[] = [
  {
    id: 1,
    exercise: "Bench Press",
    sets: 3,
    reps: 8,
    weight: 135,
    rpe: 8,
    date: "Today",
  },
  {
    id: 2,
    exercise: "Barbell Squat",
    sets: 4,
    reps: 6,
    weight: 185,
    rpe: 9,
    date: "Yesterday",
  },
  {
    id: 3,
    exercise: "Lat Pulldown",
    sets: 3,
    reps: 10,
    weight: 120,
    rpe: 7,
    date: "July 20",
  },
];

const recoveryCheckIns: RecoveryCheckIn[] = [
  {
    sleep: 7.5,
    soreness: 4,
    energy: 8,
    painLevel: 0,
  },
  {
    sleep: 6,
    soreness: 7,
    energy: 5,
    painLevel: 2,
  },
  {
    sleep: 7,
    soreness: 5,
    energy: 7,
    painLevel: 1,
  },
];

function calculateAverage(values: number[]) {
  const total = values.reduce((sum, value) => sum + value, 0);

  return Math.round((total / values.length) * 10) / 10;
}

export default function DashboardPage() {
  const weeklyVolume = workouts.reduce((total, workout) => {
    const exerciseVolume =
      workout.sets * workout.reps * workout.weight;

    return total + exerciseVolume;
  }, 0);

  const averageSleep = calculateAverage(
    recoveryCheckIns.map((checkIn) => checkIn.sleep),
  );

  const averageSoreness = calculateAverage(
    recoveryCheckIns.map((checkIn) => checkIn.soreness),
  );

  const averageEnergy = calculateAverage(
    recoveryCheckIns.map((checkIn) => checkIn.energy),
  );

  const recoveryStatus =
    averageSleep < 6.5 || averageSoreness >= 7
      ? "Elevated"
      : averageSleep < 7 || averageSoreness >= 5
        ? "Moderate"
        : "Low";

  const recoveryStatusClasses =
    recoveryStatus === "Elevated"
      ? "border-red-800 bg-red-950 text-red-300"
      : recoveryStatus === "Moderate"
        ? "border-amber-800 bg-amber-950 text-amber-300"
        : "border-emerald-800 bg-emerald-950 text-emerald-300";

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link
              href="/"
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
            >
              ← Back home
            </Link>

            <h1 className="mt-4 text-4xl font-bold">
              LiftLogIQ Dashboard
            </h1>

            <p className="mt-3 text-slate-300">
              Review your recent training, recovery, and workload.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/workouts/new"
              className="rounded-lg bg-emerald-500 px-5 py-3 font-semibold text-slate-950 hover:bg-emerald-400"
            >
              Log workout
            </Link>

            <Link
              href="/recovery/new"
              className="rounded-lg border border-slate-600 px-5 py-3 font-semibold hover:bg-slate-800"
            >
              Recovery check-in
            </Link>
          </div>
        </header>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Weekly volume</p>
            <p className="mt-2 text-3xl font-bold">
              {weeklyVolume.toLocaleString()} lbs
            </p>
          </article>

          <article className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Average sleep</p>
            <p className="mt-2 text-3xl font-bold">
              {averageSleep} hrs
            </p>
          </article>

          <article className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Average soreness</p>
            <p className="mt-2 text-3xl font-bold">
              {averageSoreness}/10
            </p>
          </article>

          <article className="rounded-xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Average energy</p>
            <p className="mt-2 text-3xl font-bold">
              {averageEnergy}/10
            </p>
          </article>
        </div>

        <section className="mt-8">
          <div
            className={`rounded-xl border p-6 ${recoveryStatusClasses}`}
          >
            <p className="text-sm font-medium uppercase tracking-wider">
              Current recovery status
            </p>

            <p className="mt-2 text-3xl font-bold">
              {recoveryStatus}
            </p>

            <p className="mt-2 text-sm">
              This temporary status is calculated from average sleep and
              soreness using mock recovery data.
            </p>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent workouts</h2>

            <Link
              href="/workouts/new"
              className="text-sm font-medium text-emerald-400 hover:text-emerald-300"
            >
              Add workout
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            {workouts.map((workout) => {
              const volume =
                workout.sets * workout.reps * workout.weight;

              return (
                <article
                  key={workout.id}
                  className="rounded-xl border border-slate-800 bg-slate-900 p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {workout.exercise}
                      </h3>

                      <p className="mt-1 text-slate-300">
                        {workout.sets} sets × {workout.reps} reps at{" "}
                        {workout.weight} lbs
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="font-medium">
                        {volume.toLocaleString()} lbs volume
                      </p>

                      <p className="mt-1 text-sm text-slate-400">
                        RPE {workout.rpe}/10 · {workout.date}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}
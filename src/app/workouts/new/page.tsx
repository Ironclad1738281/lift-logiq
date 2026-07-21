"use client";

import { useState } from "react";
import Link from "next/link";

type Workout = {
  id: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  rpe: number;
};

export default function NewWorkoutPage() {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [rpe, setRpe] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();

  setError("");
  setSuccessMessage("");

  const parsedSets = Number(sets);
  const parsedReps = Number(reps);
  const parsedWeight = Number(weight);
  const parsedRpe = Number(rpe);

  if (!exercise.trim()) {
    setError("Please enter an exercise name.");
    return;
  }

  if (parsedSets < 1 || parsedReps < 1) {
    setError("Sets and reps must both be at least 1.");
    return;
  }

  if (parsedWeight < 0) {
    setError("Weight cannot be negative.");
    return;
  }

  if (parsedRpe < 1 || parsedRpe > 10) {
    setError("RPE must be between 1 and 10.");
    return;
  }

  const workout: Workout = {
    id: crypto.randomUUID(),
    exercise: exercise.trim(),
    sets: parsedSets,
    reps: parsedReps,
    weight: parsedWeight,
    rpe: parsedRpe,
  };

  setWorkouts((currentWorkouts) => [workout, ...currentWorkouts]);

  console.log(workout);

  setSuccessMessage(`${workout.exercise} was added successfully.`);

  setExercise("");
  setSets("");
  setReps("");
  setWeight("");
  setRpe("");
}
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

        {error && (
            <p
                role="alert"
                className="mt-6 rounded-lg border border-red-800 bg-red-950 px-4 py-3 text-red-300"
            >
                {error}
            </p>
            )}

            {successMessage && (
            <p
                role="status"
                className="mt-6 rounded-lg border border-emerald-800 bg-emerald-950 px-4 py-3 text-emerald-300"
            >
                {successMessage}
            </p>
        )}

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
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
              required
              placeholder="Bench press"
              value={exercise}
              onChange={(event) => setExercise(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-emerald-400"
            />
          </div>
            <p className="text-sm text-slate-400">
              Current exercise: {exercise || "Nothing entered yet"}
            </p>
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <label htmlFor="sets" className="mb-2 block font-medium">
                Sets
              </label>

              <input
                id="sets"
                name="sets"
                type="number"
                required
                min="1"
                placeholder="3"
                value={sets}
                onChange = {(event)=> setSets(event.target.value)}
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
                required
                min="1"
                placeholder="8"
                value = {reps}
                onChange = {(event)=> setReps(event.target.value)}
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
                required
                min="0"
                placeholder="135"
                value = {weight}
                onChange = {(event)=> setWeight(event.target.value)}
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
              required
              min="1"
              max="10"
              placeholder="8"
              value = {rpe}
              onChange = {(event)=> setRpe(event.target.value)}
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

          <div className="mt-12">
            <h2 className="text-2xl font-bold">Workouts logged this session</h2>

            {workouts.length === 0 ? (
                <p className="mt-4 text-slate-400">
                No workouts have been logged yet.
                </p>
            ) : (
                <div className="mt-6 space-y-4">
                {workouts.map((workout) => (
                    <article
                    key={workout.id}
                    className="rounded-lg border border-slate-700 bg-slate-900 p-5"
                    >
                    <h3 className="text-lg font-semibold">{workout.exercise}</h3>

                    <p className="mt-2 text-slate-300">
                        {workout.sets} sets × {workout.reps} reps at {workout.weight} lbs
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                        RPE: {workout.rpe}/10
                    </p>
                    </article>
                ))}
                </div>
            )}
          </div>

      </section>
    </main>
  );
}
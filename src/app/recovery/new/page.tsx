"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

type RecoveryCheckIn = {
  id: string;
  sleep: number;
  soreness: number;
  energy: number;
  painLevel: number;
  painLocation: string;
};

export default function NewRecoveryCheckInPage() {
  const [sleep, setSleep] = useState("");
  const [soreness, setSoreness] = useState("");
  const [energy, setEnergy] = useState("");
  const [painLevel, setPainLevel] = useState("");
  const [painLocation, setPainLocation] = useState("");

  const [checkIns, setCheckIns] = useState<RecoveryCheckIn[]>([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccessMessage("");

    const parsedSleep = Number(sleep);
    const parsedSoreness = Number(soreness);
    const parsedEnergy = Number(energy);
    const parsedPainLevel = Number(painLevel);

    if (parsedSleep <= 0 || parsedSleep > 24) {
      setError("Sleep must be greater than 0 and no more than 24 hours.");
      return;
    }

    if (parsedSoreness < 1 || parsedSoreness > 10) {
      setError("Soreness must be between 1 and 10.");
      return;
    }

    if (parsedEnergy < 1 || parsedEnergy > 10) {
      setError("Energy must be between 1 and 10.");
      return;
    }

    if (parsedPainLevel < 0 || parsedPainLevel > 10) {
      setError("Pain level must be between 0 and 10.");
      return;
    }

    if (parsedPainLevel > 0 && !painLocation.trim()) {
      setError("Please enter a pain location when your pain level is above 0.");
      return;
    }

    const checkIn: RecoveryCheckIn = {
      id: crypto.randomUUID(),
      sleep: parsedSleep,
      soreness: parsedSoreness,
      energy: parsedEnergy,
      painLevel: parsedPainLevel,
      painLocation: painLocation.trim(),
    };

    setCheckIns((currentCheckIns) => [checkIn, ...currentCheckIns]);

    setSuccessMessage("Recovery check-in was added successfully.");

    setSleep("");
    setSoreness("");
    setEnergy("");
    setPainLevel("");
    setPainLocation("");
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

        <h1 className="mt-6 text-4xl font-bold">Recovery check-in</h1>

        <p className="mt-3 text-slate-300">
          Record how your body feels today so LiftLogIQ can monitor your
          recovery.
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
            <label htmlFor="sleep" className="mb-2 block font-medium">
              Sleep hours
            </label>

            <input
              id="sleep"
              name="sleep"
              type="number"
              min="0.5"
              max="24"
              step="0.5"
              required
              placeholder="7.5"
              value={sleep}
              onChange={(event) => setSleep(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-emerald-400"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="soreness" className="mb-2 block font-medium">
                Soreness
              </label>

              <input
                id="soreness"
                name="soreness"
                type="number"
                min="1"
                max="10"
                required
                placeholder="5"
                value={soreness}
                onChange={(event) => setSoreness(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="energy" className="mb-2 block font-medium">
                Energy
              </label>

              <input
                id="energy"
                name="energy"
                type="number"
                min="1"
                max="10"
                required
                placeholder="7"
                value={energy}
                onChange={(event) => setEnergy(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="painLevel" className="mb-2 block font-medium">
                Pain level
              </label>

              <input
                id="painLevel"
                name="painLevel"
                type="number"
                min="0"
                max="10"
                required
                placeholder="0"
                value={painLevel}
                onChange={(event) => setPainLevel(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label htmlFor="painLocation" className="mb-2 block font-medium">
                Pain location
              </label>

              <input
                id="painLocation"
                name="painLocation"
                type="text"
                placeholder="Left shoulder"
                value={painLocation}
                onChange={(event) => setPainLocation(event.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Save check-in
          </button>
        </form>

        <div className="mt-12">
          <h2 className="text-2xl font-bold">
            Recovery check-ins this session
          </h2>

          {checkIns.length === 0 ? (
            <p className="mt-4 text-slate-400">
              No recovery check-ins have been logged yet.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {checkIns.map((checkIn) => (
                <article
                  key={checkIn.id}
                  className="rounded-lg border border-slate-700 bg-slate-900 p-5"
                >
                  <div className="grid gap-3 sm:grid-cols-2">
                    <p className="text-slate-300">
                      Sleep:{" "}
                      <span className="font-semibold text-white">
                        {checkIn.sleep} hours
                      </span>
                    </p>

                    <p className="text-slate-300">
                      Energy:{" "}
                      <span className="font-semibold text-white">
                        {checkIn.energy}/10
                      </span>
                    </p>

                    <p className="text-slate-300">
                      Soreness:{" "}
                      <span className="font-semibold text-white">
                        {checkIn.soreness}/10
                      </span>
                    </p>

                    <p className="text-slate-300">
                      Pain:{" "}
                      <span className="font-semibold text-white">
                        {checkIn.painLevel}/10
                      </span>
                    </p>
                  </div>

                  <p className="mt-3 text-sm text-slate-400">
                    Pain location: {checkIn.painLocation || "None reported"}
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
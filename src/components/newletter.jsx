import { CalendarDaysIcon, HandRaisedIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { subscribeToNewsletter } from "../services/NewsletterService";
import { motion } from "framer-motion";

export default function NewLetter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  useEffect(() => {
    let timer;
    if (status) {
      timer = setTimeout(() => {
        setStatus(null);
      }, 20000); 
    }
    return () => clearTimeout(timer);
  }, [status]);

  const handleSubscribe = async () => {
    const result = await subscribeToNewsletter(email);
    setStatus(result.success ? "success" : "error");
    if (result.success) setEmail("");
  };
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-white">
              Restez informé avec Buyticle
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Inscrivez-vous à notre newsletter pour recevoir les dernières
              actualités, offres exclusives et mises à jour de la marketplace
              Buyticle.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Adresse email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Votre adresse email"
                autoComplete="email"
                className="min-w-0 flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                onClick={handleSubscribe}
                className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                S'inscrire
              </button>
            </div>
          </div>

          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex justify-center w-full"
            >
              <div className="flex items-center gap-2 bg-green-100 text-green-800 border border-green-300 rounded-lg px-6 py-3 shadow-sm text-base h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Merci pour votre inscription à la newsletter Buyticle !
              </div>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex justify-center w-full"
            >
              <div className="flex items-center gap-2 bg-red-100 text-red-800 border border-red-300 rounded-lg px-6 py-3 shadow-sm text-base h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Une erreur est survenue. Veuillez réessayer.
              </div>
            </motion.div>
          )}
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <CalendarDaysIcon
                  aria-hidden="true"
                  className="size-6 text-white"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">
                Actualités et Mises à Jour
              </dt>
              <dd className="mt-2 text-base/7 text-gray-400">
                Restez informé des dernières fonctionnalités et améliorations de
                la marketplace Buyticle.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                <HandRaisedIcon
                  aria-hidden="true"
                  className="size-6 text-white"
                />
              </div>
              <dt className="mt-4 text-base font-semibold text-white">
                Pas de spam
              </dt>
              <dd className="mt-2 text-base/7 text-gray-400">
                Nous ne partageons pas vos informations et ne vous enverrons que
                du contenu pertinent.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
        />
      </div>
    </div>
  );
}

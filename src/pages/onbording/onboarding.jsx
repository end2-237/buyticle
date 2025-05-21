import { useState } from "react";
import Navigation from "../../nav";
import { FaLock, FaPerson, FaShop } from "react-icons/fa6";
import { FaArrowRight, FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FiInfo } from "react-icons/fi";

export default function OnboardingPage() {
  const [active, setActive] = useState(1);
  const categories = [
    "Accessiores",
    "Beaute",
    "Electronique",
    "Vetement",
    "Ammeublement",
    "Cosmetique",
  ];
  const [selectedList, setSelectedList] = useState([]);

  const navigate = useNavigate();

  const activate = (key) => {
    setActive(key);
  };

  const addToSelectedList = (value) => {
    setSelectedList((prev) => {
      if (prev.includes(value)) {
        return prev; // déjà sélectionné
      }
      if (prev.length >= 3) {
        return prev; // limite atteinte
      }
      return [...prev, value];
    });
  };

  const removeFromSelectedList = (value) => {
    setSelectedList((prev) => prev.filter((item) => item !== value));
  };

  // Remplace toute la structure du return par celle-ci

return (
  <div className="w-full">
    <Navigation />
    <div className="flex flex-col items-center px-4 md:px-8">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-5xl font-bold mt-5">Enregistrer votre boutique</h1>
        <p className="text-gray-500 text-sm mt-4">
          Enregistrer votre boutique en quelques étapes
        </p>
      </div>

      {/* Onboarding bar */}
      {/* Onboarding bar responsive */}
<div className="relative w-full max-w-4xl mx-auto mt-6 px-6">
  {/* Ligne de progression */}
  <div className="relative w-full h-[5px] bg-gradient-to-r from-green-900 to-green-200 rounded-full"></div>

  {/* Étape 1 */}
  <div className="absolute top-1/2 left-[15%] transform -translate-x-1/2 -translate-y-1/2">
    {active === 1 ? (
      <div className="relative size-12 rounded-full bg-green-900 flex items-center justify-center text-white text-xl font-semibold">
        <div className="absolute size-10 rounded-full bg-white flex items-center justify-center">
          <div className="size-8 rounded-full bg-green-900 flex items-center justify-center text-white">
            1
          </div>
        </div>
      </div>
    ) : (
      <button
        onClick={() => activate(1)}
        className="size-9 rounded-full bg-green-900 flex items-center justify-center text-white text-xl font-semibold"
      >
        1
      </button>
    )}
  </div>

  {/* Étape 2 */}
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    {active === 2 ? (
      <div className="relative size-12 rounded-full bg-gradient-to-r from-green-900 to-green-600 flex items-center justify-center text-white text-xl font-semibold">
        <div className="absolute size-10 rounded-full bg-white flex items-center justify-center">
          <div className="size-8 rounded-full bg-gradient-to-r from-green-900 to-green-600 flex items-center justify-center text-white">
            2
          </div>
        </div>
      </div>
    ) : (
      <button
        onClick={() => activate(2)}
        className="size-9 rounded-full bg-gradient-to-r from-green-900 to-green-600 flex items-center justify-center text-white text-xl font-semibold"
      >
        2
      </button>
    )}
  </div>

  {/* Étape 3 */}
  <div className="absolute top-1/2 right-[15%] transform translate-x-1/2 -translate-y-1/2">
    {active === 3 ? (
      <div className="relative size-12 rounded-full bg-gradient-to-r from-green-800 to-green-500 flex items-center justify-center text-white text-xl font-semibold">
        <div className="absolute size-10 rounded-full bg-white flex items-center justify-center">
          <div className="size-8 rounded-full bg-gradient-to-r from-green-800 to-green-500 flex items-center justify-center text-white">
            3
          </div>
        </div>
      </div>
    ) : (
      <button
        onClick={() => activate(3)}
        className="size-9 rounded-full bg-gradient-to-r from-green-800 to-green-500 flex items-center justify-center text-white text-xl font-semibold"
      >
        3
      </button>
    )}
  </div>
</div>


      {/* Étape 1 */}
      {active === 1 && (
        <div className="w-full flex flex-col items-center mt-10 text-gray-500 px-4">
          <div className="text-center">
            <h1 className="text-gray-700 font-semibold text-xl">Qui êtes-vous?</h1>
            <p>
              Quel est le nom de votre boutique.
              <span className="text-xs text-gray-400 block">
                Il s'affichera dans l'application tel que vous l’aurez écrit
              </span>
            </p>
          </div>

          <div className="flex justify-center mt-5 w-full max-w-sm">
            <div className="flex gap-2 items-center p-4 border rounded-lg w-full">
              <label htmlFor="shop" className="cursor-pointer">
                <FaShop />
              </label>
              <div className="h-5 w-[1px] bg-gray-300 mx-2"></div>
              <input
                type="text"
                placeholder="SaraShop"
                className="flex-grow outline-none"
                id="shop"
              />
            </div>
          </div>

          <div className="text-center mt-8">
            <h1 className="text-gray-700 font-semibold text-xl">Que voulez-vous vendre?</h1>
            <p>
              Quel est votre type d'activité.
              <span className="text-xs text-gray-400 block">
                Fabriquez-vous vous-même vos produits
              </span>
            </p>
          </div>

          <div className="flex flex-col items-center mt-5">
            <div className="flex flex-col gap-2 w-60">
              <label className="flex items-center gap-3">
                <input type="radio" name="type" className="radio checked:bg-green-900" defaultChecked />
                Je vend mes produits
              </label>
              <label className="flex items-center gap-3">
                <input type="radio" name="type" className="radio checked:bg-green-900" />
                Je suis revendeur
              </label>
            </div>
          </div>

          <button
            onClick={() => setActive(2)}
            className="btn rounded-full w-40 mt-5 bg-green-900 text-white hover:bg-green-700"
          >
            Suivant <FaArrowRight />
          </button>
        </div>
      )}

      {/* Étape 2 */}
      {active === 2 && (
        <div className="w-full flex flex-col items-center mt-10 text-gray-500 px-4">
          <div className="text-center">
            <h1 className="text-gray-700 font-semibold text-xl">Choisissez votre catégorie</h1>
            <p>
              Vous pouvez en choisir plusieurs (3 max).
              <span className="text-xs text-gray-400 block">
                Il s'affichera tel que vous l’aurez écrit
              </span>
            </p>
          </div>

          <div className="mt-5 w-full max-w-sm">
            <div className="flex flex-wrap gap-2 items-center p-3 border rounded-lg">
              <FaShoppingBag />
              <div className="h-5 w-[1px] bg-gray-300 mx-2"></div>
              <div className="flex flex-wrap gap-2">
                {selectedList.map((categorie) => (
                  <CustomBadge
                    key={categorie}
                    name={categorie}
                    close
                    onClose={() => removeFromSelectedList(categorie)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full max-w-xl flex flex-wrap justify-center gap-2 mt-8 px-4">
            {categories.map((categorie) => (
              <CustomBadge key={categorie} name={categorie} onClick={() => addToSelectedList(categorie)} />
            ))}
          </div>

          <button
            onClick={() => setActive(3)}
            className="btn rounded-full w-40 mt-5 bg-green-900 text-white hover:bg-green-700"
          >
            Suivant <FaArrowRight />
          </button>
        </div>
      )}

      {/* Étape 3 */}
      {active === 3 && (
        <div className="w-full flex flex-col items-center mt-10 text-gray-500 px-4">
          <div className="text-center">
            <h1 className="text-gray-700 font-semibold text-xl flex justify-center items-center gap-2">
              Entrez vos informations de connexion <FaLock />
            </h1>
            <p>
              Vous vous en servirez pour vous connecter.
              <span className="text-xs text-gray-400 block">Ne les partagez surtout pas!</span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-5 w-full max-w-2xl">
            <div className="flex gap-2 items-center p-4 border rounded-lg w-full">
              <FaPerson />
              <div className="h-5 w-[1px] bg-gray-300 mx-2"></div>
              <input
                type="email"
                placeholder="buyticle@gmail.com"
                className="flex-grow outline-none"
                id="login"
              />
            </div>
            <div className="flex gap-2 items-center p-4 border rounded-lg w-full">
              <FaLock />
              <div className="h-5 w-[1px] bg-gray-300 mx-2"></div>
              <input
                type="password"
                placeholder="**************"
                className="flex-grow outline-none"
                id="password"
              />
            </div>
          </div>

          <div className="text-center mt-5">
            <p>Cliquez sur terminé pour finaliser votre enregistrement.</p>
            <div className="flex justify-center items-center gap-2 mt-1">
              <FiInfo />
              <span className="text-xs text-gray-400">
                Un email de confirmation vous sera envoyé
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center mt-5">
            <button
              onClick={() => navigate("/pricing")}
              className="btn rounded-full w-40 bg-green-900 text-white hover:bg-green-700"
            >
              Terminé <FaArrowRight />
            </button>
            <span className="text-xs text-gray-400 mt-2">
              Profitez de l'expérience buyticle
            </span>
          </div>
        </div>
      )}
    </div>
  </div>
);

}

export function CustomBadge({ name, close = false, onClick, onClose }) {
  return (
    <button
      onClick={onClick}
      className="badge p-4 px-5 bg-gray-100 border border-1 border-gray-300 flex gap-2 items-center"
    >
      <span>{name}</span>
      {close ? (
        <svg
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          className="size-4 cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : null}
    </button>
  );
}

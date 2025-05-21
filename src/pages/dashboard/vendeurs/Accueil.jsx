import { useState } from "react";
import { FaShoppingBag } from "react-icons/fa";
import { FaLocationCrosshairs, FaWallet } from "react-icons/fa6";
import { FiArrowRight, FiClock } from "react-icons/fi";
export default function Accuiel() {
  const actions = [
    {
      name: "Creer votre premier produit",
      description:
        "Demarer les ventes en creant vos premier produits sur la platform. !Contactez l'assistance pour des conseils de ventes.",
      action: "Ajouter un produit",
      color: "bg-green-200",
      icon: <FaShoppingBag className="text-green-200"/>
    },
    {
      name: "Configurer votre adresse",
      description:
        "Configurer votre adresse en quelques clique pour pouvoir faire livrervos produits.",
      action: "Configurer",
      color: "bg-yellow-200",
      icon: <FaLocationCrosshairs className="text-yellow-200"/>
    },
    {
      name: "Configurer votre portefeuille",
      description:
        "Configurer votre portefeuille de payement pour effectuer des payement en toute securite.",
      action: "Mon portefeuille",
      color: "bg-blue-200",
      icon: <FaWallet className="text-blue-200"/>
    },
  ];
  return (
    <div className="">
      {/* header */}
      <div className="shadow-sm max-w-full w-auto flex justify-between ">
        <h2 className="text-3xl font-bold mb-4">Tableau de bord</h2>

        {/* promo */}
        <div className="badge border-none rounded-md p-5 px-6 w-auto text-md font-semibold text-gray-400 flex gap-4 items-center">
          <div className="text-green-500 p-2 bg-green-100 rounded-full border border-green-200 flex justify-center items-center">
            <FiClock className="animate-spin duration-800 delay-150" />
          </div>
          <span>Creer votre equipe sur buyticle dashboard</span>
        </div>
      </div>

      {/* Titre deux */}
      <div className="flex flex-col">
        <h1 className="mx-2 mt-2 text-sm text-gray-450 font-semibold">
          Votre marketplace <span className="text-green-700">Buyticle</span>{" "}
          vous accompagne partout
        </h1>
        {/* Action rapide */}
        <div className="cards mt-4 grid grid-cols-3 gap-4 max-w-full ">
          {/* action */}
          {actions.map((action, idx) => (
            <div className="card border">
              <div className="card-body">
                <div className="flex gap-2 items-center">
                  
                {action.icon}
                <div className={`h-6 w-2 ${action.color} rounded-md`}></div>
                  <h1 className="text-xl font-semibold text-gray-500">{idx+1}</h1>
                  <span className="font-semibold text-gray-600">
                    {action.name}
                  </span>
                </div>
                <div className="divide w-full h-[1px] bg-gray-200"></div>

                <p>
                  {action.description}
                </p>

                <button className="btn btn-outline">
                 {action.action} <FiArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

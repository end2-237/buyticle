import { button } from "framer-motion/client";
import { useState } from "react";
import { AiFillShop } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";
import { FaInfo } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { FiArrowRight, FiInfo } from "react-icons/fi";

export default function Parametres() {
  const [activeTab, setActiveTab] = useState("Generale");

  const tabs = ["Generale", "Ma formule", "Profile"];

  const activedTab = (name) => {
    setActiveTab(name);
  };

  const plans = [
    {
      name: "Basic",
      prix: "6000",
      delai: "1 Mois",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur id ducimus sint. Tempore illum corporis cum voluptas deleniti maxime itaque.",
      action: "Choisir maitenant",
      active: true,
    },
    {
      name: "Pro",
      prix: "12000",
      delai: "3 Mois",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur id ducimus sint. Tempore illum corporis cum voluptas deleniti maxime itaque.",
      action: "Choisir maitenant",
      active: false,
    },
    {
      name: "Premium",
      prix: "50000",
      delai: "6 Mois",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur id ducimus sint. Tempore illum corporis cum voluptas deleniti maxime itaque.",
      action: "Choisir maitenant",
      active: false,
    },
  ];
  const [hiddenTools, setHiddenTools] = useState(["hidden", "hidden"]);

  const toggleToolVisibility = (index) => {
    setHiddenTools((prev) =>
      prev.map((v, i) => (i === index ? (v === "hidden" ? "" : "hidden") : v))
    );
  };
  

  const renderTab = () => {
    switch (activeTab) {
      case "Generale":
        return (
          <div className="flex flex-col">
            {/* header */}
            <div className=" flex justify-between">
              {/* text */}
              <div className="">
                <h1 className="text-gray-600 font-semibold text-2xl">
                  Informations de votre boutique
                </h1>
                <span className="flex items-center  gap-2 text-gray-400 text-sm">
                  <FaBagShopping />
                  <p>
                    Toutes vos informations serons necessaires pour une
                    meilleure experience
                  </p>
                </span>
              </div>
              {/* box complet*/}

              <div className="card border rounded rounded-md p-3 w-60 flex flex-col">
                <div className="flex gap-2 items-center">
                  <span className="font-semibold">Progression</span>
                  <FiInfo />
                </div>
              </div>
            </div>

            {/* body */}
            <div className="flex mt-4 gap-6">
              <div className="w-3/5  grid grid-cols-2 gap-4">
                <div className="card border p-4 rounded-md col-span-2">
                  <div className="flex gap-3 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <div className="flex justify-center items-center border size-10 rounded-md">
                        {" "}
                        <FaInfo className="text-primary" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold">
                          Informations basic
                        </span>
                        <p className="text-xs text-gray-400">
                          Configurer le nom de votre boutique etc
                        </p>
                      </div>
                    </div>
                    {hiddenTools[0] === "hidden" ? (
                      <button
                        onClick={() => toggleToolVisibility(0)}
                      >
                        <FiArrowRight />
                      </button>
                    ) : (
                      <button className="text-xs py-1 border rounded rounded-md p-3">
                        Edit
                      </button>
                    )}
                  </div>

                  {/* details */}
                  <div className={`${hiddenTools[0]}`}>
                    <div className="divide h-[1px] bg-gray-100 mt-2"></div>

                    <div className="grid grid-cols-4 mt-2">
                      <div className="flex gap-2 items-center">
                        <div className="divide h-8 w-[2px] bg-gray-100"></div>
                        <div className="">
                          <span className="text-xs text-gray-400 flex flex-col">
                            Nom de la boutique
                          </span>
                          <span className="font-semibold ">ForeverShop</span>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="divide h-8 w-[2px] bg-gray-100"></div>
                        <div className="">
                          <span className="text-xs text-gray-400 flex flex-col">
                            Categorie de la boutique
                          </span>
                          <span className="font-semibold ">
                            Vetement & Accessoires
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="divide h-8 w-[2px] bg-gray-100"></div>
                        <div className="">
                          <span className="text-xs text-gray-400 flex flex-col">
                            Numero de contact
                          </span>
                          <span className="font-semibold ">+237696995879</span>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="divide h-8 w-[2px] bg-gray-100"></div>
                        <div className="">
                          <span className="text-xs text-gray-400 flex flex-col">
                            Adresse
                          </span>
                          <span className="font-semibold ">Makepe</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`card  ${
                    hiddenTools[1] === "hidden" ? "" : "row-span-3"
                  }  border p-4 rounded-md`}
                >
                  <div className="flex gap-3 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <div className="flex justify-center items-center border size-10 rounded-md">
                        {" "}
                        <CgFileDocument className="text-primary" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold ">
                          A propos de votre business
                        </span>
                        <p className="text-xs text-gray-400">
                          Donner des specifications
                        </p>
                      </div>
                    </div>
                    {hiddenTools[1] === "hidden" ? (
                      <button
                        onClick={() => toggleToolVisibility(1)}
                      >
                        <FiArrowRight />
                      </button>
                    ) : (
                      <button className="text-xs py-1 border rounded rounded-md p-3">
                        Edit
                      </button>
                    )}
                  </div>

                  {/* details */}
                  <div className={`${hiddenTools[1]}`}>
                    <div className="divide h-[1px]  bg-gray-200 mt-2 mb-4"></div>
                    <div className="flex gap-2 items-center">
                      <div className="divide w-[1px] bg-gray-200 h-full"></div>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs text-gray-400">
                          Description
                        </span>
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Aperiam necessitatibus vero unde omnis ducimus
                          eligendi repudiandae reiciendis facere illo sit.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card border p-4 rounded-md">
                  <div className="flex gap-3 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <div className="flex justify-center items-center border size-10 rounded-md">
                        {" "}
                        <CiLocationOn className="text-primary" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold ">
                          Adresse de votre boutique
                        </span>
                        <p className="text-xs text-gray-400">
                          Donner des specifications
                        </p>
                      </div>
                    </div>
                    <FiArrowRight />
                  </div>
                </div>
                <div className="card border p-4 rounded-md">
                  <div className="flex gap-3 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <div className="flex justify-center items-center border size-10 rounded-md">
                        {" "}
                        <CgFileDocument className="text-primary" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold ">
                          A propos de votre business
                        </span>
                        <p className="text-xs text-gray-400">
                          Donner des specifications
                        </p>
                      </div>
                    </div>
                    <FiArrowRight />
                  </div>
                </div>
                <div className="card border p-4 rounded-md">
                  <div className="flex gap-3 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <div className="flex justify-center items-center border size-10 rounded-md">
                        {" "}
                        <CgFileDocument className="text-primary" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold ">
                          A propos de votre business
                        </span>
                        <p className="text-xs text-gray-400">
                          Donner des specifications
                        </p>
                      </div>
                    </div>
                    <FiArrowRight />
                  </div>
                </div>
                <div className="card border p-4 rounded-md">
                  <div className="flex gap-3 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <div className="flex justify-center items-center border size-10 rounded-md">
                        {" "}
                        <CgFileDocument className="text-primary" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold ">
                          A propos de votre business
                        </span>
                        <p className="text-xs text-gray-400">
                          Donner des specifications
                        </p>
                      </div>
                    </div>
                    <FiArrowRight />
                  </div>
                </div>
                <div className="card border p-4 rounded-md">
                  <div className="flex gap-3 items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <div className="flex justify-center items-center border size-10 rounded-md">
                        {" "}
                        <CgFileDocument className="text-primary" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold ">
                          A propos de votre business
                        </span>
                        <p className="text-xs text-gray-400">
                          Donner des specifications
                        </p>
                      </div>
                    </div>
                    <FiArrowRight />
                  </div>
                </div>
              </div>

              <div className="w-2/5 border rounded rounded-md p-5">
              {/* header */}
                <div className="flex gap-3 items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <div className="flex justify-center items-center border size-10 rounded-md">
                      {" "}
                      <FaInfo className="text-primary" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold">Informations basic</span>
                      <p className="text-xs text-gray-400">
                        Configurer le nom de votre boutique etc
                      </p>
                    </div>
                  </div>
                  <button className=" btn border  rounded rounded-md text-sm text-gray-500">
                    Sauvegarder
                  </button>
                </div>
                {/* body */}
                <div className="mt-3">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className="text-gray-500 text-sm">Nom de votre boutique</label>
                        <div className=" border p-1 px-4 rounded rounded-md flex items-center"><AiFillShop className="text-gray-500"/>
                        <input type="text" className="w-full p-3 outline-none" /></div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Ma formule":
        return (
          <div className="flex flex-col">
            {/* header */}
            <div className="">
              <h1 className="text-gray-600 font-semibold text-2xl">
                Ma formule
              </h1>
              <span className="flex items-center  gap-2 text-gray-400 text-sm">
                <FiInfo />
                <p>
                  Ameliore votre formule pour bene ficie de meilleure avantages
                </p>
              </span>
            </div>
            {/* body */}

            {/* plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 ">
              {plans.map((plan, idx) => (
                <div
                  className={`card border rounded rounded-md flex flex-col justify-center p-6 text-center gap-4 shadow-sm ${
                    plan.name === "Pro" ? "border-primary" : ""
                  }`}
                >
                  {plan.name === "Pro" && (
                    <div className="badge text-white bg-gradient-to-r from-green-500 to-fuchsia-600 absolute top-4 right-4">
                      Plus Populaire
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span
                      className={`font-bold text-sm ${
                        plan.name === "Pro" ? "text-gray-400" : "text-gray-400 "
                      }`}
                    >
                      {plan.name}
                    </span>
                    <span className="font-semibold text-xl">
                      {plan.prix + " FCFA/" + plan.delai}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${
                      plan.name === "Pro" ? "text-gray-400" : "text-gray-400 "
                    }`}
                  >
                    {plan.description}
                  </p>
                  <button
                    className={`btn btn-outline border-gray-300 text-gray-400 font-bold text-sm ${
                      plan.name === "Pro"
                        ? "text-green-600 bg-white hover:bg-green-100 hover:text-gray-700"
                        : "text-gray-400 "
                    }`}
                  >
                    {plan.active ? "Plan Actif" : plan.action}
                  </button>
                </div>
              ))}
            </div>
            {/* compare plan details */}
          </div>
        );
      case "Profile":
        return <div>merci</div>;

      default:
        break;
    }
  };

  return (
    <div className="flex flex-col p-4">
      <span className="text-3xl font-semibold text-gray-500">
        Parametres de compte
      </span>
      {/* Tablist */}
      <div role="tablist" className=" flex gap-2 mt-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            onClick={() => activedTab(tab)}
            className={`tab  rounded rounded-md border text-gray-400 ${
              activeTab === tab ? "bg-gray-100 text-gray-600 font-semibold" : ""
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* content */}
      <section className="mt-4">{renderTab()}</section>
    </div>
  );
}

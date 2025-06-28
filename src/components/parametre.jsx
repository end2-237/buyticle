import { useState, useEffect } from "react";
import { AiFillShop } from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { CiLocationOn } from "react-icons/ci";
import { FaInfo } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function Parametres() {
  const [editMode, setEditMode] = useState([false, false, false, false]);

  const plans = [
    {
      name: "Basic",
      prix: "6000",
      delai: "1 Mois",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      action: "Choisir maitenant",
      active: true,
      features: {
        "Support client": "Email uniquement",
        "Produits maximum": "50",
        Stockage: "5 Go",
      },
    },
    {
      name: "Pro",
      prix: "12000",
      delai: "3 Mois",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      action: "Choisir maitenant",
      active: false,
      features: {
        "Support client": "Email + Téléphone",
        "Produits maximum": "200",
        Stockage: "20 Go",
      },
    },
    {
      name: "Premium",
      prix: "50000",
      delai: "6 Mois",
      description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
      action: "Choisir maitenant",
      active: false,
      features: {
        "Support client": "Prioritaire 24/7",
        "Produits maximum": "Illimité",
        Stockage: "100 Go",
      },
    },
  ];

  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => setUserLocation({ lat: 4.068, lng: 9.718 })
      );
    } else {
      setUserLocation({ lat: 4.068, lng: 9.718 });
    }
  }, []);

  const [shopInfo, setShopInfo] = useState({
    nom: "ForeverShop",
    categorie: "Vetement & Accessoires",
    contact: "+237696995879",
    adresse: "Makepe",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
  });

  const toggleEdit = (index) => {
    setEditMode((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  const handleChange = (field, value) => {
    setShopInfo((prev) => ({ ...prev, [field]: value }));
  };

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="mb-4 text-xl font-semibold text-gray-800">Paramètres</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-600 mb-4">
          Informations de votre boutique
        </h2>
        <span className="flex items-center gap-2 text-gray-400 text-sm mb-6">
          <FaBagShopping />
          <p>Toutes vos informations seront nécessaires pour une meilleure expérience</p>
        </span>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card border p-4 rounded-md col-span-2">
              <div className="flex gap-3 items-center justify-between">
                <div className="flex gap-3 items-center">
                  <div className="flex justify-center items-center border size-10 rounded-md">
                    <FaInfo className="text-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Informations basiques</span>
                    <p className="text-xs text-gray-400">Configurer le nom de votre boutique etc</p>
                  </div>
                </div>
                <button
                  className="text-xs py-1 border rounded-md p-3"
                  onClick={() => toggleEdit(0)}
                >
                  {editMode[0] ? "Sauvegarder" : <FiArrowRight />}
                </button>
              </div>
              {editMode[0] ? (
                <div className="mt-4 space-y-3">
                  {Object.entries({ nom: "Nom de la boutique", categorie: "Catégorie de la boutique", contact: "Numéro de contact", adresse: "Adresse" }).map(([key, label]) => (
                    <div key={key}>
                      <label className="text-xs text-gray-400 block mb-1">{label}</label>
                      <input
                        type="text"
                        className="border rounded p-2 w-full"
                        value={shopInfo[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="divide-y divide-gray-200 mt-4">
                  {Object.entries({ nom: "Nom de la boutique", categorie: "Catégorie de la boutique", contact: "Numéro de contact", adresse: "Adresse" }).map(([key, label]) => (
                    <div key={key} className="flex justify-between py-2">
                      <span className="text-gray-400 text-xs">{label}</span>
                      <span className="font-semibold">{shopInfo[key]}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card border p-4 rounded-md col-span-2">
              <div className="flex gap-3 items-center justify-between">
                <div className="flex gap-3 items-center">
                  <div className="flex justify-center items-center border size-10 rounded-md">
                    <CgFileDocument className="text-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">A propos de votre business</span>
                    <p className="text-xs text-gray-400">Donner des spécifications</p>
                  </div>
                </div>
                <button
                  className="text-xs py-1 border rounded-md p-3"
                  onClick={() => toggleEdit(1)}
                >
                  {editMode[1] ? "Sauvegarder" : <FiArrowRight />}
                </button>
              </div>
              {editMode[1] ? (
                <textarea
                  className="w-full mt-4 p-2 border rounded"
                  rows={5}
                  value={shopInfo.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              ) : (
                <p className="mt-4 text-gray-600">{shopInfo.description}</p>
              )}
            </div>

            <div className="card border p-4 rounded-md">
              <div className="flex gap-3 items-center justify-between">
                <div className="flex gap-3 items-center">
                  <div className="flex justify-center items-center border size-10 rounded-md">
                    <CiLocationOn className="text-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">Adresse de votre boutique</span>
                    <p className="text-xs text-gray-400">Donner des spécifications</p>
                  </div>
                </div>
                <FiArrowRight />
              </div>
            </div>
          </div>

          <div className="w-full md:w-2/5 border rounded-md p-5 mt-6 md:mt-0">
            <h3 className="font-semibold text-lg mb-4">Résumé de la boutique</h3>
            {Object.entries(shopInfo).map(([k, v]) => (
              <div className="mb-3" key={k}><strong>{k.charAt(0).toUpperCase() + k.slice(1)}:</strong> {v}</div>
            ))}
            <div className="h-60 w-full mt-4 rounded overflow-hidden">
              <LoadScript googleMapsApiKey="AIzaSyCL5Xr-TWf6i6wKJw5TkspiZRmhLFaG3rs">
                {userLocation && (
                  <GoogleMap mapContainerStyle={mapContainerStyle} center={userLocation} zoom={13}>
                    <Marker position={userLocation} />
                  </GoogleMap>
                )}
              </LoadScript>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-lg font-bold">Choisir votre formule</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {plans.map(({ name, prix, delai, description, action, active }) => (
            <div key={name} className={`card p-5 rounded-md border ${active ? "border-primary bg-primary/10" : "border-gray-300"}`}>
              <h3 className="font-bold">{name}</h3>
              <p>{description}</p>
              <p className="text-xl font-semibold mt-3">{prix} FCFA / {delai}</p>
              <button
                className={`mt-4 px-4 py-2 rounded ${active ? "bg-primary text-white" : "border border-primary text-primary"}`}
                onClick={() => alert(`Vous avez choisi la formule ${name}`)}
              >
                {action}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 border border-gray-300"></th>
                {plans.map(({ name }) => (
                  <th key={name} className="p-3 border border-gray-300 text-center font-semibold">{name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(plans[0].features).map((feature) => (
                <tr key={feature} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-300 font-medium">{feature}</td>
                  {plans.map(({ features, name }) => (
                    <td key={name + feature} className="p-3 border border-gray-300 text-center">{features[feature]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Modifier votre profil</h2>
        <form onSubmit={(e) => { e.preventDefault(); alert("Profil sauvegardé !"); }} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom complet</label>
            <input type="text" className="mt-1 block w-full rounded border border-gray-300 p-2" defaultValue="Jean Dupont" name="fullname" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" className="mt-1 block w-full rounded border border-gray-300 p-2" defaultValue="jean.dupont@email.com" name="email" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input type="password" className="mt-1 block w-full rounded border border-gray-300 p-2" name="password" />
          </div>
          <button type="submit" className="rounded bg-primary px-4 py-2 text-white hover:bg-primary-dark">Sauvegarder le profil</button>
        </form>
      </section>
    </div>
  );
}

import React, { useState, useMemo } from "react";
import {
  FiChevronDown,
  FiPlusCircle,
  FiEdit,
  FiTrash2,
  FiEye,
  FiCopy,
  FiPause,
  FiPlay,
  FiSearch,
} from "react-icons/fi";
import { FaCrown, FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const produitsInitial = [
  {
    id: 1,
    nom: "Montre Connectée Navy Blue",
    categorie: "Homme, Montre",
    prix: 230,
    stock: 500,
    vendu: 65,
    revenu: 14950,
    date: "2024-06-01",
    image: "https://via.placeholder.com/64",
    actif: true,
    createurMarque: true,
  },
  {
    id: 2,
    nom: "Sac à dos Bleu Gris",
    categorie: "Homme, Sac à dos",
    prix: 150,
    stock: 0,
    vendu: 74,
    revenu: 11100,
    date: "2024-05-15",
    image: "https://via.placeholder.com/64",
    actif: false,
    createurMarque: false,
  },
];

const CatalogueProduits = () => {
  const navigate = useNavigate();

  // States
  const [produits, setProduits] = useState(produitsInitial);
  const [recherche, setRecherche] = useState("");
  const [filtreStock, setFiltreStock] = useState("all"); // all, enStock, rupture
  const [filtreCreateur, setFiltreCreateur] = useState("all"); // all, oui, non
  const [tri, setTri] = useState({ champ: "date", ordre: "desc" });
  const [limiteProduits] = useState(50); // limite d'abonnement fictive

  // Calculs filtrage et tri
  const produitsFiltres = useMemo(() => {
    let filtered = [...produits];

    // Recherche nom/catégorie
    if (recherche.trim() !== "") {
      filtered = filtered.filter(
        (p) =>
          p.nom.toLowerCase().includes(recherche.toLowerCase()) ||
          p.categorie.toLowerCase().includes(recherche.toLowerCase())
      );
    }

    // Filtre stock
    if (filtreStock === "enStock") {
      filtered = filtered.filter((p) => p.stock > 0 && p.actif);
    } else if (filtreStock === "rupture") {
      filtered = filtered.filter((p) => p.stock === 0 || !p.actif);
    }

    // Filtre créateur de marque
    if (filtreCreateur === "oui") {
      filtered = filtered.filter((p) => p.createurMarque);
    } else if (filtreCreateur === "non") {
      filtered = filtered.filter((p) => !p.createurMarque);
    }

    // Tri
    filtered.sort((a, b) => {
      let valA, valB;
      switch (tri.champ) {
        case "prix":
          valA = a.prix;
          valB = b.prix;
          break;
        case "stock":
          valA = a.stock;
          valB = b.stock;
          break;
        case "vendu":
          valA = a.vendu;
          valB = b.vendu;
          break;
        case "revenu":
          valA = a.revenu;
          valB = b.revenu;
          break;
        case "date":
        default:
          valA = new Date(a.date);
          valB = new Date(b.date);
          break;
      }
      if (valA < valB) return tri.ordre === "asc" ? -1 : 1;
      if (valA > valB) return tri.ordre === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [produits, recherche, filtreStock, filtreCreateur, tri]);

  // Statistiques
  const totalRevenu = produits.reduce((acc, p) => acc + p.revenu, 0);
  const produitsActifs = produits.filter((p) => p.actif).length;
  const stockFaible = produits.filter(
    (p) => p.stock > 0 && p.stock < 10
  ).length;

  // Handlers
  const toggleTri = (champ) => {
    if (tri.champ === champ) {
      setTri({ champ, ordre: tri.ordre === "asc" ? "desc" : "asc" });
    } else {
      setTri({ champ, ordre: "asc" });
    }
  };

  const toggleActifProduit = (id) => {
    setProduits((prods) =>
      prods.map((p) => (p.id === id ? { ...p, actif: !p.actif } : p))
    );
  };

  const supprimerProduit = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce produit ?")) {
      setProduits((prods) => prods.filter((p) => p.id !== id));
    }
  };
  const produitsUtilises = produits.length;
  const produitsRestants = limiteProduits - produitsUtilises;

  const handleUpgrade = () => {
    alert("Redirection vers la page d'abonnement Premium");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-3">
      {/* Bloc de rappel quota et incitation premium */}
      <section className="bg-white border border-dashed rounded-xl shadow-sm p-4 px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4">
          <FaBoxOpen className="text-5xl text-gray-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              Votre catalogue de produits
            </h2>
            <p className="text-gray-600 text-sm max-w-md">
              Vous avez utilisé <strong>{produitsUtilises}</strong> sur{" "}
              <strong>{limiteProduits}</strong> produits autorisés.
              <br />
              Il vous reste <strong>{produitsRestants}</strong> places pour
              ajouter de nouveaux produits.
            </p>
          </div>
        </div>

        <button
          onClick={handleUpgrade}
          className="bg-gray-600 btn text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-700 transition"
          title="Passer à la formule Premium"
        >
          Passer à Premium
        </button>
      </section>

      {/* En-tête */}
      <header className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-gray-800">Mes Produits</h1>
          {/* Badge créateur de marque - on suppose que le vendeur est créateur s'il a au moins 1 produit createurMarque */}
          {produits.some((p) => p.createurMarque) && (
            <div className="flex items-center gap-1 bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full font-semibold text-sm select-none">
              <FaCrown /> Créateur de marque
            </div>
          )}
        </div>
        <button
          onClick={() => navigate("/dashboard/vendeur/produits/ajouter")}
          className="btn flex items-center gap-2 px-5 py-2 rounded-md hover:scale-105 transition-transform"
        >
          <FiPlusCircle size={20} /> Ajouter un produit
        </button>
      </header>

      {/* Statistiques */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
        <div className="bg-white rounded-lg p-5 shadow">
          <p className="text-sm font-semibold text-gray-500">Produits totaux</p>
          <p className="text-2xl font-bold text-gray-900">{produits.length}</p>
        </div>
        <div className="bg-white rounded-lg p-5 shadow">
          <p className="text-sm font-semibold text-gray-500">Produits actifs</p>
          <p className="text-2xl font-bold text-green-600">{produitsActifs}</p>
        </div>
        <div className="bg-white rounded-lg p-5 shadow">
          <p className="text-sm font-semibold text-gray-500">
            Revenu total généré
          </p>
          <p className="text-2xl font-bold text-blue-600">
            {totalRevenu.toLocaleString()} $
          </p>
        </div>
        <div className="bg-white rounded-lg p-5 shadow">
          <p className="text-sm font-semibold text-gray-500">
            Produits en stock faible
          </p>
          <p className="text-2xl font-bold text-red-600">{stockFaible}</p>
        </div>
      </section>

      {/* Filtres & recherche */}
      <section className="flex flex-wrap justify-between items-center gap-4  p-5 rounded-lg ">
        <div className="border rounded rounded-md flex items-center px-3">
          <label htmlFor="zone"><FiSearch className="text-gray-500"/></label>
          <input
            type="text"
            id="zone"
            placeholder="Rechercher par nom ou catégorie..."
            className="outline-none input-md bg-transparent rounded-md flex-grow w-[250px]"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            aria-label="Recherche produit"
          />
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {/* Filtre Stock */}
          <select
            className="select select-bordered select-md rounded-md"
            value={filtreStock}
            onChange={(e) => setFiltreStock(e.target.value)}
            aria-label="Filtre stock"
          >
            <option value="all">Tous stocks</option>
            <option value="enStock">En stock</option>
            <option value="rupture">Rupture / désactivés</option>
          </select>

          {/* Filtre créateur de marque */}
          <select
            className="select select-bordered select-md rounded-md"
            value={filtreCreateur}
            onChange={(e) => setFiltreCreateur(e.target.value)}
            aria-label="Filtre créateur de marque"
          >
            <option value="all">Tous types</option>
            <option value="oui">Créateur de marque</option>
            <option value="non">Revendeur</option>
          </select>
        </div>
      </section>

      {/* Tableau des produits */}
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="table w-full text-sm">
          <thead className="bg-gray-50 text-gray-800">
            <tr>
              <th className="cursor-pointer" onClick={() => toggleTri("nom")}>
                Produit
              </th>
              <th
                className="cursor-pointer"
                onClick={() => toggleTri("categorie")}
              >
                Catégorie
              </th>
              <th className="cursor-pointer" onClick={() => toggleTri("prix")}>
                Prix
              </th>
              <th className="cursor-pointer" onClick={() => toggleTri("stock")}>
                Stock
              </th>
              <th className="cursor-pointer" onClick={() => toggleTri("vendu")}>
                Vendus
              </th>
              <th
                className="cursor-pointer"
                onClick={() => toggleTri("revenu")}
              >
                Revenu
              </th>
              <th className="cursor-pointer" onClick={() => toggleTri("date")}>
                Date ajout
              </th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {produitsFiltres.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center py-8 text-gray-500">
                  Aucun produit trouvé.
                </td>
              </tr>
            )}
            {produitsFiltres.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition">
                <td className="flex items-center gap-3 py-3 min-w-[220px]">
                  <img
                    src={p.image}
                    alt={p.nom}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{p.nom}</p>
                    {p.createurMarque && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded-full mt-1 select-none">
                        <FaCrown size={12} /> Créateur de marque
                      </span>
                    )}
                  </div>
                </td>
                <td>{p.categorie}</td>
                <td className="text-green-600 font-semibold">
                  ${p.prix.toFixed(2)}
                </td>
                <td
                  className={`${p.stock === 0 ? "text-red-600 font-bold" : ""}`}
                >
                  {p.stock}
                </td>
                <td>{p.vendu}</td>
                <td className="text-blue-600 font-semibold">
                  ${p.revenu.toLocaleString()}
                </td>
                <td>{new Date(p.date).toLocaleDateString()}</td>
                <td>
                  {p.actif ? (
                    <span className="text-green-600 font-semibold">Actif</span>
                  ) : (
                    <span className="text-red-500 font-semibold">
                      Désactivé
                    </span>
                  )}
                </td>
                <td className="flex gap-1 justify-center">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/vendeur/produits/${p.id}`)
                    }
                    className="btn btn-xs btn-outline"
                    title="Voir détails"
                  >
                    <FiEye />
                  </button>
                  <button
                    onClick={() =>
                      navigate(`/dashboard/vendeur/produits/modifier/${p.id}`)
                    }
                    className="btn btn-xs btn-outline"
                    title="Modifier"
                  >
                    <FiEdit />
                  </button>
                  <button
                    onClick={() => toggleActifProduit(p.id)}
                    className={`btn btn-xs ${
                      p.actif ? "btn-warning" : "btn-success"
                    }`}
                    title={p.actif ? "Désactiver" : "Réactiver"}
                  >
                    {p.actif ? <FiPause /> : <FiPlay />}
                  </button>
                  <button
                    onClick={() => supprimerProduit(p.id)}
                    className="btn btn-xs btn-error"
                    title="Supprimer"
                  >
                    <FiTrash2 />
                  </button>
                  <button
                    onClick={() =>
                      alert("Fonction de duplication non encore implémentée")
                    }
                    className="btn btn-xs btn-outline"
                    title="Dupliquer"
                  >
                    <FiCopy />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <section className="flex justify-between items-center mt-6">
        <div className="flex items-center gap-2">
          <label
            htmlFor="itemsParPage"
            className="text-sm font-medium text-gray-700"
          >
            Afficher :
          </label>
          <select
            id="itemsParPage"
            className="select select-bordered select-sm rounded-md"
          >
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
        <div className="join">
          <button className="join-item btn btn-sm">«</button>
          <button className="join-item btn btn-sm btn-active">1</button>
          <button className="join-item btn btn-sm">2</button>
          <button className="join-item btn btn-sm">3</button>
          <button className="join-item btn btn-sm">»</button>
        </div>
      </section>

      {/* Limite d'abonnement */}
      {produits.length >= limiteProduits && (
        <section className="mt-10 bg-yellow-50 border border-yellow-300 p-4 rounded-md text-yellow-900 max-w-3xl mx-auto text-center font-semibold">
          Vous avez atteint la limite de votre abonnement gratuit (
          {limiteProduits} produits).{" "}
          <button
            onClick={() => alert("Redirection vers la page abonnement Premium")}
            className="underline font-bold hover:text-yellow-700"
          >
            Passez au plan Premium pour ajouter plus de produits !
          </button>
        </section>
      )}
    </div>
  );
};

export default CatalogueProduits;

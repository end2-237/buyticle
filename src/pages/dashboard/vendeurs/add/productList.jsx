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
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

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
        case "stock":
        case "vendu":
        case "revenu":
          valA = a[tri.champ];
          valB = b[tri.champ];
          break;
        case "nom":
        case "categorie":
          valA = a[tri.champ].toLowerCase();
          valB = b[tri.champ].toLowerCase();
          return tri.ordre === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
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

  // Pagination calculée
  const totalPages = Math.ceil(produitsFiltres.length / itemsPerPage);
  const produitsPage = produitsFiltres.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Statistiques
  const totalRevenu = produits.reduce((acc, p) => acc + p.revenu, 0);
  const produitsActifs = produits.filter((p) => p.actif).length;
  const stockFaible = produits.filter((p) => p.stock > 0 && p.stock < 10).length;

  // Handlers
  const toggleTri = (champ) => {
    if (tri.champ === champ) {
      setTri({ champ, ordre: tri.ordre === "asc" ? "desc" : "asc" });
    } else {
      setTri({ champ, ordre: "asc" });
    }
    setPage(1);
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

  const dupliquerProduit = (id) => {
    const produitToCopy = produits.find((p) => p.id === id);
    if (!produitToCopy) return;
    if (produits.length >= limiteProduits) {
      alert(
        "Vous avez atteint la limite de produits autorisés, passez à Premium pour en ajouter plus."
      );
      return;
    }
    const nouvelId =
      produits.reduce((maxId, p) => (p.id > maxId ? p.id : maxId), 0) + 1;
    const copie = {
      ...produitToCopy,
      id: nouvelId,
      nom: `Copie de ${produitToCopy.nom}`,
      actif: false, // on démarre désactivé la copie
    };
    setProduits((prods) => [...prods, copie]);
    alert(`Produit dupliqué : ${copie.nom}`);
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
          {/* Badge créateur de marque */}
          {produits.some((p) => p.createurMarque) && (
            <div className="flex items-center gap-1 bg-yellow-300 text-yellow-900 px-3 py-1 rounded-full font-semibold text-sm select-none">
              <FaCrown /> Créateur de marque
            </div>
          )}
        </div>
        <button
          onClick={() => navigate("/dashboard/vendeur/produits/ajouter")}
          className={`btn flex items-center gap-2 px-5 py-2 rounded-md hover:scale-105 transition-transform ${
            produits.length >= limiteProduits ? "opacity-50 cursor-not-allowed" : ""
          }`}
          title={
            produits.length >= limiteProduits
              ? "Limite atteinte, passez à Premium pour ajouter"
              : "Ajouter un produit"
          }
          disabled={produits.length >= limiteProduits}
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
          <label htmlFor="zone">
            <FiSearch className="text-gray-500" />
          </label>
          <input
            type="text"
            id="zone"
            placeholder="Rechercher par nom ou catégorie..."
            className="outline-none input-md bg-transparent rounded-md flex-grow w-[250px]"
            value={recherche}
            onChange={(e) => {
              setRecherche(e.target.value);
              setPage(1);
            }}
            aria-label="Recherche produit"
          />
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {/* Filtre Stock */}
          <select
            className="select select-bordered select-md rounded-md"
            value={filtreStock}
            onChange={(e) => {
              setFiltreStock(e.target.value);
              setPage(1);
            }}
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
            onChange={(e) => {
              setFiltreCreateur(e.target.value);
              setPage(1);
            }}
            aria-label="Filtre créateur de marque"
          >
            <option value="all">Tous types</option>
            <option value="oui">Créateur de marque</option>
            <option value="non">Revendeur</option>
          </select>
        </div>
      </section>

      {/* Tableau des produits */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow">
        <table className="table w-full border-separate border-spacing-y-2 border-spacing-x-1">
          <thead className="bg-gray-100 text-gray-700 font-semibold text-sm">
            <tr>
              <th
                className="text-left cursor-pointer px-3 py-2"
                onClick={() => toggleTri("nom")}
                aria-sort={
                  tri.champ === "nom"
                    ? tri.ordre === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                scope="col"
              >
                Nom{" "}
                {tri.champ === "nom" && (
                  <FiChevronDown
                    className={`inline-block transform ${
                      tri.ordre === "asc" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </th>
              <th
                className="text-left cursor-pointer px-3 py-2"
                onClick={() => toggleTri("categorie")}
                aria-sort={
                  tri.champ === "categorie"
                    ? tri.ordre === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                scope="col"
              >
                Catégorie{" "}
                {tri.champ === "categorie" && (
                  <FiChevronDown
                    className={`inline-block transform ${
                      tri.ordre === "asc" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </th>
              <th
                className="text-center cursor-pointer px-3 py-2"
                onClick={() => toggleTri("prix")}
                aria-sort={
                  tri.champ === "prix"
                    ? tri.ordre === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                scope="col"
              >
                Prix
                {tri.champ === "prix" && (
                  <FiChevronDown
                    className={`inline-block transform ${
                      tri.ordre === "asc" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </th>
              <th
                className="text-center cursor-pointer px-3 py-2"
                onClick={() => toggleTri("stock")}
                aria-sort={
                  tri.champ === "stock"
                    ? tri.ordre === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                scope="col"
              >
                Stock
                {tri.champ === "stock" && (
                  <FiChevronDown
                    className={`inline-block transform ${
                      tri.ordre === "asc" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </th>
              <th
                className="text-center cursor-pointer px-3 py-2"
                onClick={() => toggleTri("vendu")}
                aria-sort={
                  tri.champ === "vendu"
                    ? tri.ordre === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                scope="col"
              >
                Vendu
                {tri.champ === "vendu" && (
                  <FiChevronDown
                    className={`inline-block transform ${
                      tri.ordre === "asc" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </th>
              <th
                className="text-center cursor-pointer px-3 py-2"
                onClick={() => toggleTri("revenu")}
                aria-sort={
                  tri.champ === "revenu"
                    ? tri.ordre === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                scope="col"
              >
                Revenu
                {tri.champ === "revenu" && (
                  <FiChevronDown
                    className={`inline-block transform ${
                      tri.ordre === "asc" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </th>
              <th
                className="text-center cursor-pointer px-3 py-2"
                onClick={() => toggleTri("date")}
                aria-sort={
                  tri.champ === "date"
                    ? tri.ordre === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                scope="col"
              >
                Date
                {tri.champ === "date" && (
                  <FiChevronDown
                    className={`inline-block transform ${
                      tri.ordre === "asc" ? "rotate-180" : ""
                    }`}
                  />
                )}
              </th>
              <th className="text-center px-3 py-2" scope="col">
                Actif
              </th>
              <th className="text-center px-3 py-2" scope="col">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {produitsPage.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center py-10 text-gray-400">
                  Aucun produit ne correspond à vos critères.
                </td>
              </tr>
            ) : (
              produitsPage.map((p) => (
                <tr
                  key={p.id}
                  className={`border border-gray-100 hover:bg-gray-50 ${
                    !p.actif ? "opacity-60" : ""
                  }`}
                >
                  <td className="flex items-center gap-3 px-3 py-2">
                    <img
                      src={p.image}
                      alt={`Image de ${p.nom}`}
                      className="w-12 h-12 rounded object-cover border border-gray-300"
                      loading="lazy"
                    />
                    <span className="font-semibold text-gray-800">{p.nom}</span>
                    {p.createurMarque && (
                      <FaCrown
                        title="Créateur de marque"
                        className="text-yellow-500 ml-1"
                      />
                    )}
                  </td>
                  <td className="text-gray-700 px-3 py-2">{p.categorie}</td>
                  <td className="text-center px-3 py-2 font-semibold text-gray-900">
                    {p.prix.toLocaleString()} $
                  </td>
                  <td
                    className={`text-center px-3 py-2 font-semibold ${
                      p.stock === 0 ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {p.stock}
                  </td>
                  <td className="text-center px-3 py-2">{p.vendu}</td>
                  <td className="text-center px-3 py-2 font-semibold text-blue-700">
                    {p.revenu.toLocaleString()} $
                  </td>
                  <td className="text-center px-3 py-2">
                    {new Date(p.date).toLocaleDateString()}
                  </td>
                  <td className="text-center px-3 py-2">
                    <button
                      className={`btn btn-xs ${
                        p.actif ? "btn-success" : "btn-error"
                      }`}
                      onClick={() => toggleActifProduit(p.id)}
                      title={p.actif ? "Désactiver" : "Activer"}
                      aria-pressed={p.actif}
                      aria-label={`Produit ${p.nom} ${
                        p.actif ? "activé" : "désactivé"
                      }`}
                    >
                      {p.actif ? <FiPlay /> : <FiPause />}
                    </button>
                  </td>
                  <td className="text-center px-3 py-2 flex justify-center gap-2">
                    <button
                      onClick={() => navigate(`/dashboard/vendeur/produits/${p.id}`)}
                      className="btn btn-xs btn-primary"
                      title="Voir / Modifier"
                      aria-label={`Voir ou modifier ${p.nom}`}
                    >
                      <FiEye />
                    </button>
                    <button
                      onClick={() => dupliquerProduit(p.id)}
                      className="btn btn-xs btn-secondary"
                      title="Dupliquer produit"
                      aria-label={`Dupliquer ${p.nom}`}
                    >
                      <FiCopy />
                    </button>
                    <button
                      onClick={() => supprimerProduit(p.id)}
                      className="btn btn-xs btn-error"
                      title="Supprimer"
                      aria-label={`Supprimer ${p.nom}`}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          aria-label="Pagination produits"
          className="flex justify-center mt-5 gap-2"
        >
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn btn-sm"
            aria-label="Page précédente"
          >
            Précédent
          </button>

          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num + 1}
              onClick={() => setPage(num + 1)}
              aria-current={page === num + 1 ? "page" : undefined}
              className={`btn btn-sm ${
                page === num + 1 ? "btn-active" : ""
              }`}
            >
              {num + 1}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="btn btn-sm"
            aria-label="Page suivante"
          >
            Suivant
          </button>
        </nav>
      )}
    </div>
  );
};

export default CatalogueProduits;

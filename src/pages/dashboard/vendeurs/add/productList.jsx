// Modernisation du composant CatalogueProduits avec un design responsive et raffiné
import React, { useState, useMemo } from "react";
import {
  FiChevronDown,
  FiPlusCircle,
  FiTrash2,
  FiEye,
  FiCopy,
  FiPause,
  FiPlay,
  FiSearch,
} from "react-icons/fi";
import { FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useShop } from "../../../../contexts/shopContext";

const CatalogueProduits = () => {
  const { products, loading, error } = useShop();
  const navigate = useNavigate();

  const [recherche, setRecherche] = useState("");
  const [filtreStock, setFiltreStock] = useState("all");
  const [filtreCreateur, setFiltreCreateur] = useState("all");
  const [tri, setTri] = useState({ champ: "date", ordre: "desc" });
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const produitsFiltres = useMemo(() => {
    let filtered = [...products];
    if (recherche.trim() !== "") {
      filtered = filtered.filter(
        (p) =>
          p.Title.toLowerCase().includes(recherche.toLowerCase()) ||
          p.CategoryId.toLowerCase().includes(recherche.toLowerCase())
      );
    }
    if (filtreStock === "enStock") filtered = filtered.filter((p) => p.Stock > 0);
    else if (filtreStock === "rupture") filtered = filtered.filter((p) => p.Stock === 0);

    if (filtreCreateur === "oui") filtered = filtered.filter((p) => p.Brand?.IsFeatured);
    else if (filtreCreateur === "non") filtered = filtered.filter((p) => !p.Brand?.IsFeatured);

    filtered.sort((a, b) => {
      let valA, valB;
      switch (tri.champ) {
        case "prix": valA = a.Price; valB = b.Price; break;
        case "stock": valA = a.Stock; valB = b.Stock; break;
        case "vendu": valA = a.vendu; valB = b.vendu; break;
        case "revenu": valA = a.revenu; valB = b.revenu; break;
        case "nom": valA = a.Title.toLowerCase(); valB = b.Title.toLowerCase(); break;
        default: valA = new Date(a.CreatedAt?.seconds * 1000); valB = new Date(b.CreatedAt?.seconds * 1000); break;
      }
      return tri.ordre === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
    });

    return filtered;
  }, [products, recherche, filtreStock, filtreCreateur, tri]);

  const totalPages = Math.ceil(produitsFiltres.length / itemsPerPage);
  const produitsPage = produitsFiltres.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const toggleTri = (champ) => {
    setTri({ champ, ordre: tri.champ === champ && tri.ordre === "asc" ? "desc" : "asc" });
    setPage(1);
  };

  const toggleActifProduit = (id) => {};
  const supprimerProduit = (id) => {};
  const dupliquerProduit = (id) => {};

  if (loading) return <p className="text-center text-gray-600 mt-10">Chargement...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Erreur : {error.message}</p>;
  if (!products.length) return <p className="text-center text-gray-500 mt-10">Aucun produit trouvé.</p>;

  return (
    <div className="min-h-screen px-4 md:px-8 py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Mes Produits</h1>
        <button
          onClick={() => navigate("/dashboard/vendeur/produits/ajouter")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FiPlusCircle /> Ajouter un produit
        </button>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex items-center w-full md:w-1/3">
          <FiSearch className="absolute left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom ou catégorie..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={recherche}
            onChange={(e) => {
              setRecherche(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <select
          value={filtreStock}
          onChange={(e) => {
            setFiltreStock(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="all">Tous stocks</option>
          <option value="enStock">En stock</option>
          <option value="rupture">Rupture</option>
        </select>

        <select
          value={filtreCreateur}
          onChange={(e) => {
            setFiltreCreateur(e.target.value);
            setPage(1);
          }}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="all">Tous types</option>
          <option value="oui">Créateur de marque</option>
          <option value="non">Revendeur</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {produitsPage.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">Aucun produit ne correspond à vos critères.</p>
        ) : (
          produitsPage.map((p) => (
            <div
              key={p.id}
              className={`border rounded-xl p-4 bg-white shadow-sm flex flex-col justify-between gap-4 transition hover:shadow-md ${!p.actif ? "opacity-60" : ""}`}
            >
              <div className="flex items-start gap-3">
                <img
                  src={p.Thumbnail}
                  alt={p.Title}
                  className="w-20 h-20 object-cover rounded-md border"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1">
                    <h3 className="font-semibold text-gray-800 line-clamp-1">{p.Title}</h3>
                    {p.Brand?.IsFeatured && <FaCrown className="text-yellow-500" title="Créateur de marque" />}
                  </div>
                  <p className="text-sm text-gray-500">Catégorie: {p.CategoryId}</p>
                  <p className="text-sm text-gray-600">{p.Price?.toLocaleString()} FCFA</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-between text-sm text-gray-600 mt-2">
                <span>Stock: {p.Stock ?? "N/A"}</span>
                <span>Vendus: {p.vendu ?? "N/A"}</span>
                <span>Revenu: {p.revenu?.toLocaleString() ?? "N/A"} FCFA</span>
                <span>Date: {new Date(p.CreatedAt?.seconds * 1000).toLocaleDateString()}</span>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  className={`rounded-full p-2 ${p.actif ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                  onClick={() => toggleActifProduit(p.id)}
                  title={p.actif ? "Désactiver" : "Activer"}
                >
                  {p.actif ? <FiPlay /> : <FiPause />}
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/dashboard/vendeur/produits/${p.id}`)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Voir / Modifier"
                  >
                    <FiEye />
                  </button>
                  <button
                    onClick={() => dupliquerProduit(p.id)}
                    className="text-gray-600 hover:text-gray-800"
                    title="Dupliquer"
                  >
                    <FiCopy />
                  </button>
                  <button
                    onClick={() => supprimerProduit(p.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Supprimer"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Précédent
          </button>
          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num + 1}
              onClick={() => setPage(num + 1)}
              className={`px-3 py-1 rounded border ${page === num + 1 ? "bg-blue-500 text-white" : "bg-white hover:bg-gray-100"}`}
            >
              {num + 1}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      )}
    </div>
  );
};

export default CatalogueProduits;
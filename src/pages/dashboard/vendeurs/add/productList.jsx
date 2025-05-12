import React, { useState, useMemo } from 'react';
import { FiChevronDown, FiPlusCircle, FiEdit, FiTrash2 } from 'react-icons/fi';
import { FaCrown } from 'react-icons/fa';

const produitsInitial = [
  {
    nom: 'Montre Connectée Navy Blue',
    categorie: 'Homme, Montre',
    prix: 230,
    stock: 500,
    vendu: 65,
    revenu: 14950,
    date: '2024-06-01',
    image: 'https://via.placeholder.com/40'
  },
  {
    nom: 'Sac à dos Bleu Gris',
    categorie: 'Homme, Sac à dos',
    prix: 150,
    stock: 380,
    vendu: 74,
    revenu: 11100,
    date: '2024-05-15',
    image: 'https://via.placeholder.com/40'
  }
];

const CatalogueProduits = () => {
  const [produits, setProduits] = useState(produitsInitial);
  const [recherche, setRecherche] = useState('');
  const [triDate, setTriDate] = useState(false);

  const limiteProduits = 10;
  const produitsRestants = limiteProduits - produits.length;

  const produitsFiltres = useMemo(() => {
    let filtrés = [...produits];
    if (recherche) {
      filtrés = filtrés.filter(p => p.nom.toLowerCase().includes(recherche.toLowerCase()));
    }
    if (triDate) {
      filtrés = filtrés.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    return filtrés;
  }, [produits, recherche, triDate]);

  return (
    <div className="space-y-8 bg-white min-h-screen">
      {/* Bannière Premium */}
      <div className="relative rounded-lg overflow-hidden h-36 flex items-center px-8" style={{ backgroundImage: 'url(https://www.transparenttextures.com/patterns/purty-wood.png)', backgroundSize: 'cover' }}>
        <div className="absolute inset-0 bg-yellow-100/70 backdrop-blur-sm"></div>
        <div className="relative z-10 flex items-center justify-between w-full">
          <div>
            <h3 className="text-xl font-semibold text-yellow-800">Augmentez votre catalogue avec le plan Premium</h3>
            <p className="text-sm text-yellow-700">Passez à Premium et débloquez plus de produits dans votre boutique</p>
          </div>
          <div className="flex items-center gap-2 bg-yellow-400 text-white font-semibold px-4 py-2 rounded-full cursor-pointer hover:scale-105 transition">
            <FaCrown className="text-lg" />
            <span>Passer au Premium</span>
          </div>
        </div>
      </div>

      {/* En-tête avec filtres */}
      <div className="flex flex-wrap justify-between items-center gap-4 px-8">
        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Rechercher..."
            className="input input-sm input-bordered rounded-xl"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />
          <button
            className={`btn btn-sm btn-outline rounded-xl px-4 ${triDate ? 'bg-blue-100' : 'bg-white'}`}
            onClick={() => setTriDate(!triDate)}
          >
            Date <FiChevronDown className="ml-1" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600 px-4 py-2 rounded-xl border">
            <strong>{produits.length}</strong> / {limiteProduits} produits utilisés - <strong>{produitsRestants}</strong> restants
          </div>
          <button className="btn btn-sm btn-primary rounded-xl">
            <FiPlusCircle className="mr-2" /> Ajouter
          </button>
        </div>
      </div>

      {/* Titre */}
      <h2 className="text-2xl font-bold text-gray-800 px-8">Catalogue Produits</h2>

      {/* Tableau des produits */}
      <div className="overflow-x-auto px-8">
        <table className="table text-sm">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th>Produit</th>
              <th>Catégorie</th>
              <th>Prix</th>
              <th>Stock</th>
              <th>Vendus</th>
              <th>Revenu</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {produitsFiltres.map((p, i) => (
              <tr key={i} className="hover:bg-blue-50 transition">
                <td className="flex items-center gap-3 py-2">
                  <img src={p.image} alt={p.nom} className="w-10 h-10 rounded-xl" />
                  <span className="font-medium text-gray-700">{p.nom}</span>
                </td>
                <td>{p.categorie}</td>
                <td className="text-green-600 font-semibold">${p.prix}</td>
                <td>{p.stock}</td>
                <td>{p.vendu}</td>
                <td className="text-gray-700">${p.revenu.toLocaleString()}</td>
                <td className="flex gap-2">
                  <button className="btn btn-xs btn-outline btn-square"><FiEdit /></button>
                  <button className="btn btn-xs btn-outline btn-square btn-error"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center pt-6 px-8">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Afficher :</span>
          <select className="select select-sm border border-gray-300 rounded-md">
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
      </div>
    </div>
  );
};

export default CatalogueProduits;

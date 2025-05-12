import React, { useState } from 'react';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';

const ModifierProduit = () => {
  const [produit, setProduit] = useState({
    nom: 'Montre Connectée Navy Blue',
    description: '',
    categorie1: 'Électronique',
    categorie2: 'Montres',
    quantite: 100,
    sku: 'MCNB-001',
    poids: 1.2,
    taille: { l: 12, L: 12, h: 12 },
    prix: 180,
    prixComparatif: 320,
    typeVente: 'in-store',
    images: []
  });

  return (
    <div className="p-8 space-y-6 bg-white min-h-screen">
      <div className="text-sm text-blue-600 cursor-pointer flex items-center gap-2">
        <FiArrowLeft /> Retour à la liste des produits
      </div>

      <h2 className="text-2xl font-bold">Modifier le produit</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Description */}
        <div className="space-y-4">
          <div>
            <label className="label">Nom du produit</label>
            <input type="text" value={produit.nom} className="input input-bordered w-full" />
          </div>

          <div>
            <label className="label">Description</label>
            <textarea className="textarea textarea-bordered w-full h-24" placeholder="Décrivez le produit..." />
          </div>

          <div>
            <label className="label">Catégorie principale</label>
            <select className="select select-bordered w-full">
              <option>Électronique</option>
              <option>Vêtements</option>
            </select>
          </div>

          <div>
            <label className="label">Catégorie secondaire</label>
            <select className="select select-bordered w-full">
              <option>Montres</option>
              <option>Chaussures</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="label">Quantité</label>
              <input type="number" className="input input-bordered w-full" />
            </div>
            <div className="w-1/2">
              <label className="label">SKU (optionnel)</label>
              <input type="text" className="input input-bordered w-full" />
            </div>
          </div>

          <div>
            <label className="label">Type de vente</label>
            <div className="flex gap-3">
              <label className="flex items-center gap-2">
                <input type="radio" name="vente" className="radio" /> En boutique
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="vente" className="radio" /> En ligne
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="vente" className="radio" /> Les deux
              </label>
            </div>
          </div>

          <div>
            <label className="label">Variantes</label>
            <button className="btn btn-sm btn-outline">+ Ajouter une variante</button>
          </div>
        </div>

        {/* Images & Livraison */}
        <div className="space-y-4">
          <div>
            <label className="label">Images du produit</label>
            <div className="border-dashed border-2 border-gray-300 rounded-xl p-4 text-center cursor-pointer">
              <FiUpload className="text-3xl mx-auto mb-2" />
              <span className="text-sm">Cliquez pour téléverser ou glissez-déposez</span>
            </div>
          </div>

          <div>
            <label className="label">Poids (kg)</label>
            <input type="number" step="0.01" className="input input-bordered w-full" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="label">Longueur (cm)</label>
              <input type="number" className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label">Largeur (cm)</label>
              <input type="number" className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label">Hauteur (cm)</label>
              <input type="number" className="input input-bordered w-full" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Prix</label>
              <input type="number" className="input input-bordered w-full" />
            </div>
            <div>
              <label className="label">Prix comparatif</label>
              <input type="number" className="input input-bordered w-full" />
            </div>
          </div>

          <div className="flex gap-4">
            <button className="btn btn-outline w-1/3">Annuler</button>
            <button className="btn btn-primary w-2/3">Enregistrer les modifications</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifierProduit;

// src/components/AddProduct.jsx
import { useState } from 'react';
import { FiArrowLeft, FiUpload, FiImage, FiTrash2, FiPlus, FiX } from 'react-icons/fi';
import { BsCardImage } from 'react-icons/bs';
import { MdOutlineCategory, MdInventory } from 'react-icons/md';
import { TbWeight } from 'react-icons/tb';

const AddProduct = () => {
  const [images, setImages] = useState([]); // max 2
  const [product, setProduct] = useState({
    name: '',
    description: '',
    categories: [],
    quantity: 0,
    sku: '',
    price: '',
    comparePrice: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    sellingType: 'store',
    variants: [],
  });
  const [variantInput, setVariantInput] = useState({ name: '', value: '', image: null });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    if (images.length + previews.length <= 2) {
      setImages([...images, ...previews]);
    } else {
      alert("Vous ne pouvez ajouter que 2 images principales.");
    }
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleVariantImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setVariantInput({ ...variantInput, image: preview });
    }
  };

  const addVariant = () => {
    if (variantInput.name && variantInput.value && variantInput.image) {
      setProduct({
        ...product,
        variants: [...product.variants, { ...variantInput }],
      });
      setVariantInput({ name: '', value: '', image: null });
    } else {
      alert('Veuillez remplir tous les champs de la variante et ajouter une image.');
    }
  };

  const removeVariant = (index) => {
    const newVariants = product.variants.filter((_, i) => i !== index);
    setProduct({
      ...product,
      variants: newVariants,
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Back link */}
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-6 cursor-pointer hover:underline">
        <FiArrowLeft className="text-lg" />
        <span>Retour à la liste des produits</span>
      </div>

      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <BsCardImage className="text-blue-500" /> Ajouter un nouveau produit
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left side */}
        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              <MdOutlineCategory /> Nom du produit
            </label>
            <input type="text" className="input input-bordered w-full" placeholder="Nom du produit" />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
            <textarea className="textarea textarea-bordered w-full" rows="5" placeholder="Décrivez votre produit ici..." />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Catégorie</label>
            <select className="select select-bordered w-full">
              <option>Santé & Beauté</option>
              <option>Électronique</option>
              <option>Mode</option>
              <option>Maison</option>
            </select>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                <MdInventory /> Quantité
              </label>
              <input type="number" className="input input-bordered w-full" />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">SKU (optionnel)</label>
              <input type="text" className="input input-bordered w-full" />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Type de vente</label>
            <div className="space-y-1">
              <label className="flex items-center gap-2">
                <input type="radio" name="vente" className="radio radio-sm" defaultChecked /> En magasin uniquement
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="vente" className="radio radio-sm" /> En ligne uniquement
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="vente" className="radio radio-sm" /> En ligne et en magasin
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Variantes du produit</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Nom (ex: Couleur)"
                value={variantInput.name}
                onChange={(e) => setVariantInput({ ...variantInput, name: e.target.value })}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                placeholder="Valeur (ex: Rouge)"
                value={variantInput.value}
                onChange={(e) => setVariantInput({ ...variantInput, value: e.target.value })}
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <label htmlFor="variant-image" className="btn btn-sm btn-outline cursor-pointer">
                <FiUpload /> Image
              </label>
              <input
                type="file"
                accept="image/*"
                id="variant-image"
                className="hidden"
                onChange={handleVariantImage}
              />
              {variantInput.image && (
                <img src={variantInput.image} alt="Variante" className="w-12 h-12 rounded object-cover" />
              )}
              <button onClick={addVariant} className="btn btn-primary btn-sm">
                <FiPlus />
              </button>
            </div>

            <ul className="space-y-1">
              {product.variants.map((v, i) => (
                <li key={i} className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <img src={v.image} alt="Variante" className="w-10 h-10 rounded object-cover" />
                    <span>{v.name} : {v.value}</span>
                  </div>
                  <button onClick={() => removeVariant(i)} className="text-red-500"><FiX /></button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right side */}
        <div className="space-y-6">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Images du produit (max 2)</label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center bg-gray-50 dark:bg-gray-800">
              <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
              <label htmlFor="image-upload" className="cursor-pointer text-blue-600 dark:text-blue-400 flex items-center gap-2 justify-center">
                <FiUpload /> Cliquez pour téléverser ou glissez-déposez
              </label>
            </div>
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {images.map((src, i) => (
                  <div key={i} className="relative w-full aspect-square rounded overflow-hidden shadow-sm">
                    <img src={src} alt="Aperçu" className="object-cover w-full h-full" />
                    <button onClick={() => removeImage(i)} className="absolute top-1 right-1 bg-white dark:bg-gray-900 rounded-full p-1 text-red-600 shadow">
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              <TbWeight /> Poids (kg)
            </label>
            <input type="number" className="input input-bordered w-full mb-2" />
            <div className="grid grid-cols-3 gap-2">
              <input type="number" placeholder="Longueur (cm)" className="input input-bordered" />
              <input type="number" placeholder="Largeur (cm)" className="input input-bordered" />
              <input type="number" placeholder="Hauteur (cm)" className="input input-bordered" />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Prix</label>
              <input type="number" className="input input-bordered w-full" />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Prix comparé</label>
              <input type="number" className="input input-bordered w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-8 gap-4">
        <button className="btn btn-outline">Annuler</button>
        <button className="btn btn-primary">Ajouter le produit</button>
      </div>
    </div>
  );
};

export default AddProduct;

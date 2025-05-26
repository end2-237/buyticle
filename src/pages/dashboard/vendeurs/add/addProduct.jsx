import { useState } from 'react';
import { addProductToFirestore } from '../../../../services/productService';

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState('');
  const [product, setProduct] = useState({
    Title: '',
    Description: '',
    CategoryId: '',
    IdSeller: '',
    IsFeatured: true,
    Price: '',
    SalePrice: '',
    Stock: '',
    SKU: '',
    ProductType: 'ProductType.single',
    Brand: {
      Id: '',
      Name: '',
      Image: '',
      IsFeatured: true,
      ProductsCount: 0,
    },
    Images: [],
    Thumbnail: '',
    ProductAttributes: [],
    ProductVariations: [],
  });

  const [variantInput, setVariantInput] = useState({
    Color: '',
    Size: '',
    Description: '',
    Image: '',
    Price: '',
    SalePrice: '',
    Stock: '',
    SKU: '',
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...previews].slice(0, 4));
  };

  const handleVariantImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVariantInput((prev) => ({ ...prev, Image: URL.createObjectURL(file) }));
    }
  };

  const addVariant = () => {
    const { Color, Size, Image, Price, SalePrice, Stock } = variantInput;
    if (Color && Size && Image && Price && SalePrice && Stock) {
      setProduct((prev) => ({
        ...prev,
        ProductVariations: [
          ...prev.ProductVariations,
          {
            Id: (prev.ProductVariations.length + 1).toString(),
            AttributeValues: { Color, Size },
            Description: variantInput.Description,
            Image,
            Price: Number(Price),
            SalePrice: Number(SalePrice),
            Stock: Number(Stock),
            SKU: variantInput.SKU,
          },
        ],
      }));
      setVariantInput({
        Color: '',
        Size: '',
        Description: '',
        Image: '',
        Price: '',
        SalePrice: '',
        Stock: '',
        SKU: '',
      });
    } else {
      alert('Merci de remplir tous les champs requis de la variante.');
    }
  };

  const handleSubmit = async () => {
    if (!product.Title.trim() || !product.Price || images.length === 0) {
      alert('Veuillez remplir les champs obligatoires : Titre, Prix et Images.');
      return;
    }

    const uniqueColors = [...new Set(product.ProductVariations.map((v) => v.AttributeValues.Color))];
    const uniqueSizes = [...new Set(product.ProductVariations.map((v) => v.AttributeValues.Size))];

    const payload = {
      ...product,
      Price: Number(product.Price),
      SalePrice: Number(product.SalePrice),
      Stock: Number(product.Stock),
      Images: images,
      Thumbnail: thumbnail || images[0] || '',
      ProductAttributes: [
        { Name: 'Color', Values: uniqueColors },
        { Name: 'Size', Values: uniqueSizes },
      ],
    };

    try {
      await addProductToFirestore(payload);
      alert('Produit ajouté avec succès.');
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout du produit.");
    }
  };

  const inputStyle = 'w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500';

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-8"
    >
      <h2 className="text-2xl font-semibold text-center text-gray-800">Ajouter un produit</h2>

      {/* Section Produit */}
      <section>
        <h3 className="text-lg font-bold mb-2">Informations produit</h3>
        <div className="space-y-4">
          <input type="text" placeholder="Titre *" required className={inputStyle}
            value={product.Title} onChange={(e) => setProduct({ ...product, Title: e.target.value })} />

          <textarea placeholder="Description" rows={3} className={inputStyle}
            value={product.Description} onChange={(e) => setProduct({ ...product, Description: e.target.value })} />

          <div className="grid grid-cols-2 gap-4">
            <input type="number" min="0" step="0.01" placeholder="Prix *" required className={inputStyle}
              value={product.Price} onChange={(e) => setProduct({ ...product, Price: e.target.value })} />
            <input type="number" min="0" step="0.01" placeholder="Prix réduit" className={inputStyle}
              value={product.SalePrice} onChange={(e) => setProduct({ ...product, SalePrice: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input type="number" min="0" placeholder="Stock" className={inputStyle}
              value={product.Stock} onChange={(e) => setProduct({ ...product, Stock: e.target.value })} />
            <input type="text" placeholder="SKU" className={inputStyle}
              value={product.SKU} onChange={(e) => setProduct({ ...product, SKU: e.target.value })} />
          </div>

          <input type="file" accept="image/*" multiple className="mt-2"
            onChange={handleImageUpload} />
          <div className="flex gap-3 mt-2 flex-wrap">
            {images.map((img, i) => (
              <img key={i} src={img} alt={`img-${i}`} className={`w-20 h-20 rounded object-cover border-2 cursor-pointer ${thumbnail === img ? 'border-blue-500' : 'border-gray-200'}`} onClick={() => setThumbnail(img)} />
            ))}
          </div>
        </div>
      </section>

      {/* Section Marque */}
      <section>
        <h3 className="text-lg font-bold mb-2">Marque</h3>
        <div className="space-y-4">
          <input type="text" placeholder="Id Marque" className={inputStyle}
            value={product.Brand.Id} onChange={(e) => setProduct({ ...product, Brand: { ...product.Brand, Id: e.target.value } })} />
          <input type="text" placeholder="Nom Marque" className={inputStyle}
            value={product.Brand.Name} onChange={(e) => setProduct({ ...product, Brand: { ...product.Brand, Name: e.target.value } })} />
          <input type="text" placeholder="Image Marque (URL)" className={inputStyle}
            value={product.Brand.Image} onChange={(e) => setProduct({ ...product, Brand: { ...product.Brand, Image: e.target.value } })} />
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={product.Brand.IsFeatured}
              onChange={(e) => setProduct({ ...product, Brand: { ...product.Brand, IsFeatured: e.target.checked } })} />
            <label>Marque en vedette</label>
          </div>
          <input type="number" min="0" placeholder="Nombre de produits de la marque" className={inputStyle}
            value={product.Brand.ProductsCount} onChange={(e) => setProduct({ ...product, Brand: { ...product.Brand, ProductsCount: Number(e.target.value) } })} />
        </div>
      </section>

      {/* Section Variante */}
      <section>
        <h3 className="text-lg font-bold mb-2">Ajouter une variante</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Couleur *" className={inputStyle}
              value={variantInput.Color} onChange={(e) => setVariantInput({ ...variantInput, Color: e.target.value })} />
            <input type="text" placeholder="Taille *" className={inputStyle}
              value={variantInput.Size} onChange={(e) => setVariantInput({ ...variantInput, Size: e.target.value })} />
          </div>
          <textarea placeholder="Description" rows={2} className={inputStyle}
            value={variantInput.Description} onChange={(e) => setVariantInput({ ...variantInput, Description: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" min="0" step="0.01" placeholder="Prix *" className={inputStyle}
              value={variantInput.Price} onChange={(e) => setVariantInput({ ...variantInput, Price: e.target.value })} />
            <input type="number" min="0" step="0.01" placeholder="Prix réduit *" className={inputStyle}
              value={variantInput.SalePrice} onChange={(e) => setVariantInput({ ...variantInput, SalePrice: e.target.value })} />
          </div>
          <input type="number" min="0" placeholder="Stock *" className={inputStyle}
            value={variantInput.Stock} onChange={(e) => setVariantInput({ ...variantInput, Stock: e.target.value })} />
          <input type="text" placeholder="SKU" className={inputStyle}
            value={variantInput.SKU} onChange={(e) => setVariantInput({ ...variantInput, SKU: e.target.value })} />
          <input type="file" accept="image/*" onChange={handleVariantImage} />
          {variantInput.Image && (
            <img src={variantInput.Image} alt="Variante" className="w-20 h-20 object-cover rounded mt-2" />
          )}
          <button type="button" onClick={addVariant} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
            Ajouter la variante
          </button>
        </div>
      </section>

      {/* Bouton final */}
      <button type="submit" className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500">
        Ajouter le produit
      </button>
    </form>
  );
};

export default AddProduct;

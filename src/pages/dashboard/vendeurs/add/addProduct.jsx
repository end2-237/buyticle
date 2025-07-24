import { useState, useEffect } from "react";
import { useShop } from "../../../../contexts/shopContext";
import { uploadImageToFirebase } from "../../../../helpers/uploadImage";
import { fetchBrands } from "../../../../services/brandService";
import { fetchCategories } from "../../../../services/categoryService";

const AddProduct = () => {
  const { shopId, addProduct } = useShop();

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState("");

  const [product, setProduct] = useState({
    Title: "",
    Description: "",
    CategoryId: "",
    IsFeatured: true,
    Price: "",
    SalePrice: "",
    Stock:"",
    SKU: "",
    ProductType: "ProductType.single",
    Brand: { Id: "", Name: "", Image: "", IsFeatured: true, ProductsCount: 0 },
    Images: [],
    Rating: 0.0,
    Thumbnail: "",
    ProductAttributes: [],
    ProductVariations: [],
  });

  const [variantInput, setVariantInput] = useState({
    Color: "",
    Size: "",
    Description: "",
    Image: "",
    Price: "",
    SalePrice: "",
    Stock: "",
    SKU: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const brandList = await fetchBrands();
        setBrands(brandList);
        const categoryList = await fetchCategories();
        setCategories(categoryList);
      } catch (err) {
        console.error("Erreur chargement marques/catégories :", err);
      }
    };
    loadData();
  }, []);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    const urls = [];
    for (const file of files.slice(0, 4 - images.length)) {
      const url = await uploadImageToFirebase(file, "Products");
      urls.push(url);
    }
    setImages((prev) => [...prev, ...urls]);
  };

  const handleVariantImage = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadImageToFirebase(file, "Products");
      setVariantInput((prev) => ({ ...prev, Image: url }));
    }
  };

  const addVariant = () => {
    const { Color, Size, Image, Price, SalePrice, Stock } = variantInput;
    if (!Color || !Size || !Image || !Price || !SalePrice || !Stock) {
      alert("Merci de remplir tous les champs requis de la variante.");
      return;
    }
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
      Color: "",
      Size: "",
      Description: "",
      Image: "",
      Price: "",
      SalePrice: "",
      Stock: "",
      SKU: "",
    });
  };

  const handleSubmit = async () => {
    if (!product.Title.trim() || !product.Price || images.length === 0) {
      alert("Veuillez remplir les champs obligatoires : Titre, Prix et Images.");
      return;
    }
    if (!shopId) {
      alert("Erreur : aucune boutique chargée.");
      return;
    }
    const hasVariations = product.ProductVariations.length > 0;
    const uniqueColors = [...new Set(product.ProductVariations.map((v) => v.AttributeValues.Color))];
    const uniqueSizes = [...new Set(product.ProductVariations.map((v) => v.AttributeValues.Size))];
    const payload = {
      ...product,
      ProductType: hasVariations ? "ProductType.variable" : "ProductType.single",
      Price: Number(product.Price),
      SalePrice: Number(product.SalePrice || 0),
      Stock: Number(product.Stock || 0),
      Images: images,
      Thumbnail: thumbnail || images[0] || "",
      ProductAttributes: hasVariations ? [
        { Name: "Color", Values: uniqueColors },
        { Name: "Size", Values: uniqueSizes },
      ] : [],
      IdSeller: shopId,
      Rating: Number(product.Rating || 0),
    };
    try {
      await addProduct(payload);
      alert("Produit ajouté avec succès.");
      setProduct({
        Title: "",
        Description: "",
        CategoryId: "",
        IsFeatured: true,
        Price: "",
        SalePrice: "",
        Stock: "",
        SKU: "",
        ProductType: "ProductType.single",
        Brand: { Id: "", Name: "", Image: "", IsFeatured: true, ProductsCount: 0 },
        Images: [],
        Rating: 0.0,
        Thumbnail: "",
        ProductAttributes: [],
        ProductVariations: [],
      });
      setImages([]);
      setThumbnail("");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'ajout du produit.");
    }
  };

  const inputStyle = "w-full p-2 border border-gray-300 rounded-md focus:outline-blue-500";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto p-6 bg-white shadow rounded-lg"
    >
      {/* Left Column: Info */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Ajouter un produit</h2>
        <input type="text" placeholder="Titre *" className={inputStyle} value={product.Title} onChange={(e) => setProduct({ ...product, Title: e.target.value })} required />
        <textarea placeholder="Description" rows={3} className={inputStyle} value={product.Description} onChange={(e) => setProduct({ ...product, Description: e.target.value })} />
        <div className="grid grid-cols-2 gap-4">
          <input type="number" placeholder="Prix *" className={inputStyle} value={product.Price} onChange={(e) => setProduct({ ...product, Price: e.target.value })} required />
          <input type="number" placeholder="Prix réduit" className={inputStyle} value={product.SalePrice} onChange={(e) => setProduct({ ...product, SalePrice: e.target.value })} />
        </div>
        <input type="number" placeholder="Stock *" className={inputStyle} value={product.Stock} onChange={(e) => setProduct({ ...product, Stock: e.target.value })} required />

        <select className={inputStyle} value={product.Brand.Id} onChange={(e) => {
          const selectedBrand = brands.find((b) => b.id === e.target.value);
          if (selectedBrand) {
            setProduct({
              ...product,
              Brand: {
                Id: selectedBrand.id,
                Name: selectedBrand.Name,
                Image: selectedBrand.Image,
                IsFeatured: selectedBrand.IsFeatured,
                ProductsCount: selectedBrand.ProductsCount || 0,
              },
            });
          }
        }}>
          <option value="">-- Sélectionner une marque --</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>{brand.Name}</option>
          ))}
        </select>

        <select className={inputStyle} value={product.CategoryId} onChange={(e) => setProduct({ ...product, CategoryId: e.target.value })}>
          <option value="">-- Sélectionner une catégorie --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.Name}</option>
          ))}
        </select>
      </div>

      {/* Right Column: Images and Variants */}
      <div className="space-y-6">
        <div>
          <label className="font-semibold block mb-2">Images du produit *</label>
          <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
          <div className="flex flex-wrap gap-2 mt-3">
            {images.map((img, i) => (
              <img key={i} src={img} className={`w-20 h-20 object-cover rounded border cursor-pointer ${thumbnail === img ? 'border-green-500' : 'border-gray-300'}`} onClick={() => setThumbnail(img)} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">Ajouter une variante</h3>
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Couleur" className={inputStyle} value={variantInput.Color} onChange={(e) => setVariantInput({ ...variantInput, Color: e.target.value })} />
            <input type="text" placeholder="Taille" className={inputStyle} value={variantInput.Size} onChange={(e) => setVariantInput({ ...variantInput, Size: e.target.value })} />
          </div>
          <textarea placeholder="Description" rows={2} className={inputStyle} value={variantInput.Description} onChange={(e) => setVariantInput({ ...variantInput, Description: e.target.value })} />
          <input type="file" accept="image/*" onChange={handleVariantImage} />
          {variantInput.Image && <img src={variantInput.Image} className="w-24 h-24 mt-2 object-cover rounded" />}
          <div className="grid grid-cols-3 gap-4">
            <input type="number" placeholder="Prix" className={inputStyle} value={variantInput.Price} onChange={(e) => setVariantInput({ ...variantInput, Price: e.target.value })} />
            <input type="number" placeholder="Prix réduit" className={inputStyle} value={variantInput.SalePrice} onChange={(e) => setVariantInput({ ...variantInput, SalePrice: e.target.value })} />
            <input type="number" placeholder="Stock" className={inputStyle} value={variantInput.Stock} onChange={(e) => setVariantInput({ ...variantInput, Stock: e.target.value })} />
          </div>
          <input type="text" placeholder="SKU" className={inputStyle} value={variantInput.SKU} onChange={(e) => setVariantInput({ ...variantInput, SKU: e.target.value })} />
          <button type="button" onClick={addVariant} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Ajouter variante</button>
          {product.ProductVariations.length > 0 && (
            <ul className="mt-4 list-disc pl-5">
              {product.ProductVariations.map((v, idx) => (
                <li key={idx}>{v.AttributeValues.Color} - {v.AttributeValues.Size} : {v.Price}€ - Stock : {v.Stock}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Full-width Submit Button */}
      <div className="md:col-span-2">
        <button type="submit" className="w-full mt-8 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700">Ajouter le produit</button>
      </div>
    </form>
  );
};

export default AddProduct;

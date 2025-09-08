import { useState, useEffect } from "react";
import { useShop } from "../../../../contexts/shopContext";
import { uploadImageToFirebase } from "../../../../helpers/uploadImage";
import { fetchBrands } from "../../../../services/brandService";
import { fetchCategories } from "../../../../services/categoryService";
import { div } from "framer-motion/client";
import { FiBell, FiImage } from "react-icons/fi";
import { BsFillHouseDoorFill, BsHouseAdd } from "react-icons/bs";
import { TailChase } from "ldrs/react";
import "ldrs/react/TailChase.css";

import {
  RiAddBoxLine,
  RiAddLargeLine,
  RiHome2Fill,
  RiHome6Line,
  RiImageAddFill,
  RiImageAddLine,
} from "react-icons/ri";

const AddProduct = () => {
  const { shopId, addProduct } = useShop();

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [thumbnail, setThumbnail] = useState("");

  const [loadingImages, setLoadingImages] = useState(false);

  const [product, setProduct] = useState({
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
    setLoadingImages(true); // Début du chargement
    const files = Array.from(e.target.files || []);
    const urls = [];
    for (const file of files.slice(0, 4 - images.length)) {
      const url = await uploadImageToFirebase(file, "Products");
      urls.push(url);
    }
    setImages((prev) => [...prev, ...urls]);
    setLoadingImages(false); // Fin du chargement
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
    const uniqueColors = [
      ...new Set(product.ProductVariations.map((v) => v.AttributeValues.Color)),
    ];
    const uniqueSizes = [
      ...new Set(product.ProductVariations.map((v) => v.AttributeValues.Size)),
    ];

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
        <h2 className="text-2xl font-semibold flex gap-2 items-center ">
          <BsHouseAdd className="size-6" /> Ajouter un produit
        </h2>
        <input
          type="text"
          placeholder="Titre *"
          className={inputStyle}
          value={product.Title}
          onChange={(e) => setProduct({ ...product, Title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          rows={3}
          className={inputStyle}
          value={product.Description}
          onChange={(e) =>
            setProduct({ ...product, Description: e.target.value })
          }
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Prix *"
            className={inputStyle}
            value={product.Price}
            onChange={(e) => setProduct({ ...product, Price: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Prix réduit"
            className={inputStyle}
            value={product.SalePrice}
            onChange={(e) =>
              setProduct({ ...product, SalePrice: e.target.value })
            }
          />
        </div>
        <input
          type="number"
          placeholder="Stock *"
          className={inputStyle}
          value={product.Stock}
          onChange={(e) => setProduct({ ...product, Stock: e.target.value })}
          required
        />

        <select
          className={inputStyle}
          value={product.Brand.Id}
          onChange={(e) => {
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
          }}
        >

          <option value="">-- Sélectionner une marque --</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>{brand.Name}</option>
          ))}
        </select>

        <select
          className={inputStyle}
          value={product.CategoryId}
          onChange={(e) =>
            setProduct({ ...product, CategoryId: e.target.value })
          }
        >
          <option value="">-- Sélectionner une catégorie --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.Name}</option>
          ))}
        </select>
      </div>

      {/* Right Column: Images and Variants */}
      <div className="space-y-6">

        {/* Full-width Submit Button */}
        <div className="md:col-span-2 flex items-right justify-right max-w-full">
          <button
            type="submit"
            className="w-full/2 bg-green-600 text-sm p-2 text-white font-semibold rounded hover:bg-green-700 flex justify-center items-center gap-2"
          >
            <RiAddLargeLine />
            Ajouter le produit
          </button>
        </div>

        {/* Images du produit */}
        <div>
          <label className="font-semibold block mb-2 flex items-center gap-2">
            Images du produit *
            <FiImage className="size-6" />
          </label>

          <div className="flex gap-6 items-start">
            {/* Si loading */}
            {loadingImages ? (
              <div className="flex items-center justify-center w-full h-48">
                <TailChase size="40" speed="1.75" color="green" />
              </div>
            ) : (
              <>
                {/* Zone affichage images */}
                <div className="flex gap-3">
                  {/* Thumbnail principal */}
                  {thumbnail ? (
                    <img
                      src={thumbnail}
                      alt="Thumbnail"
                      className="max-w-44 w-40 h-48 object-cover rounded-lg border-2 border-green-500"
                    />
                  ) : (
                    <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                      Aucune image
                    </div>
                  )}

                  {/* Miniatures */}
                  <div className="grid grid-cols-1 gap-2">
                    {images
                      .filter((img) => img !== thumbnail)
                      .map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          style={{ width: "100px", height: "90px" }}
                          className=" object-cover rounded border cursor-pointer hover:opacity-80 transition"
                          onClick={() => setThumbnail(img)}
                        />
                      ))}
                  </div>
                </div>

                {/* Zone drag & drop */}
                <div
                  className="flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg p-6 w-56 h-48 cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                  onClick={() =>
                    document.getElementById("upload-images").click()
                  }
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={async (e) => {
                    e.preventDefault();
                    const files = Array.from(e.dataTransfer.files || []);
                    if (images.length + files.length > 3) {
                      alert("Vous pouvez ajouter un maximum de 3 images.");
                      return;
                    }
                    setLoadingImages(true);
                    for (const file of files) {
                      const url = await uploadImageToFirebase(file, "Products");
                      setImages((prev) => {
                        const updated = [...prev, url];
                        if (!thumbnail) setThumbnail(url);
                        return updated;
                      });
                    }
                    setLoadingImages(false);
                  }}
                >
                  <RiImageAddLine className="text-4xl text-gray-500 mb-2" />
                  <p className="text-gray-600 text-sm text-center">
                    Glissez vos images ici ou{" "}
                    <span className="text-blue-600 font-medium">cliquez</span>
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Max: 3 images</p>
                  <input
                    id="upload-images"
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={async (e) => {
                      const files = Array.from(e.target.files || []);
                      if (images.length + files.length > 3) {
                        alert("Vous pouvez ajouter un maximum de 3 images.");
                        return;
                      }
                      setLoadingImages(true);
                      for (const file of files) {
                        const url = await uploadImageToFirebase(
                          file,
                          "Products"
                        );
                        setImages((prev) => {
                          const updated = [...prev, url];
                          if (!thumbnail) setThumbnail(url);
                          return updated;
                        });
                      }
                      setLoadingImages(false);
                    }}
                    className="hidden"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">Ajouter une variante</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Couleur"
              className={inputStyle}
              value={variantInput.Color}
              onChange={(e) =>
                setVariantInput({ ...variantInput, Color: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Taille"
              className={inputStyle}
              value={variantInput.Size}
              onChange={(e) =>
                setVariantInput({ ...variantInput, Size: e.target.value })
              }
            />
          </div>
          <textarea
            placeholder="Description"
            rows={2}
            className={inputStyle}
            value={variantInput.Description}
            onChange={(e) =>
              setVariantInput({ ...variantInput, Description: e.target.value })
            }
          />
          <input type="file" accept="image/*" onChange={handleVariantImage} />
          {variantInput.Image && (
            <img
              src={variantInput.Image}
              className="w-24 h-24 mt-2 object-cover rounded"
            />
          )}
          <div className="grid grid-cols-3 gap-4">
            <input
              type="number"
              placeholder="Prix"
              className={inputStyle}
              value={variantInput.Price}
              onChange={(e) =>
                setVariantInput({ ...variantInput, Price: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Prix réduit"
              className={inputStyle}
              value={variantInput.SalePrice}
              onChange={(e) =>
                setVariantInput({ ...variantInput, SalePrice: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Stock"
              className={inputStyle}
              value={variantInput.Stock}
              onChange={(e) =>
                setVariantInput({ ...variantInput, Stock: e.target.value })
              }
            />
          </div>
          <input
            type="text"
            placeholder="SKU"
            className={inputStyle}
            value={variantInput.SKU}
            onChange={(e) =>
              setVariantInput({ ...variantInput, SKU: e.target.value })
            }
          />
          <button
            type="button"
            onClick={addVariant}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Ajouter variante
          </button>

          {product.ProductVariations.length > 0 && (
            <ul className="mt-4 list-disc pl-5">
              {product.ProductVariations.map((v, idx) => (
                <li key={idx}>{v.AttributeValues.Color} - {v.AttributeValues.Size} : {v.Price}€ - Stock : {v.Stock}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </form>
  );
};

export default AddProduct;

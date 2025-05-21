import { useState, useEffect } from "react";

const CreateOfferForm = () => {
  const [formData, setFormData] = useState({
    titre: "",
    description: "",
    typeRemise: "Percent Off",
    montantMinimum: 0,
    valeurRemise: 0,
    debut: "",
    fin: "",
    heureDebut: "12:00",
    heureFin: "12:00",
  });

  const [budgetJournalier, setBudgetJournalier] = useState(1000);
  const [budgetTotal, setBudgetTotal] = useState(0);

  useEffect(() => {
    if (formData.debut && formData.fin) {
      calculerBudgetTotal();
    }
  }, [formData.debut, formData.fin, budgetJournalier]);

  const calculerBudgetTotal = () => {
    const debut = new Date(`${formData.debut}T${formData.heureDebut}`);
    const fin = new Date(`${formData.fin}T${formData.heureFin}`);
    const diffTemps = fin.getTime() - debut.getTime();
    const diffJours = Math.ceil(diffTemps / (1000 * 60 * 60 * 24)) || 1;
    const total = diffJours * budgetJournalier;
    setBudgetTotal(total);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, budgetTotal });
    alert("Offre créée avec succès !");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-xl font-bold">Créer une Nouvelle Offre</h2>

      {/* Description */}
      <div>
        <label>Titre de l'offre</label>
        <input
          name="titre"
          type="text"
          value={formData.titre}
          onChange={handleChange}
          className="input input-bordered w-full"
        />
        <label>Description</label>
        <textarea
          name="description"
          maxLength={100}
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />
      </div>

      {/* Remise */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Type de remise</label>
          <select
            name="typeRemise"
            value={formData.typeRemise}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option>Percent Off</option>
            <option>Montant Fixe</option>
          </select>
        </div>
        <div>
          <label>Montant minimum de commande</label>
          <input
            name="montantMinimum"
            type="number"
            value={formData.montantMinimum}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Valeur de la remise</label>
          <input
            name="valeurRemise"
            type="number"
            value={formData.valeurRemise}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* Validité */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Date de début</label>
          <input
            name="debut"
            type="date"
            value={formData.debut}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Heure de début</label>
          <input
            name="heureDebut"
            type="time"
            value={formData.heureDebut}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Date de fin</label>
          <input
            name="fin"
            type="date"
            value={formData.fin}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Heure de fin</label>
          <input
            name="heureFin"
            type="time"
            value={formData.heureFin}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>
      </div>

      {/* Budget Publicitaire */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Budget journalier (min. 1000 FCFA)</label>
          <input
            type="number"
            min={1000}
            value={budgetJournalier}
            onChange={(e) =>
              setBudgetJournalier(Math.max(1000, parseInt(e.target.value)))
            }
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label>Budget total estimé</label>
          <input
            type="text"
            value={`${budgetTotal} FCFA`}
            readOnly
            className="input input-disabled w-full bg-gray-100"
          />
        </div>
      </div>

      {/* Consentement */}
      <div>
        <label className="flex items-center space-x-2">
          <input type="checkbox" required />
          <span>Je comprends que cette offre sera à mes frais.</span>
        </label>
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <button type="button" className="btn btn-outline">
          Annuler
        </button>
        <button type="submit" className="btn btn-primary">
          Créer l'offre
        </button>
      </div>
    </form>
  );
};

export default CreateOfferForm;

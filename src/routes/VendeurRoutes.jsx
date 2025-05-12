// src/routes/VendeurRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Accueil from '../pages/dashboard/vendeurs/Accueil';
import Produits from '../pages/dashboard/vendeurs/Produits';
import Commandes from '../pages/dashboard/vendeurs/Commandes';
import Abonnement from '../pages/dashboard/vendeurs/Abonnement';
import Parametres from '../pages/dashboard/vendeurs/Parametres';

const VendeurRoutes = () => (
  <Layout>
    <Routes>
      <Route path="/dashboard/vendeur" element={<Accueil />} />
      <Route path="/dashboard/vendeur/produits" element={<Produits />} />
      <Route path="/dashboard/vendeur/commandes" element={<Commandes />} />
      <Route path="/dashboard/vendeur/abonnement" element={<Abonnement />} />
      <Route path="/dashboard/vendeur/parametres" element={<Parametres />} />
    </Routes>
  </Layout>
);

export default VendeurRoutes;

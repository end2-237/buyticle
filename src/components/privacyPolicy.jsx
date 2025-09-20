import Footer from "../footer";
import Navigation from "../nav";

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full h-screen overflow-y-auto">
      <Navigation />
      <div className="flex flex-col gap-5 justify-left w-full p-2">
        <div className="flex flex-col w-full p-6 pl-24 bg-gray-100 rounded rounded-sm">
          <h1 className="text-3xl font-bold">Politique de confidentialité</h1>
          <p className="text-md text-gray-600">
            Dernière mise à jour : 20 septembre 2025
          </p>
        </div>

        <div className="flex flex-col gap-4 w-full p-6">
          <p>
            Chez <strong>Buyticle</strong>, nous respectons et protégeons la
            vie privée de nos utilisateurs. Cette politique explique quelles
            informations nous collectons, comment nous les utilisons et les
            mesures prises pour assurer leur sécurité.
          </p>

          <h2 className="text-xl font-semibold">1. Informations collectées</h2>
          <ul className="list-disc list-inside">
            <li>
              <strong>Données personnelles</strong> : nom, adresse e-mail,
              numéro de téléphone, informations de paiement (via Payunit).
            </li>
            <li>
              <strong>Données de localisation</strong> : grâce à l’API Google
              Maps, uniquement si vous acceptez le partage de votre position.
            </li>
            <li>
              <strong>Données techniques</strong> : type d’appareil, version de
              l’application, erreurs et journaux, collectés automatiquement via
              Firebase.
            </li>
          </ul>

          <h2 className="text-xl font-semibold">2. Utilisation des données</h2>
          <p>Nous utilisons vos informations pour :</p>
          <ul className="list-disc list-inside">
            <li>Assurer le bon fonctionnement de l’application.</li>
            <li>
              Faciliter les paiements sécurisés via notre partenaire{" "}
              <strong>Payunit</strong>.
            </li>
            <li>
              Fournir des services de géolocalisation et améliorer l’expérience
              utilisateur.
            </li>
            <li>
              Améliorer nos services grâce aux analyses Firebase (erreurs et
              performances).
            </li>
          </ul>

          <h2 className="text-xl font-semibold">3. Partage des données</h2>
          <p>
            Nous ne vendons ni ne louons vos données à des tiers. Cependant,
            certaines informations sont partagées uniquement avec :
          </p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Firebase (Google)</strong> : hébergement et analyse
              technique.
            </li>
            <li>
              <strong>Google Maps API</strong> : services de localisation.
            </li>
            <li>
              <strong>Payunit</strong> : traitement des paiements en toute
              sécurité.
            </li>
          </ul>

          <h2 className="text-xl font-semibold">4. Sécurité</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles
            pour protéger vos données contre tout accès non autorisé,
            modification, divulgation ou destruction.
          </p>

          <h2 className="text-xl font-semibold">5. Vos droits</h2>
          <p>
            Vous pouvez à tout moment demander l’accès, la correction ou la
            suppression de vos données en nous contactant à :{" "}
            <a
              href="mailto:support@buyticle.com"
              className="text-blue-600 underline"
            >
              support@buyticle.com
            </a>
          </p>

          <h2 className="text-xl font-semibold">6. Modifications</h2>
          <p>
            Cette politique peut être mise à jour pour refléter les évolutions
            techniques ou légales. Nous informerons les utilisateurs de tout
            changement important via l’application ou le site web.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

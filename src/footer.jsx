import logo from "./assets/buylogo.png";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-gray-100 px-8 py-16 text-gray-600">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & description */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-orange-700 text-2xl font-bold flex gap-1 flex  items-center">
            <img src={logo} alt="logo" className="size-14" /> Buyticle
          </h3>
          <p className="text-sm">
            La marketplace mobile nouvelle génération pour acheter et vendre en
            toute simplicité. Disponible sur iOS et Android.
          </p>
          <div className="flex space-x-4 mt-4">
            {/* <a
              href="#"
              className="bg-white hover:bg-gray-200 p-2 rounded-full transition"
            >
              <img
                src="/icons/apple.svg"
                alt="Apple Store"
                className="h-6 w-6"
              />
            </a> */}
            <a
              href="#"
              className="bg-white hover:bg-gray-200 p-2 rounded-full transition"
            >
              <img
                src="https://firebasestorage.googleapis.com/v0/b/buyticle-bce3f.firebasestorage.app/o/buylogo.jpg?alt=media&token=861a1bc1-843b-458a-9bd1-7e075ed8d5a1"
                alt="Google Play"
                className="h-6 w-6"
              />
            </a>
          </div>
        </div>

        {/* Liens - Découvrir */}
        <div className="flex flex-col space-y-3">
          <h4 className="text-gray-900 font-semibold mb-3">Découvrir</h4>
          <a href="#decouverte" className="hover:text-primary hover:underline">
            Fonctionnalités
          </a>
          <a href="#decouverte" className="hover:text-primary hover:underline">
            Nouveautés
          </a>
          <a href="#decouverte" className="hover:text-primary hover:underline">
            Promotions
          </a>
        </div>

        {/* Liens - Vendeurs */}
        <div className="flex flex-col space-y-3">
          <h4 className="text-gray-900 font-semibold mb-3">Vendeurs</h4>
          <a href="/onboarding" className="hover:text-primary hover:underline">
            S'inscrire
          </a>
          <a href="/pricing" className="hover:text-primary hover:underline">
            Nos Formules
          </a>
          <a href="#vendeur" className="hover:text-primary hover:underline">
            Support Vendeur
          </a>
        </div>
        {/* Privacy policy */}
        <div className="flex flex-col space-y-3">
          <h4 className="text-gray-900 font-semibold mb-3">Confidentialité</h4>
          <a href="/privacy-policy" className="hover:text-primary hover:underline">
            Politique de confidentialité
          </a>
        </div>

        {/* Réseaux sociaux */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-gray-900 font-semibold mb-3">Suivez-nous</h4>
          <div className="flex space-x-4 text-gray-500">
            <a href="#" className="hover:text-primary">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" className="hover:text-primary">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
            <a href="#" className="hover:text-primary">
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a href="#" className="hover:text-primary">
              <i className="fab fa-tiktok fa-lg"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Signature */}
      <div className="mt-16 text-center text-sm text-gray-400">
        © 2025 Buyticle. Tous droits réservés.
      </div>
    </footer>
  );
}

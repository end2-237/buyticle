import { useNavigate } from "react-router-dom";


export default function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="relative z-20 flex justify-between items-center p-6">
      <div className="text-xl font-bold">Buyticle</div>
      <div className="flex space-x-6 items-center">
        <a href="/" className="hover:underline">
          Accuiel
        </a>
        <a href="#decouverte" className="hover:underline">
          Découvrir
        </a>
        <a href="/pricing" className="hover:underline">
          Vendre
        </a>
        <button className="btn btn-primary rounded-full px-8 py-3">
            Télécharger l'application
          </button>
        <button onClick={()=> navigate('/signin')} className="bg-gray-800 border border-1 border-gray-700 text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-600">
          Dashboard
        </button>
      </div>
    </nav>
  );
}

import React, { useState } from 'react';
import RecipeCard from './components/RecipeCard';
import './App.css';  // Importer le fichier CSS

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);  // Ajouter cet état

  const APP_ID = '5a7abe13';  // Remplacez par votre APP_ID
  const APP_KEY = '9dc42eea9b09c42db6d87b7cb4d6fc15';  // Remplacez par votre APP_KEY

  // Fonction pour récupérer les recettes depuis l'API Edamam
  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
      const data = await response.json();
      console.log('Données de l\'API:', data); // Ajoutez un log pour vérifier les données
      setRecipes(data.hits.map(hit => hit.recipe)); // Mettre à jour les recettes
    } catch (error) {
      console.error('Erreur lors de la récupération des recettes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Gérer la soumission du formulaire de recherche
  const handleSearch = (e) => {
    e.preventDefault();
    setHasSearched(true);  // Indiquer que la recherche a été effectuée
    fetchRecipes();  // Effectuer la recherche des recettes
  };

  return (
    <div className="App">
      <form onSubmit={handleSearch} className="m-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}  // Mettre à jour le champ de recherche
          placeholder="Rechercher une recette..."
          className="border-2 border-gray-300 rounded p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Rechercher
        </button>
      </form>

      <div className="flex justify-between items-center m-4">
        <select 
          // Logique de tri (non montrée ici)
        >
          <option value="calories">Trier par Calories</option>
          <option value="time">Trier par Temps de Préparation</option>
        </select>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div>
          {/* Message d'erreur uniquement après la recherche */}
          {hasSearched && recipes.length === 0 && (
            <p className="text-red-500 text-center mt-4">Aucune recette trouvée. Essayez avec un autre mot-clé.</p>
          )}

          <div className="grid grid-cols-3 gap-4">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

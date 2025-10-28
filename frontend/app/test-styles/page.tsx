export default function TestStyles() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Test des Styles Tailwind
        </h1>
        
        {/* Test des couleurs de base */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-500 text-white p-4 rounded-lg text-center">
            Blue
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg text-center">
            Green
          </div>
          <div className="bg-red-500 text-white p-4 rounded-lg text-center">
            Red
          </div>
          <div className="bg-yellow-500 text-white p-4 rounded-lg text-center">
            Yellow
          </div>
        </div>

        {/* Test des composants Tailwind */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Composants de Test
          </h2>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors mr-4">
            Bouton Primaire
          </button>
          
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors">
            Bouton Secondaire
          </button>

          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800">Message de succès !</p>
          </div>
        </div>

        {/* Test de la grille */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-4 rounded-lg shadow border">
              <h3 className="text-lg font-medium text-gray-900">Card {item}</h3>
              <p className="text-gray-600 mt-2">Ceci est un test de style Tailwind CSS.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
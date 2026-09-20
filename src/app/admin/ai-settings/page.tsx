export default function AdminAISettings() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Süni İntellekt Ayarları
        </h2>
      </div>

      {/* AI Provider Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          AI Təminatı Seçimi
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-100 text-blue-800 flex items-center justify-center rounded-full">
              🤖
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">NVIDIA (Artıq seçilib)</h4>
              <p className="text-sm text-gray-500">
                Hal-hazırda NVIDIA API istifadə edilmişdir
              </p>
            </div>
          </div>
          <button className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 hover:text-gray-900">
            Təminatı dəyiş
          </button>
        </div>
      </div>

      {/* Model Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Model Ayarları
        </h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Model
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="nemotron-3-8b-instruct">Nemotron 3 8B Instruct</option>
                <option value="nemotron-3-22b-instruct">Nemotron 3 22B Instruct</option>
                <option value="llama-3-8b-instruct">Llama 3 8B Instruct</option>
                <option value="llama-3-70b-instruct">Llama 3 70B Instruct</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maksimum Cavab Uzunluğu
              </label>
              <input
                type="number"
                min="50"
                max="2000"
                value="1000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature
              </label>
              <input
                type="number"
                min="0"
                max="2"
                step="0.1"
                value="0.7"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Top-p
              </label>
              <input
                type="number"
                min="0"
                max="1"
                step="0.01"
                value="0.9"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* System Prompt */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Sistem Promptu
        </h3>
        <div className="space-y-3">
          <p className="text-sm text-gray-500 mb-2">
            AI-assistentin davranışını təyin edən başlangıç mesajı
          </p>
          <textarea
            rows={6}
            placeholder="Fizika Olimpiadası hazırlığı üçün mütəxəssis AI-assistent..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          >
Salam! Mən Fizika Dostunuz, RFO Fizika Olimpiadası hazırlığı üçün mütəxəssis AI-assistentiniz. Fizika problemləri,概念ları və problem həlli tekniklərə backyard stimulates help verirem. Cavablarımı Azerbaijan dilində verirem və problèmes adjımana qədər qədər bir ipucu verərək, sonrada tələbə hazır olarsa detallı şəraitə köməkəyə dayanmaq yardımı verirem.
          </textarea>
          <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors">
            Promptu Yadda Saxla
          </button>
        </div>
      </div>

      {/* API Status */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          API Statusu
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
            <div className="w-8 h-8 bg-blue-200 text-blue-800 flex items-center justify-center rounded-full">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M6 12l6 6 6-6"></path>
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">API Uğurla Bağlı</h4>
              <p className="text-sm text-gray-500">
                NVIDIA API ilə əlaqə qurulub, sistem hazırdır
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16h.01"></path>
              </svg>
            </div>
            <span className="text-sm text-gray-500">
              API Anahtarını Göster
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
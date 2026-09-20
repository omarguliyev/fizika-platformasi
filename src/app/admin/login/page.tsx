export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Admin Panel Girişi
          </h2>
          <p className="text-gray-600">
            RFO Fizika Platformunun administrator panelinə xoš gəldiniz
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              E-poçt
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="admin@rfo-fizika.az"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Şifrə
            </label>
            <input
              id="password"
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm text-gray-600">
              <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <span className="ml-2">Məni yadda saxla</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
              Şifrəni unudubsız?
            </a>
          </div>

          <button type="submit"
                  className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors">
            Daxil ol
          </button>

          <p className="text-xs text-gray-500">
            Demo giriş: admin@rfo-fizika.az / admin123
          </p>
        </form>
      </div>
    </div>
  );
}
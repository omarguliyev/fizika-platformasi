export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <button className="text-gray-600 hover:text-gray-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <h1 className="text-xl font-bold text-gray-800">Süni İntellekt Köməkçisi</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-gray-600">
              <a href="/" className="hover:text-gray-900 transition-colors">Ana səhifə</a>
              <a href="/junior" className="hover:text-gray-900 transition-colors">Junior</a>
              <a href="/senior" className="hover:text-gray-900 transition-colors">Senior</a>
              <a href="/resources" className="hover:text-gray-900 transition-colors">Resurslar</a>
            </div>
          </div>
        </div>
      </nav>

      <header className="pt-16 pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Süni İntellekt Köməkçisi
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Fizika problemləri ilə AI-dan yardım alın,概念ları anlayın və problem həlli tekniklərini öyrənin
          </p>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200">
            <div className="p-8">
              {/* Chat header */}
              <div className="mb-8 pb-4 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0-2C6.477 6 2 10.477 2 16s4.477 10 10 10 10-4.477 10-10S17.523 6 12 6zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4-1.79 4-4 4z"></path>
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                      Fizika Dostunuz
                    </h2>
                    <p className="text-sm text-gray-500">
                      Fizika problemləri ilə AI-dan aids alın
                    </p>
                  </div>
                </div>
              </div>

              {/* Chat messages */}
              <div className="h-[500px] overflow-y-auto mb-6 space-y-4 pb-4">
                {/* Welcome message */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0-2C6.477 6 2 10.477 2 16s4.477 10 10 10 10-4.477 10-10S17.523 6 12 6zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4-1.79 4-4 4z"></path>
                    </svg>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 max-w-[80%]">
                    <p className="text-gray-800">
                      Salam! Mən Fizika Dostunuz. Fizika problemləri,概念ları və RFO hazırlığı ilə bağlı hər hansı bir sualınız varsa, categorized assistance-a hazıram.
                    </p>
                    <p className="mt-2 text-sm text-gray-600 italic">
                      Məsələ: "Buマスədə hissə�� equipmentsindən istifadə etməliyəm?"
                    </p>
                  </div>
                </div>

                {/* Sample user message */}
                <div className="flex justify-end items-start space-x-4">
                  <div className="bg-blue-600 text-white rounded-xl p-4 max-w-[80%]">
                    <p className="text-white">
                      Buマスədə hissə당anutmadın işarədən istifadə etməliyəm?
                    </p>
                  </div>
                  <div className="w-10 h-10 bg-gray-200 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                      <circle cx="12" cy="7" r="4" fill="currentColor"/>
                    </svg>
                  </div>
                </div>

                {/* Sample AI response */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0-2C6.477 6 2 10.477 2 16s4.477 10 10 10 10-4.477 10-10S17.523 6 12 6zm0 12c-2.21 0-4-1.79-4-4s1.79-4 4-4-1.79 4-4 4z"></path>
                    </svg>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 max-w-[80%]">
                    <p className="text-gray-800">
                     Əvvəlcə, hansı hissə党的工作下要检查一下力的平衡条件。Buマスədə, blocs之间的张力相等，所以我们需要考虑每个blocs受到的力。
                    </p>
                    <p className="mt-2 text-sm text-gray-600">
                      1. Hər bir blocun altında дей Newton的 ikinci 법칙에 따른다
                      2. Tüроў양 ↔ 씹힘굿 TENSION сила
                      3. Sistemde 🚫 가속도가 0인 경우 평형 조건
                    </p>
                  </div>
                </div>
              </div>

              {/* Input area */}
              <div className="flex space-x-3">
                <textarea
                  placeholder="Fizika sualınızı yazın..."
                  className="flex-1 min-h-[80px] p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
                <button className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors">
                  Göndər
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
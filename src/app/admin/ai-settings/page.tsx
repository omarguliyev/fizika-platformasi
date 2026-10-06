"use client";

import { useState, useEffect } from "react";

export default function AdminAISettings() {
  const [settings, setSettings] = useState({
    provider: "google",
    model: "gemini-3.1-flash-lite",
    temperature: 0.7,
    maxTokens: 1000,
    systemPrompt: "",
    googleApiKeyConfigured: false,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Süni intellekt ayarlarını əldə et
  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/ai-settings");

        if (!response.ok) {
          throw new Error("Süni intellekt ayarlarını əldə etmək mümkün olmadı");
        }

        const data = await response.json();

        setSettings((previous) => ({ ...previous, ...data }));
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Süni intellekt ayarlarını yükləmək mümkün olmadı"
        );

        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Form sahələrinin dəyişdirilməsi
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setError(null);

    setSettings((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  // Formu yadda saxla
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/ai-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        const responseText = await response.text();
        let errorData: { error?: string } = {};
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = {};
        }

        throw new Error(
          errorData.error ||
            `Ayarları yadda saxlamaq olmadı (HTTP ${response.status}). Cavab: ${responseText.slice(0, 300)}`
        );
      }

      const savedSettings = await response.json();
      setSettings((previous) => ({ ...previous, ...savedSettings }));
      setSuccess(true);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Süni intellekt ayarlarını yadda saxlamaq mümkün olmadı"
      );

      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-6">
        <div className="flex items-center justify-center h-64">
          <h2 className="text-2xl font-bold text-gray-900">
            Yüklənir...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Süni İntellekt Ayarları
        </h1>

        <p className="text-sm text-gray-500">
          Süni intellekt təminatçısını, modelini, sistem promptunu və
          digər parametrlərini idarə edin
        </p>
      </div>

      {success && (
        <div className="mb-4 p-4 bg-green-50 text-green-800 rounded-lg">
          Ayarlar uğurla yadda saxlanıldı!
        </div>
      )}
      {error && (
        <div role="alert" className="mb-4 rounded-lg bg-red-50 p-4 text-red-800">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Süni intellekt təminatçısı */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Süni İntellekt Təminatçısı
          </h3>

          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 text-blue-800 flex items-center justify-center rounded-full">
                🤖
              </div>

              <div>
                <h4 className="font-semibold text-gray-800">
                  Google AI Studio — aktiv
                </h4>

                <p className="text-sm text-gray-500">
                  Google Gemini API istifadə olunur
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Model ayarları */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Model Ayarları
          </h3>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  AI təminatçısı
                </label>

                <p className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-gray-800">
                  Google AI Studio (Gemini)
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  AI Studio-da təqdim etdiyiniz Google Cloud layihəsini seçib həmin layihə üçün API açarı yaradın. Layihə ID-si açarın yerinə istifadə edilə bilməz.
                </p>
                <p className={`mt-2 text-sm ${settings.googleApiKeyConfigured ? "text-green-700" : "text-amber-700"}`}>
                  Google API açarı {settings.googleApiKeyConfigured ? "serverdə konfiqurasiya edilib." : "serverdə tapılmadı."}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Açarı .env faylında GOOGLE_API_KEY və ya GEMINI_API_KEY kimi qeyd edin, sonra tətbiqi yenidən başladın. Açarı admin formasına və ya brauzerə daxil etməyin.
                </p>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-block text-sm text-blue-600 hover:underline"
                >
                  Google AI Studio-da API açarı yarat
                </a>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model
                </label>

                <select
                  name="model"
                  value={settings.model}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="gemini-3.1-flash-lite">Gemini 3.1 Flash-Lite</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maksimum cavab uzunluğu
                </label>

                <input
                  type="number"
                  name="maxTokens"
                  value={settings.maxTokens}
                  onChange={handleInputChange}
                  min="1"
                  max="32768"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Temperatur
                </label>

                <input
                  type="number"
                  name="temperature"
                  value={settings.temperature}
                  onChange={handleInputChange}
                  min="0"
                  max="2"
                  step="0.1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Top-p
                </label>

                <input
                  type="number"
                  value={0.9}
                  onChange={() => {}}
                  min="0"
                  max="1"
                  step="0.01"
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />

                <p className="mt-1 text-xs text-gray-500">
                  Bu parametr hazırda istifadə olunmur.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sistem promptu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Sistem Promptu
          </h3>

          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-2">
              Süni intellekt köməkçisinin davranışını və cavab üslubunu
              müəyyən edən əsas təlimat.
            </p>

            <textarea
              name="systemPrompt"
              value={settings.systemPrompt}
              onChange={handleInputChange}
              rows={6}
              placeholder="Fizika Olimpiadasına hazırlıq üzrə ixtisaslaşmış süni intellekt köməkçisi..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            <div className="flex items-center">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving
                  ? "Yadda saxlanılır..."
                  : "AI ayarlarını yadda saxla"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

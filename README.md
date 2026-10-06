# RFO Fizika Platformu

Azərbaycan Respublikası Fənn Olimpiadası (RFO) — fizika hazırlığı üçün müasir təhsil platforması.

## Layihə haqqında

Bu layihə şagirdlərin RFO Fizika olimpiadasına hazırlanmasını asanlaşdırmaq üçün hazırlanmışdır.

Əsas imkanlar:

* **Müasir interfeys** — Azərbaycan dilində təmiz və istifadəçi dostu dizayn
* **İki səviyyə** — Junior (8–9-cu sinif) və Senior (10–11-ci sinif) bölmələri
* **Resurs kitabxanası** — PDF-lər, kitablar, testlər və digər tədris materialları
* **Keçmiş RFO məsələləri** — İllər üzrə təşkil edilmiş olimpiada materialları
* **Süni intellekt köməkçisi** — Fizika məsələləri üzrə AI dəstəyi
* **Admin paneli** — Resursların və platformanın idarə edilməsi
* **Axtarış və filtrləmə** — Resursları tez tapmaq üçün axtarış sistemi
* **Mobil uyğunluq** — Desktop, planşet və mobil cihazlar üçün responsive dizayn

## Quraşdırma

1. Layihənin asılılıqlarını yükləyin:

```bash
npm install
```

2. `.env.example` faylını `.env` olaraq kopyalayın və lazımi dəyərləri doldurun:

```bash
cp .env.example .env
```

3. Verilənlər bazasını hazırlayın:

```bash
npx prisma migrate dev
```

4. Tətbiqi işə salın:

```bash
npm run dev
```

`DATABASE_URL` bu layihədə SQLite üçün `file:./dev.db` olmalıdır. Sxem dəyişikliklərindən sonra `npx prisma migrate dev` və `npx prisma generate` əmrlərini işlədin.

Production mühitində yeni migration-ları deployment zamanı `npx prisma migrate deploy` ilə tətbiq edin.

### Admin hesabının qurulması və yenilənməsi

Admin giriş məlumatlarını `.env` faylında `ADMIN_EMAIL` və `ADMIN_PASSWORD` altında saxlayın (`.env.example` yalnız nümunədir). Sonra `npm run admin:sync` əmri həmin e-poçt üçün hesab yaradır və ya parolu yeniləyir. Mövcud admin hesabının e-poçtunu dəyişmək lazım olduqda `ADMIN_PREVIOUS_EMAIL`-i yalnız əmri icra edərkən əvvəlki e-poçta təyin edin; skript həmin hesabı yeni e-poçta köçürür, başqa admin hesablarını silmir. Admin parolları bcrypt ilə hash olunaraq bazada saxlanılır.

## Hesablar, testlər və fayl yükləmələri

Şagird hesabı `/signup` səhifəsindən e-poçt, istifadəçi adı və şifrə ilə yaradılır, sonra `/login` səhifəsində açılır. Şifrələr yalnız bcrypt hash kimi saxlanılır. Admin hesabları ayrıca `Admin` cədvəlində saxlanılır və `/admin/login` səhifəsində ayrıca credentials provider ilə yoxlanılır. Admin icazəsi Next.js `proxy.ts` və admin API-lərində server tərəfində yoxlanılır. Resurs kitabxanası, Junior/Senior və RFO bölmələri, testlər, AI köməkçisi və yüklənmiş fayllara yalnız qeydiyyatdan keçib daxil olmuş istifadəçilər baxa bilər; qonaqlar qeydiyyat və giriş səhifələrindən başlaya bilərlər.

Admin resurs formasında PDF, JPG, PNG, TXT və MP4 faylları yükləyə bilər. Fayllar lokal inkişaf mühitində `public/uploads` qovluğuna UUID adı ilə yazılır. `MAX_FILE_SIZE` (baytla, standart 10 MB) ölçü həddini dəyişir. Serverless deployment üçün `/api/uploads` endpoint-i obyekt saxlama provider-inə köçürülməlidir; provider credential-ları heç vaxt `NEXT_PUBLIC_*` dəyişənlərində saxlamayın.

Admin `POST /api/tests` ilə `TEST` resursu və suallar yarada bilər. `SINGLE_CHOICE`, `MULTIPLE_CHOICE` (dəqiq seçim dəsti) və `OPEN_ANSWER` tipləri server tərəfində qiymətləndirilir. Tələbə cavabları `POST /api/tests/[resourceId]` ilə göndərilir, doğru cavablar brauzerə qaytarılmır və nəticə `TestAttempt`/`TestAnswer` cədvəllərində saxlanılır.

## Funksiyalar

### Şagird tərəfi

* Ana səhifədə Junior və Senior bölmələri
* Fizika mövzuları üzrə kateqoriyalar
* Keçmiş RFO imtahanlarının materialları
* PDF-lərə baxış və yükləmə
* Süni intellekt köməkçisi
* Resurs axtarışı və filtrlənməsi

### Admin tərəfi

* Təhlükəsiz giriş sistemi
* Dashboard statistikaları
* Resursların yüklənməsi, redaktəsi və silinməsi
* Kateqoriyaların idarə edilməsi
* RFO illərinin və mərhələlərinin idarə edilməsi
* AI model və prompt parametrləri
* Gələcəkdə istifadəçi idarəetməsi

## Texnologiyalar

* **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS
* **Backend:** Next.js API Routes
* **Verilənlər bazası:** SQLite + Prisma ORM
* **AI:** Google AI Studio (Gemini API)
* **Fayl saxlanması:** Lokal inkişaf saxlancı (`public/uploads`)

## Layihə strukturu

```text
src/
├── app/
│   ├── (routes)/          # Ana səhifə, Junior, Senior və digər səhifələr
│   ├── admin/             # Admin panel
│   ├── components/        # Yenidən istifadə edilə bilən komponentlər
│   └── lib/               # Yardımçı funksiyalar
├── prisma/                # Verilənlər bazası sxemi və migration-lar
├── public/                # Statik fayllar
└── scripts/               # Quraşdırma və deployment skriptləri
```

## Təhlükəsizlik

API açarları və digər məxfi məlumatlar `.env` faylında saxlanılmalıdır və GitHub-a yüklənməməlidir.

`.env.example` faylı yalnız tələb olunan environment dəyişənlərini göstərmək üçün istifadə olunur.

### AI təminatçısının qurulması

AI açarlarını yalnız server mühit dəyişənlərində saxlayın; onları `NEXT_PUBLIC_*` dəyişənlərinə və ya brauzer koduna yerləşdirməyin. Google AI Studio istifadə etmək üçün [AI Studio API keys](https://aistudio.google.com/apikey) səhifəsindən API açarı yaradın. Açarı yaratmazdan əvvəl **Projects** bölməsində istifadə etmək istədiyiniz Google Cloud layihəsini seçin və açarı həmin layihə üçün yaradın. Gemini Developer API sorğusunda layihə ID-si ayrıca göndərilmir; Google layihəni API açarı ilə əlaqələndirir, buna görə layihə ID-si açarı əvəz etmir. Açarı `.env` faylında `GOOGLE_API_KEY` (və ya `GEMINI_API_KEY`) dəyişəninə əlavə edin. Tətbiq hazırda **Gemini 3.1 Flash-Lite** istifadə edir, çünki bu model canlı olaraq sınaqdan keçirilib və cavab qaytarıb. `.env` dəyişəndən sonra tətbiqi yenidən başladın. Layihənin API açarı, Gemini API icazəsi və quota/billing statusu düzgün olmalıdır.

Tətbiqdə NVIDIA modeli aktiv deyil. Admin AI ayarları yalnız dəstəklənən Gemini modellərini təklif edir; köhnə NVIDIA model adları artıq seçilə bilməz.

## Lisenziya

Ətraflı məlumat üçün `LICENSE` faylına baxın.

## Əlaqə

Layihə ilə bağlı təklif və problemlər üçün GitHub Issues bölməsindən istifadə edə bilərsiniz.

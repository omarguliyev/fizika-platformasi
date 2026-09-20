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
* **Verilənlər bazası:** PostgreSQL + Prisma ORM
* **AI:** NVIDIA API
* **Fayl saxlanması:** Lokal saxlama, gələcəkdə bulud inteqrasiyası üçün hazırlanmışdır

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

## Lisenziya

Ətraflı məlumat üçün `LICENSE` faylına baxın.

## Əlaqə

Layihə ilə bağlı təklif və problemlər üçün GitHub Issues bölməsindən istifadə edə bilərsiniz.

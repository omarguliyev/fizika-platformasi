# RFO Fizika Platformu

Azərbaycan Respublikası Fənn Olimpiadası (RFO) — Fizika hazırlığı üçün现代教学平台.

## PULAKLAR

Bu layihə tələbələrin RFO Fizika olimpiadasına hazırlanmasını asanlaşdırmaq üçün dizayn edilmişdir:

- **Modern интерфейс**: Azerbaijan dili ilə tam uyğun, təmiz və привлекательный дизайн
- **İki seviyyə**: Junior (8-9-cu sinif) və Senior (10-11-ci sinif) bölmələri
- **Zəhinli resurs kitabxanası**: PDF, kitablər, testlər, video dərslər və Digər materiallar
- **Keçmiş RFO məsələləri**: İllər üzrə organisiert imtahan problemləri
- **Süni intellekt köməkçisi**: NVIDIA-powered AI-assistent Fizika problemləri ilə yardım
- **Admin paneli**: Tam funksionallı administrator interfeysi
- **Axtarım və filtirləmə**: Tez və effektiv məxzul tapma sistemi
- **Mobil uyğun**: Desktop, planset və mobil cihazlarda tam funksionalli

## TƏQİM

1. Layihə dépendənslərini yükləyin:
   ```bash
   npm install
   ```

2. `.env.example` faylını `.env` olaraq kopyalayın və lazım olan dəyərləri doldurun:
   ```bash
   cp .env.example .env
   ```

3. Verilən bazasını hazırlayın:
   ```bash
   npx prisma migrate dev
   ```

4. Tətbiqi işə salın:
   ```bash
   npm run dev
   ```

## FEATURES

### İstifadəçi Tərəfi
- Ana səhifədə Junior və Senior bölməлері
- Kateqoriyaya görə mexanika, molekulyar fizika, termodinamika, elektrik, maqnetizm, optika və Digər
- Keçmiş RFO imtahan illərindən problemlər və hallar
- PDF ön.view və yükləmə
- Süni intellekt köməkçisi ilə Fizika sualları
- Resurs axtarımı və filtirləməsi

### Admin Tərəfi
- Güvenli giriş sistemi
- Dashboard İstatistikaları
- Resurs idarəetməsi (yükleme, redaktə etme, silmə)
- Kateqoriya idarəetməsi
- RFO il və mərhələ idarəetməsi
- AI model və prompt ayarları
- İstifadəçi idarəetməsi (gələcək versiya üçün texxit edilib)

## texnoloqi yığımı

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API routes
- **Verilən bazası**: PostgreSQL + Prisma ORM
- **Təəssüd**: NextAuth (gələcək versiya üçün)
- **Fayl saxlayışı**: Yerli saxlayış (gələcəkdə bulut inteqrasiyası üçün dizayn edilmişdir)
- **AI Təminatı**: NVIDIA API (abstraktilangan, gələcəkdə dəyişdirilə bilər)

## QURULUQ

```
src/
├── app/
│   ├── (routes)           # Sahə yollarları (anasəhifə, junior, senior, vessels)
│   ├── admin/             # Admin panel
│   ├── components/        # Yenidən istifadə edilə bilən komponentlər
│   └── lib/               # Yardımcı funksiyalar
├── prisma/                # Verilən bazası sxemi və migratorlar
├── public/                # Statik fonlar
└── scripts/               # Deployment və qurulum skriptləri
```

## LİSENZİYA

Bu layihə əməkdaslıq üçün açıqkodludur. Ətraflı məlumat üçün `LICENSE` faylına baxın.

## Əlaqə

İstifadəçiスタジアムs və təkliflər üçün: info@rfo-fizika.az
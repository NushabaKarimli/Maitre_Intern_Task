# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```


1. LAYİHƏNİ NECƏ İŞƏ SALAQ


Layihəni yerli mühitdə işə salmaq üçün növbəti əmrləri icra edin:

  1. Repozitoriyanı kopyalayın (clone):

     git clone https://github.com/NushabaKarimli/Maitre_Intern_Task.git

  2. Layihə qovluğuna keçin:

     cd project-folder

  3. Asılılıqları (packages) yükləyin:

     npm install

  4. Layihəni işə salın:

     npm run dev





2. ƏSAS QƏRARLAR VƏ ONLARIN SƏBƏBLƏRİ (KEY DECISIONS)

  • Custom CSS (External CSS): Kənar UI kütləsi (MUI, AntD və s.) 

    istifadə etmədən, təqdim olunan Stil Bələdçisinə (Design System) 

    düzgün riayət etmək (rənglər, şriftlər, künc radiusları, boşluqlar) 

    və layihənin ölçüsünü yüngül saxlamaq üçün təmiz CSS-dən istifadə edildi.


  • Custom Toggle Switch: Satışda olma/olmama statusu üçün kənar 

    kitabxana əvəzinə təmiz HTML Checkbox və CSS animation mexanizmi 

    quruldu. Bu, yüksək performans və tam dizayn uyğunluğu təmin edir.



  • Modulyar Komponent Yapısı: Kodun oxunmasını və gələcəkdə 

    genişləndirilməsini asanlaşdırmaq üçün Header, ProductModal və App 

    hissələri ayrı komponentlərə bölündü.





3. TƏLƏBLƏRDƏKİ AÇIQ MƏQAMLAR ÜÇÜN VERİLƏN QƏRARLAR 



  • Satışda Olmayan Məhsulların Vizual Görünüşü: Məhsul "Satışda deyil" 

    statusunda olduqda istifadəçi təcrübəsini yaxşılaşdırmaq üçün 

    bütün sətrə (ad, kateqoriya, qiymət) opacity: 0.5 şəffaflığı tətbiq 

    edildi.


  • Responsivlik (Mobile First / Responsive): Dizayn bələdçisində 

    göstərilən masaüstü (70px) və mobil (16px) kənar boşluqları 

    nəzərə alınaraq, kiçik ekranlarda cədvəl horizontal scroll olunacaq 

    və filterlər alt-alta düşəcək şəkildə nizamlandı.





4. TAPŞIRIĞA SƏRF OLUNAN VAXT 

  • Ümumi vaxt: 4 - 5 saat





5. DAHA ÇOX VAXT OLSAYDI EDİLƏCƏK DƏYİŞİKLİKLƏR (FUTURE IMPROVEMENTS)



  1 Toast Notifications: Məhsul əlavə olunduqda, düzəliş edildikdə və ya 

    xəta baş verdikdə istifadəçiyə daha qəşəng bildirişlər (toast) 

    göstərilərdi.


  2 Dark mode light mode ozelliyi eleave etmek olardi

  3 Cedvelde hem de yemeklerin sekillerin elave etmek olari


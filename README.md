# Proje Danışmanı Uygulaması 📱

![Proje Danışmanı Logo](https://img.icons8.com/color/96/000000/project-management.png)

## 📋 Proje Hakkında

Proje Danışmanı, proje geliştirmeye yeni başlayanlar için tasarlanmış bir mobil uygulamadır. Bu uygulama, Expo Go platformunda çalışır ve kullanıcıların proje fikirlerini değerlendirmelerine, yapay zeka yardımıyla adım adım rehberlik almalarına olanak tanır.

### 🌟 Temel Özellikler

- **Proje Fikri Girişi**: Kullanıcılar proje fikirlerini detaylı bir şekilde açıklayabilir
- **Seviye Belirleme**: Kullanıcılar kendi programlama/geliştirme seviyelerini seçebilir (Başlangıç, Orta, İleri)
- **Yapay Zeka Değerlendirmesi**: Google Gemini 2.0 Flash yapay zeka modeli kullanılarak projenin değerlendirmesi yapılır
- **Görev Listesi**: Projeyi tamamlamak için adım adım yapılması gereken görevlerin listesi sunulur
- **İlerleme Takibi**: Kullanıcılar görevleri tamamladıkça işaretleyebilir ve ilerlemelerini takip edebilir
- **Akış Diyagramı**: Projenin yapısal akışını gösteren bir açıklama sunulur

## 💻 Teknolojiler

Bu uygulama aşağıdaki teknolojiler kullanılarak geliştirilmiştir:

- **React Native**: Çapraz platform mobil uygulama geliştirme
- **Expo**: Kolay geliştirme ve dağıtım için React Native framework'ü
- **Google Gemini AI**: Proje değerlendirmesi ve görev listesi oluşturma için yapay zeka API'si
- **AsyncStorage**: Yerel veri depolama için
- **React Navigation**: Ekranlar arası geçiş için

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- Node.js (14.0 veya üstü)
- npm veya yarn
- Expo CLI
- Expo Go (mobil cihazınızda test etmek için)

### Adımlar

1. Projeyi klonlayın:
   ```bash
   git clone https://github.com/Busrapehlivan/Project-advisor-application-react.git
   cd Project-advisor-application-react
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   # veya
   yarn install
   ```

3. Uygulamayı başlatın:
   ```bash
   npx expo start
   ```

4. Mobil cihazınızda test etmek için:
   - Expo Go uygulamasını mobil cihazınıza indirin
   - QR kodunu Expo Go uygulaması ile tarayın (Android) veya Kamera uygulaması ile tarayın (iOS)

5. Eğer bağlantı sorunları yaşıyorsanız, tünel bağlantısı kullanın:
   ```bash
   npx expo start --tunnel
   ```

## 📱 Kullanım Kılavuzu

### Proje Fikri Girişi

1. Uygulamayı açın
2. "Proje Fikriniz" alanına projenizi detaylı bir şekilde tanımlayan bir açıklama yazın
3. "Seviyeniz" bölümünden kendi bilgi/deneyim seviyenizi seçin (Başlangıç, Orta, İleri)
4. "Değerlendirmeyi Başlat" butonuna tıklayın ve yapay zeka modelinin projenizi değerlendirmesini bekleyin

### Sonuçları İnceleme

1. **Değerlendirme**: Proje fikrinizin uygulanabilirlik, zorluk seviyesi ve potansiyel değerini gösteren kapsamlı bir analiz
2. **Öneriler**: Projenizi daha iyi hale getirmek için sunulan tavsiyeler
3. **Görevler**: Projeyi gerçekleştirmek için adım adım yapılması gereken görevler listesi
   - Görevleri tamamladıkça üzerine tıklayarak işaretleyebilirsiniz
   - İlerleme durumunuzu yüzde olarak takip edebilirsiniz
4. **Akış Diyagramı**: Projenizin genel yapısını ve iş akışını gösteren açıklama

### Projeler Listesi

- Ana ekranda, daha önce değerlendirdiğiniz projeleri "Projelerim" butonuna tıklayarak görüntüleyebilirsiniz
- Her projenin ilerleme durumunu görebilir ve üzerine tıklayarak detaylarına erişebilirsiniz

## 🧩 Proje Yapısı

```
ProjectAdvisorApp/
├── src/
│   ├── components/       # Yeniden kullanılabilir UI bileşenleri
│   ├── screens/          # Uygulama ekranları
│   │   ├── HomeScreen.js       # Ana giriş ekranı
│   │   ├── ResultsScreen.js    # Sonuç görüntüleme ekranı
│   │   └── ProjectsListScreen.js # Projeler listesi ekranı
│   ├── services/         # API ve veri yönetimi
│   │   ├── geminiService.js    # Gemini API entegrasyonu
│   │   └── storageService.js   # Yerel depolama yönetimi
│   └── navigation/       # Ekranlar arası geçiş
│       └── AppNavigator.js     # Navigasyon yapılandırması
├── App.js                # Ana uygulama bileşeni
├── package.json          # Bağımlılıklar ve scripts
└── README.md             # Proje dokümantasyonu
```

## 🧠 API Kullanımı

Uygulama, Google Gemini 2.0 Flash modelini kullanarak proje değerlendirmesi yapar:

```javascript
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// API isteği örneği
const response = await fetch(`${API_URL}?key=${API_KEY}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    contents: [{
      parts: [{
        text: "Proje değerlendirme isteği..."
      }]
    }]
  }),
});
```

## 🔮 Gelecek Geliştirmeler

- Daha detaylı proje kategorileri ve şablonlar
- Kullanıcı hesapları ve bulut senkronizasyonu
- Proje iş birliği ve paylaşım özellikleri
- Detaylı zaman çizelgesi ve hatırlatıcılar
- Kaynak önerileri ve öğrenme materyalleri

## 🔧 Sorun Giderme

- **Expo Go Bağlantı Sorunları**: Eğer QR kodu taradığınızda "Something went wrong" hatası alıyorsanız, `expo start --tunnel` komutunu kullanarak tünel bağlantısı kurun
- **API Yanıt Hataları**: Eğer API yanıtlarında sorun yaşıyorsanız, daha kısa ve net proje açıklamaları girmeyi deneyin
- **Uygulama Yükleme Sorunları**: Bağımlılıkları güncellemek için `npm install` komutunu çalıştırın

## 👥 Katkıda Bulunma

1. Bu repo'yu fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Harika özellik eklendi'`)
4. Branch'inize push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

Büşra Pehlivan - [GitHub](https://github.com/Busrapehlivan)

Proje Linki: [https://github.com/Busrapehlivan/Project-advisor-application-react](https://github.com/Busrapehlivan/Project-advisor-application-react)

# Proje Takip Panosu - Taşınabilir Versiyon

Bu tamamen taşınabilir proje takip uygulaması herhangi bir kurulum gerektirmeden doğrudan tarayıcıda çalışır.

## Özellikler

- ✅ **Üye Yönetimi**: Üye ekleme, düzenleme, silme
- ✅ **Proje Yönetimi**: Proje oluşturma, üye atama, durum takibi
- ✅ **Görev Yönetimi**: Görev oluşturma, öncelik belirleme, atama
- ✅ **İstatistikler**: Proje ve görev tamamlama oranları
- ✅ **Filtreleme**: Durum, öncelik, atama bazlı filtreleme
- ✅ **Tema Desteği**: Açık/Koyu tema seçeneği
- ✅ **Veri İhraç/İthal**: JSON formatında veri yedekleme
- ✅ **Çevrimdışı Çalışma**: İnternet bağlantısı gerektirmez
- ✅ **Yerel Depolama**: Veriler tarayıcının localStorage'ında saklanır

## Kurulum Gerekmez!

Bu uygulama için Node.js, Python veya başka bir şey kurmanıza gerek yok.

## Nasıl Kullanılır?

### 1. Doğrudan Çalıştırma
1. `index.html` dosyasına çift tıklayın
2. Uygulama tarayıcınızda otomatik açılır
3. Hemen kullanmaya başlayın!

### 2. USB Taşınabilir Kullanım
1. Tüm dosyaları USB belleğinize kopyalayın
2. USB'yi herhangi bir bilgisayara takın
3. `index.html` dosyasına çift tıklayın
4. Uygulama çalışır!

### 3. Ağ Paylaşımı (İsteğe Bağlı)
1. Dosyaları bir ağ klasörüne kopyalayın
2. Diğer kullanıcılar ağ üzerinden `index.html` dosyasını açabilir
3. Her kullanıcı kendi verilerini yerel olarak saklar

## İlk Kullanım

Uygulama ilk açıldığında boş gelecektir. Başlamak için:

1. **Önce Üye Ekleyin**: "Üyeler" sekmesine geçip yeni üyeler ekleyin
2. **Sonra Proje Oluşturun**: "Projeler" sekmesinden yeni projeler oluşturun
3. **Sonra Görev Ekleyin**: "Görevler" sekmesinden görevler ekleyin

### Örnek Veri Yapısı

```
Üyeler: Ahmet, Mehmet, Ayşe
Projeler: Web Sitesi, Mobil Uygulama
Görevler: Tasarım, Geliştirme, Test
```

## Veri Yönetimi

### Veri Saklama
- Tüm veriler tarayıcının `localStorage`'ında saklanır
- Veriler cihazda kalıcı olarak saklanır
- Çevrimdışı çalışmaya devam eder

### Veri Yedekleme
1. Sağ üstteki "Dışa Aktar" butonuna tıklayın
2. JSON dosyası indirilir
3. Bu dosyayı güvenli bir yerde saklayın

### Veri Geri Yükleme
1. "İçe Aktar" butonuna tıklayın
2. Önceki yedeklediğiniz JSON dosyasını seçin
3. Veriler otomatik yüklenir

### Veri Temizleme
- "Temizle" butonu tüm verileri siler
- Dikkatli kullanın, geri alınamaz!

## Tarayıcı Uyumluluğu

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Opera 47+

## Mobil Cihazlarda Kullanım

- Telefon veya tablette de çalışır
- Dokunmatik ekran için optimize edilmiş
- Responsive tasarım

## Sorun Giderme

### Uygulama Açılmıyor
- Dosyayı doğru tarayıcıda açtığınızdan emin olun
- Internet Explorer gibi eski tarayıcılar desteklenmez

### Veriler Kayboldu
- Tarayıcı verilerini temizlediyseniz veriler silinir
- Düzenli yedekleme yapın
- Farklı tarayıcılar verileri paylaşmaz

### Performans Sorunları
- Çok fazla veri eklediyseniz performans düşebilir
- Eski verileri düzenli olarak temizleyin
- Yedekleyip temizleme yapabilirsiniz

## Teknik Detaylar

### Kullanılan Teknolojiler
- **HTML5**: Modern HTML yapısı
- **CSS3**: Tailwind CSS ile stil
- **JavaScript**: Vanilla JS (React/Vue/Angular gerekmez)
- **LocalStorage**: Veri saklama
- **Font Awesome**: İkonlar

### Dosya Yapısı
```
├── index.html          # Ana uygulama dosyası
├── js/
│   ├── storage.js      # Veri yönetimi
│   ├── components.js   # UI bileşenleri
│   └── app.js         # Ana uygulama mantığı
└── README.md          # Bu dosya
```

### Veri Modeli
```javascript
{
  members: [
    {
      id: "uuid",
      name: "Ahmet Yılmaz",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z"
    }
  ],
  projects: [
    {
      id: "uuid",
      title: "Web Sitesi",
      description: "Kurumsal web sitesi",
      startDate: "2024-01-01T00:00:00.000Z",
      endDate: "2024-01-31T00:00:00.000Z",
      status: "active",
      assignedMemberIds: ["uuid1", "uuid2"],
      taskIds: ["uuid3"],
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z"
    }
  ],
  tasks: [
    {
      id: "uuid",
      projectId: "uuid",
      title: "Tasarım",
      description: "Ana sayfa tasarımı",
      priority: "high",
      dueDate: "2024-01-15T00:00:00.000Z",
      status: "in-progress",
      assignedMemberId: "uuid1",
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

## Güvenlik

- Veriler cihazınızda kalır, sunucuya gönderilmez
- İnternet bağlantısı gerekmez
- Tamamen çevrimdışı çalışır
- Veriler sizin kontrolünüzdedir

## Lisans

Bu uygulama tamamen ücretsizdir ve herhangi bir kısıtlama olmadan kullanılabilir.

## Destek

Sorularınız veya önerileriniz için:
- Uygulama içindeki butonları kullanın
- README dosyasını okuyun
- Basit ve kullanıcı dostu arayüz
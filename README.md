# Olta Pazarı — yeni alışveriş arayüzü

Olta Pazarı’nın orijinal logosunu ve mavi renklerini koruyan, alıcıya odaklı mobil ve masaüstü arayüz.

Ana sayfa Fırsat Avı ve Mağazalardan Seçili Ürünler ile başlar. Av türleri ayrı sayfadadır. Menü, hesap, filtreler ve sepet normal sayfa olarak açılır; açılır pencere kullanılmaz. Ürün kartları görsel, ad, fiyat ve İncele düğmesiyle sınırlıdır. Favori ve karşılaştırma ürün detayındadır.

## Çalışan akışlar

- Çok kelimeli ürün/marka/satıcı araması; çoklu marka, fiyat, kategori, av türü, satıcı, ödeme biçimi, stok, durum ve ilan tarihi filtreleri.
- Önerilen, çok satan, çok görüntülenen, yeni gelen, fiyat artan/azalan, indirim oranı ve A–Z sıralaması.
- Filtre uygulamadan önce canlı sonuç sayısı; marka araması ve seçenek sayıları; tek tek filtre kaldırma; 12 ürünlük sayfalama.
- Av türü → ekipman → ürün seçimi.
- Mağazalar ile bireysel satıcıların ayrılması.
- Bireysel ilanlarda **Siteden satın al** ve **Satıcıyla görüş** ayrımı.
- Ürün detayı, teknik açıklama, favoriler ve en çok üç ürün karşılaştırma.
- Sepet, adet değiştirme, teslimat formu, alan bazında doğrulama, sipariş kontrolü ve deneme tamamlanma ekranı.
- Yeni başlayanlar için iki sorulu seçim yardımcısı.
- Rehber, destek, balıkçı araçları, desi hesaplama ve mevcut özelliklerin bağlantı envanteri.

## Veri ve sınırlar

Bu sürüm, kullanıcının onayladığı **çalışan önizlemedir**. KMK yönetim/tema veya API erişimi verilmedi. Gerçek ödeme, sipariş, üyelik, stok güncelleme veya satıcıya mesaj gönderme yapılmaz. Sipariş sonuç ekranı bunu açıkça belirtir. Şifre ve kart bilgisi istenmez. Teslimat örneği yalnızca oturum belleğindedir; sunucuya gönderilmez. Favoriler, karşılaştırma ve sepet aynı tarayıcıda saklanır.

298 ürün ve 405 bağlantı, 6 Kasım 2026’da herkese açık sayfalardan alınmıştır. Fiyatlar sabit örneklerdir. Katalog tam değildir. Satış biçimi ürün sayfasındaki `add-cart-form` / `sales` / `notsales` / `storeSell` / `userSell` işaretlerinden doğrulanmıştır: 274 online, 11 iletişim, 13 doğrulanamayan kayıt. Bireysel kayıtlarda 7 online, 11 iletişim, 1 doğrulanamayan kayıt vardır. Doğrulanamayan ürünlerde sepete ekleme açılmaz.

Gerçek üretim geçişinde oturum, canlı stok/fiyat, varyant, sipariş, ödeme, kargo, iade, kupon ve satıcı paneli KMK servislerine bağlanmalıdır. Yönetim erişimi olmadan bunların taşındığı veya uçtan uca doğrulandığı iddia edilmez. Mevcut uygulama ve hesap işlemleri bağlantı envanterinde korunmuştur.

Çok satan, çok görüntülenen ve yeni gelen sıralamaları, kaynak sitenin ilgili listelerindeki ilk 24 konumdan alınır; işlem veya satış adedi uydurulmaz. Stok durumu açık `schema.org` verisinden okunur: 271 stokta, 11 stok dışı, 16 doğrulanamayan kayıt. 271 üründe adet üst sınırı kaynaktan alınmıştır. Sıfır/ikinci el gibi ürün durumu doğrulanmayan kayıtlarda tahmin edilmez; 296 kayıtta durum bilgisi yoktur. Teknik filtreler ancak doğrulanmış yapılandırılmış alanlarla genişletilmelidir.

## Altyapı bulgusu

Kaynak sitenin alt bilgisinde KMK C2C E-ticaret Yazılımı belirtiliyor. Sunucu yanıtında Microsoft IIS/10.0, ASP.NET ve PleskWin başlıkları; ASPSESSIONID oturum çerezi ve `.asp` servis uçları görüldü. Tema yolları `/theme/progressive/`; jQuery 3.6.2 ve Bootstrap 3.4.1 dosyaları kullanılıyor. Başlıklar tek başına uygulamanın tamamının ASP.NET ile yazıldığını kanıtlamaz. Veritabanı türü ve KMK sürümü doğrulanmadı.

Bu arayüz bağımsız HTML/CSS/JavaScript olarak hazırlanmıştır. GitHub Pages üzerinde derleme gerektirmez. Hash tabanlı sayfa yolları, Pages’in alt klasör yolunda da çalışır.

## Yerelde açma

Python 3 ile proje klasöründe `python3 -m http.server 4173` çalıştırıp `http://127.0.0.1:4173/` adresini açın. `index.html` dosyasını doğrudan dosya olarak açmak yerine bir yerel sunucu kullanın.

## Yayın

GitHub Pages yayın kaynağı: `main` dalı, `/` kök klasörü. `.nojekyll` hazırdır. Özel alan adı değiştirilmez; mevcut mağaza yerinde kalır.

Kontroller: Node.js ile `node checks/filters.cjs` — 17 kontrol. Dört ekran genişliğinde 104 yerleşim kontrolü tamamlandı. Ayrıntılar: [QA.md](QA.md).

Yayın adresi: https://mesutkuzu.github.io/oltapazari-yeni-arayuz/

Detaylı tasarım kararları ve kaynaklar: [UX-REVIEW.md](UX-REVIEW.md).

# Buton görünürlüğü — sürüm 11

7 Kasım 2026. Ürün kartlarının işlem düğmeleri varsayılan durumda koyu mavi/beyaz yazı, hover durumunda daha koyu mavi olarak düzenlendi. Sepete eklendi geri bildirimi dolu yeşil/beyaz yazı; stok dışı düğmeler gri/pasif kalır. İşlevsel JavaScript değiştirilmedi.

---

# Yayın öncesi derin inceleme — sürüm 10

7 Kasım 2026. Son dosyalarda **108/108 otomatik kontrol geçti**: filtre 19, akış 23, ürün/mağaza 26, hesap 24, ana sayfa 16. Sözdizimi ve `git diff --check` temiz.

## İncelemede giderilenler

- Satıcı, eski fiyat, bölüm açıklaması ve alt bilgi yazılarında kontrast yükseltildi: beyazda 5,16:1; sayfa zemininde 4,89:1.
- Koyu karşılama alanında klavye odağı 10,54:1 kontrasta taşındı.
- Satıcı bağlantıları 32 px, mobil kategori yazıları en az 12 px; işlem düğmeleri en az 44 px oldu.
- 601–850 px arasında yanlışlıkla gizlenen Av türleri bağlantısı geri getirildi.
- Geçerli bilgi girildiğinde teslimat alanındaki eski hata yazısı temizleniyor; diğer hatalar korunuyor.
- Teslimatta adres başlığıyla kayıt, kayıtlı adres seçimi ve mevcut adresi tekrar kullanma eklendi. Aynı kayıt çoğaltılmıyor; varsayılan/düzenle/sil akışları ortak adres katmanını kullanıyor.

## Mobil ve masaüstü

Yerel vitrin taslağında altı temsilci sayfa × dört genişlik = 24 yerleşim kontrolü `qa-vitrine-local.json` içinde. Son kayıtlı adresli teslimat ve ana sayfa, 320, 390, 600, 601, 768 ve 1280 px genişliklerde 12 ek kontrolden geçti (`qa-release-v10.json`): yatay taşma yok, tek ana başlık, giriş alanı yazıları 16 px. Bu kayıt, tüm tarihsel ekranların bu turda yeniden tarandığı anlamına gelmez.

Gerçek mobil tıklamalarla eksik ürün seçeneği uyarısı, seçim sonrası hatanın temizlenmesi, sayfadan ayrılmadan sepete ekleme, Hemen al ile aynı seçeneğin adedini artırmadan teslimata geçiş, farklı fatura adresi, seçeneğin kontrol adımında korunması ve adresi kaydedip Adreslerim'den teslimata yeniden seçme doğrulandı. Filtre paneli 390 px ekrana sığdı; Escape sonrası odak Filtrele düğmesine döndü. Menü de Escape ile kapandı ve odağı açma düğmesine geri verdi. Önceden sorun gözlenen Shimano galeri fotoğrafı bu kontrolde 1000 px doğal genişlikte yüklendi.

## Gerçek sistem sınırı ve devir

Bu bir arayüz önizlemesidir. Gerçek ödeme, üyelik veya sunucu adres kaydı bağlı değildir. Adresler açık oturumda tutulur; kişisel adresler tarayıcı kalıcı depolamasına yazılmaz. Kalıcı kullanıcı hesabı/veritabanı işlemleri için `ADDRESS-INTEGRATION.md` ve `INTEGRATION.md` izlenmelidir. Bu inceleme bağımsız erişilebilirlik sertifikası veya gerçek müşteri kullanılabilirlik araştırması değildir.

---

# Mobil gezinme doğrulaması — sürüm 8

7 Kasım 2026. Mobilde beş sekme gerçek tıklamalarla değiştirildi; her geçişte yalnız doğru sekmede `aria-current="page"`, dolu ikon ve seçim vurgusu görüldü. Vurgu 280 ms, ikon geçişi 180–240 ms; CSS hareket azaltma tercihini destekliyor.

320, 390, 600, 601 ve 1280 px genişliklerde kontrol edildi: yatay taşma yok. 600 px ve altında üst Favorilerim gizli, alt menü görünür; 601 px ve üstünde üst kısayol görünür, alt menü gizli. Sonuçlar `qa-navigation-v8.json`, görünüm `preview/mobile-navigation-v8.jpg` içinde.

Akış testleri 21/21 geçti; yeni regresyon, alt sayfaların tek ana sekmeye eşlenmesini kontrol ediyor. Önceki değişmeden kalan kontrollerle toplam 104 otomatik kontrol bulunuyor.

---

# Güncel doğrulama — 7 Kasım 2026, sürüm 7

## Otomatik kontroller

Son dosyalar üzerinde **103 kontrol geçti**: filtre 19, akış 20, mağaza/ürün 26, hesap 22, ana sayfa içerik yapılandırması 16. `git diff --check` temiz. Bu kontroller gerçek kullanıcı testi veya canlı KMK entegrasyon testi değildir.

## Tarayıcı doğrulaması

34 sayfa × 4 genişlik (320, 390, 768, 1280 px): **136 yerleşim kontrolü**. Yatay sayfa taşması yok; her sayfada tek ana başlık var. Son ana sayfa yapılandırma ve görsel değişikliğinden sonra dört genişlikte 4 ek kontrol: altı kategori kartı, tek başlık ve kırık olmayan fotoğraflar. Sonuçlar `qa-layout-v7.json` içinde. Tarayıcı konsolunda gözlenen hata/uyarı yok.

Gerçek tıklamalarla mobil kategori → filtre (101 ürün → en fazla 5.000 TL ile 3 ürün) → sepete ekle → sepet → eksik teslimat uyarıları → örnek teslimat → kontrol → deneme sonucu tamamlandı. Gerçek sipariş veya ödeme oluşmadı. Form hata metinleri erişilebilir alan adından ayrıldı. Önceki sürümlerin galeri/menü testleri aşağıda tarihsel kayıt olarak duruyor; bu turdaki düzeltmeler ilgili regresyon testleriyle de doğrulandı.

## Görsel teslim

- `preview/desktop-v7.jpg`: güncel masaüstü ana sayfa.
- `preview/mobile-v7.jpg`: güncel mobil ana sayfa.
- `preview/categories-v7.jpg`: kullanıcının özellikle istediği “Ne arıyorsun?” fotoğraf düzeni.
- Kategori fotoğrafları kaynak katalogdan; makine fotoğrafında yalnız arka plan temizleme düzenlemesi kullanıldı. Yeni üretilen kıyı sahnesi kullanıcı tarafından beğenilmedi ve projeye eklenmedi.

## Üretim sınırı

Yönetim paneli, canlı stok/fiyat, gerçek üyelik/ödeme ve sipariş bağlı değil. Ana sayfa ayarları `homepage.json` dosyasından okunur. KMK’ye aktarım şartları `INTEGRATION.md` içinde; tam uyumluluk doğrulanmış gibi sunulmamalı.

---

# Önceki sürümün tarihsel doğrulama kaydı

# Son sürüm doğrulaması

7 Kasım 2026. Kaynak katalog 6 Kasım 2026 tarihli sabit örnektir.

## Otomatik işlev kontrolleri

Dört dosyada toplam **59 kontrol** geçti:

- `node checks/filters.cjs`: 17 arama, filtre, sıralama ve stok/adet kontrolü.
- `node checks/flows.cjs`: 12 adres, sipariş kontrolüne geçiş, fatura, yeniden deneme, kayıt kurtarma ve seçim yardımcısı kontrolü.
- `node checks/storefront.cjs`: 17 kategori, bağlantı, seçenekli sepet ve karşılaştırma kontrolü.
- `node checks/account.cjs`: 13 hesap/satıcı ekranı ve gerçek olay işleyicisi kontrolü. Gizli `id` alanının form kimliğini gölgelemesi için regresyon dahil.

## Tarayıcı ve ekran boyutları

60 ekran × 4 genişlik (320, 390, 768, 1280 px) = **240 yerleşim kontrolü**. Yatay sayfa taşması, eksik ana başlık ve kaynak sitenin alan adına giden bağlantı: 0. Mobil sepette ürün başlıkları için en az 120 px okuma alanı ayrıca ölçüldü. Son turda tarayıcı konsol hatası: 0. Ölçümler `qa-layout-v3.json` içindedir. Eski `qa-layout.json` ve `qa-layout-v2.json` önceki kontrollerin arşividir.

Kategori ağacındaki 116 yol, ürünlerin kategori yolları ve 405 bağlantının yerel karşılıkları ayrıca kod kontrollerinden geçti. 1.079 galeri görsel referansının dosyaları mevcut. Bu, her görsel için bağımsız estetik onay anlamına gelmez.

## Gerçek arayüzde uygulanan görevler

- Karttan sepete ekleme: liste değişmeden geri bildirim ve sepet sayacı.
- Karttaki 44 × 44 px kalple tek dokunuşla favori ekleme/çıkarma ve dolu kalp durumu.
- Seçenekli üründe eksik seçime hata; seçilen rengin sepette ve kontrolde görünmesi.
- Galeri küçük fotoğraf seçimi ve büyütme bağlantısının doğru fotoğrafı açması.
- Tek seçili karşılaştırma ürününün görünmesi ve çıkarılabilmesi.
- Kategori içinde filtre: 101 makineden 5.000 TL sınırıyla 3 ürüne daralma. Panel açılırken adres değişmez. Escape kapatır, odak Filtrele düğmesine döner. Mobil panel 390 px ekrana oturur; uygulama düğmesi ekran içinde kalır.
- Adres olmadan doğrudan sipariş kontrolüne gitme engellendi. Eksik alan hataları, farklı fatura adresi ve seçili ürün seçenekleri kontrol edildi.
- Deneme akışı tamamlandı; gerçek sipariş/ödeme oluşturulmadığı gösterildi. Sepet boşaldı; kişisel bilgi içermeyen işlem özeti yenilemede korundu.
- Satıcı mesajı, yurt dışı ürün talebi ve bildirim tercihi taslakları oluşturuldu; gönderilmiş veya abonelik açılmış gibi gösterilmedi.
- Bireysel ilan formunda ürün/kategori/durum/fiyat/alışveriş biçimi girilip taslak kaydedildi ve satıcı ürünleri ekranında görüldü.
- Kaynaktaki alışveriş değerlendirmeleri, ayrı ölçütleriyle arayüzde doğrulandı.

## İncelemede düzeltilen belirgin sorunlar

Dar mobil sepet sütunu, fotoğraf şeridinin sayfayı genişletmesi, adres kontrolünü atlama, yeniden denemenin veri getirmemesi, eksik etkin filtre etiketleri, seçim yardımcısının av yerini yok sayması, tek karşılaştırma ürününün görünmemesi, seçeneklerin sepette karışması, yanlış kaynak kategorileri ve form kimliği çakışması düzeltildi. Kategori/hesap/satıcı yönlendirmeleri yerelleştirildi. Kartlardaki İncele adımı kaldırıldı; favori doğrudan kalbe taşındı. Sürekli karşılaştırma çubuğunun alışveriş düğmelerini örtmesi kaldırıldı.

## Kapsam sınırı

Bu sonuçlar çalışan arayüz önizlemesini doğrular. Gerçek müşterilerle görev testi, bağımsız erişilebilirlik denetimi veya KMK servisleriyle üretim entegrasyonu yapılmış sayılmaz. Canlı stok, fiyat, oturum, ödeme, mesaj iletimi ve ilan yayını bağlı değildir. Yasal metinler kısa kaynak özetidir; üretimde yetkili tam metinler gerekir.

## Son menü ve kategori düzeni

`qa-header-v5.json`: dört genişlikte 20 ek kontrol. Menü düğmesinin aramayla aynı satırda ve aramanın solunda kalması, sol panelin taşmaması ve Escape ile kapanması denetlendi. Kategori ve av türleri arasındaki görünür sekmeler; menüden Av türleri seçiminin normal sayfa açması tarayıcıda doğrulandı. `qa-menu-v4.json` ara düzenin arşividir; son konum aramanın soludur.

`qa-favorites-v6.json`: dört genişlikte favori kısayolunun başlıkta görünürlüğü, menü panelinde kaydırmadan görünmesi ve panelden favori listesine geçiş kontrol edildi.

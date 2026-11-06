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

# Olta Pazarı: tasarım ve kullanılabilirlik incelemesi

Tarih: 6 Kasım 2026. Kapsam: herkese açık site, mobil/masaüstü arayüz ve bağımsız çalışan önizleme. Kapalı müşteri ve satıcı hesaplarına giriş yapılmadı; gerçek işlem yapılmadı.

## Tasarım dili

Orijinal logo ve favicon korunur. Ana mavi `#2b6384`, koyu metin `#193448`, ikincil metin `#596d7b`, açık zemin `#f8fafc` ve beyaz kartlar kullanılır. Gövde metni 16 px’dir. Başlıklar güçlü ağırlıkta, temel düğmeler çoğunlukla 48–56 px yüksekliğindedir. Ürün fotoğrafları beyaz zeminde ve aynı kart çerçevesindedir.

Av türü görselleri tek görsel sistem olarak hazırlanır: beyaz stüdyo zemini, aynı kamera açısı ve ölçek, aynı ışık, grafit/silver/lacivert ekipman. Büyük yaşam tarzı fotoğraf galerisi ana sayfada kullanılmaz. Görseller av türleri sayfasındadır.

## Son bilgi sırası

1. Üstte arama, hesap ve sepet.
2. Ana sayfada Fırsat Avı; eski fiyat, yeni fiyat ve indirim oranı.
3. Mağazalardan Seçili Ürünler.
4. Gerektiğinde tüm ürünlere veya seçim yardımcısına erişim.
5. Av türleri ayrı menü alanı; ana sayfada tekrar edilmez.
6. Satıcı işlemleri alıcıya yönelik ana alanı kaplamaz.

## Akışların değerlendirmesi

| Alan | Uygulanan davranış | Neden |
|---|---|---|
| Menü | Tam sayfa, başlıklarla gruplanmış bağlantılar | Beklenmedik pencere açılmaz; geri tuşu çalışır. |
| Ürün kartı | Görsel, ad, fiyat, İncele | Karşılaştırma/favori/sepet düğmelerinin aynı kartta yarışması önlenir. |
| İndirim | Eski ve yeni fiyat birlikte; yüzde gerçek veriden hesaplanır | Kullanıcı indirimin ne olduğunu görebilir. |
| Ürün detayı | Tek ana düğme: Sepete ekle | Sonraki adım açık olur. |
| Sepete ekleme | Sepet sayfasına geçiş | Ürünün nereye gittiği görünür. |
| Ek ürün işlemleri | Kaydet ve karşılaştır bölümü içinde | İşlevler korunur, temel satın alma işi sade kalır. |
| Filtreler | Ayrı sayfa, açık alan adları, Ürünleri göster düğmesi | Küçük ekranda seçim sırasında ürün listesi sürekli değişmez. |
| Ürün listesi | 12 ürünlük sayfalar; sonuç sayısı ve sıralama | Uzun katalog kaydırması sınırlanır. |
| Bireysel satıcı | İki alışveriş biçimi ayrı giriş | İlan ile online satış birbirine karışmaz. |
| Online olmayan ilan | Sepet/satın alma yerine iletişim | Kullanıcı yapılamayan bir ödeme işlemine yönlendirilmez. |
| Satış biçimi bilinmeyen ürün | Satıcıya sorma yolu; sepete ekleme yok | Online satış olduğu varsayılmaz. |
| Teslimat | Açık etiketler, aynı fatura adresi seçimi, alan yanında hata | Hata nerede ve nasıl düzeltileceği görünür. |
| Sipariş | Sepet → Teslimat → Kontrol | Kullanıcı bulunduğu ve sonraki adımı görür. |
| İşlem sonucu | Deneme olduğu, ödeme alınmadığı açıkça yazılır | Önizleme, gerçek işlem onayı gibi sunulmaz. |
| Veri yükleme hatası | Yeniden deneme seçeneği | Boş sayfa bırakılmaz. |
| Dil | Günlük Türkçe; teknik terime kısa açıklama | Kullanıcının terimleri ezberlemesi gerekmez. |

## Gelişmiş filtre ve sıralama incelemesi

Marka grubu kendi içinde VEYA, farklı filtre grupları arasında VE mantığıyla çalışır. Örneğin Shimano veya Daiwa seçimi, stok ve fiyat sınırıyla birlikte daraltılabilir. Marka araması yalnızca seçenek listesini daraltır; önceden seçilmiş başka markayı sessizce kaldırmaz. Seçenek sayıları diğer etkin filtrelere göre hesaplanır. Sıfır seçenekli marka, seçili değilse devre dışıdır; seçili markayı kullanıcı kaldırabilir.

Mobilde filtre seçimi sırasında ürün listesine otomatik dönülmez. Sonuç sayısı uygulamadan önce görünür; tek belirgin düğme seçimleri uygular. Ters fiyat/tarih aralığı açık hata verir. Marka filtreleri ayrı etiketlerdir ve tek tek kaldırılır. Sıralama değişince sayfa 1’e döner, diğer filtreler korunur. Geçersiz/eski sıralama değeri güvenle önerilene döner. Çok kelimeli aramada kelimelerin ürün adında yan yana olması gerekmez.

Sıralamalar: Önerilen, En çok satanlar, En çok görüntülenenler, Yeni gelenler, En düşük fiyat, En yüksek fiyat, En yüksek indirim, A–Z. Önerilen sıralama satın alınabilir ürünleri ve bilinen çok satanları öne alır. Diğer sıralamalar kullanıcı seçimini uygular. İndirim sırası tutara değil yüzdeye göre hesaplanır. Popülerlik sıralarının kaynağı ilgili kamusal listelerin ilk 24 konumudur; gerçek satış adetleri çıkarılmaz.

Stok dışı ürün sepete eklenemez. Satış biçimi belirsiz veya yalnızca iletişim olan ürün online sepete girmez. Kaynaktaki adet üst sınırı tekrar eklemede de korunur. Sepette adet 1 iken azaltma kapalıdır; çıkarmak için ayrı Çıkar işlemi kullanılır. Ürün zaten adet sınırında sepetteyse ana düğme kullanıcıyı mevcut sepetine götürür. Farklı fatura adresi alanları yalnızca ihtiyaç halinde açılır ve kontrol ekranına taşınır.

Önizlemede ücretsiz kargo, hızlı teslimat veya müşteri puanı verisi uydurulmadı. Kaynakta bulunmayan teknik özellik, ürün durumu ve stok bilgisi biliniyor gibi sunulmaz.

## Korunan alanların envanteri

| Alan | Bu sürümdeki karşılığı |
|---|---|
| Kategoriler ve alt kategoriler | Av türleri, ekipman seçimi ve tüm hizmetler dizini |
| Mağaza ürünleri | Katalog ve mağazalardan seçili ürünler |
| Bireysel ilanlar / bireysel ürünler | Bireysel alan; online ve iletişim ayrımı |
| Ürün seçenekleri, teknik bilgiler ve açıklama | Ürün detayı; üretimde canlı varyant/stok bağlantısı gerekir |
| Favori ve karşılaştırma | Tarayıcıda çalışan seçimler |
| Sepet ve sipariş | Tarayıcıda çalışan demo akışı |
| Siparişler / iadeler / adresler / kuponlar / hesap | Hesap ve hizmet bağlantı envanteri; canlı hesap entegrasyonu gerekir |
| Ürün ve ilan ekleme / mağaza / satıcı paneli | Satıcı alanı ve mevcut servis bağlantıları; canlı işlem entegrasyonu gerekir |
| Hakediş / ödeme / kargo ayarları | Hizmet envanterinde korunur; yönetim erişimi olmadan taşınmaz |
| Markalar ve mağazalar | Ayrı keşif sayfası |
| Rehber/blog | Rehber sayfası ve yazı bağlantıları |
| Topluluk, mobil uygulamalar ve iletişim | Menü/hizmet dizini |
| Deniz-hava araçları / NAVTEX / yasaklar | Balıkçı araçları sayfası ve asıl kurum bağlantıları |
| Desi | Yerel hesaplayıcı: en × boy × yükseklik ÷ 3000 |
| Politikalar / sözleşmeler / kurumsal | Hizmet envanteri ve kaynak bağlantıları |
| Dil ve para birimleri | Tercih alanı ve mevcut sistem seçenekleri; bu UI Türkçe/TL |

Bağlantıların korunması, arka uç işlevlerinin yeni arayüze entegre edildiği anlamına gelmez. Kullanıcı KMK erişimi bulunmadığını belirterek çalışan önizleme yayınını seçti.

## Araştırma temeli

- [Baymard: mobil alışverişte genel sorunlar](https://baymard.com/research-articles/mobile-commerce-design): küçük ekranda bağlamı kaybetme ve gereksiz karmaşıklık riski. Bu projede ana seçimleri azaltma, normal sayfa geçişleri ve açık sonraki adım kullanıldı.
- [Baymard: mobil e-ticaret araştırması](https://baymard.com/research/mcommerce-usability): kategori, arama, ürün listesi, filtre ve satın alma adımlarının birlikte değerlendirilmesi. İnceleme tek ana sayfayla sınırlandırılmadı.
- [Baymard: checkout akışı](https://baymard.com/blog/checkout-flow-ux-optimization): ilerleme, açıklayıcı düğme ve gereksiz kesintileri azaltma. Sipariş adımları görünür tutuldu; ödeme sırasında tanıtım/pencere kullanılmadı.
- [NN/g: tanıma ve hatırlama](https://www.nngroup.com/articles/recognition-and-recall/): simgeler tek başına bırakılmadı; etiket ve kısa açıklama eklendi. Seçilen ürünler kontrol ekranında tekrar gösterildi.
- [W3C: kontrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum): normal metinde 4.5:1 hedefi temel alındı; soluk yardımcı renkler koyulaştırıldı.
- [W3C: hedef boyutu](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html): temel dokunma alanları yaklaşık 44 px veya üstünde tasarlandı. Bu, bütün sayfanın bağımsız WCAG uygunluk sertifikası değildir.
- [GitHub: Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages): statik yayın; sunucu oturumu/ödeme uygulaması barındırmaz.
- [KMK: pazaryeri altyapısı](https://www.kmk.net.tr/pazaryeri-yazilimi): alıcı, satıcı ve merkezi yönetim süreçlerinin kapsamı.

## Üretimden önce yapılması gerekenler

KMK tema/API erişimiyle canlı veri ve varyantlar bağlanmalı; kimlik doğrulama, kupon, sipariş, taksit, kargo ve iade kuralları gerçek ortamda test edilmelidir. İlanların online/iletişim ayrımı sunucunun yetkili alanından gelmelidir. İstemcideki statik bilgi ödeme yetkisi sayılmamalıdır. Hesap ve satıcı işlemleri gerçek yetki kontrolü gerektirir.

Gerçek müşterilerle görev testi yapılmalıdır: bir ürünü bulma, ilan biçimini anlama, sepete ekleme, adres hatasını düzeltme ve sipariş kontrolü. Bu görevlerin tamamlanma oranı ve hataları ölçülmeden “her kullanıcı zorlanmadan kullanır” sonucu garanti edilemez.

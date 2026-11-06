# Olta Pazarı: tasarım ve kullanılabilirlik incelemesi

Revizyon: 7 Kasım 2026. Kaynak veriler: 6 Kasım 2026. Kapsam, herkese açık orijinal site ve bağımsız arayüz önizlemesidir. Kapalı hesaplara girilmedi; gerçek ödeme, sipariş veya mesaj gönderilmedi.

## Tasarım dili ve bilgi sırası

Orijinal logo, favicon ve mavi renkler korunur. Ana mavi `#2b6384`, koyu metin `#193448`, ikincil metin `#596d7b`, açık zemin `#f8fafc` ve beyaz kartlar temel alınır. Gövde metni 16 px, temel düğmeler çoğunlukla 48–56 px yüksekliğindedir. Hesap tercihlerinde daha büyük yazı seçeneği bulunur.

Arama ve sepet kolay erişilir konumdadır. Ana sayfada önce indirimli ürünler, ardından mağazalardan seçilen ürünler gösterilir. Kategoriler doğrudan ana gezinmededir. Av türleri ayrı bir keşif sayfasıdır; ana sayfada yinelenen bir galeri oluşturmaz. Satış işlemleri hesap ve menü içindedir; alıcının temel alışveriş alanını kaplamaz. Özel ürün talebi ve seçim yardımcısı gerektiğinde başvurulabilecek ayrı girişlerdir.

Av türleri için beyaz stüdyo zemini, sabit açı, benzer ölçek ve ışık kullanan ortak ekipman görsel sistemi hazırlandı. Ürün fotoğrafları gerçek kaynak sayfalardan alındı; kartlarda tutarlı çerçeve ve ölçü kullanılır.

## İnceleme sonucunda değişen davranışlar

| Alan | Son davranış | Kullanıcıya etkisi |
|---|---|---|
| Menü ve hesap | Tam sayfa yolları, gruplanmış başlıklar ve açıklayıcı etiketler | Gezinme beklenmedik pencerelere dönüşmez. |
| Kategoriler | 116 kategori düğümü; üst/alt kategori yolları yereldir | Kullanıcı kategoriye tıklayınca eski siteye gönderilmez. |
| Markalar ve mağazalar | Aranabilir dizinler, yerel satıcı kataloğu | Ürün keşfi aynı arayüz içinde sürer. |
| Ürün kartı | Satışa uygun, seçeneksiz üründe doğrudan Sepete ekle | Listeyi kaybetmeden alışverişe devam edilebilir. |
| Ekleme sonucu | Kartta kısa geri bildirim, sepet sayacı ve sepet bağlantılı bildirim | İşlemin gerçekleştiği görülür. |
| Seçenekli ürün | Önce detayda renk, ölçü veya model seçimi | Yanlış veya eksik seçenek sepete alınmaz. |
| Filtreler | Mobil ve masaüstünde kapatılabilen çekmece | Liste ve kaydırma konumu korunur; seçimler topluca uygulanır. |
| Ürün fotoğrafları | Küçük fotoğraf seçimleri ve ayrı büyütme sayfası | Kullanıcı farklı açılara bakabilir, ürüne geri dönebilir. |
| Uzun açıklama | Genişletme/kısaltma düğmesi | Temel ürün bilgisine ulaşmak uzun metinle zorlaşmaz. |
| Bireysel ilanlar | Online satın alma ve satıcıyla görüşme ayrımı | İletişim ilanları ödeme akışına karışmaz. |
| Satıcıya soru | Gönderilmediği açıkça belirtilen mesaj taslağı | Çalışmayan bir gönderim yapılmış gibi sunulmaz. |
| Sepet | Seçenekler, adet ve ayrı Çıkar işlemi | Alınacak ürün ve seçimi açıkça görünür. |
| Teslimat | Alan yanında doğrulama; gerektiğinde farklı fatura adresi | Hatanın yeri ve düzeltme yolu anlaşılır. |
| Hesap ve satıcı | 19 yerel görünüm ve işlevsel oturum taslakları | Menü öğeleri boş bağlantılardan ibaret kalmaz. |
| Bilgi sayfaları | 19 yerel içerik; uzun metinler özet olarak etiketli | Destek ve rehber okunabilir; tam sözleşme iddiası yapılmaz. |
| Yükleme sorunu | Yeniden deneme eylemi | Kullanıcı boş ekranda kalmaz. |

Filtre çekmecesi yalnızca listeyi daraltma işi içindir. Açılış/kapanışta odak yönetilir; kapatma ve Escape davranışı kullanılır. Menü, hesap ve diğer sayfa geçişleri normal gezinme olarak kalır. Buton ve simge etiketleri yapılan işlemi adlandırır. Fotoğraf, açıklama, karşılaştırma ve boş durumlarda geri dönüş veya sonraki adım bulunur.

## Filtre ve sıralama ayrıntıları

Marka seçimleri kendi grubunda VEYA, ayrı filtre grupları arasında VE mantığıyla birleşir. Marka araması seçenek listesini daraltır; görünmeyen önceki seçimi silmez. Sayımlar diğer etkin filtrelere göre hesaplanır. Sonuç vermeyen seçilmemiş markalar devre dışı kalabilir; seçili bir marka her zaman kaldırılabilir. Kaynaktan doğrulanan 43 marka, ürün verisindeki ek adlarla birlikte korunur; marka adlarının farklı yazımları eşleştirilir.

Ürün sayısı uygulamadan önce görünür. Negatif veya ters fiyat aralığı ve ters tarih sırası açık hata üretir. Etkin kategori, satıcı, marka ve diğer koşullar ayrı etiketlerle kaldırılabilir. Sıralama değişimi diğer filtreleri koruyarak ilk sayfaya döner. Çok kelimeli arama, sözcüklerin yan yana olmasını gerektirmez.

Sekiz sıralama vardır: önerilen, çok satan, çok görüntülenen, yeni gelen, düşük fiyat, yüksek fiyat, yüksek indirim yüzdesi ve A–Z. Önerilen sıralama satın alınabilir ürünleri ve bilinen çok satanları öne alır. Popülerlik verisi kamusal kaynak listelerin ilk 24 konumuyla sınırlıdır; satış adedi veya müşteri puanı değildir. Diğer ürünler için popülerlik değeri uydurulmaz.

## Kaynak kapsamı ve özellik eşlemesi

298 ürünlük katalog tam envanter değildir. Kaynakta ürün bulunmayan veya önizlemeye alınmamış kategori/marka yerel olarak açılır ve uygun boş durum gösterir. 405 bağlantılık envanterde kaynak siteye ait bağlantılar kategori, ürün, satıcı, hesap veya bilgi sayfalarına eşlenir. Deniz tahmini, NAVTEX, harita ve uygulama mağazası gibi üçüncü taraflar kendi kaynaklarına bağlanır.

200 üründe çoklu galeri, toplam 1.079 yerel fotoğraf referansı vardır. Kaynaktaki tüm gözlenen galeri fotoğrafları aktarılmıştır; en büyük galeri 11 fotoğraftır. 128 üründe açıklama, 283 üründe kaynak kod/GTIN ve kargo metni, 10 üründe seçenek verisi bulunur. Kategori yolları kullanılarak belirgin ürün sınıflandırma hataları düzeltilmiştir. Kargo metnindeki eski gönderim tarihi canlı teslimat sözü olarak gösterilmez; kaynak bedeli nihai hesaplanan ücret gibi kabul edilmez.

| Kaynak alanı | Bu sürümdeki karşılık ve sınır |
|---|---|
| Kategori, alt kategori, marka, mağaza | Yerel dizinler ve katalog filtreleri |
| Ürün, seçenek, fotoğraf, açıklama | Detay, galeri ve seçenek seçimi; bağımlı seçeneği bilinmeyen ürün satın alınamaz |
| Favori, karşılaştırma, sepet | Tarayıcıda çalışan seçimler; stok ve toplam adet kontrolleri |
| Sipariş ve iade | Deneme sipariş akışı ve yerel iade taslağı; gerçek işlem yok |
| Üyelik, profil, adres, mesaj | Yerel hesap görünümleri ve oturum taslakları; kimlik doğrulama ve mesaj iletimi yok |
| Kupon | Kod girişi ve durum açıklaması; doğrulanmayan indirim uygulanmaz |
| Ürün/ilan ekleme ve mağaza başvurusu | Form doğrulama ve taslak; ilan yayını ya da başvuru iletimi yok |
| Satış siparişleri, hakediş, kargo ve ödeme ayarları | Yerel ekran ve tercih örnekleri; gerçek satış, banka kaydı veya gönderi yok |
| Özel ürün talebi | Menü ve ana sayfadan yerel talep taslağı; teklif ya da ücret oluşturmaz |
| Blog, yardım ve kurumsal | Yerel sayfalar; uzun makale/politika/sözleşmeler açıkça kısa özet |
| Balıkçı araçları ve desi | İlgili kuruma yönlendirme; yerel desi hesaplama |
| Dil, kur ve yazı boyutu | Tercihler; büyük yazı uygulanabilir, çeviri ve canlı kur servisi bağlı değildir |

## Gerçek işlem sınırı

KMK yönetim/tema veya API erişimi verilmedi. Bu nedenle gerçek oturum, üyelik, canlı stok/fiyat, sipariş, ödeme, mesaj iletimi veya ilan yayını yapılmaz. Şifre ve ödeme bilgisi istenmez. Hesap, teslimat, adres ve taslaklar açık oturum belleğinde; sepet, favori ve karşılaştırma tarayıcıda tutulur. Deneme siparişi gerçek işlem olarak onaylanmaz.

Doğrulanmayan stok, ürün durumu, ücretsiz kargo, teslimat sözü, müşteri puanı ve satış sayısı varsayılmaz. Sadece iletişimle satılan veya satış biçimi belirsiz ürün online sepete alınmaz. Stok dışı ürün ve kaynak adet sınırı kontrol edilir. Varyantların farklı sepet satırları, aynı ürünün toplam adet sınırını aşamaz. Kaynakta boş/bağımlı seçenek bulunduğunda kombinasyon uydurulmaz.

Politika ve sözleşme özetleri tam hukuki metin değildir; görüntüleme veya taslak kaydetme bir sözleşme kabulü oluşturmaz. Gerçek üretim sürümünde yetkili tam metinler, sürüm bilgisi ve gerekli onay süreçleri ayrıca bağlanmalıdır.

## Araştırma temeli

- [Baymard: mobil alışveriş sorunları](https://baymard.com/research-articles/mobile-commerce-design): küçük ekranda bağlamı koruma, ana eylemleri netleştirme ve gereksiz karmaşıklığı azaltma.
- [Baymard: mobil e-ticaret araştırması](https://baymard.com/research/mcommerce-usability): kategori, arama, liste, filtre ve satın alma sürecini birlikte değerlendirme.
- [Baymard: checkout akışı](https://baymard.com/blog/checkout-flow-ux-optimization): görünür ilerleme, açık eylemler ve satın alma sırasında gereksiz kesintileri azaltma.
- [NN/g: tanıma ve hatırlama](https://www.nngroup.com/articles/recognition-and-recall/): simgelerle birlikte etiket, seçili koşullar ve kontrol ekranında tekrar görünen ürün bilgileri.
- [W3C: kontrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum): normal metinde 4.5:1 hedefi. Tasarım hedefi, bağımsız uygunluk sertifikası değildir.
- [W3C: hedef boyutu](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html): temel dokunma alanlarını yaklaşık 44 px veya üzerinde tutma.
- [GitHub: Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages): statik yayın; sunucu oturumu ve ödeme arka ucu barındırmaz.
- [KMK: pazaryeri altyapısı](https://www.kmk.net.tr/pazaryeri-yazilimi): alıcı, satıcı ve merkezi yönetim işlemlerinin kapsamı.

## Doğrulama ve üretime geçiş

Dört kontrol dosyasında 59 otomatik kontrol geçmektedir. Güncel tarayıcı ve ekran boyutu sonuçları [QA.md](QA.md) dosyasında tutulur. Önceki sürümün yerleşim sayıları bu revizyonun sonucu olarak kullanılmaz.

Üretim için KMK kimlik doğrulaması, canlı ürün/seçenek/stok, fiyat, ödeme, kupon, sipariş, kargo, iade, mesaj ve satıcı yetkileri bağlanmalı; gerçek servislerle uçtan uca kontrol edilmelidir. Kişisel verinin saklanması, silinmesi ve hukuki metinler üretim politikasına uygun uygulanmalıdır.

Gerçek kullanıcılarla ürün bulma, filtreleme, seçenek seçme, ilan biçimini ayırt etme, adres hatasını düzeltme ve sipariş kontrolü görevleri ölçülmelidir. Kod ve tarayıcı kontrolleri yapılmış olması, her kullanıcının sorunsuz kullanacağı garantisi değildir.


Son etkileşim düzenlemeleri: kart ve detay fotoğrafında 44 × 44 px kalp düğmesi; karttan doğrudan sepete ekleme; karşılaştırma bağlantısı ilgili ürün alanında (sayfanın üzerine binen sürekli çubuk yok). Kaynaktaki tüm gözlenen galeri fotoğrafları aktarılmıştır. 11 ürün sayfasındaki 16 alışveriş değerlendirmesi, maskeli yazarlar ve üç ayrı değerlendirme ölçütüyle korunmuştur; genel ürün puanı üretilmemiştir. Bildirim tercihi, ürün bağlantısını kopyalama ve değerlendirme taslağı arayüzleri de yereldir.

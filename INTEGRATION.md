# Olta Pazarı — KMK tema entegrasyonu devir notu

7 Kasım 2026

Bu klasör **bağımsız, çalışan bir arayüz önizlemesidir**. KMK tema paketi veya yönetim paneline kurulmuş bir sürüm değildir. Tasarım ve etkileşimler taşınabilir; dosyaların mevcut sitenin üzerine yüklenmesi canlı alışveriş entegrasyonu sağlamaz.

## Doğrulanan kapsam

[Mevcut Olta Pazarı](https://www.oltapazari.com.tr/) ürün, kategori, marka, mağaza, bireysel ilan, hesap ve destek alanlarını gösteriyor; alt bilgisinde KMK C2C adı bulunuyor. Depodaki önceki incelemede `/theme/progressive/` varlık yolu, IIS/10.0 ve ASP.NET/PleskWin yanıt başlıkları, ASPSESSIONID çerezi, `.asp` adresleri, jQuery 3.6.2 ve Bootstrap 3.4.1 kaydedilmiş. Bunlar [README.md](README.md) içindeki gözlemlerdir; bu devir çalışmasında ham yanıt başlıkları yeniden doğrulanamadı.

[KMK’nin resmî pazaryeri açıklaması](https://www.kmk.net.tr/pazaryeri-yazilimi) müşteri, satıcı ve merkezi yönetim alanlarını birlikte tanımlıyor. Bu genel açıklama, Olta Pazarı kurulumunun sürümünü, tema düzenleyicisini, API yetkilerini veya panel alan adlarını doğrulamaz. Yönetim paneli, sunucu şablonları ve kurulu sürüm görülmedi. Aşağıdaki eşleme bir **uygulama önerisidir**; KMK dosya adları veya API adresleri değildir.

## Arayüzü mevcut yapıya yerleştirme

| Önizleme bileşeni | KMK tarafında bağlanacağı alan | Korunacak davranış |
| --- | --- | --- |
| `index.html` başlığı, arama ve menü; `navigationMenu()` | Ortak üst şablon, gezinme ve mevcut arama formu | Gerçek kategori bağlantıları, oturum durumu ve sepet sayacı; mobil menü ve klavye erişimi |
| `home()` ve ana sayfa içerik ayarları | Ana sayfa vitrin, banner ve ürün listesi blokları | Panelden metin, görsel ve ürün seçimi |
| `productCard()` | Ana sayfa, arama, kategori ve mağaza ürün kartı şablonu | Aynı fiyat/stok/ilan türü kuralları; seçenekli üründe önce seçenek seçimi |
| `catalog()`, `categoryScreen()`, `sellerScreen()` | Arama, kategori ve satıcı listeleme şablonları | Sunucudan filtre sayısı ve sayfalama; kategori/mağaza bağlamının korunması |
| `enhancedProduct()`, galeri ve seçenek alanı | Ürün/ilan detay şablonu | Ürün kimliği, gerçek seçenek kombinasyonu, satıcı ve teslimat bilgileri |
| Sepet, teslimat ve sipariş kontrolü | Mevcut KMK sepet ve sipariş adımları | Sunucuda hesaplanan toplam, stok kontrolü, mevcut ödeme akışı |
| `account-ui.js` ekranları | Üye hesabı ve yetkili satıcı ekranları | KMK oturumu, kayıt izinleri ve gerçek işlem sonuçları |
| `footer()` ve bilgi sayfaları | Ortak alt şablon, iletişim ve CMS içerik sayfaları | Paneldeki güncel iletişim, rehber ve sözleşme içerikleri |

Önce test ortamında ortak şablon ve bir ürün/kategori sayfası taşınmalı. Mevcut KMK alan adları, form işlemleri, gizli doğrulama alanları ve gerekli olay bağlantıları belirlenmeden kaldırılmamalı. Yeni CSS kuralları tema köküyle sınırlandırılmalı; eski Bootstrap/jQuery davranışlarıyla aynı menü, form veya sepet eylemini iki kez çalıştırmamalı. `app.js` içindeki bütün sayfayı değiştiren önizleme yönlendiricisi, canlı KMK sayfalarının üzerine doğrudan eklenmemeli.

## `homepage.json` ve panelden yönetim

`homepage.json`, ana sayfanın sunum ayarları için önizleme veri sözleşmesi olarak ele alınmalı. **KMK paneline bağlantı değildir.** Son dosyadaki alanlar, kurulumda gerçekten bulunan panel alanlarına bir eşleme katmanıyla bağlanmalı:

| `homepage.json` alanı | Panel karşılığı ve uygulama |
| --- | --- |
| `hero` | Banner/vitrin alanı: `title`, `description`, `eyebrow`, `image`, `imageAlt`, `caption` ve iki düğme (`primaryAction`, `secondaryAction`) |
| `categories.title`, `categories.action`, `categories.items` | Kategori vitrin başlığı ve 6 kart: etiket, görsel, alternatif metin, `imageFrame` çerçeve seçimi ve gerçek kategori hedefi |
| `deals`, `featured` | Bölüm başlığı, açıklama, düğme; `productSlugs` sıralı ürün seçimi. Slug’lar kalıcı KMK ürün kimliklerine eşlenmeli. Fırsat listesi gerçek aktif indirim koşulunu korumalı. |
| `paths` | Av türü ve bireysel ilanlara giden 2 yönlendirme kartı: başlık, açıklama, bağlantı ve simge |
| `request`, `assistance` | Ürün talebi ve ekipman yardım alanı: başlık, açıklama ve düğme |

`version: 1` şemasında başlık/açıklama düz metindir; satır sonu `\n` ile verilir. Görsel yolları yerel `assets/` dosyalarına, bağlantılar hash veya HTTPS hedeflerine sınırlıdır. Ürün seçimi en fazla 12 slug alır; boş veya eşleşmeyen seçimde uygun ilk 4 ürün kullanılır. Stokta ve online satılabilir olmayan ürünler gösterilmez; fırsatlarda gerçek indirim, mağaza seçkisinde mağaza satıcısı şartı korunur. Şema bölüm görünürlüğü veya bölüm sırası ayarı içermez; bunlar istenirse ayrıca geliştirilmelidir.

Panelde bir değişiklik kaydedildiğinde tema aynı veri kaynağından yeniden üretim yapmalı veya tanımlı veri servisini okumalı. Bunun dosya dışa aktarımı, sunucu şablon değişkenleri ya da doğrulanmış API ile yapılacağı KMK erişimiyle belirlenir. JSON’a fiyat, stok, kullanıcı oturumu veya ödeme sonucu yazılarak canlı sistem taklit edilmemeli. JSON düzenleme imkânı, kendiliğinden KMK yönetim paneli özelliği oluşturmaz.

## Sunucunun karar vereceği işlemler

- **Üyelik ve yetki:** Gerçek giriş/çıkış, üye ve satıcı rolleri, adres ve mesaj erişimi KMK oturumundan gelmeli. `accountSession` üretim hesabı yerine kullanılamaz.
- **Ürün ve sepet:** Fiyat, indirim, stok, adet sınırı, seçenek kombinasyonu ve satılabilirlik sunucudan doğrulanmalı. `data.json` sabit örnektir. Tarayıcıdaki sepet ve kontroller tek başına sipariş yetkisi vermez.
- **Teslimat ve ödeme:** Satıcı bazlı kargo, vergi, kupon ve sipariş toplamı sunucuda hesaplanmalı. Mevcut ödeme sağlayıcısı akışı kullanılmalı; başarı durumu sunucunun doğruladığı sonuçtan gelmeli. Deneme siparişi işlevi kaldırılıp gerçek sipariş sürecine bağlanmalı.
- **Sonraki işlemler:** İade, mesaj, ürün/ilan yayını, mağaza başvurusu ve değerlendirme yalnız gerçek servis başarı yanıtından sonra tamamlanmış gösterilmeli. Önizlemedeki taslak kayıtları bunların yerine geçmez.

## URL, SEO ve içerik

`#product?id=…`, `#category?path=…` ve diğer hash yolları önizlemeye aittir. Üretimde mevcut KMK ürün, kategori, mağaza ve bilgi sayfası adresleri korunmalı; bağlantılar gerçek rotalara eşlenmeli. URL değişmesi gerekiyorsa eski adresler için yönlendirme planı hazırlanmalı. Sayfa başlığı, açıklama, canonical, sitemap ve ürün yapılandırılmış verisi gerçek sayfa/verilerden üretilmeli. Önizlemedeki `noindex,nofollow` üretime kopyalanmamalı; test ortamında korunmalı.

`source-content.json` içindeki sözleşme ve politika özetleri üretime tam metin olarak taşınmamalı. Yetkili güncel tam metinler CMS’den gelmeli; gerekli kabul ve kayıt işlemleri gerçek alışveriş sürecine bağlanmalı.

## Devri tamamlamak için gerekenler

KMK ekibinden kurulu sürüm ve tema düzenleme yöntemi, ortak/ürün/kategori/sepet şablonları, panel vitrin alanları, mevcut form veya API sözleşmeleri ve test ortamı istenmeli. Bu bilgilerle önce bir kategori → seçenekli ürün → sepet → test siparişi akışı doğrulanmalı. Panelde banner ve seçili ürün değişikliğinin yeni arayüzde görünmesi ayrıca kabul ölçütüdür. Canlı uyumluluk ancak bu bağlantılar çalıştırılıp doğrulandıktan sonra söylenebilir.


## Kayıtlı adreslerin kalıcı hesaba aktarımı

Teslimat ve Adreslerim akışı için ayrıntılı [adres entegrasyonu sözleşmesi](ADDRESS-INTEGRATION.md) esas alınmalıdır. Önizlemenin `saveSavedAddress`, `removeSavedAddress`, `useSavedAddress` ve varsayılan adres işlemleri, gerçek kullanıcı oturumu ve sunucu veritabanı ile eşlenmelidir. Tarayıcıda kalıcı kişisel veri saklayan bir alternatif eklenmemiştir. Gerçek siparişler teslimat/fatura adresinin değişmez kopyasını tutmalı; adres defterindeki sonraki düzenlemeler geçmiş siparişleri değiştirmemelidir.

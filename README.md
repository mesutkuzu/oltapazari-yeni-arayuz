# Olta Pazarı — alışveriş arayüzü

Olta Pazarı’nın orijinal logosunu ve mavi renklerini koruyan, alıcıya odaklı mobil ve masaüstü arayüz. Yayın: [GitHub Pages](https://mesutkuzu.github.io/oltapazari-yeni-arayuz/).

Ana sayfa kısa karşılama, **Ne arıyorsun?** altında altı görsel kategori, **Fırsat Avı** ve **Mağazalardan seçtiklerimiz** akışıyla ilerler. Kategori kartları gerçek ürün fotoğrafları kullanır; av türleri ayrıca keşfedilir. Menü, aramanın hemen solundaki düğmeden soldan açılan çekmecedir. Hesap, kategori ve sepet normal sayfa yollarıyla açılır. Filtreler, ürün listesinin bağlamını koruyan bir çekmecede açılır.

## Çalışan arayüz

- Seçenek gerektirmeyen, satışa uygun ürünler karttan **Sepete ekle** ile eklenir; sayfa değişmez, sonuç bildirimi ve sepet bağlantısı görünür. Seçenekli üründe önce ürün detayına gidilir.
- Çok kelimeli arama; birden fazla marka; fiyat, kategori, av türü, satıcı, ödeme biçimi, stok, ürün durumu ve tarih filtreleri. Uygulamadan önce sonuç sayısı, marka araması ve tek tek kaldırılabilen etkin filtreler.
- Önerilen, çok satan, çok görüntülenen, yeni gelen, fiyat artan/azalan, indirim yüzdesi ve A–Z sıralaması; 12 ürünlük sayfalama.
- 116 düğümlü kategori ağacı, kaynak siteden doğrulanan 43 marka ve katalogdaki ek marka adları. Kategori, marka ve mağaza bağlantıları yerel sayfalara gider. Kataloğa alınmamış bir kategoride ürün varmış gibi gösterilmez.
- Bireysel ürünlerde **Siteden satın al** ve **Satıcıyla görüş** ayrımı; iletişim ilanları online sepete girmez.
- Ürün fotoğraf galerisi, ayrı fotoğraf büyütme sayfası, açıklamayı genişletme, seçenek seçimi, kargo bilgisi, benzer ürünler, favoriler ve üç ürüne kadar karşılaştırma.
- Sepet, seçeneklerin sepet satırına taşınması, adet sınırları, teslimat ve farklı fatura adresi, alan yanında hata açıklaması, sipariş kontrolü ve deneme sonucu.
- Hesap ve satıcı işlemleri için 19 yerel görünüm: adresler, profil, mesaj taslakları, kupon kontrolü, iade taslağı, ürün/ilan taslağı, mağaza başvurusu, sipariş/ödeme görünümleri ve ayarlar. Sunucu işlemi yapılmayan alanlar bunu belirtir.
- Menü ve ana sayfadan özel ürün talebi taslağı; yeni başlayanlar için seçim yardımcısı; destek, rehber, bilgi sayfaları ve desi hesaplayıcı.

## Kaynak veri

Veriler 6 Kasım 2026’da herkese açık sayfalardan alınan sabit bir örnektir. Bu revizyon 7 Kasım 2026’da hazırlanmıştır.

- 298 ürün; 405 bağlantılık kaynak envanteri. Kaynak siteye ait gezinme bağlantıları yerel sayfalara eşlenmiştir. Deniz/hava araçları gibi üçüncü taraf kaynaklar kendi adreslerini kullanır.
- Satış biçimi: 274 online, 11 iletişim, 13 doğrulanamayan kayıt. Bireysel kayıtlarda dağılım 7 / 11 / 1’dir.
- Stok: 271 stokta, 11 stok dışı, 16 doğrulanamayan kayıt. 271 üründe kaynak adet üst sınırı bulunur. Doğrulanmayan ürün durumu, puan veya satış adedi uydurulmaz.
- 200 üründe çoklu galeri; toplam 1.079 yerel fotoğraf referansı. Kaynaktaki tüm gözlenen galeri fotoğrafları aktarılmıştır; en büyük galeri 11 fotoğraftır. 128 üründe açıklama, 283 üründe kaynak kod/GTIN ve kargo metni, 10 üründe seçenek verisi vardır.
- Çok satan, görüntülenme ve yenilik sıraları ilgili kaynak listelerin ilk 24 konumundan alınır; gerçek satış sayısı olarak sunulmaz.
- 19 bilgi sayfası `source-content.json` içindedir. Uzun rehber, politika ve sözleşmeler açıkça **kısa özet** olarak işaretlidir; tam sözleşme yerine geçmez.

## Önizlemenin sınırları

Kullanıcı KMK erişimi bulunmadığını belirterek çalışan önizleme yayınını seçti. **Gerçek kimlik doğrulama, üyelik, stok güncelleme, sipariş, ödeme, mesaj gönderimi veya ilan yayını yapılmaz.** Şifre, kart, banka hesabı ve kimlik belgesi istenmez. Hesap, adres, mesaj, talep ve ilan taslakları açık oturum belleğinde tutulur; sunucuya gönderilmez. Favoriler, karşılaştırma ve sepet tarayıcıda saklanır.

Kaynakta bağımlı seçenekleri çözülemeyen ürünler, eksik seçenekle satın alınabilir hale getirilmez. Kaynak kargo metni ürün bilgisidir; nihai teslimat ücreti veya teslim tarihi garantisi değildir. Kupon ve ödeme görünümleri gerçek indirim ya da tahsilat oluşturmaz. Sözleşme özetinin görüntülenmesi bir kabul işlemi değildir.

Üretime geçiş için KMK oturumu, canlı fiyat/stok, seçenek kombinasyonları, sipariş, ödeme, kargo, iade, kupon ve satıcı yetkileri sunucu servislerine bağlanmalıdır. Yerel sayfa karşılıklarının bulunması, bu servislerin taşındığı anlamına gelmez.

## Altyapı bulgusu

Kaynak sitenin alt bilgisi **KMK C2C E-ticaret Yazılımı** adını taşır. Microsoft IIS/10.0, ASP.NET ve PleskWin yanıt başlıkları; ASPSESSIONID çerezi ve `.asp` uçları gözlendi. Tema yolu `/theme/progressive/`; jQuery 3.6.2 ve Bootstrap 3.4.1 kullanılıyor. Bu bulgular uygulamanın tamamının ASP.NET ile yazıldığını kanıtlamaz. Veritabanı ve KMK sürümü doğrulanmadı.

Yeni arayüz bağımsız HTML/CSS/JavaScript’tir. GitHub Pages için derleme gerekmez. Hash tabanlı yollar depo alt klasöründe de çalışır; `.nojekyll` hazırdır. Pages kaynağı `main` dalının kök klasörüdür.

## Yerel kullanım ve kontroller

Proje klasöründe `python3 -m http.server 4173` çalıştırıp `http://127.0.0.1:4173/` adresini açın. Doğrudan dosya açılışı yerine HTTP sunucusu kullanın.

```sh
node checks/filters.cjs
node checks/flows.cjs
node checks/storefront.cjs
node checks/account.cjs
node checks/homepage.cjs
```

Güncel otomatik kontrol sonuçları [QA.md](QA.md) dosyasındadır. Bunlar kullanıcı araştırması veya bağımsız erişilebilirlik sertifikası değildir. Güncel tarayıcı doğrulamaları [QA.md](QA.md), tasarım kararları ve araştırma kaynakları [UX-REVIEW.md](UX-REVIEW.md) dosyasındadır.


Son etkileşim düzenlemeleri: kart ve detay fotoğrafında 44 × 44 px kalp düğmesi; karttan doğrudan sepete ekleme; karşılaştırma bağlantısı ilgili ürün alanında (sayfanın üzerine binen sürekli çubuk yok). Kaynaktaki tüm gözlenen galeri fotoğrafları aktarılmıştır. 11 ürün sayfasındaki 16 alışveriş değerlendirmesi, maskeli yazarlar ve üç ayrı değerlendirme ölçütüyle korunmuştur; genel ürün puanı üretilmemiştir. Bildirim tercihi, ürün bağlantısını kopyalama ve değerlendirme taslağı arayüzleri de yereldir.

Son menü düzeni: düğme arama çubuğunun hemen solundadır ve soldan panel açar. Açılış sayfa adresini değiştirmez; Escape, Kapat ve bölüm seçimi paneli kapatır. Av türleri üst gezinmede ve kategorilerde Ekipmana göre / Av türüne göre sekmelerinde görünür. Kategori ve marka kartlarında genel dekoratif ikonlar kaldırılmıştır.

Favorilere erişim: kart ve detay kalplerine ek olarak masaüstü başlığında ve mobil alt menüde doğrudan Favorilerim kısayolu bulunur. Menünün ilk görünen bölümünde Favorilerim ve Sepetim kısayolları vardır; kaydırma veya hesap sayfası gerekmez.


## 7 Kasım: yeni arayüz ve yönetilebilir ana sayfa

- Ürün kartlarında satıcı bağlantısı, daha tutarlı fotoğraf alanı ve mobilde beş ana kısayol.
- Kategori/mağaza sıralama ve sayfalamasında kapsam korunur; birden fazla marka seçimi kaybolmaz.
- Stoku doğrulanmamış ürünler satın alınamaz. Seçenekli üründe eksik seçim ve tekrar adet eklenmesi engellenir.
- Mesaj/değerlendirme taslakları düzenlenebilir; önizlemeden çıkış kişisel oturum taslaklarını temizler.
- `homepage.json` başlık, açıklama, düğme, görsel, kategori kartı ve ürün seçkilerini yönetir. Geçersiz veya eksik dosyada güvenli varsayılanlar kullanılır. Kategori `imageFrame` değeri `contain`, `rod-detail` veya `line-spool` olabilir; görsel çerçevesi kart sıralamasından bağımsızdır.

**Mevcut KMK yönetim paneli bağlı değildir.** JSON dosyası bir içerik sözleşmesidir; canlı tema/panel uyumluluğu ancak KMK şablonları ve servisleriyle entegrasyon sonrası doğrulanabilir. Devir ve eşleme planı: [INTEGRATION.md](INTEGRATION.md). GitHub Pages yayını arayüz önizlemesidir; KMK üretim entegrasyonunun tamamlandığı anlamına gelmez.


## Mobil gezinme — sürüm 8

Mobil alt menüde seçili sekme dolu mavi ikon, renkli zemin ve 280 ms kayan vurgu ile gösterilir. Diğer ikonlar çizgisel kalır. Hareket azaltma tercihi animasyonu kapatır. Mobil başlıktaki yinelenen Favorilerim kaldırıldı; masaüstü kısayolu korunur. Filtre, karşılaştırma ve seçim yardımcısı Kategoriler grubunda; hesap ve satıcı ekranları Hesabım grubunda gösterilir.


## Vitrin sürümü 9 ve yayın öncesi inceleme

Deniz mavisi karşılama, DM Serif Display başlıkları ve daha temiz katalog fotoğrafları `vitrine.css` ile uygulanır. Dört ürünün kart görseli `displayImage` alanında seçilir; özgün galeri ve ürün bilgileri korunur. Alternatif kart fotoğrafı açılamazsa özgün fotoğrafa bir kez dönülür.

İncelemede küçük metin kontrastı, koyu alanda klavye odağı, tablet menüsündeki Av türleri bağlantısı ve düzeltilmiş teslimat alanlarında kalan hata yazıları giderildi. Mobil sekme animasyonu ve üstte yinelenen Favorilerim'in kaldırılması korunur.


## Kayıtlı adres akışı ve KMK devri

Teslimatta kayıtlı adres seçilebilir veya **Bu adresi adreslerime kaydet** ile başlık verilerek adres defterine eklenebilir. Adreslerim'de düzenleme, silme, varsayılan seçme ve teslimatta kullanma desteklenir. Önizleme yalnız açık oturum belleği kullanır; gerçek hesap/veritabanı bağlantısı yoktur ve kişisel adresler kalıcı tarayıcı kaydına yazılmaz.

KMK ekibi için alan sözleşmesi, kullanıcı/adres sahipliği, CRUD, varsayılan, tekrar kayıt önleme, hata durumları ve geçmiş sipariş adres kopyası gereksinimleri [ADDRESS-INTEGRATION.md](ADDRESS-INTEGRATION.md) dosyasında verilmiştir. Son doğrulama: 108 otomatik kontrol, ayrıca mobil gerçek etkileşimler ve kritik ekran genişliği kontrolleri.

# KMK adres defteri entegrasyonu

7 Kasım 2026. Önizlemede adres defteri yalnız açık oturum belleğindedir. Kişisel adresler localStorage, sessionStorage veya harici veritabanına yazılmaz. Yenilemeden sonra kalıcı değildir. Gerçek hesap kaydı için aşağıdaki işlemler KMK'nin mevcut kullanıcı ve sipariş altyapısına bağlanmalıdır; bu belge doğrulanmamış endpoint adı tanımlamaz.

## Arayüz ve veri sözleşmesi

Teslimat ekranı kayıtlı adres seçimini, yeni adres girişini ve isteğe bağlı **Bu adresi adreslerime kaydet** seçimini sunar. Kayıt ancak geçerli teslimat/fatura bilgileriyle bir sonraki adıma geçilirken yapılır. Adres başlığı bu seçim açıkken zorunludur. Varsayılan seçim kapalıdır.

Adres kaydı: `{id, title, name, phone, city, district, address, default}`. `id` sunucuda oluşturulmuş kalıcı adres kimliğine eşlenmelidir. `title` 1–60, `name` 2–100, `phone` en çok 32 (10–15 rakam), `city`/`district` 1–80, `address` 10–600 karakter sınırındadır. Bu sınırlar önizlemenin sözleşmesidir; KMK'nin alanları ve Türkiye adres doğrulamasıyla uzlaştırılmalıdır. İstemciden gelen kullanıcı kimliği yetki kaynağı olamaz.

Önizlemenin ayırdığı işlemler:

- `saveSavedAddress(data)`: doğrula, oluştur/güncelle; aynı teslimat bilgileri tekrar kaydedilirse çoğaltma. Açık oturumda en fazla 10 adres.
- `removeSavedAddress(id)`: kullanıcıya ait adresi kaldır, gerekiyorsa yeni varsayılan belirle.
- `useSavedAddress(id)`: teslimat alanlarına bir adresin kopyasını al; fatura adresini değiştirme.
- `ensureDefaultAddress()`: dolu adres defterinde tam bir varsayılan bulunmasını sağla.
- `saveCheckoutAddress()`: yalnız kullanıcı kayıt seçimini açtıysa teslimat adresini kaydet.
- Listeleme `accountSession.addresses` üzerinden yapılır. KMK'de bu liste oturumu doğrulanan kullanıcının sunucu yanıtından gelmelidir.

Adreslerim ekranında düzenleme, kaldırma ve varsayılan seçimi mevcut akışlarla sunulur. Önizlemeden çıkış adresleri de temizler. KMK'de çıkış tarayıcıdaki oturum verisini temizler; sunucudaki kullanıcının adres kayıtlarını silmemelidir.

## Sunucu sorumlulukları

Her listeleme/oluşturma/güncelleme/silme/varsayılan işlemi sunucu oturumu ve adres sahipliği ile yetkilendirilmelidir. CSRF koruması, sunucu doğrulaması, uzunluk sınırları ve çıktı kaçışları korunmalıdır. Telefonu yalnız biçim kontrolünden geçmiş diye doğrulanmış saymayın.

Çifte tıklama/ağ yeniden denemesi aynı adresi çoğaltmamalı; idempotency veya sunucu tarafında uygun tekrar önleme kullanılmalıdır. Varsayılan değiştirme ve adres silme işlemleri tutarlı bir işlem içinde yürümeli; iki varsayılan oluşmamalıdır. Son adres silinirse varsayılan boş olabilir.

Sipariş oluşturulurken teslimat ve fatura bilgileri **siparişe ait ayrı bir adres snapshot'ı** olarak kaydedilmelidir. Kullanıcı daha sonra adres defterini düzenlediğinde geçmiş siparişin teslimat adresi değişmemelidir. Siparişin kaynağı yalnız değişebilir bir adres kimliği olmamalıdır.

Adres kaydı başarısızsa formdaki bilgi kaybolmamalı; kayıt başarılıymış gibi gösterilmemeli. Oturum süresi dolması, yetkisiz adres kimliği, doğrulama hatası, adres sınırı ve ağ hatası ayrı, anlaşılır sonuçlarla ele alınmalıdır. Tasarım önizlemesindeki senkron bellek işlemleri gerçek servis başarısının yerine geçmez.

## Kabul kontrolleri

Üye hesabıyla adres kaydet → yeniden giriş/farklı cihazda listelenmesini doğrula; varsayılanı değiştir → sonraki siparişte doğru seçimi doğrula; aynı kaydı yeniden gönder → çoğalma olmadığını doğrula; başka kullanıcıya ait kimlikle erişimi reddet; adres defterini düzenle → geçmiş sipariş snapshot'ının değişmediğini doğrula. Bu kontroller gerçek KMK bağlantısında ayrıca çalıştırılmalıdır.

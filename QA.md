# Yayın öncesi doğrulama

6 Kasım 2026.

- 26 sayfa/akış × 4 ekran genişliği (320, 390, 768, 1280 px): 104 yerleşim kontrolü. Yatay taşma ve açılır diyalog: 0. Tarayıcı konsol hatası: 0. Ölçümler `qa-layout.json` dosyasında.
- Gerçek arayüzde: çoklu marka, fiyat ve stok birleşimi; marka aramasında seçim koruma; tek etiket kaldırma; ters fiyat aralığı; çok satan, görüntülenme, yenilik, fiyat ve indirim sıralamaları doğrulandı.
- 17 otomatik işlev kontrolü: `node checks/filters.cjs`. Arama, VE/VEYA filtre mantığı, fiyat sınırları, kaynak sıralamaları, tarih, görsel dosyaları, satış biçimi, stok ve adet sınırı geçiyor.
- Ürün → sepet → teslimat → kontrol → deneme sonucu akışı tarayıcıda tamamlandı. Eksik alan hataları ve farklı fatura adresi kontrol edildi. Gerçek sipariş veya ödeme gönderilmedi.
- Ürün ve av türü görsel dosyaları okunabilirlik açısından kontrol edildi.

Bu kontroller gözlenen davranışı doğrular. Gerçek müşteriyle görev testi, bağımsız erişilebilirlik denetimi ve KMK entegrasyon testi yapılmış sayılmaz.

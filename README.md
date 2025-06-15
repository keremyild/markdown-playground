# 📝 Markdown Playground

Markdown Playground, Markdown dilinde içerik yazmanızı ve bu içeriğin HTML karşılığını anlık olarak önizlemenizi sağlayan bir web uygulamasıdır. Uygulama, örnek belgeler, tema geçişi, fullscreen modu ve tarayıcıda veri kalıcılığı gibi özelliklerle zenginleştirilmiştir.

---

## 🚀 Özellikler

### ✅ Canlı Markdown Önizleme
- Markdown yazarken anında HTML çıktısını sağ panelde görebilirsiniz.
- `remark`, `rehype` ve `rehype-sanitize` kullanılarak güvenli HTML çıktısı oluşturulur.

### ✅ Örnek Markdown Belgeleri
- intro, features ve usage adlarında 3 farklı örnek markdown dosyası mevcuttur.
- Bu örnekleri üstteki seçim kutusuyla değiştirebilirsiniz.

### ✅ Tema Desteği (Dark / Light Mode)
- Dark ve Light modları arasında geçiş yapılabilir.
- Seçilen tema IndexedDB ile kaydedilir, sayfa yenilense de korunur.

### ✅ Fullscreen Mod
- Hem editör hem de önizleme paneli ayrı ayrı fullscreen moduna alınabilir.
- `Escape` tuşu veya buton ile fullscreen'den çıkabilirsiniz.
- Light ve dark modda fullscreen uyumludur.

### ✅ IndexedDB ile Kalıcılık
- Yazdığınız Markdown içeriği otomatik olarak IndexedDB’ye kaydedilir.
- Sayfayı yenileseniz bile son yazdığınız içerik geri yüklenir.
- Tema ayarı da tarayıcıya kaydedilir.

---

## 🛠️ Kurulum

### Gereksinimler:
- Node.js (18+)
- npm veya yarn

### Kurulum ve Başlatma:
npm install
npm run dev

Uygulama http://localhost:3000 adresinde çalışacaktır.
🧩 Kullanılan Teknolojiler
Next.js 

React 18

Tailwind CSS – stil ve tema yönetimi

TypeScript – tip güvenliği

remark / rehype – Markdown'dan HTML'e dönüşüm

IndexedDB – tarayıcıda içerik ve ayar kalıcılığı

lodash.debounce – yazım sırasında debounce işlemi
Kerem Yıldırım

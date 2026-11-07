const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const assert=require('node:assert/strict');
const source=fs.readFileSync(path.join(__dirname,'..','account-ui.js'),'utf8');
const listeners={document:{},window:{}};
const nodes=new Map(),revoked=[],renders=[],navigation=[],notices=[];
function node(){return {textContent:'',innerHTML:'',hidden:false,attributes:{},classList:{toggle(){}},setAttribute(k,v){this.attributes[k]=v},focus(){this.focused=true}}}
class FormDataStub{constructor(form){this.pairs=Object.entries(form.elements).filter(([,v])=>v.type!=='checkbox'||v.checked).map(([k,v])=>[k,v.type==='checkbox'?'on':v.value])}*[Symbol.iterator](){yield* this.pairs}}
const context={
 document:{addEventListener(type,fn){(listeners.document[type]??=[]).push(fn)},body:{classList:{toggle(){}}}},
 window:{addEventListener(type,fn){(listeners.window[type]??=[]).push(fn)}},
 console,URLSearchParams,FormData:FormDataStub,
 URL:class extends URL{static revokeObjectURL(url){revoked.push(url)}static createObjectURL(f){return 'blob:'+f.name}},
 products:[{slug:'p',category:'Olta Makineleri',seller:'Satıcı'}],state:{demoOrder:{id:'DENEME-1'}},
 checkoutDraft:{},cartItems:()=>[{p:{slug:'p'},q:1}],
 esc:s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),
 icon:n=>`<svg data-icon="${n}"></svg>`,pageShell:(title,html)=>`<h1>${title}</h1>${html}`,
 money:n=>`${n} TL`,route:(name,p={})=>'#'+name+'?'+new URLSearchParams(p),
 empty:(title,description,label,url)=>`<h2>${title}</h2><p>${description}</p><a href="${url}">${label}</a>`,
 taxonomyNodes:()=>[{name:'Kamp'},{name:'Olta Makineleri'}],
 render:(...args)=>renders.push(args),go:(...args)=>navigation.push(args),toast:t=>notices.push(t),
 current:()=>({name:'catalog'}),$:selector=>{if(!nodes.has(selector))nodes.set(selector,node());return nodes.get(selector)},$$:()=>[]
};
vm.createContext(context);vm.runInContext(source,context,{filename:'account-ui.js'});
const read=code=>vm.runInContext(code,context);
let passed=0;
function check(name,fn){fn();passed++;process.stdout.write('PASS '+name+'\n')}
function form(id,values){const errors=new Map();return {id,getAttribute:name=>name==='id'?id:null,elements:Object.fromEntries(Object.entries(values).map(([name,value])=>[name,{...node(),value:String(value),name}])),querySelector(selector){if(!errors.has(selector))errors.set(selector,node());return errors.get(selector)}}}
function submit(f){let prevented=false;for(const fn of listeners.document.submit||[])fn({target:f,preventDefault(){prevented=true}});assert(prevented,'Module should prevent network submission')}
function click(dataset={},attrs=[]){const b={dataset,hasAttribute:name=>attrs.includes(name)};for(const fn of listeners.document.click||[])fn({target:{closest:()=>b}})}
check('All 19 account and seller routes render locally without passwords',()=>{
 const routes=read('accountRoutes');assert.equal(routes.length,19);
 for(const route of routes){const html=context.accountScreen(route,new URLSearchParams());assert(html.includes('<h1>'),route);assert(!html.includes('oltapazari.com.tr'),route+' external navigation');assert(!/type=["']password/i.test(html),route+' asks password')}
});
check('Listing categories include the full taxonomy outside loaded products',()=>assert(context.accountScreen('sell-new',new URLSearchParams()).includes('Kamp')));
check('Telephone validation accepts formatting and rejects embedded letters',()=>{
 assert.equal(read("accountRules.phone('+90 (500) 000 00 00')"),'');
 for(const v of ['abc05000000000','123','1234567890123456'])assert(read('accountRules.phone('+JSON.stringify(v)+')'));
});
check('Profile validation marks invalid fields and preserves session data',()=>{
 const f=form('account-profile-form',{name:'A',email:'invalid',phone:'abc05000000000'});submit(f);
 assert.equal(read('accountSession.profile.name'),'');assert.equal(f.elements.name.attributes['aria-invalid'],'true');assert(f.elements.name.focused);
 const valid=form('account-profile-form',{name:'Deneme Kullanıcısı',email:'deneme@example.com',phone:'0500 000 00 00'});submit(valid);
 assert.equal(read('accountSession.profile.name'),'Deneme Kullanıcısı');assert.equal(read('accountSession.profile.email'),'deneme@example.com');
});
check('Address save and deletion always retain exactly one default',()=>{
 read("accountSession.addresses=[]");
 let f=form('account-address-form',{id:'one',title:'Ev',name:'Deneme Kişi',phone:'05000000000',city:'İstanbul',district:'Kadıköy',address:'Örnek mahalle sokak 1'});f.elements.default={...node(),type:'checkbox',checked:false};submit(f);
 assert.equal(read('accountSession.addresses.length'),1);assert(read('accountSession.addresses[0].default'));
 f=form('account-address-form',{id:'two',title:'İş',name:'Deneme Kişi',phone:'05000000000',city:'İstanbul',district:'Kadıköy',address:'Diğer mahalle sokak 2'});f.elements.default={...node(),type:'checkbox',checked:true};submit(f);
 assert.equal(read('accountSession.addresses.filter(a=>a.default).length'),1);assert.equal(read('accountSession.addresses.find(a=>a.default).id'),'two');
 click({addressDelete:'two'});assert.equal(read('accountSession.addresses.length'),1);assert(read('accountSession.addresses[0].default'));
});
check('Selected address fills checkout fields and uses the checkout route',()=>{
 click({addressUse:'one'});assert.equal(context.checkoutDraft.city,'İstanbul');assert.equal(navigation.at(-1)[0],'checkout');
});
check('Pending photo selection cannot leak from a cancelled listing editor',()=>{
 read("accountSession.photos=['blob:pending-A'];accountSession.photoEditor='new';accountSession.listings=[{id:'B',title:'Ürün B',photos:['blob:saved-B']}]");
 context.accountScreen('sell-new',new URLSearchParams('edit=B'));
 assert.equal(read('accountSession.photos.length'),0);assert(revoked.includes('blob:pending-A'));assert(!revoked.includes('blob:saved-B'));
 read("accountSession.photos=['blob:pending-B']");for(const fn of listeners.window.hashchange)fn();
 assert.equal(read('accountSession.photos.length'),0);assert(revoked.includes('blob:pending-B'));assert(!revoked.includes('blob:saved-B'));
});
check('Listing submission tolerates a named id control shadowing form.id',()=>{
 const f=form('account-listing-form',{id:'',title:'Örnek olta ürünü',category:'Kamp',condition:'İkinci el',description:'Örnek ürün açıklaması yeterince uzun.',mode:'contact',price:'250',quantity:'1'});
 read("accountSession.photos=['blob:new-draft'];accountSession.photoEditor='new'");f.id=f.elements.id;submit(f);
 assert.equal(navigation.at(-1)[0],'seller-products');assert.equal(read('accountSession.listings.at(-1).category'),'Kamp');assert.equal(read('accountSession.listings.at(-1).photos[0]'),'blob:new-draft');
 for(const fn of listeners.window.hashchange)fn();assert(!revoked.includes('blob:new-draft'));
});
check('Return edit preserves the reason and explanation',()=>{
 read("accountSession.returnDraft={order:'DENEME-1',reason:'Yanlış ürün geldi',detail:'Yanlış ürün açıklaması'}");
 click({},['data-return-reset']);assert.equal(read('accountSession.returnDraft'),null);
 const html=context.accountScreen('returns',new URLSearchParams());assert(html.includes('<option selected>Yanlış ürün geldi</option>'));assert(html.includes('Yanlış ürün açıklaması'));
});
check('Seller settings validate and save only the session preference',()=>{
 const invalid=form('account-seller-settings-form',{name:'X',description:'Kısa',contact:'Mesaj yoluyla'});submit(invalid);assert.equal(read('accountSession.sellerSettings.name'),'');
 const valid=form('account-seller-settings-form',{name:'Deneme Mağazası',description:'Balıkçılık ekipmanları satan örnek mağaza.',contact:'Mesaj ve telefon'});submit(valid);
 assert.equal(read('accountSession.sellerSettings.name'),'Deneme Mağazası');assert.equal(read('accountSession.sellerSettings.contact'),'Mesaj ve telefon');
});
check('Payout preferences save without collecting financial identifiers',()=>{
 const html=context.accountScreen('seller-payment',new URLSearchParams());assert(!/<input[^>]*name=["'](?:iban|card|identity|bank)/i.test(html));
 submit(form('account-payout-form',{method:'Banka hesabına aktarım',schedule:'Haftalık özetle takip'}));assert.equal(read('accountSession.payout.schedule'),'Haftalık özetle takip');assert(read('accountSession.notice').includes('Ödeme talimatı oluşturulmadı'));
});
check('Message submission creates an unsent draft rather than sending',()=>{
 submit(form('account-message-form',{recipient:'Satıcı',subject:'Ürün sorusu',message:'Ürünün durumu nedir?'}));assert.equal(read('accountSession.messages.at(-1).subject'),'Ürün sorusu');assert(read('accountSession.notice').includes('gönderilmedi'));
});
check('Account module performs no fetch or persistent personal storage',()=>{assert(!/\b(?:fetch|XMLHttpRequest|localStorage|sessionStorage)\s*[.(]/.test(source))});
check('Saved message drafts reopen and update without creating duplicates',()=>{
 const id=read('accountSession.messages.at(-1).id'),before=read('accountSession.messages.length');
 const html=context.accountScreen('messages',new URLSearchParams({edit:id}));assert(html.includes('Ürünün durumu nedir?'));assert(html.includes('Mesaj taslağını düzenle'));
 const f=form('account-message-form',{id,recipient:'Satıcı',subject:'Teslimat sorusu',message:'Ne zaman kargoya verilir?'});f.id=f.elements.id;submit(f);
 assert.equal(read('accountSession.messages.length'),before);assert.equal(read('accountSession.messages.at(-1).message'),'Ne zaman kargoya verilir?');
});
check('Empty messages view offers a direct way to create a draft',()=>{
 const saved=read('accountSession.messages');read('accountSession.messages=[]');assert(context.accountScreen('messages',new URLSearchParams()).includes('#messages?new=1'));context.savedMessages=saved;read('accountSession.messages=savedMessages');
});
check('Unsupported language and currency selections do not masquerade as working settings',()=>{
 const html=context.accountScreen('settings',new URLSearchParams());assert(html.includes('<option>Türkçe</option>'));assert(html.includes('<option>TL</option>'));assert(!html.includes('<option >USD</option>'));assert(!html.includes('<option >English</option>'));
});
check('Select validation errors are associated with their controls',()=>{
 const f=form('account-return-form',{reason:'',detail:'Ayrıntılı bir açıklama'});submit(f);assert.equal(f.elements.reason.attributes['aria-describedby'],'account-error-reason');assert.equal(f.elements.reason.attributes['aria-invalid'],'true');assert(f.elements.reason.focused);
});
check('Request links reject malformed or unsafe URLs and saved details remain reviewable',()=>{
 for(const link of ['https://','https://user:password@example.com','javascript:alert(1)','ftp://example.com'])assert(read('accountRules.url('+JSON.stringify(link)+')'));
 assert.equal(read("accountRules.url('https://example.com/product?id=1')"),'');
 submit(form('account-request-form',{product:'Örnek makine',quantity:'2',link:'https://example.com/product?id=1',budget:'500',detail:'İki adet mavi renk istiyorum.'}));
 const html=context.accountScreen('request',new URLSearchParams());assert(html.includes('2 adet'));assert(html.includes('https://example.com/product?id=1'));assert(html.includes('500 TL'));
});
check('Cancelling photo selection retains the current photo draft',()=>{
 read("accountSession.photos=['blob:keep-photo']");const target={id:'account-listing-photos',files:[],closest:()=>null};for(const fn of listeners.document.change)fn({target});assert.equal(read('accountSession.photos[0]'),'blob:keep-photo');assert(!revoked.includes('blob:keep-photo'));
});
check('Replacing or removing a listing releases only discarded photos',()=>{
 read("accountSession.listings=[{id:'photo-edit',photos:['blob:old-photo']}];accountSession.photos=['blob:replacement']");
 submit(form('account-listing-form',{id:'photo-edit',title:'Örnek olta ürünü',category:'Kamp',condition:'İkinci el',description:'Örnek ürün açıklaması yeterince uzun.',mode:'contact',price:'250',quantity:'1'}));assert(revoked.includes('blob:old-photo'));assert(!revoked.includes('blob:replacement'));
 click({listingDelete:'photo-edit'});assert(revoked.includes('blob:replacement'));
});
check('Leaving the preview clears personal session data and temporary photo URLs',()=>{
 read("accountSession.signedIn=true;accountSession.photos=['blob:signout-pending'];accountSession.listings=[{photos:['blob:signout-saved']}];accountSession.returnDraft={detail:'Özel bilgi'};checkoutDraft.billingAddress='Özel fatura adresi'");
 click({},['data-account-signout']);assert.equal(read('accountSession.signedIn'),false);assert.equal(read('accountSession.profile.name'),'');
 for(const key of ['addresses','messages','listings','requests','photos'])assert.equal(read('accountSession.'+key+'.length'),0);
 assert.equal(read('accountSession.returnDraft'),null);assert.equal(context.checkoutDraft.billingAddress,undefined);assert.equal(context.checkoutDraft.address,'');assert(revoked.includes('blob:signout-pending'));assert(revoked.includes('blob:signout-saved'));
});
check('Leaving the preview also clears newsletter and review drafts when those modules are loaded',()=>{
 read("let newsletterDraft={email:'private@example.com',products:false,deals:false};let reviewDrafts={p:{rating:'5',review:'Kişisel değerlendirme taslağı'}};accountSession.signedIn=true");
 click({},['data-account-signout']);assert.equal(read('newsletterDraft.email'),'');assert.equal(read('newsletterDraft.products'),true);assert.equal(read('Object.keys(reviewDrafts).length'),0);
});
check('Session address repository reuses a saved address without duplicate records',()=>{read('accountSession.addresses=[]');const data={title:'Ev',name:'Deneme Kullanıcı',phone:'0500 000 00 00',city:'İstanbul',district:'Kadıköy',address:'Örnek Mahallesi No: 1',default:true};context.addressInput=data;let first=read('saveSavedAddress(addressInput)');assert(first.ok);assert.equal(read('accountSession.addresses.length'),1);context.addressInput={...data,phone:'05000000000'};let second=read('saveSavedAddress(addressInput)');assert(second.ok);assert.equal(second.address.id,first.address.id);assert.equal(read('accountSession.addresses.length'),1);assert(context.useSavedAddress(first.address.id));assert.equal(context.checkoutDraft.savedAddressId,first.address.id);assert.equal(context.checkoutDraft.saveToAddressBook,false);assert(context.checkoutAddressBook().includes('aria-pressed="true"'));context.removeSavedAddress(first.address.id);assert.equal(read('accountSession.addresses.length'),0);assert.equal(context.checkoutDraft.savedAddressId,'')});
check('Checkout address saving is opt-in, bounded, escaped and session-only',()=>{read('accountSession.addresses=[]');Object.assign(context.checkoutDraft,{title:'',addressTitle:'<Ev>',name:'Deneme Kullanıcı',phone:'05000000000',city:'İstanbul',district:'Kadıköy',address:'Örnek Mahallesi No: 1',saveToAddressBook:false});assert(context.saveCheckoutAddress().ok);assert.equal(read('accountSession.addresses.length'),0);context.checkoutDraft.saveToAddressBook=true;assert(context.saveCheckoutAddress().ok);assert.equal(read('accountSession.addresses.length'),1);assert(context.checkoutAddressBook().includes('&lt;Ev&gt;'));assert(!context.checkoutAddressBook().includes('<Ev>'));context.addressInput={title:'Ev',name:'A'.repeat(101),phone:'05000000000',city:'İstanbul',district:'Kadıköy',address:'Örnek Mahallesi No: 1'};assert(!read('saveSavedAddress(addressInput)').ok);assert.equal(read('accountSession.addresses.length'),1);assert(context.checkoutAddressSaveControls().includes('Kalıcı hesap kaydı')||context.checkoutAddressSaveControls().includes('kalıcı hesap kaydı'))});
process.stdout.write(passed+' account checks passed.\n');

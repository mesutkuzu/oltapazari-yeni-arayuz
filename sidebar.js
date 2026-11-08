/* Shared category navigation; desktop filters retain the existing URL contract. */
function sidebarCategoryNodes(query = '') {
  const groups = typeof TAXONOMY !== 'undefined' ? TAXONOMY.groups || [] : [];
  const flat = [];
  const visit = node => { flat.push(node); (node.children || []).forEach(visit); };
  groups.forEach(visit);
  const term = normalize(query).trim();
  return term ? flat.filter(node => normalize(node.name).includes(term)) : flat;
}

function sidebarCategoryHref(node, params = new URLSearchParams(), scoped = false) {
  if (!scoped) return route('category', { path: node.path });
  return catalogRoute(params, { source: node.path, category: '', page: '' });
}

function sidebarCategoryResults(params = new URLSearchParams(), query = '', scoped = false) {
  const term = normalize(query).trim();
  const selected = params.get('source') || '';
  const nodeLink = node => `<a href="${esc(sidebarCategoryHref(node, params, scoped))}"${scoped ? ` data-sidebar-category="${esc(node.path)}"` : ''}${selected === node.path || (!selected && params.get('category') === node.name) ? ' aria-current="page"' : ''}>${esc(node.name)}</a>`;
  const matches = sidebarCategoryNodes(query);
  if (term) return matches.length
    ? matches.map(node => `<div class="sidebar-category-leaf">${nodeLink(node)}</div>`).join('')
    : '<p class="sidebar-no-results">Bu isimde kategori bulunamadı. Daha kısa bir kelime dene.</p>';
  const containsSelected = node => node.path === selected || (node.children || []).some(containsSelected);
  const branch = (node, level = 0) => {
    if (!node.children?.length) return `<div class="sidebar-category-leaf">${nodeLink(node)}</div>`;
    const open = containsSelected(node) || (level === 0 && node.path === 'balikcilik');
    return `<details class="sidebar-category-branch"${open ? ' open' : ''}><summary>${nodeLink(node)}<span aria-hidden="true">${icon('chevron')}</span></summary><div class="sidebar-category-children">${node.children.map(child => branch(child, level + 1)).join('')}</div></details>`;
  };
  const groups = typeof TAXONOMY !== 'undefined' ? TAXONOMY.groups || [] : [];
  if (!groups.length) return `<div class="sidebar-category-leaf"><a href="#categories">Tüm kategoriler</a></div>`;
  return groups.map(node => branch(node)).join('');
}

function sidebarCategoryBrowser(params = new URLSearchParams(), scoped = false, open = true) {
  return `<details class="sidebar-category-browser" data-category-browser data-scoped="${scoped}" data-params="${esc(params.toString())}"${open ? ' open' : ''}><summary>Kategoriler ${icon('chevron')}</summary><div class="sidebar-category-content"><label class="sidebar-category-search"><span>Kategori ara</span><input type="search" data-sidebar-category-search aria-label="Kategori ara" placeholder="Örn. misina, kamış, yem" autocomplete="off"></label><nav class="sidebar-category-results" data-sidebar-category-results aria-label="Kategori ağacı">${sidebarCategoryResults(params, '', scoped)}</nav><p class="sr-only" data-sidebar-category-status role="status" aria-live="polite"></p></div></details>`;
}

function attachShoppingSidebar(name, rawParams) {
  const supported = ['home', 'catalog', 'category', 'store', 'categories', 'techniques', 'discipline', 'stores', 'brands', 'listings'].includes(name);
  const page = document.querySelector('#main > .wrap');
  document.body.classList.toggle('has-shopping-sidebar', supported && !!page);
  if (!supported || !page || page.querySelector('.shopping-layout')) return;
  page.classList.add('with-sidebar');
  const listing = page.classList.contains('simple-catalog');
  const params = catalogParams(rawParams, name);
  const menu = [
    ['#catalog', 'Tüm ürünler', 'grid'],
    ['#catalog?deal=1', 'Fırsat Avı', 'bag'],
    ['#listings', 'Bireysel ilanlar', 'user'],
    ['#techniques', 'Av türleri', 'compass'],
    ['#stores', 'Mağazalar', 'store']
  ];
  const currentHref = '#' + name + (rawParams.size ? '?' + rawParams.toString() : '');
  const shortcuts = `<nav class="sidebar-shortcuts" aria-label="Alışveriş kısayolları">${menu.map(([href, label, symbol]) => `<a href="${href}"${href === currentHref ? ' aria-current="page"' : ''}>${icon(symbol)}<span>${label}</span>${icon('chevron')}</a>`).join('')}</nav>`;
  const aside = document.createElement('aside');
  aside.className = 'shopping-sidebar';
  aside.setAttribute('aria-label', listing ? 'Kategoriler ve ürün filtreleri' : 'Alışveriş menüsü');
  aside.innerHTML = `<div class="sidebar-heading"><span>${icon(listing ? 'sliders' : 'grid')}</span><div><small>OLTA PAZARI</small><h2>${listing ? 'Kategoriler ve filtreler' : 'Alışverişe başla'}</h2></div></div>${listing ? '' : shortcuts}${sidebarCategoryBrowser(params, listing, !listing)}${listing ? `<div class="sidebar-filter-host">${filterForm(params, 'sidebar')}</div>` : ''}`;
  const layout = document.createElement('div');
  layout.className = 'shopping-layout';
  const content = document.createElement('div');
  content.className = 'shopping-content';
  while (page.firstChild) content.append(page.firstChild);
  layout.append(aside, content);
  page.append(layout);
  if (listing) updateFilterPreview(aside.querySelector('.refined-filters'));
}

document.addEventListener('input', event => {
  if (!event.target.matches('[data-sidebar-category-search]')) return;
  const browser = event.target.closest('[data-category-browser]');
  const params = new URLSearchParams(browser.dataset.params);
  browser.querySelector('[data-sidebar-category-results]').innerHTML = sidebarCategoryResults(params, event.target.value, browser.dataset.scoped === 'true');
  browser.querySelector('[data-sidebar-category-status]').textContent = event.target.value.trim()
    ? `${sidebarCategoryNodes(event.target.value).length} kategori bulundu.`
    : 'Tüm kategoriler gösteriliyor.';
});

document.addEventListener('click', event => {
  const link = event.target.closest('a[data-sidebar-category]');
  if (!link) return;
  const form = link.closest('.shopping-sidebar')?.querySelector('.refined-filters');
  if (!form) return;
  const draft = readFilterForm(form);
  const errors = filterErrors(draft, { badMin: form.elements.min.validity.badInput, badMax: form.elements.max.validity.badInput });
  if (errors.price || errors.date) {
    event.preventDefault();
    updateFilterPreview(form);
    form.elements[errors.price ? 'min' : 'dateStart'].focus();
    return;
  }
  link.setAttribute('href', sidebarCategoryHref({ path: link.dataset.sidebarCategory }, new URLSearchParams(draft), true));
});

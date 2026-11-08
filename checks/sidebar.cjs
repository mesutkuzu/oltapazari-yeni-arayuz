const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const sidebar = fs.readFileSync(path.join(root, 'sidebar.js'), 'utf8');
const data = JSON.parse(fs.readFileSync(path.join(root, 'data.json'), 'utf8'));
const taxonomy = JSON.parse(fs.readFileSync(path.join(root, 'taxonomy.json'), 'utf8'));
const names = ['route', 'values', 'catalogParams', 'catalogRoute', 'sortKey', 'filterForm'];
const functions = app.split('\n').filter(line => names.some(name => line.startsWith('function ' + name + '(')));
const identity = app.split('\n').filter(line => /^const (esc|normalize)=/.test(line));
const context = {
  URLSearchParams, products: data.products, TAXONOMY: taxonomy,
  techniques: [['Spin'], ['LRF'], ['Sazan avı']], icon: () => '<svg></svg>',
  document: { addEventListener() {} }
};
vm.createContext(context);
vm.runInContext(identity.join('\n') + '\n' + functions.join('\n') + '\n' + sidebar, context);
let passed = 0;
function check(name, fn) { fn(); passed++; process.stdout.write('PASS ' + name + '\n'); }
check('The searchable category menu uses all 116 actual taxonomy nodes', () => {
  assert.equal(context.sidebarCategoryNodes().length, 116);
  const matches = context.sidebarCategoryNodes('MİSİNA');
  assert(matches.length > 0);
  assert(matches.every(node => node.name.toLocaleLowerCase('tr-TR').includes('misina')));
  assert.equal(context.sidebarCategoryNodes('no-such-category-123').length, 0);
});
check('Choosing a category retains search, repeated brands, seller and favorites while resetting pagination', () => {
  const params = new URLSearchParams('q=olta&brand=Daiwa&brand=Shimano&seller=olta-pazari-shop&favorites=1&stock=1&sort=price-asc&page=3&category=Yapay+Yemler');
  const href = context.sidebarCategoryHref({ path: 'spin-makineleri' }, params, true);
  assert(href.startsWith('#category?'));
  const next = new URLSearchParams(href.split('?')[1]);
  assert.equal(next.get('path'), 'spin-makineleri');
  for (const key of ['q', 'seller', 'favorites', 'stock', 'sort']) assert.equal(next.get(key), params.get(key));
  assert.deepEqual([...context.values(next, 'brand')].sort(), ['Daiwa', 'Shimano']);
  assert(!next.has('page'));
  assert(!next.has('category'));
});
check('Global navigation opens the chosen category without accidentally inheriting listing restrictions', () => {
  const href = context.sidebarCategoryHref({ path: 'olta-makineleri' }, new URLSearchParams('seller=shop&min=9000'), false);
  assert.equal(href, '#category?path=olta-makineleri');
});
check('Category labels and paths cannot introduce executable markup', () => {
  const original = context.TAXONOMY;
  context.TAXONOMY = { groups: [{ name: '<img src=x onerror=alert(1)>', path: 'special&path', children: [] }] };
  const html = context.sidebarCategoryResults(new URLSearchParams(), '', true);
  assert(html.includes('&lt;img src=x onerror=alert(1)&gt;'));
  assert(!html.includes('<img src=x'));
  assert(html.includes('path=special%26path'));
  context.TAXONOMY = original;
});
check('Sidebar and mobile drawer forms have disjoint IDs and preserve the same filter fields', () => {
  const params = new URLSearchParams('q=olta&brand=Daiwa&brand=Shimano&source=olta-makineleri&seller=olta-pazari-shop&stock=1');
  const desktop = context.filterForm(params, 'sidebar');
  const mobile = context.filterForm(params);
  const ids = html => [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  assert(ids(desktop).length > 0);
  assert(ids(desktop).every(id => id.startsWith('sidebar-') && !ids(mobile).includes(id)));
  assert(desktop.includes('data-filter-role="filter-apply-button"'));
  assert(desktop.includes('type="hidden" name="q" value="olta"'));
  assert(desktop.includes('name="source" value="olta-makineleri"'));
  assert(desktop.includes('name="seller" value="olta-pazari-shop"'));
  assert(desktop.includes('name="brand" value="Daiwa" checked'));
  assert(desktop.includes('name="brand" value="Shimano" checked'));
  assert.equal((desktop.match(/class="filter-accordion sidebar-section"/g) || []).length, 2);
});
process.stdout.write(passed + ' sidebar checks passed.\n');

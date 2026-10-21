import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import ts from 'typescript'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const runtimeRequire = createRequire(import.meta.url)

// Execute the repository's TypeScript without a second production implementation.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const cache = new Map()
function load(relative) {
  const filename = path.join(root, relative)
  if (cache.has(filename)) return cache.get(filename).exports
  const loaded = { exports: {} }
  cache.set(filename, loaded)
  const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
    fileName: filename,
  }).outputText
  const localRequire = (id) => {
    if (id === 'next/navigation') return { usePathname: () => window.location.pathname }
    if (id.startsWith('@/') || id.startsWith('.')) {
      const stem = id.startsWith('@/') ? id.slice(2) : path.join(path.dirname(relative), id)
      const resolved = [stem, `${stem}.ts`, `${stem}.tsx`].find((file) => fs.existsSync(path.join(root, file)))
      return load(resolved)
    }
    return runtimeRequire(id)
  }
  new Function('require', 'module', 'exports', compiled)(localRequire, loaded, loaded.exports)
  return loaded.exports
}

const results = []
function test(name, run) {
  run()
  results.push({ scenario: name, passed: true })
  console.log(`PASS ${name}`)
}
function browser(pathname = '/') {
  const storage = new Map()
  const opened = []
  global.window = {
    location: { pathname, href: `https://aplicgrafica.com.br${pathname}`, search: '' },
    sessionStorage: { getItem: (key) => storage.get(key), setItem: (key, value) => storage.set(key, value) },
    open: (...args) => opened.push(args),
  }
  global.document = { title: 'Aplic Gráfica', referrer: '', documentElement: { dataset: {} } }
  return opened
}
const { buildWhatsAppUrl, resolveWhatsAppContext, getWhatsAppTrackingAttributes } = load('lib/whatsapp-conversion.ts')
const { useWhatsAppConversion: conversionHandlers } = load('hooks/use-whatsapp-conversion.ts')
const { useAnalytics: analyticsHandlers } = load('hooks/use-analytics.ts')
const { BusinessWhatsAppLink } = load('components/site/BusinessWhatsAppLink.tsx')
const { googleTagManagerBootstrap } = load('components/google-tag-manager.tsx')
const decode = (url) => new URL(url).searchParams.get('text')

const productRoutes = {
  '/cartao-de-visita': 'Cartão de visita',
  '/panfleto': 'Panfletos e folders',
  '/etiquetas-adesivas': 'Etiquetas adesivas',
  '/banner': 'Banner',
  '/pasta-com-bolso': 'Pasta com bolso',
  '/blocos-receituario': 'Blocos e receituários',
  '/cracha': 'Crachá',
}
const generalRoutes = {
  '/': 'Home', '/nova-home': 'Home', '/produtos': 'Catálogo', '/contato': 'Contato',
  '/sobre': 'Sobre a Aplic', '/grafica-em-floripa': 'Gráfica em Floripa', '/inexistente': 'Site',
}
for (const [pathname, label] of Object.entries(productRoutes)) {
  test(`product route ${pathname}: contextual header/footer/floating, one event/open each`, () => {
    const opened = browser(pathname)
    for (const source of ['header', 'mobile_header', 'footer', 'floating_bubble', 'floating_button']) {
      conversionHandlers().handleWhatsAppClick(undefined, source)
      const event = window.dataLayer.at(-1)
      assert.equal(event.event, 'whatsapp_click')
      assert.equal(event.page_path, pathname)
      assert.equal(event.product, label)
      assert.equal(event.conversion_source, source)
      assert.ok(decode(event.whatsapp_url).startsWith(`Vim pelo site – ${label}.\n\n`))
      assert.deepEqual(opened.at(-1), [event.whatsapp_url, '_blank', 'noopener,noreferrer'])
    }
    assert.equal(window.dataLayer.length, 5)
    assert.equal(opened.length, 5)
    assert.equal(resolveWhatsAppContext(undefined, `${pathname}/?utm_source=test#cta`).product, label)
  })
}
for (const [pathname, label] of Object.entries(generalRoutes)) {
  test(`general route ${pathname}: named origin and Orçamento geral`, () => {
    browser(pathname)
    conversionHandlers().handleWhatsAppClick()
    const event = window.dataLayer[0]
    assert.equal(event.product, 'Orçamento geral')
    assert.equal(event.page_path, pathname)
    assert.ok(decode(event.whatsapp_url).startsWith(`Vim pelo site – ${label}.\n\n`))
  })
}

test('explicit card product wins over route; accents, quantity, price and scope survive', () => {
  const opened = browser('/cartao-de-visita')
  const message = 'Olá! Quero *1.000 unidades* de *Folder 2 Dobras A4*. Vi *R$ 1.250,50*. Conferir arte & entrega?'
  const details = { scope: 'catalog_product', context: '/panfleto', productId: 'folder', variant: '1.000 un.', quantity: '1.000 un.', price: 1250.5 }
  conversionHandlers().handleWhatsAppClick(message, 'product_catalog_card', 'Folder 2 Dobras A4', details)
  const event = window.dataLayer[0]
  assert.equal(event.product, 'Folder 2 Dobras A4')
  assert.equal(event.product_id, 'folder')
  assert.equal(event.product_variant, '1.000 un.')
  assert.equal(event.product_quantity, '1.000 un.')
  assert.equal(event.product_price, 1250.5)
  assert.equal(event.product_currency, 'BRL')
  assert.equal(event.conversion_scope, 'catalog_product')
  assert.equal(event.conversion_context, '/panfleto')
  assert.equal(event.page_path, '/cartao-de-visita')
  assert.equal('value' in event, false)
  assert.equal('currency' in event, false)
  assert.equal(decode(event.whatsapp_url), `Vim pelo site – Folder 2 Dobras A4.\n\n${message}`)
  assert.equal(new URL(event.whatsapp_url).pathname, '/5548999128310')
  assert.equal(opened.length, 1)
  assert.equal(window.dataLayer.length, 1)
  assert.equal(getWhatsAppTrackingAttributes({ message, source: 'card', product: 'Folder 2 Dobras A4', ...details })['data-whatsapp-url'], event.whatsapp_url)
})

test('all existing conversion scopes retained; no implicit monetary value', () => {
  browser('/produtos')
  for (const scope of ['general_quote', 'product_family', 'catalog_product', 'custom_order', 'artwork_submission', 'order_support']) {
    analyticsHandlers().trackWhatsAppClick('test', undefined, undefined, { scope })
    assert.equal(window.dataLayer.at(-1).conversion_scope, scope)
    assert.equal('value' in window.dataLayer.at(-1), false)
  }
})

test('first-touch UTMs and click IDs survive navigation; current page remains distinct', () => {
  browser('/')
  window.location.search = '?utm_source=google&utm_medium=cpc&utm_campaign=gr%C3%A1fica&utm_content=a&utm_term=folder&gclid=G&fbclid=F&msclkid=M'
  window.location.href += window.location.search
  document.referrer = 'https://www.google.com/'
  load('lib/attribution.ts').captureConversionAttribution()
  window.location = { pathname: '/panfleto', search: '', href: 'https://aplicgrafica.com.br/panfleto' }
  conversionHandlers().handleWhatsAppClick()
  const event = window.dataLayer[0]
  assert.equal(event.utm_source, 'google')
  assert.equal(event.utm_medium, 'cpc')
  assert.equal(event.utm_campaign, 'gráfica')
  assert.equal(event.utm_content, 'a')
  assert.equal(event.utm_term, 'folder')
  assert.equal(event.gclid, 'G')
  assert.equal(event.fbclid, 'F')
  assert.equal(event.msclkid, 'M')
  assert.equal(event.landing_path, '/')
  assert.equal(event.referrer, 'https://www.google.com/')
  assert.equal(event.page_path, '/panfleto')
})

for (const pathname of ['/contato', '/panfleto']) {
  test(`BusinessDetails real anchor ${pathname}: prefilled href, one event, no programmatic open`, () => {
    const opened = browser(pathname)
    const link = BusinessWhatsAppLink()
    assert.equal(link.type, 'a')
    assert.ok(link.props.href.startsWith('https://wa.me/5548999128310?text='))
    assert.equal(link.props['data-whatsapp-url'], link.props.href)
    assert.equal(link.props.target, '_blank')
    assert.equal(link.props.rel, 'noopener noreferrer')
    assert.ok(decode(link.props.href).startsWith(`Vim pelo site – ${productRoutes[pathname] || generalRoutes[pathname]}.`))
    link.props.onClick()
    assert.equal(window.dataLayer.length, 1)
    assert.equal(window.dataLayer[0].whatsapp_url, link.props.href)
    assert.equal(window.dataLayer[0].product, productRoutes[pathname] || 'Orçamento geral')
    assert.equal(opened.length, 0)
  })
}

test('browserless URL resolution is deterministic and whitespace-only product falls back', () => {
  delete global.window
  assert.ok(decode(buildWhatsAppUrl()).startsWith('Vim pelo site – Site.'))
  assert.equal(resolveWhatsAppContext('  ', '/cracha').product, 'Crachá')
})

function bootstrapEnvironment(readyState) {
  const w = new EventTarget()
  const d = new EventTarget()
  const scripts = []
  d.readyState = readyState
  d.createElement = (tag) => ({ tag })
  d.head = { appendChild: (script) => scripts.push(script) }
  w.dataLayer = [{ event: 'whatsapp_click', product: 'Folder', page_path: '/produtos' }]
  const context = vm.createContext({ window: w, document: d })
  const run = (id = 'GTM-TEST') => vm.runInContext(googleTagManagerBootstrap(id), context)
  const trigger = (name) => (name === 'load' ? w : d).dispatchEvent(new Event(name))
  return { w, scripts, run, trigger }
}
for (const triggerName of ['load', 'pointerdown', 'keydown', 'click']) {
  test(`GTM ${triggerName}: deferred, queued event preserved, duplicate initialization gives one request/start`, () => {
    const { w, scripts, run, trigger } = bootstrapEnvironment('loading')
    run()
    run()
    assert.equal(scripts.length, 0)
    assert.equal(w.dataLayer.length, 1)
    const queuedEvent = w.dataLayer[0]
    trigger(triggerName)
    for (const name of ['pointerdown', 'keydown', 'click', 'load']) trigger(name)
    run()
    assert.equal(scripts.length, 1)
    assert.equal(scripts[0].src, 'https://www.googletagmanager.com/gtm.js?id=GTM-TEST')
    assert.equal(scripts[0].async, true)
    assert.equal(w.dataLayer[0], queuedEvent)
    assert.equal(w.dataLayer.filter((event) => event.event === 'gtm.js').length, 1)
  })
}

test('GTM loaded document: one immediate request, guard scoped per container', () => {
  const { w, scripts, run } = bootstrapEnvironment('complete')
  run()
  run()
  assert.equal(scripts.length, 1)
  run('GTM-SECOND')
  run('GTM-SECOND')
  assert.equal(scripts.length, 2)
  assert.equal(w.dataLayer.filter((event) => event.event === 'gtm.js').length, 2)
})
console.log(JSON.stringify({ passed: results.length, failed: 0, results }, null, 2))

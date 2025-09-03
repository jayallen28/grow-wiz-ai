import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.43/deno-dom-wasm.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { url } = await req.json()
    
    if (!url) {
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    console.log('Scraping URL:', url)

    // Fetch the webpage
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.status}`)
    }

    const html = await response.text()
    const doc = new DOMParser().parseFromString(html, 'text/html')
    
    let component = null

    // AC Infinity scraping
    if (url.includes('acinfinity.com')) {
      component = scrapeACInfinity(doc, url)
    }
    // Amazon scraping
    else if (url.includes('amazon.com')) {
      component = scrapeAmazon(doc, url)
    }
    else {
      return new Response(
        JSON.stringify({ success: false, error: 'Unsupported website. Only AC Infinity and Amazon are supported.' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    if (!component) {
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to extract product data from the page' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    console.log('Scraped component:', component)

    return new Response(
      JSON.stringify({ success: true, component }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error scraping product:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})

function scrapeACInfinity(doc: any, url: string) {
  try {
    const name = doc.querySelector('h1')?.textContent?.trim() || 
                 doc.querySelector('.product-title')?.textContent?.trim() ||
                 doc.querySelector('[data-testid="product-title"]')?.textContent?.trim()
    
    const priceText = doc.querySelector('.price')?.textContent?.trim() ||
                     doc.querySelector('.product-price')?.textContent?.trim() ||
                     doc.querySelector('[class*="price"]')?.textContent?.trim()
    
    const price = priceText ? parseFloat(priceText.replace(/[$,]/g, '')) : 0
    
    const description = doc.querySelector('.product-description')?.textContent?.trim() ||
                       doc.querySelector('[class*="description"]')?.textContent?.trim() ||
                       doc.querySelector('.product-details')?.textContent?.trim()
    
    const imageUrl = doc.querySelector('.product-image img')?.getAttribute('src') ||
                    doc.querySelector('[class*="image"] img')?.getAttribute('src') ||
                    doc.querySelector('img[alt*="product"]')?.getAttribute('src')
    
    // Determine category based on product name
    const category = determineCategory(name || '')
    
    if (!name || price === 0) {
      console.log('Missing required data:', { name, price })
      return null
    }

    return {
      name,
      brand: 'AC Infinity',
      category,
      price,
      powerConsumption: extractPowerConsumption(name || ''),
      description: description || '',
      imageUrl: imageUrl || null,
      affiliateUrl: url,
      specifications: {},
      compatibility: [],
      dimensions: { length: 0, width: 0, height: 0 },
      weight: 0,
      rating: 0,
      reviewCount: 0,
      isCustom: false
    }
  } catch (error) {
    console.error('Error scraping AC Infinity:', error)
    return null
  }
}

function scrapeAmazon(doc: any, url: string) {
  try {
    const name = doc.querySelector('#productTitle')?.textContent?.trim() ||
                 doc.querySelector('.product-title')?.textContent?.trim()
    
    const priceText = doc.querySelector('.a-price-whole')?.textContent?.trim() ||
                     doc.querySelector('[class*="price"] .a-offscreen')?.textContent?.trim() ||
                     doc.querySelector('.a-price .a-offscreen')?.textContent?.trim()
    
    const price = priceText ? parseFloat(priceText.replace(/[$,]/g, '')) : 0
    
    const description = doc.querySelector('#feature-bullets ul')?.textContent?.trim() ||
                       doc.querySelector('[data-feature-name="featurebullets"]')?.textContent?.trim()
    
    const imageUrl = doc.querySelector('#landingImage')?.getAttribute('src') ||
                    doc.querySelector('[data-old-hires]')?.getAttribute('data-old-hires')
    
    // Extract brand from breadcrumb or product info
    const brand = doc.querySelector('#bylineInfo')?.textContent?.trim()?.replace(/^Brand:\s*/i, '') ||
                 'Unknown'
    
    const category = determineCategory(name || '')
    
    if (!name || price === 0) {
      console.log('Missing required data:', { name, price })
      return null
    }

    return {
      name,
      brand,
      category,
      price,
      powerConsumption: extractPowerConsumption(name || ''),
      description: description || '',
      imageUrl: imageUrl || null,
      affiliateUrl: url,
      specifications: {},
      compatibility: [],
      dimensions: { length: 0, width: 0, height: 0 },
      weight: 0,
      rating: 0,
      reviewCount: 0,
      isCustom: false
    }
  } catch (error) {
    console.error('Error scraping Amazon:', error)
    return null
  }
}

function determineCategory(productName: string): string {
  const name = productName.toLowerCase()
  
  if (name.includes('tent')) return 'grow-tent'
  if (name.includes('light') || name.includes('led') || name.includes('quantum')) return 'led-light'
  if (name.includes('fan') || name.includes('exhaust') || name.includes('inline')) return 'ventilation'
  if (name.includes('filter') || name.includes('carbon')) return 'carbon-filter'
  if (name.includes('ph') && name.includes('meter')) return 'ph-meter'
  if (name.includes('tds') || name.includes('ec')) return 'tds-meter'
  if (name.includes('timer')) return 'timer'
  if (name.includes('thermometer')) return 'thermometer'
  if (name.includes('hygrometer') || name.includes('humidity')) return 'hygrometer'
  if (name.includes('co2')) return 'co2-controller'
  if (name.includes('soil') || name.includes('coco') || name.includes('perlite')) return 'grow-medium'
  if (name.includes('pot') || name.includes('container')) return 'pots'
  if (name.includes('duct') && !name.includes('fan')) return 'ducting'
  if (name.includes('oscillating') || name.includes('clip')) return 'oscillating-fan'
  if (name.includes('dehumidifier')) return 'dehumidifier'
  if (name.includes('humidifier')) return 'humidifier'
  if (name.includes('arduino') || name.includes('raspberry')) return 'arduino-kit'
  if (name.includes('sensor')) return 'sensors'
  if (name.includes('nutrient')) return 'nutrients'
  
  return 'accessories'
}

function extractPowerConsumption(productName: string): number {
  const name = productName.toLowerCase()
  const wattMatch = name.match(/(\d+)\s*w(?:att)?/i)
  if (wattMatch) return parseInt(wattMatch[1])
  
  // Common power ranges for different equipment types
  if (name.includes('led') || name.includes('light')) {
    if (name.includes('1000')) return 1000
    if (name.includes('600')) return 600
    if (name.includes('400')) return 400
    if (name.includes('300')) return 300
    if (name.includes('200')) return 200
    if (name.includes('100')) return 100
  }
  
  if (name.includes('fan') || name.includes('exhaust')) {
    return 45 // Typical inline fan power
  }
  
  return 0
}
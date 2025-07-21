const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function seedProducts() {
  try {
    console.log('Seeding digital products...')

    // Check if product already exists
    const { data: existingProducts, error: checkError } = await supabase
      .from('digital_products')
      .select('*')
      .eq('name', 'AI Reality Check: What You Aren\'t Doing, What You Can Do, What You Will Be Able to Do')

    if (checkError) {
      console.error('Error checking existing products:', checkError)
      return
    }

    if (existingProducts && existingProducts.length > 0) {
      console.log('Product already exists:', existingProducts[0].id)
      return
    }

    // Create the AI Reality Check eBook product
    const { data: product, error: insertError } = await supabase
      .from('digital_products')
      .insert({
        name: 'AI Reality Check: What You Aren\'t Doing, What You Can Do, What You Will Be Able to Do',
        description: 'The definitive guide to understanding, implementing, and mastering AI in your business. Learn what you\'re missing, what you can implement today, and what the future holds for AI in business.',
        price: 300, // $3.00 in cents
        currency: 'usd',
        file_url: 'ai-reality-check.pdf', // This should be the path in Supabase storage
        file_name: 'AI-Reality-Check-eBook.pdf',
        file_size: 2200000, // ~2.2MB
        is_active: true
      })
      .select()
      .single()

    if (insertError) {
      console.error('Error creating product:', insertError)
      return
    }

    console.log('Product created successfully:')
    console.log('ID:', product.id)
    console.log('Name:', product.name)
    console.log('Price:', `$${(product.price / 100).toFixed(2)}`)
    console.log('\nNext steps:')
    console.log('1. Upload your PDF file to Supabase Storage bucket')
    console.log('2. Update the file_url in the database to match the storage path')
    console.log('3. Set up your Stripe webhook endpoint')
    console.log('4. Test the purchase flow')

  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

if (require.main === module) {
  seedProducts()
}

module.exports = { seedProducts }
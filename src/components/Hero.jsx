export default function Hero() {
  return (
    <section id="home" className="pt-24 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Handcrafted coffee, baked fresh daily
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Discover our seasonal blends, artisan pastries, and warm neighborhood vibes.
          </p>
          <div className="mt-6 flex gap-3">
            <a href="#menu" className="px-5 py-3 rounded-md bg-gray-900 text-white hover:bg-black transition-colors">Explore Menu</a>
            <a href="#pickup" className="px-5 py-3 rounded-md bg-amber-600 text-white hover:bg-amber-700 transition-colors">Order Pickup</a>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl bg-[url('https://images.unsplash.com/photo-1500989145603-8e7ef71d639e?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center shadow-xl" />
        </div>
      </div>
    </section>
  )
}

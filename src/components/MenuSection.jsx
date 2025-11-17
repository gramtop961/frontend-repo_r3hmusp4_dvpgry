import { useEffect, useState } from 'react'

export default function MenuSection() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const load = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/menu`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const categories = ['All', ...Array.from(new Set(items.map(i => i.category)))]
  const visible = filter === 'All' ? items : items.filter(i => i.category === filter)

  return (
    <section id="menu" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-3xl font-bold">Menu</h2>
          <div className="flex gap-2">
            {categories.map((c) => (
              <button key={c} onClick={() => setFilter(c)} className={`px-3 py-1 rounded-full border ${filter===c? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300'}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <p>Loading menu...</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {visible.map((i) => (
              <div key={i._id} className="border rounded-xl p-4 hover:shadow-lg transition-shadow">
                <div className="aspect-video rounded-lg bg-gray-100 mb-3" style={{backgroundImage: i.image? `url(${i.image})`: undefined, backgroundSize: 'cover', backgroundPosition: 'center'}} />
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{i.name}</h3>
                    <p className="text-sm text-gray-500">{i.description}</p>
                  </div>
                  <span className="font-semibold">${i.price?.toFixed?.(2) ?? i.price}</span>
                </div>
                <span className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${i.available? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{i.available? 'Available' : 'Sold out'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

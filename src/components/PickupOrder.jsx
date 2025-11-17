import { useMemo, useState } from 'react'

export default function PickupOrder() {
  const [cart, setCart] = useState([])
  const [customer, setCustomer] = useState({ customer_name: '', phone: '', pickup_time: 'ASAP' })
  const [status, setStatus] = useState(null)

  const addQuick = (name, price) => {
    const id = name
    const existing = cart.find(i => i.name === name)
    if (existing) {
      setCart(cart.map(i => i.name === name ? { ...i, quantity: i.quantity + 1 } : i))
    } else {
      setCart([...cart, { item_id: id, name, price, quantity: 1 }])
    }
  }

  const subtotal = useMemo(() => cart.reduce((s, i) => s + i.price * i.quantity, 0), [cart])
  const tax = useMemo(() => +(subtotal * 0.085).toFixed(2), [subtotal])
  const total = useMemo(() => +(subtotal + tax).toFixed(2), [subtotal, tax])

  const placeOrder = async () => {
    if (!customer.customer_name || !customer.phone || cart.length === 0) {
      setStatus('Please add items and fill your name & phone.')
      return
    }
    setStatus('Placing order...')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...customer, items: cart, subtotal, tax, total })
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('Order received! See you soon.')
      setCart([])
      setCustomer({ customer_name: '', phone: '', pickup_time: 'ASAP' })
    } catch (e) {
      setStatus('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="pickup" className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-4">Quick Order</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[['Latte',4.5],['Cappuccino',4.5],['Americano',3.5],['Mocha',5],['Cold Brew',4.25],['Croissant',3.25]].map(([n,p]) => (
              <button key={n} onClick={() => addQuick(n,p)} className="rounded-lg border px-3 py-2 hover:shadow">{n}<span className="block text-xs text-gray-500">${p.toFixed(2)}</span></button>
            ))}
          </div>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Your Cart</h3>
            {cart.length === 0 ? (
              <p className="text-gray-500">No items yet.</p>
            ) : (
              <ul className="divide-y">
                {cart.map((i) => (
                  <li key={i.name} className="py-2 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{i.name}</p>
                      <p className="text-sm text-gray-500">${i.price.toFixed(2)} x {i.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="px-2 py-1 border rounded" onClick={() => setCart(cart.map(it => it.name===i.name? {...it, quantity: Math.max(1, it.quantity-1)}: it))}>-</button>
                      <button className="px-2 py-1 border rounded" onClick={() => setCart(cart.map(it => it.name===i.name? {...it, quantity: it.quantity+1}: it))}>+</button>
                      <button className="px-2 py-1 text-red-600" onClick={() => setCart(cart.filter(it => it.name!==i.name))}>Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
              <div className="flex justify-between font-semibold text-lg"><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-4">Pickup Details</h2>
          <div className="grid gap-3">
            <input className="input" placeholder="Your name" value={customer.customer_name} onChange={e=>setCustomer({...customer, customer_name: e.target.value})} />
            <input className="input" placeholder="Phone" value={customer.phone} onChange={e=>setCustomer({...customer, phone: e.target.value})} />
            <select className="input" value={customer.pickup_time} onChange={e=>setCustomer({...customer, pickup_time: e.target.value})}>
              <option>ASAP</option>
              <option>In 15 minutes</option>
              <option>In 30 minutes</option>
              <option>In 45 minutes</option>
            </select>
            <button onClick={placeOrder} className="bg-amber-600 text-white rounded-md px-4 py-2 hover:bg-amber-700">Place Order</button>
            {status && <p className="text-sm text-gray-600">{status}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}

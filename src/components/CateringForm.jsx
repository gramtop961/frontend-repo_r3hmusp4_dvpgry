import { useState } from 'react'

export default function CateringForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', event_date: '', guests: 20, notes: '' })
  const [status, setStatus] = useState(null)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Submitting...')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/catering`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to submit')
      setStatus('Thanks! We will reach out shortly.')
      setForm({ name: '', email: '', phone: '', event_date: '', guests: 20, notes: '' })
    } catch (e) {
      setStatus('Something went wrong. Please try again.')
    }
  }

  return (
    <section id="catering" className="bg-amber-50">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-6">Catering Reservation</h2>
        <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 bg-white p-6 rounded-xl border">
          <input className="input" placeholder="Your name" name="name" value={form.name} onChange={onChange} required />
          <input className="input" placeholder="Email" type="email" name="email" value={form.email} onChange={onChange} required />
          <input className="input" placeholder="Phone" name="phone" value={form.phone} onChange={onChange} required />
          <input className="input" placeholder="Event date" type="date" name="event_date" value={form.event_date} onChange={onChange} required />
          <input className="input" placeholder="Guests" type="number" min="1" name="guests" value={form.guests} onChange={onChange} required />
          <textarea className="input md:col-span-2" placeholder="Notes" name="notes" value={form.notes} onChange={onChange} />
          <button className="md:col-span-2 bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-black">Submit</button>
          {status && <p className="md:col-span-2 text-sm text-gray-600">{status}</p>}
        </form>
      </div>
    </section>
  )
}

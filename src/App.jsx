import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MenuSection from './components/MenuSection'
import CateringForm from './components/CateringForm'
import PickupOrder from './components/PickupOrder'

function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <MenuSection />
      <CateringForm />
      <PickupOrder />
      <footer className="border-t mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between">
          <p>© {new Date().getFullYear()} Roast & Coast. All rights reserved.</p>
          <a href="/test" className="text-blue-600 hover:underline">System status</a>
        </div>
      </footer>
    </div>
  )
}

export default App

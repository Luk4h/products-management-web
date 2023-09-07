import { type Metadata } from 'next'
import ProductsList from './components/ProductsList'
import FilterProvider from './providers/FilterProvider'
import Nav from './components/Nav'
import OverlayProvider from './providers/OverlayProvider'
 
export const metadata: Metadata = {
  title: 'Gerenciamento de inventário | TecadiLabs',
}
 
export default function Page() {
  return (
    <main id="Inventory">
      <OverlayProvider>
        <FilterProvider>
          <Nav />
          <ProductsList />
        </FilterProvider>
      </OverlayProvider>
    </main>
  )
}
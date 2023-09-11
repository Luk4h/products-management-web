/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type Metadata } from 'next'
import ProductsList from './components/ProductsList'
import FilterProvider from './providers/FilterProvider'
import Nav from './components/Nav'
import OverlayProvider from './providers/OverlayProvider'
import ProductCards from './components/ProductCards'
 
export const metadata: Metadata = {
  title: 'Gerenciamento de inventário | TecadiLabs',
}
 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page({searchParams}: any) {


  const pageNumber: string = searchParams?.page ?? '1';
  const limit: string = searchParams?.limit ?? '10';

  const params = {pageNumber, limit};

  return (
    <main id="Inventory">
      <OverlayProvider>
        <FilterProvider>
          <Nav />
          <ProductsList >
            <ProductCards {...params}/>
          </ProductsList>
        </FilterProvider>
      </OverlayProvider>
    </main>
  )
}
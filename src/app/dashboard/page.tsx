import { type Metadata } from 'next'
import { auth } from '~/auth'
import MenuIcon from '@/components/icons/Menu'
import PlusIcon from '@/components/icons/Plus'
import FilterIcon from '../components/icons/Filter'
import OrderByIcon from '../components/icons/OrderBy'
import StorageIcon from '../components/icons/Storage'
import WeightIcon from '../components/icons/Weight'
 
export const metadata: Metadata = {
  title: 'Gerenciamento de inventário | TecadiLabs',
}
 
export default async function Page() {
  const session = await auth();

  return (
    <main id="Inventory">
      <nav id="Header" className='bg-blue-600 w-screen p-8 flex justify-between items-center text-white'>
        <button id="Menu">
          <MenuIcon />
        </button>
        <h1 className='text-xl'>Inventário</h1>
        <button id="Menu">
          <PlusIcon />
        </button>
      </nav>
      <div id="Products" className='w-screen h-full flex flex-col px-6 py-4 gap-4'>
        <div id="ButtonsGroup" className='flex justify-between items-center'>
          <button id="FilterButton" className='flex w-2/5 items-center gap-2 text-sm uppercase text-slate-500 p-2'>
            <FilterIcon />
            <p>Filtrar</p>
          </button>
          <button id="FilterButton" className='flex w-2/5 items-center gap-2 text-sm uppercase text-slate-500 p-2 flex-row-reverse'>
            <OrderByIcon />
            <p>Ordenar</p>
          </button>
        </div>
        <div id="ProductCard" className='flex p-4 flex-col items-start gap-2 rounded-lg border-l-4 border-blue-600 bg-white shadow-md'>
          <span id="Code" className='text-slate-500 text-xs uppercase'>{`#${'MINE0313-0003'}`}</span>
          <p id="Name" className='text-black text-md font-bold uppercase'>{`${'MODULE WIRELESS AUDIO RX WM 12'}`}</p>
          <div id="Details" className='flex items-center gap-2 text-slate-800'>
            <span id="Amount" className='flex items-center gap-1'>
              <StorageIcon />
              <p id="Value">{`${0} ${'Un'}`}</p>
            </span>
            <span id="Weight" className='flex items-center gap-1'>
              <WeightIcon />
              <p id="Value">{`${0.1} ${'Kg'}`}</p>
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}
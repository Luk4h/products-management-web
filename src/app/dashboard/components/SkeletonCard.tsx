import StorageIcon from "@/components/icons/Storage";
import WeightIcon from "@/components/icons/Weight";

const SkeletonCard = () => (
  <div id="SkeletonCard" className='flex flex-col items-start gap-2 pt-2 bg-zinc-200 bg-no-repeat bg-opacity-30'>
    <div id="Code" className='w-1/3 h-4 bg-zinc-300 rounded-md animate-shine'/>
    <div id="Name" className='w-full h-6 bg-zinc-300 rounded-md animate-shine'/>
    <div id="Details" className='flex items-center gap-2 text-zinc-400'>
      <div id="Amount" className='flex items-center gap-1'>
        <StorageIcon />
        <div id="Value" className='w-12 h-4 bg-zinc-300 rounded-md animate-shine'/>
      </div>
      <div id="Weight" className='flex items-center gap-1'>
        <WeightIcon />
        <div id="Value" className='w-12 h-4 bg-zinc-300 rounded-md animate-shine'/>
      </div>
    </div>
  </div>
);

export default SkeletonCard;
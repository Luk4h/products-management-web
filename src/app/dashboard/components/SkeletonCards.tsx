import SkeletonCard from "./SkeletonCard";

type SkeletonCardsProps = {
  amount: string
}

const SkeletonCards = ({amount}: SkeletonCardsProps) => Array.from({ length: Number(amount) }).map((_e, idx) => <SkeletonCard key={idx} /> )

export default SkeletonCards;
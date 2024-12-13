import CarSelector from "@/components/CarSelector";
import { Suspense } from "react";

export default function CarSubscriptions() {
  return (
    <Suspense>
      <CarSelector />
    </Suspense>
  )
}
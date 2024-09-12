import CarSelector from "@/components/CarSelector";
import { Suspense } from "react";

export default function CarSubscriptions() {
  return (
    <div>
      <h1 className="mb-2">Your Subscription</h1>
      <div>
        <Suspense>
          <CarSelector />
        </Suspense>
      </div>
      <p className="text-xs mt-1"> Type the model name or brand, select from the dropdown list, and click "Save."</p>
    </div>
  )
}
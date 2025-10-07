import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Filter, RefreshCcw, Info } from "lucide-react";

export default function Home() {
  return (
    <div className="font-sans flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-sm border border-gray-100">
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Define Filter Conditions</h2>

          <div>
            <p className="text-sm text-gray-600 mb-2">Enter filter rules (one per line):</p>
            <Textarea
              className="min-h-[200px] font-mono text-sm"
              placeholder={`price > 5000
category = Smartphones
stock_status = instock
brand != Samsung
rating >= 4.0`}

            />
          </div>

          <p className="text-xs text-gray-500">
            Examples: price {`>`} 5000, category = Smartphones, stock_status = instock
          </p>

          <div className="flex gap-3">
            <Button className="flex-1">
              <Filter className="h-4 w-4" />
              Evaluate Filter
            </Button>
            <Button variant="outline">
              <RefreshCcw className="h-4 w-4" />
              Reset
            </Button>
          </div>

          <div className="bg-gray-50 p-4 rounded-md flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-1">Supported operators:</p>
              <p className="font-mono">= != {`>`} {`<`} {`>=`} {`<=`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

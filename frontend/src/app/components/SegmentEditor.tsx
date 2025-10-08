"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types/product";
import { Filter, RefreshCcw, Info } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import axiosClient from "@/lib/utils";
import axios, { AxiosError } from "axios";

export default function SegmentEditor({ setProducts, onReset }: { setProducts: Dispatch<SetStateAction<Product[]>>, onReset: () => void }) {

  const [filterText, setFilterText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showJSON, setShowJSON] = useState(false);

  const evaluateFilters = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Since our segmentServiceClient already has the baseURL set
      const response = await axiosClient.post(`${process.env.NEXT_PUBLIC_SEGMENT_SERVICE_URL}/segments/evaluate`, { rules: filterText });

      setProducts(response.data.products);
      setFilteredProducts(response.data.products);
      setShowJSON(true); // Automatically show JSON when results are received
    } catch (err) {

      const isAxiosError = axios.isAxiosError(err)

      if (isAxiosError) {
        const axiosError = err as AxiosError<{ error?: string }>;
        setError(JSON.stringify(axiosError.response?.data?.error || "Failed to evaluate filters. Please try again."));
      } else {
        setError("Failed to evaluate filters. Please try again.");
      }

      // console.error("Error evaluating filters:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFilterText("");
    setError(null);
    setFilteredProducts([]);
    setShowJSON(false);
    onReset();
  };


  return (
    <div className="w-full max-w-xl bg-white rounded-lg ">
      <div className=" space-y-4">

        <div>
          <p className="text-sm text-gray-600 mb-2">Enter filter rules (one per line):</p>
          <Textarea
            className="min-h-[200px] font-mono text-sm"
            placeholder={`price > 5000
category = Smartphones
stock_status = instock
on_sale = true`}
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>

        <p className="text-xs text-gray-500">
          Examples: price {`>`} 5000, category = Smartphones, stock_status = instock
        </p>

        <div className="flex gap-3">
          <Button
            className="flex-1"
            onClick={evaluateFilters}
            disabled={isLoading || !filterText.trim()}
          >
            {isLoading ? 'Evaluating...' : (
              <>
                <Filter className="h-4 w-4 mr-2" />
                Evaluate Filter
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            disabled={isLoading || !filterText.trim()}
          >
            <RefreshCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-2">
            {error}
          </div>
        )}

        <div className="bg-gray-50 p-4 rounded-md flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-500 mt-0.5" />
          <div className="text-sm text-gray-600">
            <p className="font-medium mb-1">Supported operators:</p>
            <p className="font-mono">= != {`>`} {`<`} {`>=`} {`<=`}</p>
          </div>
        </div>

        {filteredProducts.length > 0 && showJSON && (
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">Filtered Products ({filteredProducts.length})</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowJSON(!showJSON)}
                className="text-xs"
              >
                {showJSON ? "Hide JSON" : "Show JSON"}
              </Button>
            </div>
            <div className="bg-gray-900 p-4 rounded-md overflow-auto max-h-[400px]">
              <pre className="text-xs text-green-400 font-mono whitespace-pre-wrap">
                {JSON.stringify(filteredProducts, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
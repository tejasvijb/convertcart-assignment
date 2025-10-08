import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import SegmentEditor from "./SegmentEditor"
import { Filter } from "lucide-react"
import { Product } from "@/types/product"
import { Dispatch, SetStateAction } from "react"


export default function SegmentEditorDialog({ setProducts, onReset }: { setProducts: Dispatch<SetStateAction<Product[]>>, onReset: () => void }) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            variant={"default"}
            onClick={() => { }}
          >
            <Filter size={18} />
            Filter
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle className="text-xl font-semibold">Define Filter Products</DialogTitle>
          <SegmentEditor setProducts={setProducts} onReset={onReset} />

        </DialogContent>
      </form>
    </Dialog>
  )
}

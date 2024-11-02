import { Loader2 } from "lucide-react";

export default function Loading() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
            <p className="text-lg font-medium text-gray-600">جاري تحميل  ..</p>
        </div>
      </div>
    );
  }
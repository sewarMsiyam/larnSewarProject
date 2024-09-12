const Skeleton = ({ className }: { className: string }) => (
  <div className={`bg-gray-300 animate-pulse ${className}`} />
);

export default function SkeletonCardcourses() {
  return (
   <div className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-lg">
                        <div className="h-60 relative overflow-hidden rounded-2xl mb-4">
                            <Skeleton className="h-full w-full" />

                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <Skeleton className="h-6 w-1/2 rounded-lg" />
                            <Skeleton className="h-6 w-12 rounded-lg" />
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <Skeleton className="h-7 w-full rounded-lg" />
                            <Skeleton className="h-7 w-full mx-10 rounded-lg" />
                            <Skeleton className="h-7 w-full rounded-lg" />
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <div className="flex gap-2 items-center">
                                <Skeleton className="w-10 h-10 rounded-full mr-2" />
                                <Skeleton className="h-6 w-32 rounded-lg" />
                            </div>
                            <Skeleton className="h-6 w-24 rounded-lg" />
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                            <Skeleton className="h-10 w-full rounded-lg" />
                            <Skeleton className="h-10 w-full rounded-lg" />
                        </div>
                    </div>
  );
};

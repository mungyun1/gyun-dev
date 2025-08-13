export default function PostPageSkeleton() {
  return (
    <main className="min-h-screen w-full max-w-4xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12">
      <nav className="flex items-center mb-8 sm:mb-12 w-full">
        <div className="flex items-center text-sm sm:text-base text-gray-600 animate-pulse">
          <div className="w-4 h-4 mr-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </nav>

      <article className="w-full">
        <header className="">
          <div className="mb-4 sm:mb-6 space-y-3">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
          </div>

          <div className="flex flex-wrap gap-y-2 items-center text-sm sm:text-base">
            <div className="flex items-center mr-6 animate-pulse">
              <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>
              <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="flex items-center mr-6 animate-pulse">
              <div className="w-12 h-4 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>
              <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="flex items-center animate-pulse">
              <div className="w-16 h-4 bg-gray-200 dark:bg-gray-700 rounded mr-2"></div>
              <div className="w-20 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </header>

        <div className="w-full">
          <div className="w-full max-w-none space-y-4">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5 animate-pulse"></div>
              </div>
            ))}

            <div className="my-6 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>

            {[...Array(4)].map((_, index) => (
              <div key={`extra-${index}`} className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <div className="mt-12">
        <div className="w-full border-t border-gray-200 dark:border-gray-800">
          <div className="py-8">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 mb-6 animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

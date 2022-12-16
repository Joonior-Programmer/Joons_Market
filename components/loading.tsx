export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex items-center justify-center">
        <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin"></div>
      </div>
      <p className="font-medium text-lg pt-4">
        This may take few seconds to load
      </p>
    </div>
  );
}

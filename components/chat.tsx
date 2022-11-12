interface chatProps {
  isOpponent?: boolean;
  content: string;
}

export default function Chat({ isOpponent = false, content }: chatProps) {
  return (
    <div>
      {!isOpponent ? (
        <div className="flex items-start space-x-2 py-2">
          <div className="rounded-full w-8 h-8 bg-orange-300" />
          <div className="w-1/2 overflow-auto text-sm overflow-initial text-gray-700 p-2 border border-gray-300 rounded-md">
            <p>{content}</p>
          </div>
        </div>
      ) : null}
      {isOpponent ? (
        <div className="my-2 flex flex-row-reverse items-end space-x-2 space-x-reverse">
          <div className="rounded-full w-8 h-8 bg-purple-300" />
          <div className="w-1/2 overflow-auto text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
            <p>{content}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
}

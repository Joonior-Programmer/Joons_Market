import { createClassName } from "@libs/utils";

interface ProfileProps {
  children: React.ReactNode;
  nickname?: string;
  fontType?: "normal" | "medium" | "semibold" | "bold" | "extrabold";
  textSize?:
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl";
  picSize?: number;
  picLocation?: "start" | "end" | "center";
}

export default function Profile({
  children,
  nickname,
  fontType = "medium",
  textSize = "sm",
  picSize = 12,
  picLocation = "center",
}: ProfileProps) {
  return (
    <div className={`flex py-3 items-${picLocation} space-x-3`}>
      <div className={`w-${picSize} h-${picSize} rounded-full bg-slate-300`} />
      <div>
        <p className={`text-${textSize} font-${fontType} text-gray-700`}>
          {nickname}
        </p>
        {children}
      </div>
    </div>
  );
}

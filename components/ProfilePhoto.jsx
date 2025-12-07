import Image from "next/image";

export default function ProfilePhoto({ size = 160, className = "" }) {
  const src = "/proflephoto/profile photo.png";
  // If className has width/height classes, use those; otherwise use inline style
  const hasSizeClasses =
    className.includes("w-[") ||
    (className.includes("w-") && className.includes("h-"));
  const styleProps = hasSizeClasses ? {} : { width: size, height: size };
  return (
    <div
      className={`relative overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm ${className}`}
      style={styleProps}
    >
      <Image
        src={src}
        alt="Portrait of Vikash"
        fill
        sizes="(max-width: 640px) 140px, (max-width: 768px) 160px, 180px"
        priority
        className="object-cover"
      />
    </div>
  );
}

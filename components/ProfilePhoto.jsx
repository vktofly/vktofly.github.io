import Image from 'next/image';

export default function ProfilePhoto({ size = 160, className = '' }) {
  const src = '/proflephoto/profile%20photo.jpg';
  return (
    <div className={`relative overflow-hidden rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm ${className}`} style={{ width: size, height: size }}>
      <Image
        src={src}
        alt="Portrait of Vikash"
        fill
        sizes={`${size}px`}
        priority
        className="object-cover"
      />
    </div>
  );
}



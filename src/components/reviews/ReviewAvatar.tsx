import Image from "next/image";

export function ReviewAvatar({
  author,
  avatar,
  size = 40,
}: {
  author: string;
  avatar?: string;
  size?: number;
}) {
  if (avatar) {
    return (
      <Image
        src={avatar}
        alt={author}
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover"
      />
    );
  }

  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-full bg-teal-100 font-semibold text-teal-700"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      aria-hidden
    >
      {author.trim().charAt(0).toUpperCase() || "?"}
    </div>
  );
}

export default function AnnouncementBar() {
  const message =
    "Free shipping on orders over $100 · Handcrafted in Sydney · Complimentary gift wrapping · New arrivals just landed";
  // Duplicate for seamless marquee loop
  const text = `${message} · ${message}`;

  return (
    <div
      className="bg-deepEspresso text-ivory text-xs tracking-widest py-2 overflow-hidden"
      aria-label="Site announcements"
    >
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="px-8 font-dm uppercase">{text}</span>
        <span className="px-8 font-dm uppercase" aria-hidden="true">
          {text}
        </span>
      </div>
    </div>
  );
}

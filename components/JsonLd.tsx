// Renders a JSON-LD structured data block. Server component — output lands in the
// server-rendered HTML so crawlers see it without executing JavaScript.
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

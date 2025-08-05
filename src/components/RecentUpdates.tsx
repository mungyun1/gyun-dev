import Link from "next/link";

interface RecentUpdate {
  title: string;
  slug: string;
}

interface RecentUpdatesProps {
  updates: RecentUpdate[];
}

export default function RecentUpdates({ updates }: RecentUpdatesProps) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold mb-4">Recently Updated</h2>
      <div className="space-y-4">
        {updates.map((update) => (
          <Link
            key={update.slug}
            href={`/posts/${update.slug}`}
            className="block hover:bg-gray-50 p-2 rounded"
          >
            <h3 className="text-sm font-semibold">{update.title}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function CategoryBadge({ category }) {
  const decoded = decodeURIComponent(category);

  return (
    <div className="inline-block text-gray-300 text-xs font-medium rounded-full mb-3">
      {decoded}
    </div>
  );
}
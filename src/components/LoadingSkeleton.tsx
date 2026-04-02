export function ExerciseCardSkeleton() {
  return (
    <div className="bg-devil-card rounded-xl border border-devil-dim p-4 space-y-3">
      <div className="flex gap-3">
        <div className="skeleton w-16 h-16 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-5 w-3/4" />
          <div className="skeleton h-3 w-1/2" />
        </div>
      </div>
      <div className="skeleton h-4 w-1/3" />
      <div className="flex gap-2">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton w-10 h-10 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

export function MealCardSkeleton() {
  return (
    <div className="bg-devil-card rounded-xl border border-devil-dim p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="skeleton w-10 h-10 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-5 w-2/3" />
          <div className="skeleton h-3 w-1/2" />
        </div>
      </div>
      <div className="flex gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="skeleton h-6 w-16 rounded-full" />
        ))}
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="px-4 pt-4 pb-24 space-y-6">
      <div className="skeleton h-8 w-48" />
      <div className="skeleton h-32 w-full rounded-xl" />
      <div className="skeleton h-48 w-full rounded-xl" />
      <div className="skeleton h-40 w-full rounded-xl" />
      <div className="skeleton h-32 w-full rounded-xl" />
    </div>
  );
}

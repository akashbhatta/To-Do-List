function StatsCard({ label, value, subLabel }) {
  return (
    <div className="surface-card p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{value}</p>
      {subLabel ? <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{subLabel}</p> : null}
    </div>
  )
}

export default StatsCard

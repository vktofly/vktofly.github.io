/**
 * Proficiency Indicator Component
 * 
 * Displays a visual indicator for skill proficiency levels.
 * Supports: 'expert', 'advanced', 'intermediate', 'beginner'
 */

export default function ProficiencyIndicator({ level, years, showLabel = true }) {
  if (!level) return null;

  const levels = {
    expert: { 
      label: 'Expert', 
      percentage: 100, 
      color: 'from-brand-500 to-brand-600',
      bgColor: 'bg-brand-500/10 dark:bg-brand-600/20',
      textColor: 'text-brand-600 dark:text-brand-400',
    },
    advanced: { 
      label: 'Advanced', 
      percentage: 75, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-500/10 dark:bg-blue-600/20',
      textColor: 'text-blue-600 dark:text-blue-400',
    },
    intermediate: { 
      label: 'Intermediate', 
      percentage: 50, 
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-500/10 dark:bg-amber-600/20',
      textColor: 'text-amber-600 dark:text-amber-400',
    },
    beginner: { 
      label: 'Beginner', 
      percentage: 25, 
      color: 'from-zinc-400 to-zinc-500',
      bgColor: 'bg-zinc-500/10 dark:bg-zinc-600/20',
      textColor: 'text-zinc-600 dark:text-zinc-400',
    },
  };

  const config = levels[level.toLowerCase()] || levels.intermediate;

  return (
    <div className="flex items-center gap-2">
      {showLabel && (
        <span className={`text-xs font-medium ${config.textColor}`}>
          {config.label}
        </span>
      )}
      <div className="flex-1 max-w-[100px]">
        <div className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <div
            className={`h-full rounded-full bg-gradient-to-r ${config.color} transition-all duration-500`}
            style={{ width: `${config.percentage}%` }}
          />
        </div>
      </div>
      {years && (
        <span className="text-xs text-palette-secondary dark:text-zinc-500">
          {years}+ {years === 1 ? 'year' : 'years'}
        </span>
      )}
    </div>
  );
}


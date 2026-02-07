import { motion } from 'framer-motion';
import { CheckCircle2, Clock, Circle } from 'lucide-react';
import { cn } from '../lib/utils';

const categoryColors = {
  language: {
    bg: 'bg-orange-900/30',
    border: 'border-orange-500',
    text: 'text-orange-400',
    dot: 'bg-orange-500'
  },
  culture: {
    bg: 'bg-amber-900/30',
    border: 'border-amber-500',
    text: 'text-amber-400',
    dot: 'bg-amber-500'
  },
  admin: {
    bg: 'bg-purple-900/30',
    border: 'border-purple-500',
    text: 'text-purple-400',
    dot: 'bg-purple-500'
  },
  milestone: {
    bg: 'bg-red-900/30',
    border: 'border-red-500',
    text: 'text-red-400',
    dot: 'bg-red-500'
  }
};

const statusIcons = {
  done: { icon: CheckCircle2, color: 'text-amber-400' },
  current: { icon: Clock, color: 'text-orange-500' },
  upcoming: { icon: Circle, color: 'text-gray-600' }
};

export default function Timeline({ weeks, currentWeek = 16 }) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-800" />

      <div className="space-y-6">
        {weeks.map((week, index) => {
          const status = week.week < currentWeek ? 'done' : week.week === currentWeek ? 'current' : 'upcoming';
          const StatusIcon = statusIcons[status].icon;
          const colors = categoryColors[week.bucket] || categoryColors.admin;

          return (
            <motion.div
              key={week.week}
              className="relative pl-12"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {/* Status indicator */}
              <div className="absolute left-0 w-8 h-8 flex items-center justify-center">
                <div className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center',
                  status === 'done' ? 'bg-amber-900/30' :
                  status === 'current' ? 'bg-orange-900/30' :
                  'bg-gray-800'
                )}>
                  <StatusIcon className={cn('w-5 h-5', statusIcons[status].color)} />
                </div>
              </div>

              {/* Content card */}
              <div className={cn(
                'rounded-xl p-4',
                'bg-gray-900/80',
                'backdrop-blur-sm',
                'border-l-4',
                colors.border,
                status === 'current' && 'ring-2 ring-orange-500/50'
              )}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn(
                    'px-2 py-0.5 text-xs font-semibold rounded-full uppercase',
                    colors.bg, colors.text
                  )}>
                    {week.bucket}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    Week {week.week}
                  </span>
                  {status === 'current' && (
                    <span className="px-2 py-0.5 text-xs font-semibold bg-orange-900/30 text-orange-400 rounded-full">
                      Current
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-white mb-2">
                  {week.label}
                </h3>

                {week.actions && week.actions.length > 0 && (
                  <ul className="space-y-1 mb-3">
                    {week.actions.map((action, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className={cn('w-1.5 h-1.5 rounded-full mt-1.5', colors.dot)} />
                        {action}
                      </li>
                    ))}
                  </ul>
                )}

                {week.deliverable && (
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-800">
                    <span className="text-xs font-medium text-gray-500">
                      Deliverable:
                    </span>
                    <span className="text-sm font-medium text-amber-400">
                      {week.deliverable}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

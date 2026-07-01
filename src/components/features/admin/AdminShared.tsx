'use client';

import type { ReactNode } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export function AdminNotice({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-lg border border-amber-500/30 bg-amber-50 px-4 py-3 text-sm text-amber-800 shadow-[0_8px_20px_rgba(245,158,11,0.12)] dark:bg-amber-950 dark:text-amber-200">
      {children}
    </div>
  );
}

export function NavButton({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={[
        'flex items-center gap-2 rounded-lg px-4 py-3 text-left text-sm transition-colors',
        active
          ? 'bg-[#121212] text-white dark:bg-white dark:text-black'
          : 'text-[#121212]/60 hover:bg-[#121212]/5 hover:text-[#121212] dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white',
      ].join(' ')}
      type="button"
      onClick={onClick}
    >
      {icon}
      {label}
    </button>
  );
}

export function Field({ children, label }: { children: ReactNode; label: string }) {
  return (
    <div className="grid gap-2">
      <span className="text-sm text-[#121212]/50 dark:text-white/50">
        {label}
      </span>
      {children}
    </div>
  );
}

export function EditableListHeader({
  label,
  onAdd,
}: {
  label: string;
  onAdd: () => void;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#121212]/10 pb-3 dark:border-white/10">
      <h2 className="text-lg font-medium">{label}</h2>
      <button
        className="inline-flex h-9 items-center gap-2 rounded bg-[#121212]/5 px-3 text-sm transition-colors hover:bg-[#121212]/10 dark:bg-white/10 dark:hover:bg-white/15"
        type="button"
        onClick={onAdd}
      >
        <Plus size={16} />
        ??
      </button>
    </div>
  );
}

export function IconButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className="flex size-10 items-center justify-center rounded border border-[#121212]/10 text-[#121212]/50 transition-colors hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-600 dark:border-white/10 dark:text-white/50 dark:hover:text-red-300"
      title={label}
      type="button"
      onClick={onClick}
    >
      <Trash2 size={16} />
    </button>
  );
}

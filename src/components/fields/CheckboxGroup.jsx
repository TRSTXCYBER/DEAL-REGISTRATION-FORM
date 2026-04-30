import FieldShell from './FieldShell'

export default function CheckboxGroup({ field, value, error, onChange }) {
  const selected = Array.isArray(value) ? value : []

  function toggle(opt) {
    const next = selected.includes(opt)
      ? selected.filter((v) => v !== opt)
      : [...selected, opt]
    onChange(field.id, next)
  }

  return (
    <FieldShell id={field.id} label={field.label} required={field.required} helper={field.helper} error={error}>
      {({ errorId, helperId }) => (
        <div
          role="group"
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={[helperId, errorId].filter(Boolean).join(' ') || undefined}
          className="grid grid-cols-1 gap-2 sm:grid-cols-2"
        >
          {field.options.map((opt) => {
            const checked = selected.includes(opt)
            const optId = `${field.id}-${opt.replace(/\s+/g, '-').toLowerCase()}`
            return (
              <label
                key={opt}
                htmlFor={optId}
                className={[
                  'cursor-pointer rounded-xl border px-4 py-3 text-sm transition-colors',
                  checked
                    ? 'border-[color:var(--color-accent)] bg-[color:var(--color-accent-soft)] text-[color:var(--color-text)]'
                    : 'border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-dim)] hover:text-[color:var(--color-text)] hover:border-[color:var(--color-border-strong)]',
                  error && !checked ? 'border-[color:var(--color-danger)]/60' : '',
                ].join(' ')}
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={[
                      'grid h-4 w-4 place-items-center rounded border',
                      checked
                        ? 'border-[color:var(--color-accent)] bg-[color:var(--color-accent)]'
                        : 'border-[color:var(--color-border-strong)]',
                    ].join(' ')}
                  >
                    {checked ? (
                      <svg viewBox="0 0 16 16" className="h-3 w-3 text-[color:var(--color-bg)]" fill="none" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l3.5 3.5L13 5" />
                      </svg>
                    ) : null}
                  </span>
                  <span className="font-medium text-[color:var(--color-text)]">{opt}</span>
                </span>
                <input
                  id={optId}
                  type="checkbox"
                  name={field.id}
                  value={opt}
                  checked={checked}
                  onChange={() => toggle(opt)}
                  className="sr-only"
                />
              </label>
            )
          })}
        </div>
      )}
    </FieldShell>
  )
}

import Button from './Button'

function displayValue(field, value) {
  if (field.type === 'checkbox') {
    if (!Array.isArray(value) || value.length === 0) {
      return <span className="text-[color:var(--color-text-mute)]">—</span>
    }
    return <span className="text-[color:var(--color-text)]">{value.join(', ')}</span>
  }
  if (!value || (field.type === 'select' && value === 'Please Select')) {
    return <span className="text-[color:var(--color-text-mute)]">—</span>
  }
  return <span className="text-[color:var(--color-text)]">{value}</span>
}

export default function Review({ sections, values, onBack, onEditSection, onSubmit, submitting }) {
  return (
    <div className="flex flex-col">
      <header className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Review your answers
        </h2>
        <p className="mt-2 text-sm text-[color:var(--color-text-dim)]">
          Please confirm everything looks right before submitting.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {sections.map((section, i) => (
          <section
            key={section.id}
            className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]/60 p-5"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[color:var(--color-text-dim)]">
                {section.title}
              </h3>
              <button
                type="button"
                onClick={() => onEditSection(i)}
                className="text-xs font-medium text-[color:var(--color-accent)] hover:underline"
              >
                Edit
              </button>
            </div>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {section.fields.map((f) => (
                <div key={f.id} className="min-w-0">
                  <dt className="text-xs text-[color:var(--color-text-mute)]">{f.label}</dt>
                  <dd className="mt-0.5 break-words text-sm">
                    {displayValue(f, values[f.id])}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button variant="secondary" onClick={onBack} className="sm:min-w-[120px]">
          Back
        </Button>
        <Button onClick={onSubmit} disabled={submitting} className="sm:min-w-[160px]">
          {submitting ? 'Submitting…' : 'Submit'}
        </Button>
      </div>
    </div>
  )
}

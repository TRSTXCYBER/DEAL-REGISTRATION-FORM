import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sections, initialFormValues, validateSection } from './data/formConfig'
import Landing from './components/Landing'
import Progress from './components/Progress'
import FormSection from './components/FormSection'
import Review from './components/Review'
import Confirmation from './components/Confirmation'

// Placeholder submit handler. Swap in Supabase / GoHighLevel / webhook later.
async function submitDealRegistration(payload) {
  // eslint-disable-next-line no-console
  console.log('[DealRegistration] submit payload:', payload)
  await new Promise((r) => setTimeout(r, 700))
  return { ok: true }
}

// Screen identifiers: 'landing' | number (section index) | 'review' | 'confirm'
const screenVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

export default function App() {
  const [screen, setScreen] = useState('landing')
  const [values, setValues] = useState(initialFormValues)
  const [errorsBySection, setErrorsBySection] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const totalSections = sections.length

  const currentSectionIndex = typeof screen === 'number' ? screen : 0
  const inSection = typeof screen === 'number'
  const currentSection = inSection ? sections[currentSectionIndex] : null
  const currentErrors = inSection
    ? errorsBySection[currentSection.id] || {}
    : {}

  const showProgress = inSection || screen === 'review'
  const progressIndex = screen === 'review' ? totalSections - 1 : currentSectionIndex

  function handleChange(id, value) {
    setValues((prev) => ({ ...prev, [id]: value }))
    // Clear that specific field's error once the user edits it.
    if (inSection) {
      const sid = currentSection.id
      setErrorsBySection((prev) => {
        const sectionErrors = { ...(prev[sid] || {}) }
        if (sectionErrors[id]) {
          delete sectionErrors[id]
          return { ...prev, [sid]: sectionErrors }
        }
        return prev
      })
    }
  }

  function handleStart() {
    setScreen(0)
  }

  function handleBack() {
    if (screen === 'review') {
      setScreen(totalSections - 1)
      return
    }
    if (inSection) {
      if (currentSectionIndex === 0) {
        setScreen('landing')
      } else {
        setScreen(currentSectionIndex - 1)
      }
    }
  }

  function handleNext() {
    if (!inSection) return
    const errors = validateSection(currentSection, values)
    if (Object.keys(errors).length > 0) {
      setErrorsBySection((prev) => ({ ...prev, [currentSection.id]: errors }))
      // Scroll to the top of the section card on error for visibility.
      requestAnimationFrame(() => {
        document
          .getElementById('form-card')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }
    setErrorsBySection((prev) => ({ ...prev, [currentSection.id]: {} }))
    if (currentSectionIndex + 1 < totalSections) {
      setScreen(currentSectionIndex + 1)
    } else {
      setScreen('review')
    }
  }

  function handleEditSection(index) {
    setScreen(index)
  }

  async function handleSubmit() {
    // Re-validate everything defensively.
    const allErrors = {}
    for (const s of sections) {
      const e = validateSection(s, values)
      if (Object.keys(e).length > 0) allErrors[s.id] = e
    }
    if (Object.keys(allErrors).length > 0) {
      setErrorsBySection(allErrors)
      const firstBad = sections.findIndex((s) => allErrors[s.id])
      if (firstBad >= 0) setScreen(firstBad)
      return
    }
    setSubmitting(true)
    try {
      await submitDealRegistration(values)
      setScreen('confirm')
    } finally {
      setSubmitting(false)
    }
  }

  function handleStartOver() {
    setValues(initialFormValues)
    setErrorsBySection({})
    setScreen('landing')
  }

  const screenKey = useMemo(() => {
    if (screen === 'landing') return 'landing'
    if (screen === 'review') return 'review'
    if (screen === 'confirm') return 'confirm'
    return `section-${screen}`
  }, [screen])

  return (
    <div className="min-h-full w-full">
      {/* Small refresh button in the top corner to return to the landing screen */}
      {screen !== 'landing' && screen !== 'confirm' ? (
        <div className="mx-auto w-full max-w-2xl px-4 pt-5 sm:px-6 sm:pt-6">
          <button
            type="button"
            onClick={handleStartOver}
            aria-label="Start over"
            title="Start over"
            className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text-dim)] transition-colors hover:text-[color:var(--color-text)] hover:border-[color:var(--color-border-strong)]"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v6h6" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 20v-6h-6" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.5 14a7 7 0 0 0 12.9 2M18.5 10A7 7 0 0 0 5.6 8" />
            </svg>
          </button>
        </div>
      ) : null}

      <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
        {showProgress ? (
          <div className="mb-6">
            <Progress sections={sections} currentIndex={progressIndex} />
          </div>
        ) : null}

        <AnimatePresence mode="wait">
          <motion.div
            key={screenKey}
            id="form-card"
            variants={screenVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className={
              screen === 'landing' || screen === 'confirm'
                ? ''
                : 'rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elev)]/70 p-5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] sm:p-8'
            }
          >
            {screen === 'landing' ? (
              <Landing onStart={handleStart} />
            ) : screen === 'review' ? (
              <Review
                sections={sections}
                values={values}
                onBack={handleBack}
                onEditSection={handleEditSection}
                onSubmit={handleSubmit}
                submitting={submitting}
              />
            ) : screen === 'confirm' ? (
              <Confirmation onStartOver={handleStartOver} />
            ) : (
              <FormSection
                section={currentSection}
                values={values}
                errors={currentErrors}
                onChange={handleChange}
                onBack={handleBack}
                onNext={handleNext}
                isFirst={currentSectionIndex === 0}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <footer className="mt-6 text-center text-xs text-[color:var(--color-text-mute)]">
          © {new Date().getFullYear()} Deal Registration
        </footer>
      </main>
    </div>
  )
}

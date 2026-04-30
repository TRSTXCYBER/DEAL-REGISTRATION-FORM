import { motion } from 'framer-motion'
import Button from './Button'

export default function Confirmation({ onStartOver }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mx-auto flex w-full max-w-lg flex-col items-center text-center"
    >
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 220, damping: 18 }}
        className="mb-6 grid h-16 w-16 place-items-center rounded-full bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)]"
      >
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12l4 4 10-10" />
        </svg>
      </motion.div>

      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Thank you</h1>
      <p className="mt-3 text-[15px] text-[color:var(--color-text-dim)]">
        Your deal registration has been submitted.
      </p>

      <div className="mt-8">
        <Button variant="secondary" onClick={onStartOver}>
          Start Over
        </Button>
      </div>
    </motion.div>
  )
}

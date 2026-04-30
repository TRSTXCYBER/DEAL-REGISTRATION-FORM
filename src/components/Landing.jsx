import { motion } from 'framer-motion'
import Button from './Button'
import Logo from './Logo'

export default function Landing({ onStart }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mx-auto flex w-full flex-col items-center rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-bg-elev)] px-6 py-10 text-center sm:px-10 sm:py-12"
    >
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05, ease: 'easeOut' }}
        className="mb-7 flex items-center justify-center"
      >
        <Logo
          src="/homepage-logo.png"
          className="h-16 max-w-[240px] sm:h-20 sm:max-w-[300px]"
        />
      </motion.div>

      <h1 className="text-3xl font-bold tracking-tight text-[color:var(--color-text)] sm:text-4xl">
        Deal Registration Form
      </h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-[color:var(--color-text-dim)] sm:text-[15px]">
        Share a few quick details about the deal, company, and contact so we
        can register and route this opportunity properly.
      </p>

      <div className="mt-7">
        <Button onClick={onStart} className="min-w-[200px]">
          Start Form
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 5l6 5-6 5" />
          </svg>
        </Button>
      </div>

      <div className="mt-6 flex items-center gap-3 text-[11px] text-[color:var(--color-text-mute)]">
        <span className="h-px w-8 bg-[color:var(--color-border)]" />
        <span className="uppercase tracking-[0.18em]">Takes about 2 minutes</span>
        <span className="h-px w-8 bg-[color:var(--color-border)]" />
      </div>
    </motion.div>
  )
}

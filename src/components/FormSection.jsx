import { motion } from 'framer-motion'
import TextField from './fields/TextField'
import PhoneField from './fields/PhoneField'
import SelectField from './fields/SelectField'
import RadioGroup from './fields/RadioGroup'
import CheckboxGroup from './fields/CheckboxGroup'
import TextArea from './fields/TextArea'
import Button from './Button'

const fieldContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
}

const fieldItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
}

function renderField(field, values, errors, onChange) {
  const common = {
    field,
    value: values[field.id] ?? '',
    error: errors[field.id],
    onChange,
  }
  switch (field.type) {
    case 'phone':
      return <PhoneField {...common} />
    case 'select':
      return <SelectField {...common} />
    case 'radio':
      return <RadioGroup {...common} />
    case 'checkbox':
      return <CheckboxGroup {...common} value={values[field.id] ?? []} />
    case 'textarea':
      return <TextArea {...common} />
    case 'url':
    case 'text':
    default:
      return <TextField {...common} />
  }
}

export default function FormSection({
  section,
  values,
  errors,
  onChange,
  onBack,
  onNext,
  isFirst,
}) {
  return (
    <div className="flex flex-col">
      <header className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-[color:var(--color-text)] sm:text-3xl">
          {section.title}
        </h2>
        <p className="mt-2 text-sm text-[color:var(--color-text-dim)]">
          {section.description}
        </p>
      </header>

      <motion.div
        variants={fieldContainer}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-5"
      >
        {section.fields.map((field) => (
          <motion.div key={field.id} variants={fieldItem}>
            {renderField(field, values, errors, onChange)}
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          variant="secondary"
          onClick={onBack}
          className="sm:min-w-[120px]"
        >
          {isFirst ? 'Cancel' : 'Back'}
        </Button>
        <Button onClick={onNext} className="sm:min-w-[140px]">
          Next
          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 5l6 5-6 5" />
          </svg>
        </Button>
      </div>
    </div>
  )
}

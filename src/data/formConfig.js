// Central form configuration. Each section has an id, title, description and fields.
// Field shape: { id, label, type, required, options?, placeholder?, helper? }

export const sections = [
  {
    id: 'contact',
    title: 'Contact Information',
    description: 'Tell us who we should reach out to for the discovery call.',
    fields: [
      { id: 'first_name', label: 'First Name', type: 'text', required: true, placeholder: 'Jane' },
      { id: 'last_name', label: 'Last Name', type: 'text', required: true, placeholder: 'Doe' },
      { id: 'business_name', label: 'Business Name', type: 'text', required: true, placeholder: 'Acme Holdings LLC' },
      { id: 'phone', label: 'Phone', type: 'phone', required: true, placeholder: '(555) 123-4567' },
    ],
  },
  {
    id: 'company',
    title: 'Company Snapshot',
    description: 'A quick profile of the organization.',
    fields: [
      {
        id: 'employee_count',
        label: 'Number of Employees',
        type: 'select',
        required: true,
        options: ['Please Select', '1 to 10', '11 to 25', '26 to 50', '50+'],
      },
      {
        id: 'industry',
        label: 'Industry',
        type: 'select',
        required: true,
        options: [
          'Please Select',
          'Accounting',
          'Construction',
          'Consulting',
          'Education',
          'Finance',
          'Healthcare',
          'Legal',
          'Manufacturing',
          'Nonprofit',
          'Real Estate',
          'Retail',
          'Technology',
          'Other',
        ],
      },
      {
        id: 'company_website',
        label: 'Company Website',
        type: 'url',
        required: false,
        placeholder: 'https://example.com',
      },
    ],
  },
  {
    id: 'it',
    title: 'IT Setup',
    description: 'How is technology supported today?',
    fields: [
      {
        id: 'current_it_support',
        label: 'Current IT Support',
        type: 'radio',
        required: true,
        options: ['In House IT', 'MSP', 'No IT Support'],
      },
    ],
  },
  {
    id: 'qualification',
    title: 'Qualification',
    description: 'Help us understand your decision process and timing.',
    fields: [
      {
        id: 'it_decision_maker',
        label: 'Are you involved in IT decision making?',
        type: 'radio',
        required: true,
        options: ['Yes', 'No'],
      },
      {
        id: 'timeline',
        label: 'Timeline',
        type: 'select',
        required: true,
        options: ['Please Select', 'ASAP', '1 to 3 months', '3 to 6 months', 'N/A'],
      },
    ],
  },
  {
    id: 'cyber',
    title: 'Cyber / Risk Snapshot',
    description: 'A quick look at your current protection posture.',
    fields: [
      {
        id: 'has_edr_mdr',
        label: 'Do you currently have cybersecurity protection?',
        helper: 'EDR/MDR',
        type: 'radio',
        required: true,
        options: ['Yes', 'No', 'Not Sure'],
      },
      {
        id: 'has_cyber_insurance',
        label: 'Do you have cyber insurance?',
        type: 'radio',
        required: true,
        options: ['Yes', 'No', 'Not Sure'],
      },
    ],
  },
  {
    id: 'intent',
    title: 'Intent / Plan',
    description: 'Share the main technology concern we can address on the call.',
    fields: [
      {
        id: 'technology_concern',
        label: 'What is the biggest concern involving technology in your organization today?',
        type: 'textarea',
        required: false,
        placeholder: 'Briefly describe the main issue, concern, or goal.',
      },
    ],
  },
]

export const initialFormValues = sections
  .flatMap((s) => s.fields)
  .reduce((acc, f) => {
    acc[f.id] = ''
    return acc
  }, {})

// Basic, non-strict URL validation for the optional website field.
export function isValidWebsite(value) {
  if (!value) return true
  const trimmed = value.trim()
  // Accept with or without protocol.
  const re = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2}[a-z]*(\/[^\s]*)?$/i
  return re.test(trimmed)
}

export function validateSection(section, values) {
  const errors = {}
  for (const field of section.fields) {
    const raw = values[field.id]
    const val = typeof raw === 'string' ? raw.trim() : raw

    if (field.required) {
      if (!val) {
        errors[field.id] = 'This field is required.'
        continue
      }
      if (field.type === 'select' && val === 'Please Select') {
        errors[field.id] = 'Please select an option.'
        continue
      }
    }

    if (field.id === 'company_website' && val && !isValidWebsite(val)) {
      errors[field.id] = 'Please enter a valid website (e.g. example.com).'
    }
  }
  return errors
}

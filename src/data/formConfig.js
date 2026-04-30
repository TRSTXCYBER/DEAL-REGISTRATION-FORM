// Central form configuration. Each section has an id, title, description and fields.
// Field shape: { id, label, type, required, options?, placeholder?, helper? }

export const sections = [
  {
    id: 'deal_company',
    title: 'Deal / Company Info',
    description: 'Basic information about the company this deal is for.',
    fields: [
      { id: 'company_name', label: 'Company Name', type: 'text', required: true, placeholder: 'Acme Holdings LLC' },
      { id: 'company_website', label: 'Website', type: 'url', required: false, placeholder: 'https://example.com' },
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
        id: 'employee_count',
        label: 'Number of Employees',
        type: 'select',
        required: true,
        options: ['Please Select', '1 to 10', '11 to 25', '26 to 50', '50+'],
      },
      {
        id: 'device_count',
        label: 'Device Count',
        type: 'select',
        required: true,
        options: ['Please Select', '1 to 25', '26 to 50', '51 to 100', '101 to 250', '250+'],
      },
    ],
  },
  {
    id: 'contact',
    title: 'Contact Info',
    description: 'Primary contact at the prospect company.',
    fields: [
      { id: 'first_name', label: 'First Name', type: 'text', required: true, placeholder: 'Jane' },
      { id: 'last_name', label: 'Last Name', type: 'text', required: true, placeholder: 'Doe' },
      { id: 'title', label: 'Title', type: 'text', required: true, placeholder: 'IT Director' },
      { id: 'email', label: 'Email', type: 'text', required: true, placeholder: 'jane@example.com' },
      { id: 'phone', label: 'Phone Number', type: 'phone', required: true, placeholder: '(555) 123-4567' },
    ],
  },
  {
    id: 'ownership',
    title: 'Deal Ownership',
    description: 'Who is registering this deal.',
    fields: [
      { id: 'submitted_by_email', label: 'Submitted By (Your Email)', type: 'text', required: true, placeholder: 'you@example.com' },
      { id: 'partner_name', label: 'Company / Partner Name', type: 'text', required: true, placeholder: 'Partner Co.' },
      { id: 'assigned_sales_rep', label: 'Assigned Sales Rep', type: 'text', required: true, placeholder: 'Rep name' },
    ],
  },
  {
    id: 'qualification',
    title: 'Deal Qualification',
    description: 'Tell us about the opportunity.',
    fields: [
      {
        id: 'services_interested',
        label: 'Services Interested In',
        type: 'checkbox',
        required: true,
        options: ['Managed IT', 'Cybersecurity', 'Compliance', 'Backup/DR', 'Other'],
      },
      {
        id: 'current_it_setup',
        label: 'Current IT Setup',
        type: 'radio',
        required: true,
        options: ['In House IT', 'MSP', 'No IT Support'],
      },
      {
        id: 'current_pain_points',
        label: 'Current Pain Points',
        type: 'textarea',
        required: true,
        placeholder: 'Briefly describe the main pain points or challenges.',
      },
      {
        id: 'timeline',
        label: 'Timeline',
        type: 'select',
        required: true,
        options: ['Please Select', 'ASAP', '1 to 3 months', '3 to 6 months', 'N/A'],
      },
      {
        id: 'estimated_deal_size',
        label: 'Estimated Deal Size',
        type: 'select',
        required: true,
        options: ['Please Select', '< $10k', '$10k - $50k', '$50k - $100k', '$100k+'],
      },
    ],
  },
  {
    id: 'cyber',
    title: 'Cyber Snapshot',
    description: 'A quick look at current cyber posture.',
    fields: [
      {
        id: 'has_edr_mdr',
        label: 'Has EDR/MDR',
        type: 'radio',
        required: true,
        options: ['Yes', 'No', 'Not Sure'],
      },
      {
        id: 'has_cyber_insurance',
        label: 'Has Cyber Insurance',
        type: 'radio',
        required: true,
        options: ['Yes', 'No', 'Not Sure'],
      },
    ],
  },
  {
    id: 'lead_handling',
    title: 'Lead Handling Logic',
    description: 'Help us route this lead correctly.',
    fields: [
      {
        id: 'is_new_lead',
        label: 'Is this a new lead?',
        type: 'radio',
        required: true,
        options: ['Yes', 'No'],
      },
      {
        id: 'current_lead_owner',
        label: 'Who currently owns this lead?',
        type: 'text',
        required: true,
        placeholder: 'Owner name',
      },
      {
        id: 'reassignment_requested',
        label: 'Is reassignment requested / necessary?',
        type: 'radio',
        required: true,
        options: ['Yes', 'No'],
      },
    ],
  },
  {
    id: 'notes',
    title: 'Notes',
    description: 'Anything else we should know.',
    fields: [
      {
        id: 'additional_comments',
        label: 'Additional Comments',
        type: 'textarea',
        required: false,
        placeholder: 'Add any additional context here.',
      },
    ],
  },
]

export const initialFormValues = sections
  .flatMap((s) => s.fields)
  .reduce((acc, f) => {
    acc[f.id] = f.type === 'checkbox' ? [] : ''
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

export function isValidEmail(value) {
  if (!value) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function validateSection(section, values) {
  const errors = {}
  for (const field of section.fields) {
    const raw = values[field.id]
    const val = typeof raw === 'string' ? raw.trim() : raw

    if (field.required) {
      if (field.type === 'checkbox') {
        if (!Array.isArray(val) || val.length === 0) {
          errors[field.id] = 'Please select at least one option.'
          continue
        }
      } else if (!val) {
        errors[field.id] = 'This field is required.'
        continue
      } else if (field.type === 'select' && val === 'Please Select') {
        errors[field.id] = 'Please select an option.'
        continue
      }
    }

    if (field.id === 'company_website' && val && !isValidWebsite(val)) {
      errors[field.id] = 'Please enter a valid website (e.g. example.com).'
    }
    if ((field.id === 'email' || field.id === 'submitted_by_email') && val && !isValidEmail(val)) {
      errors[field.id] = 'Please enter a valid email address.'
    }
  }
  return errors
}

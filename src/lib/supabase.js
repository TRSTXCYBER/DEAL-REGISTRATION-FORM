import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

if (!url || !key) {
  // eslint-disable-next-line no-console
  console.warn(
    '[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY. Insert will fail.'
  )
}

export const supabase = createClient(url ?? '', key ?? '')

const TABLE = 'deal_registrations'

// Map the form's field ids to the DB column names defined in the schema.
// Form fields not present here are intentionally dropped (no matching column).
function mapFormToRow(values) {
  const services = Array.isArray(values.services_interested)
    ? values.services_interested
    : []
  return {
    business_name: values.company_name || null,
    company_website: values.company_website || null,
    industry: values.industry || null,
    employee_count: values.employee_count || null,
    device_count: values.device_count || null,
    first_name: values.first_name || null,
    last_name: values.last_name || null,
    title: values.title || null,
    email: values.email || null,
    phone: values.phone || null,
    submitted_by_email: values.submitted_by_email || null,
    partner_name: values.partner_name || null,
    assigned_sales_rep: values.assigned_sales_rep || null,
    services_interested: services.length > 0 ? services : null,
    current_it_support: values.current_it_setup || null,
    current_pain_points: values.current_pain_points || null,
    timeline: values.timeline || null,
    estimated_deal_size: values.estimated_deal_size || null,
    has_edr_mdr: values.has_edr_mdr || null,
    has_cyber_insurance: values.has_cyber_insurance || null,
    is_new_lead: values.is_new_lead || null,
    current_lead_owner: values.current_lead_owner || null,
    reassignment_requested: values.reassignment_requested || null,
    additional_comments: values.additional_comments || null,
  }
}

// Pure insert (no .select() chain) so we don't need a SELECT RLS policy.
export async function insertDealRegistration(values) {
  const row = mapFormToRow(values)
  const { error } = await supabase.from(TABLE).insert(row)
  if (error) {
    // eslint-disable-next-line no-console
    console.error('[supabase] insert error:', error)
    throw error
  }
  return { ok: true }
}

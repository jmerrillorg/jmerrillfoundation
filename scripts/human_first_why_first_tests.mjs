import assert from 'node:assert/strict'

const POLICY_ID = 'JM1-HUMAN-FIRST-WHY-FIRST-v1'
const BRAND = {
  code: 'JMFN',
  name: 'J Merrill Foundation',
  from: 'foundation@jmerrill.one',
  domainTerms: ['donation', 'program', 'application', 'volunteer', 'event', 'grant', 'Story Hour', 'Reading Station'],
}

const internal = [
  /\bDataverse\b/i,
  /\bworkflow\b/i,
  /\bsystem attention\b/i,
  /\bcorrelation(?: id)?\b/i,
  /\bartifact(?:Id)?\b/i,
  /\bchecksum\b/i,
  /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i,
]

function evaluate(input) {
  const text = String(input.content || '').replace(/\s+/g, ' ').trim()
  const violations = []
  const warnings = []
  if (!text) violations.push('CONTENT_MISSING')
  if (!input.relationshipType) violations.push('RELATIONSHIP_CONTEXT_MISSING')
  if (!input.whyContext) violations.push('WHY_CONTEXT_MISSING')
  if (!input.requestedAction) warnings.push('REQUESTED_ACTION_NOT_EXPLICIT')
  if (input.sender && input.sender !== BRAND.from) violations.push('WRONG_BRAND_SENDER')
  if (/\{\{[^}]+\}|\[[A-Z_]+]/.test(text)) violations.push('RAW_PLACEHOLDER_EXPOSED')
  if ((text.match(/J Merrill Foundation/g) || []).length > 2) violations.push('DUPLICATE_SIGNATURE_BLOCKED')
  for (const pattern of internal) if (pattern.test(text.replace(/https?:\/\/\S+/g, '[link]'))) violations.push('INTERNAL_LANGUAGE_LEAK')
  if (input.communicationType === 'FUNDRAISING' && input.marketingConsent !== true) return result('HUMAN_REVIEW_REQUIRED', violations, ['FUNDRAISING_CONSENT_REQUIRED'])
  if (violations.length) return result('DENY', violations, warnings)
  if (warnings.length) return result('ALLOW_WITH_WARNING', [], warnings)
  return result('ALLOW', [], [])
}

function result(decision, violations, warnings) {
  return { policyId: POLICY_ID, brandProfile: BRAND.code, decision, violations, warnings }
}

const tests = [
  ['donation acknowledgment', evaluate({
    sender: BRAND.from,
    relationshipType: 'DONOR',
    communicationType: 'DONATION_ACKNOWLEDGMENT',
    whyContext: 'Donation received',
    requestedAction: 'No action is required.',
    content: 'Good day, Maya. Thank you for your donation to J Merrill Foundation. Your gift helps support literacy access and community programs. No action is required today.',
  }).decision === 'ALLOW'],
  ['application received', evaluate({
    sender: BRAND.from,
    relationshipType: 'APPLICANT',
    communicationType: 'APPLICATION_STATUS',
    whyContext: 'Volunteer interest received',
    requestedAction: 'Watch for a follow-up from the Foundation team.',
    content: 'Good day, Maya. We received your volunteer interest form. J Merrill Foundation will review it and follow up with the next practical step.',
  }).decision === 'ALLOW'],
  ['service message without marketing consent', evaluate({
    sender: BRAND.from,
    relationshipType: 'VOLUNTEER',
    communicationType: 'SERVICE',
    marketingConsent: false,
    whyContext: 'Volunteer reminder',
    requestedAction: 'Please confirm whether you can attend.',
    content: 'Good day, Maya. This is a reminder for your Story Hour volunteer time this Saturday. Please reply if your availability changed.',
  }).decision === 'ALLOW'],
  ['fundraising without consent requires review', evaluate({
    sender: BRAND.from,
    relationshipType: 'DONOR',
    communicationType: 'FUNDRAISING',
    marketingConsent: false,
    whyContext: 'Campaign outreach',
    requestedAction: 'Consider making a gift.',
    content: 'Good day, Maya. Please consider making another donation to support our literacy programs.',
  }).decision === 'HUMAN_REVIEW_REQUIRED'],
  ['wrong donor identity denied', evaluate({
    sender: BRAND.from,
    relationshipType: '',
    communicationType: 'DONATION_ACKNOWLEDGMENT',
    whyContext: 'Donation received',
    requestedAction: 'No action is required.',
    content: 'Good day, donor.',
  }).decision === 'DENY'],
  ['raw system language denied', evaluate({
    sender: BRAND.from,
    relationshipType: 'VOLUNTEER',
    communicationType: 'SERVICE',
    whyContext: 'Volunteer reminder',
    requestedAction: 'Please reply.',
    content: 'Dataverse row 11111111-1111-4111-8111-111111111111 is in system attention.',
  }).decision === 'DENY'],
]

for (const [name, pass] of tests) assert.equal(pass, true, name)
console.log(JSON.stringify({ policy: POLICY_ID, brand: BRAND.code, tests: Object.fromEntries(tests), result: 'PASS' }, null, 2))

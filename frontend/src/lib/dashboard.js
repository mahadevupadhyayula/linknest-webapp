const MOCK_TARGETS = [
  {
    id: 'acme-health',
    name: 'Acme Health',
    title: 'Director of Partnerships',
    company: 'Acme Health',
    stage: 'Hot',
    lastEngagement: '2026-03-30',
    fit: 'Strong ICP match; evaluating AI outreach tools.',
    timeline: [
      { id: 't1', date: '2026-03-22', event: 'Accepted LinkedIn connection request' },
      { id: 't2', date: '2026-03-25', event: 'Opened intro email and clicked case study' },
      { id: 't3', date: '2026-03-30', event: 'Replied asking for implementation details' },
    ],
    aiSuggestion:
      'Send a concise implementation checklist with a 2-week pilot offer to keep momentum while procurement reviews.',
  },
  {
    id: 'northstar-labs',
    name: 'Northstar Labs',
    title: 'Growth Lead',
    company: 'Northstar Labs',
    stage: 'Warm',
    lastEngagement: '2026-03-28',
    fit: 'Mid-market SaaS; active on product-led growth channels.',
    timeline: [
      { id: 't1', date: '2026-03-19', event: 'Commented on your LinkedIn post' },
      { id: 't2', date: '2026-03-24', event: 'Attended webinar (38 mins watched)' },
      { id: 't3', date: '2026-03-28', event: 'Downloaded outbound playbook' },
    ],
    aiSuggestion:
      'Share a personalized teardown of their onboarding flow and suggest one measurable activation experiment.',
  },
  {
    id: 'summit-ventures',
    name: 'Summit Ventures',
    title: 'Principal',
    company: 'Summit Ventures',
    stage: 'Cold',
    lastEngagement: '2026-03-11',
    fit: 'Potential channel partner; limited prior touchpoints.',
    timeline: [
      { id: 't1', date: '2026-02-27', event: 'Added to strategic partner watchlist' },
      { id: 't2', date: '2026-03-05', event: 'Visited pricing page twice' },
      { id: 't3', date: '2026-03-11', event: 'No response to intro note' },
    ],
    aiSuggestion:
      'Restart with a value-first message tied to a recent portfolio announcement and one low-friction next step.',
  },
];

const PRIORITY_ACTIONS = [
  { id: 'a1', action: 'Follow up with Acme Health on pilot timeline', due: 'Today', targetId: 'acme-health' },
  { id: 'a2', action: 'Send teardown draft to Northstar Labs', due: 'Tomorrow', targetId: 'northstar-labs' },
  { id: 'a3', action: 'Create re-engagement note for Summit Ventures', due: 'This week', targetId: 'summit-ventures' },
];

const NEW_SUGGESTIONS = [
  { id: 's1', name: 'Beacon Metrics', reason: 'Recently expanded RevOps team', stage: 'Warm' },
  { id: 's2', name: 'Atlas Bio', reason: 'Opened 3 outreach emails this week', stage: 'Hot' },
  { id: 's3', name: 'Crestline AI', reason: 'Hiring for sales enablement', stage: 'Cold' },
];

const DRAFTS = [
  { id: 'd1', title: 'Pilot proposal follow-up', targetId: 'acme-health' },
  { id: 'd2', title: 'Webinar recap with tailored CTA', targetId: 'northstar-labs' },
  { id: 'd3', title: 'Channel partnership opener', targetId: 'summit-ventures' },
];

function wait(ms = 180) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchDashboardData() {
  await wait();

  const pipeline = {
    hot: MOCK_TARGETS.filter((target) => target.stage === 'Hot'),
    warm: MOCK_TARGETS.filter((target) => target.stage === 'Warm'),
    cold: MOCK_TARGETS.filter((target) => target.stage === 'Cold'),
  };

  return {
    priorityActions: PRIORITY_ACTIONS,
    pipeline,
    newTargetSuggestions: NEW_SUGGESTIONS,
    suggestedDrafts: DRAFTS,
    targets: MOCK_TARGETS,
  };
}

export async function fetchTargetById(id) {
  await wait();
  const target = MOCK_TARGETS.find((item) => item.id === id);

  if (!target) {
    throw new Error('Target not found');
  }

  return target;
}

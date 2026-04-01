function tokenize(text = '') {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
}

function unique(arr) {
  return [...new Set(arr)];
}

function draftSmartContent({ context_type: contextType, content, user_goal: userGoal, constraints = [] }) {
  const constraintText = constraints.length ? ` Constraints: ${constraints.join('; ')}.` : '';

  const mainDraft = `[${contextType}] ${content}\n\nGoal alignment: ${userGoal}.${constraintText}`;
  const alternatives = [
    `Direct version: ${content} — focused on ${userGoal}.`,
    `Story version: A short anecdote connected to ${userGoal}, then CTA tied to ${contextType}.`,
  ];

  return {
    main_draft: mainDraft,
    alternatives,
  };
}

function analyzeProfile({ profile_text: profileText = '', user_goal: userGoal = '' }) {
  const profileTokens = unique(tokenize(profileText));
  const goalTokens = unique(tokenize(userGoal));

  if (!goalTokens.length) {
    return { relevance_score: 0, rationale: 'No user goal provided.' };
  }

  const overlap = goalTokens.filter((token) => profileTokens.includes(token));
  const rawScore = Math.round((overlap.length / goalTokens.length) * 100);

  return {
    relevance_score: Math.max(0, Math.min(100, rawScore)),
    overlap_keywords: overlap,
    missing_keywords: goalTokens.filter((token) => !overlap.includes(token)),
    rationale: overlap.length
      ? 'Profile includes language aligned with user goal keywords.'
      : 'Profile has little lexical overlap with goal keywords.',
  };
}

function generateEngagementSuggestions({ target_name: targetName, context = '', user_goal: userGoal = '' }) {
  return {
    suggestions: [
      `Send a concise opener to ${targetName} linking a recent update to your goal: ${userGoal}.`,
      `Share a value-first resource related to: ${context || userGoal}.`,
      `Close with a specific next step and two scheduling options.`,
    ],
  };
}

function generateNextActionDrafts(targets = []) {
  return targets.map((target) => ({
    targetId: target._id,
    draft: `Hi ${target.name}, quick thought on ${target.company || 'your team'}: I'd love to explore a concrete collaboration around your current priorities.`,
    channel: 'linkedin',
  }));
}

module.exports = {
  draftSmartContent,
  analyzeProfile,
  generateEngagementSuggestions,
  generateNextActionDrafts,
};

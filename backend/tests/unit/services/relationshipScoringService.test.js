const {
  computeRelationshipScore,
  toCategory,
} = require('../../../services/relationshipScoringService');

describe('relationshipScoringService', () => {
  test('computeRelationshipScore returns 0 for no logs', () => {
    expect(computeRelationshipScore([])).toBe(0);
  });

  test('computeRelationshipScore weights interactions and sentiment', () => {
    const score = computeRelationshipScore([
      { interaction_type: 'meeting', sentiment: 'positive' },
      { interaction_type: 'call', sentiment: 'neutral' },
      { interaction_type: 'like', sentiment: 'negative' },
    ]);

    expect(score).toBeGreaterThan(0);
    expect(score).toBeLessThanOrEqual(100);
  });

  test('toCategory maps score tiers', () => {
    expect(toCategory(80)).toBe('Hot');
    expect(toCategory(50)).toBe('Warm');
    expect(toCategory(20)).toBe('Cold');
  });
});

import { describe, expect, it } from 'vitest';
import { parseListQuery } from '../common/utils/filter-parser.js';

describe('parseListQuery', () => {
  it('parses common params', () => {
    const q = parseListQuery(
      {
        page: '2',
        limit: '30',
        sort: 'nome',
        order: 'desc',
        q: 'abc',
        'filter[nome][like]': 'foo'
      },
      ['nome', 'created_at', 'deleted_at']
    );
    expect(q.page).toBe(2);
    expect(q.limit).toBe(30);
    expect(q.sort).toBe('nome');
    expect(q.order).toBe('desc');
    expect(q.filters).toHaveLength(1);
  });
});


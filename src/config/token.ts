import raw from './token.json' with { type: 'json' };
import { validateTokenConfig } from './validateToken.ts';

export const token = validateTokenConfig(raw);

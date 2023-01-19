import { PUBLIC_INFO } from '../constants.js';

/**
 * Get public info
 */
export default function getPublicInfo(_req, res) {
  res.respond({ info: PUBLIC_INFO });
}

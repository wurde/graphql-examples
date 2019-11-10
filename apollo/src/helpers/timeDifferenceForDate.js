/**
 * Dependencies
 */

import timeDifference from './timeDifference';

/**
 * Define helper
 */

function timeDifferenceForDate(date) {
  const now = new Date().getTime()
  const updated = new Date(date).getTime()
  return timeDifference(now, updated)
}

/**
 * Export helper
 */

export default timeDifferenceForDate;

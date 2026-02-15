const MASTERY_THRESHOLD = 21; // Days

export function scheduleCard(card, rating) {
  let interval = card.interval;
  let easeFactor = card.easeFactor;

  // Update ease factor based on rating
  // rating: 0=Again, 1=Hard, 2=Good, 3=Easy
  easeFactor = easeFactor + (0.1 - (3 - rating) * 0.08);
  easeFactor = Math.max(1.3, easeFactor); // Floor at 1.3

  // Calculate new interval
  if (rating < 2) {
    // Failed (Again or Hard) - Reset
    interval = 0;
  } else if (interval === 0) {
    // First successful review - 1 day
    interval = 1;
  } else if (interval === 1) {
    // Second successful review - 6 days
    interval = 6;
  } else {
    // Subsequent reviews - multiply by ease factor
    interval = Math.round(interval * easeFactor);
  }

  // Calculate next review date
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  // Check mastery status
  const wasMastered = card.isMastered;
  const isMastered = interval >= MASTERY_THRESHOLD;

  // Set masteredAt timestamp
  let masteredAt = card.masteredAt;
  if (isMastered && !wasMastered) {
    // Just became mastered
    masteredAt = new Date();
  } else if (!isMastered && wasMastered) {
    // Lost mastery
    masteredAt = null;
  }

  return {
    interval,
    easeFactor,
    nextReview,
    reviews: card.reviews + 1,
    isMastered,
    masteredAt,
  };
}

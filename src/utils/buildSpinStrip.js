const DEFAULT_LOOP_COUNT = 5;

export function buildSpinStrip(contestants, winner, loopCount = DEFAULT_LOOP_COUNT) {
  const n = contestants.length;
  const strip = [];

  for (let loop = 0; loop < loopCount; loop++) {
    contestants.forEach((contestant, i) => {
      strip.push({
        contestant,
        key: `${contestant._id}-loop-${loop}-${i}`,
      });
    });
  }

  const winnerIdx = contestants.findIndex(
    (c) => String(c._id) === String(winner._id),
  );

  for (let i = 0; i <= winnerIdx; i++) {
    const contestant = contestants[i];
    strip.push({
      contestant: i === winnerIdx ? winner : contestant,
      key: `${contestant._id}-final-${i}`,
    });
  }

  return {
    strip,
    stopIndex: strip.length - 1,
  };
}

/** Pixels to translate so the item at stopIndex sits in the viewport center (with strip padding set to calc(50% - itemWidth/2)). */
export function getSpinScrollOffset(stopIndex, itemWidth) {
  return stopIndex * itemWidth;
}

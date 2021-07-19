type LoopValues = [number, number];

/**
 * Loop through an array of values
 * @param values An array of the starting and last index in the loop array
 */

export function loop(values: LoopValues) {
  const startIndex = values[0];
  const lastIndex = values[1];

  /**
   * Increment the loop value
   * @param current Current value of the array
   * @param value Increment value
   * @returns
   */
  function inc(current: number, value: number) {
    if (current === lastIndex) {
      return startIndex;
    }
    return current + value;
  }

  /**
   * Decrement the loop value
   * @param current Current value of the array
   * @param value Decrement value
   * @returns
   */
  function dec(current: number, value: number) {
    if (current === startIndex) {
      return lastIndex;
    }
    return current - value;
  }

  return {
    inc,
    dec,
  };
}

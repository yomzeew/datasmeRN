export function isLessThanOneHour(timestamp) {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - timestamp;
    const hoursDifference = timeDifference / (1000 * 60 * 60);
    return hoursDifference < 1;
  }
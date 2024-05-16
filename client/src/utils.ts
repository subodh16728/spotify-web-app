// DRY: creating a higher order function
// a function which takes another function as an argument or returns a function

export const asyncHandler = (asyncFunc) => async () => {
    try {
        await asyncFunc();
    } catch (error) {
        console.error(error)
    }
}

// the duration of song returned is in milliseconds so formatDuration function is converting milliseconds into `minutes:seconds` format
export const formatDuration = ms => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor(((ms % 60000) / 1000));
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

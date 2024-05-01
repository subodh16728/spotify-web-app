// DRY: creating a higher order function
// a function which takes another function as an argument or returns a function

export const asyncHandler = (asyncFunc) => async () => {
    try {
        await asyncFunc();
    } catch (error) {
        console.error(error)
    }
}
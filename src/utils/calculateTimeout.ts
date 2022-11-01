export const calculateTimeout = (
    time: number,
    before?: number
)=>{
    const now = new Date().getTime();
    const timeout = time - now;
    return timeout - (before || 0);
}
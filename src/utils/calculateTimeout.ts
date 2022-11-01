export const calculateTimeout = (
    time: number,
    before?: number
)=>{
    const now = new Date().getTime();
    console.log("🚀 ~ file: calculateTimeout.ts ~ line 6 ~ now", now)
    const timeout = time - now;
    return timeout - (before || 0);
}
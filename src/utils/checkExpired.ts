export const checkExpired = (time: number): boolean =>{
    const now = new Date().getTime();
    if (now > time) 
        return true;
    return false;
}
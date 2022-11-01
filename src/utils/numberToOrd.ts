export const numberToOrd = (num: number) => {
    const str = num.toString();
    const last = str[str.length - 1];
    const last2 = str[str.length - 2];
    if (last2 === '1') return `${num}th`;
    if (last === '1') return `${num}st`;
    if (last === '2') return `${num}nd`;
    if (last === '3') return `${num}rd`;
    return `${num}th`;
}

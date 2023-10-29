export function formatNumber(num: number): string {
    if (num < 1000) {
        return num.toString();
    } else if (num >= 1000 && num < 1_000_000) {
        return (num / 1000).toFixed(1) + "K";
    } else if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1) + "M";
    } else {
        return num.toString();
    }
}
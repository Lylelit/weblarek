export function formatPrice(value: number | null): string {
    return value === null ? 'Бесценно' : `${value} синапсов`;
}

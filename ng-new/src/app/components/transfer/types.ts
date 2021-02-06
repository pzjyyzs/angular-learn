export type Direction = 'left' | 'right';
export interface TransferItem {
    checked: boolean;
    key: string;
    value: string;
    direction?: Direction;
}
export interface TransferResult {
    left: TransferItem[];
    right: TransferItem[];
}

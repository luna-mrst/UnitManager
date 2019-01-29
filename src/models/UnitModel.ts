export default class UnitModel {
    /** レア度(3~5) */
    rare: number = 3;
    /** 覚醒数(0~15) */
    awakening: number = 0;
    /** 現在のレベル(1~145) */
    level: number = 1;
    /** メモ */
    memo: string = '';
    /** 表示フラグ */
    displayFlag: boolean = true;
}
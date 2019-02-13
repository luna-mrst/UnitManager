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
  /**
   * jsonから読み込んだデータをバリデートしてモデルを作成する関数
   * @param arg jsonから読み込んだanyオブジェクト
   */
  static fromAny(arg: any): UnitModel {
    if (arg == null) throw "units arguments is null";

    const rare = arg.rare;
    if (!(typeof rare === "number" && 3 <= rare && rare <= 5)) {
      throw 'rare is invalid';
    }
    const awakening = arg.awakening;
    if (!(typeof awakening === "number" && 0 <= awakening && awakening <= 15)) {
      throw 'awakening is invalid';
    }
    const level = arg.level;
    if (!(typeof level === "number" && 1 <= level && level <= 145)) {
      throw 'level is invalid';
    }
    const displayFlag = arg.displayFlag;
    if (!(typeof displayFlag === "boolean")) {
      throw 'displayFlag is invalid';
    }
    const memo = arg.memo;
    if (!(typeof memo === "string")) {
      throw 'memo is invalid';
    }

    return {
      rare: rare,
      awakening: awakening,
      level: level,
      displayFlag: displayFlag,
      memo: memo
    };
  }
}
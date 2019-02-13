import UnitModel from "./models/UnitModel";
import StockModel from "./models/StockModel";
import InfoModel from "./models/InfoModel";
import { CostData } from "./CostData";



/** ローカルストレージのユニットデータ保存キー */
const STRAGE_KEY_UNITS = "strage_unit_data";
const STRAGE_KEY_STOCK = "strage_stock_data";
/** レアゴルの★2排出率 */
const RATE = 0.9653;

/**
 * ローカルストレージから保存データを読み出すやつ
 */
export const loadStrageData = (): { units: UnitModel[]; stock: StockModel } => {
  console.log('initData');
  const strUnits = localStorage.getItem(STRAGE_KEY_UNITS);
  const strStock = localStorage.getItem(STRAGE_KEY_STOCK);

  const units = strUnits != null ? JSON.parse(strUnits) as UnitModel[] : [new UnitModel()];
  const stock = strStock != null ? JSON.parse(strStock) as StockModel : new StockModel();

  return { units, stock };
};

/**
 * ローカルストレージに保存するやつ
 * @param units ユニットデータ
 * @param stock 所持数データ
 */
export const saveStrage = (units: UnitModel[], stock: StockModel): void => {
  const strageData = localStorage.getItem(this.STRAGE_KEY_UNITS);
  if (strageData == null || window.confirm("保存内容を上書きしますか？")) {
    localStorage.setItem(
      STRAGE_KEY_UNITS,
      JSON.stringify(units, (key, value) =>
        key === "displayFlag" ? true : value
      )
    );
    localStorage.setItem(
      STRAGE_KEY_STOCK,
      JSON.stringify(stock)
    );
    window.confirm("保存しましたっ");
  }
}

/**
 * 諸々の必要数を計算するやつ
 * @param units ユニット
 * @param stock 所持数
 */
export const calcInfo = (units: UnitModel[], stock: StockModel): InfoModel => {
  const info = units.reduce<InfoModel>((info, unit) => {
    // 表示対象のみ集計
    if (!unit.displayFlag) return info;

    let maxLevel = 0;
    const needAwake = 15 - unit.awakening;
    switch (unit.rare) {
      case 3:
        info.book3 += needAwake;
        maxLevel = 125;
        break;
      case 4:
        info.book4 += needAwake;
        maxLevel = 135;
        break;
      case 5:
        info.book5 += needAwake;
        maxLevel = 145;
        break;
    }
    const maxCost = CostData.find(d => d.level === maxLevel)!.exp;
    const nowCost = CostData.find(d => d.level === unit.level)!.exp;

    info.levelUpCost += maxCost - nowCost;
    return info;
  }, new InfoModel());

  info.book3 = Math.max(0, info.book3 - stock.book3);
  info.book4 = Math.max(0, info.book4 - stock.book4);
  info.book5 = Math.max(0, info.book5 - stock.book5);
  info.medalCount = Math.max(
    0,
    info.book3 * 150 + info.book4 * 300 + info.book5 * 500 - stock.medal
  );

  // ★2の15覚醒換算
  const evolCount = Math.ceil(info.medalCount / 375);
  info.evolCount = evolCount;
  info.budCount = evolCount * 15;
  info.flowerCount = evolCount * 7;

  // memo:
  // 排出率(スカウト1回あたり期待値) 96.53%
  // レベル40まで上げるためのコスト 66900
  const need = info.evolCount * 16;
  info.scoutCost =
    Math.ceil(need / RATE) * 20000 + info.evolCount * 66900;

  return info;
}
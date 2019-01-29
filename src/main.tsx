import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MainState from './props/MainState';
import Info from './components/Info';
import ListController from './components/ListController';
import UnitList from './components/UnitList';
import UnitModel from './models/UnitModel';
import InfoProps from './props/InfoProps';
import { CostData } from './CostData';

class Main extends React.Component<any, MainState> {
  readonly STRAGE_KEY_UNITS = 'strage_unit_data';

  constructor(props: any) {
    super(props);
    const units = this.initData();
    this.state = {
      units: units,
      filterFunc: (unit: UnitModel) => true,
      info: this.calcInfo(units)
    };
    this.handleClickSave = this.handleClickSave.bind(this);
    this.handleClickExport = this.handleClickExport.bind(this);
    this.handleClickImport = this.handleClickImport.bind(this);
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleClickAddUnit = this.handleClickAddUnit.bind(this);
    this.handleChangeRare = this.handleChangeRare.bind(this);
    this.handleChangeAwakening = this.handleChangeAwakening.bind(this);
    this.handleInputLevel = this.handleInputLevel.bind(this);
    this.handleInputMemo = this.handleInputMemo.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  initData(): UnitModel[] {
    const strageData = localStorage.getItem(this.STRAGE_KEY_UNITS);
    if (strageData != null) {
      const units = JSON.parse(strageData);
      if (units.length > 0) return units;
    }
    return [{ rare: 3, awakening: 0, level: 1, memo: '', displayFlag: true }];

  }

  /**
   * 保存ボタン
   */
  handleClickSave(): void {
    const strageData = localStorage.getItem(this.STRAGE_KEY_UNITS);
    if (strageData == null || window.confirm('保存内容を上書きしますか？')) {
      localStorage.setItem(this.STRAGE_KEY_UNITS, JSON.stringify(this.state.units, (key, value) => {
        if (key === 'displayFlag') return true;
        return value;
      }));
      window.confirm('保存しましたっ');
    }
  }
  /**
   * エクスポートボタン
   */
  handleClickExport(): void {
    window.alert('メンテ中だよ...!');
  }
  /**
   * インポートボタン
   */
  handleClickImport(): void {
    window.alert('メンテ中だよ...!');
  }
  /**
   * フィルタ条件変更
   */
  handleChangeFilter(filterFunc: (unit: UnitModel) => boolean): void {
    this.setState({
      filterFunc: filterFunc,
      info: this.calcInfo(this.state.units.filter(filterFunc))
    });
  }
  /**
   * ユニット追加ボタン
   */
  handleClickAddUnit(): void {
    const units = this.state.units;
    units.push({
      rare: 3,
      awakening: 0,
      level: 1,
      memo: '',
      displayFlag: true
    });
    this.setState({
      units: units
    });
  }
  /**
   * レア度変更
   * @param idx インデックス番号
   */
  handleChangeRare(idx: number): (rare: number) => void {
    return (rare: number) => {
      const unit = this.state.units[idx];
      unit.rare = rare;
      const info = this.calcInfo(this.state.units.filter(this.state.filterFunc));
      this.setState({
        units: this.state.units,
        info: info
      });
    };
  }
  /**
   * 覚醒数変更
   * @param idx インデックス番号
   */
  handleChangeAwakening(idx: number): (awakening: number) => void {
    return (awakening: number) => {
      const unit = this.state.units[idx];
      unit.awakening = awakening;
      const info = this.calcInfo(this.state.units.filter(this.state.filterFunc));
      this.setState({
        units: this.state.units,
        info: info
      });
    };
  }
  /**
   * 現在のレベル変更
   * @param idx インデックス番号
   */
  handleInputLevel(idx: number): (level: number) => void {
    return (level: number) => {
      const unit = this.state.units[idx];
      unit.level = level;
      const info = this.calcInfo(this.state.units.filter(this.state.filterFunc));
      this.setState({
        units: this.state.units,
        info: info
      });
    };
  }
  /**
   * メモ変更
   * @param idx インデックス番号
   */
  handleInputMemo(idx: number): (memo: string) => void {
    return (memo: string) => {
      const unit = this.state.units[idx];
      unit.memo = memo;
      this.setState({
        units: this.state.units
      });
    };
  }
  /**
   * 削除ボタン
   * @param idx インデックス番号
   */
  handleClickRemove(idx: number): () => void {
    return () => {
      const units = this.state.units.filter((_, i) => i !== idx)
      const info = this.calcInfo(units.filter(this.state.filterFunc));
      this.setState({
        units: units,
        info: info
      });
    };
  }
  /**
   * Infoの計算をするやつ。メイン機能。こいつができないと何の意味もない。
   */
  calcInfo(dispUnits: UnitModel[]): InfoProps {
    let maxLevel = 0;
    const info = dispUnits.reduce<InfoProps>((info, unit) => {
      const wantAwake = 15 - unit.awakening;
      switch (unit.rare) {
        case 3:
          info.book3 += wantAwake;
          info.medalCount += wantAwake * 150;
          maxLevel = 125;
          break;
        case 4:
          info.book4 += wantAwake;
          info.medalCount += wantAwake * 300;
          maxLevel = 135;
          break
        case 5:
          info.book5 += wantAwake;
          info.medalCount += wantAwake * 500;
          maxLevel = 145;
          break;
      }
      const maxCost = CostData.filter(d => d.level === maxLevel)[0].exp;
      const nowCost = CostData.filter(d => d.level === unit.level)[0].exp;

      info.levelUpCost += (maxCost - nowCost);
      return info;
    }, {
        book3: 0,
        book4: 0,
        book5: 0,
        medalCount: 0,
        budCount: 0,
        flowerCount: 0,
        scoutCost: 0,
        levelUpCost: 0
      }
    );

    // TODO: 素材とレアゴル費用の計算を実装する

    return info;
  }

  render(): JSX.Element {
    return (
      <div className="mainContent">
        <Info
          key="info"
          book3={this.state.info.book3}
          book4={this.state.info.book4}
          book5={this.state.info.book5}
          medalCount={this.state.info.medalCount}
          budCount={this.state.info.budCount}
          flowerCount={this.state.info.flowerCount}
          scoutCost={this.state.info.scoutCost}
          levelUpCost={this.state.info.levelUpCost}
        />
        <div className="inputContainer">
          <ListController
            key="controller"
            handleClickSave={this.handleClickSave}
            handleClickExport={this.handleClickExport}
            handleClickImport={this.handleClickImport}
            handleChangeFilter={this.handleChangeFilter}
          />
          <UnitList
            key="unitList"
            units={this.state.units.filter(this.state.filterFunc)}
            handleClickAddUnit={this.handleClickAddUnit}
            handleChangeRare={this.handleChangeRare}
            handleChangeAwakening={this.handleChangeAwakening}
            handleInputLevel={this.handleInputLevel}
            handleInputMemo={this.handleInputMemo}
            handleClickRemove={this.handleClickRemove}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.querySelector('#content'),
);
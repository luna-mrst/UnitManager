import * as React from "react";
import * as ReactDOM from "react-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import * as ReactModal from 'react-modal';
import UnitModel from "./models/UnitModel";
import StockModel from "./models/StockModel";
import MainState from "./props/MainState";
import Info from "./components/Info";
import ListController from "./components/ListController";
import UnitList from "./components/UnitList";
import ExportModal from './components/ExportModal';
import ImportModal from './components/ImportModal';
import Stock from "./components/Stock";
import { CostData } from "./CostData";
import InfoModel from "./models/InfoModel";

class Main extends React.Component<any, MainState> {
  /** ローカルストレージのユニットデータ保存キー */
  readonly STRAGE_KEY_UNITS = "strage_unit_data";
  readonly STRAGE_KEY_STOCK = "strage_stock_data";
  /** レアゴルの★2排出率 */
  readonly RATE = 0.9653;

  constructor(props: any) {
    super(props);
    const { units, stock } = this.initData();
    this.state = {
      units: units,
      info: this.calcInfo(units, stock),
      stock: stock,
      filterFunc: (unit: UnitModel) => true,
      isOpenExportModal: false,
      isOpenImportModal: false
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
    this.handleChangeBook = this.handleChangeBook.bind(this);
    this.handleChangeMedal = this.handleChangeMedal.bind(this);

    ReactModal.setAppElement('#root');
  }

  initData(): { units: UnitModel[], stock: StockModel } {
    const strUnits = localStorage.getItem(this.STRAGE_KEY_UNITS);
    const strStock = localStorage.getItem(this.STRAGE_KEY_STOCK);
    const ret = {
      units: [new UnitModel()],
      stock: new StockModel()
    };

    if (strUnits != null) {
      const units = JSON.parse(strUnits);
      if (units.length > 0) ret.units = units;
    }
    if (strStock != null) {
      const stock = JSON.parse(strStock);
      ret.stock = stock;
    }

    return ret;
  }

  /**
   * 保存ボタン
   */
  handleClickSave(): void {
    const strageData = localStorage.getItem(this.STRAGE_KEY_UNITS);
    if (strageData == null || window.confirm("保存内容を上書きしますか？")) {
      localStorage.setItem(
        this.STRAGE_KEY_UNITS,
        JSON.stringify(this.state.units, (key, value) =>
          key === "displayFlag" ? true : value
        )
      );
      localStorage.setItem(
        this.STRAGE_KEY_STOCK,
        JSON.stringify(this.state.stock)
      );
      window.confirm("保存しましたっ");
    }
  }
  /**
   * エクスポートボタン
   */
  handleClickExport(): void {
    this.setState({
      isOpenExportModal: true
    });
  }
  /**
   * インポートボタン
   */
  handleClickImport(): void {
    this.setState({
      isOpenImportModal: true
    })
  }
  /**
   * フィルタ条件変更
   * @param filterFunc 表示対象:true　非表示対象:falseを返す関数
   */
  handleChangeFilter(filterFunc: (unit: UnitModel) => boolean): void {
    this.state.units.forEach(v => (v.displayFlag = filterFunc(v)));
    this.setState({
      filterFunc: filterFunc,
      info: this.calcInfo(this.state.units, this.state.stock)
    });
  }
  /**
   * ユニット追加ボタン
   */
  handleClickAddUnit(): void {
    const units = this.state.units;
    units.push(new UnitModel());
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
      const info = this.calcInfo(this.state.units, this.state.stock);
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
      const info = this.calcInfo(this.state.units, this.state.stock);
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
      const info = this.calcInfo(this.state.units, this.state.stock);
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
      const units = this.state.units.filter((_, i) => i !== idx);
      const info = this.calcInfo(units, this.state.stock);
      this.setState({
        units: units,
        info: info
      });
    };
  }
  /**
   * 覚醒書書所持数変更
   * @param value 個数
   */
  handleChangeBook(rare: 'book3' | 'book4' | 'book5'): (value: number) => void {
    return (value: number) => {
      const stock = this.state.stock;
      stock[rare] = value;
      this.setState({
        info: this.calcInfo(this.state.units, stock),
        stock: stock
      });
    };
  }
  /**
   * 所持メダル変更
   * @param value メダル枚数
   */
  handleChangeMedal(value: number): void {
    const stock = this.state.stock;
    stock.medal = value;
    this.setState({
      info: this.calcInfo(this.state.units, stock),
      stock: stock
    });
  }
  /**
   * Infoの計算をするやつ。メイン機能。こいつができないと何の意味もない。
   */
  calcInfo(dispUnits: UnitModel[], stock: StockModel): InfoModel {
    const info = dispUnits.reduce<InfoModel>(
      (info, unit) => {
        // 表示対象のみ集計
        if (!unit.displayFlag) return info;

        let maxLevel = 0;
        const wantAwake = 15 - unit.awakening;
        switch (unit.rare) {
          case 3:
            info.book3 += wantAwake;
            maxLevel = 125;
            break;
          case 4:
            info.book4 += wantAwake;
            maxLevel = 135;
            break;
          case 5:
            info.book5 += wantAwake;
            maxLevel = 145;
            break;
        }
        const maxCost = CostData.filter(d => d.level === maxLevel)[0].exp;
        const nowCost = CostData.filter(d => d.level === unit.level)[0].exp;

        info.levelUpCost += maxCost - nowCost;
        return info;
      },
      new InfoModel()
    );

    info.book3 = Math.max(0, info.book3 - stock.book3);
    info.book4 = Math.max(0, info.book4 - stock.book4);
    info.book5 = Math.max(0, info.book5 - stock.book5);
    info.medalCount = Math.max(0, info.book3 * 150 + info.book4 * 300 + info.book5 * 500 - stock.medal);

    // ★2の15覚醒換算、14以下はいらないか。。？
    const evolCount = Math.ceil(info.medalCount / 375);
    info.evolCount = evolCount;
    info.budCount = evolCount * 15;
    info.flowerCount = evolCount * 7;

    // memo
    // 排出率(スカウト1回あたり期待値) 96.53%
    // レベル40まで上げるためのコスト 66900
    const need = info.evolCount * 16;
    info.scoutCost = Math.ceil(need / this.RATE) * 20000 + info.evolCount * 66900;

    return info;
  }

  render(): JSX.Element {
    return (
      <div className="mainContent">
        <Tabs className="tabContainer">
          <TabList className="tablist">
            <Tab className="tab" selectedClassName="selected">必要数</Tab>
            <Tab className="tab" selectedClassName="selected">所持数</Tab>
          </TabList>
          <TabPanel className="tabItem">
            <Info
              key="info"
              info={this.state.info}
            />
          </TabPanel>
          <TabPanel className="tabItem">
            <Stock
              stock={this.state.stock}
              handleChangeBook3={this.handleChangeBook('book3')}
              handleChangeBook4={this.handleChangeBook('book4')}
              handleChangeBook5={this.handleChangeBook('book5')}
              handleChangeMedal={this.handleChangeMedal}
            />
          </TabPanel>
        </Tabs>
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
            units={this.state.units}
            handleClickAddUnit={this.handleClickAddUnit}
            handleChangeRare={this.handleChangeRare}
            handleChangeAwakening={this.handleChangeAwakening}
            handleInputLevel={this.handleInputLevel}
            handleInputMemo={this.handleInputMemo}
            handleClickRemove={this.handleClickRemove}
          />

          <ExportModal
            units={this.state.units}
            isOpen={this.state.isOpenExportModal}
            closeModal={() => this.setState({ isOpenExportModal: false })}
          />
          <ImportModal
            isOpen={this.state.isOpenImportModal}
            loadData={units => this.setState({ units: units, info: this.calcInfo(units, this.state.stock) })}
            closeModal={() => this.setState({ isOpenImportModal: false })}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.querySelector("#content"));

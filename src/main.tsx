import * as React from "react";
import * as ReactDOM from "react-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import * as ReactModal from "react-modal";
import UnitModel from "./models/UnitModel";
import Info from "./components/Info";
import ListController from "./components/ListController";
import UnitList from "./components/UnitList";
import ExportModal from "./components/ExportModal";
import ImportModal from "./components/ImportModal";
import Stock from "./components/Stock";
import * as Logic from "./logic";

function Main() {
  ReactModal.setAppElement("#root");
  const init = React.useMemo(() => Logic.loadStrageData(), []);
  const [units, setUnits] = React.useState(init.units);
  const [stock, setStock] = React.useState(init.stock);
  const [info, setInfo] = React.useState(Logic.calcInfo(units, stock));
  const [isOpenExportModal, setOpenExportModal] = React.useState(false);
  const [isOpenImportModal, setOpenImportModal] = React.useState(false);

  /**
   * レア度変更
   */
  const handleChangeRare = (idx: number) => (rare: number): void => {
    units[idx].rare = rare;
    const info = Logic.calcInfo(units, stock);
    setUnits(units);
    setInfo(info);
  };
  /**
   * 覚醒数変更
   */
  const handleChangeAwakening = (idx: number) => (awakening: number): void => {
    units[idx].awakening = awakening;
    const info = Logic.calcInfo(units, stock);
    setUnits(units);
    setInfo(info);
  };
  /**
   * 現在のレベル変更
   */
  const handleInputLevel = (idx: number) => (level: number): void => {
    units[idx].level = level;
    const info = Logic.calcInfo(units, stock);
    setUnits(units);
    setInfo(info);
  };
  /**
   * メモ変更
   */
  const handleInputMemo = (idx: number) => (memo: string): void => {
    units[idx].memo = memo;
    setUnits(units);
  };
  /**
   * 削除ボタン
   */
  const handleClickRemove = (idx: number) => (): void => {
    const removed = units.filter((_, i) => i !== idx);
    setUnits(removed);
    setInfo(Logic.calcInfo(removed, stock));
  };
  /**
   * 覚醒書書所持数変更
   */
  const handleChangeBook = React.useCallback((rare: "book3" | "book4" | "book5") => (value: number): void => {
    if (value < 0) return;
    stock[rare] = value;
    setStock(stock);
    setInfo(Logic.calcInfo(units, stock));
  }, []);
  /**
   * 所持メダル変更
   */
  const handleChangeMedal = (value: number): void => {
    if (value < 0) return;
    stock.medal = value;
    setStock(stock);
    setInfo(Logic.calcInfo(units, stock));
  }

  return (
    <div className="mainContent">
      <Tabs className="tabContainer">
        <TabList className="tablist">
          <Tab className="tab" selectedClassName="selected">
            必要数
            </Tab>
          <Tab className="tab" selectedClassName="selected">
            所持数
            </Tab>
        </TabList>
        <TabPanel className="tabItem">
          <Info key="info" info={info} />
        </TabPanel>
        <TabPanel className="tabItem">
          <Stock
            stock={stock}
            handleChangeBook3={React.useCallback(handleChangeBook("book3"), [])}
            handleChangeBook4={React.useCallback(handleChangeBook("book4"), [])}
            handleChangeBook5={React.useCallback(handleChangeBook("book5"), [])}
            handleChangeMedal={handleChangeMedal}
          />
        </TabPanel>
      </Tabs>
      <div className="inputContainer">
        <ListController
          key="controller"
          handleClickSave={() => Logic.saveStrage(units, stock)}
          handleClickExport={React.useCallback(() => setOpenExportModal(true), [])}
          handleClickImport={() => setOpenImportModal(true)}
          handleChangeFilter={fnc => setUnits(units => units.map(unit => {
            unit.displayFlag = fnc(unit); return unit;
          }))}
        />
        <UnitList
          key="unitList"
          units={units}
          handleClickAddUnit={() => setUnits(units => [...units, new UnitModel()])}
          handleChangeRare={handleChangeRare}
          handleChangeAwakening={handleChangeAwakening}
          handleInputLevel={handleInputLevel}
          handleInputMemo={handleInputMemo}
          handleClickRemove={handleClickRemove}
        />

        <ExportModal
          units={units}
          stock={stock}
          isOpen={isOpenExportModal}
          closeModal={() => setOpenExportModal(false)}
        />
        <ImportModal
          isOpen={isOpenImportModal}
          loadData={data => {
            setUnits(data.units);
            setStock(data.stock);
            setInfo(Logic.calcInfo(data.units, data.stock));
          }}
          closeModal={() => setOpenImportModal(false)}
        />
      </div>
    </div>
  );
}

ReactDOM.render(<Main />, document.querySelector("#content"));

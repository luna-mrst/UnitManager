import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MainState from './props/MainState';
import Info from './components/Info';
import ListController from './components/ListController';
import UnitList from './components/UnitList';
import UnitModel from './models/UnitModel';

class Main extends React.Component<any, MainState> {
  constructor(props: any) {
    super(props);
    this.state = {
      units: [{
        rare: 3,
        awakening: 0,
        level: 1,
        memo: '',
        displayFlag: true
      }]
    };
    this.handleClickSave = this.handleClickSave.bind(this);
    this.handleClickExport = this.handleClickExport.bind(this);
    this.handleClickImport = this.handleClickImport.bind(this);
    this.handleClickAddUnit = this.handleClickAddUnit.bind(this);
    this.handleChangeRare = this.handleChangeRare.bind(this);
    this.handleChangeAwakening = this.handleChangeAwakening.bind(this);
    this.handleInputLevel = this.handleInputLevel.bind(this);
    this.handleInputMemo = this.handleInputMemo.bind(this);
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  handleClickSave(): void { }
  handleClickExport(): void { }
  handleClickImport(): void { }
  handleChangeFilter(): (unit: UnitModel) => boolean {
    return (unit: UnitModel) => true;
  }
  /**
   * ユニット追加ボタンのイベントハンドラ
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
  handleChangeRare(idx: number): (rare: number) => void {
    return () => { };
  }
  handleChangeAwakening(idx: number): (awakening: number) => void {
    return () => { };
  }
  handleInputLevel(idx: number): (level: number) => void {
    return () => { };
  }
  handleInputMemo(idx: number): (memo: string) => void {
    return () => { };
  }
  handleClickRemove(idx: number): () => void {
    return () => { };
  }

  render(): JSX.Element {
    return (
      <div className="mainContent">
        <Info
          key="info"
          book3={12}
          book4={34}
          book5={56}
          medalCount={12345}
          budCount={1234}
          flowerCount={5678}
          scoutCost={123456789}
          levelUpCost={123456789}
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
            units={this.state.units}
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
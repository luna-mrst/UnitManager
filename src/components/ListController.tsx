import * as React from 'react';
import ListControllerProps from '../props/ListControllerProps';
import ListControllerState from '../props/ListControllerState';
import UnitModel from '../models/UnitModel';
import Unit from './Unit';

export default class ListController extends React.Component<ListControllerProps, ListControllerState> {
  // フィルターのvalue定数
  readonly NONE = 'none';
  readonly RARE3 = '3';
  readonly RARE4 = '4';
  readonly RARE5 = '5';
  readonly MEMO = 'memo';

  constructor(props: ListControllerProps) {
    super(props);
    this.state = { filterCondition: this.NONE, filterWord: '' };
    this.handleChangeFilter = this.handleChangeFilter.bind(this);
    this.handleInputFilterWord = this.handleInputFilterWord.bind(this);
    this.handleBlurInput = this.handleBlurInput.bind(this);
  }

  handleChangeFilter(e: React.ChangeEvent<HTMLSelectElement>): void {
    this.setState({
      filterCondition: e.currentTarget.value
    },
      () => {
        switch (this.state.filterCondition) {
          case this.NONE:
            this.props.handleChangeFilter(this.noFilter);
            break;
          case this.RARE3:
          case this.RARE4:
          case this.RARE5:
            this.props.handleChangeFilter(this.rareFilter(parseInt(this.state.filterCondition)))
            break;
          case this.MEMO:
            this.props.handleChangeFilter(this.memoFilter(this.state.filterWord));
            break;
        }
      }
    );
  }

  handleInputFilterWord(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      filterWord: e.currentTarget.value
    });
  }

  handleBlurInput(e: React.FocusEvent<HTMLInputElement>): void {
    this.props.handleChangeFilter(this.memoFilter(this.state.filterWord));
  }

  rareFilter(rare: number): (unit: UnitModel) => boolean {
    return (unit: UnitModel) => unit.rare === rare;
  }

  noFilter(): boolean {
    return true;
  }

  memoFilter(word: string): (unit: UnitModel) => boolean {
    return (unit: UnitModel) => {
      return unit.memo.indexOf(word) >= 0;
    }
  }

  render(): JSX.Element {
    return (
      <div className="listController">
        <button onClick={this.props.handleClickSave}>保存</button>
        <button onClick={this.props.handleClickExport}>エクスポート</button>
        <button onClick={this.props.handleClickImport}>インポート</button>
        <span className="filter">
          フィルタ：
            <select value={this.state.filterCondition} onChange={e => this.handleChangeFilter(e)}>
            <option value={this.NONE}>なし</option>
            <option value={this.RARE3}>★3</option>
            <option value={this.RARE4}>★4</option>
            <option value={this.RARE5}>★5</option>
            <option value={this.MEMO}>メモ</option>
          </select>
          <input
            type="text"
            value={this.state.filterWord}
            disabled={this.state.filterCondition !== this.MEMO}
            onChange={this.handleInputFilterWord}
            onBlur={this.handleBlurInput}
          />
        </span>
      </div>
    );
  }
}

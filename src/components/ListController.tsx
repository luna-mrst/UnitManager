import * as React from 'react';
import ListControllerProps from '../props/ListControllerProps';
import ListControllerState from '../props/ListControllerState';

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
    });
  }

  handleInputFilterWord(e: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({
      filterWord: e.currentTarget.value
    });
  }

  handleBlurInput(e: React.FocusEvent<HTMLInputElement>): void {

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

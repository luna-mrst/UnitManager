import * as React from "react";
import DropdownProps from "../props/DropdownProps";
import DropdownState from "../props/DropdownState";

export default class Dropdown extends React.Component<
  DropdownProps,
  DropdownState
> {
  constructor(props: DropdownProps) {
    super(props);
    this.state = {
      selection:
        props.selected == null || props.selected >= props.values.length
          ? 0
          : props.selected,
      isShow: false
    };

    this.onChangeSelection = this.onChangeSelection.bind(this);
  }

  onChangeSelection(idx: number, e: React.MouseEvent) {
    this.setState({
      selection: idx,
      isShow: false
    });
    e.stopPropagation();
    this.props.handleChangeSelection(idx);
  }

  render(): JSX.Element {
    const items = this.props.values.map((v, i) => (
      <li
        key={i}
        className={i === this.state.selection ? "selected" : ""}
        onClick={e => this.onChangeSelection(i, e)}
      >
        {v}
      </li>
    ));

    return (
      <div
        className={`dropdown ${this.state.isShow ? "open" : ""}`}
        onClick={() => this.setState({ isShow: !this.state.isShow })}
        tabIndex={1}
        onBlur={() => this.setState({ isShow: false })}
      >
        <span className="dropvalue">
          {this.props.values[this.state.selection]}
        </span>
        <ul className={`dropitem ${this.state.isShow ? "" : "hidden"}`}>
          {items}
        </ul>
      </div>
    );
  }
}

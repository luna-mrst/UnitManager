import * as React from "react";
import DropdownProps from "../props/DropdownProps";

export default function Dropdown(props: DropdownProps): JSX.Element {
  const [selection, setSelection] = React.useState(
    props.selected == null || props.selected >= props.values.length
      ? 0
      : props.selected);
  const [isShow, setShow] = React.useState(false);
  const onChangeSelection = React.useCallback((idx: number, evt: React.MouseEvent) => {
    setSelection(idx);
    setShow(false);
    evt.stopPropagation();
    props.handleChangeSelection(idx);
  }, []);
  const items = React.useMemo(() =>
    props.values.map((v, i) =>
      <li
        key={i}
        className={i === selection ? "selected" : ""}
        onClick={e => onChangeSelection(i, e)}
      >
        {v}
      </li>
    ), [props.values, selection]);

  return (
    <div
      className={`dropdown ${isShow ? "open" : ""}`}
      onClick={() => setShow(isShow => !isShow)}
      tabIndex={1}
      onBlur={() => setShow(false)}
    >
      <span className="dropvalue">
        {props.values[selection]}
      </span>
      <ul className={`dropitem ${isShow ? "" : "hidden"}`}>
        {items}
      </ul>
    </div>
  );
}

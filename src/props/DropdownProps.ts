export default interface DropdownProps {
  /** ドロップダウンで選択する値のリスト */
  values: string[];
  /** 初期選択のインデックス */
  selected?: number;

  /** 選択変更時のイベントハンドラ */
  handleChangeSelection: (idx: number) => void;
}
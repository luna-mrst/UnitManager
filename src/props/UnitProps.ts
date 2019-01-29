import UnitModel from "../models/UnitModel";

export default interface UnitProps {
  /** 表示情報 */
  model: UnitModel;

  handleChangeRare: (rare: number) => void;
  handleChangeAwakening: (awakening: number) => void;
  handleInputLevel: (level: number) => void;
  handleInputMemo: (memo: string) => void;
  handleClickRemove: () => void;
}
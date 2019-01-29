import UnitModel from "../models/UnitModel";

export default interface UnitListProps {
  units: UnitModel[];

  handleClickAddUnit: () => void;
  handleChangeRare: (idx: number) => (rare: number) => void;
  handleChangeAwakening: (idx: number) => (awakening: number) => void;
  handleInputLevel: (idx: number) => (level: number) => void;
  handleInputMemo: (idx: number) => (memo: string) => void;
  handleClickRemove: (idx: number) => () => void;
}
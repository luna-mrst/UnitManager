import UnitModel from "../models/UnitModel";
import InfoProps from "./InfoProps";

export default interface MainState {
  units: UnitModel[];
  info: InfoProps;
  filterFunc: (unit: UnitModel) => boolean;
  isOpenExportModal: boolean;
  isOpenImportModal: boolean;
}
import UnitModel from "../models/UnitModel";
import InfoModel from "../models/InfoModel";
import StockModel from "../models/StockModel";

export default interface MainState {
  units: UnitModel[];
  info: InfoModel;
  stock: StockModel;
  filterFunc: (unit: UnitModel) => boolean;
  isOpenExportModal: boolean;
  isOpenImportModal: boolean;
}
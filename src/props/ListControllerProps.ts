import UnitModel from "../models/UnitModel";

export default interface ListControllerProps {
  handleClickSave: () => void;
  handleClickExport: () => void;
  handleClickImport: () => void;
  handleChangeFilter: (filterFunc: (unit: UnitModel) => boolean) => void;
}
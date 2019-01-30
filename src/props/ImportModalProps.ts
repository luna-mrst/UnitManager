import UnitModel from "../models/UnitModel";

export default interface ImportModalProps {
  isOpen: boolean;

  closeModal: () => void;
  loadData: (loadData: UnitModel[]) => void;
}
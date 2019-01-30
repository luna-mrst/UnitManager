import UnitModel from '../models/UnitModel'

export default interface ExportModalProps {
  units: UnitModel[];
  isOpen: boolean;

  closeModal: () => void;
}
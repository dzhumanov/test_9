import { useAppSelector } from "../../app/Hooks";
import Modal from "../../components/Modal/Modal";
import NewTransaction from "../../components/NewTransaction/NewTransaction";
import Transactions from "../../components/Transactions/Transactions";
import {
  selectModal,
} from "../../store/transactions/transactionsSlice";

const Home = () => {
  const showModal = useAppSelector(selectModal);
  return (
    <div>
      <Transactions />
      <Modal show={showModal} title="Add new transaction">
        <div className="modal-body">
          <NewTransaction />
        </div>
      </Modal>
    </div>
  );
};

export default Home;

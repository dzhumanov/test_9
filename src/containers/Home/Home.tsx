import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import Modal from "../../components/Modal/Modal";
import NewTransaction from "../../components/NewTransaction/NewTransaction";
import Transactions from "../../components/Transactions/Transactions";
import {
  selectModal,
  toggleModal,
} from "../../store/transactions/transactionsSlice";

const Home = () => {
  const dispatch = useAppDispatch();
  const showModal = useAppSelector(selectModal);
  const onClick = () => {
    dispatch(toggleModal());
  };
  return (
    <div>
      <Transactions />
      <Modal show={showModal} title="Add new transaction" onClose={onClick}>
        <div className="modal-body">
            <NewTransaction/>
        </div>
      </Modal>
    </div>
  );
};

export default Home;

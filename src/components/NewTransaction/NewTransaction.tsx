import React from "react";
import {useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/Hooks";
import { createLoading } from "../../store/transactions/transactionsSlice";
import { ApiTrans } from "../../types";
import { createTransaction, fetchTransactions } from "../../store/transactions/transactionsThunks";
import Form from "../Form/Form";

const NewTransaction:React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const loading = useAppSelector(createLoading);

    const onSubmit = async(transaction: ApiTrans) => {
        await dispatch(createTransaction(transaction));
        await dispatch(fetchTransactions());
        navigate('/');
    }

    return(
        <>
            <Form onSubmit={onSubmit} isLoading={loading} />
        </>

    )
}

export default NewTransaction;
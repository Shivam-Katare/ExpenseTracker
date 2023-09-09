import { useState } from "react";
import { signOut } from "firebase/auth";
import { useAddTransaction } from "../../hooks/useAddTransaction";
import { useGetTransactions } from "../../hooks/useGetTransactions";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import { auth } from "../../config/firebase-config";

export const ExpenseTracker = () => {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotals } = useGetTransactions();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance, income, expenses } = transactionTotals;

  const onSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount("");
  };

  const signUserOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch (err) {
      console.error();
    }
  };

  return (
    <div className="app-container">
      <div className="expense-tracker">
        <div className="container">
          <h1> {name}'s Expense Tracker</h1>

          <div className="total-amounts">
            <div className="balance">
              <h3> Your Balance</h3>
              {balance >= 0 ? <h2> Rs {balance}</h2> : <h2> -Rs {balance * -1}</h2>}
            </div>
            <div className="income">
              <h4> Income</h4>
              <p>Rs {income}</p>
            </div>
            <div className="expenses">
              <h4> Expenses</h4>
              <p>Rs {expenses}</p>
            </div>
          </div>

          <form className="add-transaction" onSubmit={onSubmit}>
            <div className="all-inputs">
              <input
                type="text"
                placeholder="Short title"
                className="amount"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                placeholder="Amount"
                type="number"
                value={transactionAmount}
                required
                className="amount"
                onChange={(e) => setTransactionAmount(e.target.value)}
              />
            </div>
            <div className="total-calculation-container">
              <div className="radio-input">
                <div>
                  <input
                    type="radio"
                    id="expense"
                    value="expense"
                    checked={transactionType === "expense"}
                    onChange={(e) => setTransactionType(e.target.value)}
                    className="value"
                    placeholder="Expense"
                  />
                  <label htmlFor="expense" className="value"> Expense</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="income"
                    value="income"
                    checked={transactionType === "income"}
                    onChange={(e) => setTransactionType(e.target.value)}
                    className="value"
                    placeholder="Income"
                  />
                  <label htmlFor="income" className="value"> Income</label>
                </div>
              </div>

              <button type="submit"> Add Transaction</button>

            </div>
          </form>
        </div>
        {profilePhoto && (
          <div className="profile">
            {" "}
            <img className="profile-photo" src={profilePhoto} />
            <button class="sign-out-button" onClick={signUserOut}>
              Sign out
            </button>
          </div>
        )}
      </div>

      {/* ------------------------------------------------- */}
      <div className="transactions" id="style-4">
        <h3 className="transactions-heading">All Your Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } =
              transaction;
            return (
              <li className="list-of-transactions">
                <h4> {description} </h4>
                <p>
                  Rs {transactionAmount} ➡{" "}
                  <label
                    style={{
                      color: transactionType === "expense" ? "red" : "green",
                    }}
                  >
                    {" "}
                    {transactionType}{" "}
                  </label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

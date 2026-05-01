import { useState } from "react";
import {
  Wallet,
  ArrowDownCircle,
  ArrowUpCircle,
  PlusCircle,
} from "lucide-react";

function App() {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: "Salary",
      amount: 50000,
      type: "income",
    },
    {
      id: 2,
      title: "Groceries",
      amount: 2500,
      type: "expense",
    },
    {
      id: 3,
      title: "Netflix Subscription",
      amount: 649,
      type: "expense",
    },
  ]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const addTransaction = (e) => {
    e.preventDefault();

    if (!title || !amount) return;

    const newTransaction = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
    };

    setTransactions([newTransaction, ...transactions]);
    setTitle("");
    setAmount("");
    setType("expense");
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Wallet className="text-blue-600" size={40} />
          <h1 className="text-4xl font-bold text-slate-800">
            Smart Expense Tracker
          </h1>
        </div>

        {/* Add Transaction Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <PlusCircle className="text-blue-600" />
            Add Transaction
          </h2>

          <form
            onSubmit={addTransaction}
            className="grid md:grid-cols-4 gap-4"
          >
            <input
              type="text"
              placeholder="Transaction Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <button
              type="submit"
              className="bg-blue-600 text-white rounded-xl px-6 py-3 hover:bg-blue-700 transition"
            >
              Add
            </button>
          </form>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-gray-500 text-lg">Total Balance</h2>
            <p className="text-4xl font-bold text-slate-800 mt-2">
              ₹{balance.toLocaleString()}
            </p>
          </div>

          <div className="bg-green-50 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpCircle className="text-green-600" />
              <h2 className="text-green-700 text-lg">Income</h2>
            </div>
            <p className="text-4xl font-bold text-green-600">
              ₹{income.toLocaleString()}
            </p>
          </div>

          <div className="bg-red-50 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownCircle className="text-red-600" />
              <h2 className="text-red-700 text-lg">Expenses</h2>
            </div>
            <p className="text-4xl font-bold text-red-600">
              ₹{expenses.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">
            Recent Transactions
          </h2>

          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <p className="font-semibold text-slate-800">
                    {transaction.title}
                  </p>
                  <p className="text-sm text-slate-500 capitalize">
                    {transaction.type}
                  </p>
                </div>

                <p
                  className={`text-xl font-bold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}₹
                  {transaction.amount.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

const UsersContext = createContext();

export function UsersProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [transactions, setTransactions] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const submitNewUser = async (data) => {
    try {
      const newUser = {
        _id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString(),
      };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      router.push("/");
      return { user: newUser };
    } catch (error) {
      console.error("Error submitting new user:", error);
      return { error: error.message };
    }
  };

  const loginUser = async (data) => {
    try {
      const user = {
        _id: "1",
        username: data.username,
        loginPassword: data.loginPassword,
      };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/");
      return { user };
    } catch (error) {
      console.error("Login error:", error);
      return { error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/login");
  };

  // Inside UsersProvider
  const fetchProducts = async (count) => {
    console.log("Hitting API")
    try {
      const response = await fetch(`http://localhost:3001/api/products/fetchProducts/${count}`);
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to fetch products");
      }
      const data = await response.json();
      return data.products; // return the array of products
    } catch (error) {
      console.error("Fetch Products Error:", error);
      return [];
    }
  };

  // Create Combo
  const createCombo = async (payload) => {
    try {
      const response = await fetch("http://localhost:3001/api/combo/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create combo");
      }

      return { success: true, combo: data.data };
    } catch (error) {
      console.error("Create Combo Error:", error);
      return { success: false, error: error.message };
    }
  };

  // Get all combos
  const getAllCombos = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/combo");
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Get All Combos Error:", error);
      return [];
    }
  };

  // Get combos by User ID
  const getCombosByUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/combo/user/${userId}`);
      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error("Get Combos By User Error:", error);
      return [];
    }
  };

  // Update Combo
  const updateCombo = async (id, payload) => {
    try {
      const response = await fetch(`http://localhost:3001/api/combo/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to update combo");

      return { success: true, combo: data.data };
    } catch (error) {
      console.error("Update Combo Error:", error);
      return { success: false, error: error.message };
    }
  };

  // Delete Combo
  const deleteCombo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/combo/delete/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to delete combo");

      return { success: true };
    } catch (error) {
      console.error("Delete Combo Error:", error);
      return { success: false, error: error.message };
    }
  };

  // Reset combos and tasks for a user
  const resetUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/combo/reset/${userId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to reset user data");

      return { success: true, ...data };
    } catch (error) {
      console.error("Reset User Data Error:", error);
      return { success: false, error: error.message };
    }
  };

  const addWallet = async (payload) => {
    try {
      const response = await fetch("http://localhost:3001/api/users/addWallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to add wallet");

      return { success: true, wallet: data.wallet };
    } catch (error) {
      console.error("Add Wallet Error:", error);
      return { success: false, error: error.message };
    }
  };

  const getWallets = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/users/getWallet");
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to fetch wallets");

      return data.wallets || [];
    } catch (error) {
      console.error("Get Wallets Error:", error);
      return [];
    }
  };

  const deleteWallet = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/deleteWallet/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to delete wallet");

      return { success: true };
    } catch (error) {
      console.error("Delete Wallet Error:", error);
      return { success: false, error: error.message };
    }
  };

  const updateWallet = async (id, payload) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/updateWallet/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to update wallet");

      return { success: true, wallet: data.wallet };
    } catch (error) {
      console.error("Update Wallet Error:", error);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/api/realtime-transactions");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.event === "initial_transactions") {
        setTransactions(data.payload); // Initially only Pending transactions
      }

      if (data.event === "transaction_update") {
        const updatedDoc = data.payload.fullDocument;

        setTransactions(prevTransactions => {
          // Remove the updated document from the state
          return prevTransactions.filter(t => t._id !== updatedDoc._id);
        });
      }
    };

    return () => eventSource.close();
  }, []);


  const updateTransactionStatus = async (transactionId, status) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/updateTransaction/${transactionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to update transaction status");

      return { success: true, transaction: data.transaction };
    } catch (error) {
      console.error("Update Transaction Status Error:", error);
      return { success: false, error: error.message };
    }
  };

  const getUserByUserId = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/getUserByUserId/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to fetch user");

      return { success: true, user: data.user };
    } catch (error) {
      console.error("Get User by UserId Error:", error);
      return { success: false, error: error.message };
    }
  };

  const fetchWalletAddress = async (addressId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/fetchWalletAddress/${addressId}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to fetch wallet address");

      return { success: true, walletAddress: data.walletAddress };
    } catch (error) {
      console.error("Fetch Wallet Address Error:", error);
      return { success: false, error: error.message };
    }
  };

  const fetchTasksByUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/users/fetchTasks/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch tasks");
      }

      const data = await response.json();
      console.log("Fetched tasks:", data.tasks);
      return data.tasks; // returns an array of tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return [];
    }
  };

  return (
    <UsersContext.Provider
      value={{
        user,
        submitNewUser,
        logout,
        isLoggedIn: !!user,
        loginUser,
        fetchProducts,
        createCombo,
        getAllCombos,
        getCombosByUser,
        updateCombo,
        deleteCombo,
        resetUserData,
        addWallet,
        getWallets,
        deleteWallet,
        updateWallet,
        updateTransactionStatus,
        transactions,
        getUserByUserId,
        fetchWalletAddress,
        fetchTasksByUser
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsersContext() {
  const context = useContext(UsersContext);
  if (!context) throw new Error("useUsersContext must be used within UsersProvider");
  return context;
}

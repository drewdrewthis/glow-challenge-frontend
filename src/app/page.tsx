// pages/create-user.tsx
"use client";

import { FormEvent, useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import { createUser } from "@/browser/lib/users";

const CustomContainer = styled(Container)`
  @apply mt-10;
`;

export default function CreateUser() {
  const [username, setUsername] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [error, setError] = useState<string | null>(null); // [1
  const [user, setUser] = useState<{
    username: string;
    balance: number;
  } | null>(null);

  const handleCreateUser = () => {
    setUser(null);
    setError(null);
    createUser({ username, tokenAmount: Number(tokenAmount) })
      .catch((err) => {
        console.error("ERROR", err);
        setError("Error creating user");
      })
      .then((result) => {
        if (result.error) {
          setError(result.error);
          return;
        }

        console.log("SUCCESS", result);
        setUser({
          ...result.user,
          ...result,
        });
      });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCreateUser();
  };

  return (
    <CustomContainer maxWidth="sm">
      <Box
        className="p-10 bg-white rounded mt-10 text-blue"
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Tokens"
          variant="outlined"
          type="number"
          value={tokenAmount}
          onChange={(e) => setTokenAmount(e.target.value)}
        />
        <Button
          variant="contained"
          className="w-full mt-5 bg-blue-500"
          type="submit"
        >
          Create User
        </Button>
      </Box>

      {error && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Error:</Typography>
          <Typography color="red">{error}</Typography>
        </Box>
      )}

      {user && (
        <Box
          sx={{ mt: 4, display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <Typography variant="h6">User Information:</Typography>
          <Typography>Name: {user.username}</Typography>
          <Typography>Token Balance: {user.balance}</Typography>
        </Box>
      )}
    </CustomContainer>
  );
}

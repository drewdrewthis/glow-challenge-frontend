// pages/create-user.tsx
"use client";

import { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const CustomContainer = styled(Container)`
  @apply mt-10;
`;

export default function CreateUser() {
  const [username, setUsername] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [user, setUser] = useState<{ name: string; tokens: number } | null>(
    null
  );

  const handleCreateUser = () => {
    if (!username || !tokenAmount) return;
    setUser({ name: username, tokens: parseInt(tokenAmount) });
  };

  return (
    <CustomContainer maxWidth="sm">
      <Box
        className="p-10 bg-white rounded mt-10 text-blue"
        component="form"
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
      </Box>
      <Button
        variant="contained"
        onClick={handleCreateUser}
        className="w-full mt-5"
        // color="inherit"
        // className="bg-blue-500"
      >
        Create User
      </Button>

      {user && (
        <Box
          sx={{ mt: 4, display: "flex", flexDirection: "column", gap: "8px" }}
        >
          <Typography variant="h6">User Information:</Typography>
          <Typography>Name: {user.name}</Typography>
          <Typography>Token Balance: {user.tokens}</Typography>
        </Box>
      )}
    </CustomContainer>
  );
}

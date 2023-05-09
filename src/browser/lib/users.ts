export async function createUser(data: {
  username: string;
  tokenAmount: number;
}) {
  return fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(data),
  }).then((res) => res.json());
}

export async function fetchUsers() {}

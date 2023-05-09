// pages/api/users/index.ts

// It is unclear what this is supposed to do
export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log("POST /api/users/[id]/deposits", params);
}

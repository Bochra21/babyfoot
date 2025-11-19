export async function createUser(username) {
  const response = await fetch('http://localhost:3000/babyfoot/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  });

  if (!response.ok) throw new Error(`Server error: ${response.status}`);
  return await response.json();


}

export async function getUserId(username) {
  const response = await fetch('http://localhost:3000/babyfoot/users/get-id', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  });

  if (!response.ok) throw new Error(`Failed to get user ID: ${response.status}`);
  const data = await response.json();
  return data.id; 
}
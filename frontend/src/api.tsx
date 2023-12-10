export async function getPosts(id: any = null) {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = id ? `${baseURL}/posts/${id}` : `${baseURL}/posts`;

    const response = await fetch(url); // Use the constructed URL here

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
}

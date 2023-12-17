import { redirect } from "react-router";

export async function getPosts(
  accessToken: string | null,
  skip: number,
  take: number
) {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}/api/posts?skip=${skip}&take=${take}`;

    const headers = {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      handleUnauthorized(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
}

export async function createPost(caption: string, tag: string) {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}/api/posts/`;
    const accessToken: string | null = localStorage.getItem("accessToken");

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        caption,
        tag,
      }),
    });

    if (!response.ok) {
      handleUnauthorized(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
}

export async function getUserPosts(
  accessToken: string | null,
  skip: number,
  take: number
) {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}/api/posts/user?skip=${skip}&take=${take}`;

    const headers = {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      handleUnauthorized(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
}

export async function authLogin(username: string, password: string) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const url = `${baseURL}/api/auth/login`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  return await response.json();
}

export async function createUser(id: number) {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = id ? `${baseURL}/api/users/${id}` : `${baseURL}/api/users`;

    const response = await fetch(url); // Use the constructed URL here

    if (!response.ok) {
      handleUnauthorized(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
}

export async function updateUser(
  id: number,
  name: string,
  username: string,
  email: string,
  file: any
) {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}/api/users/${id}`;
    const accessToken: string | null = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("email", email);

    if (file) {
      formData.append("file", file);
    }

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
}

export async function changePasswordUser(
  id: number,
  oldPassword: string,
  password: string
) {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}/api/users/changePassword/${id}`;
    const accessToken: string | null = localStorage.getItem("accessToken");

    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        oldPassword,
        password,
      }),
    });

    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
}

const handleUnauthorized = (response: any) => {
  if (response.status === 401) {
    localStorage.removeItem("accessToken");
    throw redirect(`/login`);
  }
};

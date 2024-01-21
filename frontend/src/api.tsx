import { redirect } from "react-router";

export async function getPosts(skip: number, take: number) {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const accessToken: string | null = localStorage.getItem("accessToken");
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
      throw await response.json();
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
}

export async function createPost(caption: string, tag: string, file: any) {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}/api/posts/`;
    const accessToken: string | null = localStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("tag", tag);

    if (file) {
      formData.append("file", file);
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      handleUnauthorized(response);
      throw await response.json();
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
}

export async function getUserPosts(skip: number, take: number) {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const accessToken: string | null = localStorage.getItem("accessToken");
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
      throw await response.json();
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

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      throw await response.json();
    }

    return await response.json();
  } catch (error) {
    console.error("Error auth login:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
}

export async function createUser(
  name: string,
  username: string,
  email: string,
  password: string,
  file: any
) {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}/api/users/`;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);

    if (file) {
      formData.append("file", file);
    }

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw await response.json();
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
      handleUnauthorized(response);
      throw await response.json();
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

    if (!response.ok) {
      handleUnauthorized(response);
      throw await response.json();
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
}

export async function CreateLike(postId: number, authorId: number) {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}/api/likes/`;
    const accessToken: string | null = localStorage.getItem("accessToken");

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        authorId,
        postId,
      }),
    });

    if (!response.ok) {
      handleUnauthorized(response);
      throw await response.json();
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching likes:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
}

export async function DeleteLike(postId: number, authorId: number) {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}/api/likes/`;
    const accessToken: string | null = localStorage.getItem("accessToken");

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        authorId,
        postId,
      }),
    });

    if (!response.ok) {
      handleUnauthorized(response);
      throw await response.json();
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching likes:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
}

const handleUnauthorized = (response: any) => {
  if (response.status === 401) {
    localStorage.removeItem("accessToken");
    throw redirect(`/login`);
  }
};

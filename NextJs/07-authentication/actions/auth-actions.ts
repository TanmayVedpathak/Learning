"use server";

import { redirect } from "next/navigation";

import { createAuthSession, destroySession } from "@/lib/auth";
import { hashUserPassword, verifyPassword } from "@/lib/hash";
import { createUser, getUserByEmail } from "@/lib/user";

export type AuthFormState = {
  message: string;
  errors?: {
    email?: string;
    password?: string;
  };
  enteredValues?: {
    email?: string;
  };
};

type AuthFormErrors = {
  email?: string;
  password?: string;
};

type SqliteError = {
  code?: string;
};

const getStringValue = (formData: FormData, key: string): string => {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
};

const isSqliteError = (error: unknown): error is SqliteError => {
  return typeof error === "object" && error !== null && "code" in error;
};

export async function signUp(prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = getStringValue(formData, "email");
  const password = getStringValue(formData, "password");

  const errors: AuthFormErrors = {};

  if (email.length === 0) {
    errors.email = "Email is required.";
  } else if (!email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (password.length === 0) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      message: "",
      errors,
      enteredValues: {
        email,
      },
    };
  }

  try {
    const hashedPassword = hashUserPassword(password);

    const id = createUser(email, hashedPassword);
    await createAuthSession(id);
  } catch (error: unknown) {
    if (isSqliteError(error) && error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        message: "",
        errors: {
          email: "User already exists.",
        },
        enteredValues: {
          email,
        },
      };
    }

    return {
      message: "",
      errors: {
        email: "Something went wrong.",
      },
      enteredValues: {
        email,
      },
    };
  }

  redirect("/training");
}

export async function logIn(prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = getStringValue(formData, "email");
  const password = getStringValue(formData, "password");

  const errors: AuthFormErrors = {};

  if (email.length === 0) {
    errors.email = "Email is required.";
  } else if (!email.includes("@")) {
    errors.email = "Please enter a valid email address.";
  }

  if (password.length === 0) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      message: "",
      errors,
      enteredValues: {
        email,
      },
    };
  }

  try {
    // verifyPassword(password);
    // await createAuthSession(id);
    const existingUser = getUserByEmail(email);

    if (!existingUser) {
      return {
        message: "",
        errors: {
          email: "Check credentials",
        },
      };
    }

    const isValidPassword = verifyPassword(existingUser.password, password);

    if (!isValidPassword) {
      return {
        message: "",
        errors: {
          password: "Check credentials",
        },
      };
    }

    await createAuthSession(existingUser.id);
  } catch (error: unknown) {
    if (isSqliteError(error) && error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        message: "",
        errors: {
          email: "User already exists.",
        },
        enteredValues: {
          email,
        },
      };
    }

    return {
      message: "",
      errors: {
        email: "Something went wrong.",
      },
      enteredValues: {
        email,
      },
    };
  }

  redirect("/training");
}

export async function auth(mode: string, prevState: AuthFormState, formData: FormData) {
  if (mode === "login") {
    return logIn(prevState, formData);
  }
  return signUp(prevState, formData);
}

export async function logout() {
  await destroySession();
  redirect("/");
}

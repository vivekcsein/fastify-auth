import { FastifyReply, FastifyRequest } from "fastify";
import { AuthError, Session, User } from "@supabase/supabase-js";

import {
  IUserProfileRoleType,
  IUserRegistration,
  IUserSignin,
  IUserSignup
} from "../../../types/users";

import {
  getUserByToken,
  getUserProfile,
  refreshTokenUser,
  registerUser,
  setUserToiLocalUser,
  signinUser,
  signoutUser
} from "./auth.helper";
import { getCookieExpiryInDays, getCookieExpiryInMinutes } from "../../../libs/utils/utils.app";

export const refreshTokenAuthController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const refreshToken = req.cookies.refreshtoken as string;
    // Defensive fallback for remember flag
    const remember =
      typeof req.body === "object" && req.body !== null && "remember" in req.body
        ? Boolean((req.body as { remember?: boolean }).remember)
        : false;

    if (!refreshToken) {
      return reply.status(401).send({ success: false, message: "Unauthorized", data: null });
    }

    const result = await refreshTokenUser({ refreshToken });
    const { session } = result.data as { session: Session };
    if (!session?.access_token || !session?.refresh_token) {
      return reply.status(500).send({
        success: false,
        status: "error",
        message: "Token generation failed",
        data: null,
      });
    }

    reply.cookie("accesstoken", session.access_token, {
      maxAge: remember ? getCookieExpiryInDays(1) : getCookieExpiryInMinutes(15),
    });
    reply.cookie("refreshtoken", session.refresh_token, {
      maxAge: remember ? getCookieExpiryInDays(30) : getCookieExpiryInDays(7),
    });

    return reply.status(200).send({
      success: true,
      message: "Tokens are refreshed successfully",
      data: null,
    });

  } catch (err: unknown) {
    const fallback = err as AuthError;
    throw {
      status: fallback?.status || 500,
      message: fallback?.message || "Unexpected error during refreshToken.",
    };
  }
};

export const profileAuthController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {

    const token = req.cookies.accesstoken as string;
    if (!token) {
      return reply.status(401).send({ success: false, message: "Unauthorized", data: null });
    }

    const user = await getUserByToken(token);

    const { email } = user;
    const userDatafromDB = await getUserProfile(email!);

    const currentUser = {
      id: userDatafromDB?.id,
      email: user.email,
      role: (userDatafromDB?.role ?? "USER") as IUserProfileRoleType,
      fullname: userDatafromDB?.fullname ?? "",
      avatar: userDatafromDB?.avatar ?? null,
      created_at: user.created_at,
      updated_at: user.updated_at,
      isUserVerified: user.user_metadata?.isUserVerified ?? false,
    };

    return reply.status(200).send({
      success: true,
      message: "User profile fetched successfully",
      data: currentUser,
    });
  } catch (err: unknown) {
    const fallback = err as AuthError;
    throw {
      status: fallback?.status || 500,
      message: fallback?.message || "Unexpected error during profile fetch.",
    };
  }
};

export const signinAuthController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { email, password, remember } = req.body as IUserSignin;
    const result = await signinUser({ email, password });
    const { user, session } = result.data as { user: User; session: Session };

    if (!session?.access_token || !session?.refresh_token) {
      return reply.status(500).send({
        status: "error",
        message: "Token generation failed",
        data: null,
      });
    }

    const userDatafromDB = await getUserProfile(email);

    reply.cookie("accesstoken", session.access_token, {
      maxAge: remember ? getCookieExpiryInDays(1) : getCookieExpiryInMinutes(15),
    });
    reply.cookie("refreshtoken", session.refresh_token, {
      maxAge: remember ? getCookieExpiryInDays(30) : getCookieExpiryInDays(7),
    });

    const currentUser = {
      id: userDatafromDB?.id,
      email,
      role: (userDatafromDB?.role ?? "USER") as IUserProfileRoleType,
      fullname: userDatafromDB?.fullname ?? "",
      avatar: userDatafromDB?.avatar ?? null,
      created_at: user.created_at,
      updated_at: user.updated_at,
      isUserVerified: user.user_metadata?.isUserVerified ?? false,
    };

    return reply.status(200).send({
      success: true,
      message: "User signed in successfully.",
      data: currentUser,
    });
  } catch (err: unknown) {
    const fallback = err as AuthError;
    throw {
      status: fallback?.status || 500,
      message: fallback?.message || "Unexpected error during authentication.",
    };
  }
};

export const signoutAuthController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await signoutUser();

    reply.clearCookie("accesstoken", { path: "/" });
    reply.clearCookie("refreshtoken", { path: "/" });

    return reply.status(200).send({
      success: true,
      message: "User signed out successfully",
      data: null,
    });
  } catch (err: unknown) {
    const fallback = err as AuthError;
    throw {
      status: fallback?.status || 500,
      message: fallback?.message || "Unexpected error during unauthentication.",
    };
  }
};

export const signupAuthController = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { email, password, fullname, terms } = req.body as IUserSignup;

    const result = await registerUser({ email, password, fullname, terms });

    if (!result.success) {
      return reply.status(result.statusCode).send({
        success: false,
        message: result.message,
        error: result.error,
      });
    }

    const { user } = result.data as { user: User; session: Session };

    const newUser: IUserRegistration = {
      user_id: user.id,
      email: email,
      fullname: fullname,
      role: "USER" as IUserProfileRoleType,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    await setUserToiLocalUser(newUser);

    return reply.status(result.statusCode).send({
      success: true,
      message: result.message,
      data: newUser,
    });

  } catch (err: unknown) {
    const fallback = err as AuthError;
    throw {
      status: fallback?.status || 500,
      message: fallback?.message || "Unexpected error during registration.",
    };
  }
};

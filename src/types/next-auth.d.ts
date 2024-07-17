import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    userName: string;
    phone: string;
    createdAt: Date;
    credit: number;
    avatar : string
  }

  interface Session {
    user: {
      [x: string]: string;
      id: string;
      email: string;
      userName: string;
      phone: string;
      createdAt: Date;
      credit: number;
      avatar : string;
      session : object?;

    };
  }

  interface JWT {
    id: string;
    email: string;
    userName: string;
    phone: string;
    createdAt: Date;
    credit: number;
    avatar : string

  }
interface UserSession {
  user: {
    id: number;
    email: string;
    name?: string;
    lastName?: string;
    phone?: string;
    userName?: string;
  };
}



}
import { Server as HTTPServer } from 'http';
import { Socket } from 'net';

declare module 'next' {
  interface NextApiResponse {
    end(): unknown;
    socket: Socket & {
      server: HTTPServer & {
        io?: any;
      };
    };
  }
}

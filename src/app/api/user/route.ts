import { NextResponse } from "next/server";
import {db} from "@/lib/db"
import { Phone, User } from "lucide-react";
import { hash } from "bcrypt";
import * as z from "zod"

// schema input validation 

const UserSchema = z.object({
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    phone: z.string().min(1,"Phone number is a must"),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have than 8 characters'),
    userName : z.string().min(1,"username is mandatory"),
    name : z.string().min(1,"name is mandatory"),
    lastName : z.string().min(1,"lastname is mandatory"),

  });
  
export async function POST ( req: Request){

    try {
        const body = await req.json();
        const {email,userName,password,phone,name,lastName} = UserSchema.parse(body);
        const hashedPassword = await hash(password, 10)
        const newUser = await db.user.create({
            data:{
                email:email,
                userName:userName,
                password:hashedPassword ,
                phone:phone,
                name:name,
                lastName:lastName 
            }
        })
        const {password : newUserPassword , ...rest} = newUser;
        return NextResponse.json({user : rest , message:"user created successfully" }, {status:201})
    } catch (error) {
        return NextResponse.json({message:"sorry"},{status:500})
    }
}



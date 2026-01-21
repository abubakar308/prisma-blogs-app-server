import { betterAuth, google } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: [process.env.APP_URL!],
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "USER",
                required: false
            },
            phone: {
                type: "string",
                required: false
            },
            status: {
                type: "string",
                required: false
                
            }
        }
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: true
    },
    emailVerification: {
        autoSignInAfterVerification: true,
        sendOnSignUp: true,
            sendVerificationEmail: async ( { user, url, token }, request) => {
          try{
                 const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`
              const info = await transporter.sendMail({
    from: '"Prisma Blogs" <prismablog@gmail.com>',
    to: user.email,
    subject: "Hello ✔",
    text: user.name, 
    html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
  </head>
  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: Arial, Helvetica, sans-serif;
    "
  >
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 40px 0">
          <table
            width="100%"
            max-width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
            "
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  background-color: #2563eb;
                  color: #ffffff;
                  padding: 20px;
                  text-align: center;
                "
              >
                <h1 style="margin: 0; font-size: 24px">
                  Prisma Blogs
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 30px; color: #333333">
                <h2 style="margin-top: 0">Verify your email address</h2>

                <p style="line-height: 1.6">
                  Thanks for creating an account with <strong>Prisma Blogs</strong>.
                  Please confirm your email address by clicking the button below.
                </p>

                <div style="text-align: center; margin: 30px 0">
                  <a
                    href="${verificationUrl}"
                    target="_blank"
                    style="
                      background-color: #2563eb;
                      color: #ffffff;
                      text-decoration: none;
                      padding: 12px 24px;
                      border-radius: 6px;
                      display: inline-block;
                      font-weight: bold;
                    "
                  >
                    Verify Email
                  </a>
                </div>

                <p style="line-height: 1.6; font-size: 14px">
                  If the button doesn’t work, copy and paste the following link
                  into your browser:
                </p>

                <p
                  style="
                    word-break: break-all;
                    font-size: 13px;
                    color: #2563eb;
                  "
                >
                  ${verificationUrl}
                </p>

                <p style="line-height: 1.6; font-size: 14px">
                  If you didn’t create this account, you can safely ignore this
                  email.
                </p>

                <p style="margin-top: 30px">
                  Regards,<br />
                  <strong>Prisma Blogs Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  background-color: #f1f5f9;
                  text-align: center;
                  padding: 15px;
                  font-size: 12px;
                  color: #6b7280;
                "
              >
                © 2026 Prisma Blogs. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`
  });
    } catch(error){
        console.error(error)
        throw error
    }
          },
    },

     socialProviders: {
        google: { 
            prompt: "select_account consent",
            accessType: "offline",
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
});
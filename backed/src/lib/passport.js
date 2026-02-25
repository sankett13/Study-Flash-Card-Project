import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { id: googleId, emails, name, photos } = profile;
        const email = emails[0]?.value;

        if (!email) {
          return done(new Error("No email found in Google profile"), null);
        }

        let user = await prisma.user.findUnique({
          where: { googleId },
        });

        if (!user) {
          user = await prisma.user.findUnique({
            where: { email },
          });

          if (user) {
            user = await prisma.user.update({
              where: { id: user.id },
              data: {
                googleId,
                provider: "google",
                firstName: name?.givenName,
                lastName: name?.familyName,
                avatar: photos[0]?.value,
              },
            });
          }
        }

        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              googleId,
              provider: "google",
              firstName: name?.givenName,
              lastName: name?.familyName,
              avatar: photos[0]?.value,
            },
          });
        }

        return done(null, user);
      } catch (error) {
        console.error("Google OAuth error:", error);
        return done(error, null);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        provider: true,
      },
    });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;

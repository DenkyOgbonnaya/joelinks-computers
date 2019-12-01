import express, { Router } from "express";
import cors from "cors";
import compression from "compression";
import session from "express-session";
import mongoDBSession from "connect-mongodb-session";
import passport from "passport";

const mongoDBStore = mongoDBSession(session);
const store = new mongoDBStore({
  uri: "mongodb://localhost:27017/joelinks",
  collection: "sessions"
})
store.on("error", err => console.log(err));

export const handleCors = (router: Router) =>
  router.use(cors({ credentials: true, origin: true }));

export const handleBodyRequestParsing = (router: Router) => {
  router.use(express.urlencoded({ extended: true }));
  router.use(express.json())
};

export const handleCompression = (router: Router) => {
  router.use(compression());
}
export const handleSession = (router: Router) => {
  router.use(session({
    secret: "openSecret",
    store,
    cookie: {
      maxAge: 86400000,
    },
    resave: false,
    unset: "destroy"
  }))
}
export const handlePassportInit = (router:Router) => {
  router.use(passport.initialize());
}
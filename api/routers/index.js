import { Router } from "express";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
} from "../../utils/firebase.js";

const router = Router();
const authRouter = Router();

authRouter.post("/register", (req, res) => {
  const { email, password } = req.body;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      // Signed in
      res.send({
        email: userCredentials.user.email,
        uid: userCredentials.user.uid,
        emailVerified: userCredentials.user.emailVerified,
      });
    })
    .catch((error) => {
      res.status(500).send({
        error: error.message,
        eroorCode: error.code,
      });
    });
});

authRouter.post("/login", (req, res) => {
  const { email, password } = req.body;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      // Signed in
      res.send({
        email: userCredentials.user.email,
        uid: userCredentials.user.uid,
        emailVerified: userCredentials.user.emailVerified,
      });
    })
    .catch((error) => {
      res.status(500).send({
        error: error.message,
        eroorCode: error.code,
      });
    });
});

authRouter.post("logout", (req, res) => {
  signOut(auth)
    .then(() => {
      res.send({
        message: "Logged out",
      });
    })
    .catch((error) => {
      res.status(500).send({
        error: error.message,
        eroorCode: error.code,
      });
    });
});

authRouter.post("/verification", (req, res) => {
  sendEmailVerification(auth.currentUser)
    .then(() => {
      res.send({
        message: "Verification email sent",
      });
    })
    .catch((error) => {
      res.status(500).send({
        error: error.message,
        eroorCode: error.code,
      });
    });
});

// Welcome
router.get("/", (req, res) => {
  res.send("Welcome to the JINA API AUTH With Firebase Auth");
});

router.use("/auth", authRouter);

export default router;

const { login, refreshToken, register } = require("../controllers/authController")
const { verifyToken } = require("../middlewares/authMiddleware")
const verifyRole = require("../middlewares/verifyRole")

const router=require("express").Router()
router.post("/register",register)
router.post("/login",login)
router.post("/refresh",refreshToken)

router.get("/admin",
    
    verifyToken,
    verifyRole("admin"),
     (req, res) => {
    res.json("Admin data");
  }
);

module.exports = router;

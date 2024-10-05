import {asyncHandler} from "../middlewares/asyncHandler.js";


const registerUser = asyncHandler(async (req, res) => {
    res.200.json({message: "User registered successfully"})
})

export {registerUser}
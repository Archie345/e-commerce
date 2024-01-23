const user = require("../Models/Users")
const jwt = require("jsonwebtoken")

exports.register = async (req,res,next) => {
  const { name, phone, email, password } = req.body
  // console.log(req.body)

  const _user = new user({
    name, email, phone, password
  })

  const eUser = await user.findOne({ email })

  if (!eUser) {
    _user.save().then(newUser => {
      req.subject = "User Registration"
      req.text = "You have successfully signed up"
      next()
      
    }).
      catch(error => {
        res.status(400).json({
          message: "Error Occured", error
        })
      })
  } else {
    res.status(400).json({
      message: "User Already Exist"
    })
  }

}
exports.login = async (req, res) => {
  const { email, password } = req.body

  const eUser = await user.findOne({ email })

  if (eUser) {

    if (eUser.authenticate(password)) {
      const token = jwt.sign({
        id: eUser._id
      }, "MyAPPSECRET", {
        expiresIn: "24h"

      })
      return res.status(200).json({ message: "Login Success", token, isSuccess: true })
    } else {

      return res.status(401).json({ message: "Unauthorized" })
    }
  } else {
    return res.status(404).json({ message: "user not found please sigup" })
  }
}

exports.findUser = async (req,res) =>{
  const user = await user.findBy(req.id)
  return res.status(200).json({user})
}
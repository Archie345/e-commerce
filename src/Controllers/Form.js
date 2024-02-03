const Form = require("../Models/Form")


exports.addForm = async(req,res) =>{
    try {
        <P>hiii</P>
        const _form = new Form(req.body);
        await _form.save()
        res.status(201).json({message:"Your form is submitted"})
    } catch (error) {
        res.status(400).json({message:"Error Occurred"})
    }
}

const User = require("../models/user");

const getAllUser = async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
<ul>
    ${allDbUsers
        .map((user) => `<li>${user.name} - ${user.email}</li>`)
        .join("")}
</ul>`;
    res.send(html);
};

const createNewUser = async (req, res) => {
    const body = req.body;

    const result = await User.create({
        name: body.name,
        email: body.email,
        phone: body.phone,
        college: body.college,
        semester: body.semester,
    });

    console.log(result);
    res.status(201).json(result);
};

const getTheUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.send(user);
};

const deleteTheUserById = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    console.log("Deleted");
    res.send(`Deleted user with id ${req.params.id}`);
};

module.exports = {
    getAllUser,
    createNewUser,
    getTheUserById,
    deleteTheUserById,
};

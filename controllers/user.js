import Users from "../models/users.js";





export const getUsers = async(req, res, next) => {
    try{
        var users = await Users.find();
        res.status(200)
           .setHeader('Content-Type', 'applictaion/json')
           .json(users)
    }catch(err){
        next(err);
    }
}


export const updateUser = async(req, res, next) => {
    try{
        const user = await Users.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true});
        res.status(200).setHeader('Content-Type', 'application/json');
        res.json(user);
    }catch(err){
        next(err)
    }
}


export const deleteUser = async(req, res, next) => {
    try{
      const user = await Users.findByIdAndDelete(req.params.id);
      res.status(200).setHeader('Content-Type', 'application/json');
      res.json({message: "User has been deleted"});
    }catch(err){
      next(err);
    }
  }
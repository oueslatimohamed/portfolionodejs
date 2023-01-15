import Portfolio from "../models/portfolio.js";

export function createPortfolio (req, res) {
    Portfolio.create({
        nom: req.user.nom,
        prenom: req.user.prenom,
        email: req.user.email,
        tel: req.user.tel,
        image: req.user.image,
        bio: req.user.bio,
        skills : req.body.skills,
        languages : req.body.languages,
        idowner: req.user._id
    })
    .then(newRdv => {
        res.status(200).json(newRdv);
    })
    .catch((err) => {
        res.status(500).json({error: err})
    })
}

export function getMyOwnerPortfolio (req,res) {
    Portfolio.findOne({idowner: req.user._id})
    .populate({
        path: "projects",
     })
    .then((p) => {
        res.status(200).json({portfolio : p});
    })
    .catch((err) => {
        res.status(500).json({error : err}) 
    })
}

export function updateMyPortfolio (req,res) {
    Portfolio.findOneAndUpdate({_id : req.params._id,idowner:req.user._id},req.body)
    .then((p) => {
        res.status(200).json({ message: "portfolio is updated !"});
    })
    .catch((err) => {
        res.status(500).json({ error: err});
    });
}

export function getallPortfolio (req,res) {
    Portfolio.find({idowner: req.user._id})
    .populate({
        path: "projects",
     })
    .then((p) => {
        res.status(200).json({portfolio : p});
    })
    .catch((err) => {
        res.status(500).json({error : err}) 
    })
}




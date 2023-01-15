import Rdv from "../models/portfolio.js";



export function getAllRdv(req,res) {
    Rdv.find()
    .populate({ path: 'idowner', select: 'nom prenom tel' })
    .then((rdvs) => {
        res.status(200).json({rdvs : rdvs});
    })
    .catch((err) => {
        res.status(500).json({error : err}) 
    })
}
export function getAllRdvEnAttente(req,res) {
    Rdv.find({status: "EnAttente"})
    .populate({ path: 'idowner', select: 'nom prenom tel' })
    .then((rdvs) => {
        res.status(200).json({rdvs : rdvs});
    })
    .catch((err) => {
        res.status(500).json({error : err}) 
    })
}

export function getAllRdvAccepted(req,res) {
    Rdv.find({status: "Accepte"})
    .populate({ path: 'idowner', select: 'nom prenom tel' })
    .then((rdvs) => {
        res.status(200).json({rdvs : rdvs});
    })
    .catch((err) => {
        res.status(500).json({error : err}) 
    })
}

export async function acceptRdv(req,res){
    try {
        const rdv = await Rdv.findOne({_id:req.params._id});
        rdv.status = "Accepte";
        rdv.save();
        res.status(200).json({message: "Rendez-vous accepted"});
    } catch (error) {
       return res.status(500).json(error);
    }
}

export async function rejectRdv(req,res){
    try {
        const rdv = await Rdv.findOne({_id:req.params._id});
        rdv.status = "Refuse";
        rdv.save();
        res.status(200).json({message: "Rendez-vous rejected"});
    } catch (error) {
        res.status(500).json(error);
    }
}
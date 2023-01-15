import Portfolio from "../models/portfolio.js";
import Project from "../models/project.js"

export async function addProject (req,res) {
    const portfolioid = req.params.id;
    const portfoliofound = await Portfolio.findById(portfolioid);
    if(!portfoliofound) {
        return res.status(404).json({error: "portfolio not found !"});
    }else {
        const project = await Project.create(req.body);
        project.portfolioId = portfolioid;
        const image =  await req.file.filename;
        await Portfolio.findByIdAndUpdate({
            _id: portfolioid
        },
        {
            $push: {
                projects: project._id,
            },
        }
    )
        project.image = `${req.protocol}://${req.get('host')}/img/${image}`;
        project.idowner = req.user._id
        await project.save();
        return res.status(200).json(project);  
    }
}
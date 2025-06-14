const express = require('express');
const Project = require('../../models/Projects');
const RecentActivity = require('../../models/recentActivity');
const router = express.Router();

router.put('/editProject/:id', async(req,res)=>{
    const {name, description, version, userId} = req.body;
    const id = req.params.id
    try {
        await Project.update({
            name,
            description,
            version},
            {where: {id} }
        )
        await RecentActivity.create({
            id_user: userId,
            action: `Atualizou o projeto: ${name}`,
            time: new Date(),
            status: 'pending    '
        })  
        res.status(200).json({message: 'Projeto atualizado com sucesso'})
    } catch (error) {
         res.status(500).json({message: error.message})
    }
})

module.exports = router;
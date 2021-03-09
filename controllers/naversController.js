import database from "../models/config/db";
import { Router } from 'express';
import {} from '../models/naversSchema'


const router = new Router();


router.get('/', async (req, res) => {
    try {
    const allNavers = await database.query("SELECT id,name, to_char(birthdate, 'YYYY-MM-DD') AS birthdate , to_char(admission_date, 'YYYY-MM-DD') AS admission_date, job_role FROM navers")
    res.json(allNavers.rows)
    } catch (error) {
        res.json("Não há navers cadastrados")
    }
  });

router.post('/', async  (req, res)=>{
    
        try{
            const {name, birthdate , admission_date , job_role,projects} = req.body
            
            const response = await database.query('INSERT INTO navers (name, birthdate , admission_date , job_role) VALUES ($1,$2,$3,$4) RETURNING *',
                [name, birthdate , admission_date, job_role])
                const id = response.rows[0].id
                for(let i = 0; i< projects.length ; i++){
                    await database.query('INSERT INTO projeto_navers (naver_id,projeto_id) VALUES ($1,$2) RETURNING *',
                    [id,projects[i]])
                    }  

                res.json(response.rows[0])
            
        }catch(err){
            res.json('Impossivel criar o naver, verifique se os projetos foram devidamente colocados ou se o projeto atribuido a ele realmente existe')
        }
});

router.get('/:id', async (req,res)=>{
    try{
    const {id} = req.params
    
    const naver = await database.query("SELECT id,name, to_char(birthdate, 'YYYY-MM-DD') AS birthdate , to_char(admission_date, 'YYYY-MM-DD') AS admission_date, job_role FROM navers WHERE id = $1",[id])
    const projeto_navers = await database.query('SELECT * FROM projeto_navers WHERE naver_id = $1',[id])
    const consulta = projeto_navers.rows 
    var projeto = []
    
    for(let i = 0; i< consulta.length ; i++){
       
        var proj = await database.query('SELECT * FROM projeto WHERE id = $1 ',
        [consulta[i].projeto_id])
 
        var projects = {}
       projects['id'] = proj.rows[0].id 
       projects['name'] = proj.rows[0].name
       projeto.push(projects)
    }  
       naver.rows[0]['projects'] = projeto
        res.json(naver.rows[0])

    }catch(err){
        res.json("Impossivel encontrar o naver solicitado")
    }

})


router.put('/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const {name, birthdate , admission_date , job_role} = req.body
        const updateNavers = await database.query('UPDATE navers SET name = $1, birthdate =$2 , admission_date = $3, job_role = $4 WHERE id = $5',
        [name, birthdate,admission_date,job_role,id])
        res.json(updateNavers)

    } catch (error) {
        
    }
})
    
        
router.delete('/:id', async (req,res)=>{
    try{
    const {id} = req.params
    
    const naver = await database.query('DELETE FROM navers WHERE id = $1',[id])
    
    res.json(naver.rows[0])
    }catch(err){
        res.send("Naver não deletado")
    }

})




export default router
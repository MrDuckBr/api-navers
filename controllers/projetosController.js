import database from "../models/config/db";
import { Router } from 'express';



const router = new Router();


router.get('/', async (req, res) => {
    try {
        const allProjetos = await database.query('SELECT * FROM projeto')
    res.json(allProjetos.rows) 
    } catch (error) {
        res.json("Não há projetos cadastrados")
    }
    
  });

router.post('/', async  (req, res)=>{  
  try{
        const {name, navers} = req.body
        
         const response = await database.query('INSERT INTO projeto (name) VALUES ($1) RETURNING *',
            [name])

            const id = response.rows[0].id

            for(let i = 0; i< navers.length ; i++){
            await database.query('INSERT INTO projeto_navers (naver_id,projeto_id) VALUES ($1,$2) RETURNING *',
            [navers[i],id])
            }  

    res.json(response.rows[0])
   }catch(err){
       res.json("Navers Inexistente, não há como atribui-lo a um projeto")
   }
   })



router.get('/:id', async (req,res)=>{
   
    try{
    const {id} = req.params
    
    const projetos = await database.query('SELECT * FROM projeto WHERE id = $1',[id])

    const projeto_navers = await database.query('SELECT * FROM projeto_navers WHERE projeto_id = $1',[id])
    const consulta = projeto_navers.rows 
    var navers = []
    
    for(let i = 0; i< consulta.length ; i++){
       
        var proj = await database.query("SELECT id,name, to_char(birthdate, 'YYYY-MM-DD') AS birthdate , to_char(admission_date, 'YYYY-MM-DD') AS admission_date, job_role FROM navers WHERE id = $1 ",
        [consulta[i].projeto_id])
 
        var navs = {}
        navs['id'] = proj.rows[0].id 
        navs['name'] = proj.rows[0].name
        navs['birthdate'] = proj.rows[0].birthdate
        navs['admission_date'] = proj.rows[0].admission_date
        navs['job_role'] = proj.rows[0].job_role
       navers.push(navs)
    }  
       projetos.rows[0]['navers'] = navers

     res.json(projetos.rows[0])
    }catch(err){
        res.json("Projeto não encontrado")
    }

})


router.put('/:id', async (req,res)=>{
    try {
        const {id} = req.params;
        const {name} = req.body
        const updateProjeto = await database.query('UPDATE projeto SET name = $1',
        [name])
        res.json(updateProjeto)

    } catch (error) {
        
    }
})
    
        
router.delete('/:id', async (req,res)=>{
    try{
    const {id} = req.params
    
    const projetos = await database.query('DELETE FROM projeto WHERE id = $1',[id])
    
    res.json(projetos.rows[0])
    }catch(err){
        res.json("Projeto não deletado")
    }

})






export default router
import database from "../models/config/db";
import { Router } from 'express';



const router = new Router();


router.get('/', async (req, res) => {
    const allProjetos = await database.query('SELECT * FROM projeto')
    res.json(allProjetos.rows)
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
       console.log(err) 
   }
   })



router.get('/:id', async (req,res)=>{
    console.log('cheguei aqui')
    try{
    const {id} = req.params
    console.log(id)
    const projetos = await database.query('SELECT * FROM projeto WHERE id = $1',[id])
    res.json(projetos.rows[0])
    }catch(err){
        console.log(err)
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
    console.log(id)
    const projetos = await database.query('DELETE FROM projeto WHERE id = $1',[id])
    console.log(projetos)
    res.json(projetos.rows[0])
    }catch(err){
        console.log(err)
    }

})






export default router
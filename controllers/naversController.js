import database from "../models/config/db";
import { Router } from 'express';
import {} from '../models/naversSchema'


const router = new Router();


router.get('/', async (req, res) => {
    const allNavers = await database.query('SELECT * FROM navers')
    res.json(allNavers.rows)
  });

router.post('/', async  (req, res)=>{
    
        try{
            const {name, birthdate , admission_date , job_role,projetos} = req.body
            const response = await database.query('INSERT INTO navers (name, birthdate , admission_date , job_role) VALUES ($1,$2,$3,$4) RETURNING *',
                [name, birthdate , admission_date, job_role])
                const id = response.rows[0].id
                for(let i = 0; i< projetos.length ; i++){
                    await database.query('INSERT INTO projeto_navers (naver_id,projeto_id) VALUES ($1,$2) RETURNING *',
                    [id,projetos[i]])
                    }  

                res.json(response.rows[0])
        }catch(err){
            console.log(err)
        }
});

router.get('/:id', async (req,res)=>{
    console.log('cheguei aqui')
    try{
    const {id} = req.params
    console.log(id)
    const naver = await database.query('SELECT * FROM navers WHERE id = $1',[id])
    console.log(naver)
    res.json(naver.rows[0])
    }catch(err){
        console.log(err)
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
    console.log(id)
    const naver = await database.query('DELETE FROM navers WHERE id = $1',[id])
    console.log(naver)
    res.json(naver.rows[0])
    }catch(err){
        console.log(err)
    }

})




export default router
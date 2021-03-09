import express, { Router, json} from "express";
import { navers, projetos } from './controllers';
import cors from "cors";

const app = express();
//app.use(cors())
app.use(json())

app.use('/navers', navers );
app.use('/projetos', projetos);

app.get('/', async (req, res)=>{
    console.log(req.body)
})


app.listen(3000,()=>{
    console.log(`Servidor rodando no link http://localhost:3000`)
})



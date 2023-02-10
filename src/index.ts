import express, { Request, Response} from 'express'
import cors  from 'express'

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

app.get("users/signup")
//todas as informações do usuário

app.get("users/login")
//informações públicas do usuário

app.get("/posts")

app.post("/post")

app.put("/post")

app.delete("/post")

app.get("/post/:like_dislikes")
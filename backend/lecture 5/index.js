import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { title } from 'process';

const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res)=>{
    const today = new Date();
    const day = today.getDay();
    let type = "weak day";
    let advice = "it's time to work";
    const data = {
        title: "EJS Tags",
        seconds: new Date().getSeconds(),
        items: ["apple", "banana", "cherry"],
        htmlContent: "<strong>This is some strong text</strong>",
    };

    if(day == 5 || day == 6){
        type="weak end";
        advice="it's time to fun"
    }
    
    res.render("index.ejs",{
        type: type,
        advice: advice,
        title: data.title,
        seconds: new Date().getSeconds(),
        items: data.items,
        htmlContent: data.htmlContent,
    })
})

app.listen(port, () =>{});
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080

app.use(express.json());
app.options('*', cors());
app.use(cors({credentials:true, origin: 'http://localhost:4200'}))

app.get('/', (req:any, res:any) => {
    res.status(200).send('hurray! app is working!.');
})


app.listen(PORT, (err:any) =>{
    if(err) throw err ;
        console.log(`app listening on port ${PORT}`);
} );
const express = require('express');
const app = express();
const env=require('dotenv');
env.config()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const fs = require('fs');

const cors=require('cors');
app.use(cors());

//*show api :
app.get('/', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(401).json({ message: 'error internal server' });
        }
        else {
            res.status(200).json({message:"api is working.."});
        }
    })
})
//*show api:
app.get('/api/show',(req,res)=>{
    fs.readFile('./data.json','utf-8',(err,data)=>{
         if (err) {
            console.log(err);
            res.status(401).json({ message: 'error internal server' });
        }
        else {
            res.status(200).json(JSON.parse(data)??[]);
        }

    })
})
//*get request :
app.get('/api/get', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(401).json({ message: 'cannot read get request' });
        }
        else {
            const querydata = req.query;
            const objdata = JSON.parse(data) || [];
            objdata.push(querydata);
            fs.writeFile('./data.json', JSON.stringify(objdata), (err) => {
                if (err) {
                    console.log(err);
                    res.status(401).json({ message: 'cannot read get request' });
                }
                else {
                    console.log(`Get request done`);
                    res.status(200).json({ message: 'get request sucessfull' });
                }
            })
        }
    })
})
//*post request :
app.post('/api/post', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(401).json({ message: 'cannot read post request' });
        }
        else {
            const fromdata = req.body;
            const objdata = JSON.parse(data) || [];
            objdata.push(fromdata);
            fs.writeFile('./data.json', JSON.stringify(objdata), (err) => {
                if (err) {
                    console.log(err);
                    res.status(401).json({ message: 'cannot read post request' });
                }
                else {
                    console.log(`Get request done`);
                    res.status(200).json({ message: 'post request sucessfull' });
                }
            })
        }
    })
})
//*put request :
app.put('/api/put/:id', (req, res) => {
    let id = req.params.id;
    let name = req.body.name;
    let email = req.body.email;
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
            res.status(401).json({ message: 'cannot find put request' });
        }
        else {
            const users = JSON.parse(data) || [];
            const user = users.find(item => item.id === id);
            if (!user) {
                console.log(`no user find this ${id}`);
                res.status(404).json({ message: `cannot find ${id} this user` })
            }
            user.name = name;
            user.email = email;
            fs.writeFile('./data.json', JSON.stringify(users), (err) => {
                if (err) {

                }
                else {
                    console.log(`put request sucessfull ${id}`);
                    res.status(200).json({ message: `put request sucessfull ${id}` });
                }
            })
        }
    })
})
//*Delete :
app.delete('/api/delete/:id', (req, res) => {
    let id = req.params.id;
    fs.readFile('./data.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            const users = JSON.parse(data) || [];
            const index = users.findIndex(item => item.id === id);
            if (index === -1) {
                console.log('user no found');
                res.status(400).json({ message: `user no found id ${id}` });
            }
            users.splice(index, 1);
            fs.writeFile('./data.json', JSON.stringify(users), (err) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ message: `Delete the user ${id}` });
                }
                else {
                    res.set('Content-Type', 'application/json');
                    res.status(200).json({ message: `user is deleted id no ${id}` });
                }
            })
        }
    })
})
app.listen(process.env.PORT, () => {
    console.log(`Running the port no `);
})
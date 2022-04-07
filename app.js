const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https= require('https');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("static"));

app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/signup.html");
});
app.post('/', (req,res)=>{
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var email = req.body.email;
    const data = {
        members : [
            {
                'email_address' : email,
                'status': 'subscribed',
                'merge_fields':{
                    FNAME:firstName,
                    LNAME : lastName
                }
            }      
        ]
        
    }
    const jsonData = JSON.stringify(data);
    url = 'https://us14.api.mailchimp.com/3.0/lists/722b46ff67'
    options = {
        method : 'POST',
        auth:'soumya:d6503a064aec956bf87056033d5613a6-us14'
    }
    const request = https.request(url,options,(response)=>{
        response.on('data',(data)=>{
            console.log(JSON.parse(data));
        })
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
    })
    
    request.write(jsonData);
    request.end();
}) 

app.post('/failure',(req,res)=>{
    res.redirect('/')
} )

app.listen(process.env.PORT || 3000,()=>{
    console.log('Server is running');
})
// api Key
// d6503a064aec956bf87056033d5613a6-us14
// audience id
// 722b46ff67
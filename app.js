import express from 'express'
import fetch from "node-fetch"


const app = express();
const PORT = 3000;

fetch('https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json') 
    .then(res => res.json())  
    .then(dentalClinicsData => {
        app.get("/dental-clinics", async (req, res) => {
            try{
              const userQuery = await req.query;
                  const filteredClinics = await dentalClinicsData.filter((info)=>{
                      let isValid = true;
                      for(key in userQuery) {
                          isValid = isValid && info[key] === userQuery[key];
                      }
                      return isValid;
                  });
                  res.json({data: filteredClinics})
            }catch(err){
              res.send(err.message)
            }
          });
        });

fetch('https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json')
    .then(res => res.json())
    .then(VetClinicsData => {
        app.get("/vet-clinics", async (req, res) => {
            try{
              const userQuery = await req.query;
                  const filteredClinics = await VetClinicsData.filter((info)=>{
                      let isValid = true;
                      for(key in userQuery) {
                          isValid = isValid && info[key] === userQuery[key];
                      }
                      return isValid;
                  });
                  res.json({data: filteredClinics})
            }catch(err){
              res.send(err.message)
            }
          });
        });

app.listen(3000, () => `Server started at port ${PORT}`)
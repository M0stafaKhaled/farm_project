

 const file = require('fs');
 const http = require('http');
 const url = require('url');
 const  replaceTemplate = require('./module/replaceTemplate.js');

 /////////////////////////////////////////////////////////////////////
 //block way 
// const text = file.readFileSync('text/input.txt','utf-8');
// console.log(text);

// const textOut = `edite from text out ${text}.\n  create on${Date.now()} `;
// file.writeFileSync('text/output.txt', textOut);
// const text2 = file.readFileSync('text/output.txt','utf-8');
// console.log(text2);

///////////////////////////////////////////////////////////////////
// asynchronus way


// file.readFile('start.txt','utf-8',(error,data)=>{

// console.log(data+"\n");

// });
// console.log("before \n");

// file.readFile('start.txt','utf-8',(error,data1)=>{
//              file.readFile(`${data1}.txt`,'utf-8',(error,data2)=>{

//                         console.log(data2);

//                       file.writeFile('final.txt',data2,'utf-8',error => {

//                                  console.log("done");
//                             });




        
//         });
// });

////////////////////
//server
///////////////

const data  = file.readFileSync('dev-data/data.json','utf-8');
const template = file.readFileSync("templates/template-overview.html","utf-8");
const tempCard = file.readFileSync("templates/card.html","utf-8");
const tempProduct = file.readFileSync("templates/product.html","utf-8");
const dataJson = JSON.parse(data);
const  server = http.createServer((req,res)=>{

    
    const {query,pathname} = url.parse(req.url,true);
    if(pathname === "/" || pathname==="/overView"){
        res.writeHead(200,{'Content-type':'text/html'});
        const card = dataJson.map(el=>replaceTemplate(tempCard,el)).join('');
        const output = template.replace("{%CARDNAME%}",card);
        
        
        res.end(output);}
    
    else if(pathname==="/product"){  
        res.writeHead(200,{'Content-type':'text/html'});
        const pro = dataJson[query.id];
        const output = replaceTemplate(tempProduct,pro);
        res.end(output);
    }
    else if(pathname==="/api"){
        res.writeHead(200,{'Content-type':'application/json'});
        res.end(data);
    }
      
        else{
            res.writeHead(404,{

                'Content-type':'text/html'
            });
            res.end("<h1>page not found</h1>");
        }
   
})

server.listen(9000,'127.0.0.1',()=>{

console.log("listen from port 9000");

});

import http from "http";
const PORT=3000;

const server=http.createServer((req,res)=>{
  console.log(req.method);
    console.log(req.url);
  if (req.url==="/"){
    res.writeHead(200, {
            "Content-Type": "text/plain",
        });
    res.end("Welcome to Cairo Metro Control — Line 3");
    return;
  }
  if (req.url==="/next-train"){
    const trainArrivalTime=new Date().toLocaleString();
    res.writeHead(200, {
            "Content-Type": "text/plain",
        });
    res.end(`next train arrival: ${trainArrivalTime}`);
    return;
  }
  res.writeHead(404, {
            "Content-Type": "text/plain",
        });
    res.end("Platform not found");
    return;
});

server.listen(PORT,()=>{
  console.log(`listening on port: ${PORT}`)
});

in the express we get the data on the server which sent by the client so i use the `req.body` but sometime i sent the file from client to server that i cant access the data using the `req.body`
so handle the file data which is sent from the client so i use the external package like `multer` and receive the data on the server using the `req.files or req.file`



actually multer pahale files ko local sever par store karta hai and waha se files ko server par ya list cloud storage par upload karte hai and baad main local server se files ko delete kar dete hai 

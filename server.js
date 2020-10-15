const express = require('express')
const next = require('next')
///const generator = require('./generator')
const port = parseInt(process.env.PORT, 10) || 8080
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
var bodyParser = require('body-parser');
const rewrite = require('express-urlrewrite');
var config = require('./config/config');
const baseUrl = config.RESOURCE_PATH;

// var uploadRootPath = config['current'].UPLOAD_PATH;
// console.log("current upload root path"  + uploadRootPath);
// var fileupload = require('./utils/fileupload').fileupload;

// let KcAdminClient = require('keycloak-admin').default;
// let openid_client = require('openid-client');
// let Issuer = openid_client.Issuer;
// let adminClient = require('keycloak-admin-client');
// //let kcAdminClient = new KcAdminClient();
// console.log(KcAdminClient);
// //var config = require('./config/config');

// //let resourcePath = config['current'].RESOURCE_PATH;
// //let resPath = "" + resourcePath + "/_next";

// let opt = {
//      baseUrl: 'http://auth.e-healthcare.net/auth',
//      realmName: 'master', 
//   }

//   let kcAdminClient = new KcAdminClient(opt);
// async function test(){
//   await kcAdminClient.auth({
//     username: 'admin',
//     password: 'admin',
//     grantType: 'password',
//     clientId: 'admin-cli',
//   });
//   kcAdminClient.setConfig({
//     realmName: 'healthcare',
//   });

//   kcAdminClient.users.create({
//     realm: 'healthcare',
//     username: 'username33',
//     email: 'user345@example.com',
//     firstName: 'The first name',
//     lastName: 'The last name',
   
//   }).catch((exx)=>{console.log(exx)});
// }
  
//  test();
//   let settings = {
//     baseUrl: 'http://auth.e-healthcare.net/auth',
//     username: 'admin',
//     password: 'admin',
//     grant_type: 'password',
//     client_id: 'admin-cli'
//   };

//   adminClient(settings)
//   .then((client) => {
//   //console.log('client', client);
//   const testUser = {
//     username: 'a@nothing.dev',
//     firstName: 'The first name',
//     lastName: 'The last name',
//     email: 'a@nothing.dev'
//   };

//   client.users.create("healthcare", testUser).then((user)=>{
//      console.log(user);
//   }).catch((ex)=>{console.log(ex)});

//   })
//   .catch((err) => {
//     console.log('Error', err);
//   });

//   Issuer.discover(
//     'http://auth.e-healthcare.net/auth/realms/healthcare',
//   ).then((kissuer)=>{
//     const client = new kissuer.Client({
//       client_id: 'health-manager', 
//       client_secret:'6ac03c55-3d4c-40dd-a89e-1adfe10fc9e0'
//     });
//    client.grant({
//       grant_type: 'password',
//       username: '379163259@qq.com',
//       password: '123456',
//     }).then((tokens)=>{
//       console.log(tokens);
//     });
//   })
//   // KcAdminClient(opt).then((client)=>{ console.log(client)

//   // });
 

app.prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(bodyParser.json());
    //server.use('/images',express.static(uploadRootPath));
    //server.use(rewrite(/^\/coder\/?(.*)/,'/$1'));
    // server.get('/a', (req, res) => {
    //   return app.render(req, res, '/b', req.query)
    // })
    //server.use(function (req, res, next) {
      //req.url = req.originalUrl.replace('MedicalLive/_next', '_next');
      //req.url = req.originalUrl.replace(resPath, '_next');
      //next(); // be sure to let the next middleware handle the modified request. 
    //});

    // server.post('/profile', fileupload.single('avatar'), function (req, res, next) {
    //   // req.file is the `avatar` file
    //   // req.body will hold the text fields, if there were any
    //   console.log('[upload filename:' + JSON.stringify(req.file) + "]");
    //   res.json({
    //     code: true,
    //     filename: req.file.filename,
    //     path: "/images/" + req.file.filename,//req.file.path,
    //     msg: '上传成功'
    //   });
    // });

    server.get('/testsignup', (req, res) => {
      console.log(req.body);
      res.sendStatus(200)
    });

    server.get('/test', (req, res) => {
      console.log(req.body);
      res.sendStatus(200)
    });
    

    server.get('/posts/:id', (req, res) => {
      console.log('poes');
      return app.render(req, res, '/posts', { id: req.params.id })
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.get(`*`, (req, res) => {
      if(req.path == baseUrl)  res.redirect(301, `${baseUrl}/index`);
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })

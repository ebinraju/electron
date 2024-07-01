// main.js
const { app, BrowserWindow } = require('electron');
const express = require('express');
const path = require('path');
const cors = require("cors");
const bodyParser = require('body-parser');
// require('dotenv').config();
// const router = require ('./dist/routes/index.js');
// const { initializeSchedules } = require('./dist/utils/scheduler.js');
// const sequelize = require('./dist/data/db.js'); // The Sequelize instance

// const masterDataRoutes = require('masterData/api1/src/routes/index');
// const crewlistRoutes = require('crewlist/api2/src/routes/index');


const serverApp = express();
const PORT = 3001;
let mainWindow;

async function startServer() {
   const serverpath =  path.join(__dirname, '../dist/server.js');// await import(path.resolve(__dirname, '../dist/routes/index.js'));
   const abc = require(serverpath);
    // Initialize server or perform any server related setup here if needed
    // console.log('Server module loaded:', server);
  // serverApp.use('/api', routes);
  // serverApp.use('/api2', routes2);
  // sequelize.sync({ alter: true }) // Use { alter: true } cautiously in dev only
  // .then(() => {
  //   console.log('Database synchronized');
  // })
  // .catch((error) => {
  //   console.error('Failed to synchronize database:', error);
  // });

// initializeSchedules().catch(console.error); // Start the scheduler
  serverApp.get('/api/crew', (req, res)=>{
    res.status(200).send({message:"server api response from electron test", path: serverpath, dir: __dirname})
  });

// const routerPath = path.join(__dirname, '../dist/route/index.js');
// const frontendPath = path.join(__dirname, '../build');
// serverApp.use(express.static(serverpath));
  
  // serverApp.use('/', serverpath);
//   app.use('/api', crewlistRoutes);
  const frontendPath = path.join(__dirname, '../build');
  serverApp.use(express.static(frontendPath));
  serverApp.get('*', (req, res) => {
      res.sendFile(path.join(frontendPath, 'index.html'));
  });
  serverApp.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
  });
}

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon:'./logo.svg',
    webPreferences: {
      // preload:path.join(__dirname,'../build/index.html'),
      contextIsolation:false,
      nodeIntegration: true
    }
  });
  win.loadURL("http://localhost:3001");
  win.webContents.openDevTools();
  // win.loadFile('../build/index.html');
}
serverApp.use(cors());
serverApp.use(bodyParser.json());
try {
  // const basePath = app.getAppPath();
  // console.log('zzzzzzzz', basePath);
  // const crewRoutes = path.join(basePath, 'dist', 'crewRoutes'); 
  // serverApp.use('/api', routes);
} catch(e){
  console.log('ggggg', e);
}
// serverApp.get('/api/crew', (req, res)=>{
//   res.status(200).send({message:"server api response from electron test"})
// });
// serverApp.get('/', (req, res)=>{
//   res.status(200).send({message:"started"})
// })
// serverApp.listen(PORT,()=>{
//   console.log(`server listen at port ${PORT}`);

// });
app.on('ready', ()=>{
  startServer();
})
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

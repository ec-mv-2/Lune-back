import {app, server} from '../src/App'


server.listen(3333, ()=>{
    console.log(`Server started at http://localhost:3333`);
})
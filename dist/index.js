"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");

const KEY = process.env['KEY'];
const imdb = require('imdb-api');
const cli = new imdb.Client({apiKey: KEY});



const discord_js_1 = require("discord.js");
const config_1 = tslib_1.__importDefault(require("./config"));
const commands_1 = tslib_1.__importDefault(require("./commands"));
const { intents, prefix, token } = config_1.default;
const client = new discord_js_1.Client({
    intents,
    presence: {
        status: 'online',
        activities: [{
                name: `${prefix}help`,
                type: 'LISTENING'
            }]
    }
});
client.on('ready', () => {
    console.log(`Logged in as: ${client.user?.tag}`);
});



    
 
  

client.on('messageCreate', async (message) => {
    if (message.author.bot)
        return;
    if (message.content.startsWith(prefix)) {
      try{
        console.log(message.content);
        const args = message.content.slice(prefix.length).split(' ');
        console.log(args);
        const command = args.shift();
        let str = '';
        
        
        for(let i = 0; i<args.length; i++){
          str = str.concat(args[i].concat(' '));
        }
        str = str.trim()
     
        // const jsn = {'name':  '\''+str+'\''};
     
        switch (command) {
            case 'movie':
              try{
                
                let mvs = "Movies: ";
                
                
                const promise1 = cli.search({'name': str.trim() }).then((search) => {
                  try{
                      console.log("1");
                      let index = 0;
                      for (const result of search.results) 
                        {
                        console.log(result);
                        if(index==5){break;}
                        var string = "\n"+(result.title + result.year + " https://www.2embed.ru/embed/imdb/movie?id="+result.imdbid);
                        
                        mvs = mvs +string;
                        console.log(mvs);
                        index++;
                      }
                    
                      message.reply( mvs);
                     
                    
                    }catch(error){message.reply("movie not ound ig? idk what this error is yet bare with me jsut try again." + error);}
                    
                    });  
                promise1.catch((error) => {
                  message.reply("movie not found ig? idk what this error is yet bare with me jsut try again." + error);
                });
                                                                
                // console.log(getMovie(str));
                // let movies = getMovie(str);
                // message.reply(movies);
              }catch(error){
                console.log(error);
                
              }
            break;
          case 'show':
          
            
            const promise2 = imdb.get({name: str}, {apiKey: KEY}).then((things) => {
                return things.episodes()
            }).then((eps) => {
              const promise3 = cli.search({'name': str.trim() }).then((search) => {
                for (const result of search.results){
                  console.log(result);
                  if(result.type === "series"){
                    console.log("yesssssssss" + result.imdbid);
                    var id = result.imdbid;
                    var name = result.title;
                    message.reply(eps[0].name);
                    var mesg = "";
                    for(let i = 0; i<eps.length;i++){
                      // message.reply("Name: "+eps[i].name + "\n"+"Season: "+eps[i].season + "\n"+"Episode: "+eps[i].episode + "\n"+"Imdbid: "+eps[i].imdburl + "\n"+"Rating: "+eps[i].rating + "\n");
                      // message.reply("[Link] (https://www.2embed.ru/embed/imdb/tv?id="+id+"&s="+eps[i].season+"&e="+eps[i].episode+")")
                      var temp = "Name: "+eps[i].name + "\n"+"Season: "+eps[i].season + "\n"+"Episode: "+eps[i].episode + "\n"+"Imdbid: "+eps[i].imdburl + "\n"+"Rating: "+eps[i].rating + "\n" + "[LINK]>(https://www.2embed.ru/embed/imdb/tv?id="+id+"&s="+eps[i].season+"&e="+eps[i].episode+")";
                      console.log(mesg.length);
                      if(mesg.length + temp.length > 1900){
                        message.author.send(mesg);
                        mesg = "";
                      }
                      else{
                        mesg = mesg +  "\n" + temp;
                      }
                    }
                    message.author.send(mesg);
                    break;
                  }
                }

              });
              
                
            
                
                
            });
                 
                    
                    
                    
               
            promise2.catch((error) => {
              message.reply("movie not found ig? idk what this error is yet bare with me jsut try again." + error);
            });
            
          
           
            
           
            break;
        }
        



        
      }catch(error){
        message.reply("movie not ound ig? idk what this error is yet bare with me jsut try again." + error);
      }
      
        
    }
});
client.login(token);
//# sourceMappingURL=index.js.map
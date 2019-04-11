(function () {
    var socket = io();
    document.querySelector('.form').addEventListener("submit", function (e) {
        e.preventDefault();
        socket.emit('chat message', document.querySelector('#m').value);
        document.querySelector('#m').value = "";
        return false;
    });

    document.querySelector('.username').addEventListener("submit", function (e) {
        e.preventDefault();
        let naam = document.querySelector('#nam').value;
        socket.emit('set user', naam);
    });

    socket.on('set user', function (data) {
      console.log('something for nickname')
      console.log(data.gamerTag)
      const pi = document.createElement("p");
      const status = document.createTextNode(data.gamerTag + " joined the game");
      pi.appendChild(status);
console.log(pi)
      document.querySelector('#status').appendChild(pi);
      // document.querySelector('.username').appendChild(pi);
      document.querySelector('.username').classList.add('hidden');
      document.querySelector('body').classList.remove('start');
      document.querySelector('.main').classList.remove('hidden');
    })
    socket.on('chat message', function (data) {
        // console.log(msg);
        const li = document.createElement("li")
        const forbiddenWords = {
        name:"Steve",
        hello:"Greetings fellow crafter, are you also looking for rare minerals?",
        hallo:"Greetings fellow GaymeR, are you having fun?",
        hoi:"Howdy Partner 🤠",
        hey:"Hey sexy",
        Tjebbe:"Minecraft_boi420_420",
        tjebbe:"minecraft_boi69_420",
        yes:"Absolutely",
        Tim:"My Lordt",
        tim:"my sweet cowboy",
        lit:"oof ouch that's hot",
        no:"No u",
        haha:"pass me the pickaxe bro"
        }

        let n = data.message.replace(/name|hello|hallo|hoi|hey|Tjebbe|tjebbe|yes|no|lit|Tim|tim|haha/gi, function(matched){
          return forbiddenWords[matched];
        });

        console.log(n)

        const msgtext = document.createTextNode(data.gamerTag + ": "+ n);
        li.appendChild(msgtext);
        // if(msgtext.indexOf("fruit")){
console.log(msgtext);
// };
        document.querySelector('#messages').appendChild(li);
    });

    socket.on('creeps', function() {
        const container =  document.querySelector('#messages');
        console.log('fckn creepers!');

        function styleBlow() {
          container.classList.add("blow")
        }
        styleBlow();
        setTimeout(remover, 2000);
        function remover(){
        container.innerHTML = "";
        container.classList.remove("blow")
}
    })

    socket.on('connect', function(){
        console.log('connectingt');
    });
    socket.on('disconnect', function(){
        console.log('disconnectingt');
    });
}());

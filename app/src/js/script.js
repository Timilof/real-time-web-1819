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
    socket.on('set user', function (name) {
console.log('something for nickname')
console.log(name)
    })
    socket.on('chat message', function (msg) {
        // console.log(msg);
        const li = document.createElement("li")
        let forbiddenWords = {
        name:"Steve",
        hello:"Greetings fellow crafter, are you also looking for rare minerals?",
        hallo:"Greetings fellow crafter, are you also looking for rare minerals?",
        hoi:"Greetings fellow crafter, are you also looking for rare minerals?",
        hey:"Greetings fellow crafter, are you also looking for rare minerals?",
        Tjebbe:"Tjebbe (who loves Minecraft)",
        yes:"Absolutely",
        no:"No u"
        }

        let n = msg.replace(/name|hello|hallo|hoi|hey|Tjebbe|yes|no/gi, function(matched){
          return forbiddenWords[matched];
        });

        console.log(n)

        const msgtext = document.createTextNode(n);
        li.appendChild(msgtext);
        document.querySelector('#messages').appendChild(li);
    });

    socket.on('creeps', function(msg) {
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

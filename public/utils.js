// pour différencier les évènements en fonction des urls
const path = window.location.pathname;


/**
 * envoie/reçoit les données au/du serveur en ajax
 * 
 * @param {object} data un json à envoyer au serveur
 * @param {string} url  le path de la page
 * @returns {void} 
 */
async function ajax(data, url) {
    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }   
    })
    .then((response) => {
        if (response.status === 201) {
            response.json()
            .then(res => {
                addHtml(res.message);
                document.getElementById("exempleTextarea").value = "mon message !";
            })
        }
    })
    .catch((error) => console.log({error}));
}




if (path === "/api") {

    // functions

    /**
     * recrée les messages de "tchat" avec le style
     * 
     * @param {array} array qui contient des json
     */
    function addHtml(array) {
        let affichageMessages = document.getElementById('messages');
        affichageMessages.innerHTML = "";
        for (let i=0 ; i< array.length ; i++) {
            let myDiv = document.createElement("div");
            let myDiv2 = document.createElement("div");
    
            myDiv.classList.add("qui");
            myDiv2.classList.add("blog");
    
            myDiv.innerText = array[i].nom + "   " + array[i].prenom;
            myDiv2.innerText = array[i].message;
    
            affichageMessages.appendChild(myDiv);
            affichageMessages.appendChild(myDiv2);
        }
        styleBlog();
    }
    
    
    /**
     * efface les messages d'un utilisateur par nom
     * efface les entrées associées dans la bdd
     * 
     * @param {string} id le nom entré par l'utilisateur 
     * @param {string} url le path de la page
     * @returns {void}
     */
    async function delNom(id, url) {
        fetch(url + "/" + id, {
            method: "DELETE"   
        })
        .then((response) => {
            response.json()
                .then(res => {
                    addHtml(res.message);
                })
        })
        .catch((error) => console.log({error}));
    }


    /**
     * ajout de style pour la reconstitution de la liste des messages
     */
    function styleBlog() {
        let cl = document.getElementsByClassName("qui");
        for (test of cl) {
            let len = test.innerText.length;
            console.log(len);
            len = len * 10;
            test.style.width = len + "px";
            test.style.backgroundColor = "green";
            test.style.borderRadius = "5px";
        };
        
        let cl2 = document.getElementsByClassName("blog");
        for (test of cl2) {
            test.style.padding = "0px 0px 0px 30px";
        };
    }


    // events

    // pour ajouter un message et entrer les données en bdd
    let sub = document.getElementById("sub");
    sub.addEventListener('click', () => {
        const nom = document.getElementById("exempleNom").value;
        const prenom = document.getElementById("exemplePrenom").value;
        const message = document.getElementById("exempleTextarea").value;
        console.log(message);
        const data = {
            nom : nom,
            prenom: prenom,
            message: message
        };
        ajax(data, path);
    })

    // pour effacer 
    let sub2 = document.getElementById("sub2");
    sub2.addEventListener('click', () => {
        const nom = document.getElementById("exempleNom").value;
        delNom(nom, path);
    })

    // initialisation du style au chargement de la page
    styleBlog();
};



if (path === "/signin" || path === "/login") {

    // simple mise en forme bootstrap de la zone de texte si il y en

    let message = document.getElementById("message");

    if (message.innerText === "") {
        message.classList.remove("alert");
        message.classList.remove("alert-secondary");
        console.log(message);
    }
};

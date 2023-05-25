const conn = require('./config')
const bcrypt = require('bcrypt');
const escape = require('escape-html');


// classe de requête pour bdd sql
class Requete2{

    /**
     * pour le blog
     * @returns Promise
     */
    async getNames(){
        const sql = "select prenom, nom, message from test order by id;"
        const req = await this.doQuery(sql) 
        return req
    }

    /**
     * traitement connectionet recherche résultat, mise en forme array -> json
     * @param {string} queryToDo requete sql
     * @returns {Promise}
     */
    async doQuery(queryToDo) {
        let pro = new Promise((resolve, reject) => {
            let query = queryToDo;
            conn.query(query, function (err, result) {
                if (err) throw err
                resolve(result)
            });
        })
        return pro.then((val) => {
            return val
        })
    }

    /**
     * vérifie que l'utilisateur existe
     * @param {string} array variable de la requête
     * @returns {bool}
     */
    async getUserById(array) {
        let query = "select * from test where nom = ?";
        const req = await this.doQueryParams(query, array);
        if (req.length > 0) return true;
        else return false;
    }

    /**
     * 
     * @param {string} queryToDo requête sql
     * @param {array} array variables de la requête
     * @returns {Promise}
     */
    async doQueryParams(queryToDo, array) {
        let pro = new Promise((resolve, reject) => {
          const query = queryToDo;
          conn.query(query, array, function (err, result) {
              if (err) throw err;
              resolve(result);
          });
        })
        return pro.then((val) => {
          return val;
        })
      }

    /**
     * insertion message blog
     * @param {array} array variables nom, prenom et message
     * @returns {void} 
     */
    insertNomPrenom(array) {
        conn.query("INSERT into test (nom, prenom, message) values (?, ?, ?);", [
            escape(array.nom), 
            escape(array.prenom), 
            escape(array.message)
        ])
    }

    /**
     * ajouter utilisateur pour pouvoir se connecter au blog
     * @param {array} array variables nom, password (encrypté bcrypt)
     * @returns {void} 
     */
    insertUser(array) {
        conn.query("INSERT into admin (nom, password) values (?, ?);", [
            escape(array[0]), escape(array[1])
        ]);
    }

    /**
     * vérifie si l'utilisateur est déjà enregistré en bdd, recherche par nom uniquement
     * @param {string} user le nom
     * @returns {Promise}
     */
    async checkUser(user) {
        let pro = new Promise((resolve, reject) => {
            conn.query("select * from admin where nom=?;", [user], (err, result) => {
                if (err) throw err;
                resolve(result);
            });
        });
        return pro.then(val => {
            if (val.length > 0) {
                return true;
            } else {
                return false;
            }
        });
    }

    /**
     * récupère les nom et password en fonction du nom
     * @param {string} user nom
     * @returns {Promise}
     */
    async getUserPwd(user) {
        let pro = new Promise((resolve, reject) => {
            conn.query("select * from admin where nom=?;", [user], (err, result) => {
                if (err) throw err;
                resolve(result);
            });
        });
        return pro.then(val => {
           return val;
        });
    }


    /**
     * @param {object} array objet json issu du post
     * @returns {object} json vide ou avec infos à comparer
     */
    async checkUserPwd(array) {
        const val = await this.getUserPwd(array.nom);
        let nom = "";
        let passw = "";
        if (val.length === 1) {
            nom = val[0].nom;
            passw = val[0].password;
        }   
        return {
            nom : nom,
            password : passw
        }
    }
       
        


    /**
     * 
     * @param {array} array le nom
     * @returns {void} 
     */
    async deleteNomPrenom(array) {
        const res = await this.getUserById(array);
        if (res === true) {
            conn.query("delete from test where nom = ?", [array]);
        }
    }
}


module.exports = Requete2
export default class Api {
  constructor(options) {
    this.options=options;
  }

  _check(res){
    if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  getInitialCards() {
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
      headers: this.options.headers
    })
    .then(res => {
      return this._check(res)
    //   if (res.ok) {
    //   return res.json();
    // }
    //   return Promise.reject(`Ошибка: ${res.status}`);
    })
  
  }
  
  initProfileFomServer(){
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me ', {
      headers: this.options.headers
    })
    .then(res => {
      return this._check(res)
    // .then((res) => {
      
    //   return res
    // }); 
    // return res
    })
  }

  postCardToServer(cardName,cardLink){
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
    .then(res => {if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    // .then(()=>{
    //   location.reload()
    // })
  }

  postLoginToServer(profileName,profileJob,buttonName){
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me', {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        name: profileName,
        about: profileJob
      })
    })
    .then(res => {
      return this._check(res)
    //   if (res.ok) {
    //   return res.json();
    // }
    //   return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  deleteCardFromServer(cardId){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.options.headers,
      body: JSON.stringify({})
    })
    .then(res => {
      return this._check(res)
    //   if (res.ok) {
    //   return res.json();
    // }
    //   return Promise.reject(`Ошибка: ${res.status}`);
    })
    // .then(()=>{
    //   location.reload()
    // }); 
  }

  likeCardOnServer(cardId){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.options.headers,
      body: JSON.stringify({})
    })
    .then(res => {
      return this._check(res)
    //   if (res.ok) {
    //   return res.json();
    // }
    //   return Promise.reject(`Ошибка: ${res.status}`);
    })  
  }

  dislikeCardOnServer(cardId){
    return fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.options.headers,
      body: JSON.stringify({})
    })
    .then(res => {
      return this._check(res)
    //   if (res.ok) {
    //   return res.json();
    // }
    //   return Promise.reject(`Ошибка: ${res.status}`);
    }); 
  }

  postAvatarToServer(avatarLink){
    return fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me/avatar', {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    })
    .then(res => {
      return this._check(res)
    }); 
  }
}
import drawCards from '../pages/index.js';
export default class Api {
  constructor(options) {
    this.options=options;
  }
  
  getInitialCards() {
    let result = fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
      headers: this.options.headers
    })
    .then(res => {if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      return(result)
      // result.forEach(element => {
      //   const name=element.name;
      //   const link=element.link;
      //   const numberOfLikes=element.likes.length;
      //   const cardId=element._id;
      //   let liked=false;
        
      //   for (let i = 0; i < element.likes.length; i++) {
      //     if (element.likes[i]._id === myIdInLikesArray) {
      //       liked=true;
      //     }
      //   }
      //   let mine=false;
      //   if (element.owner._id === myIdInLikesArray) {
      //     mine=true;
      //   }

      //   cardArr.push({name,link,numberOfLikes,cardId,liked,mine});       
      // }
      // ); 
      // return cardArr     
    })
    return(result)
    // .then((cardArr)=>{
    //   executePageGeneration(cardArr)
    // })
  }
  
  initProfileFomServer(){
    let res=fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me ', {
      headers: this.options.headers
    })
    .then(res => {if (res.ok) {
      return res.json();
    }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((res) => {
      return res
      // const myIdInLikesArray=result._id;
      // pageProfileName.textContent=result.name;
      // pageProfileJob.textContent=result.about;
      // pageProfileAvatar.src = result.avatar;
    }); 
    return res
  }

  postCardToServer(cardName,cardLink,buttonName,cardArr,myIdInLikesArray){
    buttonName.value = 'Сохранение...';
    fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
      method: 'POST',
      headers: this.options.headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    })
  }

  postLoginToServer(profileName,profileJob,buttonName){
    buttonName.value = 'Сохранение...';
    fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me', {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        name: profileName,
        about: profileJob
      })
    }); 
  }

  deleteCardFromServer(cardId){
    fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/${cardId}`, {
      method: 'DELETE',
      headers: this.options.headers,
      body: JSON.stringify({})
    }); 
  }

  likeCardOnServer(cardId){
    fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this.options.headers,
      body: JSON.stringify({})
    }); 
  
  }

  dislikeCardOnServer(cardId){
    fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this.options.headers,
      body: JSON.stringify({})
    }); 
  }

  postAvatarToServer(avatarLink){
    fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me/avatar', {
      method: 'PATCH',
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    }); 
  }
}
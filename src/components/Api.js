export default class Api {
  constructor(options) {
    this.options=options;
  }
  
  getInitialCards(cardArr) {
    fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
      headers: {
        authorization: 'ece4ec17-0364-4590-98d8-28086b7fa384'
      }
    })
    .then(res => res.json())
    .then((result) => {
      result.forEach(element => {
        const name=element.name;
        const link=element.link;
        const numberOfLikes=element.likes.length;
        const cardId=element._id;
        let liked=false;
        const myIdInLikesArray='d2ab633474e1b5e0c0fdeb91';
        for (let i = 0; i < element.likes.length; i++) {
          if (element.likes[i]._id === myIdInLikesArray) {
            liked=true;
          }
        }
        let mine=false;
        if (element.owner._id === myIdInLikesArray) {
          mine=true;
        }

        cardArr.push({name,link,numberOfLikes,cardId,liked,mine});       
      });     
    })
  }
  
  initProfileFomServer(pageProfileName,pageProfileJob,pageProfileAvatar){
    fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me ', {
      headers: {
        authorization: 'ece4ec17-0364-4590-98d8-28086b7fa384'
      }
    })
    .then(res => res.json())
    .then((result) => {
      pageProfileName.textContent=result.name;
      pageProfileJob.textContent=result.about;
      pageProfileAvatar.src = result.avatar;
    }); 
  }

  postCardToServer(cardName,cardLink,buttonName){
    buttonName.value = 'Сохранение...';
    fetch('https://mesto.nomoreparties.co/v1/cohort-18/cards', {
      method: 'POST',
      headers: {
        authorization: 'ece4ec17-0364-4590-98d8-28086b7fa384',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    }); 
  }

  postLoginToServer(profileName,profileJob,buttonName){
    buttonName.value = 'Сохранение...';
    fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me', {
      method: 'PATCH',
      headers: {
        authorization: 'ece4ec17-0364-4590-98d8-28086b7fa384',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: profileName,
        about: profileJob
      })
    }); 
  }

  deleteCardFromServer(cardId){
    fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: 'ece4ec17-0364-4590-98d8-28086b7fa384',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    }); 
  }

  likeCardOnServer(cardId){
    fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: 'ece4ec17-0364-4590-98d8-28086b7fa384',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    }); 
  
  }

  dislikeCardOnServer(cardId){
    fetch(`https://mesto.nomoreparties.co/v1/cohort-18/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: 'ece4ec17-0364-4590-98d8-28086b7fa384',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    }); 
  }

  postAvatarToServer(avatarLink){
    fetch('https://mesto.nomoreparties.co/v1/cohort-18/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: 'ece4ec17-0364-4590-98d8-28086b7fa384',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatarLink
      })
    }); 
  }

}
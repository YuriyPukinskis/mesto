export default class UserInfo{
  constructor(name,occupation){
    this.name = name;
    this.occupation = occupation;
  }

  getUserInfo(){
    const name = this.name.textContent;
    const job = this.occupation.textContent
    return {name,job};
  }

  setUserInfo(name,job){
    this.name.textContent = name; 
    this.occupation.textContent = job;
  }

  updateAvatar(target,link){
    target.src = link;
  }
}
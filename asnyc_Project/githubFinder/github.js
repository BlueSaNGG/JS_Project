class Github{
  constructor(){
    this.client_id='886ed2a4d8f80aaf5256';
    this.client_secret='7ad90887d421360d3ea7e05a025e6101a63c5040';
    this.repos_count =5;
    this.repos_sort = `created: asc`;
  }

  async getUser(user){
    const profileResponse =await fetch(`https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`);
    const repoResponse =await fetch(`https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}&client_id=${this.client_id}&client_secret=${this.client_secret}`);

    const profile=await profileResponse.json(); //得到jsondata
    const repos=await repoResponse.json(); //得到jsondata

    return {
      profile,            //prefile object
      repos
    }
  }
}
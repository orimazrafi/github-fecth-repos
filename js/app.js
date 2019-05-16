const inputValue = document.querySelector('#search');
const searchButton = document.querySelector('.searchButton');
const nameContainer = document.querySelector('.main__profile-name');
const unContainer = document.querySelector('.main__profile-username');
const reposContainer = document.querySelector('.main__profile-repos');
const urlContainer = document.querySelector('.main__profile-url');
const imageContainer = document.querySelector('.main__profile-image');
const errorContainer = document.querySelector('.main__profile-error');

const fetchUsers = async user => {
  const api_call = await fetch(
    `https://api.github.com/users/${user}?client_id=${clientId}&cleint_secret=${clientSecret}`
  );
  return await api_call.json();
};

const showData = () => {
  fetchUsers(inputValue.value.replace(/\s/g, ''))
    .then(res => {
      console.log(res);
      if (res.login == undefined) throw new Error('user was not found!');
      errorContainer.innerHTML = '';
      nameContainer.innerHTML = `Name: <span class="main__profile-value">${
        res.name
      }</span>`;

      unContainer.innerHTML = `Username: <span class="main__profile-value" >${
        res.login
      }</span>`;

      imageContainer.innerHTML = ` <image class="main__profile-image" src=${
        res.avatar_url
      } height='100px' width='100px'></image>`;

      reposContainer.innerHTML = `Repos: <span class="main__profile-value">${
        res.public_repos
      }</span>`;
      urlContainer.innerHTML = `URL: <span class="main__profile-value">${
        res.html_url
      }</span>`;
    })
    .catch(err => {
      errorContainer.innerHTML = `<h2>User was not found! </h2>`;
      nameContainer.innerHTML = '';
      unContainer.innerHTML = '';
      reposContainer.innerHTML = '';
      urlContainer.innerHTML = '';
      console.log(err.message);
    });
};
searchButton.addEventListener('click', () => {
  showData();
});

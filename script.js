const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("search-results");

searchButton.addEventListener("click", performSearch);
searchInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    performSearch();
  }
});

function performSearch() {
  const query = searchInput.value.trim();

  if (!query) {
    alert("Введите запрос");
    return;
  }

  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(
    query
  )}&sort=stars&order=desc`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.items.length === 0) {
        searchResults.innerHTML = "Ничего не найдено";
        return;
      }

      searchResults.innerHTML = "";
      data.items.slice(0, 10).forEach((item) => {
        const repositoryLink = document.createElement("a");
        repositoryLink.href = item.html_url;
        repositoryLink.target = "_blank";
        repositoryLink.textContent = item.name;

        const starsCount = document.createElement("span");
        starsCount.style.marginLeft = "10px";
        starsCount.textContent = `Звезды: ${item.stargazers_count} _ Forks ${item.forks}`;

        const description = document.createElement("p");
        description.textContent = item.description;

        const lang = document.createElement("p");
        lang.textContent = item.language;

        const repositoryItem = document.createElement("div");
        repositoryItem.appendChild(repositoryLink);
        repositoryItem.appendChild(starsCount);
        repositoryItem.appendChild(description);
        repositoryItem.appendChild(lang);

        searchResults.appendChild(repositoryItem);
      });
    })
    .catch(() => {
      searchResults.innerHTML = "Что-то пошло не так";
    });
}

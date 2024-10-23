const apikey = "user your api key here";
const BlogContainer = document.getElementById("BlogContainer");
const SearchInput = document.getElementById("SearchInput");
const SearchButton = document.getElementById("SearchButton");

async function fetchRandomNews(query = "") {
  let apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=10&apiKey=${apikey}`;
  try {
    if (query) {
      apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apikey}`;
    } else {
      apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=10&apiKey=${apikey}`;
    }
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    return data.articles;
  } catch (error) {
    console.error(" Error fetching random news", error);
    return [];
  }
}

function displayBlogs(articles) {
  BlogContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");

    blogCard.classList.add("blog-card");

    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;

    const title = document.createElement("h2");
    const truncatedTitle =
      article.title.length > 30
        ? article.title.slice(0, 30) + "...."
        : article.title;
    title.textContent = truncatedTitle;

    //len = article.description.length

    if (article.description) {
      const paragraph = document.createElement("p");
      // Directly truncate the description (remove extra variable 'len')
      const truncatedPara =
        article.description.length > 90
          ? article.description.slice(0, 90) + "...."
          : article.description;

      // Set the truncated description as paragraph text
      paragraph.textContent = truncatedPara;

      blogCard.appendChild(img);
      blogCard.appendChild(title);
      blogCard.appendChild(paragraph);

      BlogContainer.appendChild(blogCard);
    }

    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
  });
}

SearchButton.addEventListener("click", async () => {
  const query = SearchInput.value.trim();
  if (query !== "") {
    try {
      const article = await fetchRandomNews(query);
      displayBlogs(article);
    } catch (error) {
      console.log("errors is" + error);
    }
  }
});

// starts here.
(async () => {
  try {
    const article = await fetchRandomNews();
    displayBlogs(article);
  } catch (error) {
    console.error(" Error fetching random news", error);
  }
})();

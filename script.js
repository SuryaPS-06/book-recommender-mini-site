const genres = [
  { id: 1, name: "Fiction" },
  { id: 2, name: "Science" },
  { id: 3, name: "Romance" },
  { id: 4, name: "History" },
  { id: 5, name: "Fantasy" },
  { id: 6, name: "Mystery" }
];

const books = [
  { title: "1984", author: "George Orwell", genreId: 1 },
  { title: "Sapiens", author: "Yuval Noah Harari", genreId: 4 },
  { title: "Harry Potter", author: "J.K. Rowling", genreId: 5 },
  { title: "The Selfish Gene", author: "Richard Dawkins", genreId: 2 },
  { title: "Pride and Prejudice", author: "Jane Austen", genreId: 3 },
  { title: "The Da Vinci Code", author: "Dan Brown", genreId: 6 }
];

function renderGenres() {
  const container = document.querySelector(".genres-grid");
  if (!container) return;

  genres.forEach((genre) => {
    const card = document.createElement("div");
    card.classList.add("genre-card");
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.textContent = genre.name;

    card.addEventListener("click", () => {
      localStorage.setItem("selectedGenre", genre.id);
      window.location.href = "recommendations.html";
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        localStorage.setItem("selectedGenre", genre.id);
        window.location.href = "recommendations.html";
      }
    });

    container.appendChild(card);
  });
}

function renderRecommendations() {
  const container = document.querySelector(".recommendations-grid");
  if (!container) return;

  const selectedGenre = parseInt(localStorage.getItem("selectedGenre"));
  const filteredBooks = books.filter(book => book.genreId === selectedGenre);

  if (filteredBooks.length === 0) {
    container.innerHTML = "<p>No books found for this genre.</p>";
    return;
  }

  filteredBooks.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("book-card");
    card.innerHTML = `<h3>${book.title}</h3><p><strong>Author:</strong> ${book.author}</p>`;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderGenres();
  renderRecommendations();
});

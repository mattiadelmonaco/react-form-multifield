import { useState } from "react";
import articles from "../data/articlesData";

export default function Main() {
  const [articleTitle, setArticleTitle] = useState("");

  const [articlesData, setArticleData] = useState(articles);

  const handleSubmit = (e) => {
    e.preventDefault();
    setArticleData([
      ...articlesData,
      {
        id: articlesData[articlesData.length - 1].id + 1,
        title: articleTitle,
        url: "#",
      },
    ]);
    setArticleTitle("");
  };

  const removeArticle = (id) => {
    const updatedArticles = articlesData.filter((article) => {
      return article.id !== id;
    });
    setArticleData(updatedArticles);
  };

  const removeList = () => {
    setArticleData([]);
  };

  return (
    <main>
      <section>
        <div className="container">
          <ul className="articles-list">
            {articlesData.map((article) => {
              return (
                <li key={article.id} className="article">
                  <a href={article.url} className="article__title">
                    <h3>{article.title}</h3>
                  </a>
                  <button
                    onClick={() => removeArticle(article.id)}
                    className="article__btn--delete"
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              );
            })}
          </ul>
          {articlesData.length > 0 && (
            <button className="article__btn--deleteList" onClick={removeList}>
              Cancella lista
            </button>
          )}
        </div>
      </section>
      <hr />
      <section>
        <div className="container">
          <form onSubmit={handleSubmit} className="form__addArticle">
            <input
              className="form__inputArea"
              type="text"
              placeholder="Inserisci titolo nuovo articolo"
              value={articleTitle}
              onChange={(e) => {
                setArticleTitle(e.target.value);
              }}
              required
            />
            <button className="form__submitBtn" type="submit">
              Aggiungi articolo
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

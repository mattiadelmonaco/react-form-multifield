import { useState } from "react";
import articles from "../data/articlesData";

export default function Main() {
  const [articleTitle, setArticleTitle] = useState("");
  const [articleAuthor, setArticleAuthor] = useState("");
  const [articleContent, setArticleContent] = useState("");
  const [articleCategory, setArticleCategory] = useState("FrontEnd");
  const [isPublished, setIsPublished] = useState(false);

  const [articlesData, setArticleData] = useState(articles);

  const newArticle = {
    id: articlesData[articlesData.length - 1].id + 1,
    title: articleTitle,
    url: "#",
    author: articleAuthor,
    content: articleContent,
    selected: false,
    available: isPublished,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setArticleData([...articlesData, newArticle]);

    // Reset input after submit
    setArticleTitle("");
    setArticleAuthor("");
    setArticleContent("");
    setArticleCategory("FrontEnd");
    setIsPublished(false);
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
                    <h2>{article.title}</h2>
                  </a>
                  <h3 className="padding-bottom-4">{article.author}</h3>
                  <p className="padding-bottom-4">{article.content}</p>
                  <p className="padding-bottom-4">{article.selected}</p>
                  <p className="padding-bottom-4">
                    {article.available ? "Pubblicato" : "Non pubblicato"}
                  </p>
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
          {/* FORM */}

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
            <input
              className="form__inputArea"
              type="text"
              placeholder="Inserisci autore nuovo articolo"
              value={articleAuthor}
              onChange={(e) => {
                setArticleAuthor(e.target.value);
              }}
              required
            />
            <input
              className="form__inputArea form__contentArea"
              type="text"
              placeholder="Inserisci contenuto nuovo articolo"
              value={articleContent}
              onChange={(e) => {
                setArticleContent(e.target.value);
              }}
              required
            />
            <div className="form__select">
              <label htmlFor="category">Scegli una categoria:</label>
              <select
                id="category"
                className="form__inputArea"
                value={articleCategory}
                onChange={(e) => setArticleCategory(e.target.value)}
                required
              >
                <option value="FrontEnd">FrontEnd</option>
                <option value="BackEnd">BackEnd</option>
                <option value="UI/UX">UI/UX</option>
              </select>
            </div>
            <div className="form__checkbox">
              <label htmlFor="pubblicato">Pubblicato</label>
              <input
                id="pubblicato"
                type="checkbox"
                className="form__checkbox--input"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
              />
            </div>
            <button className="form__submitBtn" type="submit">
              Aggiungi articolo
            </button>
          </form>

          {/* /FORM */}
        </div>
      </section>
    </main>
  );
}

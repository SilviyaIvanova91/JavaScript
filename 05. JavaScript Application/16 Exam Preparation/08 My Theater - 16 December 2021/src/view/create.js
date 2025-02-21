import { createEvent } from "../api/data.js";
import { html, render, page, nothing } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const createTemplate = (onCreate) => html`
  <!--Create Page-->
  <section id="createPage">
    <form @submit=${onCreate} class="create-form">
      <h1>Create Theater</h1>
      <div>
        <label for="title">Title:</label>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Theater name"
          value=""
        />
      </div>
      <div>
        <label for="date">Date:</label>
        <input
          id="date"
          name="date"
          type="text"
          placeholder="Month Day, Year"
        />
      </div>
      <div>
        <label for="author">Author:</label>
        <input id="author" name="author" type="text" placeholder="Author" />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
        ></textarea>
      </div>
      <div>
        <label for="imageUrl">Image url:</label>
        <input
          id="imageUrl"
          name="imageUrl"
          type="text"
          placeholder="Image Url"
          value=""
        />
      </div>
      <button class="btn" type="submit">Submit</button>
    </form>
  </section>
`;

export async function showCreate(ctx) {
  ctx.render(createTemplate(createSubmitHandler(onCreate)));

  async function onCreate(data) {
    const { title, date, author, imageUrl, description } = data;
    if (!title || !date || !author || !imageUrl || !description) {
      return alert("All fields are required!");
    }

    await createEvent(data);
    ctx.page.redirect("/");
  }
}

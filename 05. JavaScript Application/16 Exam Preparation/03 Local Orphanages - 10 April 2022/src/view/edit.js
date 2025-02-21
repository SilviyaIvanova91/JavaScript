import { editById, getById } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { createSubmitHandler } from "../util.js";

const editTemplate = (materials, onEdit) => html`
  <section id="edit-page" class="auth">
    <form @submit=${onEdit} id="edit">
      <h1 class="title">Edit Post</h1>

      <article class="input-group">
        <label for="title">Post Title</label>
        <input type="title" name="title" id="title" .value=${materials.title} />
      </article>

      <article class="input-group">
        <label for="description">Description of the needs </label>
        <input
          type="text"
          name="description"
          id="description"
          .value=${materials.description}
        />
      </article>

      <article class="input-group">
        <label for="imageUrl"> Needed materials image </label>
        <input
          type="text"
          name="imageUrl"
          id="imageUrl"
          .value=${materials.imageUrl}
        />
      </article>

      <article class="input-group">
        <label for="address">Address of the orphanage</label>
        <input
          type="text"
          name="address"
          id="address"
          .value=${materials.address}
        />
      </article>

      <article class="input-group">
        <label for="phone">Phone number of orphanage employee</label>
        <input type="text" name="phone" id="phone" .value=${materials.phone} />
      </article>

      <input type="submit" class="btn submit" value="Edit Post" />
    </form>
  </section>
`;

export async function showEdit(ctx) {
  const id = ctx.params.id;
  const materials = await getById(id);

  ctx.render(editTemplate(materials, createSubmitHandler(onEdit)));

  async function onEdit(data) {
    const { title, description, imageUrl, address, phone } = data;
    if (!title || !description || !imageUrl || !address || !phone) {
      return alert("All fields are required!");
    }

    await editById(id, data);
    ctx.page.redirect("/details/" + id);
  }
}

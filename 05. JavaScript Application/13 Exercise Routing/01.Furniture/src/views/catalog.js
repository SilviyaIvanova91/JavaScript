import { html } from "../lib.js";
import { getAllFurniture } from "../api/data.js";

const catalogTemp = (data) => html`
  <div class="row space-top">
    <div class="col-md-12">
      <h1>Welcome to Furniture System</h1>
      <p>Select furniture from the catalog to view details.</p>
    </div>
  </div>
  <div class="row space-top">${data.map(createItemTemp)}</div>
`;

const createItemTemp = (itemDetails) => html`
  <div class="col-md-4">
    <div class="card text-white bg-primary">
      <div class="card-body">
        <img src=${itemDetails.img} />
        <p>${itemDetails.description}</p>
        <footer>
          <p>Price: <span>${itemDetails.price} $</span></p>
        </footer>
        <div>
          <a href="/details/${itemDetails._id}" class="btn btn-info">Details</a>
        </div>
      </div>
    </div>
  </div>
`;

export async function catalogView(ctx) {
  const items = await getAllFurniture();

  ctx.render(catalogTemp(items));
}

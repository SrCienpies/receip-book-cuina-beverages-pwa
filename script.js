const SUPABASE_URL = "https://tu-proyecto.supabase.co";
const SUPABASE_KEY = "tu-anon-key";

async function obtenerRecetas() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/recetas`, {
    method: "GET",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation"
    }
  });

  const data = await res.json();
  console.log("Recetas desde Supabase:", data);
}

obtenerRecetas();


let recetas = [];

fetch("cocktail_recipes.json")
  .then(res => res.json())
  .then(data => {
    recetas = data.recetas;
    renderCards(recetas);
  });

const container = document.getElementById("cocktailCards");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filterCategory");

function renderCards(data) {
  container.innerHTML = "";
  data.forEach(cocktail => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h2>${cocktail.nombre}</h2>
      <div class="section">
        <span class="label">Ingredientes:</span>
        <ul>${cocktail.ingredientes?.map(i => `<li>${i}</li>`).join("") || "No aplica"}</ul>
      </div>
      ${cocktail.preparacion ? `<div class="section"><span class="label">Preparación:</span> ${cocktail.preparacion}</div>` : ""}
      <div class="section"><span class="label">Decoración:</span> ${cocktail.decoracion || "No aplica"}</div>
      <div class="section"><span class="label">Método:</span> ${cocktail.metodo || "No aplica"}</div>
      <div class="section"><span class="label">Cristalería:</span> ${cocktail.cristaleria || "No aplica"}</div>
    `;
    container.appendChild(card);
  });
}

function applyFilters() {
  const query = searchInput.value.toLowerCase();
  const category = filterSelect.value;
  const filtered = recetas.filter(c =>
    c.nombre.toLowerCase().includes(query) &&
    (category === "" || c.categoria === category)
  );
  renderCards(filtered);
}

searchInput.addEventListener("input", applyFilters);
filterSelect.addEventListener("change", applyFilters);

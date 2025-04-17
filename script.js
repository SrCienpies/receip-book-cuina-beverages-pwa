const SUPABASE_URL = "https://rnrvtwdmwjfcmkazrabe.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJucnZ0d2Rtd2pmY21rYXpyYWJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NTY1NjgsImV4cCI6MjA2MDQzMjU2OH0.HMo0F3_Oy6nrE_fGAXjofHqR6UhV0xz0miWe_wXk3aQ";

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

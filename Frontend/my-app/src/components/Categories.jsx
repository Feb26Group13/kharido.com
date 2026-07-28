import React from "react";

function Categories() {
  const categories = [
    "Electronics",
    "Fashion",
    "Mobiles",
    "Books",
    "Groceries"
  ];

  return (
    <section className="categories">
      <h2>Categories</h2>

      <div className="category-container">
        {categories.map((item, index) => (
          <div key={index} className="category-card">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
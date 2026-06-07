import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.jsx";
import { deleteProduct } from "../../firebase/products.js";

export default function ProductTable({ products }) {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    (p.nameEn && p.nameEn.toLowerCase().includes(search.toLowerCase()))
  );

  async function handleDelete(product) {
    if (!window.confirm(t.confirmDelete)) return;
    await deleteProduct(product.id);
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
        <input
          type="search"
          placeholder={t.searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-surface-container border border-outline-variant text-on-surface font-body text-body-md focus:outline-none focus:border-primary transition"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-outline-variant">
        <table className="w-full text-sm">
          <thead className="bg-surface-container">
            <tr>
              <th className="text-left px-4 py-3 font-label text-label-md text-on-surface-variant">Produto</th>
              <th className="text-left px-4 py-3 font-label text-label-md text-on-surface-variant hidden sm:table-cell">Categoria</th>
              <th className="text-left px-4 py-3 font-label text-label-md text-on-surface-variant">Preço</th>
              <th className="text-left px-4 py-3 font-label text-label-md text-on-surface-variant hidden md:table-cell">Stock</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {filtered.map((p) => (
              <tr key={p.id} className="hover:bg-surface-container-low transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[20px] text-outline">inventory_2</span>
                      </div>
                    )}
                    <div>
                      <p className="font-body font-medium text-on-surface line-clamp-1">{p.name}</p>
                      {p.nameEn && <p className="text-[12px] text-on-surface-variant line-clamp-1">{p.nameEn}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-on-surface-variant hidden sm:table-cell">{p.category}</td>
                <td className="px-4 py-3 font-label text-primary">MT {p.price?.toLocaleString()}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span className={`px-2 py-0.5 rounded-full text-[12px] font-label ${
                    p.inStock ? "bg-secondary-container text-on-secondary-container" : "bg-error-container text-on-error-container"
                  }`}>
                    {p.inStock ? t.inStock : t.outOfStock}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <Link
                      to={`/admin/products/${p.id}/edit`}
                      className="p-2 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(p)}
                      className="p-2 rounded-lg hover:bg-error-container text-on-surface-variant hover:text-error transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-on-surface-variant font-body">{t.noProducts}</div>
        )}
      </div>
    </div>
  );
}

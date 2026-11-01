import { useEffect, useState } from 'react';
import { getProducts, getCategories, createProduct, updateProduct, type Category, type Product, type ProductInput } from './services/api';
import { Header } from './components/Header';
import { ProductModal } from './components/ProductModal';
import './App.css';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const pageSize = 10;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getProducts({
        search: search.trim() || undefined,
        categoryId: selectedCategory,
        page,
        pageSize,
      });
      setProducts(res.items);
      setTotalCount(res.total);
    } catch (err: any) {
      setError(err.message || 'Xəta baş verdi');
    } finally {
      setLoading(false);
    } 
  };

  useEffect(() => {
    loadProducts();
  }, [search, selectedCategory, page]);

  const handleToggleStatus = async (product: Product) => {
    try {
      const updated = await updateProduct(product.id, { isAvailable: !product.isAvailable });
      setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
    } catch (err: any) {
      alert(err.message || 'Statusu dəyişmək mümkün olmadı');
    }
  };

  const handleSave = async (data: ProductInput, id?: number) => {
    if (id) {
      const updated = await updateProduct(id, data);
      setProducts(prev => prev.map(p => p.id === id ? updated : p));
    } else {
      await createProduct(data);
      loadProducts();
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize) || 1;

  return (
    <div>
      <Header />

      <main className="main-container">
        <div className="page-header-wrapper">
          <div>
            <h1 className="page-title">Məhsullar</h1>
            <p className="page-subtitle">Menyudakı bütün məhsullar · {totalCount} məhsul</p>
          </div>
          <button className="btn btn-primary" onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}>
            + Yeni məhsul
          </button>
        </div>

        <div className="filters-wrapper">
          <input
            type="text"
            className="form-input search-input"
            placeholder="Ada görə axtar..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
          />

          <select
            className="form-select category-select"
            value={selectedCategory || ''}
            onChange={e => { setSelectedCategory(e.target.value ? Number(e.target.value) : undefined); setPage(1); }}
          >
            <option value="">Bütün kateqoriyalar</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

    
        <div className="table-responsive">
          {loading ? (
            <div className="state-box">Məhsullar yüklənir...</div>
          ) : error ? (
            <div className="error-box">
              <p style={{ marginBottom: '16px' }}>{error}</p>
              <button className="btn btn-outline btn-sm" onClick={loadProducts}>Yenidən cəhd et</button>
            </div>
          ) : products.length === 0 ? (
            <div className="state-box">Heç bir məhsul tapılmadı.</div>
          ) : (
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Ad</th>
                  <th>Kateqoriya</th>
                  <th>Qiymət</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => {
                  const cat = categories.find(c => c.id === product.categoryId);
                  return (
                    <tr key={product.id} className={!product.isAvailable ? 'unavailable-row' : ''}>
                      <td>
                        <strong style={{ fontWeight: 500, display: 'block' }}>{product.nameAz}</strong>
                        <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>{product.nameEn || '—'}</span>
                      </td>
                      <td>
                        <span className="category-badge">{cat?.name || '—'}</span>
                      </td>
                      <td className="product-price">{product.price.toFixed(2).replace('.', ',')} ₼</td>
                      <td>
                        <div className="toggle-label-wrapper">
                          <label className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={product.isAvailable}
                              onChange={() => handleToggleStatus(product)}
                            />
                            <span className="toggle-slider"></span>
                          </label>
                          <span style={{ fontSize: '14px', color: product.isAvailable ? 'var(--color-text)' : 'var(--color-text-secondary)' }}>
                            {product.isAvailable ? 'Satışda' : 'Satışda deyil'}
                          </span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button className="btn btn-outline btn-sm" onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}>
                          Düzəlt
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

   
        {!loading && !error && totalPages > 1 && (
          <div className="pagination-container">
            <div>Səhifə {page} / {totalPages}</div>
            <div className="pagination-buttons">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`page-btn ${p === page ? 'active' : 'inactive'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

   
      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          categories={categories}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
import React, { useState } from 'react';
import { type Category, type Product, type ProductInput } from '../services/api';

interface ProductModalProps {
  product?: Product | null;
  categories: Category[];
  onClose: () => void;
  onSave: (data: ProductInput, id?: number) => Promise<void>;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, categories, onClose, onSave }) => {
  const [nameAz, setNameAz] = useState(product ? product.nameAz : '');
  const [nameEn, setNameEn] = useState(product ? product.nameEn || '' : '');
  const [categoryId, setCategoryId] = useState(product ? product.categoryId : categories[0]?.id);
  const [price, setPrice] = useState(product ? String(product.price) : '');
  const [isAvailable, setIsAvailable] = useState(product ? product.isAvailable : true);
  const [errors, setErrors] = useState<{ nameAz?: string; price?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { nameAz?: string; price?: string } = {};

    if (!nameAz.trim()) newErrors.nameAz = "Azərbaycan dilində ad məcburidir.";
    if (!price || Number(price) <= 0) newErrors.price = "Qiymət 0-dan böyük olmalıdır.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setSubmitting(true);
      await onSave({
        nameAz: nameAz.trim(),
        nameEn: nameEn.trim() || null,
        categoryId: Number(categoryId),
        price: Number(price),
        isAvailable,
      }, product?.id);
      onClose();
    } catch (err: any) {
      alert(err.message || "Xəta baş verdi");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <h2 className="modal-title">
          {product ? 'Məhsulu düzəlt' : 'Yeni məhsul'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Ad (AZ) *</label>
            <input type="text" className="form-input" value={nameAz} onChange={e => setNameAz(e.target.value)} placeholder="Məsələn: Mərci şorbası" />
            {errors.nameAz && <div className="error-text">{errors.nameAz}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Ad (EN)</label>
            <input type="text" className="form-input" value={nameEn} onChange={e => setNameEn(e.target.value)} placeholder="Məsələn: Lentil soup" />
          </div>

          <div className="form-group">
            <label className="form-label">Kateqoriya *</label>
            <select className="form-select" value={categoryId} onChange={e => setCategoryId(Number(e.target.value))}>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Qiymət (AZN) *</label>
            <input type="number" step="0.1" className="form-input" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" />
            {errors.price && <div className="error-text">{errors.price}</div>}
          </div>

          <div className="form-group toggle-label-wrapper">
            <label className="toggle-switch">
              <input type="checkbox" checked={isAvailable} onChange={e => setIsAvailable(e.target.checked)} />
              <span className="toggle-slider"></span>
            </label>
            <label style={{ fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>Satışdadır</label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px' }}>
            <button type="button" className="btn btn-outline" onClick={onClose}>Ləğv et</button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Yadda saxlanılır...' : 'Yadda saxla'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
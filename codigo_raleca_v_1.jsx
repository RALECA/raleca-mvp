import React, { useState } from 'react';

// Productos base con inventario
const productList = {
  gloves: { label: 'Guante de nitrilo', price: 12.0, available: 100 },
  syringes: { label: 'Jeringa 5ml', price: 0.5, available: 1000 },
  masks: { label: 'Mascarilla KN95', price: 8.0, available: 200 },
  alcohol: { label: 'Alcohol isopropílico 70%', price: 2.0, available: 500 },
  tubes: { label: 'Tubo de ensayo', price: 6.0, available: 150 },
};

export default function LandingPage() {
  const [showResults, setShowResults] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderData, setOrderData] = useState({ products: {} });
  const [quantities, setQuantities] = useState({});

  const handleSearch = (formData) => {
    setOrderData(formData);
    setShowResults(true);
  };
  const handleAddToCart = () => setShowCheckout(true);
  const handleBack = () => setShowCheckout(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 p-4 flex flex-col">
      <header className="flex items-center justify-between max-w-5xl mx-auto py-4">
        <img src="/raleca-logo.png" alt="RALECA B2B Logo" className="h-12 object-contain" />
        <h1 className="text-2xl font-semibold text-blue-600">RALECA B2B</h1>
      </header>

      <main className="flex-grow max-w-7xl mx-auto bg-white rounded-2xl shadow p-8 grid grid-cols-1 gap-8">
        {!showCheckout ? (
          <>
            <section>
              <h2 className="text-3xl font-bold text-blue-600 mb-4">Digitaliza tus compras médicas</h2>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                <li>Catálogo curado de insumos médicos</li>
                <li>Comparación en tiempo real de precios y disponibilidad</li>
                <li>Historial y trazabilidad completa de compras</li>
                <li>Soporte especializado vía WhatsApp</li>
              </ul>
            </section>
            <section className="bg-gray-100 p-6 rounded-xl overflow-auto h-[800px] flex flex-col">
              {!showResults ? (
                <SearchForm onSearch={handleSearch} />
              ) : (
                <>
                  <Results
                    orderData={orderData}
                    quantities={quantities}
                    setQuantities={setQuantities}
                  />
                  <button
                    onClick={handleAddToCart}
                    className="mt-4 w-full bg-yellow-500 text-white py-2 rounded-xl shadow hover:bg-yellow-600 transition"
                  >Agregar al carrito</button>
                </>
              )}
            </section>
          </>
        ) : (
          <CheckoutPage
            orderData={orderData}
            quantities={quantities}
            onBack={handleBack}
          />
        )}
      </main>

      <footer className="text-center text-sm text-gray-500 py-4">© 2025 RALECA B2B. Todos los derechos reservados.</footer>
    </div>
  );
}

function SearchForm({ onSearch }) {
  const [formData, setFormData] = useState({
    centerName: '',
    contactName: '',
    phone: '',
    email: '',
    search: '',
    products: { gloves: false, syringes: false, masks: false, alcohol: false, tubes: false },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        products: { ...prev.products, [name]: checked },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const filteredProducts = Object.entries(productList).filter(([, { label }]) =>
    label.toLowerCase().includes(formData.search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <input
        type="text"
        name="centerName"
        value={formData.centerName}
        onChange={handleChange}
        placeholder="Centro médico"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="text"
        name="contactName"
        value={formData.contactName}
        onChange={handleChange}
        placeholder="Responsable de compras"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Teléfono/WhatsApp"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <input
        type="text"
        name="search"
        value={formData.search}
        onChange={handleChange}
        placeholder="Buscar insumo"
        className="w-full border px-3 py-2 rounded"
      />
      <fieldset className="border-t pt-4">
        <legend className="font-medium mb-2">Selecciona insumos</legend>
        {filteredProducts.map(([key, { label }]) => (
          <label key={key} className="flex items-center mb-2">
            <input
              type="checkbox"
              name={key}
              checked={formData.products[key]}
              onChange={handleChange}
              className="mr-2"
            />
            {label}
          </label>
        ))}
      </fieldset>
      <button
        type="button"
        onClick={() => onSearch(formData)}
        className="w-full bg-green-600 text-white py-2 rounded-xl transition hover:bg-green-700"
      >Buscar</button>
    </div>
  );
}

function Results({ orderData, quantities, setQuantities }) {
  const [sortKeys, setSortKeys] = useState([]);
  const providers = [
    { name: 'MedSupplyCo', rate: 0.95, items: ['gloves', 'masks'] },
    { name: 'BioHealth Solutions', rate: 1.05, items: ['syringes', 'alcohol'] },
    { name: 'ProLab Direct', rate: 1.10, items: ['tubes', 'gloves'] },
  ];

  let entries = providers.flatMap((p, pi) =>
    p.items
      .filter((k) => orderData.products[k])
      .map((k, idx) => ({
        id: `${pi}-${idx}`,
        provider: p.name,
        item: productList[k].label,
        available: productList[k].available,
        price: productList[k].price * p.rate,
      }))
  );

  entries.sort((a, b) => {
    for (const key of sortKeys) {
      if (key === 'price') {
        if (a.price !== b.price) return a.price - b.price;
      } else {
        const res = a[key].localeCompare(b[key]);
        if (res !== 0) return res;
      }
    }
    return 0;
  });

  const labels = { provider: 'Proveedor', item: 'Item', price: 'Precio' };

  const toggleSort = (key) => {
    setSortKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="flex-grow flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Resultados</h3>
        <div className="flex space-x-4">
          {Object.entries(labels).map(([key, label]) => (
            <label key={key} className="inline-flex items-center space-x-1">
              <input
                type="checkbox"
                checked={sortKeys.includes(key)}
                onChange={() => toggleSort(key)}
                className="h-4 w-4 text-blue-600"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full bg-white">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm">
            <tr>
              <th className="py-3 px-6 text-left">Proveedor</th>
              <th className="py-3 px-6 text-left">Item</th>
              <th className="py-3 px-6 text-center">Cantidad</th>
              <th className="py-3 px-6 text-center">Disponible</th>
              <th className="py-3 px-6 text-right">Precio</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {entries.map((e) => (
              <tr key={e.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-6">{e.provider}</td>
                <td className="py-3 px-6">{e.item}</td>
                <td className="py-3 px-6 text-center">
                  <input
                    type="number"
                    min="0"
                    value={quantities[e.id] || ''}
                    onChange={(ev) => setQuantities((prev) => ({
                      ...prev,
                      [e.id]: Number(ev.target.value),
                    }))}
                    className="w-16 text-center border rounded"
                  />
                </td>
                <td className="py-3 px-6 text-center">{e.available}</td>
                <td className="py-3 px-6 text-right font-semibold">{e.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CheckoutPage({ orderData, quantities, onBack }) {
  const taxRate = 0.18;
  const providers = [
    { name: 'MedSupplyCo', rate: 0.95, items: ['gloves', 'masks'] },
    { name: 'BioHealth Solutions', rate: 1.05, items: ['syringes', 'alcohol'] },
    { name: 'ProLab Direct', rate: 1.10, items: ['tubes', 'gloves'] },
  ];

  const lines = providers.flatMap((p, pi) =>
    p.items
      .filter((k) => orderData.products[k] && quantities[`${pi}-${p.items.indexOf(k)}`] > 0)
      .map((k, idx) => {
        const qty = quantities[`${pi}-${idx}`];
        const unit = productList[k].price * p.rate;
        const sub = unit * qty;
        const itbis = sub * taxRate;
        return { id: `${pi}-${idx}`, item: productList[k].label, quantity: qty, itbis, subtotal: sub };
      })
  );

  const subTotal = lines.reduce((sum, l) => sum + l.subtotal, 0);
  const totalItbis = lines.reduce((sum, l) => sum + l.itbis, 0);
  const total = subTotal + totalItbis;

  return (
    <div className="space-y-6">
      <button onClick={onBack} className="text-blue-600 hover:underline">← Volver</button>
      <h2 className="text-2xl font-bold">Resumen de tu compra</h2>

      <table className="w-full text-sm border">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Item</th>
            <th className="px-4 py-2 text-center">Cantidad</th>
            <th className="px-4 py-2 text-right">ITBIS</th>
            <th className="px-4 py-2 text-right">Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {lines.map((l) => (
            <tr key={l.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{l.item}</td>
              <td className="px-4 py-2 text-center">{l.quantity}</td>
              <td className="px-4 py-2 text-right">{l.itbis.toFixed(2)}</td>
              <td className="px-4 py-2 text-right">{l.subtotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between font-semibold">
        <span>Subtotal:</span><span>RD${subTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-semibold">
        <span>ITBIS (18%):</span><span>RD${totalItbis.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-xl">
        <span>Total con ITBIS:</span><span>RD${total.toFixed(2)}</span>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Información de pago</h3>
        <input
          type="text"
          placeholder="Nombre en la tarjeta"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Número de tarjeta"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="MM/AA"
            className="w-full border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="CVV"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          onClick={() => window.open(
            'https://docs.google.com/forms/d/e/1FAIpQLSfkPmdDXFQrRrNfLKJHw8GvdsBWuR7lL5aFhI_ZBuumx1CdFA/viewform?usp=header',
            '_blank'
          )}
          className="w-full bg-green-600 text-white py-2 rounded-xl shadow hover:bg-green-700 transition"
        >Confirmar pago y encuesta</button>
      </div>
    </div>
  );
}

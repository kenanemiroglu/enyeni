
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => {
        console.log("TRENDYOL API CEVABI:", data);
        let extractedOrders = [];

        if (Array.isArray(data)) {
          extractedOrders = data;
        } else if (Array.isArray(data.content)) {
          extractedOrders = data.content;
        } else if (Array.isArray(data.orders)) {
          extractedOrders = data.orders;
        } else if (Array.isArray(data.content?.orders)) {
          extractedOrders = data.content.orders;
        }

        setOrders(extractedOrders);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Hata oluştu:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Trendyol Siparişleri</h1>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : orders.length === 0 ? (
        <p>Gösterilecek sipariş bulunamadı.</p>
      ) : (
        <table className="w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Sipariş No</th>
              <th className="p-2 border">Tarih</th>
              <th className="p-2 border">Durum</th>
              <th className="p-2 border">Ürün Sayısı</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">{new Date(order.createdDate).toLocaleString()}</td>
                <td className="p-2 border">{order.status}</td>
                <td className="p-2 border">{order.lines?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

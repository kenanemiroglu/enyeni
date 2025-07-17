
export default async function handler(req, res) {
  const supplierId = process.env.SUPPLIER_ID;
  const apiKey = process.env.API_KEY;
  const apiSecret = process.env.API_SECRET;

  const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  const response = await fetch(
    `https://api.trendyol.com/sapigw/suppliers/${supplierId}/orders?status=Created`,
    {
      headers: {
        Authorization: `Basic ${auth}`,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/114.0.0.0 Safari/537.36",
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    return res.status(response.status).json({ error: errorText });
  }

  const data = await response.json();
  res.status(200).json(data);
}

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mercadopago from "mercadopago";
import dotenv from "dotenv";

dotenv.config(); // Carga las variables del .env
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Configurar token desde .env
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
});


// Endpoint para crear preferencia
app.post("/create_preference", async (req, res) => {
  try {
    // Aseguramos que hay items
    if (!req.body.items || !Array.isArray(req.body.items)) {
      return res.status(400).json({ error: "Formato inválido de items" });
    }

    // Mapeamos los items del body
    const items = req.body.items.map((item) => ({
      title: item.title,
      unit_price: Number(item.unit_price),
      quantity: Number(item.quantity),
      currency_id: "PEN",
    }));

    // Crear preferencia
    const preference = await mercadopago.preferences.create({
      items,
          back_urls: {
        success: process.env.FRONTEND_URL + "/success",
        failure: process.env.FRONTEND_URL + "/failure",
        pending: process.env.FRONTEND_URL + "/pending",
      },

      auto_return: "approved",
    });

    // Retornar enlace de pago
    res.json({ init_point: preference.body.init_point });
  } catch (error) {
    console.error("Error en /create_preference:", error);
    res.status(500).json({ error: "Error al crear preferencia" });
  }
});

// Levantar servidor
app.listen(5000, () => {
  console.log("Servidor backend corriendo en http://localhost:5000");
});

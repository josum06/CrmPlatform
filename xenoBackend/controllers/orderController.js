import Order from "../models/Order.js";

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('customerId', 'name email');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error });
    }
}

const createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: "Error creating order", error });
    }
}

export { getAllOrders, createOrder };
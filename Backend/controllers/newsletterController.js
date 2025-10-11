import Subscriber from "../models/Subscriber.js";
import nodemailer from "nodemailer";

// Add subscriber
export const addSubscriber = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Already subscribed" });

    const newSubscriber = await Subscriber.create({ email });
    res.status(201).json(newSubscriber);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all subscribers
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send message to all subscribers
export const sendMessageToSubscribers = async (req, res) => {
  const { subject, message } = req.body;
  if (!subject || !message)
    return res
      .status(400)
      .json({ message: "Subject and message are required" });

  try {
    const subscribers = await Subscriber.find();
    if (subscribers.length === 0)
      return res.status(400).json({ message: "No subscribers found" });

    // Use working Gmail SMTP config
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // smtp.gmail.com
      port: Number(process.env.SMTP_PORT), // 587 or 465
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // App password
      },
    });

    // Send email to each subscriber
    for (const sub of subscribers) {
      await transporter.sendMail({
        from: `"صلصال برند" <${process.env.SMTP_USER}>`,
        to: sub.email,
        subject,
        text: message,
      });
    }

    res.json({ message: `Message sent to ${subscribers.length} subscribers` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

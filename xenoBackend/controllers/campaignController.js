import Campaign from "../models/Campaign.js";
import Segment from "../models/Segment.js";
import Customer from "../models/Customer.js";
import CommunicationLog from "../models/CommunicationLog.js";
import { buildFilter } from "../services/queryBuild.js";


const simulateDelivery = () => (Math.random() < 0.9 ? "SENT" : "FAILED");

 const createCampaign = async (req, res) => {
  try {
    const { segmentId, message } = req.body;

    const segment = await Segment.findById(segmentId);
    if (!segment) return res.status(404).json({ error: "Segment not found" });

    const filter = buildFilter(segment.ruleGroup);
    const customers = await Customer.find(filter);

    const campaign = await Campaign.create({
      segmentId,
      message,
      stats: {
        total: customers.length,
        sent: 0,
        failed: 0,
      },
    });

    // Simulate delivery
    let sent = 0;
    let failed = 0;

    const logEntries = customers.map((customer) => {
      const result = simulateDelivery();
      if (result === "SENT") sent++;
      else failed++;

      // Replace {{name}} in message
      const personalizedMessage = message.replace("{{name}}", customer.name);
      return {
        campaignId: campaign._id,
        customerId: customer._id,
        status: result,
      };
    });

    // Save logs in bulk
    await CommunicationLog.insertMany(logEntries);

    // Update stats
    campaign.stats = { total: customers.length, sent, failed };
    await campaign.save();

    res.status(201).json({ campaign, delivery: { sent, failed } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().sort({ createdAt: -1 }).populate("segmentId", "name");
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export {createCampaign, listCampaigns};
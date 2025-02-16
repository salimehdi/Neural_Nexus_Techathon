import HistoryModel from "../models/User/HistoryModel.js";

const getUserHistory = async (req, res, next) => {
    try {
        const { userId } = req.params;

        // Fetch history records for the given userId
        const historyRecords = await HistoryModel.find({ userId }).sort({ time: -1 });

        if (!historyRecords.length) {
            return res.status(404).json({ message: "No history found for this user." });
        }

        // Format history into a simple text response
        const historyText = historyRecords.map(record => 
            `🕒 ${new Date(record.time).toLocaleString()} - ${record.text}`
        ).join("\n");

        res.status(200).json({ history: historyText });
    } catch (error) {
        next(error);
    }
};

export { getUserHistory };

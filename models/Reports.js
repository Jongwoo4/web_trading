const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema(
    {
        title: String,
        user: String,
        reportType: String,
        postId: String,

    },
    { timestamps: true }
);

const Report = mongoose.model('Report', ReportSchema)
module.exports = { Report }
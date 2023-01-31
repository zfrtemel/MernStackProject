module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name: {
                type: String,
                required: [true, 'Please add a name'],
            },
            email: {
                type: String,
                required: [true, 'Please add an email'],
                unique: true,
            },
            password: {
                type: String,
                required: [true, 'Please add a password'],
            },
        },
        {
            timestamps: {
                createdAt: 'created_at',
                updatedAt: 'updated_at'
            }
        }
    );
    const Goal = mongoose.model("goals", schema);
    return Goal;
};

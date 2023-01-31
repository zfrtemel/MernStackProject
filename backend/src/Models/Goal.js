module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      head: {
        type: String,
        required: [true, 'Head is required'],
      },
      desc: String,
      goal_date: Date,
      status: String,
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

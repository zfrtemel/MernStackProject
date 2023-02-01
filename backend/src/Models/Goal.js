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
      deadline: Date,
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

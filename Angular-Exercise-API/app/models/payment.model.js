module.exports = mongoose => {
    const Payment = mongoose.model(
      "payment",
      mongoose.Schema(
        {
            name: String,
            amount: Number,
            code: String,
            grid: [],
            gridNumberOfCells: Number
        },
        { timestamps: true }
      )
    );
  
    return Payment;
  };
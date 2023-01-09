const db = require("../models");
const Payment = db.payments;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Payment
    const payment = new Payment({
      name: req.body.name,
      amount: req.body.amount,
      code: req.body.code,
      grid: req.body.grid,
      gridNumberOfCells: req.body.gridNumberOfCells,
    });
  
    // Save Payment in the database
    payment
      .save(payment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Payment."
        });
      });
  };

  // Retrieve all Payments from the database.
  exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Payment.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving payments."
        });
      });
  };

  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Payment.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Payment with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Payment with id=" + id });
      });
  };

  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Payment.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Payment with id=${id}. Maybe Payment was not found!`
          });
        } else {
          res.send({
            message: "Payment was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Payment with id=" + id
        });
      });
  };
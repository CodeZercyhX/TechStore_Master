const Customer = require('../models/Customer');

// Obtener clientes
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    const transformedCustomers = customers.map((customer) => ({
      ...customer._doc,
      id: customer._id,
    }));
    res.status(200).json(transformedCustomers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener clientes', error });
  }
};

// Agregar cliente
exports.addCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    await newCustomer.save();
    const transformedCustomer = { ...newCustomer._doc, id: newCustomer._id };
    res.status(201).json(transformedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar cliente', error });
  }
};

// Actualizar cliente
exports.updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    const transformedCustomer = { ...updatedCustomer._doc, id: updatedCustomer._id };
    res.status(200).json(transformedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar cliente', error });
  }
};

// Eliminar cliente
exports.deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Cliente no encontrado' });
    }
    res.status(200).json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar cliente', error });
  }
};

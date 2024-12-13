import React, { useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CustomerForm } from '@/components/customers/CustomerForm';
import { CustomerList } from '@/components/customers/CustomerList';
import type { Customer } from '@/types';
import { api } from '@/utils/api';

export const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | undefined>(undefined);

  // Obtener clientes del backend
  const fetchCustomers = async () => {
    try {
      const response = await fetch(api.customers);
      if (response.ok) {
        const data = await response.json();
        setCustomers(data);
      }
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleAddOrEditCustomer = async (customerData: Omit<Customer, 'id'>) => {
    try {
      if (selectedCustomer) {
        // Editar cliente existente
        const response = await fetch(`${api.customers}/${selectedCustomer.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customerData),
        });

        if (response.ok) {
          const updatedCustomer = await response.json();
          setCustomers((prev) =>
            prev.map((customer) =>
              customer.id === updatedCustomer.id ? updatedCustomer : customer
            )
          );
        }
      } else {
        // Agregar cliente nuevo
        const response = await fetch(api.customers, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customerData),
        });

        if (response.ok) {
          const newCustomer = await response.json();
          setCustomers((prev) => [...prev, newCustomer]);
        }
      }
    } catch (error) {
      console.error('Error al agregar o editar cliente:', error);
    } finally {
      setShowForm(false);
      setSelectedCustomer(undefined);
      fetchCustomers(); // Asegurar sincronización con backend
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    try {
      const response = await fetch(`${api.customers}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setCustomers((prev) => prev.filter((customer) => customer.id !== id));
      }
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
    } finally {
      fetchCustomers(); // Asegurar sincronización con backend
    }
  };

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <Button onClick={() => setShowForm(true)}>
          <UserPlus className="w-5 h-5 mr-2" />
          Add Customer
        </Button>
      </div>

      {customers.length === 0 ? (
        <div className="bg-white shadow-sm rounded-lg p-8 text-center text-gray-500">
          No customers available. Add your first customer!
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <CustomerList
            customers={customers}
            onEdit={handleEditCustomer}
            onDelete={handleDeleteCustomer}
          />
        </div>
      )}

      {showForm && (
        <CustomerForm
          initialData={selectedCustomer}
          onSubmit={handleAddOrEditCustomer}
          onClose={() => {
            setShowForm(false);
            setSelectedCustomer(undefined);
          }}
        />
      )}
    </div>
  );
};

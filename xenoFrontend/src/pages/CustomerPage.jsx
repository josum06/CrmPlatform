import React, { useState, useEffect } from "react";
import { Users, DollarSign, TrendingUp, Activity, Plus, X, Edit3, Trash2, Mail, Calendar, Search, Filter } from "lucide-react";

function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("all");
  const [formData, setFormData] = useState({
    name: "", email: "", totalSpend: "", visitCount: "", lastActive: "",
  });
  const [submitting, setSubmitting] = useState(false);



  const API_BASE_URL = 'https://crmplatform.onrender.com/api'; 
  const API_ENDPOINTS = {
    customers: `${API_BASE_URL}/customers`,
    addCustomer: `${API_BASE_URL}/customers`,

  };

  // Fetch customers from API
  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_ENDPOINTS.customers);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch customers: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      console.error('Error fetching customers:', err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) return;
    
    setSubmitting(true);
    try {
      const customerData = {
        name: formData.name,
        email: formData.email,
        totalSpend: parseFloat(formData.totalSpend) || 0,
        visitCount: parseInt(formData.visitCount) || 0,
        lastActive: formData.lastActive || new Date().toISOString(),
      };

      const response = await fetch(API_ENDPOINTS.addCustomer, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add customer: ${response.status} ${response.statusText}`);
      }

      const newCustomer = await response.json();
      setCustomers(prev => [...prev, newCustomer]);
      setFormData({ name: "", email: "", totalSpend: "", visitCount: "", lastActive: "" });
      setShowAddForm(false);
    } catch (err) {
      console.error('Error adding customer:', err);
    } finally {
      setSubmitting(false);
    }
  };


  const formatCurrency = (amount) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === "all" || 
                         (filterBy === "high" && customer.totalSpend > 1000) ||
                         (filterBy === "medium" && customer.totalSpend >= 500 && customer.totalSpend <= 1000) ||
                         (filterBy === "low" && customer.totalSpend < 500);
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: customers.length,
    revenue: customers.reduce((sum, c) => sum + (c.totalSpend || 0), 0),
    avgVisits: customers.length > 0 ? Math.round(customers.reduce((sum, c) => sum + (c.visitCount || 0), 0) / customers.length) : 0,
    avgSpend: customers.length > 0 ? customers.reduce((sum, c) => sum + (c.totalSpend || 0), 0) / customers.length : 0,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
          <p className="mt-4 text-gray-600 font-medium">Loading customers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Customer Management</h1>
              <p className="text-gray-600">Manage and track your customer relationships</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => fetchCustomers()}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors duration-200 shadow-sm"
              >
                <Activity className="w-5 h-5" />
                Refresh
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-colors duration-200 shadow-sm"
              >
                <Plus className="w-5 h-5" />
                Add Customer
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Customers", value: stats.total, icon: Users, color: "blue", change: "+12%" },
            { label: "Total Revenue", value: formatCurrency(stats.revenue), icon: DollarSign, color: "green", change: "+23%" },
            { label: "Average Visits", value: stats.avgVisits, icon: TrendingUp, color: "purple", change: "+8%" },
            { label: "Average Spend", value: formatCurrency(stats.avgSpend), icon: Activity, color: "orange", change: "+15%" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600' :
                  stat.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>


        {/* Customer Cards/Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Customer Directory ({filteredCustomers.length})
            </h2>
          </div>

          {filteredCustomers.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || filterBy !== "all" ? "Try adjusting your search or filter criteria" : "Start building your customer base today"}
              </p>
              {!searchTerm && filterBy === "all" && (
                <button 
                  onClick={() => setShowAddForm(true)} 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Add Your First Customer
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredCustomers.map((customer, idx) => (
                <div key={customer._id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white font-semibold text-lg">
                          {customer.name?.charAt(0)?.toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{customer.name}</h3>
                        <p className="text-gray-600">{customer.email}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-green-600">{formatCurrency(customer.totalSpend || 0)}</p>
                          <p className="text-sm text-gray-500">Total Spend</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-blue-600">{customer.visitCount || 0}</p>
                          <p className="text-sm text-gray-500">Visits</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-900">
                            {customer.lastActive ? formatDate(customer.lastActive) : "Never"}
                          </p>
                          <p className="text-sm text-gray-500">Last Active</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                          <Edit3 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteCustomer(customer._id)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Customer Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Add New Customer</h2>
                  <button 
                    onClick={() => setShowAddForm(false)} 
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-5">
                  {[
                    { name: "name", type: "text", placeholder: "Enter customer name", required: true, icon: Users, label: "Full Name" },
                    { name: "email", type: "email", placeholder: "Enter email address", required: true, icon: Mail, label: "Email Address" },
                    { name: "totalSpend", type: "number", placeholder: "0.00", step: "0.01", icon: DollarSign, label: "Total Spend" },
                    { name: "visitCount", type: "number", placeholder: "0", icon: TrendingUp, label: "Visit Count" },
                    { name: "lastActive", type: "datetime-local", placeholder: "", icon: Calendar, label: "Last Active" }
                  ].map((field, idx) => (
                    <div key={idx}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                      </label>
                      <div className="relative">
                        <field.icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          name={field.name}
                          type={field.type}
                          placeholder={field.placeholder}
                          required={field.required}
                          step={field.step}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-6">
                  <button 
                    type="button" 
                    onClick={() => setShowAddForm(false)} 
                    className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSubmit}
                    disabled={submitting} 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium disabled:opacity-50 transition-all duration-200"
                  >
                    {submitting ? "Adding..." : "Add Customer"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CustomersPage;
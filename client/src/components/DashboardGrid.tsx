import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, 
         XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, TrendingUp, Activity } from 'lucide-react';

export function DashboardGrid() {
  // Sample data
  const monthlyData = [
    { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
    { name: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
    { name: 'Mar', revenue: 2000, expenses: 9800, profit: -7800 },
    { name: 'Apr', revenue: 2780, expenses: 3908, profit: -1128 },
    { name: 'May', revenue: 1890, expenses: 4800, profit: -2910 },
    { name: 'Jun', revenue: 2390, expenses: 3800, profit: -1410 },
    { name: 'Jul', revenue: 3490, expenses: 4300, profit: -810 },
    { name: 'Aug', revenue: 5490, expenses: 3300, profit: 2190 },
    { name: 'Sep', revenue: 4490, expenses: 2300, profit: 2190 },
    { name: 'Oct', revenue: 6490, expenses: 3300, profit: 3190 },
    { name: 'Nov', revenue: 7490, expenses: 4300, profit: 3190 },
    { name: 'Dec', revenue: 8490, expenses: 5300, profit: 3190 },
  ];

  const categoryData = [
    { name: 'Product A', value: 400 },
    { name: 'Product B', value: 300 },
    { name: 'Product C', value: 300 },
    { name: 'Product D', value: 200 },
    { name: 'Product E', value: 100 },
  ];

  const regionData = [
    { name: 'North', value: 5400 },
    { name: 'South', value: 4300 },
    { name: 'East', value: 3300 },
    { name: 'West', value: 6200 },
  ];

  const kpiData = {
    sales: { value: '$245,250', change: '+12.5%', isPositive: true },
    customers: { value: '8,429', change: '+7.2%', isPositive: true },
    avgOrder: { value: '$52.40', change: '-2.1%', isPositive: false },
    retention: { value: '84.6%', change: '+3.8%', isPositive: true }
  };

  // State management
  const [timeframe, setTimeframe] = useState('year');
  const [chartType, setChartType] = useState('revenue');
  
  // Color schemes
  const colors = {
    revenue: '#10B981',
    expenses: '#EF4444',
    profit: '#3B82F6',
    primary: '#6366F1',
    secondary: '#EC4899',
    accent: '#8B5CF6',
    background: '#F9FAFB'
  };

  // Filter data based on timeframe
  const getFilteredData = () => {
    if (timeframe === 'quarter') {
      return monthlyData.slice(-3);
    } else if (timeframe === 'halfYear') {
      return monthlyData.slice(-6);
    }
    return monthlyData;
  };

  return (
    <div className="mt-10">
    <div className="flex flex-col w-full h-full p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Financial Performance Dashboard</h1>
        <div className="flex gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Select Timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quarter">Last Quarter</SelectItem>
              <SelectItem value="halfYear">Last 6 Months</SelectItem>
              <SelectItem value="year">Full Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Object.entries(kpiData).map(([key, data]) => (
          <Card key={key} className="shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 capitalize">{key}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.value}</div>
              <div className={`text-sm flex items-center mt-1 ${data.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {data.isPositive ? <TrendingUp size={16} className="mr-1" /> : <Activity size={16} className="mr-1" />}
                {data.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="overview" className="flex items-center">
            <BarChart3 size={16} className="mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="revenue" className="flex items-center">
            <BarChart3 size={16} className="mr-2" />
            Revenue Analysis
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center">
            <BarChart3 size={16} className="mr-2" />
            Product Mix
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Monthly Performance</CardTitle>
                <CardDescription>Revenue, expenses, and profit over time</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={getFilteredData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue" fill={colors.revenue} />
                    <Bar dataKey="expenses" name="Expenses" fill={colors.expenses} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Profit Trend</CardTitle>
                <CardDescription>Monthly profit analysis</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={getFilteredData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="profit" name="Profit" stroke={colors.profit} strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Revenue Analysis Tab */}
        <TabsContent value="revenue">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Revenue Growth</CardTitle>
                <CardDescription>Monthly revenue analysis</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart
                    data={getFilteredData()}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="revenue" name="Revenue" stroke={colors.revenue} fill={colors.revenue} fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Regional Distribution</CardTitle>
                <CardDescription>Revenue by region</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={regionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill={colors.primary}
                      dataKey="value"
                    >
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 ? colors.primary : colors.accent} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Product Mix Tab */}
        <TabsContent value="products">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Product Category Sales</CardTitle>
                <CardDescription>Sales distribution by product</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill={colors.secondary}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index % 2 ? colors.secondary : colors.primary} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Product Performance</CardTitle>
                <CardDescription>Sales by product category</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={categoryData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Bar dataKey="value" name="Sales" fill={colors.secondary} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6 text-sm text-gray-500">
        <p>Last updated: February 26, 2025 | Data source: Financial Reports</p>
      </div>
    </div>
    </div>
  );
};

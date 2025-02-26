import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Dashboard from './pages/Dashboard';
import TaskManager from './pages/TaskManager';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/taskmanager" element={<TaskManager />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;

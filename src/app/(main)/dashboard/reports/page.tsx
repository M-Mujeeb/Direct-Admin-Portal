"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { format } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { DatePickerWithRange } from "@/components/date-range-picker";

const revenueData = [
  { date: "2025-07-01", value: 150 },
  { date: "2025-07-05", value: 500 },
  { date: "2025-07-10", value: 700 },
  { date: "2025-07-15", value: 1200 },
];

const voiceMessagesData = [
  { name: "Week 1", value: 80 },
  { name: "Week 2", value: 120 },
  { name: "Week 3", value: 150 },
  { name: "Week 4", value: 90 },
];

const planSalesData = [
  { name: "1 Msg", value: 200 },
  { name: "3 Msgs", value: 300 },
  { name: "5 Msgs", value: 150 },
];

const topCelebsData = [
  { name: "Ali Zafar", revenue: 800 },
  { name: "Atif Aslam", revenue: 600 },
  { name: "Aima Baig", revenue: 550 },
];

const newFansData = [
  { date: "2025-07-01", count: 5 },
  { date: "2025-07-05", count: 20 },
  { date: "2025-07-10", count: 25 },
  { date: "2025-07-15", count: 40 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function Page() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [celebrity, setCelebrity] = useState("");
  const [plan, setPlan] = useState("");

  return (
    <div className="@container/main flex flex-col gap-4 md:gap-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
          <Select value={celebrity} onValueChange={setCelebrity}>
            <SelectTrigger>
              <SelectValue placeholder="Select Celebrity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="atif">Atif Aslam</SelectItem>
              <SelectItem value="ali">Ali Zafar</SelectItem>
              <SelectItem value="aima">Aima Baig</SelectItem>
            </SelectContent>
          </Select>
          <Select value={plan} onValueChange={setPlan}>
            <SelectTrigger>
              <SelectValue placeholder="Select Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Message</SelectItem>
              <SelectItem value="3">3 Messages</SelectItem>
              <SelectItem value="5">5 Messages</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="default">Apply Filters</Button>
        </CardContent>
      </Card>

      {/* Metric Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">Rs. 25,000</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Voice Messages</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">920</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fans</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">1,480</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Celebs</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-bold">28</CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={revenueData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Voice Messages Sent</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={voiceMessagesData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Celebrities by Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topCelebsData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Plan Sales Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={planSalesData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {planSalesData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Fans Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={newFansData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#ffc658" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

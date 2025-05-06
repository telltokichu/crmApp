import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const pieData = [
    { name: "North", value: 5 },
    { name: "South", value: 3 },
    { name: "East", value: 4 },
    { name: "West", value: 2 },
];

const COLORS = ["#60a5fa", "#34d399", "#fbbf24", "#f87171"];

export default function PieCharts() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                    {pieData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}

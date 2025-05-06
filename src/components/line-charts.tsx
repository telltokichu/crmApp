import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const lineData = [
    { month: "Jan", coverage: 400000 },
    { month: "Feb", coverage: 600000 },
    { month: "Mar", coverage: 550000 },
    { month: "Apr", coverage: 700000 },
    { month: "May", coverage: 650000 },
];

export default function LineCharts() {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="coverage" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
}

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function BarCharts() {
    const chartData = [
        { policy_type: "Health", active: 3, expired: 1, cancelled: 1 },
        { policy_type: "Life", active: 2, expired: 2, cancelled: 0 },
        { policy_type: "Vehicle", active: 4, expired: 1, cancelled: 2 },
    ];

    const allStatuses = ["active", "expired", "cancelled"];

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                    <XAxis dataKey="policy_type" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    {allStatuses.map((status) => (
                        <Bar
                            key={status}
                            dataKey={status}
                            stackId="a"
                            fill={
                                status === "active"
                                    ? "#4ade80"
                                    : status === "expired"
                                    ? "#f87171"
                                    : "#60a5fa"
                            }
                        />
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

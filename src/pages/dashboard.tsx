import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BarCharts from "@/components/bar-charts";
import LineCharts from "@/components/line-charts";
import PieCharts from "@/components/pie-charts";

export default function Dashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Policy Count by Type & Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <BarCharts />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Total Coverage Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                    <LineCharts />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Policy Distribution by Region</CardTitle>
                </CardHeader>
                <CardContent>
                    <PieCharts />
                </CardContent>
            </Card>
        </div>
    );
}

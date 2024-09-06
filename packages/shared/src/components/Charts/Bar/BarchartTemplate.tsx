'use client';

import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";

export const BarchartTemplate = () => {
    const [chartData, setChartData] = useState<{ clave: string; nombre: string; cantidad: number }[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/matricula/oficial", {
                    method: "GET",
                });
                const data = await response.json();
                console.log(data);
                setChartData(data);
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };

        fetchData();
    }, []);

    const labels = chartData.map(item => item.clave);
    const values = chartData.map(item => item.cantidad);

    return (
        <BarChart
            xAxis={[
                {
                    id: 'locations',
                    data: labels,
                    scaleType: 'band',
                },
            ]}
            series={[
                {
                    data: values,
                },
            ]}
            width={1500}
            height={600}
        />
    );
};

import { ApexOptions } from "apexcharts";

export const optionPieChart: ApexOptions = {
    chart: {
        type: 'donut',
    },
    labels: ['Câu đúng', 'Câu sai'],
    plotOptions: {
        pie: {
            expandOnClick: false,
            donut: {
                size: "60%",
                labels: {
                    show: true,
                    name: { show: false, },
                    total: {
                        show: true,
                        showAlways: true,
                        formatter: function (w) {
                            const totals = w.globals.seriesTotals;
                            const result = totals.reduce((a, b) => a + b, 0);
                            return `Tổng ${result} từ`
                        }
                    }
                }
            }
        }
    },
    colors: ["#76bb0c", "#ff3e3e"],
};

export const renderWidthChartPie = (width: number) => {
    if (width >= 1024) return 440
    else if (width >= 768) return 360
    else return 330
}
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

export const chartColumnOption = (xcategory: string[]): ApexOptions => {
    return {
        chart: {
            type: 'bar',
            height: 380,
        },
        colors: ['#76bb0c'],
        plotOptions: {
            bar: {
                borderRadius: 2,
                columnWidth: '50%',
                dataLabels: {
                    position: 'top',
                    total: {
                        enabled: true,
                        style: {
                            fontSize: '13px',
                            fontWeight: 900,
                            color: "#76bb0c",
                        }
                    }
                }
            },
        },
        tooltip: {
            theme: 'dark',
        },

        xaxis: {
            categories: xcategory,
        },
        grid: {
            yaxis: {
                lines: {
                    show: false,
                }
            },
        },
        dataLabels: {
            enabled: true,
            offsetY: -20,
            style: {
                fontSize: '12px',
                colors: ["#304758"]
            },
            formatter: function (val) {
                return `${val} từ`;
            },
        },
    }
};
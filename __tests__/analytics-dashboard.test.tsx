import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import "@testing-library/jest-dom"
import jest from "jest" // Declare the jest variable

// Mock recharts
jest.mock("recharts", () => ({
  BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  Legend: () => <div data-testid="legend" />,
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  PieChart: ({ children }: any) => <div data-testid="pie-chart">{children}</div>,
  Pie: () => <div data-testid="pie" />,
  Cell: () => <div data-testid="cell" />,
  AreaChart: ({ children }: any) => <div data-testid="area-chart">{children}</div>,
  Area: () => <div data-testid="area" />,
}))

describe("AnalyticsDashboard", () => {
  it("renders analytics dashboard with key metrics", () => {
    render(<AnalyticsDashboard />)

    expect(screen.getByText("Analytics Dashboard")).toBeInTheDocument()
    expect(screen.getByText("Detection Rate")).toBeInTheDocument()
    expect(screen.getByText("98.3%")).toBeInTheDocument()
    expect(screen.getByText("False Positives")).toBeInTheDocument()
    expect(screen.getByText("1.9%")).toBeInTheDocument()
  })

  it("allows time range selection", async () => {
    render(<AnalyticsDashboard />)

    const timeRangeSelect = screen.getByRole("combobox")
    fireEvent.click(timeRangeSelect)

    await waitFor(() => {
      expect(screen.getByText("Last 30 days")).toBeInTheDocument()
    })

    fireEvent.click(screen.getByText("Last 30 days"))
    expect(timeRangeSelect).toHaveTextContent("Last 30 days")
  })

  it("displays charts correctly", () => {
    render(<AnalyticsDashboard />)

    expect(screen.getAllByTestId("responsive-container")).toHaveLength(4)
    expect(screen.getByTestId("bar-chart")).toBeInTheDocument()
    expect(screen.getByTestId("pie-chart")).toBeInTheDocument()
    expect(screen.getByTestId("line-chart")).toBeInTheDocument()
    expect(screen.getByTestId("area-chart")).toBeInTheDocument()
  })

  it("shows detailed metrics table", () => {
    render(<AnalyticsDashboard />)

    expect(screen.getByText("Detailed Metrics")).toBeInTheDocument()
    expect(screen.getByText("Total Messages Processed")).toBeInTheDocument()
    expect(screen.getByText("Threats Detected")).toBeInTheDocument()
    expect(screen.getByText("False Positives")).toBeInTheDocument()
  })
})

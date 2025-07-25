import { ExportUtils } from "@/lib/export-utils"
import jest from "jest"

// Mock jsPDF and XLSX
jest.mock("jspdf", () => {
  return jest.fn().mockImplementation(() => ({
    setFontSize: jest.fn(),
    text: jest.fn(),
    autoTable: jest.fn(),
    save: jest.fn(),
  }))
})

jest.mock("xlsx", () => ({
  utils: {
    book_new: jest.fn(() => ({})),
    aoa_to_sheet: jest.fn(() => ({})),
    book_append_sheet: jest.fn(),
    encode_range: jest.fn(),
  },
  writeFile: jest.fn(),
}))

// Mock DOM methods
Object.defineProperty(window, "URL", {
  value: {
    createObjectURL: jest.fn(() => "mock-url"),
    revokeObjectURL: jest.fn(),
  },
})

describe("ExportUtils", () => {
  const mockData = {
    headers: ["Name", "Value", "Status"],
    rows: [
      ["Test 1", 100, "Active"],
      ["Test 2", 200, "Inactive"],
    ],
    title: "Test Report",
    filename: "test-export",
  }

  beforeEach(() => {
    // Mock document methods
    document.createElement = jest.fn(() => ({
      setAttribute: jest.fn(),
      style: { visibility: "" },
      click: jest.fn(),
    })) as any

    document.body.appendChild = jest.fn()
    document.body.removeChild = jest.fn()
  })

  it("exports data to CSV format", () => {
    ExportUtils.exportToCSV(mockData)

    expect(document.createElement).toHaveBeenCalledWith("a")
    expect(document.body.appendChild).toHaveBeenCalled()
    expect(document.body.removeChild).toHaveBeenCalled()
  })

  it("exports data to Excel format", () => {
    ExportUtils.exportToExcel(mockData)

    const XLSX = require("xlsx")
    expect(XLSX.utils.book_new).toHaveBeenCalled()
    expect(XLSX.utils.aoa_to_sheet).toHaveBeenCalledWith([mockData.headers, ...mockData.rows])
    expect(XLSX.writeFile).toHaveBeenCalled()
  })

  it("exports data to PDF format", () => {
    ExportUtils.exportToPDF(mockData)

    const jsPDF = require("jspdf")
    expect(jsPDF).toHaveBeenCalled()
  })

  it("generates analytics report data", () => {
    const analyticsData = [
      {
        date: "2024-01-20",
        totalMessages: 1000,
        threatsDetected: 50,
        blockedContent: 45,
        falsePositives: 5,
        accuracyRate: 95,
        responseTime: 300,
      },
    ]

    const result = ExportUtils.exportAnalyticsReport(analyticsData)

    expect(result.headers).toContain("Date")
    expect(result.headers).toContain("Total Messages")
    expect(result.rows[0]).toContain("2024-01-20")
    expect(result.rows[0]).toContain(1000)
  })

  it("generates moderation report data", () => {
    const moderationData = [
      {
        id: 1,
        type: "spam",
        content: "This is a test spam message that should be truncated",
        user: "user123",
        platform: "Discord",
        severity: "high",
        confidence: 0.95,
        status: "blocked",
        timestamp: "2024-01-20 10:00:00",
      },
    ]

    const result = ExportUtils.exportModerationReport(moderationData)

    expect(result.headers).toContain("Type")
    expect(result.headers).toContain("Content")
    expect(result.rows[0]).toContain("spam")
    expect(result.rows[0]).toContain("95.0%")
  })
})

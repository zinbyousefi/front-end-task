import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import TableView from "../TableView";
import SearchBar from "../SearchBar";
import CardView from "../CardView";
import DataList from "../DataList";
import { DataItem } from "../../types/data-item";

// Mock data
const mockData = [
  {
    id: "1",
    title: "Test Title",
    lead: "Test Lead",
    content: "Test Content",
    published_at: "2024-02-15",
    news_agency_name: "Test Agency",
    categories: ["cat1", "cat2"],
    tags: ["tag1", "tag2"],
    url: "https://test.com",
  },
];

describe("TableView", () => {
  it("renders table with correct data", () => {
    render(<TableView data={mockData} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Lead")).toBeInTheDocument();
    expect(screen.getByText("Test Agency")).toBeInTheDocument();
    expect(screen.getByText("tag1")).toBeInTheDocument();
  });

  it("renders empty states correctly", () => {
    const emptyData = [
      {
        ...mockData[0],
        lead: undefined,
        tags: [],
      },
    ];

    render(<TableView data={emptyData} />);
    expect(screen.getAllByText("-")).toHaveLength(2);
  });
});

describe("SearchBar", () => {
  const mockOnSearch = vi.fn();

  beforeEach(() => {
    render(
      <BrowserRouter>
        <SearchBar onSearch={mockOnSearch} />
      </BrowserRouter>
    );
  });

  it("handles search input changes", async () => {
    const searchInput = screen.getByLabelText("جستجو");
    fireEvent.change(searchInput, { target: { value: "test query" } });

    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith({
        query: "test query",
        date: null,
      });
    });
  });

  it("updates URL params on search", async () => {
    const searchInput = screen.getByLabelText("جستجو");
    fireEvent.change(searchInput, { target: { value: "test" } });

    await waitFor(() => {
      expect(window.location.search).toContain("query=test");
    });
  });
});

describe("CardView", () => {
  it("renders cards with correct data", () => {
    render(<CardView data={mockData} />);

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Test Lead")).toBeInTheDocument();
    expect(screen.getByText("Test Agency")).toBeInTheDocument();
  });

  it("renders links correctly", () => {
    render(<CardView data={mockData} />);

    const link = screen.getByRole("link", { name: "Test Title" });
    expect(link).toHaveAttribute("href", "https://test.com");
    expect(link).toHaveAttribute("target", "_blank");
  });
});

describe("DataList", () => {
  const mockData: DataItem[] = [];
  const queryClient = new QueryClient({});

  beforeEach(() => {
    vi.restoreAllMocks();
    queryClient.clear();
  });

  it("should fetch and display data", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.4);
    globalThis.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve(mockData),
    });

    render(
      <QueryClientProvider client={queryClient}>
        <DataList query="" date="" />
      </QueryClientProvider>
    );

    const items = await screen.findByText(/خبری یافت نشد/);
    expect(items);
  });

  it("should handle initial fetch error", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.4);
    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Network error"));

    render(
      <QueryClientProvider client={queryClient}>
        <DataList query="" date="" />
      </QueryClientProvider>
    );
    const errorMessage = await screen.findByText(
      /متأسفانه خطایی در دریافت اخبار رخ داده است./
    );
    expect(errorMessage).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /تلاش مجدد/ })
    ).toBeInTheDocument();
  });

  it("should handle random fetch error", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.2);
    globalThis.fetch = vi.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <DataList query="" date="" />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(
        screen.getByText(/متأسفانه خطایی در دریافت اخبار رخ داده است./)
      ).toBeInTheDocument();
    });
    expect(globalThis.fetch).not.toHaveBeenCalled();
  });

  it("should handle retry after error", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.4);
    globalThis.fetch = vi
      .fn()
      .mockRejectedValueOnce(new Error("Initial error"))
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockData) });

    render(
      <QueryClientProvider client={queryClient}>
        <DataList query="" date="" />
      </QueryClientProvider>
    );

    fireEvent.click(await screen.findByRole("button", { name: /تلاش مجدد/ }));
    expect(await screen.findAllByText("خبری یافت نشد")).toHaveLength(1);
    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
  });

  it("should show stale data with background error", async () => {
    const { rerender } = render(
      <QueryClientProvider client={queryClient}>
        <DataList query="" date="" />
      </QueryClientProvider>
    );

    await screen.findByText(
      "متأسفانه خطایی در دریافت اخبار رخ داده است. لطفاً دوباره تلاش کنید."
    );

    globalThis.fetch = vi.fn().mockRejectedValue(new Error("Background error"));
    rerender(
      <QueryClientProvider client={queryClient}>
        <DataList query="" date="2024-01-01" />
      </QueryClientProvider>
    );

    await screen.findByText(
      /متأسفانه خطایی در دریافت اخبار رخ داده است. لطفاً دوباره تلاش کنید./
    );
    expect(screen.getByText(/تلاش مجدد/));
  });
});

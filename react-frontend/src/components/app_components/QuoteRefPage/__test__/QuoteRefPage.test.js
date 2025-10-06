import React from "react";
import { render, screen } from "@testing-library/react";

import QuoteRefPage from "../QuoteRefPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders quoteRef page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <QuoteRefPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("quoteRef-datatable")).toBeInTheDocument();
    expect(screen.getByRole("quoteRef-add-button")).toBeInTheDocument();
});

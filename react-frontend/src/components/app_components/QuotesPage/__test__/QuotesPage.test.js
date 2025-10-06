import React from "react";
import { render, screen } from "@testing-library/react";

import QuotesPage from "../QuotesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders quotes page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <QuotesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("quotes-datatable")).toBeInTheDocument();
    expect(screen.getByRole("quotes-add-button")).toBeInTheDocument();
});

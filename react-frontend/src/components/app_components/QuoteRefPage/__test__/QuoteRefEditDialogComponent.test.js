import React from "react";
import { render, screen } from "@testing-library/react";

import QuoteRefEditDialogComponent from "../QuoteRefEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders quoteRef edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <QuoteRefEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("quoteRef-edit-dialog-component")).toBeInTheDocument();
});

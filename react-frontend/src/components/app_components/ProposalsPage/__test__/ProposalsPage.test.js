import React from "react";
import { render, screen } from "@testing-library/react";

import ProposalsPage from "../ProposalsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders proposals page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProposalsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("proposals-datatable")).toBeInTheDocument();
    expect(screen.getByRole("proposals-add-button")).toBeInTheDocument();
});

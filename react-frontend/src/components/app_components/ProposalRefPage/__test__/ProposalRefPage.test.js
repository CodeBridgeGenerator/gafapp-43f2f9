import React from "react";
import { render, screen } from "@testing-library/react";

import ProposalRefPage from "../ProposalRefPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders proposalRef page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProposalRefPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("proposalRef-datatable")).toBeInTheDocument();
    expect(screen.getByRole("proposalRef-add-button")).toBeInTheDocument();
});

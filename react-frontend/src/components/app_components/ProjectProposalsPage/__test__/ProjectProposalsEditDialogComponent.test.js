import React from "react";
import { render, screen } from "@testing-library/react";

import ProjectProposalsEditDialogComponent from "../ProjectProposalsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders projectProposals edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProjectProposalsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("projectProposals-edit-dialog-component")).toBeInTheDocument();
});

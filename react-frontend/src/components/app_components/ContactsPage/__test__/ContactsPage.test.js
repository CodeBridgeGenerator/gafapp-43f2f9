import React from "react";
import { render, screen } from "@testing-library/react";

import ContactsPage from "../ContactsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders contacts page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ContactsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("contacts-datatable")).toBeInTheDocument();
    expect(screen.getByRole("contacts-add-button")).toBeInTheDocument();
});

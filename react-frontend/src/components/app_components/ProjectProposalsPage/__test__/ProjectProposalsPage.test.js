import React from "react";
import { render, screen } from "@testing-library/react";

import ProjectProposalsPage from "../ProjectProposalsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders projectProposals page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ProjectProposalsPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("projectProposals-datatable")).toBeInTheDocument();
  expect(screen.getByRole("projectProposals-add-button")).toBeInTheDocument();
});

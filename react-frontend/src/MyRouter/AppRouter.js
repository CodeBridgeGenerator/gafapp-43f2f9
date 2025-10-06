import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import ProtectedRoute from './ProtectedRoute';

import SingleProjectsPage from "../components/app_components/ProjectsPage/SingleProjectsPage";
import ProjectProjectLayoutPage from "../components/app_components/ProjectsPage/ProjectProjectLayoutPage";
import SingleContactsPage from "../components/app_components/ContactsPage/SingleContactsPage";
import ContactProjectLayoutPage from "../components/app_components/ContactsPage/ContactProjectLayoutPage";
import SingleProposalsPage from "../components/app_components/ProposalsPage/SingleProposalsPage";
import ProposalProjectLayoutPage from "../components/app_components/ProposalsPage/ProposalProjectLayoutPage";
import SingleQuotesPage from "../components/app_components/QuotesPage/SingleQuotesPage";
import QuoteProjectLayoutPage from "../components/app_components/QuotesPage/QuoteProjectLayoutPage";
import SingleProjectProposalsPage from "../components/app_components/ProjectProposalsPage/SingleProjectProposalsPage";
import ProjectProposalProjectLayoutPage from "../components/app_components/ProjectProposalsPage/ProjectProposalProjectLayoutPage";
import SingleProposalRefPage from "../components/app_components/ProposalRefPage/SingleProposalRefPage";
import ProposalRefProjectLayoutPage from "../components/app_components/ProposalRefPage/ProposalRefProjectLayoutPage";
import SingleQuoteRefPage from "../components/app_components/QuoteRefPage/SingleQuoteRefPage";
import QuoteRefProjectLayoutPage from "../components/app_components/QuoteRefPage/QuoteRefProjectLayoutPage";
//  ~cb-add-import~

const AppRouter = () => {
    return (
        <Routes>
            {/* ~cb-add-unprotected-route~ */}
            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
<Route path="/projects/:singleProjectsId" exact element={<SingleProjectsPage />} />
<Route path="/projects" exact element={<ProjectProjectLayoutPage />} />
<Route path="/contacts/:singleContactsId" exact element={<SingleContactsPage />} />
<Route path="/contacts" exact element={<ContactProjectLayoutPage />} />
<Route path="/proposals/:singleProposalsId" exact element={<SingleProposalsPage />} />
<Route path="/proposals" exact element={<ProposalProjectLayoutPage />} />
<Route path="/quotes/:singleQuotesId" exact element={<SingleQuotesPage />} />
<Route path="/quotes" exact element={<QuoteProjectLayoutPage />} />
<Route path="/projectProposals/:singleProjectProposalsId" exact element={<SingleProjectProposalsPage />} />
<Route path="/projectProposals" exact element={<ProjectProposalProjectLayoutPage />} />
<Route path="/proposalRef/:singleProposalRefId" exact element={<SingleProposalRefPage />} />
<Route path="/proposalRef" exact element={<ProposalRefProjectLayoutPage />} />
<Route path="/quoteRef/:singleQuoteRefId" exact element={<SingleQuoteRefPage />} />
<Route path="/quoteRef" exact element={<QuoteRefProjectLayoutPage />} />
                {/* ~cb-add-protected-route~ */}
            </Route>
        </Routes>
    );
}

const mapState = (state) => {
    const { isLoggedIn } = state.auth;
    return { isLoggedIn };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data)
});

export default connect(mapState, mapDispatch)(AppRouter);

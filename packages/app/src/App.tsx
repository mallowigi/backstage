import { apiDocsPlugin, ApiExplorerPage } from '@backstage/plugin-api-docs';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
} from '@backstage/plugin-catalog';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { orgPlugin } from '@backstage/plugin-org';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { SearchPage } from '@backstage/plugin-search';
import {
  TechDocsIndexPage,
  techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';
import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import React from 'react';
import { Route } from 'react-router-dom';
import { apis, kcOIDCAuthApiRef } from './apis';
import { Root } from './components/Root';
import { entityPage } from './components/catalog/EntityPage';
import { searchPage } from './components/search/SearchPage';

import { createApp } from '@backstage/app-defaults';
import { AppRouter, FlatRoutes } from '@backstage/core-app-api';
import {
  AlertDisplay,
  OAuthRequestDialog,
  SignInPage,
  SignInProviderConfig,
} from '@backstage/core-components';
import {
  configApiRef,
  githubAuthApiRef,
  googleAuthApiRef,
  useApi,
} from '@backstage/core-plugin-api';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { RequirePermission } from '@backstage/plugin-permission-react';
import { TechRadarPage } from '@backstage-community/plugin-tech-radar';
import LightIcon from '@material-ui/icons/WbSunny';
import { UnifiedThemeProvider } from '@backstage/theme';
import { moonlight } from './theme/moonlight.ts';
import { HomePage } from './components/home/HomePage.tsx';
import { HomepageCompositionRoot } from '@backstage/plugin-home';

const githubProvider = {
  id: 'github-auth-provider',
  title: 'GitHub',
  message: 'Sign in with GitHub.',
  apiRef: githubAuthApiRef,
};

const googleProvider = {
  id: 'google-auth-provider',
  title: 'Google',
  message: 'Sign in using Google.',
  apiRef: googleAuthApiRef,
};

const keycloakProvider: SignInProviderConfig = {
  id: 'keycloak',
  title: 'Keycloak',
  message: 'Sign in using Keycloak',
  apiRef: kcOIDCAuthApiRef,
};

const app = createApp({
  apis,
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
      createFromTemplate: scaffolderPlugin.routes.selectedTemplate,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
  components: {
    SignInPage: props => {
      const configApi = useApi(configApiRef);

      if (configApi.getString('auth.environment') === 'development') {
        return (
          <SignInPage
            {...props}
            auto
            providers={[
              'guest',
              githubProvider,
              googleProvider,
              keycloakProvider,
            ]}
          />
        );
      }

      return (
        <SignInPage {...props} providers={[githubProvider, googleProvider]} />
      );
    },
  },
  themes: [
    {
      id: 'moonlight',
      title: 'Moonlight',
      variant: 'dark',
      icon: <LightIcon />,
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={moonlight} children={children} />
      ),
    },
  ],
});

const routes = (
  <FlatRoutes>
    <Route path="/" element={<HomepageCompositionRoot />}>
      <HomePage />
    </Route>
    <Route path="/catalog" element={<CatalogIndexPage />} />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    >
      <TechDocsAddons>
        <ReportIssue />
      </TechDocsAddons>
    </Route>
    <Route path="/create" element={<ScaffolderPage />} />
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route
      path="/catalog-import"
      element={
        <RequirePermission permission={catalogEntityCreatePermission}>
          <CatalogImportPage />
        </RequirePermission>
      }
    />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />
    <Route
      path="/tech-radar"
      element={<TechRadarPage width={1500} height={800} />}
    />
  </FlatRoutes>
);

export default app.createRoot(
  <>
    <AlertDisplay />
    <OAuthRequestDialog />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </>,
);

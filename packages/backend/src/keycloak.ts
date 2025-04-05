import { createBackendModule } from '@backstage/backend-plugin-api';
import {
  authProvidersExtensionPoint,
  createOAuthProviderFactory,
} from '@backstage/plugin-auth-node';
import { oidcAuthenticator } from '@backstage/plugin-auth-backend-module-oidc-provider';
import {
  DEFAULT_NAMESPACE,
  stringifyEntityRef,
} from '@backstage/catalog-model';
import {
  GroupTransformer,
  keycloakTransformerExtensionPoint,
  UserTransformer,
} from '@backstage-community/plugin-catalog-backend-module-keycloak';

export const kcAuthProviderModule = createBackendModule({
  pluginId: 'auth',
  moduleId: 'keycloak',
  register(reg) {
    reg.registerInit({
      deps: { providers: authProvidersExtensionPoint },
      async init({ providers }) {
        providers.registerProvider({
          providerId: 'keycloak',
          factory: createOAuthProviderFactory({
            authenticator: oidcAuthenticator,
            async signInResolver(info, ctx) {
              const userRef = stringifyEntityRef({
                kind: 'User',
                name: info?.result.fullProfile.userinfo.name as string,
                namespace: DEFAULT_NAMESPACE,
              });
              return ctx.issueToken({
                claims: {
                  sub: userRef, // The user's own identity
                  ent: [userRef], // A list of identities that the user claims ownership through
                },
              });
            },
          }),
        });
      },
    });
  },
});

const customGroupTransformer: GroupTransformer = async (
  entity,
  _user,
  _realm,
) => {
  entity.metadata.name = _realm;
  return entity;
};
const customUserTransformer: UserTransformer = async (entity, user, realm) => {
  entity.metadata.name = entity.metadata.name.replaceAll(/[+@/\|]/g, '-');
  entity.spec.profile = {
    displayName:
      user.firstName && user.lastName
        ? `${user.firstName} ${user.lastName}`
        : user.email,
    email: user.email,
    picture: user.attributes?.profile_picture[0],
  };
  entity.spec.memberOf = [realm];
  return entity;
};

export const keycloakBackendModuleTransformer = createBackendModule({
  pluginId: 'catalog',
  moduleId: 'keycloak-transformer',
  register(reg) {
    reg.registerInit({
      deps: {
        keycloak: keycloakTransformerExtensionPoint,
      },
      async init({ keycloak }) {
        keycloak.setUserTransformer(customUserTransformer);
        keycloak.setGroupTransformer(customGroupTransformer);
      },
    });
  },
});

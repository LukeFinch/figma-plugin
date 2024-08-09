import { StorageProviderType } from '@sync-providers/types';
import { StorageType, StorageTypeCredentials, StorageTypeFormValues } from '@/types/StorageType';

// TODO: fix StorageProviderType usage
function isSameCredentials(
  credential: StorageTypeCredentials,
  stored: StorageType | StorageTypeFormValues<false>,
): boolean {
  switch (stored.provider) {
    case StorageProviderType.GITHUB:
    case StorageProviderType.GITLAB:
    case StorageProviderType.ADO:
    case StorageProviderType.BITBUCKET: {
      if (credential.internalId && stored.internalId && credential.internalId === stored.internalId) {
        return true;
      }
      return (
        credential.id === stored.id
        && credential.provider === stored.provider
        && credential.filePath === stored.filePath
        && credential.branch === stored.branch
      );
    }
    case StorageProviderType.GENERIC_VERSIONED_STORAGE:
    case StorageProviderType.JSONBIN:
    case StorageProviderType.URL: {
      return credential.id === stored.id && credential.provider === stored.provider;
    }
    case StorageProviderType.SUPERNOVA:
      return (
        credential.id === stored.id
        && credential.provider === stored.provider
        && credential.designSystemUrl === stored.designSystemUrl
      );
    case StorageProviderType.TOKENS_STUDIO:
      return (
        credential.id === stored.id
        && credential.provider === stored.provider
      );
    default:
      return false;
  }
}

export default isSameCredentials;

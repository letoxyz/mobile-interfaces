export enum HapticFeedbackMethod {
  selection = "selection",
  impactLight = "impactLight",
  notificationSuccess = "notificationSuccess",
  notificationError = "notificationError",
}

export enum LetoAppPlatform {
  ios = "ios",
  android = "android",
  macos = "macos",
}

export interface LetoAppSystemVersion {
  version: string;
  major: number;
  minor: number;
  patch: number;
}

export enum LetoAppTheme {
  dark = "dark",
  light = "light",
}

export enum LetoAppWalletSource {
  Import = "import",
  Connect = "connect",
}

export interface ISafeAreaInsets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export type LetoAppStateStatus =
  | "active"
  | "background"
  | "inactive"
  | "unknown"
  | "extension";

export interface ILetoKeyboardAnimationData {
  duration: number;
  easing: string;
}

export interface ILetoAppChangeThemeEvent {
  type: "change_theme";
  payload: {
    theme: LetoAppTheme;
  };
}

export interface ILetoAppStateEvent {
  type: "app_state";
  payload: {
    appState: LetoAppStateStatus;
  };
}

export interface ILetoKeyboardDidShowEvent {
  type: "keyboard_did_show";
  payload: ILetoKeyboardAnimationData & {
    height: number;
  };
}

export interface ILetoKeyboardDidHideEvent {
  type: "keyboard_did_hide";
  payload: ILetoKeyboardAnimationData;
}

export interface ILetoAccessTokenUpdatedEvent {
  type: "access_token_updated";
  payload: {
    accessToken: string;
  };
}

export interface ILetoContactsUpdatedEvent {
  type: "contacts_updated";
}

export type ILetoAppEvent =
  | ILetoAppChangeThemeEvent
  | ILetoAppStateEvent
  | ILetoKeyboardDidShowEvent
  | ILetoKeyboardDidHideEvent
  | ILetoAccessTokenUpdatedEvent
  | ILetoContactsUpdatedEvent;

export interface ILetoShareTextOptions {
  type: "text";
  message: string;
  title?: string;
}

export interface ILetoShareImageOptions {
  type: "image";
  /** base64 image */
  image: string;
  title?: string;
}

export interface ILetoShareUrlOptions {
  type: "url";
  url: string;
  title?: string;
}

export type ILetoShareOptions =
  | ILetoShareTextOptions
  | ILetoShareImageOptions
  | ILetoShareUrlOptions;

export type CodeScannerResponse =
  | {
      network: "ethereum";
      target_address: string;
      chain_id?: `${number}`;
      function_name?: string;
      prefix?: string;
      parameters?: Record<string, string>;
    }
  | { network: "tron"; address: string };

export interface ILetoAppPhoneContact {
  recordID: string;
  firstName: string;
  lastName: string;
  phone: string;
  thumbnail: string | null;
}

export interface ILetoWalletListItem {
  identifier: string;
  name: string;
  isMnemonic: boolean;
  accounts: {
    ethereum: string;
  };
  isActive: boolean;
}

export type PhoneContactsResponse = ILetoAppPhoneContact[];

export enum ILetoInstalledAppId {
  Trust = "trust",
  MetaMask = "metamask",
  Rainbow = "rainbow",
  Zerion = "zerion",
  CoinbaseWallet = "coinbase_wallet",
  Binance = "binance",
  Coinbase = "coinbase",
}

export enum ILetoInstalledAppType {
  Exchange = "exchange",
  Wallet = "wallet",
}

export interface ILetoInstalledApp {
  id: ILetoInstalledAppId;
  type: ILetoInstalledAppType;
  name: string;
}

export type InstalledAppsResponse = ILetoInstalledApp[];

/** window.letoApp */
export interface ILetoAppInjected {
  version: string;
  initialTheme: LetoAppTheme;
  platform: LetoAppPlatform;
  systemVersion: LetoAppSystemVersion;
  safeAreaInsets: ISafeAreaInsets;
  initialKeyboardAnimationData: ILetoKeyboardAnimationData;
  accessToken: string;
  walletSource: LetoAppWalletSource;
  preferredCurrency: string;
  refreshAccessToken: () => Promise<string>;
  getClipboard: () => Promise<string>;
  hapticFeedback: (method: HapticFeedbackMethod) => Promise<void>;
  disconnect: () => Promise<void>;
  openDevMenu: () => Promise<void>;
  openSupport: () => Promise<void>;
  openPrivacySettings: () => Promise<void>;
  openCodeScanner: () => Promise<CodeScannerResponse>;
  /**
   * Note: if app does not have access to contacts promise will be rejected
   */
  getPhoneContacts: () => Promise<PhoneContactsResponse>;
  /**
   * if user sync contacts promise will be resolved, otherwise rejected
   */
  requestContactsPermission: () => Promise<void>;
  /**
   * returns true if contacts pemission is authorized, otherwise returns false
   */
  checkContactsPermission: () => Promise<boolean>;
  openMnemonicBackup: (address: string) => Promise<void>;
  openPrivateKeyBackup: (address: string) => Promise<void>;
  changeActiveAddress: (address: string) => Promise<void>;
  forgetWallet: (address: string) => Promise<void>;
  addWallet: () => Promise<ILetoWalletListItem[]>;
  getWalletList: () => Promise<ILetoWalletListItem[]>;
  getInstalledApps: () => Promise<InstalledAppsResponse>;
  openAppTransferUrl: (
    id: ILetoInstalledAppId,
    address: string
  ) => Promise<void>;
  /**
   * returns true if phone was successfuly added
   *
   * returns false if user went back
   */
  openAddPhone: () => Promise<boolean>;
  /**
   * reload WebView
   */
  reload: () => void;
  share: (options: ILetoShareOptions) => Promise<void>;

  listen: (callback: (event: ILetoAppEvent) => void) => () => void;
}

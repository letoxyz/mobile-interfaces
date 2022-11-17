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

export enum LetoAppTheme {
  dark = "dark",
  light = "light",
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

export type ILetoAppEvent =
  | ILetoAppChangeThemeEvent
  | ILetoAppStateEvent
  | ILetoKeyboardDidShowEvent
  | ILetoKeyboardDidHideEvent;

/** window.letoApp */
export interface ILetoAppInjected {
  version: string;
  initialTheme: LetoAppTheme;
  platform: LetoAppPlatform;
  safeAreaInsets: ISafeAreaInsets;
  initialKeyboardAnimationData: ILetoKeyboardAnimationData;
  getClipboard: () => Promise<string>;
  hapticFeedback: (method: HapticFeedbackMethod) => Promise<void>;
  disconnect: () => Promise<void>;
  openSettings(): Promise<void>;

  listen: (callback: (event: ILetoAppEvent) => void) => () => void;
}

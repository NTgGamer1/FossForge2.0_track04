/** React Navigation route contracts for the screen implementation step. */
export type RootStackParamList = {
  MainTabs: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Programmes: undefined;
  Opportunities: undefined;
  Media: undefined;
  GetInvolved: undefined;
};

export type ProgrammesStackParamList = {
  ProgrammesList: undefined;
  ProgrammeDetail: { id: string };
};

/** Modal stack for auth screens (Sign In / Profile). */
export type AuthStackParamList = {
  SignIn: undefined;
  Profile: undefined;
};

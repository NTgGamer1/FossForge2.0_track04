/** Auth service interface — Stage 8.
 *  Default: local AsyncStorage + Crypto.
 *  Override: set EXPO_PUBLIC_FIREBASE_* env vars; the firebase provider activates automatically.
 */
export interface AuthUser {
  uid: string;
  email: string;
  displayName: string;
}

export interface AuthService {
  signUp(email: string, password: string, displayName: string): Promise<AuthUser>;
  signIn(email: string, password: string): Promise<AuthUser>;
  signOut(): Promise<void>;
  getSession(): Promise<AuthUser | null>;
  onChange(cb: (user: AuthUser | null) => void): () => void;
}


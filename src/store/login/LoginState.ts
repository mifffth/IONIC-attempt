export interface LoginState {
    error: string | null;
    isLoggedIn: boolean;
    isLoggingIn: boolean;
    isRecoveredPassword: boolean;
    isRecoveringPassword: boolean; // Replace 'any' with the appropriate type for the 'user' property
}
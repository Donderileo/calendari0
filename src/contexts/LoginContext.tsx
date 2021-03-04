import { createContext, ReactNode } from 'react';
import { useSession } from 'next-auth/client'



interface LoginProviderProps {
    [x: string]: any;
    children: ReactNode;
}

export const LoginContext = createContext({} as LoginProviderProps);

interface LoginContextData {
    session: Object;
}

export function LoginProvider({ children }: LoginProviderProps) {
    const [session, loading] = useSession()

    return (
        <LoginContext.Provider value={session}>
            {children}
        </LoginContext.Provider>
    )
}
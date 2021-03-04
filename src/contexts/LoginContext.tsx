import { createContext, ReactNode } from 'react';
import { useSession } from 'next-auth/client'



interface LoginContextData {
    session:any;
    loading: boolean;
}

export const LoginContext = createContext({} as LoginContextData);

interface LoginProviderProps {
    children: ReactNode;
}



export function LoginProvider({ children, ...rest }: LoginProviderProps) {
    const [session, loading] = useSession();

    return (
    <LoginContext.Provider value={{session,loading}}>
            {children}
    </LoginContext.Provider>
    );
}
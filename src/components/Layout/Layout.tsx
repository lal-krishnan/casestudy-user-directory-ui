import React, { ReactNode } from "react";
import { Container } from '@mui/material';
import Header from "../Header/Header";
interface SimpleLayoutProps {
    children: ReactNode;
}
const Layout: React.FC<SimpleLayoutProps> = ({ children }) => {
    return <div>
        <Header />
        <Container>
            {children}
        </Container>
    </div>
}

export default Layout;
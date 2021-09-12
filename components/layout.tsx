import Navbar from "./Navbar";
import Footer from "./footer";
import Meta from "./meta";
import { globalStyle } from "../styles/globalStyle";
import { Global } from "@emotion/core";
import React from "react";

type Props = {
    preview?: boolean;
    children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
    return (
        <>
            <Meta />
            <div className="min-h-screen">
                <Navbar />
                <main>{children}</main>
                <Global styles={globalStyle} />
            </div>
            <Footer />
        </>
    );
};

export default Layout;

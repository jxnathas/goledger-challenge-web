"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
    rightSidebarVisible: boolean;
    toggleRightSidebar: () => void;
    setRightSidebarVisible: (visible: boolean) => void;
    sidebarContent: any;
    setSidebarContent: (content: any) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
    children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
    const [rightSidebarVisible, setRightSidebarVisible] = useState(false);
    const [sidebarContent, setSidebarContent] = useState<any>(null);

    const toggleRightSidebar = () => setRightSidebarVisible((prev) => !prev);
    return (
        <SidebarContext.Provider
            value={{
                rightSidebarVisible,
                toggleRightSidebar,
                setRightSidebarVisible,
                sidebarContent,
                setSidebarContent,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error("useSidebar must be used within a SidebarProvider");
    }
    return context;
};
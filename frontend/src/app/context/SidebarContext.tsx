"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SidebarContextType {
    rightSidebarVisible: boolean;
    toggleRightSidebar: () => void;
    setRightSidebarVisible: (visible: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarProviderProps {
    children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
    const [rightSidebarVisible, setRightSidebarVisible] = useState(false);

    const toggleRightSidebar = () => setRightSidebarVisible((prev) => !prev);

    return (
        <SidebarContext.Provider
            value={{
                rightSidebarVisible,
                toggleRightSidebar,
                setRightSidebarVisible,
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

interface ContainerProps {
    leftSidebar?: ReactNode;
    rightSidebar?: ReactNode;
    children: ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
    leftSidebar,
    rightSidebar,
    children,
}) => {
    const { rightSidebarVisible, toggleRightSidebar } = useSidebar();

    return (
        <div className="grid grid-cols-[auto_1fr_auto] h-screen">
            {leftSidebar && (
                <div className="bg-gray-800 text-white p-4 w-64">{leftSidebar}</div>
            )}

            <div className="bg-gradient-to-tr from-gray-200 to-gray-300 p-4 overflow-y-auto">
                {children}
                <button onClick={toggleRightSidebar} className="mt-4 bg-blue-500 text-white p-2">
                    Toggle Right Sidebar
                </button>
            </div>

            {rightSidebar && rightSidebarVisible && (
                <div className="bg-gray-200 text-black p-4 w-64">{rightSidebar}</div>
            )}
        </div>
    );
};

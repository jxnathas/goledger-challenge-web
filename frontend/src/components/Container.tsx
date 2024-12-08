"use client";
import { useSidebar } from "@/app/context/SidebarContext";

interface ContainerProps {
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  leftSidebar,
  rightSidebar,
  children,
}) => {
  const { rightSidebarVisible } = useSidebar();

  return (
    <div className="grid grid-cols-[auto_1fr_auto] h-screen">

      {leftSidebar && (
        <div className="text-white">{leftSidebar}</div>
      )}

      <div className="bg-gradient-to-tr from-gray-200 to-gray-300 p-4 overflow-y-auto scrollbar-hide">
        {children}
      </div>

      {rightSidebar && rightSidebarVisible && (
        <div className="bg-gray-200 text-black p-4 w-64 scrollbar-hide">
          {rightSidebar}
        </div>
      )}
    </div>
  );
};

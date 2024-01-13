import React from "react";

const Badge = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <span className="inline-flex font-sans items-center justify-center rounded-md bg-green-500  py-[0.5px] px-1 text-xs font-medium text-gray-100 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-600 dark:text-white">
      {children}
    </span>
  );
};

export default Badge;

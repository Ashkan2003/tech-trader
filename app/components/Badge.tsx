import React from "react";

interface Props {
  title: string;
  color: "primary" | "secondary";
}

const Badge = ({title,color}:Props) => {
  if (color == "primary")
    return (
      <span className="inline-flex font-sans items-center justify-center rounded-md bg-green-500  py-[0.5px] px-1 text-xs font-medium text-gray-100 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-600 dark:text-white">
        {title}
      </span>
    );

  if (color == "secondary")
    return (
      <span className="inline-flex font-sans items-center justify-center rounded-md   py-[0.5px] px-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-600 dark:text-white">
        {title}
      </span>
    );
};

export default Badge;

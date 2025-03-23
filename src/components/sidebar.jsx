import * as React from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

export default function Sidebar({
  open,
  setOpen,
  menuItems,
  setSelectedMenuItem,
  selectedMenuItem,
}) {
  const handleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="fixed z-10 h-full min-h-[calc(100vh-100px)] flex p-3">
      {/* Sidebar container */}
      <div
        className={`bg-white transition-all duration-500 rounded-[12px] overflow-hidden shadow-[inset_0_0_0.5px_1px_hsla(0,0%,100%,0.075),0_0_0_1px_hsla(0,0%,0%,0.05),0_0.3px_0.4px_hsla(0,0%,0%,0.02),0_0.9px_1.5px_hsla(0,0%,0%,0.045),0_3.5px_6px_hsla(0,0%,0%,0.09)]  ${
          open ? "w-[250px]" : "w-[4px]"
        }`}
      >
        {/* Sidebar Content */}
        <div className="h-full py-6 px-4">
          <div className="flex flex-col gap-1">
            {menuItems.map((item, index) => (
              <div
                key={item.id}
                id={item.id}
                className={`rounded-[12px] cursor-pointer px-4 py-2 max-w-[300px] ${
                  selectedMenuItem === item.id
                    ? "bg-[linear-gradient(to_right,rgba(249,87,177,0.8),rgba(239,113,64,0.8))] text-white"
                    : "hover:bg-[linear-gradient(to_right,rgba(249,87,177,0.6),rgba(239,113,64,0.6))] bg-transparent"
                }`}
                onClick={() => setSelectedMenuItem(item.id)}
              >
                <h6
                  className={`m-0 p-0 hover:text-white transition-all duration-500 font-['Roboto','Helvetica','Arial',sans-serif] font-normal text-base leading-[1.75] tracking-[1px] whitespace-pre ${
                    open
                      ? `translate-x-0 opacity-100`
                      : `translate-x-100 opacity-0`
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item.name}
                </h6>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <div>
        <button
          onClick={handleDrawer}
          className="mt-[32px] ml-[-12px] hover:bg-[#f2f0f0] inline-flex cursor-pointer select-none rounded-full bg-white text-center text-[rgba(0,0,0,0.54)] shadow-[0px_0px_5px_#bebebe]"
        >
          {open ? (
            <KeyboardDoubleArrowLeftIcon />
          ) : (
            <KeyboardDoubleArrowRightIcon />
          )}
        </button>
      </div>
    </div>
  );
}

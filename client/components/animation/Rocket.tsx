import React from "react";

export default function Rocket({ launching }: { launching: boolean }) {
  return (
    <div className="relative h-0 w-full flex justify-center items-end">
      <div className={`rocket-wrap ${launching ? "launch" : ""}`}>
        <div className="rocket">
          <div className="nose" />
          <div className="body" />
          <div className="fins" />
        </div>
        <div className={`flame ${launching ? "burn" : ""}`} />
      </div>
    </div>
  );
}

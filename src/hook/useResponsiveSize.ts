import { useMemo } from "react";
import useMatchBreakpoints from "./useMatchBreakpoints";

type ReturnType = string | number;

const useResponsiveSize = (size: { [key: string]: ReturnType }) => {
  const matchBreakpoints = useMatchBreakpoints();

  return useMemo(() => {
    const getSizeKey = (key: string) =>
      (key || "").replace("is", "").toLowerCase();
    const getSimilarSize = (
      keys: string[],
      index: number,
      offset: number
    ): ReturnType => {
      const upIndex = index + offset;
      const downIndex = index - offset;
      const targetKey = {
        up: keys[upIndex] || "",
        down: keys[downIndex] || "",
      };
      if (!targetKey.up && !targetKey.down) return "";
      return (
        size[getSizeKey(targetKey.up)] ??
        size[getSizeKey(targetKey.down)] ??
        getSimilarSize(keys, index, offset + 1)
      );
    };

    let activeBreakpoint: string = "";
    let activeIndex: number = 0;
    const keys = Object.keys(matchBreakpoints);
    keys.map((key: string, index: number) => {
      if (matchBreakpoints[key]) {
        activeBreakpoint = getSizeKey(key);
        activeIndex = index;
      }
      return null;
    });
    return size[activeBreakpoint] ?? getSimilarSize(keys, activeIndex, 1);
  }, [size, matchBreakpoints]);
};
export default useResponsiveSize;

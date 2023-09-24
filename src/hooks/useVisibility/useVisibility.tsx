import { useEffect, useState } from "react";

export function useVisibility(open: boolean) {
  const [visible, setVisible] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(
      () => {
        setVisible(open);
      },
      open ? 0 : 200
    );

    setTimeout(
      () => {
        setFadeIn(open);
      },
      open ? 20 : 0
    );
  }, [open]);

  return [visible, fadeIn];
}

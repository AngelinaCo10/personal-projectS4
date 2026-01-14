"use client";

import { useId } from "react";
import styles from "./GiftAnimation.module.css";

type Props = {
  amountLabel: string;
  giftColor?: string;
};

export default function GiftAnimation({
  amountLabel,
  giftColor = "rgb(254, 192, 254)",
}: Props) {
  const id = useId();
  const inputId = `gift-${id}`;

  return (
    <div
      className={styles.container}
      style={{ ["--giftColor" as any]: giftColor }}
    >
      <div className={styles.groundShadow} />

      <div className={styles.gift}>
        <input type="checkbox" id={inputId} className={styles.toggle} />
        <label htmlFor={inputId} className={styles.click} />

        <div className={styles.tape} />
        <div className={styles.bowShadow} />

        <div className={styles.present}>{amountLabel}</div>

        <label htmlFor={inputId} className={styles.hitbox}></label>
      </div>
    </div>
  );
}

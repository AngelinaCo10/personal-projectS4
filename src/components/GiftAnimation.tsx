"use client";

import { useId } from "react";
import styles from "./GiftAnimation.module.css";

type Props = {
  amountLabel: string;
};

export default function GiftAnimation({ amountLabel }: Props) {
  const id = useId();
  const inputId = `gift-${id}`;

  return (
    <div className={styles.container}>
      <div className={styles.groundShadow} />

      <div className={styles.gift}>
        <input
          type="checkbox"
          id={inputId}
          className={styles.toggle}
        />

        <label htmlFor={inputId} className={styles.click} />

        <div className={styles.tape} />
        <div className={styles.bowShadow} />

        <div className={styles.present}>{amountLabel}</div>
      </div>
    </div>
  );
}

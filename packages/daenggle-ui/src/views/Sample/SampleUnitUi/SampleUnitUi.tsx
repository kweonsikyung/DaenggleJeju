"use client";

import * as styles from "./SampleUnitUi.css";

interface SampleUnitUiProps {
  /** Image URL for the unit */
  imageUrl: string;
  /** Title of the unit */
  title: string;
  /** Description of the unit */
  description: string;
  /** Optional click handler */
  onClick?: () => void;
}

/**
 * SampleUnitUi component displays a unit with an image, title, and description.
 */
export const SampleUnitUi = ({ imageUrl, title, description, onClick }: SampleUnitUiProps) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={imageUrl} alt={title} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

import React from 'react';
import styles from './CongratsBox.module.css';

export default function CongratsBox({ heading, msg }) {
    return (
        <div className={styles.congratsBox}>
            <div className={styles.congratsTop}>
                {heading}
            </div>
            <div className={styles.congratsDesc}>
                {msg}
            </div>
        </div>
    );
}
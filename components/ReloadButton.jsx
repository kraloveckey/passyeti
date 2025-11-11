import Image from 'next/image';
import styles from "./ReloadButton.module.css";

function Reload({onClick, reloadsLeft, hidden, showLastReload}) {

    if(!hidden && (reloadsLeft===undefined || reloadsLeft))
    {
        const showCounter = showLastReload
            ? reloadsLeft >= 1
            : reloadsLeft > 1;

        return (
            <div onClick={onClick} className={styles.reload_button}>
                <Image
                    width="18"
                    height="18"
                    src="/reload.png"
                    alt="reload"
                    className={styles.reload_img}
                />
                {showCounter && (
                    <span className={styles.reloads_left}>x{reloadsLeft}</span>
                )}
            </div>
        );
    }
}

export default Reload;
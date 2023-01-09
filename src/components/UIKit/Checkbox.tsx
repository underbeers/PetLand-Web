import React from "react";

import styles from "./Checkbox.module.css";

interface iCheckboxProps {
    children: React.ReactNode;
    setChecked: (isChecked: boolean) => void
}

const Checkbox: React.FC<iCheckboxProps> = ({children, setChecked}) => {
    return (
        <label className={styles.checkbox}>
            <input
                type={"checkbox"}
                onChange={event => {
                    setChecked(event.target.checked)
                }}
            />
            <span className={"text"}>{children}</span>
        </label>
    );
};

export default Checkbox;


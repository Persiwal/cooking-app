import {
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as RadixSelect from "@radix-ui/react-select";
import classnames from "classnames";
import React from "react";
import styles from "./Select.module.scss";

const Select = ({ label, children, value, onChange, placeholder, ...props }: { label: string, children: React.ReactNode, value?: string | number | readonly string[] | undefined, onChange?: (value: string) => void, placeholder: string, props?: RadixSelect.SelectProps }) => (
    <RadixSelect.Root {...props} onValueChange={onChange} >
        <RadixSelect.Trigger value={value} className={styles.Trigger}>
            <RadixSelect.Value placeholder={placeholder} />
            <RadixSelect.Icon className={styles.Icon}>
                <ChevronDownIcon />
            </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
            <RadixSelect.Content className={styles.Content}>
                <RadixSelect.ScrollUpButton className={styles.ScrollButton}>
                    <ChevronUpIcon />
                </RadixSelect.ScrollUpButton>
                <RadixSelect.Viewport className={styles.Viewport}>
                    <RadixSelect.Group>
                        {children}
                    </RadixSelect.Group>
                </RadixSelect.Viewport>
                <RadixSelect.ScrollDownButton className={styles.ScrollButton}>
                    <ChevronDownIcon />
                </RadixSelect.ScrollDownButton>
            </RadixSelect.Content>
        </RadixSelect.Portal>
    </RadixSelect.Root>
);

const SelectItem = ({ children, className, ...props }: RadixSelect.SelectItemProps) => {
    return (
        <RadixSelect.Item
            className={classnames(styles.Item, className)}
            {...props}
        >
            <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
            <RadixSelect.ItemIndicator className={styles.ItemIndicator}>
                <CheckIcon />
            </RadixSelect.ItemIndicator>
        </RadixSelect.Item>
    );
}

export { Select, SelectItem };


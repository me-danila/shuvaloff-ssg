type IconProps = {
    size?: number;
    color?: string;
    className?: string;
};

export default function UserIcon({
    size = 11,
    color = "currentColor",
    className,
}: IconProps) {
    return (
        <svg
            width={size}
            height={size * (18 / 11)}
            viewBox="0 0 11 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            focusable="false"
            className={className}
        >
            <path
                d="M9.35 9.28C10.2613 9.28 11 10.0322 11 10.96V11.52C11 13.728 8.95454 16 5.5 16C2.04546 16 0 13.728 0 11.52V10.96C0 10.0322 0.73873 9.28 1.65 9.28H9.35ZM5.5 2C7.17066 2 8.525 3.37896 8.525 5.08C8.525 6.78104 7.17066 8.16 5.5 8.16C3.82934 8.16 2.475 6.78104 2.475 5.08C2.475 3.37896 3.82934 2 5.5 2Z"
                fill={color}
            />
        </svg>
    );
}

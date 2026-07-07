const sizes = {
    sm: "h-4",
    md: "h-8",
    lg: "h-16",
} as const;

/** Дополнительный вертикальный отступ в статье: <Space /> или <Space size="lg" /> */
export default function Space({ size = "md" }: { size?: keyof typeof sizes }) {
    return <div aria-hidden="true" className={sizes[size]} />;
}

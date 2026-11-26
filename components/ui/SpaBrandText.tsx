export default function SpaBrandText({ text }: { text: string }) {
    const match =
        /ACADEMIA (?:массаж & спа|(?:massage|masajes|massaggi) & spa)/.exec(
            text,
        );
    if (!match) return text;

    return (
        <>
            {text.slice(0, match.index)}
            <span className="normal-case">{match[0]}</span>
            {text.slice(match.index + match[0].length)}
        </>
    );
}

const lexer = (code: string): string[][] => {
    return code
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && !line.startsWith('#'))
        .map(line => {
            const tokens = line.match(/(?:[^\s"']+|"[^"]*"|'[^']*')+/g) || [];
            return tokens.map(token => {
                if ((token.startsWith('"') && token.endsWith('"') || (token.startsWith("'") && token.endsWith("'")))) {
                    return token.slice(1, -1);
                }
                return token;
            })
        })
}
export = lexer;
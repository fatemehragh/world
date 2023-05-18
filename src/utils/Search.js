export function fuzzySearch(searchTerm, text) {
    const searchChars = searchTerm.toLowerCase().split('');
    let currentIndex = 0;

    for (const char of text.toLowerCase()) {
        if (char === searchChars[currentIndex]) {
            currentIndex++;
            if (currentIndex === searchChars.length) {
                return true;
            }
        }
    }

    return false;
}


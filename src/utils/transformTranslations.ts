export function transformTranslations(translations: Record<string, string>): Record<string, any> {
    const result: Record<string, any> = {};

    Object.entries(translations).forEach(([key, value]) => {
        const parts = key.split('.');
        let current = result;

        // Iterate through all parts except the last
        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i];
            // Ensure the nested object exists
            current[part] = current[part] || {};
            // Move deeper into the object
            current = current[part];
        }

        // Set the final value
        current[parts[parts.length - 1]] = value;
    });

    return result;
}
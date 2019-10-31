async function createSuggestion(parent, args, context) {
    try {
        await context.prisma.createSuggestion(args);
        return true;
    } catch (err) {
        return false;
    }
}

module.exports = {
    createSuggestion
}
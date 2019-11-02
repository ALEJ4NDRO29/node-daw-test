async function createSuggestion(parent, args, context) {
    try {
        console.log('create sug');
        console.log(args);
        
        await context.prisma.createSuggestion(args);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports = {
    createSuggestion
}
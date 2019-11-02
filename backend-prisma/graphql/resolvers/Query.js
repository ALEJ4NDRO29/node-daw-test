
async function suggestions(parent, args, context) {
    return context.prisma.suggestions();
}

module.exports = {
    suggestions
};
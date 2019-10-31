
async function find(parent, args, context) {
    return context.prisma.events({});
}

module.exports = {
    find
};
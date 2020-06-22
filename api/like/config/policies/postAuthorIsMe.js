module.exports = async (ctx, next) => {
    if(!ctx.request.query["post.author"]){
        return ctx.unauthorized("Please specify a post.author={id}")
    }

    const targetUser = String(ctx.request.query["post.author"])
    const loggedInUser = String(ctx.state.user.id)

    if(targetUser === loggedInUser){
        return next()
    } else {
        return ctx.unauthorized("Target user is different from the logged in user")
    }
}
'use strict';

const { parseMultipartData, sanitizeEntity} = require('strapi-utils')

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async create(ctx) {
        let entity
        if (ctx.is('multipart')){
            const {data, files} = parseMultipartData(ctx)

            if(!data || !data.description){
                ctx.throw(400, "Please write a description")
            }

            if(!files || !files.image){
                ctx.throw(400, "Please upload an Image")
            }

            const {user} = ctx.state

            entity = await strapi.services.post.create({...data, ...{likes: 0, author: user}}, {files})
        } else {
            ctx.throw(400, "Please use multipart/form-data")
        }

        return sanitizeEntity(entity, {model: strapi.models.post})
    }
};

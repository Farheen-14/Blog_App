// import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator( (data:never, ctx: ExecutionContext)=>{
    // const user= ctx.switchToHttp().getRequest().user;
    // const username = ctx.switchToHttp().getRequest().user.username;
    const username = ctx.switchToHttp().getRequest().user;

    // console.log("currentuser from current user file",username);
    if(!username)
    return null;
    return username;
})
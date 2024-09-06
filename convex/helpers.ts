import { QueryCtx, ActionCtx } from "./_generated/server";

export const requireUser = async (ctx: QueryCtx | ActionCtx) => {
    const user = await ctx.auth.getUserIdentity();
        if(!user){
            throw new Error("Unauthorized");
        }
        return user;
}
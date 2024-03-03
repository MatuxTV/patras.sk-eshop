import { createDirectus, rest, authentication } from '@directus/sdk';

const directus = createDirectus('https://directus-production-c628.up.railway.app')
.with(authentication("cookie", {credentials: "include", autoRefresh: true}))
.with(rest());

export default directus;
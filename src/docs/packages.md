# Create the project from scratch

<p>
Create a folder ( name = "project_name")
</p>

<p>
Initialize the node project, create package.json using this terminal command, and choose a blank template.
</p>     
<p>

       pnpm init

</p>
<h2>
1. Create a "src" folder & create a file named "app.ts" &  "server.ts"
</h2>
<p>

    mkdir src && cd src &&  echo.> app.ts && echo.> server.ts && cd ..

</p>

<p>
    Install dependencies
</p>

    pnpm add fastify dotenv@16.5.0 zod bcryptjs fastify-plugin @fastify/cors @fastify/cookie @fastify/rate-limit @fastify/http-proxy @fastify/static @fastify/swagger-ui @fastify/swagger

<p>

<p>
    Install Development dependencies
</p>
</p>

    pnpm add -D rimraf prettier tsx typescript

<p>
<p>
    Install @types dev dependencies
</p>
<p>

    pnpm add -D @types/node @vercel/node

</p>

<p>

    "scripts": {
        "build": "rimraf dist && tsc -p tsconfig.json",
        "prestart": "pnpm run build",
        "start": "pnpm run ./dist/server.js",
        "dev": "tsx watch src/server.ts",
        "prettier": "prettier --write ."
    },

</p>

<p>Adding MySQL & redis database packages to create and connect database
</p>

<p>
    
    pnpm add sequelize mysql2 pg-hstore @upstash/redis

</p>

<p>Adding email setup and otp authentication </p>

<p>
    
    pnpm add nodemailer ejs jsonwebtoken

</p>
<p>
    
    pnpm add --dev @types/nodemailer @types/ejs @types/jsonwebtoken

</p>

<p>If you want supabase database </p>

<p>
    
    pnpm add @supabase/supabase-js

</p>
